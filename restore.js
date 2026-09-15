/**
 * Восстановление файлов из дампа.
 *
 * Использование:
 *   node restore.js <файл дампа> [папка назначения] [--delete]
 *   node restore.js dump.txt ./restored
 *   node restore.js .diff_dump.txt ./my-service --delete
 *
 * По умолчанию: дамп — .code_dump.txt, папка назначения — ./restored
 *
 * Если дамп был разбит на батчи (dump.txt.partN, см. dump.js/diff-dump.js),
 * достаточно указать любое из имён (базовое или любой из .partN файлов) —
 * остальные части будут найдены рядом автоматически и собраны по порядку.
 *
 * Работает и с полным дампом (dump.js), и с дампом изменений (diff-dump.js).
 * Новые файлы создаются вместе с папками, существующие перезаписываются.
 *
 * Файлы, помеченные в дампе как REMOVED, удаляются только с флагом --delete.
 * Без него они просто перечисляются в выводе — так можно проверить список
 * перед реальным применением.
 * Вместе с ними удаляются папки, которые из-за этого стали пустыми.
 * Записывать и удалять за пределами папки назначения скрипт не будет.
 */

import fs from 'fs';
import path from 'path';

const dumpFile = process.argv[2] || '.code_dump.txt';
const targetDirectory = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : './restored';
const applyDeletions = process.argv.includes('--delete');

const fileMarker = Buffer.from('\n##### FILE: ', 'utf-8');
const headerPattern = /^##### FILE: (.+) \| (\d+) \| (text|base64)(?: \| (added|modified))? #####$/;
const removedPattern = /^##### REMOVED: (.+) #####$/gm;

const ignoredWhenEmpty = ['.DS_Store', 'Thumbs.db'];

// ----- Parsing ----------------------------------------------------------------

function parseRemoved(dump) {
    const firstMarker = dump.indexOf(fileMarker);
    const summary = dump.subarray(0, firstMarker === -1 ? dump.length : firstMarker + 1).toString('utf-8');
    return [...summary.matchAll(removedPattern)].map((match) => match[1]);
}

