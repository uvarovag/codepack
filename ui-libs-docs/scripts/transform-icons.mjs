#!/usr/bin/env node
// One-off: raw/icons_combined.json (outline+fill category lists) -> raw/icons.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.resolve(__dirname, '../raw');
const src = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'icons_combined.json'), 'utf-8'));

function toIconName(raw) {
    // raw like "callBlockOutline" or "editFill" -> IconCallBlockOutline / IconEditFill
    const pascal = raw.charAt(0).toUpperCase() + raw.slice(1);
    return `Icon${pascal}`;
}

function mergeStyle(sections, style) {
    const out = {};
    for (const sec of sections) {
        const key = sec.en;
        if (!out[key]) out[key] = { nameRu: sec.ru, nameEn: sec.en, icons: [] };
        for (const raw of sec.icons) {
            out[key].icons.push({ name: toIconName(raw), style });
        }
    }
    return out;
}

const outlineByCat = mergeStyle(src.outline, 'outline');
const fillByCat = mergeStyle(src.fill, 'fill');

const allCatNames = [...new Set([...Object.keys(outlineByCat), ...Object.keys(fillByCat)])];
const categories = allCatNames.map((cat) => {
    const o = outlineByCat[cat];
    const f = fillByCat[cat];
    const icons = [...(o ? o.icons : []), ...(f ? f.icons : [])];
    return {
        nameRu: (o || f).nameRu,
        nameEn: cat,
        count: icons.length,
        icons: icons.sort((a, b) => a.name.localeCompare(b.name)),
    };
});

const result = {
    siteVersion: '1.250.0',
    installedVersion: '1.249.0',
    versionNote: 'Site shows 1.250.0; @salutejs/plasma-icons installed in cs-portal-ext/cs-core-ext is 1.249.0 — icons added in 1.250.0 may not be available yet.',
    extractionMethod: 'DOM: each icon tile is a <div> containing an svg (icon-root-container) and a sibling label <div> whose text is "{camelCaseName}{Outline|Fill}{buildStamp}"; build stamp suffix stripped, name PascalCased and prefixed with "Icon".',
    source: 'https://plasma.sberdevices.ru/icons/ (Plasma Icons tab, Outline + Fill styles)',
    totalIcons: categories.reduce((a, c) => a + c.icons.length, 0),
    knownGaps: {
        note: "The site's Outline/Fill toggle appears to filter by name suffix, so icons with NO style suffix (single-variant icons) never render under either tab and are absent from `categories` below. Confirmed real (imported from '@salutejs/plasma-icons' in cs-core-ext/cs-portal-ext dist bundles) but missing from the scrape:",
        icons: [
            'IconArrowBack', 'IconArrowDiagRightUp', 'IconArrowDown', 'IconArrowRight',
            'IconChevronRight', 'IconChevronUp', 'IconClip', 'IconClose', 'IconCross',
            'IconDisclosureUp', 'IconDone', 'IconDoubleDisclosureUp', 'IconDownload',
            'IconDrag', 'IconPercent', 'IconSearch', 'IconSwapVert',
        ],
        alsoLikelyPresentButUnverified: [
            'IconChevronDown', 'IconDisclosureDown', 'IconDoubleDisclosureDown', 'IconDoubleDisclosureRight',
            'IconFullscreenOff', 'IconFullscreenOn', 'IconInfo', 'IconMagic', 'IconPlus', 'IconRefresh',
            'IconRotateCw', 'IconTree', 'IconVisible', 'IconDoneDouble',
        ],
    },
    categories,
};

fs.writeFileSync(path.join(RAW_DIR, 'icons.json'), JSON.stringify(result, null, 1));
console.log(`${result.totalIcons} icons across ${categories.length} categories -> raw/icons.json`);
