/**
 * Дамп файлов и папок в один текстовый файл.
 *
 * Использование:
 *   node dump.js <путь> [путь ...] [-o файл дампа] [-l макс_строк] [--only список]
 *   node dump.js ./my-service
 *   node dump.js ./src ./pom.xml ./README.md -o dump.txt
 *   node dump.js ./src -o dump.txt -l 5000
 *   node dump.js ./my-lib/dist --only .d.ts,package.json -o lib-types.txt
 *
 * Пути могут быть папками (обходятся рекурсивно) или отдельными файлами.
 * По умолчанию: путь — текущая папка, файл дампа — .code_dump.txt
 *
 * Если папка является git-репозиторием, состав файлов берётся из git
 * с учётом .gitignore (включая вложенные и глобальный).
 * Если git недоступен — обычный обход со списком исключений из констант ниже.
 * Поверх git дополнительно применяются excludedDirectories и excludedFileNames.
 *
 * Если передана одна папка, пути в дампе считаются от неё.
 * Если передано несколько путей — от текущей директории запуска.
 *
 * Тип проекта задаётся константой projectType: 'ts' | 'java' | 'py'.
 * Явно указанный файл дампится всегда, даже если подходит под исключения.
 *
 * -i / --only задаёт список через запятую, ограничивающий дамп только
 * подходящими файлами: значение с точки (.d.ts, .json) сравнивается как
 * расширение/суффикс имени файла, без точки (package.json) — как точное имя.
 * Полезно, чтобы вытащить из dist собранной библиотеки только .d.ts и
 * package.json — этого достаточно, чтобы затем сгенерировать документацию
 * по использованию библиотеки без самого кода реализации.
 * Пример: node dump.js ./my-lib/dist --only .d.ts,package.json
 *
 * Дамп ограничен по длине: -l / --max-lines задаёт максимум строк на файл
 * дампа (по умолчанию 10000, 0 — без ограничения). Содержимое одного файла
 * никогда не разрывается между дамп-файлами: если очередной файл целиком не
 * помещается в лимит текущего дамп-файла, он целиком уходит в следующий.
 * Если дамп получился в несколько файлов, к outputFile перед расширением
 * добавляется .partN (например dump.txt -> dump.part1.txt, dump.part2.txt).
 * Если файл всего один, имя не меняется.
 *
 * Дамп переносим между компьютерами и ОС: пути относительные, слэши прямые.
 * Права на исполнение (chmod +x) не сохраняются.
 * Развернуть обратно: node restore.js dump.txt ./restored (restore.js сам
 * подхватит все .partN файлы дампа, если дамп был разбит на батчи).
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// ----- Configuration ----------------------------------------------------------

const projectType = 'java'; // 'ts' | 'java' | 'py'

const defaultMaxDumpLines = 10000;

const commonExcludedDirectories = ['.git', '.idea', '.vscode'];

const excludedDirectoriesByType = {
    ts: [
        'node_modules',
        'dist',
        'build',
        'out',
        '.next',
        '.nuxt',
        '.turbo',
        '.cache',
        '.parcel-cache',
        'coverage',
        'storybook-static',
    ],
    java: ['target', 'build', 'out', 'bin', 'generated-sources', '.gradle', '.mvn'],
    py: ['__pycache__', '.venv', 'venv', '.mypy_cache', '.pytest_cache', '.ruff_cache', '.tox', 'dist', 'build'],
};

const excludedFileNamesByType = {
    ts: ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', '.DS_Store'],
    java: ['.DS_Store'],
    py: ['poetry.lock', 'uv.lock', '.DS_Store'],
};

const excludedDirectories = [...commonExcludedDirectories, ...excludedDirectoriesByType[projectType]];
const excludedFileNames = excludedFileNamesByType[projectType];

// ----- Arguments --------------------------------------------------------------

function parseArguments(argv) {
    const inputPaths = [];
    let outputFile = '.code_dump.txt';
    let maxLines = defaultMaxDumpLines;
    let onlyPatterns = [];

    for (let i = 0; i < argv.length; i += 1) {
        if (argv[i] === '-o') {
            outputFile = argv[i + 1];
            i += 1;
        } else if (argv[i] === '-l' || argv[i] === '--max-lines') {
            maxLines = Number(argv[i + 1]);
            i += 1;
        } else if (argv[i] === '-i' || argv[i] === '--only') {
            onlyPatterns = argv[i + 1]
                .split(',')
                .map((pattern) => pattern.trim())
                .filter(Boolean);
            i += 1;
        } else {
            inputPaths.push(argv[i]);
        }
    }

    return {
        inputPaths: inputPaths.length > 0 ? inputPaths : ['.'],
        outputFile,
        maxLines: Number.isFinite(maxLines) && maxLines > 0 ? maxLines : Infinity,
        onlyPatterns,
    };
}

const { inputPaths, outputFile, maxLines, onlyPatterns } = parseArguments(process.argv.slice(2));

// A pattern starting with '.' matches by suffix (extension), e.g. '.d.ts';
// otherwise it matches the exact file name, e.g. 'package.json'.
function matchesOnly(fileName) {
    if (onlyPatterns.length === 0) {
        return true;
    }
    return onlyPatterns.some((pattern) => (pattern.startsWith('.') ? fileName.endsWith(pattern) : fileName === pattern));
}

// A single directory is dumped relative to itself, so the dump has no extra nesting
function resolveBaseDirectory(paths) {
    if (paths.length === 1) {
        try {
            if (fs.statSync(paths[0]).isDirectory()) {
                return path.resolve(paths[0]);
            }
        } catch (error) {
            return process.cwd();
        }
    }
    return process.cwd();
}

const baseDirectory = resolveBaseDirectory(inputPaths);

// ----- Collecting -------------------------------------------------------------

function isBinary(content) {
    return content.subarray(0, Math.min(content.length, 8000)).includes(0);
}

function comparePaths(a, b) {
    return a.localeCompare(b, undefined, { numeric: true });
}

function countNewlines(buffer) {
    let count = 0;
    for (let i = 0; i < buffer.length; i += 1) {
        if (buffer[i] === 0x0a) {
            count += 1;
        }
    }
    return count;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// dump.txt -> dump.part1.txt, .code_dump.txt -> .code_dump.part1.txt
function buildPartFileName(filePath, partNumber) {
    const ext = path.extname(filePath);
    const base = filePath.slice(0, filePath.length - ext.length);
    return `${base}.part${partNumber}${ext}`;
}

function toRelativePath(fullPath) {
    return path.relative(baseDirectory, path.resolve(fullPath)).split(path.sep).join('/');
}

function isExcluded(relativePath) {
    const segments = relativePath.split('/');
    const fileName = segments[segments.length - 1];

    if (excludedFileNames.includes(fileName)) {
        return true;
    }
    return segments.slice(0, -1).some((segment) => excludedDirectories.includes(segment));
}

// Returns null when the directory is not a git repository or git is unavailable
function collectByGit(directory) {
    let output;
    try {
        output = execFileSync('git', ['-C', directory, 'ls-files', '--cached', '--others', '--exclude-standard'], {
            encoding: 'utf-8',
            maxBuffer: 256 * 1024 * 1024,
            stdio: ['ignore', 'pipe', 'ignore'],
        });
    } catch (error) {
        return null;
    }

    return output
        .split('\n')
        .filter(Boolean)
        .filter((relativePath) => !isExcluded(relativePath))
        .map((relativePath) => path.join(directory, relativePath));
}

function collectByWalk(directory, collected) {
    let entries;
    try {
        entries = fs.readdirSync(directory, { withFileTypes: true });
    } catch (error) {
        console.error(`Failed to read directory ${directory}: ${error.message}`);
        return collected;
    }

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            if (excludedDirectories.includes(entry.name)) {
                continue;
            }
            collectByWalk(fullPath, collected);
        } else if (entry.isFile() && !excludedFileNames.includes(entry.name)) {
            collected.push(fullPath);
        }
    }

    return collected;
}

function collectInputPaths(paths) {
    const collected = [];

    for (const inputPath of paths) {
        let stats;
        try {
            stats = fs.statSync(inputPath);
        } catch (error) {
            console.error(`Path '${inputPath}' not found.`);
            continue;
        }

        if (stats.isFile()) {
            collected.push(inputPath); // Explicit files bypass the exclusion lists
            continue;
        }

        const gitFiles = collectByGit(inputPath);
        if (gitFiles === null) {
            collectByWalk(inputPath, collected);
        } else {
            collected.push(...gitFiles);
        }
    }

    return collected;
}

// ----- Writing the dump -------------------------------------------------------

const resolvedOutputFile = path.resolve(outputFile);
const outputExt = path.extname(resolvedOutputFile);
const outputBaseNoExt = resolvedOutputFile.slice(0, resolvedOutputFile.length - outputExt.length);
const outputPartPattern = new RegExp(`^${escapeRegExp(outputBaseNoExt)}\\.part\\d+${escapeRegExp(outputExt)}$`);

function isOutputFile(fullPath) {
    return fullPath === resolvedOutputFile || outputPartPattern.test(fullPath);
}

const relativePaths = [...new Set(collectInputPaths(inputPaths).map(toRelativePath))]
    .filter((relativePath) => {
        if (relativePath.startsWith('..')) {
            console.error(`Skipped '${relativePath}': outside of the base directory`);
            return false;
        }
        return true;
    })
    .filter((relativePath) => matchesOnly(path.basename(relativePath)))
    .sort(comparePaths);

if (relativePaths.length === 0) {
    console.error('Nothing to dump.');
    process.exit(1);
}

function dumpHeader() {
    return Buffer.from(`##### CODE DUMP: ${projectType} #####\n`, 'utf-8');
}

const batches = [];
let currentBatch = [dumpHeader()];
let currentBatchLines = countNewlines(currentBatch[0]);
let textCount = 0;
let binaryCount = 0;

function startNewBatch() {
    batches.push(currentBatch);
    currentBatch = [dumpHeader()];
    currentBatchLines = countNewlines(currentBatch[0]);
}

for (const relativePath of relativePaths) {
    const fullPath = path.join(baseDirectory, relativePath);

    if (isOutputFile(fullPath)) {
        continue;
    }

    let content;
    try {
        content = fs.readFileSync(fullPath);
    } catch (error) {
        console.error(`Failed to read file ${relativePath}: ${error.message}`);
        continue;
    }

    const encoding = isBinary(content) ? 'base64' : 'text';
    const payload = encoding === 'base64' ? Buffer.from(content.toString('base64'), 'utf-8') : content;
    const header = Buffer.from(`##### FILE: ${relativePath} | ${payload.length} | ${encoding} #####\n`, 'utf-8');
    const trailingNewline = Buffer.from('\n', 'utf-8');
    const entryLines = countNewlines(header) + countNewlines(payload) + countNewlines(trailingNewline);

    // Never split one file's content across two dump files: only roll over
    // to a new batch if the current one already holds at least one file.
    if (currentBatchLines > 1 && currentBatchLines + entryLines > maxLines) {
        startNewBatch();
    }

    currentBatch.push(header, payload, trailingNewline);
    currentBatchLines += entryLines;

    if (encoding === 'base64') {
        binaryCount += 1;
    } else {
        textCount += 1;
    }
}

batches.push(currentBatch);

if (batches.length === 1) {
    fs.writeFileSync(outputFile, Buffer.concat(batches[0]));
    console.log(`Saved ${textCount + binaryCount} files to ${outputFile} (${binaryCount} encoded as base64)`);
} else {
    const partFiles = batches.map((batch, index) => {
        const partFile = buildPartFileName(outputFile, index + 1);
        fs.writeFileSync(partFile, Buffer.concat(batch));
        return partFile;
    });
    console.log(
        `Saved ${textCount + binaryCount} files across ${batches.length} dump files ` +
            `(max ${maxLines} lines each): ${partFiles.join(', ')} (${binaryCount} encoded as base64)`,
    );
}
