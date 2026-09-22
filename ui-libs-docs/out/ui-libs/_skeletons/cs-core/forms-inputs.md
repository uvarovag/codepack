<!-- SKELETON for cs-core/forms-inputs.md — raw material only, not the final doc. 8 symbols. -->

## Combobox
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TComboboxProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [Combobox](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-filterselect--docs) - для выбора фильтра с возможностью
поиска и динамической загрузки элементов.

Компонент принимает следующие свойства (вне зависимости от выбранного режима `multiple`):
- `multiple` - флаг множественного выбора;
- `items` (обязательно) - массив объектов доступных для выбора. Каждый элемент состоит из следующих свойств:
     - `label` - метка-подпись к элементу;
     - `value` - значение элемента;
     - `disabled` (опционально) - флаг неактивности элемента;
     - `contentLeft` (опционально) - слот для контента слева;
     - `contentRight` (опционально) - слот для контента справа.
- `value` - массив объектов выбранных значений (при `multiple = 'true'`) или объект выбранного значения (`multiple = 'false'`);
- `onChange` - Колбэк-функция изменения выбранного состояния элемента;
- `onChangeValue` - Колбэк-функция изменения строки поиска;
- `onEndReached` - Колбэк-функция вызываемая при достижении конца списка;
- `isLoadingMore` - Флаг загружаются ли дополнительные элементы;
- `isLoading` - Флаг основной загрузки компонентов (например, API-запросы);
- `virtual` — включить виртуализацию списка (по умолчанию false)
- `virtualCount` - Число видимых элементов в режиме virtual; (по умолчанию 5)
- `isOpen` - Флаг открытого состояния выпадающего списка;
- `onToggle` - Колбэк для переключения состояния открытия;(Не работает если указан alwaysOpened)
- `portal` - Пропс portal принимает id или ref ссылку на контейнер;
- `alwaysOpened` - Выпадающий список открыт всегда;
- `label` - Заголовок;
- `hasRequiredIndicator` - Индикатор обязательности поля;
- `listWidth` - Можно задавать ширину выпадающего списка; (Не работает если не передан portal)
- `listHeight` - Высота выпадающего списка;
- `listMaxHeight` - Максимальная высота выпадающего списка;
- `afterList` - Ячейка для контента в конце выпадающего списка;
- `textHint` - Вспомогательный текст снизу слева для поля ввода;
- `placeholder` - Вспомогательный текст в поле ввода; (только при alwaysOpened=true)
- `view` - Вид отображение;
- `required` - Обязательность поля;
- `readOnly` - Только для чтения;
- `filterValue` - Функция валидации вводимых значений;
- `renderItem`	- Callback для кастомной настройки айтема в выпадающем списке;
- `titleCaption` - Метка-подпись к label справа.

Свойства, доступные при множественном выборе (`multiple = 'true'`):
- `favoriteItems` - массив объектов избранных значений;
- `selectedItems` - массив предварительно выбранных элементов (для контролируемого режима);
- `selectAllOptions` - настройки отображения кнопки массового выбора (кнопка "выбрать все", не доступна в режиме virtual);
- `chip` - объект настройки чипсов, принимает следующие свойства:
     - `mode` (опционально) - режим отображения чипсов ('default' | 'all' | 'collapsed'), по умолчанию режим 'default';
     - `popoverOptions` (опционально) - объект пропсов из Popover (работает только при `mode = 'collapsed'`), может принимать
следующие свойства: `title`, `subTitle` и `portal`;
     - `view` (опционально) - внешний вид чипса (тип берётся от компонент sdds Chip).

