<!-- SKELETON for cs-portal/layout.md — raw material only, not the final doc. 18 symbols. -->

## Box

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./components/Box

propsType: TBoxProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Универсальный layout-компонент на основе `div`.

Принимает подмножество CSS-свойств как пропсы для быстрого управления
отступами, размерами, flexbox и позиционированием без написания CSS-классов.

@param {TBoxProps} props
@param {ReactNode} [props.children]
@param {CSSProperties['display']} [props.display]
@param {CSSProperties['flexDirection']} [props.flexDirection]
@param {CSSProperties['gap']} [props.gap]
@param {CSSProperties['padding']} [props.padding]
@param {CSSProperties['width']} [props.width]
@param {string} [props.className] - Дополнительный CSS-класс
@param {MouseEventHandler} [props.onClick]

@example
<Box display="flex" gap="16px" padding="24px">
  <Box width="200px">Левая колонка</Box>
  <Box flexGrow={1}>Контент</Box>
</Box>
```

### raw props type

```ts
export type TBoxProps = PropsWithChildren<TCSSPropsTypes & TDivPropsTypes>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## CollapsingPageHeader

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/CollapsingPageHeader

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Заголовок страницы со сворачиваемым контентом.

Отображает заголовок, подзаголовок, хлебные крошки, бейджи статусов,
метки и аналитический контент. Контент можно скрывать/показывать
кнопкой или управлять состоянием снаружи через `isOpenContent`.
При загрузке показывает skeleton-анимацию.

@param {TPageHeaderProps} props
@param {string} props.title - Основной заголовок (номер и дата объекта)
@param {string | null} [props.subtitle] - Подзаголовок; обрезается в многоточие при переполнении
@param {ReactNode} [props.breadcrumbs] - Блок навигации по пути к объекту
@param {ReactNode} [props.statusBadges] - Бейджи бизнес-статуса объекта
@param {ReactNode} [props.tagBadges] - Метки объекта (рекомендуется обернуть в Fragment)
@param {ReactNode} [props.actionsToolbar] - Кнопки системных действий
@param {boolean} [props.isOpenContent] - Управление состоянием открытия извне
@param {Function} [props.onOpenContentChange] - Callback изменения состояния открытия
@param {ReactNode} [props.content] - Аналитический контент (рекомендуется использовать FormFlex)
@param {boolean} [props.isLoading] - Флаг загрузки (активирует skeleton)
@param {number} [props.skeletonCount] - Количество skeleton-блоков FormGroupFlex

@example
<CollapsingPageHeader
  title="Заказ №12345 от 01.01.2024"
  subtitle="Поставка оборудования"
  breadcrumbs={<Breadcrumbs items={crumbs} />}
  statusBadges={<StatusBadge status="active" />}
  content={<FormFlex>...</FormFlex>}
  isLoading={isFetching}
/>
```

### raw props type

```ts
export declare const CollapsingPageHeader: ({
    actionsToolbar,
    breadcrumbs,
    content,
    isLoading,
    isOpenContent: controlledIsOpenContent,
    onOpenContentChange,
    skeletonCount,
    statusBadges,
    subtitle,
    tagBadges,
    title,
}: TPageHeaderProps) => React.JSX.Element
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Content

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/layout/Content

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент области основного контента в layout.

Занимает оставшееся пространство (flex: 1), поддерживает overflow.

@param {PropsWithChildren} props

@example
<Layout>
  <Header />
  <Content><Outlet /></Content>
  <Footer />
</Layout>
```

### raw props type

```ts
export declare const Content: ({ children }: PropsWithChildren) => import('react').JSX.Element
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Drawer

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/Drawer

propsType: TDrawerProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Боковая панель (drawer) с заголовком, контентом и опциональным футером.

Обёртка над `Drawer` из `@salutejs/sdds-cs` с унифицированным API.
Поддерживает модальный режим и привязку к DOM-фрейму.

@param {TDrawerProps} props
@param {ReactNode | string} props.title - Заголовок панели
@param {ReactNode} props.content - Основной контент
@param {ReactNode} [props.footer] - Контент футера
@param {'s' | 'm'} [props.size] - Размер панели
@param {boolean} [props.opened] - Состояние открытия
@param {Function} [props.onClose] - Callback закрытия
@param {boolean} [props.asModal] - Открывать как модальное окно
@param {PopupProps['frame']} [props.frame] - DOM-элемент для привязки
@param {number} [props.zIndex] - z-index панели

