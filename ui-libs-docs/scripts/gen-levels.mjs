#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(__dirname, '../raw');
const OUT = path.resolve(__dirname, '../out/ui-libs/levels.md');

const levels = JSON.parse(fs.readFileSync(path.join(RAW, 'levels.json'), 'utf-8'));

const lines = [];
lines.push('# Levels & the cascade');
lines.push('');
lines.push('```');
lines.push('@sber-front-cs-core/cs-portal   <- always import from here');
lines.push('        |  export * from:');
lines.push('        |-- @salutejs/sdds-themes/es/tokens/sdds_cs   (color/typography tokens)');
lines.push('        |-- @salutejs/sdds-cs                          (primitives)');
lines.push('        |-- @salutejs/plasma-icons                     (icons)');
lines.push('        |-- @sber-front-cs-core/cs-core                (business components)');
lines.push('        `-- ~40 of its own components/hooks/widgets, plus explicit named');
lines.push('            re-exports that PIN a specific origin for ~30 shadowed names');
lines.push('            (see the table below)');
lines.push('```');
lines.push('');
lines.push('Priority for what to reach for (not what to write as the import path — that\'s always');
lines.push('cs-portal, see [README.md](README.md)):');
lines.push('1. `cs-portal` for components, `plasma-icons` for icons — co-equal top priority.');
lines.push('2. `cs-core` — only when cs-portal has no match.');
lines.push('3. `sdds-cs` — last resort: raw primitives, or a name from the exception table below.');
lines.push('');
lines.push('## Why some names need a direct import');
lines.push('');
lines.push(
    "TypeScript's `export *` rule: an explicit named export always wins over a wildcard re-export. " +
        "cs-portal's `index.d.ts` does `export * from` four different packages, then ALSO explicitly " +
        're-exports about 30 names by hand — for those names, the explicit line decides which ' +
        'origin cs-portal actually gives you, and the *other* origin\'s same-named export becomes ' +
        "unreachable through cs-portal. If you need that other one, you must import it directly " +
        'from its own package.',
);
lines.push('');
lines.push('## Exception table — the only names that ever need a non-cs-portal import');
lines.push('');
lines.push('| Symbol | `import from cs-portal` gives you | The shadowed alternative | Import it directly with |');
lines.push('|---|---|---|---|');

const rows = [];
for (const s of levels.shadowed) {
    const givesLabel = s.portalGives === 'cs-portal' ? 'cs-portal (own)' : s.portalGives;
    // One row per shadowed alternative — a name can be shadowed in both
    // cs-core and sdds-cs at once.
    for (const other of s.alsoIn) {
        if (other === 'cs-core') {
            // No sanctioned way around this one: cs-portal's own version is the
            // intended one, always. This row is purely informational — know that
            // cs-core has a different, unrelated thing by the same name; there is
            // no reason to reach past cs-portal for it under the "always
            // cs-portal" rule.
            rows.push({
                symbol: s.symbol,
                gives: givesLabel,
                other: 'cs-core (different implementation, same name)',
                importLine: '_(informational only — no direct cs-core import; cs-portal\'s own version is always the right one)_',
            });
        } else {
            rows.push({
                symbol: s.symbol,
                gives: givesLabel,
                other: 'sdds-cs',
                importLine: `\`import { ${s.symbol} } from '@salutejs/sdds-cs'\``,
            });
        }
    }
}
rows.sort((a, b) => a.symbol.localeCompare(b.symbol) || a.other.localeCompare(b.other));
for (const r of rows) {
    lines.push(`| ${r.symbol} | ${r.gives} | ${r.other} | ${r.importLine} |`);
}
lines.push('');

