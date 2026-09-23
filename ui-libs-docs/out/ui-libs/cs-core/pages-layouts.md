# cs-core — Pages & layouts

Level: physically defined in `@sber-front-cs-core/cs-core`, but cs-portal re-exports all of it.
Always `import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Page templates

Full-page shells: `header` + `content`/`master`/`detail` + `footer`. Pick one, don't nest them.

**Page** — plain page: `header`, `content`, `footer` (all `ReactNode`), `contentOverflow`, `contentBorderRadius`.

```tsx
<Page
  header={<PageHeader title="..." breadcrumbs={...} />}
  content={<Paper><TextM>...</TextM></Paper>}
  footer={<Paper><Button view="accent">Action</Button></Paper>}
/>
```

**TabPage** — `Page` + `TabContent` merged: same `header`/`footer` as Page, plus `items` (tabs), `defaultValue`, `onChange`, `view: 'outer' | 'inner'`.

**SplitContainer** — two-pane layout, `master` (left) + `detail` (right, optional), `fixed?: 'master' | 'detail'` toggles which side keeps its size, `enableScroll?: boolean` for independent-scroll panes + auto mobile adaptation. This is what you wrap `Page`/`TabPage`/`RegistryPage` etc. in.

```tsx
<SplitContainer master={<Page ... />} detail={<Page ... />} />
```

**RegistryPage** — single-table registry page: `title`, `table` (a `useTable`/`useSmartTable` instance — see [table.md](table.md)), `onClickCreate?`, `count?`, plus `PageHeader` props (breadcrumbs etc).

**MultiRegistryPage** + **createMultiRegistryItem** — tabbed multi-table registry page. Build each tab with `createMultiRegistryItem({ label, value, table, count? })`, pass the array as `items`.

```tsx
const items = [
    createMultiRegistryItem({ label: 'Table 1', value: '1', table: useDeliveryTable() }),
    createMultiRegistryItem({ label: 'Table 2', value: '2', table: useCheckTable() }),
]
;<MultiRegistryPage title="Registries" items={items} onClickCreate={() => {}} />
```

**AccordionPageNew** — `Page` (header/footer) + `AccordionContentNew` sections merged; `items`, `value`, `onChange` (see [data-display.md](data-display.md#accordioncontent--accordioncontentnew)).
Gotcha: `AccordionPage` (no suffix) is the **legacy** version (`@deprecated`, wraps `AccordionContentLegacy`) — always use `AccordionPageNew`.

**WizardPage** — multi-step wizard for long/complex forms (not for 1-2 step flows — use a progress component instead). `title`, `value: string[]` (current path), `onChange`, `items: TWizardItem[]` (`title`, `value`, `content`, `nextValue`, `size?: 's'|'m'|'fs'`), `handleSubmit?`, `textFinish`, `onFinish`, `textCancel`, `onCancel?`, `breadcrumbs`.
Gotcha: `steps` prop (Steps/stepper from sdds) is deprecated, removed in cs-core v9.

**LoaderPage** — centered spinner page template. Props: `text?: string`.

**EmptyPages** — full-screen error/empty states. `view: 'notFound' | 'forbidden' | 'unavailable'`, `onClick?` (only `forbidden` also takes `description?`).

---

### Page header

**PageHeader** — `breadcrumbs`, `title`, `subtitle`, `status` (Badge status), `infoItems` (Badge info), `count`, `actionsToolbar` (max ~5 icon buttons), `content` (analytics block — prefer `PageHeaderDetail` here), `isLoading`, `skeletonCount`.

**PageHeaderDetail** — wrapper grouping several `PageHeaderDetailGroup`s inside `PageHeader`'s `content`. Just `children`.

**PageHeaderDetailGroup** — one labeled group of label/value pairs. `label?`, `items: { label?, value, newLine?, iconRight? }[]`, `info?: { text, view }`, `maxCountRow?: 3 | 4`.
Gotcha: `elements`/`textIconInfo` props are deprecated aliases for `items`/`info`.

```tsx
<PageHeaderDetail>
    <PageHeaderDetailGroup
        label="Requisites"
        items={[
            { label: 'No.', value: '14-0184' },
            { label: 'Date', value: '24.04.2026', newLine: true },
        ]}
        maxCountRow={4}
    />