@example
<Drawer
  title="Редактирование"
  content={<EditForm />}
  footer={<Button onClick={onClose}>Закрыть</Button>}
  opened={isOpen}
  onClose={() => setIsOpen(false)}
  size="m"
/>
```

### raw props type

```ts
export type TDrawerProps = {
    title: ReactNode | string
    content: ReactNode
    footer?: ReactNode
    size?: 's' | 'm'
} & Pick<ComponentProps<typeof Drawer>, 'asModal' | 'frame' | 'onClose' | 'opened' | 'zIndex'>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## ErrorFallback

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/ErrorFallback

propsType: TErrorFallbackProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент отображения ошибки RTK Query.

Показывает человекочитаемое сообщение об ошибке на основе
`FetchBaseQueryError` или `SerializedError`.

@param {TErrorFallbackProps} props
@param {FetchBaseQueryError | SerializedError | undefined} props.error — Объект ошибки из RTK Query
@param {TErrorFallbackViewMode} [props.viewMode='page'] — Режим отображения:
  - `'page'` (по умолчанию) — `404 → notFound`, другие 4xx → `error`
  - `'widget'` — `404 → notFoundInWidget`, другие 4xx → `errorInWidget`

@example
// Page-режим (по умолчанию)
const { data, error } = useGetOrderQuery(id)
if (error) return <ErrorFallback error={error} />

