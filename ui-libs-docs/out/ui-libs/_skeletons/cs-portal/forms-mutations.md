<!-- SKELETON for cs-portal/forms-mutations.md — raw material only, not the final doc. 30 symbols. -->

## Controller

tier: A · origin: react-hook-form · usedByApps: false · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## FC_HIDDEN

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/constants

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const FC_HIDDEN = 0
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## FC_MANDATORY

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/constants

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const FC_MANDATORY = 7
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## FC_OPTIONAL

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/constants

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const FC_OPTIONAL = 3
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## FC_READONLY

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/constants

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
export declare const FC_READONLY = 1
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## FormProvider

tier: A · origin: react-hook-form · usedByApps: true · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationAutocomplete

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationAutocomplete
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationAutocompleteProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Поле ввода с автодополнением, интегрированное с react-hook-form.

Расширяет базовый `MutationAutocomplete` из cs-core поддержкой
`meta` (валидация из схемы) и `fc` (управление режимом поля).

@template TFieldValues - Тип полей формы
@param {TMutationAutocompleteProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы (title, required, maxLength и др.)
@param {TFieldControl} [props.fc] - `0` hidden, `1` readOnly, `3` optional, `7` mandatory
```

### raw props type

```ts
export type TMutationAutocompleteProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationCheckboxGroup

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationCheckboxGroup
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: MutationCheckboxGroupProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Группа чекбоксов, интегрированная с react-hook-form.

@template TFieldValues - Тип полей формы
@param {MutationCheckboxGroupProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
```

### raw props type

```ts
export type MutationCheckboxGroupProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationCombobox

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationCombobox
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationComboboxProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Комбобокс (поиск + выбор), интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationComboboxProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationComboboxProps<TFieldValues extends FieldValues> = BaseProps<TFieldValues> & TFieldOptions
```

### demo examples found

<!-- components/mutation/mutationComponents/MutationCombobox/ui/MutationComboboxSelectAllDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { useFormContext } from 'react-hook-form'

import { MutationCombobox } from '../../../../../../src'

export const MutationComboboxSelectAllDemo = ({ ...args }: ComponentProps<typeof MutationCombobox>) => {
    const { setValue } = useFormContext()

    return (
        <MutationCombobox
            {...args}
            multiple
            selectAllOptions={{
                onClick: (items) => items && setValue(args.name, items),
            }}
            onChange={undefined}
        />
    )
}
```

---

## MutationDatePicker

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationDatePickers
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationDatePickerProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Выбор даты, интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationDatePickerProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationDatePickerProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationDatePickerRange

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationDatePickers
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationDatePickerRangeProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Выбор диапазона дат, интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationDatePickerRangeProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationDatePickerRangeProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationMask

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationMask
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationMaskProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Поле ввода с маской, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationMaskProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationMaskProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationNumberFormat

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationNumberFormat
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationNumberFormatProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Числовое поле с форматированием, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationNumberFormatProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы (multipleOf → decimalScale)
```

### raw props type

```ts
export type TMutationNumberFormatProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationNumberInput

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationNumberInput
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationNumberInputProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Числовое поле ввода, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationNumberInputProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationNumberInputProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationRadioGroup

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationRadioGroup
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationRadioGroupProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Группа радиокнопок, интегрированная с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationRadioGroupProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
```

### raw props type

```ts
export type TMutationRadioGroupProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationSelect

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationSelect
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationSelectProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Выпадающий список, интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationSelectProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationSelectProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationSubmit

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationSubmit
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationSubmitProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Кнопка отправки формы, интегрированная с react-hook-form и RTK Mutation.

Управляет состоянием `isLoading` автоматически.

@template TFieldValues - Тип полей формы
@template Response - Тип ответа мутации

@param {TMutationSubmitProps<TFieldValues, Response>} props
@param {ReactNode} [props.children] - Текст кнопки

@example
<MutationSubmit useMutation={useCreateOrderMutation} onSuccess={onSuccess}>
  Сохранить
</MutationSubmit>
```

### raw props type

```ts
export type TMutationSubmitProps<
    TFieldValues extends FieldValues,
    Response extends TResponse<unknown>,
> = TMutationSubmit<TFieldValues, Response> &
    Pick<ComponentProps<typeof Button>, 'children' | 'view' | 'stretching' | 'isLoading'>
```

### demo examples found

<!-- components/mutation/mutationComponents/MutationSubmit/ui/MutationSubmitDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { FlexBox, MutationSubmit, MutationTextField } from '../../../../../../src'

export const MutationSubmitDemo = (args: ComponentProps<typeof MutationSubmit>) => {
    const form = useForm({
        defaultValues: {
            documentNumber: '',
            amountWithVat: '',
        },
    })

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" gap={2}>
                <MutationTextField label="Номер документа" name="documentNumber" options={{ required: true }} />
                <MutationTextField
                    label="Сумма с НДС"
                    name="amountWithVat"
                    options={{
                        required: true,
                    }}
                />
                <MutationSubmit {...args} />
            </FlexBox>
        </FormProvider>
    )
}
```

---

## MutationSwitch

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationSwitch
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationSwitchProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Переключатель (switch), интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationSwitchProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
```

### raw props type

```ts
export type TMutationSwitchProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationTextArea

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationTextArea
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationTextAreaProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Многострочное текстовое поле, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationTextAreaProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationTextAreaProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationTextField

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/components/MutationTextField
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationTextFieldProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Текстовое поле ввода, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationTextFieldProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationTextFieldProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

<!-- components/mutation/mutationComponents/MutationTextField/ui/MutationTextFieldReadOnlyDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { FlexBox, MutationTextField } from '../../../../../../src'

export const MutationTextFieldReadOnlyDemo = ({ name, label, ...rest }: ComponentProps<typeof MutationTextField>) => {
    return (
        <FlexBox flexDirection="column" gap={2}>
            <MutationTextField label={`${label}-1`} name={`${name}-1`} {...rest} />
            <MutationTextField label={`${label}-2`} name={`${name}-2`} {...rest} />
        </FlexBox>
    )
}
```

---

## MutationTreeCheckbox

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationTreeCheckbox
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationTreeCheckboxProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Дерево чекбоксов, интегрированное с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationTreeCheckboxProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
```

### raw props type

```ts
export type TMutationTreeCheckboxProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## MutationUploadSet

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./mutations/components/MutationUploadSet
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: TMutationUploadSetProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Компонент для загрузки файлов, интегрированный с react-hook-form.

@template TFieldValues - Тип полей формы
@param {TMutationUploadSetProps<TFieldValues>} props
@param {TMetaSchemeProperty} [props.meta] - Метаданные из схемы
@param {TFieldControl} [props.fc] - Код управления полем
```

### raw props type

```ts
export type TMutationUploadSetProps<TFieldValues extends FieldValues> = TBase<TFieldValues> & TFieldOptions
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## SmartUploadSet

tier: A · origin: cs-portal · usedByApps: false · fromSpec: ./smarts/SmartUploadSet

propsType: TSmartUploadSetProps (source: cs-portal)

### raw description (RU, from JSDoc)

```
Умный компонент управления вложениями (загрузка, просмотр, переименование, удаление).

Принимает RTK Query хуки для всех операций с файлами.
Поддерживает оптимистичное обновление списка, отмену загрузки,
скачивание одиночных файлов и архива.

@param {TSmartUploadSetProps} props
@param {string} props.entityUuid - UUID сущности-владельца файлов
@param {string} props.entityId - ID сущности
@param {string} [props.filter] - OData фильтр для запроса файлов
@param {UseQuery} props.useGetFilesInfoQuery - Хук получения списка файлов
@param {UseMutation} props.useRenameFileMutation - Хук переименования файла
@param {UseLazyQuery} props.useLazyDownloadFileQuery - Хук скачивания одного файла
 @param {UseLazyQuery} props.useLazyDownloadPreviewFileQuery - Хук скачивания одного файла в формате PDF
@param {UseLazyQuery} props.useLazyDownloadAllFilesQuery - Хук скачивания всех файлов архивом
@param {UseMutation} props.useUploadFileMutation - Хук загрузки файлов
@param {UseMutation} props.useDeleteFileMutation - Хук удаления файла

@example
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

### raw props type

```ts
export type TSmartUploadSetProps = {
    entityUuid: TEntityUuid
    entityId: TEntityId
    filter?: TFilter
    useGetFilesInfoQuery: UseQuery<
        QueryDefinition<TGetFilesInfoApiArg, BaseQueryFn, string, TResponse<TResponseFile[]>>
    >
    useRenameFileMutation: UseMutation<
        MutationDefinition<TRenameFileApiArg, BaseQueryFn, string, TResponse<TResponseFile>>
    >
    useUploadFileMutation: UseMutation<MutationDefinition<TUploadFile, BaseQueryFn, string, TResponse<TResponseFile[]>>>
    useDeleteFileMutation: UseMutation<
        MutationDefinition<TDeleteFileWithExtraArg, BaseQueryFn, string, TResponse<TResponseFile>>
    >
    useLazyDownloadFileQuery: UseLazyQuery<QueryDefinition<TRetrieveContentsApiArg, BaseQueryFn, string, TDownloadFile>>
    useLazyDownloadPreviewFileQuery: UseLazyQuery<
        QueryDefinition<TPreviewContentsApiArg, BaseQueryFn, string, TDownloadFile>
    >
    useLazyDownloadAllFilesQuery: UseLazyQuery<
        QueryDefinition<TGetFilesContentApiArg, BaseQueryFn, string, TDownloadFile>
    >
} & Pick<
    ComponentProps<typeof UploadSet>,
    | 'size'
    | 'title'
    | 'helperItems'
    | 'uploadVisible'
    | 'subtitle'
    | 'reverse'
    | 'downloadAllVisible'
    | 'deleteVisible'
    | 'downloadVisible'
    | 'openVisible'
    | 'renameVisible'
    | 'acceptedFiles'
> & {
        fileUploadExtraArg?: TEndpointExtraArg
        fileDeleteExtraArg?: TEndpointExtraArg
    }
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useController

tier: A · origin: react-hook-form · usedByApps: false · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useFieldArray

tier: A · origin: react-hook-form · usedByApps: false · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useForm

tier: A · origin: react-hook-form · usedByApps: true · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useFormContext

tier: A · origin: react-hook-form · usedByApps: true · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useFormState

tier: A · origin: react-hook-form · usedByApps: false · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useMutationSubmit

tier: A · origin: cs-portal · usedByApps: true · fromSpec: ./mutations/hooks/useMutationSubmit
SHADOW NOTE: cs-portal gives the cs-portal version; also defined in: cs-core

propsType: (signature, no dedicated Props type found) (source: cs-portal)

### raw description (RU, from JSDoc)

```
Хук связки react-hook-form с RTK Mutation.

Обрабатывает отправку: вызывает мутацию, показывает toast,
проставляет серверные ошибки на поля через `setError`.

@template TFieldValues - Тип полей формы
@template Response - Тип ответа мутации

@param {TUseMutationSubmitPros<TFieldValues, Response>} params
@param {UseMutation} params.useMutation - RTK Mutation hook
@param {Function} [params.onSuccess] - Callback при успехе
@param {Function} [params.onError] - Callback при ошибке
@param {string} [params.targetPrefix] - Префикс для маппинга серверных ошибок на поля формы
@param {boolean} [params.removeEmptyValues=true] - Удалять пустые значения перед отправкой

@returns {{ submit, useMutationReturn }}

@example
const { submit } = useMutationSubmit({
  useMutation: useCreateOrderMutation,
  onSuccess: (data) => navigate(`/orders/${data.data?.uuid}`),
})
return <form onSubmit={submit}>...</form>
```

### raw props type

```ts
export declare const useMutationSubmit: <TFieldValues extends FieldValues, Response extends TResponse<unknown>>({
    onError,
    onSuccess,
    removeEmptyValues,
    targetPrefix,
    useMutation,
}: TUseMutationSubmitPros<TFieldValues, Response>) => {
    submit: (e?: React.BaseSyntheticEvent) => Promise<unknown>
    useMutationReturn: readonly [
        (
            arg: TFieldValues
        ) => import('@reduxjs/toolkit/query').MutationActionCreatorResult<
            import('@reduxjs/toolkit/query').MutationDefinition<TFieldValues, any, string, Response, string>
        >,
        (
            | ({
                  requestId?: undefined
                  status: import('@reduxjs/toolkit/query').QueryStatus.uninitialized
                  data?: undefined
                  error?: undefined
                  endpointName?: string
                  startedTimeStamp?: undefined
                  fulfilledTimeStamp?: undefined
              } & {
                  status: import('@reduxjs/toolkit/query').QueryStatus.uninitialized
                  isUninitialized: true
                  isLoading: false
                  isSuccess: false
                  isError: false
              } & {
                  originalArgs?: TFieldValues | undefined
                  reset: () => void
              })
            | ({
                  status: import('@reduxjs/toolkit/query').QueryStatus.fulfilled
              } & Omit<
                  {
                      requestId: string
                      data?: Response | undefined
                      error?: any
                      endpointName: string
                      startedTimeStamp: number
                      fulfilledTimeStamp?: number
                  },
                  'data' | 'fulfilledTimeStamp'
              > &
                  Required<
                      Pick<
                          {
                              requestId: string
                              data?: Response | undefined
                              error?: any
                              endpointName: string
                              startedTimeStamp: number
                              fulfilledTimeStamp?: number
                          },
                          'data' | 'fulfilledTimeStamp'
                      >
                  > & {
                      error: undefined
                  } & {
                      status: import('@reduxjs/toolkit/query').QueryStatus.fulfilled
                      isUninitialized: false
                      isLoading: false
                      isSuccess: true
                      isError: false
                  } & {
                      originalArgs?: TFieldValues | undefined
                      reset: () => void
                  })
            | ({
                  status: import('@reduxjs/toolkit/query').QueryStatus.pending
              } & {
                  requestId: string
                  data?: Response | undefined
                  error?: any
                  endpointName: string
                  startedTimeStamp: number
                  fulfilledTimeStamp?: number
              } & {
                  data?: undefined
              } & {
                  status: import('@reduxjs/toolkit/query').QueryStatus.pending
                  isUninitialized: false
                  isLoading: true
                  isSuccess: false
                  isError: false
              } & {
                  originalArgs?: TFieldValues | undefined
                  reset: () => void
              })
            | ({
                  status: import('@reduxjs/toolkit/query').QueryStatus.rejected
              } & Omit<
                  {
                      requestId: string
                      data?: Response | undefined
                      error?: any
                      endpointName: string
                      startedTimeStamp: number
                      fulfilledTimeStamp?: number
                  },
                  'error'
              > &
                  Required<
                      Pick<
                          {
                              requestId: string
                              data?: Response | undefined
                              error?: any
                              endpointName: string
                              startedTimeStamp: number
                              fulfilledTimeStamp?: number
                          },
                          'error'
                      >
                  > & {
                      status: import('@reduxjs/toolkit/query').QueryStatus.rejected
                      isUninitialized: false
                      isLoading: false
                      isSuccess: false
                      isError: true
                  } & {
                      originalArgs?: TFieldValues | undefined
                      reset: () => void
                  })
        ),
    ]
}
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## useWatch

tier: A · origin: react-hook-form · usedByApps: false · fromSpec: react-hook-form

### raw description (RU, from JSDoc)

```
(none found — check cs-core/cs-portal source manually)
```

### raw props type

```ts
(none found)
```

### demo examples found

(none — write a minimal example by hand from the props)

---
