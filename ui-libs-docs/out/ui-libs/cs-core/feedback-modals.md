# cs-core — Feedback & modals

Level: physically defined in `@sber-front-cs-core/cs-core`, but always
`import { X } from '@sber-front-cs-core/cs-portal'` — cs-portal re-exports all of these
(`Modal`, `Overlay`, `Popover`, `showToast` are even explicitly re-pinned to this exact cs-core
version by cs-portal's index). Requires `CSProvider`/`ConfirmProvider`/`GlobalBulkActionsProvider`
mounted where noted.

---

### Modal
Base modal dialog. `content` is the body, `footer` holds action buttons, `size` is `'s'`(616px,
default) `| 'm'`(912px) `| 'l'`(1208px) `| 'fs'`(fullscreen). Requires a `PopupProvider` (bundled
via `CSProvider`) in the tree.

| Prop | Type | Default | Note |
|---|---|---|---|
| opened | `boolean` | — | required |
| onClose | `() => void` | — | required |
| content | `ReactNode` | — | wrap tables in a sized flex container |
| footer | `ReactNode` | — | usually a `<>` of `Button`s |
| title | `string` | — | 1-2 lines, close button is built in |
| size | `'s' \| 'm' \| 'l' \| 'fs'` | `'s'` | |
| portal | container/id/ref | `document` | |
also: `className`, `id`. `frame` is deprecated — use `portal`.

```tsx
<Modal
  opened={isOpen}
  onClose={() => setIsOpen(false)}
  content={<Content />}
  footer={<><Button view="clear" onClick={close}>Cancel</Button><Button view="accent">Save</Button></>}
/>
```
See also: [MobileModal](#also-available-tier-b) for small screens, `useOpenModal` in
[app-shell.md](../cs-portal/app-shell.md) for the registry-based alternative.

---

### Overlay
Bare overlay (no chrome) for custom full-area content over the page.
```ts
{ opened: boolean; onClose: () => void; content: ReactNode }
```

---

### Popover
Anchored popup for a small set of quick actions next to the triggering element (points at it with
a tail). Wraps sdds-cs's own `Popover` and additionally accepts its `portal`, `zIndex`, `target`,
`placement`, `flip`, `shift` props.

| Prop | Type | Note |
|---|---|---|
| target | element | required — the anchor |
| opened | `boolean` | required, controlled |
| onToggle | `(opened: boolean) => void` | fires on close |
| content | `ReactNode \| ReactNode[]` | |
| title / subTitle | `string` | |
| primaryButton / clearButton | `{ text, onClick, isLoading }` | action buttons |
| closeButtonVisible | `boolean` | |
also: `contentGap` (`0.5 \| 1 \| 2`, spacing when `content` is an array). `frame`/`usePortal` are
deprecated — use `portal`.

```tsx
const [opened, setOpened] = useState(false);
<Popover target={anchorEl} opened={opened} onToggle={setOpened} content={<Menu />} />
```

---

### showToast
```
@deprecated — use globalShowToasts instead.
```
```ts
showToast({ text: string, view?: 'default' | 'positive' | 'negative' }): void
```
Gotcha: deprecated in favor of `globalShowToasts` (below), which supports batching/animation and
is the one `GlobalBulkActionsProvider` wires up automatically.

---

### globalShowToasts
The current toast API. Shows one or more toasts with animation, in a consistent style.
```ts
globalShowToasts(items: { text: string, view?: 'default' | 'positive' | 'negative' }[]): void
```
```tsx
globalShowToasts([{ text: 'Saved', view: 'positive' }]);
```
Note: `setGlobalShowToasts` (internal) is auto-wired by `GlobalBulkActionsProvider` — you don't
call it directly.

---

### useConfirm / ConfirmProvider / ConfirmModal
Confirmation-dialog hook. Requires `ConfirmProvider` in the tree; throws if used outside it.
```tsx
<ConfirmProvider><App /></ConfirmProvider>

const confirm = useConfirm();
const ok = await confirm({ title: 'Delete archive?', message: 'This empties the registry.', confirmText: 'Delete', cancelText: 'Cancel' });
if (ok) showToast({ text: 'Deleted' });
```
`ConfirmModal` is the dialog component itself (rendered internally by the provider — you normally
don't use it directly).

---

## Also available (tier B)

- **BulkActions** — `import { BulkActions } from '@sber-front-cs-core/cs-portal'` · per-selection action bar (shows when items are multi-selected) · props: `items` (`{label, value, onClick, isMain?, isLoading?}[]`), `selectedCountItems`, `visibleCount` (1|2), `onClearSelected`. **Deprecated — use `GlobalBulkActions`.**
- **ClearButton** — transparent `Button` variant (green text on interaction) · props: all `Button` props except `view`, plus `width`, `height`, `hasIndicator`, `count`.
- **EntitySearch** — search/filter header bound to a `useTable` instance · props: `table` (required, a `TTableInstance`), `tableDescription`, `filterRender`.
- **GlobalAction** — action panel with overflow into an sdds `Dropdown` (`kebabMenu`) · props: `items` (supports `isMain`/`isSecondary` flags, one each max), `stretching` (`fixed\|filled\|auto`), `flexDirection`, `dropdownPlacement`.
- **GlobalBulkActions / GlobalBulkActionsProvider / useGlobalBulkActions** — app-wide bulk-action bar; mount `GlobalBulkActionsProvider` once, then call `useGlobalBulkActions({ globalActions })` anywhere to set the current action set (`buttonItems`, `iconItems`, `additionalText`, `scrollRef` to track a custom scroll container). Also exposes `showToasts` from the hook's return.
  ```tsx
  const { showToasts } = useGlobalBulkActions({ globalActions: { buttonItems: [{ label: 'Deny', value: 'deny', onClick }] } });
  ```
- **MobileModal** — `Modal` for small screens (built on sdds-cs `Sheet`), same props minus `frame`/`portal`/`size`.
- **PopoverFrame** — style-isolation container for a portal-rendered `Popover`. **Deprecated, scheduled for removal — avoid in new code.**
- **SearchHelpers** — combobox-based column filter renderer for table headers (`headerFilterRender`).
- **SearchModal** — `Modal` preset for hosting an `EntitySearch`/search UI as `content`.
- **TaskModal** — `Modal` preset for a single task/ticket: title, status/type badges, description, `headerDetail` fields, and up to 3 actions (`main`/`secondary`/`clear`).

See also: [../cs-portal/app-shell.md](../cs-portal/app-shell.md) (modal registry alternative),
[navigation.md](navigation.md), [table.md](table.md) (`EntitySearch`/`SearchHelpers` pair with a table).
