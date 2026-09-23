# sdds-cs — Navigation & layout primitives

Level: `@salutejs/sdds-cs` (last resort — check [cs-portal](../cs-portal/) and
[cs-core](../cs-core/) docs first; most of this is re-exported by cs-portal, so
`import { X } from '@sber-front-cs-core/cs-portal'` unless a card below says otherwise).

---

### Tabs / TabItem (raw sdds-cs)

cs-core has its own `Tabs`/`TabContent` (higher-level, items-array API), and cs-portal
re-exports **cs-core's** `Tabs`, shadowing this one — see
[../cs-core/navigation.md](../cs-core/navigation.md). To use this raw sdds-cs version
specifically (manual `TabItem` composition): `import { Tabs, TabItem } from '@salutejs/sdds-cs'`.

```tsx
const [index, setIndex] = useState(0)
;<Tabs view="filled" stretch size="s">
    {items.map((label, i) => (
        <TabItem key={label} view="secondary" selected={i === index} onClick={() => setIndex(i)}>
            {label}
        </TabItem>
    ))}
</Tabs>
```

`Tabs`: view (`'clear'|'filled'|'divider'`), size, stretch, orientation
(`'horizontal'|'vertical'`), clip (`'scroll'`(default)`|'showAll'`, pair `showAll` with a Dropdown
"show all" `TabItem` for overflow), index (for keyboard nav).
`TabItem`: view, selected, disabled, contentLeft/contentRight, actionContent (e.g. close icon),
value.
Gotcha: keyboard navigation (arrow keys/Home/End) needs `index`+`itemIndex`+`onIndexChange` wired
manually — `TabsController` is deprecated. `pilled`/`animated`/`isActive` props are deprecated
(use `selected`).

### Breadcrumbs

```tsx
<Breadcrumbs
    items={[
        { title: 'Home', href: '/' },
        { title: 'On click', onClick: () => {} },
        { renderItem: () => <span>Custom</span> },
        { title: 'Current' },
    ]}
    showItems={3}
/>
```

`items*: ({ title, href?, disabled? } | { title, onClick?, disabled? } | { renderItem: () => ReactNode })[]`.
`showItems` collapses middle items behind `"..."`.

### Pagination

```tsx
const [page, setPage] = useState(1)
;<Pagination
    slots={9}
    count={2000}
    value={page}
    hasPerPage
    perPage={20}
    hasQuickJump
    onChange={(p, pp) => {
        if (p) setPage(p)
    }}
/>
```

`count*: number` (total pages, or items if `hasPerPage` set), `value`/`defaultValue`, `type:
'default'|'compact'` (compact shows only the current page), `hasPerPage` (+ `perPage`/
`perPageList`), `hasQuickJump` ("jump to page" input), `slots: 1-15` (visible page buttons),
`leftContent`/`rightContent` (custom first/prev/next/last buttons).
Gotcha: `onChangePageValue`/`onChangePerPageValue` deprecated — use `onChange(page?, perPage?)`.

### Grid / Row / Col

Responsive grid. Breakpoints: `smallS` 0-559 (6 cols) → `mediumS` 560-785 (12) → `mediumM`
786-959 (18) → `largeS` 960-1199 (24) → `largeM` 1200+ (30).

```tsx
<Grid>
    <Row>
        <Col size={3}>A</Col>
        <Col size={4} offset={1}>
            B
        </Col>
    </Row>
</Grid>
```

`Col`: `size`/`offset` (columns), or per-breakpoint objects e.g. `smallM={{ size: 1 }}`
(breakpoint × `XXS|XS|S|M|L|XL|XXL`). `Row` is a negative-margin flex wrapper, not itself
nestable inside another `Row`.
Gotcha: `offsetS`/`sizeS`/etc. (suffixed) and `Grid`'s `maxWidth` are deprecated.

### ViewContainer

Inverts color tokens for everything inside it, independent of the app's global theme — use when
placing content on a background that doesn't match the current theme (e.g. a light card in a
dark-themed app) to avoid color clashes. Used by [Tooltip](feedback-overlays.md#tooltip-stable-non-beta)'s
own dark/light example.

```tsx
<ViewContainer view="onLight" style={{ background: '#ededed', padding: '1rem' }}>
    <Button text="Button" />
</ViewContainer>
```

`view*: 'onLight' | 'onDark'`.

---

### Styling mixins (`@salutejs/sdds-cs` utils)

Helper functions for `styled-components` / plain style objects, not components.

**`addFocus(options?)`** — focus ring via `::before` (doesn't affect layout). Options:
`outlineSize`, `outlineOffset`, `outlineColor`, `outlineRadius`, `hasTransition`,
`customFocusRules`.

```tsx
const Focusable = styled.div`
    ${addFocus({ outlineColor: 'var(--text-accent)' })}
`
```

**`applyPaper(options)`** — returns a style object for a themed "paper" background block. Options:
`backgroundColor`/`borderRadius`/`shadow` (theme tokens), `styles` (extra CSS).

```tsx
<div style={applyPaper({ backgroundColor: 'surfaceAccent', borderRadius: 'borderRadiusM', shadow: 'shadowDownHardM' })}>
    Card
</div>
```

See [typography-tokens.md](typography-tokens.md) for the color/typography token names these
options reference.

---

See also: [actions.md](actions.md), [inputs-forms.md](inputs-forms.md),
[data-display.md](data-display.md), [feedback-overlays.md](feedback-overlays.md). Shadowed
`Tabs` original: [../cs-core/navigation.md](../cs-core/navigation.md).