@summary компонент для выбора фильтра с возможностью поиска и динамической загрузки элементов
```

### raw props type
```ts
export type TComboboxProps<T extends TComboboxItem = TComboboxItem, M extends boolean = true, O extends boolean = false> = {
    /** Массив объектов для выбора. */
    items: T[];
    /** Колбэк изменения строки поиска. */
    onChangeValue?: (searchValue: string) => void;
    /** Фиксированная высота выпадающего списка. */
    listHeight?: string;
    /** Максимальная высота выпадающего списка. */
    listMaxHeight?: string;
    /** Ширина выпадающего списка (работает только при передаче `portal`). */
    listWidth?: string;
    /** Массив избранных элементов для отображения вверху списка. */
    favoriteItems?: T[];
    /** Массив предварительно выбранных элементов (для контролируемого режима). */
    selectedItems?: T[];
    /** Колбэк при достижении конца списка (для бесконечной подгрузки). */
    onEndReached?: () => void;
    /** Колбэк события скролла внутри выпадающего списка. */
    onScroll?: (e: UIEvent) => void;
    /** Флаг загрузки дополнительных элементов при скролле. */
    isLoadingMore?: boolean;
    /** Флаг общей загрузки компонента (например, при первоначальном запросе). */
    isLoading?: boolean;
    /** Колбэк изменения состояния открытия выпадающего списка. */
    onToggle?: (open: boolean) => void;
    /** Контейнер для рендера выпадающего списка (id или ref). */
    portal?: TPopoverProps['frame'];
    /** Выпадающий список всегда открыт. */
    alwaysOpened?: boolean;
    /** Контент, отображаемый после списка элементов. */
    afterList?: ReactNode;
    /** Вспомогательный текст под полем ввода. */
    textHint?: string;
    /** Флаг обязательности заполнения поля. */
    required?: boolean;
    /** Функция фильтрации элементов при поиске. Возвращает `true`, если элемент должен отображаться. */
    filterValue?: (item: T, searchValue: string) => boolean;
    /** Функция кастомного рендера элемента в выпадающем списке. */
    renderItem?: (item: T) => ReactNode;
    /** Максимальное количество элементов для отображения поля поиска (работует если включено `alwaysOpened`). */
    searchVisibleCount?: number;
    /** Флаг использования тёмной темы для выпадающего списка. */
    onDark?: boolean;
    /** CSS-класс компонента. */
    className?: string;
    /** Задержка debounced (мс). По умолчанию 350. */
    debounceDelay?: number;
    /** Флаг включения debounced функции. */
    enableDebounced?: boolean;
    /** Настройка чипсов */
    chip?: TChip;
    /** Флаг, позволяющий передавать в value полные айтемы. */
    enableObject?: O;
    /** Значение. */
    value?: TValue<T, M, O>;
    /** Флаг множественного выбора. */
    multiple?: M;
    /** Колбэк, вызываемый при изменении выбора. */
    onChange?: M extends true ? THandleChangeExtended<TValue<T, M, O>, T[]> : THandleChangeExtended<TValue<T, M, O>, T>;
    /** Настройки кнопки массового выбора. */
    selectAllOptions?: TSelectAllProps;
    /** Текст тултипа иконки инфо */
    textTooltip?: string;
} & TTextFieldProps & TVirtualOptions;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DataField
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/DataField

propsType: TDataFieldProps (source: cs-core)

### raw description (RU, from JSDoc)
```
DataField — компонент для отображения данных в виде метки и текста.

Примечание: при использовании DataField в компонентах с ограниченной шириной сокращается текст `label` для избежания переноса на новую строку,
и при наведении на него появляется поповер с несокращённым текстом.
`value` в свою очередь переносится на новую строку, если не является реактнодой.

Свойства:
- label - Метка-подпись к элементу.
- value - значение для отображения.

@summary для отображения данных в виде метки и текста
```

### raw props type
```ts
export type TDataFieldProps = {
    /** Метка-подпись к элементу. */
    label: string;
    /** Значение для отображения. */
    value: string | number | ReactNode;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## FileUploader
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/FileUploader

propsType: TFileUploaderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Обслуживает загрузку файлов пользователем, по клику на элемент или перетаскиванием файлов на
поле его отображения.
Компонент допускает загрузку одинаковых файлов друг за другом, но не обновляет старую версию загруженного файла.
А создает второй файл, дальнейшая обработка результатов загрузки - на стороне разработчика.
- onFileUpload - обработчик загрузки файла
- acceptedFiles - разрешенные типы файлов
- tabIndex - индекс фокуса в форме
- isMultiple - разрешить загрузку нескольких файлов
- isRequired - является ли поле обязательным
- view - вид компонента (иконка или поле для перетаскивания файлов)
```

