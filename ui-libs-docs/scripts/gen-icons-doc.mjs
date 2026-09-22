#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(__dirname, '../raw');
const OUT = path.resolve(__dirname, '../out/ui-libs/icons.md');

function readJSON(name, fallback) {
    try {
        return JSON.parse(fs.readFileSync(path.join(RAW, name), 'utf-8'));
    } catch {
        if (fallback !== undefined) return fallback;
        throw new Error(`missing raw/${name}`);
    }
}

const d = readJSON('icons.json');
// Installed version comes from cs-portal-ext/package.json via parse-dts.mjs;
// `Icon*` names the apps import come from resolve-levels.mjs' grep.
const installedVersion = (readJSON('cs-portal.json', {}).dependencies?.['@salutejs/plasma-icons'] || d.installedVersion).replace(/^[\^~]/, '');
const appIcons = readJSON('levels.json', {}).appIconImports || [];
const scrapedOrKnown = new Set([
    ...d.categories.flatMap((c) => c.icons.map((i) => i.name)),
    ...d.knownGaps.icons,
    ...(d.knownGaps.alsoLikelyPresentButUnverified || []),
]);

const out = [];
out.push('# Icons — @salutejs/plasma-icons');
out.push('');
out.push(
    `Level: \`@salutejs/plasma-icons\` (installed ${installedVersion}, site shows ${d.siteVersion} — ` +
        `icons added after ${installedVersion} are not yet available in this project). Icons are ` +
        '**top priority alongside cs-portal** — never look for an icon in a component library first, go straight here.',
);
out.push('');
out.push(
    "**Import (always):** `import { IconMagic } from '@sber-front-cs-core/cs-portal'` — cs-portal " +
        "re-exports the whole icon set via `export * from '@salutejs/plasma-icons'`. Never import " +
        'from `@salutejs/plasma-icons` directly in app code.',
);
out.push('');
out.push('## Usage');
out.push('- `size` prop: `xs`=16px, `s`=24px, `m`=36px.');
out.push(
    "- `color` prop: CSS variable, `currentColor`, `inherit`, a plain color, or a gradient. Defaults to `var(--plasma-colors-primary)`.",
);
out.push('- For a size outside xs/s/m, set `style={{ width, height }}` with `color="inherit"` so it follows the parent.');
out.push(
    '- Naming: most icons come in `...Outline` / `...Fill` pairs (e.g. `IconEditOutline` / `IconEditFill`); ' +
        'some are single-variant with no suffix (e.g. `IconClose`, `IconSearch`, `IconPlus`, `IconArrowDown`).',
);
out.push('```tsx');
out.push("import { IconSearch, IconStarFill } from '@sber-front-cs-core/cs-portal';");
out.push('');
out.push('<IconSearch size="s" />');
out.push('<IconStarFill color="linear-gradient(90deg, #2af598 0%, #009efd 100%)" />');
out.push('```');
out.push(
    'Gotcha: the package also exports a generic `<Icon icon="iconName" />` component that resolves an ' +
        'icon by string name. **Avoid it in app UI** — it can pull every icon into the bundle. Always ' +
        'import the specific icon component (`IconSearch`, not `Icon` + a string).',
);
out.push('');
out.push(`## Icons used in our apps today (${appIcons.length})`);
out.push(
    (appIcons.length ? appIcons.map((n) => `\`${n}\``).join(', ') : '(none found — re-run `node scripts/resolve-levels.mjs` with the app repos checked out)') +
        ' — as of the last `resolve-levels.mjs` run; grep the app src for `Icon[A-Z]` to get the current live list.',
);
const usedButUnscraped = appIcons.filter((n) => !scrapedOrKnown.has(n));
if (usedButUnscraped.length) {
    out.push('Of these, confirmed real by app usage but absent from the scraped list below: ' + usedButUnscraped.map((n) => `\`${n}\``).join(', ') + '.');
}
out.push('');
out.push('## Known gaps in this list');
// The scrape's note ends with its own "Confirmed real ... :" lead-in; keep
// only the explanation and render the lists ourselves.
out.push(d.knownGaps.note.split(/\s*Confirmed real/)[0].trim());
out.push(
    'Confirmed real (used in the local dist bundles) but not listed below: ' +
        d.knownGaps.icons.map((n) => `\`${n}\``).join(', ') +
        '.',
);
// App usage is proof of existence — don't call an icon "unverified" when one
// of our apps already imports and compiles it.
const appIconSet = new Set(appIcons);
const stillUnverified = (d.knownGaps.alsoLikelyPresentButUnverified || []).filter((n) => !appIconSet.has(n));
if (stillUnverified.length) {
    out.push('Plausible but unverified: ' + stillUnverified.map((n) => `\`${n}\``).join(', ') + '.');
}
out.push("If the icon you need isn't below and isn't in the gap list either, check the live site or ask a teammate rather than guessing a name.");
out.push('');
out.push('## All icons by category');
out.push('One line per category: `NameEn (count)` then every icon name, comma-separated, `Outline`/`Fill` suffix as scraped.');
out.push('');
for (const c of d.categories) {
    const names = c.icons.map((i) => i.name).sort();
    out.push(`**${c.nameEn}** (${c.count}): ${names.join(', ')}`);
    out.push('');
}
out.push('---');
out.push('See also: [gotchas.md](gotchas.md) for the bundle-size note on sized entry points. [README.md](README.md) for the full cascade rule.');

fs.writeFileSync(OUT, out.join('\n'));
console.log('written, lines:', out.join('\n').split('\n').length, '->', OUT);
