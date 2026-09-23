<!-- SKELETON for cs-core/table.md — raw material only, not the final doc. 8 symbols. -->

## infiniteQueryOptions

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const infiniteQueryOptions: InfiniteQueryConfigOptions<TResponse<unknown>, TInitialPageParam, TQueryArg>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Table

tier: A · origin: cs-core · usedByApps: true · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TTableOptions (source: cs-core)

### raw description (RU, from JSDoc)

```
Таблица
```

### raw props type

```ts
export type TTableOptions<
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg = TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg = TCustomQueryArg,
> = Omit<
    Partial<TableOptions<RowData>>,
    | 'columns'
    | 'data'
    | 'meta'
    | 'state'
    | 'initialState'
    | 'onColumnFiltersChange'
    | 'enableColumnResizing'
    | 'enableColumnPinning'
> & {
    columns: TColumnsDef<RowData, CustomQueryArg, CustomInitialPageParam>
    data: RowData[]
    meta?: TMetaScheme
    state?: Partial<TTableState>
    initialState?: Partial<TTableState>
    onColumnFiltersChange?: OnChangeFn<TColumnFiltersState>
    onEndReached?: (element: HTMLDivElement | null) => void
    onRefetch?: () => void
    isError?: boolean
    isLoading?: boolean
    isFetching?: boolean
    /** Флаг для отображения лоадера на кнопке экспорта */
    isExportActionsLoading?: boolean
    massActions?: TMassActionItem<RowData, CustomQueryArg, CustomInitialPageParam>[]
    rowActions?: TRowActionItem<RowData, CustomQueryArg, CustomInitialPageParam>[]
    globalActions?: TGlobalActionItem<RowData, CustomQueryArg, CustomInitialPageParam>[]
    customActions?: TCustomActionItem<RowData, CustomQueryArg, CustomInitialPageParam>[]
    extraArg?: TArg
    onIsFullScreenChange?: OnChangeFn<boolean>
    onDensityChange?: OnChangeFn<TDensity>
    onIsEditingChange?: OnChangeFn<boolean>
    globalFilterPlaceholder?: string
    enableTopToolbar?: boolean
    rowViewAccessorKey?: DeepKeys<RowData>
    quickFilters?: TQuickFilter[] | TMultiQuickFilter[]
    enableTopToolbarActionsTooltip?: boolean
    enableHeaderTooltip?: boolean
    enableCSVExport?: boolean
    enableExcelExport?: boolean
    /** @deprecated Больше не работает, можно удалить. Теперь всегда используется GlobalBulkActions из createApp */
    enableGlobalBulkActions?: boolean
    exportActions?: TExportActionItem<RowData, CustomQueryArg, CustomInitialPageParam>[]
    enableFilterEditing?: boolean
    enableEditing?: boolean
    name?: string
    footerRender?: (props: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>) => ReactNode
    emptyStateAfter?: TEmptyState<RowData, CustomQueryArg, CustomInitialPageParam>
    emptyStateBefore?: TEmptyState<RowData, CustomQueryArg, CustomInitialPageParam>
    view?: TTableView
    getCSVExportFilename?: (table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>) => string
    getExcelExportFilename?: (table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>) => string
    headerFilterIconVisible?: boolean
    enableFilterSegment?: boolean
    enableExportStamp?: boolean
    exportStampRender?: string
    enableRowNumbers?: boolean
    enableCreating?: boolean
    enableDeleting?: boolean
    /** Флаг для включения сервиса персонализации */
    enablePersonalization?: boolean
    /** Флаг для управления видимостью чекбокса в шапке таблицы */
    enableAllRowSelection?: boolean
    /** Флаг чтобы выключить у вложенных строк чекбокс */
    enableSubRowSelectVisible?: boolean
    /** Флаг для управления отображением внутренних паддингов при view = clear */
    enableInnerPadding?: boolean
    /** Передача ref объекта, если таблица используется в модальном окне */
    portal?: TSDDSPortal
} & Pick<CSSProperties, 'height' | 'minHeight' | 'maxHeight'>
```

