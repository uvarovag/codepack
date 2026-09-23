# cs-portal — App shell

Level: `@sber-front-cs-core/cs-portal`. App bootstrap, routing guards, the modal registry, and the
WebSocket/RTK Query glue. Always `import { X } from '@sber-front-cs-core/cs-portal'`.

---

### createApp

Root app factory: wires react-router routes + an optional Redux store into one component.

```ts
createApp({ routes, store? }): (props: { basename?, externalNavigate?, segment? }) => JSX.Element
```

```tsx
const App = createApp({ routes, store })
root.render(<App basename="/portal" />)
```

Note: cs-core also exports a `createApp` (a lower-level app factory) — this is cs-portal's own, shadows it.

---

### createProtectedRouteMiddleware

Builds a react-router middleware that gates a route behind an RTK Query check; redirects if the
query errors or the selector returns false.

```ts
createProtectedRouteMiddleware<QueryDefinition>({
  store, endpoint, select: (data) => boolean, redirectTo?: string, // default '/'
}): middleware
```

```tsx
const middleware = createProtectedRouteMiddleware({
    store,
    endpoint: api.endpoints.getMe,
    select: (data) => data?.role === 'admin',
    redirectTo: '/login',
})
```

---

### ProtectedRoute

Component form of the same idea: runs `useQuery`, checks `selectFromQueryResult`, renders
`children` on success or an error page otherwise.

```tsx
<ProtectedRoute useQuery={useGetPermissionsQuery} selectFromQueryResult={(data) => data?.canViewOrders}>
    <OrdersPage />
</ProtectedRoute>
```

also: generic over the RTK Query result/arg/baseQuery types — TS infers them from `useQuery`.

---

### getNotificationClient

Returns the app-wide singleton STOMP client (created on first call, cached on
`globalThis.__PUB_SUB_CLIENT__`). Pass it (or a factory returning it) to `createPubSupApi` /
`invalidateBySubscribe`.

```tsx
const client = getNotificationClient()
const sub = client.subscribe('/topic/my-topic', (body) => console.log(body))
sub.unsubscribe()
```

---

### createPubSupApi

Builds a typed RTK Query API over WebSocket/STOMP. For every topic in `topics`, generates
`use{Name}Subscribe` (cache-integrated, auto subscribe/unsubscribe on mount) and
`use{Name}Publish` hooks.

```ts
createPubSupApi({ client, topics: (build) => ({ ... }), reducerPath? }) // default 'pubSubApi'
```

```tsx
export const notificationApi = createPubSupApi({
    client: getNotificationClient,
    topics: (build) => ({
        orderUpdated: build.subscribe<TOrderUpdate>({ topic: '/topic/orders' }),
        sendMessage: build.publish<TSendMessage>({ topic: '/app/messages' }),
    }),
})
// in a component:
const { data } = notificationApi.useOrderUpdatedSubscribe()
const [send] = notificationApi.useSendMessagePublish()
```

---

### invalidateBySubscribe

RTK Query `onCacheEntryAdded` helper: subscribes to a STOMP topic while a cache entry is alive and
invalidates tags on message.

```tsx
getOrders: {
  providesTags: ['Order'],
  ...invalidateBySubscribe({
    client: getNotificationClient,
    topic: '/topic/orders',
    tags: (payload) => [{ type: 'Order', id: payload?.entityUuid }],
  }),
}
```

---

### createReduxStore

Builds a Redux store from one or more RTK Query APIs (auto-wires their reducers/middleware).

```tsx
const store = createReduxStore([userApi, ordersApi], {
    middlewareOptions: { serializableCheck: false },
})
```

---

### withReduxProvider

HOC — wraps a component in `<Provider store={...}>`.

```tsx
const App = withReduxProvider(RawApp, store)
```

---

### ComposeProviders

Composes a list of provider components into one, avoiding deep manual nesting. See cs-portal's
own component tree for the canonical usage (wraps redux/user/modal-registry providers together).

---

### UserProvider / useUser / useUserType

Session/user context. `UserProvider` wraps the tree; `useUser()` returns
`{ data: { userType }, isLoading, isError, error }`; `useUserType()` returns the same shape with
`data` narrowed to `'INTERNAL' | 'SUPPLIER' | undefined`.

```tsx
;<UserProvider>
    <App />
</UserProvider>
// deeper in the tree:
const { data, isLoading } = useUser()
const userType = useUserType().data
```

---

### ModalRegistryProvider / useOpenModal / useCloseModal / useIsModalOpened

A stack-based modal registry, independent of any single Modal component. Wrap the app once;
open/close any registered modal component from anywhere by reference.

```tsx
;<ModalRegistryProvider>
    <App />
</ModalRegistryProvider>

const openModal = useOpenModal()
await openModal(EditModal, { itemId: '123' }) // resolves when the modal closes
await openModal(ConfirmModal, undefined, { table: tableInstance }) // 3rd arg: extra registry context

const closeModal = useCloseModal()
closeModal(MyModalComponent)

const isOpen = useIsModalOpened(ConfirmModal) // boolean; omit the arg to ask "is anything open"
```

Gotcha: all four throw if called/rendered outside `ModalRegistryProvider`.
Types: `TModalComponent`, `TModalProps`.

---

See also: [layout.md](layout.md) for `ErrorFallback`/`StatusPage` shown when a protected route or
query fails. [remote-hooks-utils.md](remote-hooks-utils.md) for `createRemoteComponent`.
