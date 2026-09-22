# cs-portal — Widgets

Level: `@sber-front-cs-core/cs-portal`. Self-contained, entity-bound widgets (attachments,
events, status tracking, communication, doc chains) and micro-frontend widget factories. Always
`import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Attachment / MultiAttachment
File-attachment widgets for one entity, backed by `SmartUploadSet` internally — use these instead
of `SmartUploadSet` directly when you don't need custom RTK Query hooks per operation (they use
the built-in attachment API). `MultiAttachment` groups files into sections fetched from
`/title-info`.
```tsx
<Attachment entityUuid={order.uuid} entityId={order.id} uploadVisible deleteVisible />
<MultiAttachment entityUuid={order.uuid} entityId={order.id} downloadAllText="Download all" />
```
also: `size`, `title`/`subtitle`, `reverse`, `downloadAllVisible`, `downloadVisible`,
`openVisible`, `renameVisible`, `fileUploadExtraArg`, `fileDeleteExtraArg`.

### invalidateAttachmentTags
Invalidates the attachment widget's own RTK Query cache tags from outside code (no direct store
access needed).
```tsx
invalidateAttachmentTags(['files']);
invalidateAttachmentTags([{ type: 'files', id: entityUuid }]);
```

---

### Event / EventDrawer
Entity event-history widget (own RTK Query fetch, live WebSocket updates). `EventDrawer` is the
same content inside a [`Drawer`](layout.md#drawer).
```tsx
<Event entityUuid={order.uuid} />
<EventDrawer entityUuid={order.uuid} size="m" />
```

### Tracker / SmartStatusTrack
Status-history tracker. `Tracker` has its own Redux store + built-in RTK Query API and live
WebSocket updates — use it for a drop-in tracker. `SmartStatusTrack` is the lower-level version
where you supply the query hook yourself (no own store, no WebSocket).
```tsx
<Tracker entityUuid={order.uuid} descriptionRender={({ currentItem }) => <Text>{currentItem.description}</Text>} />

<SmartStatusTrack
  entityUuid={order.uuid}
  useStatusTrackQuery={useGetOrderHistoryQuery}
  descriptionRender={({ currentItem }) => <Text>{currentItem.description}</Text>}
/>
```

### CommunicationDrawer
Chat widget as a side panel; trigger button shows an unread-message count, auto-updates via
WebSocket.
```tsx
<CommunicationDrawer documentType="ORDER" documentId={order.id} />
```

### DocChain
Related-documents graph/list widget.
```tsx
<DocChain docNum={order.docNum} docKind="ORDER" depth={3} />
```
also: `height` (container height).

### SmartPdfViewer
PDF viewer driven by an RTK Query hook returning a `Blob`; shows an empty state with an error
message if the fetch fails.
```tsx
<SmartPdfViewer queryArg={{ documentUuid: id }} useGetPdfQuery={useGetDocumentPdfQuery} />
```
also: `skip`, `errorDescription`.

---

### createWidgetCounter / createWidgetPieChart / createWidgetHorizontalBarChart
Factories that produce a self-contained micro-frontend widget: own Redux store (from the `store`
you pass, which must already have the relevant API slice registered), an RTK Query hook for data,
and click-through navigation.
```ts
createWidgetCounter({ title, useQuery, selectFromQueryResult, store, path, queryArg? })
createWidgetPieChart({ title, useQuery, selectFromQueryResult, store, path, paramKey?, queryArg? })
createWidgetHorizontalBarChart({ /* same shape as createWidgetPieChart */ })
```
```tsx
const OrdersCounter = createWidgetCounter({
  title: 'Orders',
  path: '/orders',
  useQuery: useGetOrdersCountQuery,
  selectFromQueryResult: (data) => ({ count: data?.total }),
  store,
});

const StatusChart = createWidgetPieChart({
  title: 'Status breakdown',
  path: '/list',
  paramKey: 'statusId', // URL param carrying the clicked segment, for filtering the target page
  useQuery: useGetStatusStatsQuery,
  selectFromQueryResult: (data) => ({
    data: (data?.data ?? []).map(({ status, value }) => ({
      id: status?.statusId ?? '',
      label: `${status?.description ?? ''} (${value ?? 0})`,
      value: value ?? 0,
    })),
  }),
  store,
});
```
Both return a component `(props: { externalNavigate?, data? }) => JSX.Element`, meant to be
mounted as a Module Federation remote (see `createRemoteComponent` in
[remote-hooks-utils.md](remote-hooks-utils.md)).

### WidgetCounter / WidgetHorizontalBarChart / WidgetPieChart
The presentational components the factories above render internally (`{ count | data, isError,
...rest }`). Use these directly only if you're building your own store/query wiring instead of
using the `createWidget*` factory — for the presentational shape, prefer the plain chart
components in [../cs-core/charts.md](../cs-core/charts.md) (`Pie`, `HorizontalBar`, ...), which
these wrap.

---
See also: [remote-hooks-utils.md](remote-hooks-utils.md) for `createRemoteComponent` /
`RemoteComponent`. [forms-mutations.md](forms-mutations.md) for `SmartUploadSet`, which
`Attachment`/`MultiAttachment` build on.
