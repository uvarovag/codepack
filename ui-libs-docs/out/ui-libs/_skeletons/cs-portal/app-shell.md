<!-- SKELETON for cs-portal/app-shell.md — raw material only, not the final doc. 15 symbols. -->

## createApp
tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./app
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Создаёт корневое React-приложение с routing и Redux.

@param {TCreateAppProps} props
@param {RouteObject[]} props.routes - Массив маршрутов react-router
@param {Store} [props.store] - Redux store; если не передан — создаётся внутренний

@returns Корневой компонент приложения

@example
const App = createApp({ routes, store })
root.render(<App basename="/portal" />)
```

### raw props type
```ts
export declare const createApp: ({ routes, store }: TCreateAppProps) => ({ basename, externalNavigate, segment }: import("@sber-front-cs-core/cs-core").TAppProps) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createProtectedRouteMiddleware
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./app

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Создаёт middleware для защищённых маршрутов react-router.

Инициирует RTK Query endpoint, проверяет результат через `select`
и выбрасывает редирект если данные не получены или доступ запрещён.

@template QueryDefinition - Определение RTK Query endpoint

@param {TCreateProtectedRouteMiddlewareParams<QueryDefinition>} params
@param {Store} params.store - Redux store для dispatch endpoint
@param {ApiEndpointQuery} params.endpoint - RTK Query endpoint для проверки доступа
@param {Function} params.select - Селектор: принимает результат запроса, возвращает boolean
@param {string} [params.redirectTo='/'] - Путь для редиректа при отказе в доступе

@returns {TCreateProtectedRouteMiddlewareResult} Middleware-функция react-router

@throws {Response} Редирект на `redirectTo` если запрос завершился ошибкой или `select` вернул false

@example
const middleware = createProtectedRouteMiddleware({
  store,
  endpoint: api.endpoints.getMe,
  select: (data) => data?.role === 'admin',
  redirectTo: '/login',
})
```

### raw props type
```ts
export declare const createProtectedRouteMiddleware: <QueryDefinition extends AnyQueryDefinition>({ endpoint, redirectTo, select, store, }: TCreateProtectedRouteMiddlewareParams<QueryDefinition>) => TCreateProtectedRouteMiddlewareResult;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createPubSupApi
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./websocket

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Создаёт типизированный RTK Query API для работы с WebSocket через STOMP.

Генерирует хуки `use{Name}Subscribe` и `use{Name}Publish` для каждого топика.
Subscribe-хуки интегрируются с RTK Query кешем и автоматически
подписываются/отписываются при монтировании/размонтировании.

@template Definitions - Тип определений топиков

@param {CreatePubSubApiOptions<Definitions>} options
@param {TPubSubConsumer | (() => TPubSubConsumer)} options.client - Клиент или его фабрика
@param {string} [options.reducerPath='pubSubApi'] - Путь в Redux store
@param {Function} options.topics - Функция-билдер определений топиков

@returns {CreatePubSubApiResult<Definitions>} API с хуками, reducer, middleware и util

@example
export const notificationApi = createPubSupApi({
  client: getNotificationClient,
  topics: (build) => ({
    orderUpdated: build.subscribe<TOrderUpdate>({
      topic: '/topic/orders',
    }),
    sendMessage: build.publish<TSendMessage>({
      topic: '/app/messages',
    }),
  }),
})

// В компоненте:
const { data } = notificationApi.useOrderUpdatedSubscribe()
const [send] = notificationApi.useSendMessagePublish()
```

### raw props type
```ts
export declare const createPubSupApi: CreatePubSubApi;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createReduxStore
tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./utils/createReduxStore

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Создаёт Redux store на основе одного или нескольких RTK Query API.

@param {TApi | TApi[]} api - RTK Query API или массив API
@param {TCreateReduxStoreOptions} [options]

@returns {EnhancedStore}

