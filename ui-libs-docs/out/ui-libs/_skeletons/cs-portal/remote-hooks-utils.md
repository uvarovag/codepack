<!-- SKELETON for cs-portal/remote-hooks-utils.md — raw material only, not the final doc. 16 symbols. -->

## buildFilters

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/oDataQuery

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Формирует строку `$filter` для OData запроса.

@param {TFilter[]} filters
@param {TBuildFilterOperator} [operator='and'] - `'and'` или `'or'`
@returns {string | undefined} `undefined` если массив пуст

@example
buildFilters([{ key: 'status', value: 'active', filterFn: 'eq' }]) // → "status eq 'active'"
buildFilters([], 'or') // → undefined
```

### raw props type

```ts
export declare const buildFilters: (filters: TFilter[], operator?: TBuildFilterOperator) => string | undefined
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## buildSorts

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/oDataQuery

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const buildSorts: (sorts: TSort[]) => string | undefined
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## createRemoteComponent

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./remote
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Создаёт bridge-компонент для экспорта как Module Federation remote.

@template Props - Тип пропсов компонента
@param {ComponentType<Props>} rootComponent - Корневой компонент для экспорта
@returns {BridgeComponent<Props>}

@example
// bootstrap.tsx в remote-приложении
export default createRemoteComponent(App)
```

### raw props type

```ts
export declare const createRemoteComponent: <Props>(rootComponent: ComponentType<Props>) => () => {
    render(info: import('@module-federation/bridge-react').RenderParams): Promise<void>
    destroy(info: import('@module-federation/bridge-react').DestroyParams): void
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## extractFilename

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/extractFilename

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Извлекает и декодирует имя файла из заголовка `Content-Disposition`.

@param {string | null} contentDisposition
@returns {string | undefined}

@example
extractFilename('attachment; filename="report.pdf"') // → 'report.pdf'
extractFilename(null) // → undefined
```

### raw props type

```ts
export declare const extractFilename: (contentDisposition: string | null) => string | undefined
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## getFileExtension

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./utils/getFileExtension

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Извлекает расширение файла из его имени.

@param {string} name
@returns {string} Расширение без точки или пустая строка

@example
getFileExtension('document.pdf') // → 'pdf'
getFileExtension('README')       // → ''
```

### raw props type

```ts
export declare const getFileExtension: (name: string) => string
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## getMessagesFromResponse

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/responseMessages
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Конвертирует ответ/ошибку бэкенда в массив `TMessagesFromResponse`.

Ищет сообщения по путям: `messages` → `data.messages` → `error.data.messages`.
При отсутствии — создаёт стандартное сообщение по HTTP-статусу.

@param {unknown} response
@returns {TMessagesFromResponse[]}

@example
getMessagesFromResponse({ status: 404 })
// → [{ message: '404: Запрашиваемый ресурс не найден', semantic: 'E' }]
getMessagesFromResponse(null) // → []
```

### raw props type

```ts
export declare const getMessagesFromResponse: (response: unknown) => TMessagesFromResponse[]
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## getNestedValue

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/getNestedValue
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Рекурсивно получает значение из объекта по строковому пути через точку.

@template O - Тип объекта
@template K - Строковый путь
@param {O} obj
@param {K} path
@returns {TGetValue<O, K>} Значение или `undefined`

@example
getNestedValue({ user: { name: 'Alice' } }, 'user.name') // → 'Alice'
getNestedValue({ user: {} }, 'user.age') // → undefined
```

### raw props type

```ts
export declare const getNestedValue: <O extends Record<PropertyKey, unknown>, K extends string>(
    obj: O,
    path: K
) => TGetValue<O, K>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## getTextFromMessage

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/responseMessages

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Конвертирует `TResponseMessage` в строку.

`message` + `description` → `'message - description'`.

@param {TResponseMessage} message
@returns {string}

@example
getTextFromMessage({ message: 'Ошибка', description: 'Подробности' }) // → 'Ошибка - Подробности'
getTextFromMessage({}) // → ''
```

### raw props type

```ts
export declare const getTextFromMessage: ({ description, message }: TResponseMessage) => string
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## getTextMessagesFromResponse

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/responseMessages

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Конвертирует ответ/ошибку бэкенда в единую строку сообщений через `\n`.

@param {unknown} response
@returns {string}

@example
getTextMessagesFromResponse({ status: 403 }) // → '403: Доступ запрещен'
```

### raw props type

```ts
export declare const getTextMessagesFromResponse: (response: unknown) => string
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## LazyComponent

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./remote

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const LazyComponent: {
    <Props extends ComponentProps>(props: LazyComponentProps<Props>): import('react').JSX.Element
    displayName: string
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## parseField

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./utils/parseField

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Парсит JSON-строку и извлекает значение поля по ключу.

При ошибке парсинга логирует в `console.error` и возвращает `undefined`.

@template T - Тип значения, по умолчанию `string`
@param {string} data - JSON-строка
@param {string} field - Имя поля
@returns {T | undefined}

@example
parseField('{"uuid":"abc-123"}', 'uuid')  // → 'abc-123'
parseField('invalid', 'uuid')             // → undefined
```

### raw props type

```ts
export declare const parseField: <T = string>(data: string, field: string) => T | undefined
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## RemoteComponent

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./remote
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const RemoteComponent: {
    <Props extends ComponentProps>(props: RemoteComponentProps<Props>): import('react').JSX.Element
    displayName: string
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useAction

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./hooks

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Хук для оборачивания RTK Mutation или callback в единый интерфейс с подтверждением.

Управляет `isPending`, показывает диалог подтверждения и сообщения из ответа.

@template ResultType - Тип возвращаемого результата
@template QueryArg - Тип аргумента

@param {TAction<ResultType, QueryArg>} action - RTK Mutation tuple или функция
@param {TOptions} [options]
@param {string} [options.actionText] - Текст действия для диалога подтверждения
@param {TConfirmParams | boolean} [options.confirm] - Параметры диалога

@returns {TUseActionResult<ResultType, QueryArg>} Кортеж `[trigger, { isPending }]`

@throws {CancelledError} Если пользователь отменил диалог

@example
const [deleteItem, { isPending }] = useAction(useDeleteMutation(), {
  confirm: true,
  actionText: 'удалить запись',
})
await deleteItem({ id: '123' })
```

### raw props type

```ts
export declare const useAction: <ResultType, QueryArg>(
    action: TAction<ResultType, QueryArg>,
    options?: TActionTriggerOptions
) => TUseActionResult<ResultType, QueryArg>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useActionTrigger

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./hooks

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const useActionTrigger: <ResultType, QueryArg>() => TUseActionTriggerResult<ResultType, QueryArg>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useSelectItems

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./hooks

propsType: useSelectItemsProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Хук преобразования массива произвольных объектов в формат опций для Select/Combobox.

@template T - Тип исходного объекта (должен расширять `object`)

@param {useSelectItemsProps<T>} props
@param {T[]} [props.data] - Исходный массив данных
@param {keyof T} props.labelKey - Ключ поля для отображения (label)
@param {keyof T} props.valueKey - Ключ поля для значения (value)

@returns {TItems} Массив `{ label, value }[]` совместимый с Select и Combobox

@example
const items = useSelectItems({
  data: [{ id: '1', name: 'Москва' }],
  labelKey: 'name',
  valueKey: 'id',
})
// → [{ label: 'Москва', value: '1' }]
```

### raw props type

```ts
export type useSelectItemsProps<T extends object> = {
    data?: T[]
    labelKey: keyof T
    valueKey: keyof T
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## downloadBlob

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
скачивает Blob-объект как файл с указанным именем
```

### raw props type

```ts
export declare const downloadBlob: ({ blob, fileName }: { blob: Blob; fileName: string }) => void
```

### demo examples found

(none — write a minimal example by hand from the props)

---
