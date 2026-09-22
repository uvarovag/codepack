# cs-core — Data display

Level: `@sber-front-cs-core/cs-core`. Always `import { X } from '@sber-front-cs-core/cs-portal'`
(only `Badge` is explicitly re-pinned by cs-portal's index — still to the cs-core version, so the
import line is the same either way).

---

### Badge
Non-clickable visual marker. Two views: `status` (system state) or `info` (doc type / highlight).
`text` and `icon` are mutually exclusive.

| Prop | Type | Note |
|---|---|---|
| view | `'status' \| 'info'` | required |
| text | `string` | required for `status`; alternative to `icon` for `info` |
| status | `'new'\|'attention'\|'critical'\|'successful'\|'closed'` | `status` view only, default `'new'` |
| icon | one of a small fixed set (`fireOutline`, `magic`, `clockCircleOutline`, `doneDouble`, `percent`) | `info` view only, alternative to `text` |
| color | `TColorBadge` (red/amber/sunny/spring/arctic/skyBlue/electricBlue/orchid/fuchsia/coolGray1/coolGray2/white) | `info` view only, default `skyBlue` |
| tooltipText | `string` | `info` view only |
| mobileOnClick | `() => void` | `status` view only — shows an arrow button on mobile |

```tsx
<Badge view="status" status="critical" text="Overdue" />
<Badge view="info" icon="magic" color="electricBlue" tooltipText="AI-assisted" />
```

---

