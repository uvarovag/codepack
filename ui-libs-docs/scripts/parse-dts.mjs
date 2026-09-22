#!/usr/bin/env node
/**
 * Extracts raw material (JSDoc description + props type text) for every named
 * export of cs-core/cs-portal's index.d.ts, resolving each export to its module.
 *
 * Output: raw/cs-core.json, raw/cs-portal.json
 *   { package, version, dependencies (from <pkg>-ext/package.json), reExportAll, exports: [
 *     { symbol, kind: 'value'|'type', from: relative module path, description, propsRaw, propsTypeName } ] }
 *
 * This does not attempt to fully parse TypeScript. It extracts text blocks
 * (JSDoc comments, type bodies) verbatim so a human (or a focused sub-task)
 * can compress them into a markdown card later. No deps, plain Node.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../../cssupportchat');
const OUT_DIR = path.resolve(__dirname, '../raw');

const TARGETS = ['cs-core', 'cs-portal'].map((name) => ({
    name,
    distDir: path.join(ROOT, `${name}-ext/dist`),
    indexFile: path.join(ROOT, `${name}-ext/dist/index.d.ts`),
    pkgFile: path.join(ROOT, `${name}-ext/package.json`),
}));

// ----- tiny bracket-depth-aware scanner -----------------------------------

const OPEN = { '{': '}', '(': ')', '[': ']', '<': '>' };
const CLOSE = new Set(['}', ')', ']', '>']);

// Given text and a start index right after an opening bracket char, return
// the index of its matching closer (bracket-depth aware, ignoring brackets
// inside string/template literals).
function findMatchingClose(text, openIdx) {
    const openChar = text[openIdx];
    const closeChar = OPEN[openChar];
    let depth = 1;
    let i = openIdx + 1;
    while (i < text.length && depth > 0) {
        const c = text[i];
        if (c === '"' || c === "'" || c === '`') {
            const quote = c;
            i++;
            while (i < text.length && text[i] !== quote) {
                if (text[i] === '\\') i++;
                i++;
            }
        } else if (c === openChar) {
            depth++;
        } else if (c === closeChar) {
            depth--;
        }
        i++;
    }
    return i - 1;
}

// Extract raw text of `export type Name = ...;` or `export interface Name { ... }`
// starting at `startIdx` (index of the `=` for type alias, or `{` for interface).
function extractTypeBody(text, name) {
    const aliasRe = new RegExp(`export type ${name}(<[^=]*)?\\s*=\\s*`, 'g');
    const ifaceRe = new RegExp(`export interface ${name}(<[^{]*)?\\s*\\{`, 'g');

    let m = aliasRe.exec(text);
    if (m) {
        const bodyStart = m.index + m[0].length;
        // Walk forward tracking bracket depth until a top-level ';' or EOF.
        let depth = 0;
        let i = bodyStart;
        for (; i < text.length; i++) {
            const c = text[i];
            if (c === '"' || c === "'" || c === '`') {
                const quote = c;
                i++;
                while (i < text.length && text[i] !== quote) {
                    if (text[i] === '\\') i++;
                    i++;
                }
                continue;
            }
            if ('{(['.includes(c)) depth++;
            else if ('})]'.includes(c)) depth--;
            else if (c === ';' && depth <= 0) break;
        }
        return text.slice(m.index, i + 1);
    }

    m = ifaceRe.exec(text);
    if (m) {
        const braceIdx = m.index + m[0].length - 1;
        const closeIdx = findMatchingClose(text, braceIdx);
        return text.slice(m.index, closeIdx + 1);
    }
    return null;
}

// Extract the JSDoc comment (if any) immediately preceding
// `export declare const NAME` / `export declare function NAME` / `export declare class NAME`.
function extractJsDoc(text, name) {
    const declRe = new RegExp(`export declare (const|function|class) ${name}\\b`);
    const m = declRe.exec(text);
    if (!m) return null;
    const before = text.slice(0, m.index);
    // The body must not contain `*/`, otherwise this would capture from the
    // FIRST `/**` in the file up to the comment right before the declaration.
    const jsdocMatch = /\/\*\*((?:(?!\*\/)[\s\S])*)\*\/\s*$/.exec(before);
    if (!jsdocMatch) return null;
    return jsdocMatch[1]
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, ''))
        .join('\n')
        .trim();
}

// ----- index.d.ts export parsing -------------------------------------------

// Parses top-level `export { A, B as C } from './x';`, `export type { ... } from './x';`,
// and `export * from 'pkg';` lines. Returns { reExportAll: string[], named: [{local, exported, from, isType}] }
function parseIndex(indexText) {
    const reExportAll = [];
    const named = [];

    const lineRe = /export\s+(type\s+)?\{([^}]*)\}\s+from\s+'([^']+)';/g;
    let m;
    while ((m = lineRe.exec(indexText))) {
        const isType = !!m[1];
        const from = m[3];
        const specifiers = m[2].split(',').map((s) => s.trim()).filter(Boolean);
        for (const spec of specifiers) {
            const asMatch = /^(?:type\s+)?(\S+)\s+as\s+(\S+)$/.exec(spec);
            const specIsType = isType || /^type\s+/.test(spec);
            if (asMatch) {
                named.push({ local: asMatch[1], exported: asMatch[2], from, isType: specIsType });
            } else {
                const clean = spec.replace(/^type\s+/, '');
                named.push({ local: clean, exported: clean, from, isType: specIsType });
            }
        }
    }

    const starRe = /export\s+\*\s+from\s+'([^']+)';/g;
    while ((m = starRe.exec(indexText))) {
        reExportAll.push(m[1]);
    }

    return { reExportAll, named };
}

// Resolve a relative module specifier (e.g. './components/Badge') to a directory
// or file under distDir, trying common layouts.
function resolveModuleDir(distDir, spec) {
    if (!spec.startsWith('.')) return null; // external package, not a local dir
    const direct = path.join(distDir, spec);
    if (fs.existsSync(direct) && fs.statSync(direct).isDirectory()) return direct;
    if (fs.existsSync(direct + '.d.ts')) return direct + '.d.ts'; // it's a file
    return null;
}

function readIfExists(p) {
    try {
        return fs.readFileSync(p, 'utf-8');
    } catch {
        return null;
    }
}

// All .d.ts files under a directory, recursively (skip ui/ and lib/ internals
// for speed on huge dirs like table/, but keep everything else).
function listDtsFiles(dir) {
    const out = [];
    function walk(d) {
        let entries;
        try {
            entries = fs.readdirSync(d, { withFileTypes: true });
        } catch {
            return;
        }
        for (const ent of entries) {
            const full = path.join(d, ent.name);
            if (ent.isDirectory()) walk(full);
            else if (ent.name.endsWith('.d.ts')) out.push(full);
        }
    }
    walk(dir);
    return out;
}

// Fallback: raw `export declare (const|function|class) name ...;` signature,
// bracket-depth aware so generics/object params don't break it early.
function extractDeclSignature(text, name) {
    const re = new RegExp(`export declare (const|function|class) ${name}\\b`);
    const m = re.exec(text);
    if (!m) return null;
    let i = m.index + m[0].length;
    let depth = 0;
    for (; i < text.length; i++) {
        const c = text[i];
        if ('{(['.includes(c)) depth++;
        else if ('})]'.includes(c)) depth--;
        else if (c === ';' && depth <= 0) break;
    }
    return text.slice(m.index, i + 1);
}

function processTarget({ name, distDir, indexFile, pkgFile }) {
    const indexText = fs.readFileSync(indexFile, 'utf-8');
    const { reExportAll, named } = parseIndex(indexText);
    // Installed version + declared deps: the single source of truth for the
    // version line in README.md / icons.md (gen-readme.mjs, gen-icons-doc.mjs).
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    const dependencies = { ...(pkg.peerDependencies || {}), ...(pkg.dependencies || {}) };

    const results = [];

    for (const entry of named) {
        const resolved = resolveModuleDir(distDir, entry.from);
        let description = null;
        let propsRaw = null;
        let propsTypeName = null;
        let indexDtsOfModule = null;

        let declSignature = null;

        if (resolved && fs.statSync(resolved).isDirectory()) {
            const moduleIndex = readIfExists(path.join(resolved, 'index.d.ts'));
            indexDtsOfModule = moduleIndex;

            // main component file: {Dir}/{basename}.d.ts (e.g. Badge/Badge.d.ts)
            const base = path.basename(resolved);
            const mainFile = readIfExists(path.join(resolved, `${base}.d.ts`));
            const typesFile = readIfExists(path.join(resolved, 'types.d.ts'));

            // Priority search order, then fall back to every .d.ts in the tree
            // (breadth-first-ish: shallow files first) for JSDoc/decl/props.
            const allFiles = listDtsFiles(resolved);
            const priority = [mainFile, moduleIndex, typesFile].filter(Boolean);
            const rest = allFiles
                .filter((f) => ![path.join(resolved, `${base}.d.ts`), path.join(resolved, 'index.d.ts'), path.join(resolved, 'types.d.ts')].includes(f))
                .sort((a, b) => a.split(path.sep).length - b.split(path.sep).length)
                .map(readIfExists)
                .filter(Boolean);
            const searchIn = [...priority, ...rest];

            for (const txt of searchIn) {
                if (!description) description = extractJsDoc(txt, entry.local);
                if (!declSignature) declSignature = extractDeclSignature(txt, entry.local);
                if (description && declSignature) break;
            }

            // props type name guesses, in order
            const guesses = [
                `T${entry.exported}Props`,
                `T${entry.local}Props`,
                `${entry.exported}Props`,
                `T${entry.exported}`,
                `${entry.exported}Options`,
                `T${entry.exported}Options`,
            ];
            for (const txt of searchIn) {
                for (const g of guesses) {
                    const body = extractTypeBody(txt, g);
                    if (body) {
                        propsRaw = body;
                        propsTypeName = g;
                        break;
                    }
                }
                if (propsRaw) break;
            }

            if (!propsRaw && declSignature) {
                propsRaw = declSignature;
                propsTypeName = '(signature, no dedicated Props type found)';
            }
        } else if (resolved) {
            // direct file (e.g. './components/RemoteComponent/RemoteComponent' resolved to a .d.ts)
            const txt = readIfExists(resolved);
            if (txt) {
                description = extractJsDoc(txt, entry.local);
                declSignature = extractDeclSignature(txt, entry.local);
                if (declSignature) {
                    propsRaw = declSignature;
                    propsTypeName = '(signature, no dedicated Props type found)';
                }
            }
        }

        results.push({
            symbol: entry.exported,
            localName: entry.local,
            isType: entry.isType,
            from: entry.from,
            resolvedDir: resolved ? path.relative(distDir, resolved) : null,
            description: description || null,
            propsTypeName,
            propsRaw,
        });
    }

    return { package: name, version: pkg.version, dependencies, reExportAll, exports: results };
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const target of TARGETS) {
    const data = processTarget(target);
    const outFile = path.join(OUT_DIR, `${target.name}.json`);
    fs.writeFileSync(outFile, JSON.stringify(data, null, 1));
    const withDesc = data.exports.filter((e) => e.description).length;
    const withProps = data.exports.filter((e) => e.propsRaw).length;
    console.log(
        `${target.name}: ${data.exports.length} named exports, ${withDesc} with description, ${withProps} with props block -> ${outFile}`,
    );
}
