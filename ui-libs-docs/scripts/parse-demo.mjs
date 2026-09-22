#!/usr/bin/env node
/**
 * Splits cs-core-ext/demo.txt into per-story snippets and groups them by
 * likely component name (derived from the path segment after
 * components/pages/layout/table/widgets/navigation/notifications).
 *
 * Output: raw/demo.json -> { bySlug: { [slug]: [{ path, code }] } }
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO_FILE = path.resolve(__dirname, '../../../cssupportchat/cs-core-ext/demo.txt');
const OUT_FILE = path.resolve(__dirname, '../raw/demo.json');

const text = fs.readFileSync(DEMO_FILE, 'utf-8');
const markerRe = /^\/\/ ----- stories\/(.+?) -----$/gm;

const stories = [];
const matches = [...text.matchAll(markerRe)];
for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const storyPath = m[1];
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const code = text.slice(start, end).trim();
    stories.push({ path: storyPath, code });
}

// Derive a "slug" (component name) from the story path, e.g.
// components/AccordionContent/AccordionContentDemo.tsx -> AccordionContent
// pages/PageHeaderDetail/PageHeaderDetail/ui -> PageHeaderDetail
// table/SmartTable -> SmartTable
function deriveSlug(storyPath) {
    const parts = storyPath.split('/');
    const rootDirs = ['components', 'pages', 'layout', 'table', 'widgets', 'navigation', 'notifications', 'polygon'];
    const rootIdx = parts.findIndex((p) => rootDirs.includes(p));
    if (rootIdx === -1) return parts[0];
    const root = parts[rootIdx];
    if (root === 'table') return parts[rootIdx + 1] || 'Table';
    if (root === 'polygon') return `polygon/${parts[rootIdx + 1] || ''}`;
    // walk forward skipping generic wrapper segments like "ui", "components"
    const skip = new Set(['ui', 'components']);
    let candidate = parts[rootIdx + 1];
    for (let i = rootIdx + 1; i < parts.length; i++) {
        if (!skip.has(parts[i]) && !parts[i].endsWith('.tsx') && !parts[i].endsWith('.ts')) {
            candidate = parts[i];
        }
    }
    return candidate;
}

const bySlug = {};
for (const story of stories) {
    const slug = deriveSlug(story.path);
    if (!bySlug[slug]) bySlug[slug] = [];
    bySlug[slug].push(story);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify({ totalStories: stories.length, bySlug }, null, 1));

console.log(`${stories.length} stories -> ${Object.keys(bySlug).length} slugs -> ${OUT_FILE}`);