### raw props type
```ts
export type TFileUploaderProps = {
    /**
     * Колбек при добавлении файла
     */
    onFileUpload: (files: FileList) => void;
    /**
     * Доступные типы файлов
     */
    acceptedFiles?: string[];
    /**
     * Индекс в переходе фокуса
     */
    tabIndex?: number;
    /**
     * Возможность выбрать несколько файлов
     */
    isMultiple?: boolean;
    /**
     * Обязательное поле
     */
    isRequired?: boolean;
    isError?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    className?: string;
    hasRequiredIndicator?: boolean;
    view?: 'default' | 'icon';
};
```

### demo examples found
<!-- components/FileUploader/components/FileUploaderDemo.tsx -->
```tsx
import type { ComponentProps, SetStateAction } from 'react'

import { TextArea } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FileUploader, FlexBox } from '../../../../src'

export const FileUploaderDemo = (args: ComponentProps<typeof FileUploader>) => {
    const [fileNames, setFileNames] = useState<SetStateAction<string[]>>([])
    const [fileArr, setFileArr] = useState<File[]>([])

    const onFileUploadHandler = (files: FileList) => {
        setFileNames((list: string[]) => [...list, ...Array.from(files).map((item) => item.name)])
        setFileArr([...fileArr, ...Array.from(files).map((item) => item)])
    }

    return (
        <FlexBox flexDirection="column" gap={2}>
            <FileUploader {...args} onFileUpload={onFileUploadHandler} />
            <TextArea
                disabled
                readOnly
                label={`Uploaded file's (${fileArr.length}):`}
                labelAriaHidden={false}
                value={typeof fileNames === 'function' ? '' : fileNames.join('\r\n')}
            />
        </FlexBox>
    )
}
```
<!-- components/FileUploader/components/FileUploaderGroupDemo.tsx -->
```tsx
import type { TFileUploaderProps } from '../../../../src/components/FileUploader/types'

import { FileUploader, FlexBox } from '../../../../src'

export const FileUploaderGroupDemo = (args: TFileUploaderProps) => (
    <FlexBox flexDirection="column" gap={1} width="100vw">
        <FlexBox width="55vw">
            <FileUploader {...args} />
        </FlexBox>
        <FlexBox width="300px">
            <FileUploader {...args} />
        </FlexBox>
        <FlexBox width="700px">
            <FileUploader {...args} />
        </FlexBox>
        <FlexBox width="500px">
            <FileUploader {...args} />
        </FlexBox>
    </FlexBox>
)
```

---

## getIsRequired
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const getIsRequired: <TFieldValues extends FieldValues>(optionsRequired: RegisterOptions<TFieldValues, Path<TFieldValues>> | undefined) => boolean;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## MutationCheckbox
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/mutation

propsType: TMutationCheckboxProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[MutationCheckbox](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-mutation-mutationcomponents-mutationcheckbox--docs) относится к группе mutation-form элементов. Он адаптирует возможности
 компонента [Checkbox](https://plasma.sberdevices.ru/sdds-cs/components/checkbox/)
 библиотеки [sdds-cs](https://plasma.sberdevices.ru/sdds-cs/) для использования в формах
```

