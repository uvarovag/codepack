# ui-libs-docs — agent instructions

This directory builds the offline UI-library reference (`out/ui-libs/`) that is copied into
`app-cssupport-ext/docs/ui-libs/` and `app-routing-ext/docs/ui-libs/`. Those two apps' `AGENTS.md`
point their own coding agent at `docs/ui-libs/README.md` — **that** doc is the one an agent reads
while building UI. This file is instructions for maintaining the pipeline that produces it.

Full background/rationale: `/Users/uvarovag/Desktop/cssupportchat/UI_LIBS_DOCS_PLAN.md` (the
original implementation spec — still the source of truth for *why* things are shaped this way;
this file is the shorter *how to operate it* companion).

## What this covers

Four libraries, in cascade order: `@sber-front-cs-core/cs-portal` (top, always the import path) →
`@sber-front-cs-core/cs-core` → `@salutejs/sdds-cs` → `@salutejs/plasma-icons` (icons, co-equal
top priority with cs-portal, not a fallback). Sources:
- cs-portal / cs-core: local `.d.ts` files in `../../cssupportchat/cs-portal-ext/dist` and
  `cs-core-ext/dist` (+ `cs-core-ext/demo.txt` for examples) — no internet needed.
- sdds-cs / plasma-icons: **only** available at `https://plasma.sberdevices.ru/` (no npm registry
  access) — needs Chrome browser tools to refresh.

## Directory map

```
raw/              scraped/parsed source material — inputs to the doc, never hand-edited except
                   where noted below
  cs-core.json       parsed from cs-core-ext/dist/*.d.ts (parse-dts.mjs)
  cs-portal.json     parsed from cs-portal-ext/dist/*.d.ts (parse-dts.mjs)
  demo.json          cs-core-ext/demo.txt split by component (parse-demo.mjs)
  levels.json        computed origins/shadowing/tiers (resolve-levels.mjs) — regenerate, don't edit
  icons.json         plasma-icons names by category (scraped; see "Updating icons" below)
  how-to-icons.json  the sdds-cs how-to-icons page, scraped
  sdds-cs/*.txt      one hand-condensed file per sdds-cs docs page (scraped; see below — this is
                     TEXT, not the JSON the original plan called for, see "Format deviation")
scripts/          the pipeline, plain Node ESM, no dependencies (see "Regenerating" below)
  file-map.json      HAND-MAINTAINED: symbol -> target doc file. Edit this, not levels.json, when
                     you add a new export that needs a home.
out/ui-libs/      the doc itself
  _skeletons/        intermediate raw-material dumps (gen-cards.mjs output) for cs-portal/cs-core
                     only — read these when hand-writing/updating a card, never ship them
  cs-portal/, cs-core/, sdds-cs/   HAND-WRITTEN card files (see "What's generated vs hand-written")
  icons.md, README.md, levels.md    MECHANICALLY GENERATED — re-run their script, don't hand-edit
  gotchas.md         HAND-WRITTEN, curated — not generated from anything
```

## What's generated vs hand-written

This matters because re-running a script can silently discard hand edits.

| File(s) | How it's produced | Safe to re-run its generator? |
|---|---|---|
| `raw/cs-core.json`, `raw/cs-portal.json` | `parse-dts.mjs` | Yes, always safe — pure extraction |
| `raw/demo.json` | `parse-demo.mjs` | Yes |
| `raw/levels.json` | `resolve-levels.mjs` | Yes, but see "Manual exceptions" below — it has hardcoded knowledge that isn't in any raw file |
| `out/ui-libs/_skeletons/**` | `gen-cards.mjs` | Yes — these are scratch material, never final |
| `out/ui-libs/cs-portal/*.md`, `out/ui-libs/cs-core/*.md` | **hand-written** (originally by a sub-agent reading `_skeletons/`, per §3.2 card format in the plan) | **No** — nothing regenerates these automatically. To refresh one after a `.d.ts` change: re-run `parse-dts.mjs` + `gen-cards.mjs`, diff the new skeleton against the old, hand-edit the card |
| `out/ui-libs/sdds-cs/*.md` | **hand-written**, from `raw/sdds-cs/*.txt` | No — same as above, but there's no skeleton step for these (see format deviation below); re-read the relevant `.txt` file(s) and edit the card directly |
| `out/ui-libs/icons.md` | `gen-icons-doc.mjs` from `raw/icons.json` (+ `levels.json`'s `appIconImports` for the "used in our apps" list, + `cs-portal.json`'s `dependencies` for the installed version) | Yes, fully mechanical |
| `out/ui-libs/README.md` | `gen-readme.mjs` (reads `levels.json` + greps `### heading`s out of the final `sdds-cs/*.md`/`icons.md` files; the version line comes from `raw/cs-portal.json`'s `version`/`dependencies`, written by `parse-dts.mjs`, and `raw/icons.json`'s `siteVersion`) | Yes — **but must run after** any sdds-cs card file changes, since it scrapes their headings |
| `out/ui-libs/levels.md` | `gen-levels.mjs` from `levels.json` + hardcoded manual-exceptions block | Yes |
| `out/ui-libs/gotchas.md` | **fully hand-written**, curated | No generator exists — edit directly |

