<!-- SKELETON for cs-portal/widgets.md — raw material only, not the final doc. 16 symbols. -->

## Attachment
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/attachment

propsType: TAttachmentProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет управления вложениями для одного набора файлов.

@param {TAttachmentProps} props
@param {string} props.entityUuid - UUID сущности-владельца
@param {string} props.entityId - ID сущности

@example
<Attachment entityUuid={order.uuid} entityId={order.id} uploadVisible deleteVisible />
```

### raw props type
```ts
export type TAttachmentProps = {
    baseUrl?: string;
} & Pick<TSmartUploadSetProps, 'size' | 'title' | 'helperItems' | 'uploadVisible' | 'entityUuid' | 'entityId' | 'subtitle' | 'reverse' | 'downloadAllVisible' | 'deleteVisible' | 'downloadVisible' | 'openVisible' | 'renameVisible' | 'fileUploadExtraArg' | 'fileDeleteExtraArg'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## CommunicationDrawer
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/Communication

propsType: TCommunicationDrawerProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет коммуникации (чата) в виде боковой панели.

Кнопка-триггер показывает количество непрочитанных сообщений.
Автоматически обновляется через WebSocket-подписку.

@param {TCommunicationDrawerProps} props
@param {string} props.documentType - Тип документа (бизнес-ключ)
@param {string} props.documentId - ID документа

@example
<CommunicationDrawer documentType="ORDER" documentId={order.id} />
```

### raw props type
```ts
export type TCommunicationDrawerProps = TDocument;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createWidgetCounter
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./app

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Фабрика виджета-счётчика для использования как микрофронтенд.

Создаёт самостоятельный React-компонент с собственным Redux store,
подключённым RTK Query хуком и навигацией.

@template ResultType - Тип данных из RTK Query
@template QueryArg - Тип аргумента запроса
@template BaseQuery - Базовый query функции RTK

@param {TCreateWidgetCounterProps<ResultType, QueryArg, BaseQuery>} props
@param {string} props.title - Заголовок виджета
@param {TypedUseQuery} props.useQuery - RTK Query хук для получения данных
@param {Function} props.selectFromQueryResult - Селектор, извлекающий `count` из данных запроса
@param {Store} props.store - Redux store с подключённым API
@param {string} props.path - Путь для навигации
@param {QueryArg} [props.queryArg] - Аргумент запроса (обязателен если `QueryArg !== void`)

@returns Готовый React-компонент виджета

@example
const OrdersCounter = createWidgetCounter({
  title: 'Заказы',
  path: '/orders',
  useQuery: useGetOrdersCountQuery,
  selectFromQueryResult: (data) => ({ count: data?.total }),
  store,
})
```

### raw props type
```ts
export declare const createWidgetCounter: <UseQuery extends AnyUseQuery>({ path, queryArg, selectFromQueryResult, store, title, useQuery, }: TCreateWidgetCounterProps<UseQuery>) => (props: {
    externalNavigate?: import("react-router").NavigateFunction | undefined;
    data?: unknown;
}) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createWidgetHorizontalBarChart
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./app

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const createWidgetHorizontalBarChart: <UseQuery extends AnyUseQuery>({ paramKey, path, queryArg, selectFromQueryResult, store, title, useQuery, }: TCreateWidgetHorizontalBarChartProps<UseQuery>) => (props: {
    externalNavigate?: import("react-router").NavigateFunction | undefined;
    data?: unknown;
}) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createWidgetPieChart
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./app

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Фабрика виджета-диаграммы (pie chart) для использования как микрофронтенд.

Создаёт самостоятельный React-компонент с собственным Redux store,
подключённым RTK Query хуком и возможностью навигации по сегментам диаграммы.

@template ResultType - Тип результата, возвращаемого RTK Query хуком
@template QueryArg - Тип аргумента запроса
@template BaseQuery - Тип базовой функции запроса, расширяющей `BaseQueryFn`

