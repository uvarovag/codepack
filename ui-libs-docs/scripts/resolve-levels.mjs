#!/usr/bin/env node
/**
 * Computes, for every symbol reachable from @sber-front-cs-core/cs-portal:
 *   - its true origin (cs-portal explicit export, cs-core, sdds-cs, sdds-themes, plasma-icons, react-hook-form)
 *   - whether it's shadowed (cs-portal explicitly re-exports a same-named symbol from elsewhere,
 *     making a direct import from the "natural" package the only way to reach the shadowed one)
 *   - whether it's a collision (exported by >1 `export *` source with no explicit override -> NOT
 *     reachable through cs-portal at all)
 *   - its tier (A: used by apps or explicitly named in cs-portal's index, or a cs-core page/layout; B: rest)
 *   - its target doc file, from scripts/file-map.json
 *
 * Depends on raw/cs-core.json, raw/cs-portal.json, raw/sdds-cs/_manifest.json (component names),
 * and scripts/file-map.json. Run parse-dts.mjs and the sdds-cs scrape first.
 *
 * Output: raw/levels.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(__dirname, '../raw');
const ROOT = path.resolve(__dirname, '../../../cssupportchat');

function readJSON(p, fallback = null) {
    try {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
    } catch {
        return fallback;
    }
}

const csCore = readJSON(path.join(RAW, 'cs-core.json'));
const csPortal = readJSON(path.join(RAW, 'cs-portal.json'));
const fileMap = readJSON(path.join(__dirname, 'file-map.json'));

if (!csCore || !csPortal) {
    console.error('Missing raw/cs-core.json or raw/cs-portal.json — run parse-dts.mjs first.');
    process.exit(1);
}

// ----- sdds-cs component names (from scraped pages, if available) ----------

// The sdds-cs scrape (Step 2) ended up producing hand-condensed .txt snapshots
// (raw/sdds-cs/*.txt) instead of structured JSON, so component names aren't
// mechanically extractable the way this script originally assumed. Two
// independent passes converged on the same shadowed-name list though: the
// manual d.ts read in UI_LIBS_DOCS_PLAN.md §2.1, and the scraping fork's own
// observation (recorded in raw/sdds-cs/_manifest.json) while reading every
// page. Use that confirmed list directly rather than a fragile text parser.
const sddsDir = path.join(RAW, 'sdds-cs');
const sddsScraped = fs.existsSync(sddsDir) && fs.readdirSync(sddsDir).some((f) => f.endsWith('.txt'));

// Only genuine sdds-cs component/primitive names — NOT the Mutation* family
// (those are a cs-core-vs-cs-portal shadowing, already caught by the
// `csCoreOwns` check below; sdds-cs has no Mutation* concept at all).
const knownSddsShadowedNames = ['Badge', 'Combobox', 'Popover', 'Overlay', 'Modal', 'Tabs', 'Table', 'Segment', 'showToast'];
const sddsComponentNames = new Set(knownSddsShadowedNames);

// Typography mixins pinned explicitly from sdds-cs in cs-portal/index.d.ts (known statically).
const sddsTypographyMixins = [
    'bodyL', 'bodyLBold', 'bodyM', 'bodyMBold', 'bodyS', 'bodySBold', 'bodyXS', 'bodyXSBold',
    'bodyXXS', 'bodyXXSBold', 'dsplL', 'dsplLBold', 'dsplM', 'dsplMBold', 'dsplS', 'dsplSBold',
    'h1', 'h1Bold', 'h2', 'h2Bold', 'h3', 'h3Bold', 'h4', 'h4Bold', 'h5', 'h5Bold',
    'textL', 'textLBold', 'textM', 'textMBold', 'textS', 'textSBold', 'textXS', 'textXSBold',
];

// ----- cs-portal's explicit named exports: symbol -> from spec -------------

const explicitByPortal = new Map(); // symbol -> { from, isType }
for (const e of csPortal.exports) {
    if (!explicitByPortal.has(e.symbol)) explicitByPortal.set(e.symbol, { from: e.from, isType: e.isType });
}

// cs-core's own named exports (symbol -> true, i.e. cs-core "owns" this name)
const csCoreOwns = new Set(csCore.exports.map((e) => e.symbol));

// ----- classify each cs-portal explicit export's true origin --------------

function classifyFrom(fromSpec) {
    if (fromSpec === '@salutejs/sdds-cs' || fromSpec.startsWith('@salutejs/sdds-cs/')) return 'sdds-cs';
    if (fromSpec === '@salutejs/plasma-icons') return 'plasma-icons';
    if (fromSpec.includes('sdds-themes')) return 'sdds-themes';
    if (fromSpec === '@sber-front-cs-core/cs-core') return 'cs-core';
    if (fromSpec === 'react-hook-form') return 'react-hook-form';
    if (fromSpec.startsWith('.')) return 'cs-portal'; // local to cs-portal itself
    return 'unknown:' + fromSpec;
}

const symbols = [];
for (const [symbol, { from, isType }] of explicitByPortal) {
    if (isType) continue; // types are not cards
    symbols.push({ symbol, origin: classifyFrom(from), fromSpec: from });
}

// ----- shadowing: symbol names cs-portal pins to one source while another
// source (cs-core's own export list, or sdds-cs component names) also has
// a same-named thing. ---------------------------------------------------

const shadowed = [];
for (const s of symbols) {
    const alternatives = [];
    if (s.origin !== 'cs-core' && csCoreOwns.has(s.symbol)) alternatives.push('cs-core');
    if (s.origin !== 'sdds-cs' && sddsComponentNames.has(s.symbol)) alternatives.push('sdds-cs (site)');
    if (alternatives.length > 0) {
        shadowed.push({ symbol: s.symbol, portalGives: s.origin, alsoIn: alternatives });
    }
}

// ----- collisions: symbols in cs-core's export list that are ALSO an sdds-cs
// component name, but cs-portal does NOT explicitly pin either way (i.e. the
// name isn't in explicitByPortal at all, meaning `export *` from both
// cs-core and sdds-cs would be ambiguous and TypeScript drops it from
// cs-portal's surface entirely). ----------------------------------------

const collisions = [];
if (sddsScraped) {
    for (const name of csCoreOwns) {
        if (sddsComponentNames.has(name) && !explicitByPortal.has(name)) {
            collisions.push(name);
        }
    }
}

// ----- tier A: symbols imported by the apps, or explicitly named by
// cs-portal (i.e. every non-type explicit export IS tier A by definition —
// cs-portal's author chose to surface it by name), or cs-core pages/layouts.

// Scanned in-process rather than via `grep -z`: BSD grep on macOS has no
// null-data mode, so a grep-based scan only ever saw single-line imports and
// silently dropped every prettier-formatted multi-line `import {\n ... \n}`.
function listSourceFiles(dir) {
    const out = [];
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            if (ent.name !== 'node_modules') out.push(...listSourceFiles(full));
        } else if (/\.tsx?$/.test(ent.name)) {
            out.push(full);
        }
    }
    return out;
}

const appSources = ['app-cssupport-ext/src', 'app-routing-ext/src']
    .flatMap((d) => listSourceFiles(path.join(ROOT, d)))
    .map((f) => fs.readFileSync(f, 'utf-8'));

// Named imports from `pkg` or any of its subpaths (`pkg/beta`), across all app sources.
function grepAppImports(pkg) {
    const escaped = pkg.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    const re = new RegExp(`import\\s+(?:type\\s+)?\\{([^}]+)\\}\\s+from\\s+['"]${escaped}(?:/[^'"]*)?['"]`, 'g');
    const names = new Set();
    for (const src of appSources) {
        for (const m of src.matchAll(re)) {
            for (const part of m[1].split(',')) {
                const clean = part.trim().replace(/^type\s+/, '');
                if (clean) names.add(clean.split(/\s+as\s+/)[0].trim());
            }
        }
    }
    return names;
}

const appImportsPortal = grepAppImports('@sber-front-cs-core/cs-portal');
const appImportsSdds = grepAppImports('@salutejs/sdds-cs');
const appImportsIcons = grepAppImports('@salutejs/plasma-icons');

// Icon components the apps actually use (via cs-portal's `export *` or a
// direct plasma-icons import) — consumed by gen-icons-doc.mjs. `IconButton`
// is sdds-cs's button component, the only non-icon `Icon*` export.
const appIconImports = [...new Set([...appImportsPortal, ...appImportsIcons])]
    .filter((n) => /^Icon[A-Z]/.test(n) && n !== 'IconButton')
    .sort();

const csCorePageLayoutDirs = new Set(['pages', 'layouts', 'navigations', 'table']);
const csCorePageLayoutSymbols = new Set(
    csCore.exports.filter((e) => e.resolvedDir && csCorePageLayoutDirs.has(e.resolvedDir.split('/')[0])).map((e) => e.symbol),
);

for (const s of symbols) {
    s.usedByApps = appImportsPortal.has(s.symbol);
    s.tier = 'A'; // every explicit cs-portal export is tier A per rule above
}

// cs-core symbols NOT re-exported by name from cs-portal (only reachable via
// `export * from cs-core`) are tier A only if app-used or a page/layout; else tier B.
const csPortalExplicitNames = new Set(symbols.map((s) => s.symbol));
const csCoreOnly = [];
for (const e of csCore.exports) {
    if (e.isType) continue;
    if (csPortalExplicitNames.has(e.symbol)) continue; // already covered above (shadowed case)
    const tier = csCorePageLayoutSymbols.has(e.symbol) ? 'A' : 'B';
    csCoreOnly.push({ symbol: e.symbol, origin: 'cs-core', fromSpec: e.from, tier, usedByApps: false });
}

// sdds-cs symbols used directly by apps but not explicit cs-portal exports and
// not cs-core-owned: these are the ones truly needing direct sdds-cs import
// (should match the shadowed/collision set above).
const sddsDirectTierA = [...appImportsSdds].filter((n) => !csPortalExplicitNames.has(n) && !csCoreOwns.has(n));

// ----- file assignment -----------------------------------------------------

const unassigned = [];
function assignFile(symbol) {
    if (fileMap[symbol]) return fileMap[symbol];
    unassigned.push(symbol);
    return null;
}

for (const s of [...symbols, ...csCoreOnly]) {
    s.file = assignFile(s.symbol);
}

// ----- output ---------------------------------------------------------------

const output = {
    generatedAt: new Date().toISOString(),
    sddsScraped,
    counts: {
        csPortalExplicit: symbols.length,
        csCoreOnly: csCoreOnly.length,
        shadowed: shadowed.length,
        collisions: collisions.length,
        appImportsPortal: appImportsPortal.size,
        appImportsSdds: appImportsSdds.size,
        appImportsIcons: appImportsIcons.size,
        unassigned: unassigned.length,
    },
    symbols,
    csCoreOnly,
    shadowed,
    collisions,
    sddsDirectTierA,
    appIconImports,
    typographyMixins: sddsTypographyMixins,
    unassigned,
};

fs.writeFileSync(path.join(RAW, 'levels.json'), JSON.stringify(output, null, 1));

console.log(`cs-portal explicit exports (all tier A): ${symbols.length}`);
console.log(`cs-core-only exports: ${csCoreOnly.length} (tier A: ${csCoreOnly.filter((s) => s.tier === 'A').length})`);
console.log(`shadowed names: ${shadowed.length}`);
console.log(`collisions (unreachable via cs-portal): ${collisions.length} ${sddsScraped ? '' : '(sdds-cs not scraped yet — incomplete)'}`);
console.log(`app imports from cs-portal: ${appImportsPortal.size}, from sdds-cs directly: ${appImportsSdds.size}, Icon* used: ${appIconImports.length}`);
console.log(`unassigned (no file-map.json entry): ${unassigned.length}`);
if (unassigned.length > 0) console.log('  ' + unassigned.slice(0, 40).join(', ') + (unassigned.length > 40 ? ', ...' : ''));
console.log(`-> ${path.join(RAW, 'levels.json')}`);