## Manual exceptions that don't come from any raw file

Two scripts carry hardcoded knowledge that was confirmed by hand (or by an agent reading the
scraped `.txt` pages) and **will not be rediscovered by re-running the parsers**:

1. **`resolve-levels.mjs`** — `knownSddsShadowedNames` (near the top): the sdds-cs component
   names that collide with a cs-core/cs-portal export (`Badge`, `Combobox`, `Popover`, `Overlay`,
   `Modal`, `Tabs`, `Table`, `Segment`, `showToast`). There's no structured sdds-cs export list to
   diff against (see format deviation below), so this list is manually curated. **If sdds-cs adds
   or removes a component with one of these names, update this array by hand.**
2. **`check-docs.mjs`** — `allowedDirectSdds` additions (`SegmentGroup`, `SegmentItem`, `TabItem`,
   `addFocus`, `applyPaper`, `Segment`, `SegmentProvider`, `useSegment`): symbols that legitimately
   import directly from `@salutejs/sdds-cs` but aren't in `levels.json`'s auto-computed shadow list
   (either because they're a non-shadowed sibling of a shadowed anchor, like `TabItem` next to the
   shadowed `Tabs`, or because they live in a submodule cs-portal's `export *` doesn't reach, like
   `utils/mixins`). **If you add a new direct-sdds-cs-import card, add its symbol here too, or
   `check-docs.mjs` will flag it as a violation of the "always import from cs-portal" rule.**

## Format deviation: sdds-cs raw material is text, not JSON

The original plan (`UI_LIBS_DOCS_PLAN.md` §5 Step 2) specified `raw/sdds-cs/<slug>.json` with
structured `{ components, propTables, examples }`. What actually got scraped is
`raw/sdds-cs/<slug>.txt` — hand-condensed prose+tables+examples, produced by an agent reading each
page directly rather than extracting structured data. This is *higher quality* for hand-writing
cards (already condensed, deprecated markers kept, shadowing noted inline) but means:
- `resolve-levels.mjs` cannot mechanically detect sdds-cs collisions from these files — hence the
  hardcoded `knownSddsShadowedNames` list above.
- There's no `gen-cards.mjs`-equivalent skeleton step for sdds-cs. To update an sdds-cs card,
  re-scrape the page (see below) and hand-edit the corresponding `out/ui-libs/sdds-cs/*.md` card
  directly against the new `.txt`.

