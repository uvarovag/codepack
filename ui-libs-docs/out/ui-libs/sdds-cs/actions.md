# sdds-cs — Actions

Level: `@salutejs/sdds-cs`. Last-resort tier — reach here only when cs-portal/cs-core have no
wrapper for what you need. Default import is still cs-portal:
`import { X } from '@sber-front-cs-core/cs-portal'` (cs-portal re-exports this whole package via
`export * from '@salutejs/sdds-cs'`). The one exception in this file is `Segment`/`SegmentGroup`/
`SegmentItem` — see its card below.

---

### Button
Text and/or icon button. `text`, `contentLeft`/`contentRight` (icon slots), `value` (renders right
of text — mutually exclusive with `contentRight`), `view: 'clear'|'accent'|'secondary'`,
`size: 's'|'m'|'sr'`, `stretching: 'auto'(default)|'filled'|'fixed'`, `isLoading`, `loader`
(custom loading content), `pin` (corner rounding, 7 presets), `as="a"` to render as a link.
```tsx
<Button text="Save" view="accent" contentLeft={<IconDownload color="inherit" />} isLoading={saving} />
```
also: `focused`, `contentPlacing: 'default'|'relaxed'`, `appearance: 'default'|'outline'`.
Gotcha: `stretch`, `square`, `outlined`, `shiftLeft`/`shiftRight`, `blur` are all `@deprecated`
(use `stretching`, `IconButton`, `focused`, `pin`, — respectively; `blur` has no replacement, just
don't use it on non-transparent buttons).

### IconButton
Icon-only button (icon as `children`). Same prop shape as `Button` minus `text`/`value` relevance.
```tsx
<IconButton size="s" view="secondary" pin="circle-circle"><IconClose color="inherit" /></IconButton>
```

### ButtonGroup
Wraps a set of `Button`s. `orientation: 'horizontal'(default)|'vertical'`, `gap: 'none'|'dense'(default)|'wide'`,
`shape: 'default'|'segmented'` (rounds the group as one pill instead of each button), `stretching: 'auto'|'filled'`,
`isCommonButtonStyles` (default `true`) — when true, the group's `view`/`size` override each child Button's own.
```tsx
<ButtonGroup size="s" view="secondary" shape="segmented">
  {items.map((item) => <Button key={item.id} text={item.label} />)}
</ButtonGroup>
```

---

### Chip
Text/icon tag, dismissible by default. `text` (or `children`), `contentLeft`/`contentRight`,
`hasClear` (default `true`, shows a close icon), `onClickClose`, `view: 'default'|'accent'|'secondary'`,
`size: 's'|'xs'` (default `'m'`), `pilled`, `pin`, `readOnly`.
```tsx
<Chip text="React" view="accent" onClickClose={() => remove('react')} />
```
Gotcha: `onClear` is `@deprecated`, use `onClickClose`.

### ChipGroup
Wraps `Chip`s, same `isCommon*Styles` override pattern as `ButtonGroup`. `gap`, `shape`,
`isWrapped` (wrap to new row instead of overflow).
```tsx
<ChipGroup view="secondary" gap="wide">{tags.map((t) => <Chip key={t} text={t} />)}</ChipGroup>
```

---

### Link
Inline hyperlink — nest inside a typography component (see
[typography-tokens.md](typography-tokens.md)), not standalone.
```tsx
<TextS>Download the <Link href="/app" target="_blank" underline="hover">app</Link>.</TextS>
```
Props: `view: 'clear'|'default'|'accent'|'positive'|'negative'|'secondary'|'warning'|'tertiary'|'paragraph'`,
`underline: 'none'(default)|'hover'|'always'`, `disabled`, `size`.

### Dropdown
Multi-level menu wrapping a trigger element via `children`. Only required prop: `items`
(`{ value, label, placement?, items?: nested[], contentLeft?, contentRight?, dividerBefore?, disabled? }[]`).
```tsx
const items = [
  { value: 'na', label: 'North America' },
  { value: 'sa', label: 'South America', items: [{ value: 'br', label: 'Brazil' }] },
];
<Dropdown items={items}><Button text="Countries" /></Dropdown>;
```
also: `placement`, `trigger: 'click'(default)|'hover'`, `onItemSelect`, `closeOnSelect` (default `true`),
`portal`, `renderItem` (custom item renderer), `alwaysOpened`.
Keyboard: follows W3C Combobox + partial TreeView patterns (arrows navigate, → opens a submenu, ← closes it).

---

### Segment / SegmentGroup / SegmentItem / SegmentProvider / useSegment
**Shadowed** — cs-portal's `SegmentProvider`/`useSegment` re-export cs-core's own implementation,
not this sdds-cs one; `Segments`/`MultiSegments` (cs-core, see `cs-core/navigation.md`) are the
higher-level components built on it. Use this raw sdds-cs version only if you need
`SegmentGroup`/`SegmentItem` directly with no cs-core wrapper fitting:
```ts
import { SegmentProvider, SegmentGroup, SegmentItem, useSegment } from '@salutejs/sdds-cs';
```
```tsx
function Inner() {
  const { selectedSegmentItems } = useSegment();
  return (
    <SegmentGroup hasBackground pilled clip={false}>
      {items.map((item) => <SegmentItem key={item.value} label={item.label} value={item.value} pilled />)}
    </SegmentGroup>
  );
}
<SegmentProvider defaultSelected={['label_1']}><Inner /></SegmentProvider>;
```
`SegmentGroup`: `view: 'clear'|'filled'`, `orientation: 'horizontal'(default)|'vertical'`,
`clip` (default `true`, scroll+arrows when width-constrained), `hasBackground`, `hasDivider`, `stretch`.
`SegmentItem`: `label`, `contentLeft`/`contentRight`, `pilled`, `view: 'default'|'secondary'`.
Gotcha: `SegmentGroup.selectionMode` and `filledBackground` are `@deprecated`.

---
See also: [inputs-forms.md](inputs-forms.md) for form controls, [data-display.md](data-display.md)
for non-interactive display components, [../cs-core/navigation.md](../cs-core/navigation.md) for
the cs-portal-reachable `Segments`/`useSegment`.
