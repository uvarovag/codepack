/**
 * Восстановление файлов из дампа.
 *
 * Использование:
 *   node restore.js <файл дампа> [папка назначения]
 *   node restore.js dump.txt ./restored
 *
 * По умолчанию: дамп — .code_dump.txt, папка назначения — ./restored
 *
 * Работает и с полным дампом (dump.js), и с дампом изменений (diff-dump.js).
 * Существующие файлы перезаписываются, недостающие папки создаются.
 * Файлы, помеченные в дампе как REMOVED, НЕ удаляются — только перечислены в сводке.
 * Записывать за пределы папки назначения скрипт не будет.
 */

import fs from 'fs';
import path from 'path';

const dumpFile = process.argv[2] || '.code_dump.txt';
const targetDirectory = process.argv[3] || './restored';

const fileMarker = Buffer.from('\n##### FILE: ', 'utf-8');
const headerPattern = /^##### FILE: (.+) \| (\d+) \| (text|base64)(?: \| (added|modified))? #####$/;

// ----- Parsing ----------------------------------------------------------------

function parseDump(dump) {
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

function resolveSafePath(rootDirectory, relativePath) {
    const resolvedRoot = path.resolve(rootDirectory);
    const resolvedPath = path.resolve(resolvedRoot, relativePath);

    if (!resolvedPath.startsWith(resolvedRoot + path.sep)) {
        throw new Error(`Path '${relativePath}' escapes the target directory`);
    }

    return resolvedPath;
}

// ----- Writing files ----------------------------------------------------------

if (!fs.existsSync(dumpFile)) {
    console.error(`Dump file '${dumpFile}' not found.`);
    process.exit(1);
}

const entries = parseDump(fs.readFileSync(dumpFile));
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

console.log(
    `Restored ${restoredCount} of ${entries.length} files into ${path.resolve(targetDirectory)}` +
        (truncatedCount > 0 ? ` (${truncatedCount} truncated)` : ''),
);