@param {TCreateWidgetPieChartProps<ResultType, QueryArg, BaseQuery>} props
@param {string} props.title - Заголовок виджета
@param {TypedUseQuery<ResultType, QueryArg, BaseQuery>} props.useQuery - RTK Query хук для получения данных
@param {(data: ResultType | undefined) => { data: TWidgetItem[] }} props.selectFromQueryResult
- Селектор, преобразующий результат запроса в массив сегментов диаграммы типа `TWidgetItem`
@param {Store} props.store - Redux store, в котором зарегистрирован нужный API-слайс
@param {string} props.path - Основной путь для навигации
@param {string} [props.paramKey] - Ключ параметра, используемый для передачи значения сегмента в URL
для фильтрации данных.
@param {QueryArg} [props.queryArg] - Аргумент запроса (обязателен если `QueryArg !== void`)
@returns Готовый React-компонент виджета

@example
const StatusChart = createWidgetPieChart({
  title: 'Статистика по статусам',
  path: '/list',
  paramKey: 'statusId',
  useQuery: useGetStatusStatsQuery,
   selectFromQueryResult: (data) => ({
         data: (data?.data || []).map(({ status, value }) => ({
         id: status?.statusId || '',
         label: `${status?.description || ''} (${value || 0})`,
         value: value || 0,
     })),
}),
  store,
})
```

### raw props type
```ts
export declare const createWidgetPieChart: <UseQuery extends AnyUseQuery>({ paramKey, path, queryArg, selectFromQueryResult, store, title, useQuery, }: TCreateWidgetPieChartProps<UseQuery>) => (props: {
    externalNavigate?: import("react-router").NavigateFunction | undefined;
    data?: unknown;
}) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DocChain
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/DocChain

propsType: TDocChainProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет цепочки документов (связанные документы/позиции).

Загружает список связей и визуализирует граф или список документов.

@param {TDocChainProps} props
@param {string | number | null | undefined} props.docNum - Номер документа
@param {string} props.docKind - Код вида документа
@param {number} [props.depth] - Глубина поиска связей
@param {string} [props.height] - Высота контейнера виджета

@example
<DocChain docNum={order.docNum} docKind="ORDER" depth={3} />
```

### raw props type
```ts
export type TDocChainProps = Pick<TGetList1ApiArg, 'docKind' | 'depth'> & {
    docNum: string | number | null | undefined;
} & Pick<TBoxProps, 'height'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Event
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/Event

propsType: TEventProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет истории событий объекта.

Загружает и отображает список событий. Обновляется по WebSocket.

@param {TEventProps} props
@param {string} props.entityUuid - UUID объекта

