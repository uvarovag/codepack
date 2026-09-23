# sdds-cs — Data display

Level: `@salutejs/sdds-cs` (last resort — check [cs-portal](../cs-portal/) and
[cs-core](../cs-core/) docs first; almost everything here is re-exported by cs-portal, so
`import { X } from '@sber-front-cs-core/cs-portal'` unless a card below says otherwise).

---

### Avatar / AvatarGroup

Circular profile image or initials, with status dot and an optional Badge/Counter overlay.
`AvatarGroup` just wraps a list of `Avatar`s (no documented props beyond `children`).

```tsx
<AvatarGroup>
  {people.map((p) => <Avatar key={p.id} size="s" url={p.photoUrl} name={p.fullName} />)}
</AvatarGroup>
<Avatar size="m" name="Иван Фадеев" status="active" />
```

| Prop                                                                                                           | Type                                      | Default | Note                                               |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------- | -------------------------------------------------- |
| size                                                                                                           | `'xxl'\|'l'\|'m'\|'s'\|'fit'`             |         |                                                    |
| name                                                                                                           | `string`                                  |         | shows initials if no `url`; also covers a11y label |
| url                                                                                                            | `string`                                  |         | photo                                              |
| status                                                                                                         | `'active'\|'inactive'`                    |         | dot; `statusLabels` overrides a11y text            |
| isScalable                                                                                                     | `boolean`                                 |         | grows on hover                                     |
| hasExtra / type / extraPlacement                                                                               | `boolean` / `'badge'\|'counter'` / corner |         | overlay badge/counter                              |
| also: shape, focused, counterView, customBorderRadius, count/maxCount/thousandSeparator (when type="counter"). |
| Gotcha: `clear`/`transparent` are deprecated, use `appearance`.                                                |

---

### Badge (raw sdds-cs)

