# cs-core — Charts

Level: `@sber-front-cs-core/cs-core` (built on Nivo). Always
`import { X } from '@sber-front-cs-core/cs-portal'`. Two families: bare chart components
(`HorizontalBar`, `VerticalBar`, `Pie`, `Line`) and `Widget*` versions that wrap the same chart in
a `WidgetPaper` card (title, actions, loading/empty states, click-through).

All of them share this click-priority chain: `onClick` (per-item) > `widgetOnClick` (whole widget,
Widget* only) > `href`/`getHref` + `navigate`. Use `getHref`/`href` + `navigate` (a react-router
navigate function) for routing, or `onClick`/`widgetOnClick` for custom logic.

## Common props

| Prop                                                                                         | Type                                                                               | Applies to   | Note                                          |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------ | --------------------------------------------- |
| data                                                                                         | `TWidgetItem[]` (bar/pie) or series `{ id, label, unit?, data: {x,y}[] }[]` (line) | all          | required                                      |
| tooltip                                                                                      | custom tooltip component                                                           | all          |                                               |
| onClick                                                                                      | `(event, data) => void`                                                            | all          | overrides `navigate`/`getHref` for that item  |
| getHref                                                                                      | `(data) => string`                                                                 | all          | used with `navigate`                          |
| navigate                                                                                     | react-router navigate fn                                                           | all          | fires on click if no `onClick`                |
| title, actions                                                                               | `string`, `ReactNode`                                                              | Widget* only | card header                                   |
| href, widgetOnClick                                                                          | `string`, `() => void`                                                             | Widget* only | click on the whole card; `widgetOnClick` wins |
| isEmpty, hasFilters, isLoading                                                               | `boolean`                                                                          | Widget* only | card states                                   |
| size                                                                                         | `'1x1' \| '2x1' \| '2x2' \| '4x2'`                                                 | Widget* only | card size                                     |
| also: full Nivo `Responsive{Bar,Pie,Line}` prop set (`colors`, `colorBy`, `margin`, `theme`, |
| `valueFormat`, ...) is passed through.                                                       |

## Per-component extras

| Component                                      | Extra props                                                                                                  | Notes                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `Pie` / `WidgetPie`                            | `legendTitle`, `legendItemCountVisible`, `legendMaxHeight`, `centeredMetric(Postfix)(Visible)`, `selectedId` | Overlapping-label slices collapse into "Other" (expandable in the legend). |
| `Line` / `WidgetLine`                          | (Nivo `ResponsiveLine` props: `curve`, `enableArea`, ...)                                                    | Gradient-filled area line chart.                                           |
| `HorizontalBar` / `VerticalBar` / `Widget*Bar` | (Nivo `ResponsiveBar` props)                                                                                 |                                                                            |
| `WidgetStackedHorizontalBar`                   | `colorBy`, `colors`, `fill`                                                                                  | Categories stacked within one bar.                                         |

```tsx
<WidgetPie
    title="Service tickets"
    legendTitle="Count"
    data={[
        { id: 'done', value: 92, label: 'Done', unit: 'pcs' },
        { id: 'open', value: 8, label: 'Open', unit: 'pcs' },
    ]}
    getHref={(item) => `/tickets?status=${item.id}`}
    navigate={navigate}
    centeredMetricPostfixVisible
    centeredMetricPostfix="pcs"
/>
```

```tsx
<HorizontalBar
    data={[
        { id: 'done', value: 92, label: 'Done' },
        { id: 'in-progress', value: 50, label: 'In progress' },
    ]}
/>
```

Gotcha: `WidgetHorizontalBar`/`WidgetVerticalBar`/`WidgetStackedHorizontalBar`/`WidgetLine` have no
bare-signature JSDoc beyond the shared description above — treat the common-props table as
authoritative for them.

See also: [pages-layouts.md](pages-layouts.md) for `WidgetPaper` (the card `Widget*` builds on).
