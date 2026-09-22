# sdds-cs — Feedback & overlays

Level: `@salutejs/sdds-cs` (last resort — check [cs-portal](../cs-portal/) and
[cs-core](../cs-core/) docs first; most of this is re-exported by cs-portal, so
`import { X } from '@sber-front-cs-core/cs-portal'` unless a card below says otherwise).

All overlay primitives on this page (Popup/Modal/Drawer/Sheet) require `<PopupProvider>` wrapped
around the app root: `import { PopupProvider } from '@sber-front-cs-core/cs-portal'` (not shadowed
— cs-portal's wildcard re-export reaches it fine, unlike the specific names flagged below).

---

### Popup (base primitive)
What `Modal`/`Drawer` are built on — use directly only for a custom overlay shape.
```tsx
<PopupProvider>
  <Popup opened={isOpen} placement="center" offset={[0, 0]} draggable>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Popup>
</PopupProvider>
```
| Prop | Type | Note |
|---|---|---|
| opened | `boolean` | (`isOpen` deprecated) |
| placement | `'center'\|'left'\|'right'\|'top'\|'bottom'` + combos | |
| frame | `string \| RefObject<HTMLElement>` | default `document` |
| draggable | `boolean` | |
| resizable | `boolean \| { directions?, defaultSize?, min/maxWidth, min/maxHeight, icons?, ... }` | |
also: offset, positionFixed, overlay, zIndex, withAnimation, popupInfo.

### Modal (raw sdds-cs)
cs-core has its own `Modal`/`MobileModal`, and cs-portal re-exports **cs-core's** version,
shadowing this one — see [../cs-core/feedback-modals.md](../cs-core/feedback-modals.md). To use
this raw sdds-cs version specifically: `import { Modal } from '@salutejs/sdds-cs'`. Adds an
overlay + scroll/focus lock over `Popup`.
```tsx
<PopupProvider>
  <Modal opened={isOpen} onClose={() => setIsOpen(false)} placement="center" hasBody style={{ width: '25rem' }}>
    Content
  </Modal>
</PopupProvider>
```
also: hasBody (padded container + close X), hasClose, draggable, resizable, withBlur,
closeOnEsc/closeOnOverlayClick, isFocusTrapped (default true) + focusTrapSelectors (for
portal-rendered content outside the modal's own DOM subtree), initialFocusRef, focusAfterRef.
Gotcha: no default width — set it yourself (`style={{ width }}`, works with `hasBody` too).

### Drawer
Slide-out side panel, subcomponents `DrawerHeader`/`DrawerContent`/`DrawerFooter`.
```tsx
<PopupProvider>
  <Drawer opened={isOpen} onClose={() => setIsOpen(false)} placement="right" asModal width="25vw">
    <DrawerHeader hasClose onClose={() => setIsOpen(false)}><H3>Header</H3></DrawerHeader>
    <DrawerContent>Content</DrawerContent>
    <DrawerFooter><H3>Footer</H3></DrawerFooter>
  </Drawer>
</PopupProvider>
```
| Prop | Type | Note |
|---|---|---|
| placement | `'left'\|'right'\|'top'\|'bottom'` | default `left` |
| asModal | `boolean` | adds overlay + scroll/focus lock; `false` = non-modal |
| width / height | `string\|number` | default `100%` |
also: frame, animationInfo `{enter, exit}` (custom CSS keyframes), withBlur, overlayProps,
closeOnEsc/closeOnOverlayClick, initialFocusRef/focusAfterRef.

### Sheet
Bottom sheet.
```tsx
<Sheet
  opened={opened} onClose={() => setOpened(false)}
  contentHeader={<h4>header</h4>} contentFooter={<p>footer</p>}
  isHeaderFixed isFooterFixed
>
  <div>body</div>
</Sheet>
```
also: withOverlay (default true; `false` lets interaction pass through to content behind),
withBlur, hasHandle, snapPoints (`['320px','50%','40dvh']`) + initialSnapPoint +
onSnapPointChange, closeOnEsc, throttleMs (onScroll).

---

### Popover (raw sdds-cs)
cs-core has its own `Popover`, and cs-portal re-exports **cs-core's** version, shadowing this one
— see [../cs-core/feedback-modals.md](../cs-core/feedback-modals.md#popover). To use this raw sdds-cs
version specifically: `import { Popover } from '@salutejs/sdds-cs'`.
```tsx
<Popover
  opened={isOpen}
  onToggle={(is) => setIsOpen(is)}
  target={<Button>Open</Button>}
  placement="bottom"
  offset={[0, 6]}
  trigger="click"
  hasArrow
  closeOnOverlayClick
  closeOnEsc
>
  <StyledContent>...</StyledContent>
</Popover>
```
`opened: boolean` (controlled; `isOpen` is the same thing but `@deprecated`), `onToggle`,
`target*` (ReactNode or ref — what it's anchored to), `trigger: 'click'|'hover'` (default click),
`placement` (default `auto`), `offset: [number, number]` (default `[0,0]`), `hasArrow`,
`closeOnEsc`/`closeOnOverlayClick` (default true/false), `isFocusTrapped` (default true — Tab
cycles inside the popover; set false to let focus escape it), `usePortal` (default false),
`frame` (positioning container, default `document`), `preventOverflow`, `zIndex`,
`resizable: boolean | { directions?, defaultSize?, minWidth?, minHeight?, maxWidth?, maxHeight?,
icons?, iconSize? }` + `onResizeStart`/`onResizeEnd`, `animated`.
Gotcha: wrapping content clips its own `border-radius` — pass the same radius via `style` on the
`Popover` itself, not just the inner content.

### Beta Popover / Beta Tooltip
**Not** re-exported by cs-portal at all (cs-portal only re-exports the main `@salutejs/sdds-cs`
entry, not its `/beta` subpath) — these are the only two components in this whole doc set that are
always a direct import, no exception:
```tsx
import { Popover, Tooltip } from '@salutejs/sdds-cs/beta';
```
```tsx
<Popover target={<Button text="Open" />}>Content</Popover>
<Tooltip target={<Button text="Hover" />} trigger="hover">Tip text</Tooltip>
```
Popover: `target*`, `trigger: 'click'|'focus'|'hover'`, `placement`, `offset: number`, `flip`,
`shift`, `hasTail`, `portal`, `resizable`.
Tooltip: `target*`, `children*: string`, `trigger`, `placement`, `iconSlot` (left icon), `hasTail`,
`flip`, `shift`, `portal`.

### Tooltip (stable, non-beta)
```tsx
<Tooltip target={<Button>Btn</Button>} text="On hover" placement="right" hasArrow trigger="hover" />
```
`text*: ReactNode`, `target: ReactElement`, `trigger: 'none'|'click'|'hover'`, `placement`,
`hasArrow`, `mouseEnterDelay`/`mouseLeaveDelay` (default 0/300ms), `usePortal` (default true).
Gotcha: `children`/`arrow`/`isVisible`/`isOpen`/`hoverTimeout` are deprecated — use
`target`/`hasArrow`/`opened`/`mouseLeaveDelay`. Wrap in `<ViewContainer view="onDark"|"onLight">`
to theme for dark/light backgrounds (see [navigation-layout.md](navigation-layout.md#viewcontainer)).

---

### Toast (new) — `ToastContainer` + `showToast`
```tsx
<ToastContainer textColor="green" />
<Button onClick={() => showToast('Custom toast', { textColor: 'blue', pilled: true, duration: 3000 })}>
  Show
</Button>
```
Insert `<ToastContainer />` once; call `showToast(text, options)` from anywhere; `options`
overrides the container's defaults per-toast. `position` (default `bottom-center`), `duration`
(`undefined` = stays until closed manually), `hasClose` (default true), `pilled`, `contentLeft`.
Gotcha: **this is not** `showToast` from cs-portal — cs-portal's `showToast` is re-exported from
cs-core and is a different API; see [../cs-core/feedback-modals.md](../cs-core/feedback-modals.md#showtoast).

### Toast (legacy) — `ToastProvider` + `useToast`
Only reach for this if you're working directly with sdds-cs's legacy toast API — otherwise use
cs-portal's `showToast` (cs-core's, see above) or the new sdds-cs `Toast` above.
```tsx
<ToastProvider>
  <Inner />
</ToastProvider>
// Inner:
const { showToast } = useToast();
showToast({ text: 'Hint', position: 'bottom', hasClose: true, timeout: 3000 });
```

### Notification — `NotificationsProvider` + `useNotifications`
```tsx
<NotificationsProvider>
  <Example />
</NotificationsProvider>
// Example:
const { addNotification, closeNotification } = useNotifications();
addNotification(
  { id: 'incoming-call', title: 'Incoming call', children: 'Accept?', icon: <IconBell size="xs" />, view: 'positive' },
  3000, // ms; 0 or null = stays forever
);
```
`addNotification(options, timeoutMs)` returns the notification id. `onTimeoutClose` fires on
auto-close. `NotificationsProvider` takes `placement` (e.g. `'top-right'`).

---

### Overlay
Backdrop primitive used by Modal/Toast/etc internally — rarely used directly.
`zIndex*`, `backgroundColorProperty*`, `withBlur`, `transparent` (for stacking multiple popups),
`isClickable` (default true), `onOverlayClick`.
Gotcha: **shadowed** — cs-portal re-exports cs-core's `Overlay` under this name; that one is a
different, simpler API (used as a loading/blocking layer, not a popup backdrop) — see
[../cs-core/feedback-modals.md](../cs-core/feedback-modals.md#overlay). To use this raw sdds-cs
one specifically: `import { Overlay } from '@salutejs/sdds-cs'`.

### Portal
Internal helper (`ReactDOM.createPortal` as a component) — used by Popup/Popover, rarely reached
for directly.
```tsx
<Portal container={containerRef.current}><BodyM>Content</BodyM></Portal>
```
`container: HTMLElement | (() => HTMLElement)`, `disabled` (renders inline instead).

### Tour + TourCard
Spotlight product-tour overlay.
```tsx
<Tour
  open={open} current={current} onChange={setCurrent} onClose={() => setOpen(false)}
  steps={[{ target: ref1, title: 'Step 1', description: '...' }, { target: ref2, title: 'Step 2', placement: 'top' }]}
  renderStep={(cur, length, last, step, goToStep) => (
    <div>
      {step.title}<br />{step.description}
      {cur > 0 && <Button onClick={() => goToStep(cur - 1)}>Back</Button>}
      {last ? <Button onClick={() => setOpen(false)}>Close</Button> : <Button onClick={() => goToStep(cur + 1)}>Next</Button>}
    </div>
  )}
/>
```
`steps*: { target: selector|ref|element, placement?, title?, description? }[]`, `renderStep*`
builds the step card yourself — or pass the bundled `TourCard` (image/pagination/buttons ready
made) as its return value instead. `withOverlay`, `renderHighlight` (custom spotlight shape).

---
See also: [data-display.md](data-display.md), [actions.md](actions.md),
[navigation-layout.md](navigation-layout.md). Shadowed-name originals:
[../cs-core/feedback-modals.md](../cs-core/feedback-modals.md).
