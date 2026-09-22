# sdds-cs — Inputs & forms

Level: `@salutejs/sdds-cs`. Last-resort tier — check cs-portal's own `Mutation*` field family first
([../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md)), which wraps most of these for
react-hook-form. Come here for a field type `Mutation*` doesn't cover, or for raw control outside a
form. Default import is still cs-portal: `import { X } from '@sber-front-cs-core/cs-portal'` — the
one exception in this file is `Combobox` (shadowed, see its card).

---

### The TextField-shaped family
`TextField`, `TextArea`, `Mask`, `NumberFormat`, `Autocomplete`, and the `Select`/`Combobox`
text-like target all inherit TextField's base prop set: `size: 's'|'m'`, `view: 'default'|'negative'`,
`appearance: 'default'|'clear'`, `label`, `placeholder`, `disabled`, `readOnly`, `required`,
`contentLeft`/`contentRight`, `leftHelper`/`rightHelper` (helper text), `titleCaption` (top-right
label), and the `hint*` family (`hintText`, `hintTrigger: 'click'|'hover'`, `hintPlacement`,
`hintTargetIcon`... — a tooltip icon next to the field, independent of helper text).
```tsx
<TextField
  value={text}
  onChange={(e) => setText(e.target.value)}
  label="Name"
  contentRight={text && <IconButton size="s" view="clear" onClick={() => setText('')}><IconClose size="s" /></IconButton>}
/>
```
Gotcha: `chips`/`onChangeChips`/`enumerationType` (legacy in-field chip mode) and `onSearch` are
`@deprecated` on `TextField`.

