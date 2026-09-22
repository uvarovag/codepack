#!/usr/bin/env node
/**
 * Step 6 — generates SKELETON markdown (not the final doc): one file per
 * out/ui-libs/<file> target from file-map.json, containing, per symbol,
 * the raw JSDoc description, raw props type text, and a demo example if
 * found — everything a human (or a focused rewrite pass) needs to compress
 * into the final card format from UI_LIBS_DOCS_PLAN.md §3.2/3.3.
 *
 * These skeleton files go to out/ui-libs/_skeletons/<file> (NOT the final
 * out/ui-libs/<file> — step 7 writes the real, compressed doc there by hand).
 *
 * Depends on: raw/cs-core.json, raw/cs-portal.json, raw/levels.json, raw/demo.json.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(__dirname, '../raw');
const OUT = path.resolve(__dirname, '../out/ui-libs/_skeletons');

function readJSON(p) {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

const csCore = readJSON(path.join(RAW, 'cs-core.json'));
const csPortal = readJSON(path.join(RAW, 'cs-portal.json'));
const levels = readJSON(path.join(RAW, 'levels.json'));
const demo = fs.existsSync(path.join(RAW, 'demo.json')) ? readJSON(path.join(RAW, 'demo.json')) : { bySlug: {} };

const csCoreBySymbol = new Map(csCore.exports.map((e) => [e.symbol, e]));
const csPortalBySymbol = new Map(csPortal.exports.map((e) => [e.symbol, e]));

// symbol -> raw entry, preferring cs-portal's own module (for description/props)
// but falling back to cs-core's when cs-portal just re-exports without its own file.
function findRaw(symbol) {
    const p = csPortalBySymbol.get(symbol);
    if (p && (p.description || p.propsRaw)) return { ...p, source: 'cs-portal' };
    const c = csCoreBySymbol.get(symbol);
    if (c && (c.description || c.propsRaw)) return { ...c, source: 'cs-core' };
    return p ? { ...p, source: 'cs-portal' } : c ? { ...c, source: 'cs-core' } : null;
}

function findDemo(symbol) {
    return demo.bySlug[symbol] || null;
}

// Build the full symbol list with tier/file/origin from levels.json.
const allSymbols = [...levels.symbols, ...levels.csCoreOnly];

const byFile = new Map();
for (const s of allSymbols) {
    if (!s.file) continue;
    if (s.file.startsWith('sdds-cs/')) continue; // handled by a separate sdds-cs skeleton pass
    if (!byFile.has(s.file)) byFile.set(s.file, []);
    byFile.get(s.file).push(s);
}

function renderSymbol(s) {
    const raw = findRaw(s.symbol);
    const demoEntry = findDemo(s.symbol);
    const shadowNote = levels.shadowed.find((sh) => sh.symbol === s.symbol);

    const lines = [];
    lines.push(`## ${s.symbol}`);
    lines.push(`tier: ${s.tier} · origin: ${s.origin} · usedByApps: ${!!s.usedByApps} · fromSpec: ${s.fromSpec || '?'}`);
    if (shadowNote) lines.push(`SHADOW NOTE: cs-portal gives the ${shadowNote.portalGives} version; also defined in: ${shadowNote.alsoIn.join(', ')}`);
    lines.push('');
    if (raw?.propsTypeName) lines.push(`propsType: ${raw.propsTypeName} (source: ${raw.source})`);
    lines.push('');
    lines.push('### raw description (RU, from JSDoc)');
    lines.push('```');
    lines.push(raw?.description || '(none found — check cs-core/cs-portal source manually)');
    lines.push('```');
    lines.push('');
    lines.push('### raw props type');
    lines.push('```ts');
    lines.push(raw?.propsRaw || '(none found)');
    lines.push('```');
    lines.push('');
    if (demoEntry && demoEntry.length > 0) {
        lines.push('### demo examples found');
        for (const d of demoEntry.slice(0, 3)) {
            lines.push(`<!-- ${d.path} -->`);
            lines.push('```tsx');
            lines.push(d.code.slice(0, 2000));
            lines.push('```');
        }
    } else {
        lines.push('### demo examples found');
        lines.push('(none — write a minimal example by hand from the props)');
    }
    lines.push('');
    lines.push('---');
    lines.push('');
    return lines.join('\n');
}

fs.mkdirSync(OUT, { recursive: true });

let totalSymbols = 0;
for (const [file, list] of byFile) {
    const outPath = path.join(OUT, file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    const header = `<!-- SKELETON for ${file} — raw material only, not the final doc. ${list.length} symbols. -->\n\n`;
    const body = list
        .sort((a, b) => (b.tier === 'A') - (a.tier === 'A') || a.symbol.localeCompare(b.symbol))
        .map(renderSymbol)
        .join('\n');
    fs.writeFileSync(outPath, header + body);
    totalSymbols += list.length;
}

console.log(`Wrote ${byFile.size} skeleton files, ${totalSymbols} symbols -> ${OUT}`);
console.log('Files:', [...byFile.keys()].sort().join(', '));