cs-core's own `Badge` — re-exported by cs-portal, **shadowing** this one — has a stricter,
discriminated-union API (`view: 'info'|'status'`, mutually exclusive `text`/`icon`); see
[../cs-core/data-display.md](../cs-core/data-display.md#badge). This raw sdds-cs version is more
permissive/freeform. To use it specifically: `import { Badge } from '@salutejs/sdds-cs'`.

```tsx
<Badge text="Бейдж" size="s" view="accent" contentLeft={<IconEye color="inherit" size="xs" />} />
```

| Prop                                                                  | Type                                          | Default   | Note       |
| --------------------------------------------------------------------- | --------------------------------------------- | --------- | ---------- |
| view                                                                  | `'default'\|'accent'\|'positive'\|'negative'` | `default` |            |
| size                                                                  | `'s'\|'m'`                                    | `m`       |            |
| text                                                                  | `string`                                      |           |            |
| appearance                                                            | `'clear'\|'default'`                          |           |            |
| contentLeft / contentRight                                            | `ReactNode`                                   |           | icon slots |
| also: maxWidth, customColor, customBackgroundColor, pilled, truncate. |
| Gotcha: `clear`/`transparent` deprecated, use `appearance`.           |

---

### Counter

Numeric badge; `maxCount` caps display as `"N+"`.

```tsx
<Counter count={10} maxCount={9} />        {/* -> "9+" */}
<Counter count={1234567} thousandSeparator="," />
```

| Prop              | Type                    | Default   |
| ----------------- | ----------------------- | --------- |
| count*            | `number`                |           |
| maxCount          | `number`                |           |
| view              | `'default'\|'negative'` | `default` |
| size              | `'s'\|'xs'`             | `xs`      |
| thousandSeparator | `string\|boolean`       | `' '`     |

### Indicator

Small status dot, no children.

```tsx
<Indicator size="m" view="positive" />
```

`view*: 'default'|'accent'|'positive'|'negative'|'inactive'|'warning'|'black'`, `size*: 's'|'m'|'l'`.

---

### Card / CardContent / CardInnerContent

Visual container: `Card` (outer, `orientation`/`size`/`selected`/`backgroundType`) →
`CardContent` (nested, own rounding + `overflow: hidden`, `aspectRatio`) → `CardInnerContent`
(absolutely positioned inside `CardContent`, doesn't affect card size — for overlay content).

```tsx
<Card orientation="horizontal" backgroundType="solid" selected style={{ width: '250px' }}>
    <CardContent orientation="vertical" aspectRatio="1/1">
        <CardInnerContent>
            <div style={{ padding: 30 }}>
                <H3>Title</H3>
                <TextS>Subtitle</TextS>
            </div>
        </CardInnerContent>
    </CardContent>
</Card>
```

### Cell

List-row slot: `title`/`subtitle`/`label` + `contentLeft`/`contentRight` icon/avatar slots.

```tsx
<Cell
    contentLeft={<Avatar size="m" url={url} />}
    contentRight={<IconChevronRight color="inherit" size="xs" />}
    title="Title"
    subtitle="Subtitle"
    label="Label"
    size="s"
/>
```

also: alignContentLeft/Right, stretching. Gotcha: `content` and `description` are deprecated —
use `contentLeft` and `title`.

### Image

```tsx
<Image src="/img.jpg" width="320px" height="320px" alt="..." />
```

`base: 'img'|'div'`, `ratio: '1/1'|'3/4'|'4/3'|'9/16'|'16/9'|'1/2'|'2/1'`, or `customRatio`.

---

### Table (raw sdds-cs)

cs-core has its own, much larger `Table` (sorting/filtering/infinite-query, built on
`@tanstack/react-table`) and cs-portal re-exports **that** one, shadowing this — see
[../cs-core/table.md](../cs-core/table.md). This raw sdds-cs `Table` is the simple version: no
external state management, just `data`/`columns`. To use it specifically:
`import { Table } from '@salutejs/sdds-cs'`.

```tsx
const data = [{ id: '0', country: 'Канада', capital: 'Оттава', population: 38 }]
const columns = [
    { id: 'country', label: 'Страна' },
    { id: 'capital', label: 'Столица' },
    { id: 'population', label: 'Население, млн' },
]
;<Table data={data} columns={columns} />
```

also: onChange({selected,filtered,sorted}), enableSelection, borderVariant, maxHeight,
stickyHeader, onCellUpdate, topContent/bottomContent/loadingSlot, classNames. Each column can set
`enableSorting`/`enableResizing`/`enableEditing`/`filters`/`filterFn`/`renderCell`.

### Tree

Multi-level expandable/selectable list.

```tsx
<Tree items={treeData} defaultExpandAll checkable multiple />
```

`items*: TreeItem[]` (`{ key, title, icon?, children?, disabled?, contentRight? }`).
also: checkedKeys/expandedKeys/selectedKeys (+ `default*` uncontrolled variants),
onTreeSelect/onTreeCheck/onTreeExpand, draggable + onDrop/allowDrop (you mutate `items` yourself),
loadData (async lazy children, returns a Promise), virtual/height/itemHeight (virtualization,
required together), mode: `'radio'|'default'`.

---

### Accordion / AccordionItem (raw sdds-cs)

Not the same as cs-core's `AccordionContent`/`AccordionContentNew` (a higher-level
items-array API) — see [../cs-core/data-display.md](../cs-core/data-display.md#accordioncontent--accordioncontentnew).
Use this raw version only if you need the bare expand/collapse primitive.

```tsx
<Accordion size="s" singleActive>
    <AccordionItem defaultIconContent="arrow" defaultIconPlacement="left" title="...">
        ...
    </AccordionItem>
</Accordion>
```

`Accordion`: view, size, singleActive, defaultActiveEventKey (`number[]`), disabled, stretching,
onChange(index?, value?).
`AccordionItem`: title, opened, eventKey, index, disabled, type (`'clear'|'arrow'|'sign'`),
defaultIconContent (`'arrow'|'chevron'|'sign'|'clear'`), defaultIconPlacement (`'left'|'right'`),
contentLeft/contentRight, onChange(index, value).
Gotcha: passing custom `contentRight` disables the built-in open/close icon rotation animation —
animate it yourself based on `opened`.

---

### Carousel

Horizontal scrollable strip of arbitrary children.

```tsx
<Carousel gap="16px">
    {items.map((item) => (
        <Card key={item}>{item}</Card>
    ))}
</Carousel>
```

also: index/onChangeIndex (controlled) or defaultIndex (uncontrolled), loop, autoPlay +
autoPlayInterval (default 5000ms), swipeEnabled, controlArrowsDisabled, scrollAlign,
paginationOptions, virtual.

### Steps

Step/progress indicator; caller owns status transitions.

```tsx
const [items, setItems] = useState([{ indicator: 1, title: 'Step 1', status: 'active' }, ...]);
const onChange = (item, index, prevIndex) => {
  if (prevIndex !== undefined) items[prevIndex].status = 'completed';
  items[index].status = 'active';
  setItems([...items]);
};
<Steps items={items} onChange={onChange} />;
```

`items: { indicator, title, content?, status: 'active'|'inactive'|'completed' }[]`.
also: orientation (`'horizontal'|'vertical'`), hasLine, hasContent, current (uncontrolled index).
Gotcha: can nest (e.g. inside an Accordion) — give the outer `Steps` an explicit `height` if
content height varies.

### Flow

Flex-based layout container for ordered children (cards/media/text blocks).

```tsx
<Flow orientation="vertical" mainAxisGap="0.5ch" crossAxisGap="1ch" itemsPerLine={2}>
    {items}
</Flow>
```

`itemsPerLine > 0` switches from `flex-wrap` to fixed columns/rows. also: arrangement, alignment.

### Divider

```tsx
<Divider orientation="vertical" length="100%" />
```

`orientation: 'horizontal'|'vertical'`, `length: string|number` (number = %).

---

### Skeleton family: LineSkeleton / RectSkeleton / TextSkeleton / withSkeleton

`LineSkeleton` (one line, `size` = a typography token like `"h3"`/`"bodyM"`), `RectSkeleton`
(`width*`/`height*` required), `TextSkeleton` (`lines*` count). `withSkeleton(Component)` HOC
turns any component into its own skeleton via a `skeleton` prop.

```tsx
;<RectSkeleton width="12rem" height="8rem" animationType="shimmer" />

const ButtonSkeleton = withSkeleton(Button)
;<ButtonSkeleton text="Загрузка..." skeleton aria-busy />
```

also: animationType (`'shimmer'|'pulse'`), animationDuration, customGradientColor,
customFadeInColor/customFadeOutColor, roundness.

### Spinner

```tsx
<Spinner size={32} />
```

`view: 'default'|'accent'|'positive'|'negative'|'secondary'|'warning'|'tertiary'|'paragraph'`,
`size`/`width`/`height: string|number`.

---

### price / progress

sdds-cs's docs pages for these returned a dead redirect during scraping (stale sitemap entries on
the live site) — props/examples could not be captured here. Check a running Storybook or ask a
teammate if you need these specifically; do not guess their API from the name alone.

---

See also: [actions.md](actions.md), [inputs-forms.md](inputs-forms.md),
[feedback-overlays.md](feedback-overlays.md), [navigation-layout.md](navigation-layout.md),
[typography-tokens.md](typography-tokens.md). For the cs-core/cs-portal versions that shadow
`Badge`/`Table`/`Accordion` here, see [../cs-core/data-display.md](../cs-core/data-display.md) and
[../cs-core/table.md](../cs-core/table.md).
