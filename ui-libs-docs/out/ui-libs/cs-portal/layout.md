# cs-portal — Layout

Level: `@sber-front-cs-core/cs-portal`. Page shell primitives, status/error pages, and small
"display value with a label from schema metadata" components. Always
`import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Box
Universal `div`-based layout primitive — CSS properties (display, flex, gap, padding, width, ...)
as props instead of a stylesheet.
```tsx
<Box display="flex" gap="16px" padding="24px">
  <Box width="200px">Left column</Box>
  <Box flexGrow={1}>Content</Box>
</Box>
```

### Layout / Header / Content / Footer / Sider
The page shell. `Layout` is a vertical flex container; nest it for a sidebar layout. `Sider`
defaults to `width="400px"`.
```tsx
<Layout gap="16px">
  <Header><CollapsingPageHeader title="Order #123" /></Header>
  <Layout>
    <Sider width="300px"><NavigationMenu /></Sider>
    <Content><Outlet /></Content>
  </Layout>
  <Footer><ActionButtons /></Footer>
</Layout>
```

---

### CollapsingPageHeader
Page header with title/subtitle/breadcrumbs/status badges/tag badges/actions toolbar, plus an
optional collapsible content section (recommended: `FormFlex` inside `content`). Shows a skeleton
while `isLoading`.
| Prop | Type | Note |
|---|---|---|
| title | `string` | required |
| subtitle | `string \| null` | truncates with ellipsis |
| breadcrumbs / statusBadges / tagBadges / actionsToolbar | `ReactNode` | |
| content | `ReactNode` | collapsible area, use `FormFlex` |
| isOpenContent / onOpenContentChange | `boolean` / `fn` | controls collapse externally |
| isLoading / skeletonCount | `boolean` / `number` | loading skeleton |
```tsx
<CollapsingPageHeader
  title="Order #12345 from 2024-01-01"
  subtitle="Equipment delivery"
  breadcrumbs={<Breadcrumbs items={crumbs} />}
  statusBadges={<StatusBadge status="active" />}
  content={<FormFlex>...</FormFlex>}
  isLoading={isFetching}
/>
```

---

### Drawer
Side panel with title/content/optional footer. Wraps sdds-cs `Drawer` with a simplified API.
| Prop | Type | Note |
|---|---|---|
| title | `ReactNode \| string` | required |
| content | `ReactNode` | required |
| footer | `ReactNode` | |
| size | `'s' \| 'm'` | |
| opened / onClose | `boolean` / `fn` | |
also: `asModal`, `frame`, `zIndex` (passed through to sdds-cs `Drawer`)
```tsx
<Drawer
  title="Edit"
  content={<EditForm />}
  footer={<Button onClick={onClose}>Close</Button>}
  opened={isOpen}
  onClose={() => setIsOpen(false)}
  size="m"
/>
```
See also: [../cs-core/feedback-modals.md](../cs-core/feedback-modals.md) for `Modal`/`Overlay`.

---

### ErrorFallback / WidgetErrorFallback
Renders a human-readable error from an RTK Query error (`FetchBaseQueryError | SerializedError`).
`viewMode`: `'page'` (default; 404 → not-found page, other 4xx → error page) or `'widget'` (same,
sized for an inline widget).
```tsx
const { data, error } = useGetOrderQuery(id);
if (error) return <ErrorFallback error={error} />;
// inside a widget:
if (error) return <ErrorFallback error={error} viewMode="widget" />;
```
Gotcha: `WidgetErrorFallback` is deprecated — use `ErrorFallback` with `viewMode="widget"` instead.

---

### StatusPage
Full-page placeholder for app-level states.
```tsx
if (isLoading) return <StatusPage view="loading" />;
if (error?.status === 404) return <StatusPage view="notFound" />;
if (error?.status === 403) return <StatusPage view="notAccess" />;
```
`view`: `'notFound' | 'notAccess' | 'loading' | 'error'`. Also: `description`, `onClick` (action
button, e.g. "Retry").

---

### TotalAmountCard
Summary-amount card: one always-visible total plus a collapsible list of extra fields (price,
unit, number, text, date, or custom render).
```tsx
<TotalAmountCard
  totalPrice={{ label: 'Total', value: 150000, symbol: '₽' }}
  extraContent={[
    { type: 'price', label: 'VAT', value: 25000, symbol: '₽' },
    { type: 'text', label: 'Status', value: 'Paid' },
  ]}
  isLoading={isFetching}
/>
```
also: `title` (default `'Итого'`), `informerContent`, `isVisible`, `textTooltip`.

---

### MessageView
Renders a list of system messages, grouped by semantic (`E`|`W`|`I`|`S`), with optional
per-message `suggestions`.
```tsx
<MessageView
  messages={[
    { message: 'Field is required', semantic: 'E', target: 'name' },
    { message: 'Saved', semantic: 'S' },
  ]}
/>
```

---

### InlineList
Renders `items` inline with a `separator`, truncating to `maxVisibleItems`. Underlies the
`Multi*` components below.
```ts
InlineList({ items?: ReactNode[], separator?: ReactNode, maxVisibleItems?: number })
```

### MultiValueText / MultiDisplayText / MultiValueLink / MultiDisplayLink
Render an array of values inline (via `InlineList`) instead of one. `Value*` variants take raw
`values`; `Display*` variants additionally accept `meta` (schema metadata) and auto-fill `label`
from `meta.title` when not passed explicitly.
```tsx
<MultiValueText values={[{ text: 'Ivanov I.I.' }, { text: 'Petrov P.P.' }]} />
<MultiDisplayText meta={{ title: 'Company' }} value="Romashka LLC" />
<MultiValueLink
  values={[{ text: 'Order #123', id: '123' }]}
  onClick={(value) => navigate(`/orders/${value.id}`)}
/>
<MultiDisplayLink meta={{ title: 'Document' }} value="Contract #1" onClick={handleClick} />
```
also on all four: `separator`, `maxVisibleItems`.

---
See also: [app-shell.md](app-shell.md) for `ProtectedRoute`'s use of `ErrorFallback`.
[../cs-core/data-display.md](../cs-core/data-display.md) for the single-value `Display*`/`Value*`
family these `Multi*` components are built on.