function parseFiles(dump) {
    const entries = [];
    let markerPosition = dump.indexOf(fileMarker);

    while (markerPosition !== -1) {
        const headerStart = markerPosition + 1;
        const headerEnd = dump.indexOf(0x0a, headerStart);
        if (headerEnd === -1) {
            break;
        }

        const header = dump.subarray(headerStart, headerEnd).toString('utf-8');
        const match = headerPattern.exec(header);
        if (!match) {
            markerPosition = dump.indexOf(fileMarker, headerEnd);
            continue;
        }

        const contentStart = headerEnd + 1;
        const declaredLength = Number(match[2]);
        const nextMarker = dump.indexOf(fileMarker, contentStart);
        const availableEnd = nextMarker === -1 ? dump.length : nextMarker;
        const contentEnd = Math.min(contentStart + declaredLength, availableEnd);
        const payload = dump.subarray(contentStart, contentEnd);

        entries.push({
            relativePath: match[1],
            content: match[3] === 'base64' ? Buffer.from(payload.toString('utf-8'), 'base64') : payload,
            truncated: contentEnd - contentStart !== declaredLength,
        });

        markerPosition = nextMarker;
    }

    return entries;
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Given any one dump file name, finds all its .partN siblings (if any) in
// the same directory and returns them sorted in restore order. Falls back
// to the single given file when the dump was not split into batches.
function resolveDumpFiles(inputPath) {
    const directory = path.dirname(inputPath) || '.';
    const ext = path.extname(inputPath);
    let base = path.basename(inputPath, ext);

    const partSelfMatch = /^(.*)\.part\d+$/.exec(base);
    if (partSelfMatch) {
        base = partSelfMatch[1];
    }

    const partPattern = new RegExp(`^${escapeRegExp(base)}\\.part(\\d+)${escapeRegExp(ext)}$`);

    let entries;
    try {
        entries = fs.readdirSync(directory);
    } catch (error) {
        entries = [];
    }

    const parts = entries
        .map((name) => {
            const match = partPattern.exec(name);
            return match ? { name, number: Number(match[1]) } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.number - b.number)
        .map((part) => path.join(directory, part.name));

    if (parts.length > 0) {
        return parts;
    }

    return fs.existsSync(inputPath) ? [inputPath] : [];
}

function resolveSafePath(rootDirectory, relativePath) {
    const resolvedRoot = path.resolve(rootDirectory);
    const resolvedPath = path.resolve(resolvedRoot, relativePath);

    if (!resolvedPath.startsWith(resolvedRoot + path.sep)) {
        throw new Error(`Path '${relativePath}' escapes the target directory`);
    }

    return resolvedPath;
}

// ----- Deleting ---------------------------------------------------------------

function deleteFiles(rootDirectory, relativePaths) {
    const deleted = [];

    for (const relativePath of relativePaths) {
        let fullPath;
        try {
            fullPath = resolveSafePath(rootDirectory, relativePath);
        } catch (error) {
            console.error(error.message);
            continue;
        }

        try {
            if (fs.existsSync(fullPath)) {
                fs.rmSync(fullPath, { force: true });
                deleted.push(relativePath);
            }
        } catch (error) {
            console.error(`Failed to delete file ${fullPath}: ${error.message}`);
        }
    }

    return deleted;
}

function removeEmptyDirectories(rootDirectory, relativePaths) {
    const resolvedRoot = path.resolve(rootDirectory);
    const candidates = new Set();

    for (const relativePath of relativePaths) {
        let directory = path.dirname(path.resolve(resolvedRoot, relativePath));

        while (directory !== resolvedRoot && directory.startsWith(resolvedRoot + path.sep)) {
            candidates.add(directory);
            directory = path.dirname(directory);
        }
    }

    // Deepest first, so a parent is checked only after its children are gone
    const sorted = [...candidates].sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);
    let removedCount = 0;

    for (const directory of sorted) {
        try {
            const entries = fs.readdirSync(directory).filter((name) => !ignoredWhenEmpty.includes(name));
            if (entries.length === 0) {
                fs.rmSync(directory, { recursive: true, force: true });
                removedCount += 1;
            }
        } catch (error) {
            // Directory is already gone or not accessible — nothing to do
        }
    }

    return removedCount;
}

// ----- Main -------------------------------------------------------------------

const dumpFiles = resolveDumpFiles(dumpFile);

if (dumpFiles.length === 0) {
    console.error(`Dump file '${dumpFile}' not found.`);
    process.exit(1);
}

if (dumpFiles.length > 1) {
    console.log(`Restoring from ${dumpFiles.length} batch files: ${dumpFiles.join(', ')}`);
}

const dump = Buffer.concat(dumpFiles.map((file) => fs.readFileSync(file)));
const entries = parseFiles(dump);
const removedPaths = parseRemoved(dump);

let restoredCount = 0;
let truncatedCount = 0;

for (const entry of entries) {
    let fullPath;
    try {
        fullPath = resolveSafePath(targetDirectory, entry.relativePath);
    } catch (error) {
        console.error(error.message);
        continue;
    }

    try {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, entry.content);
        restoredCount += 1;
        if (entry.truncated) {
            truncatedCount += 1;
            console.error(`Truncated content for ${entry.relativePath}`);
        }
    } catch (error) {
        console.error(`Failed to write file ${fullPath}: ${error.message}`);
    }
}

let deletedCount = 0;
let removedDirectoriesCount = 0;

if (removedPaths.length > 0) {
    if (applyDeletions) {
        const deleted = deleteFiles(targetDirectory, removedPaths);
        deletedCount = deleted.length;
        removedDirectoriesCount = removeEmptyDirectories(targetDirectory, deleted);
    } else {
        console.log(`Skipped ${removedPaths.length} removed files (pass --delete to apply):`);
        for (const relativePath of removedPaths) {
            console.log(`  ${relativePath}`);
        }
    }
}

console.log(
    `Restored ${restoredCount} of ${entries.length} files into ${path.resolve(targetDirectory)}` +
        (truncatedCount > 0 ? `, ${truncatedCount} truncated` : '') +
        (deletedCount > 0 ? `, deleted ${deletedCount} files and ${removedDirectoriesCount} empty directories` : ''),
);