### demo examples found

<!-- table/Table/TableDemo.tsx -->

```tsx
import type { TDeliveryRegistry } from '../lib/types'

import { IconAddSmileOutline, IconBookOutline, IconCarOutline, IconSunOutline } from '@salutejs/plasma-icons'

import { Table, useTable, type TTableOptions } from '../../../src'
import { columnsDemo, dataDemo } from '../lib'
import { quickFilters } from '../lib/quickFilters'
import { rowActionOutline, rowActions } from '../lib/rowActions'
import { MDeliveryRegistry } from '../lib/types'

export const tableArgs: TTableOptions<TDeliveryRegistry> = {
    columns: columnsDemo,
    data: dataDemo,
    meta: MDeliveryRegistry,
    rowViewAccessorKey: 'viewRowAccessorKey',
    globalActions: [
        {
            label: 'Глобальное действие А',
            onClick: () => console.info('Глобальное действие А'),
        },
        {
            label: 'Глобальное действие Б',
            onClick: () => console.info('Глобальное действие Б'),
        },
        {
            label: 'Глобальное действие В',
            onClick: () => console.info('Глобальное действие В'),
        },
        {
            label: 'Глобальное действие Г',
            onClick: () => console.info('Глобальное действие Г'),
        },
    ],
    customActions: [
        {
            icon: IconAddSmileOutline,
            onClick: () => console.info('Click IconAddSmileOutline'),
        },
        {
            icon: IconCarOutline,
            onClick: () => console.info('Click IconCarOutline'),
            tooltipText: 'Машина',
        },
        {
            icon: IconSunOutline,
            onClick: () => console.info('Click IconSunOutline'),
            visible: true,
            tooltipText: 'Солнце',
        },
        {
            icon: IconBookOutline,
            onClick: () => console.info('Click IconBookOutline'),
            visible: false,
        },
    ],
    massActions: [
        {
            label: 'Массовое действие А',
            visibleAccessorKey: 'actionControl.createEdo',
            onClick: (a) => console.info('Мас
```

---

## TableFilterSegmentsItem

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: TTableFilterSegmentsItemProps (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export type TTableFilterSegmentsItemProps<
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg,
> = {
    table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>
    filter: TColumnFilter & {
        defaultLabel?: string
    }
    header: THeader<RowData, CustomQueryArg, CustomInitialPageParam>
    view?: TView
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## TableGlobalFilter

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: TTableGlobalFilterProps (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export type TTableGlobalFilterProps<
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg,
> = {
    table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## TableMultiQuickFilters

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: TTableMultiQuickFiltersProps (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export type TTableMultiQuickFiltersProps<
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg,
> = {
    table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## tableQueryBuilder

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const tableQueryBuilder: <
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg,
>(
    props: TTableQueryBuilderProps<RowData, CustomQueryArg, CustomInitialPageParam>
) => TQueryArg<CustomQueryArg>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useSmartTable

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const useSmartTable: <
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg = TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg = TCustomQueryArg,
>(
    tableOptions: TSmartTableOptions<RowData, CustomQueryArg, CustomInitialPageParam>
) => TSmartTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useTable

tier: A · origin: cs-core · usedByApps: false · fromSpec: ./table

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const useTable: <
    RowData extends TRowData,
    CustomQueryArg extends TCustomQueryArg = TCustomQueryArg,
    CustomInitialPageParam extends TCustomQueryArg = TCustomQueryArg,
>({
    columns,
    enableGlobalFilter,
    initialState,
    meta,
    state,
    ...tableOptions
}: TTableOptions<RowData, CustomQueryArg, CustomInitialPageParam>) => TTableInstance<
    RowData,
    CustomQueryArg,
    CustomInitialPageParam
>
```

### demo examples found

(none — write a minimal example by hand from the props)

---
