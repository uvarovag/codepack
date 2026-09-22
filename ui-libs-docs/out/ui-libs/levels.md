# Levels & the cascade

```
@sber-front-cs-core/cs-portal   <- always import from here
        |  export * from:
        |-- @salutejs/sdds-themes/es/tokens/sdds_cs   (color/typography tokens)
        |-- @salutejs/sdds-cs                          (primitives)
        |-- @salutejs/plasma-icons                     (icons)
        |-- @sber-front-cs-core/cs-core                (business components)
        `-- ~40 of its own components/hooks/widgets, plus explicit named
            re-exports that PIN a specific origin for ~30 shadowed names
            (see the table below)
```

Priority for what to reach for (not what to write as the import path — that's always
cs-portal, see [README.md](README.md)):
1. `cs-portal` for components, `plasma-icons` for icons — co-equal top priority.
2. `cs-core` — only when cs-portal has no match.
3. `sdds-cs` — last resort: raw primitives, or a name from the exception table below.

## Why some names need a direct import

TypeScript's `export *` rule: an explicit named export always wins over a wildcard re-export. cs-portal's `index.d.ts` does `export * from` four different packages, then ALSO explicitly re-exports about 30 names by hand — for those names, the explicit line decides which origin cs-portal actually gives you, and the *other* origin's same-named export becomes unreachable through cs-portal. If you need that other one, you must import it directly from its own package.

## Exception table — the only names that ever need a non-cs-portal import

| Symbol | `import from cs-portal` gives you | The shadowed alternative | Import it directly with |
|---|---|---|---|
| Badge | cs-core | sdds-cs | `import { Badge } from '@salutejs/sdds-cs'` |
| Combobox | cs-core | sdds-cs | `import { Combobox } from '@salutejs/sdds-cs'` |
| createApp | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| createRemoteComponent | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| getMessagesFromResponse | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| getNestedValue | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| Modal | cs-core | sdds-cs | `import { Modal } from '@salutejs/sdds-cs'` |
| MutationAutocomplete | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationCheckboxGroup | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationCombobox | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationDatePicker | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationDatePickerRange | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationMask | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationNumberFormat | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationNumberInput | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationRadioGroup | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationSelect | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationSubmit | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationSwitch | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationTextArea | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationTextField | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationTreeCheckbox | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| MutationUploadSet | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| Overlay | cs-core | sdds-cs | `import { Overlay } from '@salutejs/sdds-cs'` |
| Popover | cs-core | sdds-cs | `import { Popover } from '@salutejs/sdds-cs'` |
| RemoteComponent | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |
| showToast | cs-core | sdds-cs | `import { showToast } from '@salutejs/sdds-cs'` |
| Table | cs-core | sdds-cs | `import { Table } from '@salutejs/sdds-cs'` |
| Tabs | cs-core | sdds-cs | `import { Tabs } from '@salutejs/sdds-cs'` |
| useMutationSubmit | cs-portal (own) | cs-core (different implementation, same name) | _(informational only — no direct cs-core import; cs-portal's own version is always the right one)_ |

`Badge`, `Combobox`, `Modal`, `Overlay`, `Popover`, `showToast`, `Table`, `Tabs` additionally exist as raw sdds-cs primitives with a different (usually lower-level, less opinionated) API than the cs-core/cs-portal version — see each one's card in `sdds-cs/*.md` for the raw shape and a note on how it differs, if the source material had one. These are the only rows above where a direct `@salutejs/sdds-cs` import is ever correct — the cs-core-shadowed rows (`Mutation*`, `createApp`, `createRemoteComponent`, `getMessagesFromResponse`, `getNestedValue`, `RemoteComponent`, `useMutationSubmit`) have no legitimate direct-cs-core-import case: cs-portal's own version is always what you want there.

## Always-direct exceptions (not shadowing — just not re-exported at all)

- `@salutejs/sdds-cs/beta` (Beta `Popover`, Beta `Tooltip`, ...) — cs-portal's `export *` only covers the main `@salutejs/sdds-cs` entry point, not the `/beta` subpath. Always `import { X } from '@salutejs/sdds-cs/beta'` for these. See [sdds-cs/feedback-overlays.md](sdds-cs/feedback-overlays.md).

- `Segment` / `SegmentProvider` / `useSegment` (raw sdds-cs) — cs-portal explicitly re-exports `SegmentProvider`/`useSegment` from **cs-core** instead (same shadowing pattern as the table above; the automated pass above missed this pair because the two packages don't share an exact name for the bare `Segment` component). cs-core's own `Segments`/`MultiSegments` (different names, see [cs-core/navigation.md](cs-core/navigation.md)) are the intended way in almost every case — reach for the raw sdds-cs trio only if neither fits. `SegmentGroup`/`SegmentItem` aren't themselves shadowed, but are conventionally imported alongside `SegmentProvider` from the same package once you're using the raw API. [sdds-cs/actions.md](sdds-cs/actions.md).
- `TabItem` (raw sdds-cs) — not shadowed itself, but only useful paired with raw sdds-cs `Tabs` (which IS shadowed, see the table above), so it's imported directly alongside it. [sdds-cs/navigation-layout.md](sdds-cs/navigation-layout.md).
- `addFocus` / `applyPaper` (sdds-cs style mixins) — live in sdds-cs's `utils/mixins` submodule, not part of the main package index that cs-portal's `export *` covers. Same shape as the `/beta` exception above. [sdds-cs/typography-tokens.md](sdds-cs/typography-tokens.md).

## Collisions (names ambiguous across `export *` sources, unreachable via cs-portal at all)

None found. Every name that exists in more than one re-exported source is explicitly pinned by cs-portal's own named exports (the exception table above) — TypeScript never had to drop an ambiguous name from cs-portal's surface.

Generated from 138 cs-portal explicit exports + 152 cs-core-only exports. Regenerate with `node scripts/resolve-levels.mjs` after a dependency bump.

---
See also: [README.md](README.md) for the priority rule, [gotchas.md](gotchas.md) for legacy/new pairs and other naming traps that aren't about the cascade.