### Display* / Value* — read-only field family
24 components, all read-only, formatted single-value renderers. **Display\*** = full field (label
+ value, built on cs-core's typography + `EllipsisInfo`). **Value\*** = just the formatted value,
no label wrapper — use it to compose your own field layout (e.g. inside a `DataField` or a table
cell). Both share `size` (`'s'|'m'`), `showCopyButton`, `bold`, `color`, `className`, `as`;
Display\* also takes `label`.

| Component pair | Value type | Extra props | Notes |
|---|---|---|---|
| DisplayBoolean / ValueBoolean | `boolean` | — | renders Да/Нет via `formatBoolean` |
| DisplayDate / ValueDate | `string` (ISO) | `UTC?`, `template?: TDateTemplate` | |
| DisplayDateRange / ValueDateRange | `{ from, to }: string` | `UTC?`, `template?` | |
| DisplayDateTime / ValueDateTime | `string` (ISO) | `UTC?`, `template?: TDateTimeTemplate` | |
| DisplayTime / ValueTime | `string` | `UTC?` | |
| DisplayTimeRange / ValueTimeRange | `{ from, to }: string` | `UTC?` | |
| DisplayLink / ValueLink | `string \| number` | `navigate?`, `href`/`onClick` (via rest) | renders as a link if `onClick` or a valid `href` is given; `onClick` wins over `navigate` |
| DisplayNumber / ValueNumber | `number` | `hideFraction?` | |
| DisplayPercent / ValuePercent | `number` | `hideFraction?` | appends `%` |
| DisplayPrice / ValuePrice | `number` | `symbol?`, `unicodeSymbol?`, `name` (required), `hideFraction?`, `tooltipVisible?` | |
| DisplayUnit / ValueUnit | `number` | `name` (required), `description` (required), `hideFraction?` | e.g. "12 kg" |
| DisplayText / ValueText | `string \| number` | `isEllipsisInfo?`, `noWrap?`, `countLineClamp?` (Display only) | plain text with optional ellipsis+tooltip |

```tsx
<DisplayDate label="Created" value={order.createdAt} template="dd.MM.yyyy" />
<ValuePrice value={order.total} name="RUB" />
```
Gotcha: `value` (and `from`/`to`) accept `TFormatterValue<T>` — `T | null | undefined` all render
the configured fallback (`NO_DATA_VALUE`/`INVALID_VALUE`), you don't need to guard manually.

---

### Formatters & constants
Underlying pure functions the Display/Value family calls — use directly outside JSX (table export,
plain text).

| Function | Signature | Notes |
|---|---|---|
| `format` | `({ value, template, UTC }) => string` | generic date formatter |
| `formatDate` / `formatDateTime` / `formatTime` | `(opts) => string` | |
| `formatDateRange` / `formatTimeRange` / `formatRange` | `(opts) => string` | |
| `formatNumber` | `(value, hideFraction?) => string` | |
| `formatBoolean` | `(value) => 'Да' \| 'Нет' \| ''` | |

Constants: `FALLBACK_VALUE` ("Не заполнено"), `NO_DATA_VALUE` ("Нет данных"), `INVALID_VALUE`
(`""`), `FRACTION_DIGITS` (`2`), `CURRENCY_SYMBOL` (map: `rub`/`usd`/`eur`/`cny` → symbol string,
both cases).

---

### AccordionContent / AccordionContentNew
Collapsible sections. **`AccordionContentNew` is current** — `AccordionContent` is
`AccordionContentLegacy` aliased, `@deprecated`.
```tsx
const [value, setValue] = useState(['section-1']);
<AccordionContentNew items={items} value={value} onChange={setValue} />
```
`items`: `{ id, label, content, value, visible? }[]` — `visible: false` hides a section.

---

### Chat
Full chat UI: message list + input + attachments, reply/copy actions, typing indicator, optional
tabs. Requires either `footer` (fully custom input) or `onMessage` (+ optional `attachVisible`);
requires either `header` (fully custom) or `title`/`icon`.

| Prop | Type | Note |
|---|---|---|
| messages | `TMessage[]` | `{ id, content, isUser?, role?, date?, suggestions?, attachedFiles?, ... }` |
| onMessage | `(value, files, repliedMessage) => void` | send handler |
| attachVisible | `boolean` | file attach button, default false |
| typing | `{ role }[]` | shows "typing..."; also blocks sending while an AI role is typing |
| onLike / onDislike | `(message) => void` | per-message feedback |
| onReplyToMessage | `(message) => void` | |
| tabOptions | subset of `Tabs` props | optional tabs inside the chat |
| isChatClosed / isLoadingContent / isLoadingTabs | `boolean` | |
also: `Message` (custom message renderer), `likeVisible`/`dislikeVisible`, `visibleCopyMessageAction`,
`visibleReplyMessageAction`, `onChangeIsRead`, `onChangeIsPinned`, `suggestionButtons` (max 2).
```tsx
<Chat title="Support" messages={messages} onMessage={(text, files) => send(text, files)} attachVisible />
```

---

## Also available (tier B)

- **DraggableRows** / **removeDraggableRowsItem** — drag-to-reorder/group tree list · `items: TNode<T>[]`, `isEdit?`, `isGroupable?`, `withIndex?`; helper removes an item from the tree.
- **EllipsisInfo** — text + line-clamp ellipsis + hover tooltip with full text · `text`, `countLineClamp?`, `typographyComponent?`.
- **EmptyStates** — empty/error/blocker placeholder view · a discriminated union of view variants (loading-error, blocker, "no items yet", widget-empty) — check `TEmptyStatesProps` per use case.
- **EventsHistory** — vertical timeline of change events · `items: TEvent[]`, skeleton loading state.
- **getStack** / **setTopDocument** — pure helpers for `LinkedDocs`' document-graph data.
- **HighlightComponent** — highlights `contentKey` substring matches inside `text`.
- **Informer** — dismissible info banner · `opened`, `onClose?`, `title?`, `content`, `withIcon?`, `withCloseButton?`, `isLoading?`.
- **LinkedDocs** — document-chain graph visualization · `items: TNode[]` (documents), `edges: TEdge[]` (links), optional `editor` for creating new links.
- **Loader** — inline loading spinner + text · `size` (default `'s'`), `text?`, flex alignment props.
- **PdfHighlighter** — PDF viewer with text search/highlighting · `searchTerm?`, `searchContext?`, `sideBarPosition?`, `header?`/`footer?` for the side panel.
- **PdfViewer** — plain PDF viewer · `pdfData` (url / binary / base64 / `File`), `numPages?`, `onLoadSuccess?`.
- **RenderItem** — custom item renderer for dropdown/select/combobox lists · `label`, `description?`, `code?`, `action?: { icon, onClick }`.
- **SLA** — countdown/elapsed-time tracker against a deadline · `appointmentDate`, `plannedDate?`, `factDate?`, `datePrefix`, `mulct?` (penalty state).
- **Spoiler** — collapsible text block · `text`, `visibleRows?`, `typographyComponent?` (default `BodyM`), `onToggle?`.
- **StatusTrack** — chronological event timeline (collapsible) · `items?: TItemStatusTrack[]`, `title?`, `opened?`/`onOpened?`.
- **TextCopyButton** — copy-to-clipboard button + toast · `text`, `size?`. Requires `ToastProvider` (from `@salutejs/sdds-cs`) in the tree.
- **Thread** — list of chat/message threads · built on `TListThreadsProps` + a header + `onCreate`.
- **Tile** / **TileContainer** — small content card and its grouping container · `Tile`: `title`, `description?`, `badges?: TBadgeProps[]`, `footer?`, `href`/`navigate`/`onClick`, `action?`; `TileContainer`: `items: Tile props[]`, `gap?`.

See also: [feedback-modals.md](feedback-modals.md), [table.md](table.md) (`RenderItem` pairs with
combobox/select columns), [navigation.md](navigation.md) (`Tabs` used by `Chat`'s `tabOptions`).
