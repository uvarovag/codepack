# Gotchas

Cross-cutting traps worth knowing before you dive into a card. Per-component gotchas (deprecated
single props, etc.) live inline in their own card — this file is only the ones that aren't obvious
from reading one card in isolation.

---

### Legacy vs New pairs
cs-core kept the old component alongside a rewritten one under a `New` suffix. Always use the
`New` one unless you have a specific reason not to:
- `AccordionContent` (legacy, `@deprecated`) vs **`AccordionContentNew`** — [cs-core/data-display.md](cs-core/data-display.md)
- `AccordionPage` (legacy, `@deprecated`) vs **`AccordionPageNew`** — [cs-core/pages-layouts.md](cs-core/pages-layouts.md)

### Three similarly-named toast/notification things
- `showToast` — cs-portal's import gives you **cs-core's** `showToast` (a shadowed name, see
  [levels.md](levels.md)). This is what the apps already use.
- sdds-cs `toast` and `toast-legacy` — two different raw sdds-cs notification APIs, distinct from
  the above and from each other. See [sdds-cs/feedback-overlays.md](sdds-cs/feedback-overlays.md).
Don't mix these up by name alone — check which package a `toast`-ish import actually resolves to.

### `@salutejs/sdds-cs/beta` is a separate entry point
cs-portal's `export * from '@salutejs/sdds-cs'` only covers the main package entry, not `/beta`.
Beta `Popover` and Beta `Tooltip` are the only components in this whole doc set that are *always* a
direct import: `import { Popover, Tooltip } from '@salutejs/sdds-cs/beta'`. See
[sdds-cs/feedback-overlays.md](sdds-cs/feedback-overlays.md).

### The generic `<Icon icon="name" />` component
`@salutejs/plasma-icons` also exports a generic `Icon` that resolves an icon by string name.
**Avoid it in app UI** — it can pull every icon in the package into the bundle. Always import the
specific icon component (`IconSearch`, not `Icon` + `icon="search"`). See [icons.md](icons.md).

### Icon set version lag
The live site shows plasma-icons 1.250.0; the project has 1.249.0 installed. Icons added in the
newer version aren't available yet — if a name from the site 404s in the editor, that's why (check
`package.json`, don't assume the doc is wrong).

### `Mutation*` fields need a `FormProvider`
The whole cs-portal `Mutation*` family ([cs-portal/forms-mutations.md](cs-portal/forms-mutations.md))
assumes it's rendered inside react-hook-form's `<FormProvider>` — they don't work standalone.

### `ModalRegistryProvider` hooks throw outside the provider
`useOpenModal`, `useCloseModal`, `useIsModalOpened` all throw if called outside
`<ModalRegistryProvider>`. See [cs-portal/app-shell.md](cs-portal/app-shell.md).

### `Popover`'s `opened`/`isOpen`
Both cs-core's and sdds-cs's `Popover` accept `opened` (current) and `isOpen` (`@deprecated`,
same meaning) — use `opened`.

### Dead sitemap links on the sdds-cs site
`components/price/` and `components/progress/` redirect to the site homepage — stale sitemap
entries, not real pages. [sdds-cs/data-display.md](sdds-cs/data-display.md) has honest stubs for
both (no fabricated API) — if you need one, check a running Storybook or ask a teammate.

### `WizardPage`'s `steps` prop
Deprecated and removed in cs-core v9 — don't use it even though older code may still reference it.
See [cs-core/pages-layouts.md](cs-core/pages-layouts.md).

---
See also: [levels.md](levels.md) for the cascade/shadowing rules these gotchas assume. [README.md](README.md) to get back to the index.