### raw props type
```ts
export type TMutationCheckboxProps<TFieldValues extends FieldValues> = TMutationCommonProps<TFieldValues, boolean, HTMLInputElement> & TPropsFromCheckbox & TProps;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## UploadList
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/upload/UploadList

propsType: TUploadListProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[__UploadList__](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-uploadlist--docs)

Компонент для отображения списка загруженных файлов с возможностью управления. Каждый элемент списка показывает информацию о файле и доступные действия.

__Пропсы__

__Основные свойства__

| Пропс    | Тип                | По умолчанию | Описание |
|----------|--------------------|--------------|----------|
| `size`   | `'s' \| 'm'`       | `'m'`        | Размер элементов списка |
| `items`  | `TUploadListItem[]`| -            | Массив элементов для отображения |

__Видимость действий (глобальные настройки)
Управляют отображением действий для всех элементов:__

| Пропс             | Тип       | По умолчанию | Описание |
|-------------------|-----------|--------------|----------------------------|
| `deleteVisible`   | `boolean` | `true`       | Показывать кнопку удаления |
| `downloadVisible` | `boolean` | `true`       | Показывать кнопку скачивания |
| `openVisible`     | `boolean` | `true`       | Показывать ссылку для просмотра |
| `renameVisible`   | `boolean` | `true`       | Показывать кнопку переименования |
| `saveVisible`     | `boolean` | `true`       | Показывать кнопку сохранить |
| `abortVisible`    | `boolean` | `true`       | Показывать кнопку отменить |
| `showHover`       | `boolean` | `true`       | Эффекты при наведении |
| `extensionVisible`| `boolean` | `false`      | Отображать расширение файла |
| `isLoading`       | `boolean` | `false`      | Отображать компонента в режиме загрузки |
| `skeletonCount`   | `number`  | 2            | Отображать количества файлов в режиме загрузки |
| `isLoadingActions`| `boolean` | `false`      | Флаг выключения кнопок при загрузке какого-то действия |

__Обработчики событий__

| Обработчик    | Описание |
|---------------|----------|
| `onDelete`    | При удалении элемента |
| `onAbort`     | При отмене операции |
| `onOpen`      | При открытии элемента |
| `onDownload`  | При скачивании элемента |
| `onRename`    | При переименовании элемента |
| `onSave`      | При сохранении изменений |

__Особенности работы__
- Объединяет глобальные настройки видимости с настройками отдельных элементов
- Действия показываются только если оба флага (глобальный и элемента) не `false`
- Поддерживает два размера отображения (`'s'` и `'m'`)
- Элементы могут быть в состояниях: загрузка, ошибка, режим редактирования
- В режиме редактирования показывает поле для ввода нового имени

__Цветовая схема__
<br>
Зависит от типа расширения файла, параметры компонента отличаются от реальных
<br>
<br>
<span>Редактируемые файлы</span>
<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">DOCX</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">DOC</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">TXT</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">RTF</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">CSV</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">XLSX</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">ODT</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">XML</span>
 <span style="background-color:#DEE9FF; color: #1549AB; padding: 2px 8px; border-radius: 6px;">XLS</span>
</div>
<span>Нередактируемые файлы</span>
<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">PDF</span>
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">PPS</span>
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">PPT</span>
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">CHM</span>
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">XPS</span>
 <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">SIG</span>
  <span style="background-color:#FCE9C2; color: #694907; padding: 2px 8px; border-radius: 6px;">PPTX</span>
</div>
<span>Изображения</span>
<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">JPG</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">PNG</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">GIF</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">BMP</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">PCX</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">TIF</span>
 <span style="background-color:#CCF1FA; color: #04566C; padding: 2px 8px; border-radius: 6px;">SVG</span>
</div>
<span>Мультимедиа</span>
<div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px;">
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">AVI</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">MP4</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">MKV</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">MOV</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">FLV</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">WMV</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">MPEG</span>
</div>
<span>Аудио</span>
<div style="display: flex; gap: 8px; align-items: center;">
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">MP3</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">WMA</span>
 <span style="background-color:#FDE3F8; color: #8A2178; padding: 2px 8px; border-radius: 6px;">WAV</span>
</div>
```

### raw props type
```ts
export type TUploadListProps = {
    size?: 's' | 'm';
    items: TUploadListItem[];
    itIsInChat?: boolean;
    isLoadingActions?: boolean;
    view?: TUploadListView;
} & TUploadListItemEvents & TUploadListItemEventsButtonVisible & TSkeletonType;
```

### demo examples found
<!-- components/UploadList/ui/UploadListWithPopoverDemo.tsx -->
```tsx
import type { TUploadListProps } from '../../../../src'

import { BodyM, Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FlexBox, Popover, UploadList } from '../../../../src'

export const UploadListWithPopoverDemo = (args: TUploadListProps) => {
    const [open, setOpen] = useState(true)

    return (
        <Popover
            clearButton={{
                text: 'Сбросить',
                onClick: () => {},
            }}
            content={[
                <BodyM key="1">Любая ReactNode</BodyM>,
                <FlexBox key="2" flexDirection="column" gap={1}>
                    <BodyM>Или массив</BodyM>
                    <BodyM>из ReactNode</BodyM>
                </FlexBox>,
                <UploadList key="3" {...args} />,
            ]}
            opened={open}
            primaryButton={{
                text: 'Подтвердить',
                onClick: () => {},
            }}
            target={<Button>Открыть пример</Button>}
            title="Заголовок"
            onToggle={setOpen}
        />
    )
}
```

