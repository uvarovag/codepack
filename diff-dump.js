/**
 * Дамп новых и изменённых файлов между двумя папками проекта.
 *
 * Использование:
 *   node diff-dump.js
 *
 * Пути задаются константами ниже: sourceDirectory (было) и destinationDirectory (стало).
 * Тип проекта — константа projectType: 'ts' | 'java' | 'py'.
 *
 * Константа onlyPatterns ограничивает дамп только подходящими файлами:
 * значение с точки (.d.ts, .json) сравнивается как расширение/суффикс имени
 * файла, без точки (package.json) — как точное имя. Пустой массив — без
 * ограничения. Удобно для сравнения двух версий dist собранной библиотеки
 * по .d.ts и package.json, без файлов реализации.
 *
 * Состав файлов берётся из git с учётом .gitignore, если папка — репозиторий,
 * иначе обычным обходом.
 * Исключения (блок «Exclusions» одинаков в dump.js и diff-dump.js):
 *   - lockfile'ы всех экосистем (uv.lock, package-lock.json, poetry.lock, ...),
 *     wrapper-jar'ы, .DS_Store и кэши/зависимости (node_modules, .venv,
 *     __pycache__, .gradle, ...) исключаются всегда, независимо от projectType;
 *   - папки сборки (dist, build, target, bin, out, ...) — по projectType;
 *   - прошлые дампы (.code_dump*.txt, .diff_dump*.txt) не попадают в новые.
 * Исключения применяются и поверх git, и при обычном обходе.
 *
 * В начало дампа пишется сводка изменений:
 *   ##### ADDED:    — файл есть только в dst
 *   ##### MODIFIED: — файл есть в обоих, содержимое отличается (сравнение по SHA-1)
 *   ##### REMOVED:  — файл есть только в src
 *
 * Дальше идёт содержимое добавленных и изменённых файлов.
 * Удалённые файлы попадают только в сводку — restore.js сотрёт их
 * лишь при запуске с флагом --delete.
 *
 * Дамп ограничен по длине константой maxDumpLines (по умолчанию 10000 строк
 * на файл дампа, 0 — без ограничения). Содержимое одного файла никогда не
 * разрывается между дамп-файлами. Если дамп получился в несколько файлов,
 * к outputFile перед расширением добавляется .partN — restore.js сам
 * подхватит все части при восстановлении.
 *
 * Применить изменения: node restore.js .diff_dump.txt ./my-service --delete
 */

import { execFileSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// ----- Configuration ----------------------------------------------------------

const projectType = 'java'; // 'ts' | 'java' | 'py'

const sourceDirectory = './src-project';
const destinationDirectory = './dst-project';
const outputFile = '.diff_dump.txt';
const maxDumpLines = 10000; // 0 = no limit
const onlyPatterns = []; // e.g. ['.d.ts', 'package.json'] — [] = no restriction

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

// dump.txt -> dump.part1.txt, .diff_dump.txt -> .diff_dump.part1.txt
function buildPartFileName(filePath, partNumber) {
    const ext = path.extname(filePath);
    const base = filePath.slice(0, filePath.length - ext.length);
    return `${base}.part${partNumber}${ext}`;
}

const effectiveMaxLines = Number.isFinite(maxDumpLines) && maxDumpLines > 0 ? maxDumpLines : Infinity;

// A pattern starting with '.' matches by suffix (extension), e.g. '.d.ts';
// otherwise it matches the exact file name, e.g. 'package.json'.
function matchesOnly(relativePath) {
    if (onlyPatterns.length === 0) {
        return true;
    }
    const fileName = path.basename(relativePath);
    return onlyPatterns.some((pattern) => (pattern.startsWith('.') ? fileName.endsWith(pattern) : fileName === pattern));
}

// ----- Exclusions (keep this block identical in dump.js and diff-dump.js) -----

// Tool caches, dependency folders and IDE metadata of any ecosystem: never
// source code, so they are skipped regardless of projectType.
const commonExcludedDirectories = [
    '.git',
    '.idea',
    '.vscode',
    'node_modules',
    '.yarn',
    '.next',
    '.nuxt',
    '.turbo',
    '.cache',
    '.parcel-cache',
    '__pycache__',
    '.venv',
    '.mypy_cache',
    '.pytest_cache',
    '.ruff_cache',
    '.tox',
    '.ipynb_checkpoints',
    '.gradle',
];

// Build output names that may be real source folders in another ecosystem
// (e.g. 'bin', 'out'), so they depend on projectType.
const excludedDirectoriesByType = {
    ts: ['dist', 'build', 'out', 'coverage', 'storybook-static'],
    java: ['target', 'build', 'out', 'bin', 'generated-sources', '.mvn'],
    py: ['venv', 'dist', 'build'],
};

// Lockfiles, wrapper binaries and OS junk of any ecosystem: a java repo may
// still carry uv.lock or package-lock.json from auxiliary tooling.
const excludedFileNames = [
    '.DS_Store',
    'Thumbs.db',
    'package-lock.json',
    'npm-shrinkwrap.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'bun.lock',
    'bun.lockb',
    '.pnp.cjs',
    '.pnp.loader.mjs',
    'gradle.lockfile',
    'settings-gradle.lockfile',
    'gradle-wrapper.jar',
    'maven-wrapper.jar',
    'poetry.lock',
    'uv.lock',
    'Pipfile.lock',
    'pdm.lock',
];

// Default outputs of dump.js and diff-dump.js (including .partN batches),
// so a previous dump never ends up inside the next one.
const excludedFileNamePatterns = [/^\.code_dump(\.part\d+)?\.txt$/, /^\.diff_dump(\.part\d+)?\.txt$/];

const excludedDirectories = [...commonExcludedDirectories, ...excludedDirectoriesByType[projectType]];

function isExcludedFileName(fileName) {
    return excludedFileNames.includes(fileName) || excludedFileNamePatterns.some((pattern) => pattern.test(fileName));
}

function isExcluded(relativePath) {
    const segments = relativePath.split('/');
    if (isExcludedFileName(segments[segments.length - 1])) {
        return true;
    }
    return segments.slice(0, -1).some((segment) => excludedDirectories.includes(segment));
}

// Returns relative paths ('/'-separated), or null when the directory is not
// a git repository or git is unavailable. Tracked files deleted from the
// working tree and submodule entries are dropped: they cannot be read.
function collectByGit(directory) {
    let output;
    try {
        output = execFileSync('git', ['-C', directory, 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
            encoding: 'utf-8',
            maxBuffer: 256 * 1024 * 1024,
            stdio: ['ignore', 'pipe', 'ignore'],
        });
    } catch (error) {
        return null;
    }

    return [...new Set(output.split('\0').filter(Boolean))].filter((relativePath) => {
        if (isExcluded(relativePath)) {
            return false;
        }
        try {
            return fs.statSync(path.join(directory, relativePath)).isFile();
        } catch (error) {
            return false;
        }
    });
}

// Returns relative paths ('/'-separated) for a plain directory walk
function collectByWalk(directory, rootDirectory = directory, collected = []) {
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
            if (!excludedDirectories.includes(entry.name)) {
                collectByWalk(fullPath, rootDirectory, collected);
            }
        } else if (entry.isFile() && !isExcludedFileName(entry.name)) {
            collected.push(path.relative(rootDirectory, fullPath).split(path.sep).join('/'));
        }
    }

    return collected;
}

function collectDirectory(directory) {
    return collectByGit(directory) ?? collectByWalk(directory);
}

function collectFiles(directory) {
    return collectDirectory(directory).filter(matchesOnly);
}

function hashFile(fullPath) {
    return crypto.createHash('sha1').update(fs.readFileSync(fullPath)).digest('hex');
}

// ----- Comparing --------------------------------------------------------------

for (const directory of [sourceDirectory, destinationDirectory]) {
    if (!fs.existsSync(directory)) {
        console.error(`Directory '${directory}' not found.`);
        process.exit(1);
    }
}

const sourcePaths = new Set(collectFiles(sourceDirectory));
const destinationPaths = new Set(collectFiles(destinationDirectory));

const added = [];
const modified = [];
const removed = [...sourcePaths].filter((p) => !destinationPaths.has(p)).sort(comparePaths);