| Component | Adds on top of TextField | Notes |
|---|---|---|
| TextArea | `autoResize` + `minAuto`/`maxAuto` (rows), `rows`/`cols` (fixed), `height`/`width` | `clear` legacy mode is deprecated, use `appearance="clear"` |
| Mask | `mask` (tokens: `0`=digit, `a`=A-Za-z, `я`=А-Яа-я, `*`=any, `\`=escape), `maskChar`, `alwaysShowMask`, `showStartChars` | `<Mask mask="+7 (000) 000 - 00 - 00" maskChar="_" alwaysShowMask />` |
| NumberFormat | `thousandSeparator`, `decimalSeparator`, `thousandsGroupStyle: 'thousand'\|'lakh'\|'wan'\|'none'`, `decimalScale`, `fixedDecimalScale`, `allowNegative`, `prefix`/`suffix` | standalone `numberFormatter(value, options)` helper applies the same rules outside a component |
| Autocomplete | `suggestions: {label, contentLeft?, contentRight?}[]`, `threshold` (min chars, default 2), `filter`, `onSuggestionSelect` | keyboard = W3C Combobox pattern |

### NumberInput
Stepper input (increment/decrement buttons), separate component from NumberFormat.
`min`/`max`/`step` bound the value, `precision` (default 2) rounds step results, `decimalScale`
(default 2) controls displayed digits, `isManualInput` (default `false`) allows typing directly.
```tsx
<NumberInput value={value} min={0} max={10} step={2} isManualInput onChange={(_, v) => setValue(v)} />
```
also: `limitBehavior: 'disabled'(default)|'hidden'`, `displayWithoutValue: 'input'|'increment'|'decrement'`,
plus the same `thousandSeparator`/`decimalScale`/etc. formatting props as NumberFormat.

---

### Checkbox / Radiobox / Switch
Boolean/choice controls, all share `label`/`description` (accept JSX), `singleLine` (default
`false` = multiline allowed), `size`, `disabled`.
```tsx
<Checkbox label="Subscribe" description="Weekly digest" defaultChecked />

<RadioGroup aria-labelledby="rg-title">
  <Radiobox name="plan" value="basic" label="Basic" defaultChecked />
  <Radiobox name="plan" value="pro" label="Pro" />
</RadioGroup>

<Switch label="Notifications" toggleSize="l" defaultChecked />
```
Gotcha: `Radiobox`es sharing a `name` must be grouped inside `RadioGroup`. `Checkbox.indeterminate`
takes priority over `checked`. `Switch.pressed`/`outlined` are `@deprecated` (use `focused`).

---

### Select vs Combobox
Both take `items: { value, label, items?: nested[], disabled?, contentLeft?, contentRight? }[]` as
their only required prop, and both support `multiselect`/`multiple` (single `string` ↔ multi
`string[]` value). **Select** has no built-in text search — use it for a fixed, short list.
**Combobox** filters as you type and supports a `treeView` render for nested items — use it for
longer or hierarchical lists.
```tsx
<Select items={items} value={value} onChange={setValue} label="Country" />
<Combobox items={items} value={value} onChange={setValue} multiple isTargetAmount label="Tags" />
```
also (both): `target: 'textfield-like'(default)|'button-like'`, `placement`, `portal`,
`renderValue`/`renderItem`, `selectAllOptions` (multi-mode "select all" action).

**Gotcha — Combobox is shadowed.** cs-core has its own `Combobox`, and cs-portal explicitly
re-exports the **cs-core** version (see [../cs-core/data-display.md](../cs-core/data-display.md) —
cs-portal import gets you that one, not this raw sdds-cs one. To reach this exact sdds-cs
`Combobox`: `import { Combobox } from '@salutejs/sdds-cs'`. `Select` is not shadowed — the cs-portal
import gets you this sdds-cs `Select` directly.

---

### DatePicker / DatePickerRange / Calendar family
`DatePicker` = text input + dropdown calendar; `DatePickerRange` = two inputs (`firstPlaceholder`/
`secondPlaceholder`) + one calendar (`isDoubleCalendar` for two months). `format` (default
`'DD.MM.YYYY'`) + `maskWithFormat` masks typing to match it. `lang: 'ru'(default)|'en'`.
```tsx
<DatePicker
  onChangeValue={(_, value) => setDate(value)}
  label="Date" format="DD.MM.YYYY" maskWithFormat lang="ru" usePortal
/>
<DatePickerRange isDoubleCalendar usePortal label="Period" format="DD.MM.YYYY" lang="ru" />
```
also: `min`/`max` + `includeEdgeDates`, `eventList`/`disabledList` (calendar day markers),
`dateShortcuts` (preset buttons), `onCommitDate(value, {error, success})` fires on Enter/day-pick.
Gotcha: plain `onChange` is `@deprecated` — use `onChangeValue` (+ `onCommitDate` for
commit-on-Enter/pick).

Lower-level pieces if you need just the calendar grid without an input:
`Calendar` (universal, `isRange`+`isDouble` switches variant), or the fixed variants `CalendarBase`,
`CalendarDouble`, `CalendarBaseRange`, `CalendarDoubleRange`. All share `min`/`max`, `date`,
`eventList`/`disabledList`, `locale`, `type: 'Days'|'Months'|'Quarters'|'Years'`.

### TimePicker
`columnsQuantity: 2(HH:mm)|3(HH:mm:ss)`, `hasTimeFormat` (12h *display* only — value/min/max stay
24h), `multiplicityMinutes`/`multiplicitySeconds` (step restriction).
```tsx
<TimePicker columnsQuantity={3} value="15:00:00" min="12:00:00" max="20:00:00" onChange={(_, v) => setV(v.value)} />
```
Gotcha: use `formattedValues` from `onChange(event, formattedValues)` — the raw `event` arg is
deprecated context only.

### Range
Two-field text/numeric range (`firstValue`/`secondValue`), same shape as `DatePickerRange` but
plain values, no calendar. `dividerVariant: 'none'|'dash'|'icon'`.
```tsx
<Range label="Range" firstPlaceholder="From" secondPlaceholder="To" dividerVariant="dash" />
```

### Slider
`value` as `number` = single handle, as `[number, number]` = range. `onChange` fires while
dragging, `onChangeCommitted` fires on release — wire both if you need the committed value.
```tsx
<Slider min={0} max={100} value={value} label="Volume" onChange={setValue} onChangeCommitted={setValue} />
```
also: `orientation: 'horizontal'(default)|'vertical'`, `showScale`, `step` + `multipleStepSize`
(PageUp/PageDown, % of range).

### Attach
Local file picker. `ref` forwards to the real `<input type="file">`, so it participates in
`FormData` on submit via `name` — no special form wiring needed.
```tsx
<Attach flow="horizontal" files={files}
  onChange={(e) => setFiles(Array.from(e.target.files || []))}
  onClear={(fileInfo) => setFiles((prev) => prev.filter((f) => f !== fileInfo.file))}
/>
```
also: `multiple`, `acceptedFileFormats` (HTML `accept` list), `helperText`, `flow: 'auto'(default)|'horizontal'|'vertical'`.
Note: for an RTK-Query-backed upload/list/delete widget instead of a raw file input, see
`SmartUploadSet`/`UploadSet` in [../cs-core/forms-inputs.md](../cs-core/forms-inputs.md) and
[../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md).

---

### Wiring these into a form
This project uses react-hook-form via cs-portal's re-export — `import { useForm, Controller } from
'@sber-front-cs-core/cs-portal'`, not a separate `react-hook-form` dependency.

Simple fields: `{...register('name')}`.
```tsx
const { register, handleSubmit } = useForm();
<form onSubmit={handleSubmit(onSubmit)}>
  <TextField {...register('textfield')} />
  <Checkbox {...register('checkbox')} label="Checkbox" />
  <Combobox {...register('combobox')} items={items} />
</form>
```
`DatePicker`/`DatePickerRange`: don't use `{...register()}` — its `onChange` signature isn't
register-compatible. Use `Controller` instead (its `field.ref` lands on the real `<input>`, so
`setFocus`/scroll-to-error work):
```tsx
<Controller
  name="birthDate" control={control} rules={{ required: true }}
  render={({ field }) => (
    <DatePicker {...field} label="Birth date" valueError={!!errors.birthDate}
      leftHelper={errors.birthDate ? 'Required' : undefined} />
  )}
/>
```
Slider (double)/Combobox/Select in **multiple** mode, when read via a plain `<form>` + `FormData`
(not react-hook-form), return **one form entry per value with the same field name** rather than an
array — iterate `formData.getAll(name)`. `Mutation*` field components handle this for you; prefer
them ([../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md)) unless you're intentionally
bypassing react-hook-form.

Validation: no first-class validation library bundled beyond `useValidation({ validationType:
'email'|'password', options, onValidate })` for a couple of built-in patterns; otherwise pair
`useForm({ resolver })` (e.g. `yupResolver`) with `view="negative"` + `leftHelper={errors.field?.message}`.

---
See also: [actions.md](actions.md), [../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md)
(prefer that family first), [../cs-core/forms-inputs.md](../cs-core/forms-inputs.md).