@example
// Widget-режим
if (error) return <ErrorFallback error={error} viewMode="widget" />
```

### raw props type

```ts
export type TErrorFallbackProps = {
    error: FetchBaseQueryError | SerializedError | undefined
    /** Режим отображения ошибок. По умолчанию 'page'. */
    viewMode?: TErrorFallbackViewMode
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Footer

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/layout/Footer

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент футера в layout.

@param {PropsWithChildren} props

@example
<Footer>
  <Button>Сохранить</Button>
</Footer>
```

### raw props type

```ts
export declare const Footer: ({ children }: PropsWithChildren) => import('react').JSX.Element
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Header

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/layout/Header

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент шапки в layout.

@param {PropsWithChildren} props

@example
<Header>
  <CollapsingPageHeader title="Заказ №123" />
</Header>
```

### raw props type

```ts
export declare const Header: ({ children }: PropsWithChildren) => import('react').JSX.Element
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## InlineList

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/InlineList

propsType: TInlineListProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export type TInlineListProps = {
    items?: ReactNode[]
    separator?: ReactNode
    maxVisibleItems?: number
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Layout

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/layout/Layout

propsType: TLayoutProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Корневой layout-компонент страницы.

Flex-контейнер с вертикальной ориентацией.
Используется совместно с `Header`, `Content`, `Footer`, `Sider`.

@param {PropsWithChildren<TLayoutProps>} props
@param {CSSProperties['gap']} [props.gap] - Отступ между дочерними блоками

@example
<Layout gap="16px">
  <Header><CollapsingPageHeader title="..." /></Header>
  <Layout>
    <Sider><NavigationMenu /></Sider>
    <Content><Outlet /></Content>
  </Layout>
  <Footer><ActionButtons /></Footer>
</Layout>
```

### raw props type

```ts
export type TLayoutProps = {
    gap?: CSSProperties['gap']
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MessageView

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/MessageView

propsType: TMessageViewProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент отображения списка системных сообщений.

Группирует сообщения по семантике (E/W/I/S), поддерживает
интерактивные подсказки (`suggestions`) для каждого сообщения.

@param {TMessageViewProps} props
@param {TMessage[]} props.messages - Массив сообщений для отображения

@example
<MessageView
  messages={[
    { message: 'Поле обязательно', semantic: 'E', target: 'name' },
    { message: 'Сохранено', semantic: 'S' },
  ]}
/>
```

### raw props type

```ts
export type TMessageViewProps = {
    messages: TMessages
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MultiDisplayLink

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/multi

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Display-компонент ссылочного поля с лейблом из метаданных схемы.

@param {TWithMetaProps} props
@param {string} [props.label] - Явный лейбл поля
@param {TMetaSchemeProperty} [props.meta] - Метаданные поля (используется `title`)

@example
<MultiDisplayLink meta={{ title: 'Документ' }} value="Договор №1" onClick={handleClick} />
```

### raw props type

```ts
export declare const MultiDisplayLink: {
    (
        props: {
            values: import('../value/types').TMultiValueLinkValue[]
            onClick?: ((value: import('../value/types').TMultiValueLinkValue) => void) | undefined
        } & Omit<
            Omit<
                {
                    value: import('@sber-front-cs-core/cs-core/dist/utils/formatters').TFormatterValue<string | number>
                    navigate?: import('react-router').NavigateFunction | undefined
                    size?: 's' | 'm' | undefined
                    showCopyButton?: boolean | undefined
                    bold?: boolean | undefined
                    color?: string | undefined
                    className?: string | undefined | undefined
                    as?: keyof import('@salutejs/plasma-new-hope').AllowedTextHTMLElements | undefined
                    breakWord?: boolean | undefined
                    id?: string | undefined | undefined
                    content?: string | undefined | undefined
                    title?: string | undefined | undefined
                    onChange?: import('react').ChangeEventHandler<HTMLAnchorElement, Element> | undefined
                    slot?: string | undefined | undefined
                    style?: import('react').CSSProperties | undefined
                    view?:
                        | 'secondary'
                        | 'accent'
                        | 'negative'
                        | 'warning'
                        | 'positive'
                        | 'paragraph'
                        | 'tertiary'
                        | 'clear'
                        | 'default'
                        | undefined
                    disabled?: boolean | undefined
                    type?: string | undefined | undefined
                    defaultChecked?: boolean | undefined | undefined
                    defaultValue?: string | number | readonly string[] | undefined
                    suppressContentEditableWarning?: boolean | undefined | undefined
                    suppressHydrationWarning?: boolean | undefined | undefined
                    accessKey?: string | undefined | undefined
                    autoCapitalize?:
                        | 'off'
                        | 'none'
                        | 'on'
                        | 'sentences'
                        | 'words'
                        | 'characters'
                        | undefined
                        | (string & {})
                        | undefined
                    autoFocus?: boolean | undefined | undefined
                    contentEditable?: 'inherit' | (boolean | 'true' | 'false') | 'plaintext-only' | undefined
                    contextMenu?: string | undefined | undefined
                    dir?: string | undefined | undefined
                    draggable?: (boolean | 'true' | 'false') | undefined
                    enterKeyHint?:
                        'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined | undefined
                    hidden?: boolean | undefined | undefined
                    lang?: string | undefined | undefined
                    nonce?: string | undefined | undefined
                    spellCheck?: (boolean | 'true' | 'false') | undefined
                    tabIndex?: number | undefined | undefined
                    translate?: 'yes' | 'no' | undefined | undefined
                    radioGroup?: string | undefined | undefined
                    role?: import('react').AriaRole | undefined
                    about?: string | undefined | undefined
                    datatype?: string | undefined | undefined
                    inlist?: any
                    prefix?: string | undefined | undefined
                    property?: string | undefined | undefined
                    rel?: string | undefined | undefined
                    resource?: string | undefined | undefined
                    rev?: string | undefined | undefined
                    typeof?: string | undefined | undefined
                    vocab?: string | undefined | undefined
                    autoCorrect?: string | undefined | undefined
                    autoSave?: string | undefined | undefined
                    itemProp?: string | undefined | undefined
                    itemScope?: boolean | undefined | undefined
                    itemType?: string | undefined | undefined
                    itemID?: string | undefined | undefined
                    itemRef?: string | undefined | undefined
                    results?: number | undefined | undefined
                    security?: string | undefined | undefined
                    unselectable?: 'on' | 'off' | undefined | undefined
                    popover?: '' | 'auto' | 'manual' | 'hint' | undefined | undefined
                    popoverTargetAction?: 'toggle' | 'show' | 'hide' | undefined | undefined
                    popoverTarget?: string | undefined | undefined
                    inert?: boolean | undefined | undefined
                    inputMode?:
                        | 'none'
                        | 'text'
                        | 'tel'
                        | 'url'
                        | 'email'
                        | 'numeric'
                        | 'decimal'
                        | 'search'
                        | undefined
                        | undefined
                    is?: string | undefined | undefined
                    exportparts?: string | undefined | undefined
                    part?: string | undefined | undefined
                    'aria-activedescendant'?: string | undefined | undefined
                    'aria-atomic'?: (boolean | 'true' | 'false') | undefined
                    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined | undefined
                    'aria-braillelabel'?: string | undefined | undefined
                    'aria-brailleroledescription'?: string | undefined | undefined
                    'aria-busy'?: (boolean | 'true' | 'false') | undefined
                    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined | undefined
                    'aria-colcount'?: number | undefined | undefined
                    'aria-colindex'?: number | undefined | undefined
                    'aria-colindextext'?: string | undefined | undefined
                    'aria-colspan'?: number | undefined | undefined
                    'aria-controls'?: string | undefined | undefined
                    'aria-current'?:
                        | boolean
                        | 'false'
                        | 'true'
                        | 'page'
                        | 'step'
                        | 'location'
                        | 'date'
                        | 'time'
                        | undefined
                        | undefined
                    'aria-describedby'?: string | undefined | undefined
                    'aria-description'?: string | undefined | undefined
                    'aria-details'?: string | undefined | undefined
                    'aria-disabled'?: (boolean | 'true' | 'false') | undefined
                    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined | undefined
                    'aria-errormessage'?: string | undefined | undefined
                    'aria-expanded'?: (boolean | 'true' | 'false') | undefined
                    'aria-flowto'?: string | undefined | undefined
                    'aria-grabbed'?: (boolean | 'true' | 'false') | undefined
                    'aria-haspopup'?:
                        | boolean
                        | 'false'
                        | 'true'
                        | 'menu'
                        | 'listbox'
                        | 'tree'
                        | 'grid'
                        | 'dialog'
                        | undefined
                        | undefined
                    'aria-hidden'?: (boolean | 'true' | 'false') | undefined
                    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined | undefined
                    'aria-keyshortcuts'?: string | undefined | undefined
                    'aria-label'?: string | undefined | undefined
                    'aria-labelledby'?: string | undefined | undefined
                    'aria-level'?: number | undefined | undefined
                    'aria-live'?: 'off' | 'assertive' | 'polite' | undefined | undefined
                    'aria-modal'?: (boolean | 'true' | 'false') | undefined
                    'aria-multiline'?: (boolean | 'true' | 'false') | undefined
                    'aria-multiselectable'?: (boolean | 'true' | 'false') | undefined
                    'aria-orientation'?: 'horizontal' | 'vertical' | undefined | undefined
                    'aria-owns'?: string | undefined | undefined
                    'aria-placeholder'?: string | undefined | undefined
                    'aria-posinset'?: number | undefined | undefined
                    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined | undefined
                    'aria-readonly'?: (boolean | 'true' | 'false') | undefined
                    'aria-relevant'?:
                        | 'additions'
                        | 'additions removals'
                        | 'additions text'
                        | 'all'
                        | 'removals'
                        | 'removals additions'
                        | 'removals text'
                        | 'text'
                        | 'text additions'
                        | 'text removals'
                        | undefined
                        | undefined
                    'aria-required'?: (boolean | 'true' | 'false') | undefined
                    'aria-roledescription'?: string | undefined | undefined
                    'aria-rowcount'?: number | undefined | undefined
                    'aria-rowindex'?: number | undefined | undefined
                    'aria-rowindextext'?: string | undefined | undefined
                    'aria-rowspan'?: number | undefined | undefined
                    'aria-selected'?: (boolean | 'true' | 'false') | undefined
                    'aria-setsize'?: number | undefined | undefined
                    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined | undefined
                    'aria-valuemax'?: number | undefined | undefined
                    'aria-valuemin'?: number | undefined | undefined
                    'aria-valuenow'?: number | undefined | undefined
                    'aria-valuetext'?: string | undefined | undefined
                    dangerouslySetInnerHTML?:
                        | {
                              __html: string | TrustedHTML
                          }
                        | undefined
                        | undefined
                    onCopy?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onCopyCapture?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onCut?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onCutCapture?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onPaste?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onPasteCapture?: import('react').ClipboardEventHandler<HTMLAnchorElement> | undefined
                    onCompositionEnd?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onCompositionEndCapture?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onCompositionStart?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onCompositionStartCapture?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onCompositionUpdate?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onCompositionUpdateCapture?: import('react').CompositionEventHandler<HTMLAnchorElement> | undefined
                    onFocus?: import('react').FocusEventHandler<HTMLAnchorElement> | undefined
                    onFocusCapture?: import('react').FocusEventHandler<HTMLAnchorElement> | undefined
                    onBlur?: import('react').FocusEventHandler<HTMLAnchorElement> | undefined
                    onBlurCapture?: import('react').FocusEventHandler<HTMLAnchorElement> | undefined
                    onChangeCapture?: import('react').ChangeEventHandler<HTMLAnchorElement, Element> | undefined
                    onBeforeInput?: import('react').InputEventHandler<HTMLAnchorElement> | undefined
                    onBeforeInputCapture?: import('react').InputEventHandler<HTMLAnchorElement> | undefined
                    onInput?: import('react').InputEventHandler<HTMLAnchorElement> | undefined
                    onInputCapture?: import('react').InputEventHandler<HTMLAnchorElement> | undefined
                    onReset?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onResetCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSubmit?: import('react').SubmitEventHandler<HTMLAnchorElement> | undefined
                    onSubmitCapture?: import('react').SubmitEventHandler<HTMLAnchorElement> | undefined
                    onInvalid?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onInvalidCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoad?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onError?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onErrorCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onKeyDown?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onKeyDownCapture?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onKeyPress?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onKeyPressCapture?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onKeyUp?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onKeyUpCapture?: import('react').KeyboardEventHandler<HTMLAnchorElement> | undefined
                    onAbort?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onAbortCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onCanPlay?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onCanPlayCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onCanPlayThrough?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onCanPlayThroughCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onDurationChange?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onDurationChangeCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEmptied?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEmptiedCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEncrypted?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEncryptedCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEnded?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onEndedCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadedData?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadedDataCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadedMetadata?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadedMetadataCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadStart?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onLoadStartCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPause?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPauseCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPlay?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPlayCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPlaying?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onPlayingCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onProgress?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onProgressCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onRateChange?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onRateChangeCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSeeked?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSeekedCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSeeking?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSeekingCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onStalled?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onStalledCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSuspend?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSuspendCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onTimeUpdate?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onTimeUpdateCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onVolumeChange?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onVolumeChangeCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onWaiting?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onWaitingCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onAuxClick?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onAuxClickCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onClick?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onClickCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onContextMenu?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onContextMenuCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onDoubleClick?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onDoubleClickCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onDrag?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragEnd?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragEndCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragEnter?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragEnterCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragExit?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragExitCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragLeave?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragLeaveCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragOver?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragOverCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragStart?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDragStartCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDrop?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onDropCapture?: import('react').DragEventHandler<HTMLAnchorElement> | undefined
                    onMouseDown?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseDownCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseEnter?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseLeave?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseMove?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseMoveCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseOut?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseOutCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseOver?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseOverCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseUp?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onMouseUpCapture?: import('react').MouseEventHandler<HTMLAnchorElement> | undefined
                    onSelect?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onSelectCapture?: import('react').ReactEventHandler<HTMLAnchorElement> | undefined
                    onTouchCancel?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchCancelCapture?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchEnd?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchEndCapture?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchMove?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchMoveCapture?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchStart?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onTouchStartCapture?: import('react').TouchEventHandler<HTMLAnchorElement> | undefined
                    onPointerDown?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerDownCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerMove?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerMoveCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerUp?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerUpCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerCancel?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerCancelCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerEnter?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerLeave?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerOver?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerOverCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerOut?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onPointerOutCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onGotPointerCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onGotPointerCaptureCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onLostPointerCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onLostPointerCaptureCapture?: import('react').PointerEventHandler<HTMLAnchorElement> | undefined
                    onScroll?: import('react').UIEventHandler<HTMLAnchorElement> | undefined
                    onScrollCapture?: import('react').UIEventHandler<HTMLAnchorElement> | undefined
                    onScrollEnd?: import('react').UIEventHandler<HTMLAnchorElement> | undefined
                    onScrollEndCapture?: import('react').UIEventHandler<HTMLAnchorElement> | undefined
                    onWheel?: import('react').WheelEventHandler<HTMLAnchorElement> | undefined
                    onWheelCapture?: import('react').WheelEventHandler<HTMLAnchorElement> | undefined
                    onAnimationStart?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onAnimationStartCapture?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onAnimationEnd?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onAnimationEndCapture?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onAnimationIteration?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onAnimationIterationCapture?: import('react').AnimationEventHandler<HTMLAnchorElement> | undefined
                    onToggle?: import('react').ToggleEventHandler<HTMLAnchorElement> | undefined
                    onBeforeToggle?: import('react').ToggleEventHandler<HTMLAnchorElement> | undefined
                    onTransitionCancel?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionCancelCapture?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionEnd?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionEndCapture?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionRun?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionRunCapture?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionStart?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    onTransitionStartCapture?: import('react').TransitionEventHandler<HTMLAnchorElement> | undefined
                    ref?: import('react').Ref<HTMLAnchorElement> | undefined
                    focused?: boolean | undefined
                    key?: import('react').Key | null | undefined
                    target?: import('react').HTMLAttributeAnchorTarget | undefined
                    href?: string | undefined | undefined
                    download?: any
                    hrefLang?: string | undefined | undefined
                    media?: string | undefined | undefined
                    ping?: string | undefined | undefined
                    referrerPolicy?: import('react').HTMLAttributeReferrerPolicy | undefined
                    underline?: 'none' | 'hover' | 'always' | undefined
                },
                'ref'
            > &
                import('react').RefAttributes<HTMLAnchorElement>,
            'onClick' | 'value'
        > &
            Omit<import('../../InlineList').TInlineListProps, 'items'> &
            import('./types').TWithMetaProps
    ): import('react').JSX.Element
    displayName: string
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MultiDisplayText

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/multi

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Display-компонент текстового поля с лейблом из метаданных схемы.

Автоматически подтягивает `label` из `meta.title` если `label` не передан явно.

@param {TWithMetaProps} props
@param {string} [props.label] - Явный лейбл поля
@param {TMetaSchemeProperty} [props.meta] - Метаданные поля (используется `title`)

@example
<MultiDisplayText meta={{ title: 'Наименование' }} value="ООО Ромашка" />
```

### raw props type

```ts
export declare const MultiDisplayText: {
    (
        props: {
            values: {
                key?: import('react').Key
                text: import('@sber-front-cs-core/cs-core/dist/utils/formatters').TFormatterValue<string | number>
            }[]
            color?: string | undefined
            className?: string | undefined | undefined
            frame?: import('@sber-front-cs-core/cs-core/dist/internal/types').TSDDSPortal | undefined
            bold?: boolean | undefined
            size?: ('s' | 'm') | undefined
            as?: keyof import('@salutejs/plasma-new-hope').AllowedTextHTMLElements | undefined
            noWrap?: boolean | undefined
            breakWord?: boolean | undefined
            portal?:
                | (import('@sber-front-cs-core/cs-core/dist/internal/types').TSDDSPortal &
                      (string | import('react').RefObject<HTMLElement | null>))
                | undefined
            countLineClamp?: number | undefined
            showCopyButton?: boolean | undefined
            isEllipsisInfo?: boolean | undefined
            separator?: import('react').ReactNode
            maxVisibleItems?: number | undefined
        } & import('./types').TWithMetaProps
    ): import('react').JSX.Element
    displayName: string
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MultiValueLink

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/multi

propsType: TMultiValueLinkProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент отображения нескольких ссылочных значений в строку.

При клике на элемент вызывает `onClick` с полным объектом значения.

@template T - Тип объекта значения (расширяет `TMultiValueLinkValue`)

@param {TMultiValueLinkProps<T>} props
@param {T[]} props.values - Массив значений
@param {Function} [props.onClick] - Callback клика; получает полный объект значения
@param {ReactNode} [props.separator] - Разделитель
@param {number} [props.maxVisibleItems] - Максимум видимых элементов

@example
<MultiValueLink
  values={[{ text: 'Заказ №123', id: '123' }]}
  onClick={(value) => navigate(`/orders/${value.id}`)}
/>
```

### raw props type

```ts
export type TMultiValueLinkProps<T extends TMultiValueLinkValue> = {
    values: T[]
    onClick?: (value: T) => void
} & Omit<TValueLinkProps, 'value' | 'onClick'> &
    Omit<TInlineListProps, 'items'>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MultiValueText

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/multi

propsType: TMultiValueTextProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент отображения нескольких текстовых значений в строку.

Рендерит массив `values` как список `ValueText` через `InlineList`.

@param {TMultiValueTextProps} props
@param {{ key?: Key, text: string }[]} props.values - Массив текстовых значений
@param {ReactNode} [props.separator] - Разделитель (по умолчанию `, `)
@param {number} [props.maxVisibleItems] - Максимум видимых элементов

@example
<MultiValueText values={[{ text: 'Иванов И.И.' }, { text: 'Петров П.П.' }]} />
```

### raw props type

```ts
export type TMultiValueTextProps = Prettify<
    {
        values: {
            key?: Key
            text: TValueTextProps['value']
        }[]
    } & Omit<TValueTextProps, 'value'> &
        Omit<TInlineListProps, 'items'>
>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Sider

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/layout/Sider

propsType: TSiderProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент боковой панели в layout.

@param {PropsWithChildren<TSiderProps>} props
@param {CSSProperties['width']} [props.width='400px'] - Ширина панели

@example
<Sider width="300px"><NavigationMenu /></Sider>
```

### raw props type

```ts
export type TSiderProps = {
    width?: CSSProperties['width']
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## StatusPage

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./components/StatusPage

propsType: TStatusPageProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Страница-заглушка для статусных состояний приложения.

@param {TStatusPageProps} props
@param {TView} props.view - Тип отображаемой страницы:
  `'notFound'` — 404, `'notAccess'` — 403, `'loading'` — загрузка, `'error'` — ошибка
@param {string} [props.description] - Дополнительное описание
@param {Function} [props.onClick] - Обработчик кнопки действия (например «Обновить»)

@example
if (isLoading) return <StatusPage view="loading" />
if (error?.status === 404) return <StatusPage view="notFound" />
if (error?.status === 403) return <StatusPage view="notAccess" />
```

### raw props type

```ts
export type TStatusPageProps = {
    description?: string
    view: TView
    onClick?: () => void
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## TotalAmountCard

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/TotalAmountCard

propsType: TTotalAmountCardProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Карточка итоговой суммы со скрываемым дополнительным контентом.

Отображает основную сумму крупным шрифтом и опциональный список
дополнительных полей (цена, единицы, число, текст, дата, произвольный рендер),
которые можно скрыть. Поддерживает информеры и skeleton-загрузку.

@param {TTotalAmountCardProps} props
@param {string} [props.title='Итого'] - Заголовок карточки
@param {TItemTypeMap['price']} props.totalPrice - Основная сумма (всегда видима)
@param {TTotalAmountCardItem[]} [props.extraContent] - Список скрываемых элементов
@param {TInformerProps | TInformerProps[]} [props.informerContent] - Информер(ы)
@param {boolean} [props.isLoading] - Состояние загрузки
@param {boolean} [props.isVisible] - Видимость карточки

@example
<TotalAmountCard
  totalPrice={{ label: 'Сумма', value: 150000, symbol: '₽' }}
  extraContent={[
    { type: 'price', label: 'НДС', value: 25000, symbol: '₽' },
    { type: 'text', label: 'Статус', value: 'Оплачено' },
  ]}
  isLoading={isFetching}
/>
```

### raw props type

```ts
export type TTotalAmountCardProps = {
    /**
     * Заголовок карточки, по умолчанию "Итого"
     */
    title?: string
    /**
     * Основная сумма, выделена большим шрифтом, нескрываемый контент
     */
    totalPrice: TItemTypeMap['price']
    /**
     * Список элементов скрываемого контента
     */
    extraContent?: TTotalAmountCardItem[]
    /**
     * Блок для информера / информеров
     */
    informerContent?: TInformerProps | TInformerProps[]
    /**
     * Состояние загрузки
     */
    isLoading?: boolean
    /**
     * Отображение карточки
     */
    isVisible?: boolean
    /**
     * Текст для тултипа основной суммы
     */
    textTooltip?: string
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## WidgetErrorFallback

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./components/ErrorFallback

propsType: TWidgetErrorFallbackProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
@deprecated Используйте `ErrorFallback` с `viewMode="widget"`:
  `<ErrorFallback error={error} viewMode="widget" />`

Компонент отображения ошибки RTK Query для виджетов.
```

### raw props type

```ts
export type TWidgetErrorFallbackProps = TErrorFallbackProps
```

### demo examples found

(none — write a minimal example by hand from the props)

---
