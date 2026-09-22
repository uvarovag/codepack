#!/usr/bin/env node
/**
 * Step 8 checks. Exits non-zero (and prints every problem, not just the first)
 * if any of these fail:
 *   - no http(s):// links anywhere in out/ui-libs
 *   - every relative link resolves to a real file
 *   - no import example uses '@sber-front-cs-core/cs-core' or '@salutejs/plasma-icons'
 *     as the import source
 *   - no 'from '@salutejs/sdds-cs'' import for a symbol that ISN'T in levels.md's
 *     exception table (best-effort: checks the symbol named in that import line)
 *   - no leftover '<!-- SKELETON' / 'TODO: review' markers
 *   - each .md file <= 320 lines (soft-ish budget, plan says "well under 300")
 *   - README.md states the four package versions
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC_DIR = path.resolve(__dirname, '../out/ui-libs');
const RAW = path.resolve(__dirname, '../raw');

const problems = [];

function walk(dir) {
    const out = [];
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        if (ent.name === '_skeletons') continue;
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) out.push(...walk(full));
        else if (ent.name.endsWith('.md')) out.push(full);
    }
    return out;
}

const files = walk(DOC_DIR);

// exception list for sdds-cs direct imports
let allowedDirectSdds = new Set();
try {
    const levels = JSON.parse(fs.readFileSync(path.join(RAW, 'levels.json'), 'utf-8'));
    // Only names whose shadowed alternative actually lives in sdds-cs. The
    // cs-core-shadowed rows (Mutation*, createApp, ...) have no sdds-cs
    // counterpart, so a direct sdds-cs import of them is always wrong.
    allowedDirectSdds = new Set(levels.shadowed.filter((s) => s.alsoIn.some((a) => a.startsWith('sdds-cs'))).map((s) => s.symbol));
} catch {
    problems.push('WARN: could not read raw/levels.json, sdds-cs-direct-import check will be skipped');
}
// Non-shadowed sibling primitives that only make sense paired with an
// already-shadowed anchor symbol (e.g. you only reach for raw sdds-cs
// `TabItem` once you're already using raw sdds-cs `Tabs` because cs-portal's
// `Tabs` name is shadowed) — legitimate to import directly alongside their
// anchor, confirmed while writing sdds-cs/*.md. Plus `utils/mixins`, a
// separate sdds-cs submodule not covered by cs-portal's `export *` at all
// (same shape as the `/beta` exception).
for (const n of ['SegmentGroup', 'SegmentItem', 'TabItem', 'addFocus', 'applyPaper']) allowedDirectSdds.add(n);
// `Segment`/`SegmentProvider`/`useSegment`: cs-portal explicitly re-exports
// `SegmentProvider`/`useSegment` from cs-core (shadowing sdds-cs's own), and
// sdds-cs's bare `Segment` isn't a cs-portal export at all under that exact
// name — resolve-levels.mjs's automated pass doesn't catch this pairing
// (name mismatch between the two packages), confirmed manually instead.
for (const n of ['Segment', 'SegmentProvider', 'useSegment']) allowedDirectSdds.add(n);

// GitHub-style heading slug: lowercase, drop everything but letters/digits/
// spaces/hyphens, spaces -> hyphens (runs are kept, so "A / B" -> "a--b").
const slugCache = new Map();
function headingSlugs(mdFile) {
    if (!slugCache.has(mdFile)) {
        const slugs = new Set();
        for (const h of fs.readFileSync(mdFile, 'utf-8').matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
            slugs.add(
                h[1]
                    .toLowerCase()
                    .replace(/[`*_]/g, '')
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s/g, '-'),
            );
        }
        slugCache.set(mdFile, slugs);
    }
    return slugCache.get(mdFile);
}

for (const file of files) {
    const rel = path.relative(DOC_DIR, file);
    const text = fs.readFileSync(file, 'utf-8');
    const lineCount = text.split('\n').length;

    // external links
    const extLinks = text.match(/\]\(https?:\/\/[^)]+\)/g);
    if (extLinks) problems.push(`${rel}: external link(s): ${extLinks.join(', ')}`);

    // relative links resolve, and any #fragment matches a real heading
    const linkRe = /\]\(([^)]+)\)/g;
    let m;
    while ((m = linkRe.exec(text))) {
        const target = m[1];
        if (target.startsWith('http')) continue;
        const [targetPath, fragment] = target.split('#');
        const resolved = targetPath ? path.resolve(path.dirname(file), targetPath) : file;
        if (!fs.existsSync(resolved)) {
            problems.push(`${rel}: broken relative link -> ${target}`);
            continue;
        }
        if (fragment && resolved.endsWith('.md') && !headingSlugs(resolved).has(fragment)) {
            problems.push(`${rel}: link fragment #${fragment} matches no heading in ${path.relative(DOC_DIR, resolved)}`);
        }
    }

    // forbidden import sources / sdds-cs direct imports — only inside fenced
    // code blocks and inline `import { ... } from '...'` code spans; prose
    // that merely explains/warns about a package name is not a violation.
    const codeSpans = [...text.matchAll(/```[\s\S]*?```/g), ...text.matchAll(/`import \{[^`]*?\}[^`]*?`/g)].map((m) => m[0]);
    for (const span of codeSpans) {
        const forbidden = [...span.matchAll(/from '(@sber-front-cs-core\/cs-core|@salutejs\/plasma-icons)'/g)];
        for (const f of forbidden) {
            problems.push(`${rel}: forbidden import source in example: from '${f[1]}'`);
        }
        const sddsImports = [...span.matchAll(/import (?:type )?\{ ?([^}]+?) ?\} from '@salutejs\/sdds-cs'/g)];
        for (const s of sddsImports) {
            // `type X`, `X as Y`, trailing commas -> bare exported name
            const names = s[1]
                .split(',')
                .map((n) => n.trim().replace(/^type\s+/, '').split(/\s+as\s+/)[0].trim())
                .filter(Boolean);
            for (const name of names) {
                if (!allowedDirectSdds.has(name)) {
                    problems.push(`${rel}: direct sdds-cs import of '${name}' not in the allow-list — verify it belongs`);
                }
            }
        }
    }

    // leftover skeleton/TODO markers
    if (/SKELETON for/.test(text)) problems.push(`${rel}: leftover "SKELETON for" marker`);
    if (/TODO: review/.test(text)) problems.push(`${rel}: leftover "TODO: review" marker`);

    // size budget — README.md is a data index (one row per symbol), not a
    // narrative doc, so it's exempt from the card-file budget.
    if (lineCount > 320 && rel !== 'README.md') problems.push(`${rel}: ${lineCount} lines, over the ~300-line budget`);
}

// README version header. (Its symbol-table links are already covered by the
// per-file relative-link check above — README.md is in `files`.)
const readmePath = path.join(DOC_DIR, 'README.md');
if (!fs.existsSync(readmePath)) {
    problems.push('README.md: missing — run gen-readme.mjs');
} else {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    for (const pkg of ['cs-portal', 'cs-core', 'sdds-cs', 'plasma-icons']) {
        if (!new RegExp(`${pkg} \\d+\\.\\d+\\.\\d+`).test(readme)) problems.push(`README.md: missing version mention for ${pkg}`);
    }
}

console.log(`Checked ${files.length} files.`);
if (problems.length === 0) {
    console.log('OK — no problems found.');
    process.exit(0);
} else {
    console.log(`${problems.length} problem(s):`);
    for (const p of problems) console.log(' - ' + p);
    process.exit(1);
}
