# cs-portal — Forms & Mutations

Level: `@sber-front-cs-core/cs-portal`. The `Mutation*` field family (react-hook-form-integrated
inputs), form submission helpers, and the react-hook-form re-exports. Always
`import { X } from '@sber-front-cs-core/cs-portal'`.

---

### The `Mutation*` field family

All 15 wrap a react-hook-form field with the same shape: `name` (RHF field path), `label`,
`options` (RHF validation rules), `meta` (optional schema metadata — auto-fills label/required/
validation from a backend schema), and `fc` (field control: `FC_HIDDEN`(0) / `FC_READONLY`(1) /
`FC_OPTIONAL`(3) / `FC_MANDATORY`(7) — overrides visibility/required state). Must be rendered
inside a react-hook-form `<FormProvider>`.

```tsx
<FormProvider {...form}>
    <FlexBox flexDirection="column" gap={2}>
        <MutationTextField label="Document number" name="documentNumber" options={{ required: true }} />
        <MutationTextField label="Amount with VAT" name="amountWithVat" options={{ required: true }} />
        <MutationSubmit useMutation={useCreateOrderMutation} onSuccess={onSuccess}>
            Save
        </MutationSubmit>
    </FlexBox>
</FormProvider>
```

| Component               | Wraps               | Note                                                                                                      |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| MutationTextField       | TextField           | single-line text                                                                                          |
| MutationTextArea        | textarea            | multi-line text                                                                                           |
| MutationNumberInput     | numberInput         | plain number                                                                                              |
| MutationNumberFormat    | number-format       | formatted number; `meta.multipleOf` → decimal scale                                                       |
| MutationMask            | mask                | masked input                                                                                              |
| MutationSelect          | select              | single select                                                                                             |
| MutationCombobox        | combobox            | search + select; supports `multiple` + `selectAllOptions` (see example below)                             |
| MutationAutocomplete    | autocomplete        | free text + suggestions                                                                                   |
| MutationCheckboxGroup   | checkbox group      | multi-select checkboxes                                                                                   |
| MutationRadioGroup      | radiobox group      | single-select radios                                                                                      |
| MutationSwitch          | switch              | boolean toggle                                                                                            |
| MutationDatePicker      | datepicker          | single date                                                                                               |
| MutationDatePickerRange | datepicker (range)  | date range                                                                                                |
| MutationTreeCheckbox    | tree + checkbox     | hierarchical multi-select                                                                                 |
| MutationUploadSet       | UploadSet (cs-core) | file upload, RHF-bound (see `SmartUploadSet` in [widgets.md](widgets.md) for the RTK-Query-bound variant) |

`MutationCombobox` with a "select all" action:

```tsx
const { setValue } = useFormContext()
;<MutationCombobox
    {...args}
    multiple
    selectAllOptions={{ onClick: (items) => items && setValue(args.name, items) }}
    onChange={undefined}
/>
```

Gotcha: cs-core exports its own `Mutation*` set with the same names — cs-portal's versions
(above) shadow them; importing from cs-portal always gets you these. cs-core additionally has
`MutationCheckbox` (singular, no cs-portal equivalent) — see
[../cs-core/forms-inputs.md](../cs-core/forms-inputs.md).

---

### MutationSubmit

Submit button integrated with react-hook-form + an RTK mutation hook. Manages `isLoading`
automatically.

```tsx
<MutationSubmit useMutation={useCreateOrderMutation} onSuccess={onSuccess}>
    Save
</MutationSubmit>
```

also: `view`, `stretching`, `isLoading` (same as `Button`, forwarded through).

### useMutationSubmit

The hook `MutationSubmit` is built on — use directly for a custom submit UI. Calls the RTK
mutation, shows a toast, and maps server field errors onto the form via `setError`.

```ts
useMutationSubmit({ useMutation, onSuccess?, onError?, targetPrefix?, removeEmptyValues? = true })
  => { submit, useMutationReturn }
```

```tsx
const { submit } = useMutationSubmit({
    useMutation: useCreateOrderMutation,
    onSuccess: (data) => navigate(`/orders/${data.data?.uuid}`),
})
return <form onSubmit={submit}>...</form>
```

Gotcha: shadows cs-core's own `useMutationSubmit` (cs-portal's is RTK-Query-aware; cs-core's is
more generic).

### SmartUploadSet

File attachment manager (upload/view/rename/delete) driven entirely by RTK Query hooks you
supply — one hook per operation. Supports optimistic updates, upload cancel, single-file and
archive download.

```tsx
<SmartUploadSet
    entityUuid={order.uuid}
    entityId={order.id}
    useGetFilesInfoQuery={useGetOrderFilesQuery}
    useUploadFileMutation={useUploadOrderFileMutation}
    useDeleteFileMutation={useDeleteOrderFileMutation}
    useRenameFileMutation={useUpdateOrderFileInfoMutation}
    useLazyDownloadFileQuery={useLazyDownloadOrderFileQuery}
    useLazyDownloadPreviewFileQuery={useLazyDownloadOrderFilePreviewQuery}
    useLazyDownloadAllFilesQuery={useLazyDownloadAllOrderFilesQuery}
    uploadVisible
    deleteVisible
/>
```

also: `size`, `title`, `subtitle`, `helperItems`, `reverse`, `downloadAllVisible`,
`downloadVisible`, `openVisible`, `renameVisible`, `acceptedFiles`, `filter` (OData filter on the
files query).

---

### FC_HIDDEN / FC_READONLY / FC_OPTIONAL / FC_MANDATORY

Numeric constants (`0`, `1`, `3`, `7`) for the `fc` prop on every `Mutation*` field above —
overrides a field's visibility/required state independent of its own `options`.

---

### react-hook-form re-exports

Re-exported as-is for convenience so you don't need a separate `react-hook-form` import:
`Controller`, `FormProvider`, `useForm`, `useFieldArray`, `useController`, `useFormContext`,
`useFormState`, `useWatch` (and types `Control`, `UseFieldArrayRemove`, `UseFormReturn`). See the
react-hook-form docs for their API — behavior is unmodified.

---

See also: [../cs-core/forms-inputs.md](../cs-core/forms-inputs.md) for the plain (non-Mutation)
field components and `MutationCheckbox`. [widgets.md](widgets.md) for `SmartUploadSet`'s siblings
`Attachment`/`MultiAttachment`.