---

## UploadSet
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/upload/UploadSet

propsType: TUploadSetProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[UploadSet](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-uploadset--docs) - компонент,
позволяющий выбирать файлы с локального компьютера и загружать их на сервер напрямую из веб-браузера.

**Использование:**

Элементы компонента должны располагаться на белой подложке. Проектировщик сам определяет направление загрузки в зависимости от задачи.
Допускается прямой и обратный порядок. Прямой — порядок когда подгружаемые файлы выстраиваются над областью загрузки, постепенно сдвигая её вниз,
где самый новый это самый нижний файл. Обратный — порядок когда подгружаемые файлы выстраиваются под областью загрузки, где самый новый это
самый верхний. Позиция области загрузки остаётся неизменная.

**Внимание:** рекомендуется использовать мутейшн компонент UploadSet -
[MutationUploadSet](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-mutation-mutationcomponents-mutationuploadset--docs), в
котором уже реализована логика загрузки файлов и работа с формой.

Компонент принимает в себя следующие собственные свойства:
- subtitle - подзаголовок блока загрузки;
- textHint - вспомогательный текст;
- isTextHintError - состояние ошибки для отображения вспомогательного текста;
- items -массив объектов типа `TUploadListItem`;
- size (опционально) - размер `s` | `m`;
- title (опционально) - основной заголовок блока загрузки;
- helperItems (опционально) - массив строк для описания требований к вложениям;
- reverse (опционально) - флаг обратного порядка файлов (самый свежий файл сверху);
- uploadVisible (опционально) - флаг видимости зоны загрузки файлов;
- isDownloadingAll (опционально) - флаг показывающий процесс одновременной загрузки всех файлов;
- downloadAllVisible (опционально) - флаг отображения кнопки для одновременной загрузки всех файлов;
- onDownloadAll (опционально) - метод, вызываемый при попытке одновременно скачать все файлы;
- onFocus (опционально) - колбэк, вызываемый при фокусировке на зоне загрузки файлов;
- onBlur (опционально) - колбэк, вызываемый при потере фокуса с зоны загрузки файлов;

Компонент также принимает все свойства, которые относятся к FileUploader и часть свойств UploadList.
```

### raw props type
```ts
export type TUploadSetProps = {
    /**
     * Основной заголовок блока загрузки
     */
    title?: string;
    /**
     * Подзаголовок блока загрузки
     */
    subtitle?: string;
    /**
     * Вспомогательный текст
     */
    textHint?: string;
    /**
     * Состояние ошибки для отображения вспомогательного текста
     */
    isTextHintError?: boolean;
    /**
     * Обратный порядок файлов (самый свежий файл сверху)
     */
    reverse?: boolean;
    /**
     * Массив строк для описания требований к вложениям

     */
    helperItems?: ReactNode[];
    /**
     * Видимость зоны загрузки файлов
     */
    uploadVisible?: boolean;
    /**
     * Флаг, показывающий процесс одновременной загрузки всех файлов
     */
    isDownloadingAll?: boolean;
    /**
     * Отображать кнопку для одновременной загрузки всех файлов
     */
    downloadAllVisible?: boolean;
    /**
     * Метод, вызываемый при попытке одновременно скачать все файлы
     */
    onDownloadAll?: () => void;
    /**
     * Метод, вызываемый при фокусе зоны загрузки файлов
     */
    onFocus?: (e?: React.FocusEvent<HTMLElement, Element>) => void;
    /**
     * Метод, вызываемый при потере фокуса с зоны загрузки файлов
     */
    onBlur?: (e?: React.FocusEvent<HTMLElement, Element>) => void;
} & TFileUploaderProps & Omit<TUploadListProps, 'view'> & {
    listView?: TUploadListProps['view'];
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useMutationMessages
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useMutationMessages

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const useMutationMessages: () => {
    showToasts: (response: unknown) => void;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---