@example
<Event entityUuid={order.uuid} />
```

### raw props type
```ts
export type TEventProps = {
    entityUuid: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## EventDrawer
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/Event

propsType: TEventDrawerProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет истории событий в виде боковой панели.

@param {TEventDrawerProps} props
@param {string} props.entityUuid - UUID объекта
@param {'s' | 'm'} [props.size] - Размер Drawer

@example
<EventDrawer entityUuid={order.uuid} size="m" />
```

### raw props type
```ts
export type TEventDrawerProps = TEventProps & Pick<TDrawerProps, 'size'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## invalidateAttachmentTags
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/attachment

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
Инвалидирует теги RTK Query в store виджета вложений.

Удобная обёртка для вызова из внешнего кода без прямого доступа к store.

@param {...Parameters<typeof api.util.invalidateTags>} args - Теги для инвалидации

@example
invalidateAttachmentTags(['files'])
invalidateAttachmentTags([{ type: 'files', id: entityUuid }])
```

### raw props type
```ts
export declare const invalidateAttachmentTags: (...args: Parameters<typeof attachmentApi.util.invalidateTags>) => void;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## MultiAttachment
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/attachment

propsType: TMultiAttachmentProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет управления вложениями с группировкой по заголовкам из API.

Загружает метаданные секций через `/title-info` и рендерит
отдельный `SmartUploadSet` для каждой секции.

@param {TMultiAttachmentProps} props
@param {string} props.entityUuid - UUID сущности-владельца
@param {string} props.entityId - ID сущности
@param {string} [props.downloadAllText] - Текст кнопки «Скачать всё»

@example
<MultiAttachment entityUuid={order.uuid} entityId={order.id} downloadAllText="Скачать всё" />
```

### raw props type
```ts
export type TMultiAttachmentProps = {
    baseUrl?: string;
    downloadAllText?: string;
} & Pick<TSmartUploadSetProps, 'size' | 'entityUuid' | 'entityId' | 'reverse' | 'downloadAllVisible' | 'fileUploadExtraArg' | 'fileDeleteExtraArg'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## SmartPdfViewer
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./smarts/SmartPdfViewer

propsType: SmartPdfViewerProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Умный компонент просмотра PDF-документа.

Загружает PDF через RTK Query хук, отображает viewer или
пустое состояние с ошибкой если загрузка не удалась.

@template T - Тип аргумента запроса (расширяет `TBaseQueryArg`)

@param {SmartPdfViewerProps<T>} props
@param {TQueryArg<T>} props.queryArg - Аргумент RTK Query запроса
@param {UseQuery} props.useGetPdfQuery - RTK Query хук возвращающий `Blob`
@param {boolean} [props.skip] - Пропустить запрос
@param {string} [props.errorDescription] - Описание при ошибке загрузки

@example
<SmartPdfViewer
  queryArg={{ documentUuid: id }}
  useGetPdfQuery={useGetDocumentPdfQuery}
/>
```

### raw props type
```ts
export type SmartPdfViewerProps<T extends TBaseQueryArg = TBaseQueryArg> = Prettify<{
    queryArg: TQueryArg<T>;
    skip?: boolean;
    useGetPdfQuery: UseQuery<QueryDefinition<TQueryArg<T>, BaseQueryFn, string, Blob>>;
} & {
    errorDescription?: TPropsFromEmptyStates['description'];
}>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## SmartStatusTrack
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./smarts/SmartStatusTrack

propsType: TSmartStatusTrackProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Умный компонент трекера статусов объекта.

Загружает историю статусов через RTK Query хук и рендерит
визуальный трекер с опциональным кастомным описанием.

@param {TSmartStatusTrackProps} props
@param {string} props.entityUuid - UUID объекта
@param {UseQuery} props.useStatusTrackQuery - RTK Query хук истории статусов
@param {Function} [props.descriptionRender] - Кастомный рендер описания статуса.
  Принимает `{ items, currentItem }`, возвращает `ReactNode`

@example
<SmartStatusTrack
  entityUuid={order.uuid}
  useStatusTrackQuery={useGetOrderHistoryQuery}
  descriptionRender={({ currentItem }) => <Text>{currentItem.description}</Text>}
/>
```

### raw props type
```ts
export type TSmartStatusTrackProps = TStatusTrackArg & {
    useStatusTrackQuery: UseQuery<QueryDefinition<TGetHistoryForDocumentApiArg, BaseQueryFn, string, TGetHistoryForDocumentApiResponse>>;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Tracker
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./widgets/Tracker

propsType: TTrackerProps (source: cs-portal)

### raw description (RU, from JSDoc)
```
Виджет трекера статусов с собственным Redux store.

Загружает историю статусов через встроенный RTK Query API.
Обновляется по WebSocket.

@param {TTrackerProps} props
@param {string} props.entityUuid - UUID объекта
@param {Function} [props.descriptionRender] - Кастомный рендер описания статуса

@example
<Tracker
  entityUuid={order.uuid}
  descriptionRender={({ currentItem }) => <Text>{currentItem.description}</Text>}
/>
```

### raw props type
```ts
export type TTrackerProps = Pick<TSmartStatusTrackProps, 'entityUuid' | 'descriptionRender'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## WidgetCounter
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/widgets/WidgetCounter

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const WidgetCounter: ({ count, isError, ...props }: TWidgetCounterProps) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## WidgetHorizontalBarChart
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/widgets/WidgetHorizontalBarChart

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const WidgetHorizontalBarChart: ({ data, isError, ...props }: TWidgetHorizontalBarChartProps) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## WidgetPieChart
tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/widgets/WidgetPieChart

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const WidgetPieChart: ({ data, isError, ...props }: TWidgetPieChartProps) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