If you want structured JSON for sdds-cs some day, that means writing the scraper differently
(extract-don't-condense) — not a quick fix, treat it as a separate task.

## Regenerating after a library version bump

**cs-portal / cs-core bumped** (new `dist/` dropped into `cs-portal-ext/`, `cs-core-ext/`):
```
node scripts/parse-dts.mjs        # re-extract raw/cs-core.json, raw/cs-portal.json
node scripts/parse-demo.mjs       # re-extract raw/demo.json (only if demo.txt changed)
node scripts/resolve-levels.mjs   # recompute raw/levels.json (tiers, shadowing, file assignment)
```
Check the resolve-levels output for `unassigned (no file-map.json entry): N` — if N > 0, a new
export needs a home in `scripts/file-map.json` before continuing. Then:
```
node scripts/gen-cards.mjs        # regenerate out/ui-libs/_skeletons/{cs-portal,cs-core}/*.md
```
Diff each skeleton against the current hand-written card in `out/ui-libs/cs-portal/` or
`cs-core/` — update only what actually changed (new/removed props, new symbols, changed
descriptions). Don't blindly regenerate the final `.md` from the skeleton; it'll lose the
hand-compression work.

**sdds-cs changed** (rare — only when the design system itself changes): re-scrape the affected
page(s) with Chrome (`https://plasma.sberdevices.ru/sdds-cs/<path>/` — see the plan's §5 Step 2
for the scroll-to-force-lazy-render technique; this site lazily renders prop tables via
intersection observer, a plain navigate+read gets an incomplete page), hand-condense into
`raw/sdds-cs/<slug>.txt` in the same style as the existing files, then hand-edit the corresponding
card in `out/ui-libs/sdds-cs/*.md`. Re-run `node scripts/gen-readme.mjs` afterward (it scrapes
`### ` headings from these files for the symbol index).

**Icons changed** (new plasma-icons version): re-scrape `https://plasma.sberdevices.ru/icons/`
(DOM-attribute extraction worked last time — each icon tile has a sibling label div with
`{name}{Outline|Fill}{buildStamp}`; the generic-name-string safety filter blocks raw string
dumps, return `JSON.stringify` objects instead) into `raw/icons.json` matching the existing shape
(`{ siteVersion, installedVersion, extractionMethod, categories: [{ nameRu, nameEn, count, icons: [{name, style}] }], knownGaps }`),
then:
```
node scripts/gen-icons-doc.mjs
node scripts/gen-readme.mjs
```

**After any change to `out/ui-libs/**`:**
```
node scripts/check-docs.mjs       # must print "OK — no problems found."
./scripts/sync-to-apps.sh         # copies out/ui-libs (minus _skeletons) into both app repos
```
`check-docs.mjs` catches: external links, broken relative links, `#fragment` links that match no heading in the target file (GitHub slug rules: `### A / B` → `#a--b`), forbidden `from '@sber-front-cs-core/cs-core'` / `from '@salutejs/plasma-icons'` import examples, unlisted direct-sdds-cs imports, leftover skeleton/TODO markers, and the ~300-line-per-file budget (README.md is exempt — it's a data index).

## Adding a new symbol/component to the doc

1. Add it to `scripts/file-map.json` (which output file it belongs in — see the `sdds_cs_groups`
   key at the bottom for sdds-cs page groupings).
2. Re-run `resolve-levels.mjs` (for cs-portal/cs-core symbols) to confirm it's picked up and check
   for shadowing.
3. Write the card by hand in the target file, matching the format of the surrounding cards in that
   file (one-line purpose, 5-10 key props + `also:` line, <=12-line example, `Gotcha:` only if
   real). **Import line is always `from '@sber-front-cs-core/cs-portal'`** unless the symbol is a
   confirmed exception (add it to both hardcoded lists above if so).
4. `node scripts/gen-readme.mjs && node scripts/check-docs.mjs && ./scripts/sync-to-apps.sh`.

## Leftover files, safe to ignore/delete

- `scripts/transform-icons.mjs` — a one-off the icon-scraping pass used internally
  (`raw/icons_combined.json` -> `raw/icons.json`); that intermediate file no longer exists, so this
  script can't run anymore. Not part of the pipeline above.
- `out/ui-libs/_skeletons/sdds-cs/` doesn't exist — sdds-cs never went through `gen-cards.mjs` (see
  format deviation above). Don't expect it.

## Where the doc actually lives (for readers, not editors)

`out/ui-libs/` here is copied verbatim by `sync-to-apps.sh` into
`app-cssupport-ext/docs/ui-libs/` and `app-routing-ext/docs/ui-libs/` — identical in both.
**Never hand-edit the copies inside the app repos** — edit here and re-sync, or the two will
drift. Both apps' `AGENTS.md` have a one-line pointer to `docs/ui-libs/README.md` in their
project-specific section at the bottom.