// The prose below is derived from the same rows so it can't drift from the table.
const code = (n) => `\`${n}\``;
const sddsShadowedNames = rows.filter((r) => r.other === 'sdds-cs').map((r) => code(r.symbol));
const coreShadowedNames = rows.filter((r) => r.other !== 'sdds-cs').map((r) => r.symbol);
// collapse the Mutation* family into one entry for readability
const coreShadowedList = [
    ...(coreShadowedNames.some((n) => /^Mutation[A-Z]/.test(n)) ? [code('Mutation*')] : []),
    ...coreShadowedNames.filter((n) => !/^Mutation[A-Z]/.test(n)).map(code),
];
lines.push(
    `${sddsShadowedNames.join(', ')} additionally ` +
        'exist as raw sdds-cs primitives with a different (usually lower-level, less opinionated) API ' +
        "than the cs-core/cs-portal version — see each one's card in `sdds-cs/*.md` for the raw shape " +
        'and a note on how it differs, if the source material had one. These are the only rows above ' +
        "where a direct `@salutejs/sdds-cs` import is ever correct — the cs-core-shadowed rows " +
        `(${coreShadowedList.join(', ')}) have no legitimate direct-cs-core-import case: ` +
        "cs-portal's own version is always what you want there.",
);
lines.push('');
lines.push('## Always-direct exceptions (not shadowing — just not re-exported at all)');
lines.push('');
lines.push(
    "- `@salutejs/sdds-cs/beta` (Beta `Popover`, Beta `Tooltip`, ...) — cs-portal's `export *` only " +
        'covers the main `@salutejs/sdds-cs` entry point, not the `/beta` subpath. Always ' +
        '`import { X } from \'@salutejs/sdds-cs/beta\'` for these. See [sdds-cs/feedback-overlays.md]' +
        '(sdds-cs/feedback-overlays.md).',
);
lines.push('');
lines.push(
    "- `Segment` / `SegmentProvider` / `useSegment` (raw sdds-cs) — cs-portal explicitly re-exports " +
        "`SegmentProvider`/`useSegment` from **cs-core** instead (same shadowing pattern as the table " +
        'above; the automated pass above missed this pair because the two packages don\'t share an ' +
        "exact name for the bare `Segment` component). cs-core's own `Segments`/`MultiSegments` " +
        '(different names, see [cs-core/navigation.md](cs-core/navigation.md)) are the intended way in ' +
        'almost every case — reach for the raw sdds-cs trio only if neither fits. `SegmentGroup`/' +
        "`SegmentItem` aren't themselves shadowed, but are conventionally imported alongside " +
        '`SegmentProvider` from the same package once you\'re using the raw API. ' +
        '[sdds-cs/actions.md](sdds-cs/actions.md).',
);
lines.push(
    '- `TabItem` (raw sdds-cs) — not shadowed itself, but only useful paired with raw sdds-cs `Tabs` ' +
        "(which IS shadowed, see the table above), so it's imported directly alongside it. " +
        '[sdds-cs/navigation-layout.md](sdds-cs/navigation-layout.md).',
);
lines.push(
    "- `addFocus` / `applyPaper` (sdds-cs style mixins) — live in sdds-cs's `utils/mixins` submodule, " +
        "not part of the main package index that cs-portal's `export *` covers. Same shape as the " +
        '`/beta` exception above. [sdds-cs/typography-tokens.md](sdds-cs/typography-tokens.md).',
);
lines.push('');
lines.push('## Collisions (names ambiguous across `export *` sources, unreachable via cs-portal at all)');
lines.push('');
if (levels.collisions.length === 0) {
    lines.push(
        'None found. Every name that exists in more than one re-exported source is explicitly pinned ' +
            "by cs-portal's own named exports (the exception table above) — TypeScript never had to drop " +
            'an ambiguous name from cs-portal\'s surface.',
    );
} else {
    lines.push('| Symbol | Ambiguous between |');
    lines.push('|---|---|');
    for (const c of levels.collisions) lines.push(`| ${c} |  |`);
}
lines.push('');
lines.push(`Generated from ${levels.counts.csPortalExplicit} cs-portal explicit exports + ${levels.counts.csCoreOnly} cs-core-only exports. Regenerate with \`node scripts/resolve-levels.mjs\` after a dependency bump.`);
lines.push('');
lines.push('---');
lines.push('See also: [README.md](README.md) for the priority rule, [gotchas.md](gotchas.md) for legacy/new pairs and other naming traps that aren\'t about the cascade.');

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`levels.md: ${rows.length} exception rows -> ${OUT}`);
