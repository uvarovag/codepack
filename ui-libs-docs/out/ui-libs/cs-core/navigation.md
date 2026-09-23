# cs-core — Navigation

Level: physically defined in `@sber-front-cs-core/cs-core`, but cs-portal re-exports all of it.
Always `import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Tabs / TabContent

`Tabs` is a thin re-export cs-portal pins to cs-core's version (cs-portal's `import { Tabs }` gives you this one, not sdds-cs's `Tabs`). `TabContent` is the same component's underlying name in cs-core.
Props: `items: { value, label, contentRight？: { variant: 'counter'|'text', value }, visible? }[]`, `value`/`onChange` (controlled), `view?: 'outer' | 'inner'` (outer = lives outside Paper, inner = inside), `portal?` (for the overflow Dropdown).
Gotcha: `selectedTabId`/`setSelectedTabId` (Tabs) and `initialItemId` (TabContent) are deprecated — use `value`/`onChange`/`defaultValue`. Overflowing tabs collapse into a kebab menu (`outer`) or get a scroll arrow (`inner`).

```tsx
const [value, setValue] = useState(items[0].value)
;<Tabs items={items} value={value} view="outer" onChange={setValue} />
```

`useTabContent({ items, defaultValue, onChange })` → `{ selectedTab, selectedTabValue, setSelectedTabValue }` if you need the state without rendering the tab strip yourself.

---

### IconTabs / IconTabContent

Icon-only tab rail, typically a sidebar. `IconTabs`: `items: { value, icon, textTooltip }[]`, `value`, `onChange`, `portal?`. `IconTabContent` additionally renders the panel content per tab: `items: { value, icon, textTooltip, content, header?, footer?, quickFilters? }[]`, `defaultValue?`, `onChange?`.

---

### Segments / MultiSegments

Segmented control (single- or multi-select chips). `Segments`: `items: TSegmentsItem[]`, `value`, `onChange`, `required?`, `view?: 'default'|'onDark'|'clear'`, `renderItem?`, `resetOptions?`. `MultiSegments` groups several `Segments`-like blocks: `groups: { items, required?, resetOptions?, renderItem? }[]`, `value`/`onChange` over the combined selection.

```tsx
<Segments items={items} value={selected} onChange={(item) => toggle(item.value)} />
```

`useSegment()` / `SegmentProvider` — deprecated, use `useHost` + `HostProvider` instead.

---

### AnchorMenu / TextMenu

Section-navigation rails for long pages: `AnchorMenu` sits 24px to the **right** of the scrollable container, `TextMenu` sits 24px to the **left**. Keep to 3-10 items.

- `TextMenu`: `items: { value, label, textHint? }[]`, `activeItem`, `onChangeActiveItem`, `isLoading?`, `skeletonCount?: 4|5|6`.
- `AnchorMenu`: same `items`/loading props, plus `containerScrollRef` (ref to the scrollable container) and `sectionMapRef` (a `useRef(new Map())` populated with `sectionId -> DOM node` for each section).

```tsx
const containerRef = useRef(null);
const sectionMapRef = useRef(new Map());
<Paper ref={containerRef}>{sections.map(s => <div key={s.value} ref={n => n && sectionMapRef.current.set(s.value, n)}>{s.content}</div>)}</Paper>
<AnchorMenu items={sections} containerScrollRef={containerRef} sectionMapRef={sectionMapRef} />
```

---

### useExternalNavigate / ExternalNavigationProvider / navigateFallback

Deprecated — use `useHost` + `HostProvider` (see [app-remote-utils.md](app-remote-utils.md)) instead. Kept for older module-federation hosts: `ExternalNavigationProvider` supplies a react-router-compatible navigate function to code rendered outside the router tree (e.g. modals); `useExternalNavigate()` reads it (throws outside the provider); `navigateFallback` is the default used when the host didn't pass one.

---

See also: [pages-layouts.md](pages-layouts.md), [table.md](table.md) for table-scoped filter segments, [app-remote-utils.md](app-remote-utils.md) for `useHost`/`HostProvider`.
