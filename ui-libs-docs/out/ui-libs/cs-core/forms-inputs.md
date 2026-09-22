# cs-core — Forms & file inputs

Level: physically defined in `@sber-front-cs-core/cs-core`, but cs-portal re-exports all of it.
Always `import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Combobox
Search + async-load filter select. `items: { label, value, disabled?, contentLeft?, contentRight? }[]` (required), `multiple?: boolean`, `value`, `onChange`, `onChangeValue` (search string changed), `onEndReached` (infinite load), `isLoading` / `isLoadingMore`, `virtual?` + `virtualCount?` (default 5, virtualized list), `isOpen`/`onToggle`, `portal`, `alwaysOpened`, `label`, `required`, `readOnly`, `renderItem?`.
Multiple-select only: `favoriteItems`, `selectedItems`, `selectAllOptions`, `chip: { mode?: 'default'|'all'|'collapsed', popoverOptions?, view? }`.
Gotcha: cs-portal explicitly re-exports `Combobox` from cs-core — this is not the same component as sdds-cs's `Combobox`.
```tsx
<Combobox items={items} value={value} multiple onChange={setValue} />
```

---

### FileUploader / UploadSet / UploadList
File-upload stack, bottom-up:
- **FileUploader** — the drop zone / click-to-pick control. `onFileUpload: (files: FileList) => void` (required), `acceptedFiles?`, `isMultiple?`, `isRequired?`, `view?: 'default' | 'icon'`.
- **UploadList** — renders an already-uploaded file list with per-item actions. `items: TUploadListItem[]` (required), `size?: 's'|'m'`, visibility flags `deleteVisible`/`downloadVisible`/`openVisible`/`renameVisible`/`saveVisible`/`abortVisible` (all default `true`), `isLoading?` + `skeletonCount?`, handlers `onDelete`/`onAbort`/`onOpen`/`onDownload`/`onRename`/`onSave`.
- **UploadSet** — combines both: drop zone + list. Adds `title?`, `subtitle?`, `textHint?`, `isTextHintError?`, `reverse?` (newest file on top), `downloadAllVisible?` + `onDownloadAll?`. Accepts all `FileUploader` and most `UploadList` props too.
Gotcha: prefer `MutationUploadSet` (see [../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md)) over `UploadSet` directly — it already wires the upload logic into react-hook-form.
```tsx
<FileUploader onFileUpload={(files) => handleFiles(files)} />
```

---

### DataField
Read-only label + value pair (for display, not editing). `label: string`, `value: string | number | ReactNode`. Long labels truncate with a popover on hover; non-node values wrap.
```tsx
<DataField label="Status" value="Approved" />
```

---

### MutationCheckbox
The `Mutation*` family member not re-exported by cs-portal by name (it only exists in cs-core) — everything else in that family (`MutationTextField`, `MutationSelect`, ...) lives in [../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md), same usage pattern applies here: a `Checkbox` wired to a react-hook-form field via `name`.
```tsx
<MutationCheckbox name="agree" label="I agree" item={{ label: 'I agree' }} options={{ required: 'Required' }} />
```

---

### Also available
- **getIsRequired** — `import { getIsRequired } from '@sber-front-cs-core/cs-portal'` · `(registerOptions) => boolean` · checks whether react-hook-form `register`/`Controller` options mark a field as required (used internally by the `Mutation*` components to show the required indicator).
- **useMutationMessages** — `import { useMutationMessages } from '@sber-front-cs-core/cs-portal'` · `() => { showToasts: (response) => void }` · shows success/error toasts from a mutation response; cs-portal has its own `useMutationSubmit` that wraps this, prefer that (see [../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md)).

---
See also: [../cs-portal/forms-mutations.md](../cs-portal/forms-mutations.md) for the full `Mutation*` family and `useMutationSubmit`.
