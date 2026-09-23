# cs-portal — Remote components & utilities

Level: `@sber-front-cs-core/cs-portal`. Module Federation remote loading, small hooks, and plain
utility functions (OData query building, response-message parsing, file helpers). Always
`import { X } from '@sber-front-cs-core/cs-portal'`.

---

### createRemoteComponent / RemoteComponent / LazyComponent

`createRemoteComponent` wraps your app's root component as a Module Federation bridge export (use
it in the remote app's `bootstrap.tsx`). `RemoteComponent` (host side) mounts a remote by name;
`LazyComponent` is the same but code-split/lazy-loaded.

```tsx
// remote app's bootstrap.tsx:
export default createRemoteComponent(App);

// host app:
<RemoteComponent {...remoteProps} />
<LazyComponent {...remoteProps} />
```

Gotcha: cs-core also exports `createRemoteComponent`/`RemoteComponent` — cs-portal's versions
(above) shadow them.

---

### useAction / useActionTrigger

`useAction` wraps an RTK mutation tuple (or any callback) with a confirm dialog and pending
state — the common "click → confirm → mutate → show result" flow in one hook.
`useActionTrigger` is the lower-level primitive it's built on.

```ts
useAction(action, { actionText?, confirm?: boolean | TConfirmParams })
  => [trigger, { isPending }]
```

```tsx
const [deleteItem, { isPending }] = useAction(useDeleteMutation(), {
    confirm: true,
    actionText: 'delete this record',
})
await deleteItem({ id: '123' })
```

Gotcha: throws a `CancelledError` if the user dismisses the confirm dialog — catch it or let it
propagate to an error boundary, don't treat it as a real failure.

### useSelectItems

Maps an array of arbitrary objects to `{ label, value }[]` for `Select`/`Combobox`.

```tsx
const items = useSelectItems({ data: cities, labelKey: 'name', valueKey: 'id' })
// [{ label: 'Moscow', value: '1' }, ...]
```

---

### OData helpers — buildFilters / buildSorts

Build `$filter`/`$orderby` query strings for OData-backed endpoints.

```tsx
buildFilters([{ key: 'status', value: 'active', filterFn: 'eq' }]) // → "status eq 'active'"
buildFilters([], 'or') // → undefined (empty input)
buildSorts([{ key: 'createdAt', direction: 'desc' }])
```

Types: `TFilter`, `TSort`.

### Response/message helpers

Convert a backend response/error into UI-ready messages.

```tsx
getMessagesFromResponse({ status: 404 })
// → [{ message: '404: resource not found', semantic: 'E' }]
getTextMessagesFromResponse({ status: 403 }) // → single '\n'-joined string
getTextFromMessage({ message: 'Error', description: 'Details' }) // → 'Error - Details'
```

Gotcha: `getMessagesFromResponse` shadows cs-core's own function of the same name — cs-portal's
looks in `messages` → `data.messages` → `error.data.messages` and falls back to a message
generated from the HTTP status.

### getNestedValue

Reads a value from an object by dotted path, type-safe.

```tsx
getNestedValue({ user: { name: 'Alice' } }, 'user.name') // → 'Alice'
getNestedValue({ user: {} }, 'user.age') // → undefined
```

Gotcha: shadows cs-core's own `getNestedValue`.

### File helpers

```tsx
extractFilename('attachment; filename="report.pdf"') // → 'report.pdf' (from Content-Disposition)
getFileExtension('document.pdf') // → 'pdf'
downloadBlob({ blob, fileName: 'report.pdf' }) // triggers a browser download
```

### parseField

Parses a JSON string and reads one field, swallowing parse errors (logs to console, returns
`undefined` instead of throwing).

```tsx
parseField('{"uuid":"abc-123"}', 'uuid') // → 'abc-123'
parseField('invalid', 'uuid') // → undefined
```

---

See also: [app-shell.md](app-shell.md) for `createReduxStore`, `createPubSupApi`,
`invalidateBySubscribe` (also utility-shaped, grouped there for topical reasons). Full exception
list for shadowed symbols: [../levels.md](../levels.md).