for (const relativePath of [...destinationPaths].sort(comparePaths)) {
    if (!sourcePaths.has(relativePath)) {
        added.push(relativePath);
        continue;
    }

    try {
        const sourceHash = hashFile(path.join(sourceDirectory, relativePath));
        const destinationHash = hashFile(path.join(destinationDirectory, relativePath));
        if (sourceHash !== destinationHash) {
            modified.push(relativePath);
        }
    } catch (error) {
        console.error(`Failed to compare ${relativePath}: ${error.message}`);
    }
}

// ----- Writing the dump -------------------------------------------------------

const summaryChunks = [Buffer.from(`##### DIFF DUMP: ${projectType} #####\n`, 'utf-8')];

for (const relativePath of added) {
    summaryChunks.push(Buffer.from(`##### ADDED: ${relativePath} #####\n`, 'utf-8'));
}
for (const relativePath of modified) {
    summaryChunks.push(Buffer.from(`##### MODIFIED: ${relativePath} #####\n`, 'utf-8'));
}
for (const relativePath of removed) {
    summaryChunks.push(Buffer.from(`##### REMOVED: ${relativePath} #####\n`, 'utf-8'));
}
const summaryLines = summaryChunks.reduce((sum, chunk) => sum + countNewlines(chunk), 0);

function partHeader() {
    return Buffer.from(`##### DIFF DUMP: ${projectType} #####\n`, 'utf-8');
}

// The ADDED/MODIFIED/REMOVED summary lives only in the first batch;
// restore.js only ever reads it from the very start of the dump.
const batches = [];
let currentBatch = [...summaryChunks];
let currentBatchLines = summaryLines;
let currentBatchBaseLines = summaryLines;

function startNewBatch() {
    batches.push(currentBatch);
    const header = partHeader();
    currentBatch = [header];
    currentBatchLines = countNewlines(header);
    currentBatchBaseLines = currentBatchLines;
}

const addedPaths = new Set(added);
const changedPaths = [...added, ...modified].sort(comparePaths);
let writtenCount = 0;

for (const relativePath of changedPaths) {
    const fullPath = path.join(destinationDirectory, relativePath);

    let content;
    try {
        content = fs.readFileSync(fullPath);
    } catch (error) {
        console.error(`Failed to read file ${fullPath}: ${error.message}`);
        continue;
    }

    const status = addedPaths.has(relativePath) ? 'added' : 'modified';
    const encoding = isBinary(content) ? 'base64' : 'text';
    const payload = encoding === 'base64' ? Buffer.from(content.toString('base64'), 'utf-8') : content;
    const header = Buffer.from(
        `##### FILE: ${relativePath} | ${payload.length} | ${encoding} | ${status} #####\n`,
        'utf-8',
    );
    const trailingNewline = Buffer.from('\n', 'utf-8');
    const entryLines = countNewlines(header) + countNewlines(payload) + countNewlines(trailingNewline);

    // Never split one file's content across two dump files: only roll over
    // to a new batch if the current one already holds at least one file.
    if (currentBatchLines > currentBatchBaseLines && currentBatchLines + entryLines > effectiveMaxLines) {
        startNewBatch();
    }

    currentBatch.push(header, payload, trailingNewline);
    currentBatchLines += entryLines;
    writtenCount += 1;
}

batches.push(currentBatch);

if (batches.length === 1) {
    fs.writeFileSync(outputFile, Buffer.concat(batches[0]));
    console.log(
        `Saved ${writtenCount} files to ${outputFile}: ` +
            `${added.length} added, ${modified.length} modified, ${removed.length} removed`,
    );
} else {
    const partFiles = batches.map((batch, index) => {
        const partFile = buildPartFileName(outputFile, index + 1);
        fs.writeFileSync(partFile, Buffer.concat(batch));
        return partFile;
    });
    console.log(
        `Saved ${writtenCount} files across ${batches.length} dump files (max ${effectiveMaxLines} lines each): ` +
            `${partFiles.join(', ')} — ${added.length} added, ${modified.length} modified, ${removed.length} removed`,
    );
}