</PageHeaderDetail>
```

---

### Layout primitives

**FlexBox** — thin wrapper over CSS flexbox (a curated subset of flex properties: `flexDirection`, `gap`, `justifyContent`, `alignItems`, `flex`, `flexGrow`, `width`/`height`, `overflow`, ...).

**Paper** — `FlexBox` + visual `variant` (surface/elevation). Same flex props plus `variant`.

**CSProvider** — one root provider bundling Popup, `GlobalBulkActionsProvider` (toggle with `enableGlobalBulkActions?: boolean`), and `ConfirmProvider` (required for `useConfirm`, see [feedback-modals.md](feedback-modals.md#useconfirm--confirmprovider--confirmmodal)). Wrap the app once.

**StandAloneWrapper** + **globalCSS** — standalone-app shell (fixed size/background/padding) that also injects `globalCSS` (base style overrides). Not needed when running inside the Стартовый менеджер host shell.

---

### Forms — flex variant

`FormFlex` (container, `readonly?` toggles the whole form edit/read mode) → `FormGroupFlex` (`label?`) → `FormElementFlex` (one field, forwards `FlexBox` props).

```tsx
<FormFlex readonly={isReadonly}>
    <FormGroupFlex label="Group title">
        <FormElementFlex>
            <DataField label="label" value="text" />
        </FormElementFlex>
        <FormElementFlex>
            <TextField label="label" value="text" />
        </FormElementFlex>
    </FormGroupFlex>
</FormFlex>
```

### Forms — grid variant

Same idea, column-based: `FormGrid` (`readonly?`) → `FormGroupGrid` (`label?`) → `FormElementGrid` (`size?: 's'|'m'|'l'` = 1/2/3 columns, default `s`; `newLine?` forces a row break).

---

### Cards

**PaperCard** — `header` (`title`, `subTitle?`, `marks?`, `buttons?`, `actionsToolbar?`, `numberInput?`), `content` (put `PaperCardElement`s inside, wrap in a fragment), `footer` (`ReactNode` or `{ buttons, description? }`), `quickFilters?`, `enableScroll?`, `description?`.

**PaperCardElement** — a card section (child of `PaperCard`): `header` (`title`, `marks?`, `buttons?`, `badge?`, `image?` XOR `informer?`, `paddingSize?: 's'|'m'`), `content`, `visibleContent?` (shown while collapsed — needs `accordion.opened`/`onOpen`), `footer?`, `view?: 'solid'|'secondary'|'selected'`, `accordion?: { opened, onOpen }`, `checked?: { checked, onChange, type?: 'radio'|'switch'|'checkbox', visible? }`.
Gotcha: the select control (radio/switch/checkbox) never renders when `paddingSize === 's'`.

**PaperCardElementCatalog** — catalog-tile variant of `PaperCardElement`: `header: { title, marks? }` (required), `content?`, `footer?: { icon, onClick, content?, isLoading?, numberInput? }`, `rating?: { value }`. The `footer.numberInput` needs a react-hook-form `FormProvider` ancestor.

---

### Also available

- **WidgetPaper** — `import { WidgetPaper } from '@sber-front-cs-core/cs-portal'` · small stat/chart tile (`1x1`/`2x1`/`2x2`/`4x2` sizes) with click-through (`widgetOnClick` > `href`+`navigate`) · props: `title`, `actions`, `isLoading`, `isEmpty`, `hasFilters`, `size`, plus most `FlexBox`/`Paper` props (not `height`/`width`).

---

See also: [data-display.md](data-display.md) for `AccordionContentNew`, `Badge`, `DataField`. [table.md](table.md) for `useTable`/`useSmartTable`. [feedback-modals.md](feedback-modals.md) for `useConfirm`/`ConfirmProvider`. [../cs-portal/app-shell.md](../cs-portal/app-shell.md), [../cs-portal/layout.md](../cs-portal/layout.md).
