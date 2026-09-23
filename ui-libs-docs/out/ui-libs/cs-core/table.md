# cs-core — Table

Level: physically defined in `@sber-front-cs-core/cs-core`, but cs-portal re-exports all of it.
Always `import { X } from '@sber-front-cs-core/cs-portal'`. Built on TanStack Table; this doc is a
starting point, not the full option reference — there are 50+ `TTableOptions` fields, only the
common ones are listed.

---

### Getting started: useTable + Table

`useTable({ columns, data, ...options })` builds a table instance; render it with `<Table {...instance} />` (or pass the instance to `RegistryPage`/`MultiRegistryPage`, see [pages-layouts.md](pages-layouts.md)).

Common `TTableOptions` fields:

| Field                                                                                                                                                                                            | Type                                                     | Note                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------- |
| `columns`                                                                                                                                                                                        | `TColumnsDef<RowData>`                                   | required                                                            |
| `data`                                                                                                                                                                                           | `RowData[]`                                              | required                                                            |
| `isLoading` / `isFetching` / `isError`                                                                                                                                                           | `boolean`                                                |                                                                     |
| `rowActions` / `massActions` / `globalActions` / `customActions`                                                                                                                                 | arrays of `{ label/icon, onClick, visibleAccessorKey? }` | per-row / bulk / toolbar actions                                    |
| `quickFilters`                                                                                                                                                                                   | `TQuickFilter[] \| TMultiQuickFilter[]`                  |                                                                     |
| `enableEditing` / `enableFilterEditing` / `enableCreating` / `enableDeleting`                                                                                                                    | `boolean`                                                |                                                                     |
| `enableCSVExport` / `enableExcelExport`                                                                                                                                                          | `boolean`                                                | + `exportActions`, `getCSVExportFilename`, `getExcelExportFilename` |
| `enablePersonalization`                                                                                                                                                                          | `boolean`                                                | column personalization service                                      |
| `onEndReached`                                                                                                                                                                                   | `(el) => void`                                           | infinite scroll hook                                                |
| `view`                                                                                                                                                                                           | `TTableView`                                             |                                                                     |
| also: `meta`, `state`/`initialState`, `footerRender`, `emptyStateBefore`/`emptyStateAfter`, `enableRowNumbers`, `enableAllRowSelection`, `rowViewAccessorKey`, `height`/`minHeight`/`maxHeight`. |

```tsx
const table = useTable({
    columns,
    data,
    globalActions: [{ label: 'Export', onClick: () => {} }],
    rowActions: [{ label: 'Delete', icon: 'delete', onClick: (row) => {} }],
})
;<Table {...table} />
```

Gotcha: cs-portal re-exports `Table` from cs-core explicitly — `import { Table } from '@sber-front-cs-core/cs-portal'` gives you this table component, not sdds-cs's unrelated `Table`.

### useSmartTable

Same shape as `useTable` but wired for server-driven data (RTK Query-backed paging/sorting/filtering) — use when the table talks to an API endpoint instead of a static array. Pairs with `tableQueryBuilder` and `infiniteQueryOptions` below.

### Query helpers

- **tableQueryBuilder(props)** — turns the table instance's current sort/filter/pagination state into a query arg for an RTK Query endpoint.
- **infiniteQueryOptions** — RTK Query infinite-query config preset for `onEndReached`-driven pagination.

### Filter/toolbar sub-components

- **TableGlobalFilter** — `{ table }` — the search box, if you want to render it outside the default toolbar.
- **TableMultiQuickFilters** — `{ table }` — renders the `quickFilters` chips separately.
- **TableFilterSegmentsItem** — `{ table, filter, header, view? }` — one column's filter as a `Segments` control.

---

See also: [pages-layouts.md](pages-layouts.md) for `RegistryPage`/`MultiRegistryPage`, [navigation.md](navigation.md) for `Segments`.