@example
const store = createReduxStore([userApi, ordersApi], {
  middlewareOptions: { serializableCheck: false }
})
```

### raw props type
```ts
export declare const createReduxStore: (api: TApi | TApi[], options?: TCreateReduxStoreOptions) => import("@reduxjs/toolkit").EnhancedStore<{
    [x: string]: any;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        [x: string]: any;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## getNotificationClient
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./app

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Возвращает синглтон STOMP-клиента уведомлений.

При первом вызове создаёт клиент и сохраняет его в `globalThis.__PUB_SUB_CLIENT__`.
Последующие вызовы возвращают тот же экземпляр.
Клиент подключается к WebSocket немедленно при создании.

@returns {TPubSubConsumer} Интерфейс подписки/публикации (без методов connect/disconnect)

@example
const client = getNotificationClient()
const sub = client.subscribe('/topic/my-topic', (body) => console.log(body))
sub.unsubscribe()
```

### raw props type
```ts
export declare const getNotificationClient: () => TPubSubConsumer;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## invalidateBySubscribe
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./websocket

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Создаёт RTK Query `onCacheEntryAdded` handler для инвалидации тегов по WebSocket.

Подписывается на топик при первом кеш-entry, инвалидирует теги при сообщении,
отписывается при удалении последнего кеш-entry.

@template QueryTypes

@param {InvalidateBySubscribeParams<QueryTypes>} params
@param {TPubSubConsumer | (() => TPubSubConsumer)} params.client
@param {string} params.topic - STOMP топик
@param {ResultDescriptionFrom<QueryTypes>} params.tags - Теги или функция `(payload) => tags[]`

@returns {InvalidateBySubscribeResult<QueryTypes>}

@example
getOrders: {
  providesTags: ['Order'],
  ...invalidateBySubscribe({
    client: getNotificationClient,
    topic: '/topic/orders',
    tags: (payload: TSubscribeResponse) => [{ type: 'Order', id: payload?.entityUuid }],
  }),
}
```

### raw props type
```ts
export declare const invalidateBySubscribe: <QueryTypes>({ client: clientOrFn, tags, topic, }: InvalidateBySubscribeParams<QueryTypes>) => InvalidateBySubscribeResult<QueryTypes>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ModalRegistryProvider
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./modalRegistry

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Провайдер реестра модальных окон.

Оборачивает дерево компонентов и предоставляет контекст
для `useOpenModal`, `useCloseModal` и 'useIsModalOpened'. Управляет стеком открытых модалок.

@param {PropsWithChildren} props

@example
<ModalRegistryProvider>
  <App />
</ModalRegistryProvider>
```

### raw props type
```ts
export declare const ModalRegistryProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ProtectedRoute
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/ProtectedRoute

propsType: TProtectedRouteProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Компонент защищённого маршрута на основе RTK Query.

Выполняет запрос через `useQuery`, проверяет доступ через `selectFromQueryResult`.
Рендерит `children` если доступ разрешён, иначе показывает страницу ошибки.

@template ResultType - Тип данных из RTK Query
@template QueryArg - Тип аргумента запроса
@template BaseQuery - Базовый query функции RTK

@param {TProtectedRouteProps<ResultType, QueryArg, BaseQuery>} props
@param {TypedUseQuery} props.useQuery - RTK Query хук для проверки доступа
@param {Function} props.selectFromQueryResult - Селектор: `true` — доступ разрешён
@param {ReactNode} props.children - Контент защищённого маршрута

@example
<ProtectedRoute
  useQuery={useGetPermissionsQuery}
  selectFromQueryResult={(data) => data?.canViewOrders}
>
  <OrdersPage />
</ProtectedRoute>
```

### raw props type
```ts
export type TProtectedRouteProps<ResultType, QueryArg, BaseQuery extends BaseQueryFn> = PropsWithChildren<{
    useQuery: TypedUseQuery<ResultType, QueryArg, BaseQuery>;
    selectFromQueryResult: (data: ResultType) => boolean | undefined;
}>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useCloseModal
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./modalRegistry

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Хук для закрытия модального окна через реестр.

@returns {TCloseModalFn}
@throws {Error} Если используется вне `ModalRegistryProvider`

@example
const closeModal = useCloseModal()
closeModal(MyModalComponent)
```

### raw props type
```ts
export declare const useCloseModal: () => import("./types").TCloseModalFn;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useIsModalOpened
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./modalRegistry

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Хук для проверки состояния открытия компонентов (модальные окна, дроверы и т.д.)

@param component - Имя компонента (например, модального окна).
  Если передан — возвращается `true`, если этот компонент открыт, иначе `false`.
  Если не передан — возвращается `true`, если есть открытый через useOpenModal (любой) компонент, иначе `false`.

@returns {ConstrainBoolean}
  `boolean`: `true` или `false` в зависимости от того, открыт компонент или нет.

@throws {Error} Если используется вне `ModalRegistryProvider`

@example
// Проверить, открыт ли компонент
const isOpenConfirmModal = useIsModalOpened(ConfirmModal) // → true | false
const isAnyModalOpen = useIsModalOpened() // → true | false
```

### raw props type
```ts
export declare const useIsModalOpened: (component?: TModalComponent) => boolean;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useOpenModal
tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./modalRegistry

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Хук для открытия модального окна через реестр.

Возвращает Promise, резолвящийся при закрытии модалки.

@returns {TOpenModalFn}
@throws {Error} Если используется вне `ModalRegistryProvider`

@example
const openModal = useOpenModal()
await openModal(EditModal, { itemId: '123' })
await openModal(ConfirmModal, undefined, { table: tableInstance })
```

### raw props type
```ts
export declare const useOpenModal: () => import("./types").TOpenModalFn;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## UserProvider
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./hooks

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const UserProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useUser
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./hooks

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const useUser: () => {
    data: {
        userType?: "INTERNAL" | "SUPPLIER";
    } | undefined;
    error: import("@reduxjs/toolkit").SerializedError | import("@reduxjs/toolkit/query").FetchBaseQueryError | undefined;
    isError: boolean;
    isLoading: boolean;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useUserType
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./hooks

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const useUserType: () => {
    error: import("@reduxjs/toolkit").SerializedError | import("@reduxjs/toolkit/query").FetchBaseQueryError | undefined;
    isError: boolean;
    isLoading: boolean;
    data: "INTERNAL" | "SUPPLIER" | undefined;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## withReduxProvider
tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./providers

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
HOC: оборачивает компонент в Redux `Provider`.

@param {ComponentType} Component - Оборачиваемый компонент
@param {Store} store - Redux store
@returns {ComponentType} Обёрнутый компонент

@example
const App = withReduxProvider(RawApp, store)
```

### raw props type
```ts
export declare const withReduxProvider: <ComponentProps extends import("../types").EmptyObject>(WrappedComponent: import("react").ComponentType<ComponentProps>, additionalProviderProps?: Omit<import("react-redux").ProviderProps<import("redux").Action<string>, unknown>, "children"> | undefined) => (props: { [K in keyof ComponentProps]: ComponentProps[K]; }) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
