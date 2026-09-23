# cs-core — App/remote/utils

Level: `@sber-front-cs-core/cs-core`. Always `import { X } from '@sber-front-cs-core/cs-portal'`.
Low-level app/micro-frontend plumbing and small utilities — most apps only need `useHost`/
`HostProvider` and the breakpoint constants; the rest is infrastructure code.

---

### useHost / HostProvider

Reads segment/basename/externalNavigate from context. Requires `HostProvider` in the tree.

```tsx
<HostProvider segment={...} basename="/portal" externalNavigate={navigate}>
  <App />
</HostProvider>
// deeper:
const { segment, basename, externalNavigate } = useHost();
```

### importRemote

Loads a module-federation remote at runtime.

```ts
importRemote<T>({ url, scope, module, remoteEntryFileName?, bustRemoteEntryCache?, esm? }): Promise<T>
```

### createRemoteApp

Wraps a root component as a module-federation-bridge remote app (`render`/`destroy` lifecycle) —
used when this app is itself consumed as a remote by a host shell. Most feature apps don't call
this directly; check the app's own entry point before reaching for it.

```ts
createRemoteApp(RootComponent) // -> () => { render(info), destroy(info) }
```

### Breakpoint constants

`MIN_TABLET = '768px'`, `MIN_DESKTOP = '1440px'`, `ENABLE_SPLIT = '1024px'` (min width for
`SplitContainer`'s master/detail to show side by side — see [pages-layouts.md](pages-layouts.md)).

### getBorderRadiusSize

```ts
getBorderRadiusSize(view: TBorderRadiusSizes): string
```

### glassedCSS

Emotion `SerializedStyles` — a "glass" (blurred/translucent) surface style, spread into a
`styled(...)` template.

### p13nApi

Auto-generated RTK Query API (from an OpenAPI spec) for the personalization backend. Treat as an
implementation detail — inspect its generated types in the app rather than this doc; not
hand-documented here.

See also: [../cs-portal/app-shell.md](../cs-portal/app-shell.md) for `createApp`/`createRemoteComponent`
(the more commonly used app/remote entry points).
