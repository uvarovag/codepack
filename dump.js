/**
 * Дамп файлов и папок в один текстовый файл.
 *
 * Использование:
 *   node dump.js <путь> [путь ...] [-o файл дампа]
 *   node dump.js ./my-service
 *   node dump.js ./src ./pom.xml ./README.md -o dump.txt
 *
 * Пути могут быть папками (обходятся рекурсивно) или отдельными файлами.
 * По умолчанию: путь — текущая папка, файл дампа — .code_dump.txt
 *
 * Тип проекта задаётся константой projectType ниже: 'ts' | 'java' | 'py'.
 * Он влияет только на список игнорируемых папок (node_modules, target, .venv и т.п.).
 * Явно указанный файл дампится всегда, даже если подходит под исключения.
 *
 * Пути в дампе — относительно текущей директории запуска,
 * поэтому разворачивать нужно из того же места: node restore.js dump.txt ./restored
 */

import fs from 'fs';
import path from 'path';

// ----- Configuration ----------------------------------------------------------

const projectType = 'java'; // 'ts' | 'java' | 'py'

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

    for (let i = 0; i < argv.length; i += 1) {
        if (argv[i] === '-o') {
            outputFile = argv[i + 1];
            i += 1;
        } else {
            inputPaths.push(argv[i]);
        }
    }

    return { inputPaths: inputPaths.length > 0 ? inputPaths : ['.'], outputFile };
}

const { inputPaths, outputFile } = parseArguments(process.argv.slice(2));

// ----- Collecting -------------------------------------------------------------

function isBinary(content) {
    return content.subarray(0, Math.min(content.length, 8000)).includes(0);
}

function comparePaths(a, b) {
    return a.localeCompare(b, undefined, { numeric: true });
}

function toRelativePath(fullPath) {
    return path.relative(process.cwd(), path.resolve(fullPath)).split(path.sep).join('/');
}

function collectDirectory(directory, collected) {
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
            collectDirectory(fullPath, collected);
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

        if (stats.isDirectory()) {
            collectDirectory(inputPath, collected);
        } else if (stats.isFile()) {
            collected.push(inputPath); // Explicit files bypass the exclusion lists
        }
    }

    return collected;
}

// ----- Writing the dump -------------------------------------------------------

const resolvedOutputFile = path.resolve(outputFile);
const relativePaths = [...new Set(collectInputPaths(inputPaths).map(toRelativePath))].sort(comparePaths);

if (relativePaths.length === 0) {
    console.error('Nothing to dump.');
    process.exit(1);
}

const chunks = [Buffer.from(`##### CODE DUMP: ${inputPaths.join(' ')} | ${projectType} #####\n`, 'utf-8')];
let textCount = 0;
let binaryCount = 0;

for (const relativePath of relativePaths) {
    if (path.resolve(relativePath) === resolvedOutputFile) {
        continue;
    }

    let content;
    try {
        content = fs.readFileSync(relativePath);
    } catch (error) {
        console.error(`Failed to read file ${relativePath}: ${error.message}`);
        continue;
    }

    const encoding = isBinary(content) ? 'base64' : 'text';
    const payload = encoding === 'base64' ? Buffer.from(content.toString('base64'), 'utf-8') : content;

    chunks.push(Buffer.from(`##### FILE: ${relativePath} | ${payload.length} | ${encoding} #####\n`, 'utf-8'));
    chunks.push(payload);
    chunks.push(Buffer.from('\n', 'utf-8'));

    if (encoding === 'base64') {
        binaryCount += 1;
    } else {
        textCount += 1;
    }
}

fs.writeFileSync(outputFile, Buffer.concat(chunks));
console.log(`Saved ${textCount + binaryCount} files to ${outputFile} (${binaryCount} encoded as base64)`);
