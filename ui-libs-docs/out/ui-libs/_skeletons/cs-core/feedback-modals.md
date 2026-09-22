<!-- SKELETON for cs-core/feedback-modals.md — raw material only, not the final doc. 20 symbols. -->

## Modal
tier: A · origin: cs-core · usedByApps: true · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TModalProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Modal - компонент для создания модального диалогового окна.
Принимает следующие свойства:
- opened - отвечает за отображение модального окна;
- onClose - обработчик клика по кнопке "закрыть";
- title (опционально) - заголовок окна (располагается в 1-2 строки, кнопка закрытия уже есть в компоненте), принимает строку;
- content - основная текстовая и графическая информация, можно передать Fragment <></> с наполнением,
если нужно разместить таблицу внутри контентной области, оберните ее во flex-контейнер с заданной высотой;
- footer (опционально) - нижняя область, в которой располагаются кнопки действий, ожидает Fragment <></> с кнопками;
- size (опционально) - может принимать значения 's' (ширина - 616px) - default | 'm' (912px) | 'l' (1208px) | 'fs' (fullscreen),
высота ограничена окном браузера и зависит от контента внутри;
- portal (опционально) - в каком контейнере позиционируется(по умолчанию document), можно также указать id элемента или ref для него.

Перед использованием убедитесь, что PopupProvider подключен.

@summary для создания модальных диалоговых окон
```

### raw props type
```ts
export type TModalProps = {
    /** Заголовок окна (располагается в 1-2 строки, кнопка закрытия уже есть в компоненте) */
    title?: string;
    /** Основная текстовая и графическая информация, можно передать Fragment <></> с наполнением, если нужно разместить таблицу внутри контентной области, оберните её во flex-контейнер с заданной высотой */
    content: ReactNode;
    /** Нижняя область, в которой располагаются кнопки действий, ожидает Fragment <></> с кнопками */
    footer?: ReactNode;
    /** Может принимать значения 's' (ширина - 616px) - default | 'm' (912px) | 'l' (1208px) | 'fs' (fullscreen), высота ограничена окном браузера и зависит от контента внутри */
    size?: 's' | 'm' | 'l' | 'fs';
    /** @deprecated Используйте свойство portal */
    frame?: ModalProps['frame'];
    /** В каком контейнере позиционируется (по умолчанию document), можно также указать id элемента или ref для него */
    portal?: ModalProps['frame'];
    /** Название класса */
    className?: string;
    /** Идентификатор */
    id?: string;
} & Required<Pick<ModalProps, 'opened' | 'onClose'>>;
```

### demo examples found
<!-- components/Modal/Modal/ui/ModalDemo.tsx -->
```tsx
import type { ComponentProps, RefCallback } from 'react'

import { IconTrashOutline } from '@salutejs/plasma-icons'
import { Button } from '@salutejs/sdds-cs'
import { useCallback, useRef, useState } from 'react'

import { Content } from './Content'
import { FlexBox, Modal, showToast, useConfirm } from '../../../../../src'

export const ModalDemo = (props: ComponentProps<typeof Modal>) => {
    const [isOpen, setIsOpen] = useState(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const refCallback: RefCallback<HTMLDivElement> = useCallback((node) => {
        if (node) {
            modalRef.current = node

            console.info('clientHeight of the Modal ->', modalRef.current.clientHeight)
        } else {
            modalRef.current = null
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    const confirm = useConfirm()

    const confirmArgs = {
        Icon: IconTrashOutline,
        title: 'Удаление архива',
        message: 'После очистки весь реестр станет пустым',
        cancelText: 'Отменить',
        confirmText: 'Удалить',
    }

    return (
        <>
            <Button size="s" text="open modal" view="accent" onClick={() => setIsOpen(!isOpen)} />
            <Modal
                ref={refCallback}
                content={
                    <FlexBox flexDirection="column">
                        <Button
                            view="clear"
                            onClick={async () => {
                                const answer = await confirm(confirmArgs)
                                showToast({ text: answer ? 'Архив удалён' : 'Отмена удаления' })
                            }}
                        >
                            Вызвать confirm
                        </Button>{' '}
                        <Content />
                    </FlexBox>
                }
                footer={
                    <>
                        <Button size="s" view="clear" onClic
```
<!-- components/Modal/Modal/ui/ModalFlexDemo.tsx -->
```tsx
import type { ComponentProps, RefCallback } from 'react'

import { Button } from '@salutejs/sdds-cs'
import { useCallback, useRef, useState } from 'react'

import { FormElementGrid, FormGrid, FormGroupGrid, Modal } from '../../../../../src'
import { contentData } from '../../../../layout/Form/lib/mocks'

export const ModalFlexDemo = (props: ComponentProps<typeof Modal>) => {
    const [isOpen, setIsOpen] = useState(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const refCallback: RefCallback<HTMLDivElement> = useCallback((node) => {
        if (node) {
            modalRef.current = node

            console.info('clientHeight of the Modal ->', modalRef.current.clientHeight)
        } else {
            modalRef.current = null
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Button size="s" text="open modal" view="accent" onClick={() => setIsOpen(!isOpen)} />
            <Modal
                ref={refCallback}
                content={
                    <FormGrid>
                        <FormGroupGrid label="Заголовок группы">
                            <FormElementGrid>{contentData[0].contentEdit}</FormElementGrid>
                            <FormElementGrid>{contentData[1].contentEdit}</FormElementGrid>
                            <FormElementGrid>{contentData[2].contentEdit}</FormElementGrid>
                        </FormGroupGrid>
                        <FormGroupGrid label="Заголовок группы">
                            <FormElementGrid>{contentData[3].contentEdit}</FormElementGrid>
                        </FormGroupGrid>
                        <FormGroupGrid label="Заголовок группы">
                            <FormElementGrid>{contentData[4].contentEdit}</FormElementGrid>
                            <FormElementGrid>{contentData[5].contentEdit}</FormElementGrid>
                        </FormGroupGrid>
                        <FormGroupGrid label="Заголов
```

---

## Overlay
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TOverlayProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TOverlayProps = {
    /** Отображение Overlay */
    opened: boolean;
    /** Коллбек при закрытии */
    onClose: () => void;
    /** Основной контент */
    content: ReactNode;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Popover
tier: A · origin: cs-core · usedByApps: true · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TPopoverProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Popover](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-statustrack-popover--docs) - предназначен для
совершения действий в дополнительных сценариях. Компонент появляется после нажатия на кликабельный объект в интерфейсе.
При появлении компонент находится в близости от вызывающего его элемента и своим хвостиком указывает на него. Чтобы закрыть компонент,
нужно нажать на иконку закрытия или на кнопку действий.

Окно быстрых действий компактное и не перегружает экран лишними элементами. Это  минимизирует отвлечение пользователя от основного сценария
на странице. Используйте компонент для отображения информации дополняющей объект, например, для вывода статусной модели или уникальных настроек.

Компонент принимает следующие параметры:
- title — заголовок окна быстрых действий;
- subTitle (опционально) — вспомогательный заголовок окна быстрых действий;
- content — контент окна быстрых действий, принимающий ReactNode или массив из React-элементов;
- contentGap (опционально) - расстояние между серыми областями контента (работает при передачи массива React-элементов);
- onToggle — функция, которая вызывается при закрытии окна быстрых действий;
- primaryButton (опционально) — основная кнопка действия;
- clearButton  (опционально) — второстепенная кнопка действия;
- closeButtonVisible (опционально) — управление видимостью кнопки закрытия поповера.

buttonPrimary и buttonClear являются объектами и принимают два одинаковых и обязательных свойства: `text`, `onClick` и `isLoading`.

Также компонент принимает следующие свойства, которые принимает [Popover из sdds](https://plasma.sberdevices.ru/sdds-cs/components/popover/):
`portal`, `zIndex`, `target`, `placement`, `opened`, `flip`, `shift`.

**Обратите внимание**, что нужно обязательно прокинуть свойства `target` и `opened` и использовать useState на своей стороне,
для определения `opened`.
```

### raw props type
```ts
export type TPopoverProps = {
    content: ReactNode | ReactNode[] | TExtendedContent[];
    contentGap?: 0.5 | 1 | 2;
    onToggle: THandleChange<boolean>;
    /**@deprecated Свойство frame больше не работает в sdds. Используйте свойство portal */
    frame?: TSDDSPortal;
    /**@deprecated Свойство usePortal больше не работает в sdds. Используйте свойство portal */
    usePortal?: boolean;
    closeButtonVisible?: boolean;
} & TTitlesPopover & TPropsFromPopoverSDDS & TPopoverButtons;
```

### demo examples found
<!-- components/Popover/ui/PopoverDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { useState } from 'react'

import { Popover } from '../../../../src'

export const PopoverDemo = (args: ComponentProps<typeof Popover>) => {
    const [opened, setOpened] = useState(args.opened)

    return <Popover {...args} opened={opened} onToggle={setOpened} />
}
```

---

## showToast
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
@deprecated Use `globalShowToasts` from `cs-core` instead.
This function will be removed in the next major version.
```

### raw props type
```ts
export declare const showToast: ({ text, view }: TShowToastProps) => void;
```

### demo examples found
<!-- notifications/showToast/ui/ShowToastDemo.tsx -->
```tsx
import type { TShowToastProps } from '../../../../src/hooks/notifications/showToast/types'

import { Button } from '@salutejs/sdds-cs'

import { CSProvider, FlexBox, showToast } from '../../../../src'

export const ShowToastDemo = ({ text, view }: TShowToastProps) => {
    return (
        <CSProvider>
            <FlexBox flexDirection="column" gap={1} height="40vh">
                <Button text="Вызвать тост" onClick={() => showToast({ text, view })} />
            </FlexBox>
        </CSProvider>
    )
}
```

---

## BulkActions
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/bulkActions

propsType: TBulkActionsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
@deprecated используйте компонент GlobalBulkActions

[BulkActions](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-bulkactions-bulkactions--docs)-
панель размещения действий для автоматизации повторяющихся задач.

**Назначение:**

Используйте компонент для выполнения одного и того же действия над множеством объектов. Компонент появляется сразу после выбора одного
из доступных элементов множественного выбора. Панель массовых действий появляется в середине нижней части блока, чтобы это реализовать, необходимо
установить `position: relative` блоку, где будет располагаться компонент. Также необходимо убедится, что этот блок имеет конкретную ширину.
Допускается использование `width: 100%` у блока, если родитель блока имеет конкретную ширину.

В компоненте отображаются не более двух приоритетных действий, остальные сворачиваются в выпадающий блок над иконкой «три точки».

- первая кнопка в последовательности всегда будет основной, остальные - опциональные
- вывод скрытых кнопок осуществляется по клику на элементе `kebabMenu`, они размещаются в элементе sdds **`Dropdown`**

**Параметры:**
 - items - передаваемый массив действий;
 - selectedCountItems - количество выбранных элементов, с которыми можно совершить доступные действия;
 - visibleCount (опционально) - количество видимых элементов вне списка Dropdown. Доступно 1 или 2;
 - position (опционально) - положение блока, в котором будет располагаться компонент. По умолчанию установлен `sticky`;
 - zIndex (опционально) - z-index блока, в котором будет располагаться компонент. По умолчанию установлен `1000`;
 - portal (опционально) - поле portal принимает id или ref ссылку на контейнер относительно z-index, которого будет раскрываться список с
 дополнительными кнопками. В данном случае portal по умолчанию установлен на body страницы.

Массив объектов items состоит из следующих свойств:
- label - наименование действия;
- value - идентификатор действия;
- onClick - колбэк, вызывающийся при нажатии на элемент. Возвращает value кликнутого действия;
- visible (опционально) - флаг, определяющий, что действие будет, или не будет отображено в компоненте;
- isMain (опционально) - флаг, определяющий, что действие всегда будет основным и не будет скрываться в список DropDown;
- isLoading (опционально) - флаг, определяющий, что кнопка находится в состоянии загрузки.

Обратите внимание, что если у выбранных элементов нет общий действий, то будет выводиться информация "Нет доступных действий".
```

### raw props type
```ts
export type TBulkActionsProps = {
    items: TActionItem[];
    selectedCountItems: number;
    visibleCount?: 1 | 2;
    onClearSelected: () => void;
    portal?: string | RefObject<HTMLElement>;
    position?: CSSProperties['position'];
    zIndex?: CSSProperties['zIndex'];
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ClearButton
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/ClearButton

propsType: TClearButtonProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[ClearButton](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-clearbutton--docs)- кастомизированная кнопка на основе
[Button](https://plasma.sberdevices.ru/sdds-cs/components/button/) из SDDS.

Особенности:
- Автоматические размеры
- Прозрачный фон
- Зеленый текст при взаимодействии

Компонент принимает следующие свойства:
- все свойства кнопки из sdds кроме свойства `view`;
- width (опционально) - ширина кнопки (по умолчанию fit-content);
- height (опционально) - высота кнопки (по умолчанию fit-content);
- hasIndicator (опционально) - красный индикатор в правом верхнем углу;
- eventsNone (опционально) - флаг выключения кликов по кнопки (меняется также курсор на обычный);
- count (опционально) - отображение счётчика, работает только при использовании иконок.

@summary кастомизированная кнопка на основе Button из SDDS
```

### raw props type
```ts
export type TClearButtonProps = TButtonProps & {
    /** Ширина кнопки. По умолчанию fit-content. */
    width?: CSSProperties['width'];
    /** Высота кнопки. По умолчанию fit-content. */
    height?: CSSProperties['height'];
    /** Красный индикатор в правом верхнем углу. */
    hasIndicator?: boolean;
    /** Флаг выключения кликов по кнопке (меняется также курсор на обычный). */
    eventsNone?: boolean;
    /** Флаг отображения лоадера. */
    isLoading?: boolean;
    /** Текст лоадера. */
    loaderText?: string;
    /** Отображение счётчика, работает только при использовании иконок. */
    count?: number;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ConfirmModal
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Confirm

propsType: TConfirmModalProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TConfirmModalProps = {
    /** Флаг открытия модального окна. */
    opened: boolean;
    /** Обработчик подтверждения действия. */
    onConfirm: () => void;
    /** Обработчик закрытия модального окна. */
    onClose: () => void;
} & TConfirmParams;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ConfirmProvider
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Confirm

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const ConfirmProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## EntitySearch
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/EntitySearch

propsType: TEntitySearchProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TEntitySearchProps<RowData extends TRowData, CustomQueryArg extends TCustomQueryArg, CustomInitialPageParam extends TCustomQueryArg> = {
    /** Экземпляр таблицы для отображения и поиска */
    table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>;
    /** Описание таблицы, отображаемое над ней */
    tableDescription?: string;
    /** Кастомный компонент фильтрации. Если не передан, по умолчанию будет использованы headerFilterRender из колонок.*/
    filterRender?: FC<{
        table: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>;
    }>;
};
```

### demo examples found
<!-- components/EntitySearch/ui/EntitySearchCustomFilterDemo.tsx -->
```tsx
import { BodyM } from '@salutejs/sdds-cs'

import { dataDemo, tableColumnsDemo } from './constants'
import { EntitySearch, FlexBox, useTable } from '../../../../src'
import { MDeliveryRegistry } from '../../../table/lib/types'

const FilterRender = () => (
    <FlexBox flexBasis="304px" flexDirection="column" flexShrink={0} justifyContent="space-between">
        <BodyM>Какие то фильтры со своей логикой</BodyM>
    </FlexBox>
)

export const EntitySearchCustomFilterDemo = () => {
    const table = useTable({
        data: dataDemo,
        columns: tableColumnsDemo,
        meta: MDeliveryRegistry,
        enableGlobalFilter: true,
    })

    return (
        <EntitySearch
            filterRender={FilterRender}
            table={table}
            tableDescription={`${table.getRowCount()} объектов обслуживания`}
        />
    )
}
```
<!-- components/EntitySearch/ui/EntitySearchDemo.tsx -->
```tsx
import { dataDemo, tableColumnsDemo } from './constants'
import { EntitySearch, useTable } from '../../../../src'
import { MDeliveryRegistry } from '../../../table/lib/types'

export const EntitySearchDemo = () => {
    const table = useTable({
        data: dataDemo,
        columns: tableColumnsDemo,
        meta: MDeliveryRegistry,
        enableGlobalFilter: true,
    })

    return <EntitySearch table={table} tableDescription={`${table.getRowCount()} объектов обслуживания`} />
}
```

---

## GlobalAction
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/GlobalAction

propsType: TGlobalActionProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[GlobalAction](https://cs-core.cloud.delta.sbrf.ru/dev4/?path=/docs/components-globalaction--docs) -
панель размещения интерактивных элементов (кнопок) для бизнес-взаимодействия с интерфейсом
-
- последовательность кнопок по умолчанию строится слева направо, но порядок вывода в интерфейсе может быть переопределен через свойство `flexDirection`
- если кнопка одна - она растягивается на всю ширину панели
- вывод скрытых кнопок осуществляется по клику на элементе `kebabMenu`, они размещаются в элементе **sdds** `Dropdown`

Параметры:
 - items - передаваемый массив действий;
 - portal (опционально) - поле portal принимает id или ref ссылку на контейнер относительно z-index, которого будет раскрываться список с
 дополнительными кнопками. В данном случае portal по умолчанию установлен на body страницы.
 - stretching (опционально) - ширина кнопки. Может принимать три значения: fixed - кнопка фиксированной ширины; filled - кнопка занимает всю доступную ширину auto - кнопка растягивается в зависимости от контента
 - flexDirection (опционально) - направление размещения кнопок
 - width (опционально)- ширина панели
 - height(опционально)- высота панели
 - dropdownPlacement (опционально)- приоритет расположения раскрывающегося списка кнопок (top, bottom, right, left, auto)
 - isLoading (опционально) - флаг отображения загрузки в виде скелетона

Массив объектов items состоит из следующих свойств:
- label - наименование действия;
- value - идентификатор действия;
- onClick - колбэк, вызывающийся при нажатии на элемент. Возвращает value кликнутого действия;
- visible (опционально) - флаг, определяющий, что действие будет, или не будет отображено в компоненте;
- isMain (опционально) - флаг, определяющий, что действие всегда будет основным и не будет скрываться в список DropDown;
- isSecondary (опционально) - флаг, определяющий, что действие будет дополнительным и не будет скрываться в список DropDown;
- isLoading (опционально) - флаг, определяющий, что кнопка находится в состоянии загрузки.

**Внимание:** можно передать `только одному` элементу `isMain` и `одному` элементу `isSecondary`, во всех остальных случаях
переданные свойства будут игнорироваться и скрываться в список DropDown.
```

### raw props type
```ts
export type TGlobalActionProps = TPrettify<{
    items: TActionItemExtended[];
    stretching?: ComponentProps<typeof Button>['stretching'];
    dropdownPlacement?: TDropdownProps['placement'];
    isLoading?: boolean;
} & TFlexBoxPickerProps & TPropsFromDropdown>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## GlobalBulkActions
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/bulkActions

propsType: TGlobalBulkActionsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[GlobalBulkActions](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-bulkactions-globalbulkactions--docs)-компонент глобальных бизнес-действий.
Компонент должен инициализироваться один раз в проекте, меняется только набор свойств. Для использования различных наборов свойство используйте
состояние или контекст. Пример использования есть ниже в документации.

Компонент принимает следующие свойства:
- buttonItems (опционально) - массив текстовых кнопок, имеющий тот же тип, что items в компонентах BulkActions и GlobalActions;
     - если указать пустой массив, то появится надпись "Нет доступных действий" вместо кнопок;
- iconItems (опционально) - массив кнопок-иконок;
- additionalText (опционально) - вспомогательный текст или текстовая ссылка (если additionalText будет не string, а объектом, то текст будет кликабельный и зелёным);
- visibleCount (опционально) - количество видимых кнопок, которые не скрыты в dropDown;
- portal (опционально, свойство sdds) - в каком контейнере позиционируется (по умолчанию document), можно также указать id элемента или ref для него;
- isNotAnimationScroll (опционально) - флаг отключения анимации "свёртывания" при скролле страницы;
- scrollRef (опционально) - ref на элемент, скролл которого нужно отслеживать. Если не передан, отслеживается window.
```

### raw props type
```ts
export type TGlobalBulkActionsProps = {
    buttonItems?: TActionItem[];
    messageItems?: TShowToastProps[];
    iconItems?: TIconButton[];
    additionalText?: Omit<TInternalButton, 'isLoading'> | string;
    visibleCount?: TNumber;
    isNotAnimationScroll?: boolean;
    animationContainerRef?: RefObject<HTMLElement | null>;
    scrollRef?: RefObject<HTMLElement | null>;
    portal?: TSDDSPortal;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    /** @deprecated Используйте свойство portal. */
    frame?: TFromSDDSPopoverProps['frame'];
};
```

### demo examples found
<!-- components/bulkActions/GlobalBulkActions/ui/GlobalBulkActionsDemo.tsx -->
```tsx
import type { TGlobalActions } from '../../../../../src'

import { IconEditOutline } from '@salutejs/plasma-icons'
import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { Paper, Modal, FlexBox, useGlobalBulkActions } from '../../../../../src'

export const GlobalBulkActionsDemo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const pageActions: TGlobalActions = {
        buttonItems: [
            {
                label: 'Отказать',
                value: 'deny',
                onClick: console.info,
            },
            {
                label: 'Отправить в банк',
                value: 'send',
                onClick: console.info,
                isMain: true,
            },
        ],
        iconItems: [
            {
                icon: IconEditOutline,
                onClick: () => setIsEdit(true),
            },
        ],
    }

    const editActions: TGlobalActions = {
        buttonItems: [
            {
                label: 'Отменить',
                value: 'cancel',
                onClick: () => setIsEdit(false),
            },
            {
                label: 'Сохранить',
                value: 'save',
                onClick: console.info,
                isMain: true,
            },
        ],
    }

    const globalActions = isEdit ? editActions : pageActions
    const { showToasts } = useGlobalBulkActions({ globalActions })

    return (
        <Paper height="50vh" justifyContent="center" width="100%">
            <Button text="Вызвать тост" onClick={() => showToasts([{ text: 'Вызвать тост', view: 'positive' }])} />
            <Button size="s" text="open modal" view="accent" onClick={() => setIsOpen(true)} />
            <Modal
                content={
                    <FlexBox flexDirection="column" gap={2} height="300px" justifyContent="space-between">
                        Просто модалка
                        <Button
         
```
<!-- components/bulkActions/GlobalBulkActions/ui/GlobalBulkActionsWithScrollRefDemo.tsx -->
```tsx
import { IconEditOutline } from '@salutejs/plasma-icons'
import { Button, H4, H5 } from '@salutejs/sdds-cs'
import { useRef, useState } from 'react'

import { SplitContainer, Paper, Page, useGlobalBulkActions, FlexBox } from '../../../../../src'

type TMode = 'master' | 'detail' | 'window'

const pageActions = {
    buttonItems: [
        {
            label: 'Отказать',
            value: 'deny',
            onClick: () => console.info('deny'),
        },
        {
            label: 'Отправить в банк',
            value: 'send',
            onClick: () => console.info('send'),
            isMain: true,
        },
    ],
    iconItems: [
        {
            icon: IconEditOutline,
            onClick: () => console.info('edit'),
        },
    ],
}

export const GlobalBulkActionsWithScrollRef = () => {
    const masterRef = useRef<HTMLDivElement>(null)
    const detailRef = useRef<HTMLDivElement>(null)
    const { setGlobalParam } = useGlobalBulkActions()
    const [mode, setMode] = useState<TMode>('window')

    const handleMasterScroll = () => {
        setGlobalParam({ ...pageActions, scrollRef: masterRef })
        setMode('master')
    }

    const handleNoScrollRef = () => {
        setGlobalParam({ ...pageActions })
        setMode('window')
    }

    const handleDetailScroll = () => {
        setGlobalParam({ ...pageActions, scrollRef: detailRef })
        setMode('detail')
    }

    return (
        <>
            <H4>Отслеживается скролл: {mode}</H4>
            <SplitContainer
                detail={
                    <Page
                        content={
                            <Paper ref={detailRef} height="1250px" overflow="scroll">
                                <FlexBox flexDirection="column" gap={2} height="120%">
                                    <H5 bold>Detail — скролл отслеживается</H5>
                                    <Button onClick={handleDetailScroll}>Показать с Detail scroll</Button>
                                </Flex
```
<!-- components/bulkActions/GlobalBulkActions/ui/GlobalBulkActionsWithScrollRefUseEffectDemo.tsx -->
```tsx
import { IconEditOutline } from '@salutejs/plasma-icons'
import { H5 } from '@salutejs/sdds-cs'
import { useEffect, useRef } from 'react'

import { SplitContainer, Paper, Page, useGlobalBulkActions, FlexBox } from '../../../../../src'

const pageActions = {
    buttonItems: [
        {
            label: 'Отказать',
            value: 'deny',
            onClick: () => console.info('deny'),
        },
        {
            label: 'Отправить в банк',
            value: 'send',
            onClick: () => console.info('send'),
            isMain: true,
        },
    ],
    iconItems: [
        {
            icon: IconEditOutline,
            onClick: () => console.info('edit'),
        },
    ],
}

export const GlobalBulkActionsWithScrollRefUseEffect = () => {
    const detailRef = useRef<HTMLDivElement>(null)
    const { setGlobalParam } = useGlobalBulkActions()

    useEffect(() => {
        if (detailRef.current) {
            setGlobalParam({ ...pageActions, scrollRef: detailRef })
        }
    }, [detailRef.current])

    return (
        <SplitContainer
            detail={
                <Page
                    content={
                        <Paper ref={detailRef} height="500px" overflow="scroll">
                            <FlexBox height="120%">
                                <H5>Detail - скролл здесь активирует GlobalBulkActions</H5>
                            </FlexBox>
                        </Paper>
                    }
                />
            }
            master={
                <Page
                    content={
                        <Paper height="500px" overflow="scroll">
                            <FlexBox height="120%">
                                <H5>Master - на скролл здесь GlobalBulkActions не реагирует</H5>
                            </FlexBox>
                        </Paper>
                    }
                />
            }
        />
    )
}
```

---

## GlobalBulkActionsProvider
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/bulkActions

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const GlobalBulkActionsProvider: ({ children }: PropsWithChildren) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## globalShowToasts
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/bulkActions

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Аккумулирует сообщения и отображает их в едином стиле с поддержкой анимаций.
Функция полезна для централизованного управления уведомлениями в приложении.
@param messageItems - Массив объектов с свойствами для отображения тостов.

@summary отображает тосты с использованием глобальной реализации
```

### raw props type
```ts
export declare const globalShowToasts: (messageItems: TShowToastProps[]) => void;
```

### demo examples found
<!-- notifications/globalShowToasts/ui/GlobalShowToastsDemo.tsx -->
```tsx
import type { TShowToastProps } from '../../../../src/hooks/notifications'

import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FlexBox, globalShowToasts, Modal, Paper } from '../../../../src'

export const messagesList: TShowToastProps[] = [
    {
        text: 'Короткое позитивное сообщение',
        view: 'positive',
    },
    {
        text: 'Короткое позитивное сообщение, но слегка подлиннее',
        view: 'positive',
    },
    {
        text: 'Сообщение с длинным текстом',
        view: 'positive',
    },
    {
        text: 'Сообщение с ошибкой',
        view: 'negative',
    },
    {
        text: 'А вот тут что-то не удалось вот тут что-то не удалось вот тут что-то не удалось',
        view: 'negative',
    },
    {
        text: 'Длинное ДлинноеДлинноеДлинноеДлинное Длинное Длинное сообщение',
        view: 'positive',
    },
    {
        text: 'Еще длинное сообщение для демонстрации',
        view: 'negative',
    },
    {
        text: 'Короткое сообщение',
        view: 'default',
    },
]

export const GlobalShowToastsDemo = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Paper height="50vh" justifyContent="center" width="100%">
            <FlexBox flexDirection="column" gap={1}>
                <Button text="Показать несколько сообщений" onClick={() => globalShowToasts(messagesList)} />
                <Button text="Показать одно сообщение" onClick={() => globalShowToasts([messagesList[1]])} />
                <Button text="Показать сообщение с описанием" onClick={() => globalShowToasts([messagesList[2]])} />
                <Button text="Показать негативное сообщение" onClick={() => globalShowToasts([messagesList[3]])} />
                <Button text="Показать длинное сообщение" onClick={() => globalShowToasts([messagesList[4]])} />
                <Button
                    size="s"
                    text="Вызвать стандартный тост"
                    view="secondary"
         
```

---

## MobileModal
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Modal

propsType: TMobileModalProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[MobileModal](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-modal-mobilemodal--docs) - компонент для создания модального диалогового окна на небольших экранах, на базе компонента из sdds - [Sheet](https://plasma.sberdevices.ru/sdds-cs/components/sheet/).
Данный компонент должен заменять собой компонент Modal на мобильных экранах. MobileModal имеет тот же самый набор свойств, что и Modal, но укороченный:
- opened - отвечает за отображение модального окна;
- onClose - обработчик клика по кнопке "закрыть";
- title (опционально) - заголовок окна (располагается в 1-2 строки, кнопка закрытия уже есть в компоненте), принимает строку;
- content - основная текстовая и графическая информация, можно передать Fragment <></> с наполнением,
если нужно разместить таблицу внутри контентной области, оберните ее во flex-контейнер с заданной высотой;
- footer (опционально) - нижняя область, в которой располагаются кнопки действий, ожидает Fragment <></> с кнопками.
```

### raw props type
```ts
export type TMobileModalProps = Omit<TModalProps, 'frame' | 'portal' | 'size'>;
```

### demo examples found
<!-- components/Modal/MobileModal/ui/MobilModalDemo.tsx -->
```tsx
import type { Modal } from '../../../../../src'

import type { ComponentProps, RefCallback } from 'react'

import { Button } from '@salutejs/sdds-cs'
import { useCallback, useRef, useState } from 'react'

import { FlexBox, MobileModal } from '../../../../../src'
import { Content } from '../../Modal/ui/Content'

export const MobilModalDemo = ({ ...args }: ComponentProps<typeof Modal>) => {
    const [isOpen, setIsOpen] = useState(true)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const refCallback: RefCallback<HTMLDivElement> = useCallback((node) => {
        if (node) {
            modalRef.current = node

            console.info('clientHeight of the Modal ->', modalRef.current.clientHeight)
        } else {
            modalRef.current = null
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Button size="s" text="open modal" view="accent" onClick={() => setIsOpen(!isOpen)} />
            <MobileModal
                ref={refCallback}
                content={
                    <FlexBox flexDirection="column">
                        <Content />
                    </FlexBox>
                }
                footer={
                    <>
                        <Button size="s" view="clear" onClick={handleClose}>
                            Третье
                        </Button>
                        <Button size="s" view="secondary" onClick={handleClose}>
                            Второстепенное действие
                        </Button>
                        <Button size="s" view="accent" onClick={handleClose}>
                            Действие
                        </Button>
                    </>
                }
                opened={isOpen}
                title={args.title || 'Большой заголовок в две строки, который перестраивается на следующую строку'}
                onClose={handleClose}
            />
        </>
    )
}
```

---

## PopoverFrame
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Popover/PopoverFrame

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
[PopoverFrame](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-popover-popoverframe--docs)
 нужен для изоляции контекста стилей всплывающего окна компонента [Popover](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-popover--docs).
Его размещают в целевом контейнере и передают его ссылку в [`Popover.frame`](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-popover--docs) (`Popover.usePortal = true`).
Благодаря этому окно поповера наследует корректные стили именно от `PopoverFrame`,
а не от самого контейнера, что исключает влияние посторонних CSS.

@deprecated - необходимо удалить компонент из проекта. Компонент будет удалён в 8-м мажорном релизе.
```

### raw props type
```ts
export declare const PopoverFrame: import("react").ForwardRefExoticComponent<{
    id?: string;
    view?: "onDark" | "onLight";
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLDivElement>>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## SearchHelpers
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/SearchHelpers

propsType: SearchHelpersProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type SearchHelpersProps<RowData extends TRowData, ComboboxData extends TComboboxItem, CustomQueryArg extends TCustomQueryArg = TCustomQueryArg, CustomInitialPageParam extends TCustomQueryArg = TCustomQueryArg> = TUseInfinityQueryWithQueryBuilder<ComboboxData, CustomQueryArg, CustomInitialPageParam, RowData> & {
    extraArg?: TArg;
    triggerFilters?: string[];
} & TTableHeadFilterProps<RowData, CustomQueryArg, CustomInitialPageParam> & TPickComboboxProps;
```

### demo examples found
<!-- components/SearchHelpers/ui/SearchHelpersDemo.tsx -->
```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const SearchHelpersDemo = () => {
    const code = `
import { SearchHelpersDemo } from '@sber-front-cs-core/cs-core'

export const columnsTable = [
        {
            accessorKey: 'supplier.id',
            id: 'supplier.id',
            enableSorting: true,
            enableGlobalFilter: true,
            enableColumnFilter: true,
            headerFilterRender: (props) => (
                <SearchHelpers useInfinityQuery={useInfinityQueryMock} {...props} />
            ),
        }
]
`
    return (
        <SyntaxHighlighter language="tsx" style={oneLight}>
            {code}
        </SyntaxHighlighter>
    )
}
```

---

## SearchModal
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/SearchModal

propsType: TSearchModalProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TSearchModalProps = TModalRequiredProps & TModalPartialProps;
```

### demo examples found
<!-- components/SearchModal/ui/SearchModalDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { SearchModal } from '../../../../src'

export const SearchModalDemo = ({ ...rest }: ComponentProps<typeof SearchModal>) => {
    const [isOpenModal, setIsOpenModal] = useState(true)

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpenModal(true)
                }}
            >
                Открыть модальное окно
            </Button>
            <SearchModal
                {...rest}
                content="Сюда встраивается компонент EntitySearch"
                opened={isOpenModal}
                onClose={() => setIsOpenModal(false)}
            />
        </>
    )
}
```
<!-- components/SearchModal/ui/SearchModalWithEntitySearchDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { SearchModal } from '../../../../src'
import { EntitySearchDemo } from '../../EntitySearch/ui/EntitySearchDemo'

export const SearchModalWithEntitySearchDemo = ({ ...rest }: ComponentProps<typeof SearchModal>) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <Button
                onClick={() => {
                    setIsOpenModal(true)
                }}
            >
                Открыть модальное окно
            </Button>
            <SearchModal
                {...rest}
                content={<EntitySearchDemo />}
                opened={isOpenModal}
                onClose={() => setIsOpenModal(false)}
            />
        </>
    )
}
```

---

## TaskModal
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/TaskModal

propsType: TTaskModalProps (source: cs-core)

### raw description (RU, from JSDoc)
```
TaskModal - компонент модального окна для отображения и управления задачей.
Представляет собой специализированную версию Modal с предопределенной структурой для задач.

Особенности:
- Отображает полную информацию о задаче: заголовок, описание, номер, статус, тип, приоритет,
  исполнителя, документ основания и период исполнения
- Показывает индикатор срочности (огонь) для приоритетных задач.
- Использует цветовые и статусные бейджи для визуализации типа и статуса задачи
- Содержит структурированное отображение данных с помощью компонента DataField в сетке FormFlex
- Включает блок с кнопками действий (основное, второстепенное, очистка)
- Использует компоненты EllipsisInfo для обработки title и descriptions. (Ограничение в 4 строки)

`Пропсы`:
- task.title - Заголовок задачи.
- task.type - Типа задачи.
- task.typeColor (опционально) - Цвет бейджа (из набора TColorBadge).
- task.description (опционально) - Описание задачи.
- task.status (опционально) - Статус задачи.
- task.statusColor (опционально) - Статус для отображения (из набора TStatusBadge).
- task.priority (опционально) - Приоритетность задачи (при 60 и больше отображается иконка огня).
- headerDetail - Массив объектов, в которых можно отобразить дополнительные данные.
- actions (опционально) - Объект с действиями над задачей:
  - main - Основное действие (кнопка accent)
  - secondary - Второстепенное действие (кнопка secondary)
  - clear - Действие очистки/отмены (кнопка clear)
- onClose - Обработчик закрытия модального окна
- opened - Флаг открытия модального окна
- size (опционально) - Размер модального окна ('s' | 'm' | 'l' | 'fs')
- content - Основное содержимое
- frame (опционально) - Контейнер позиционирования
```

### raw props type
```ts
export type TTaskModalProps<T extends TTask> = Omit<TModalProps, 'title' | 'footer'> & {
    task: T;
    headerDetail?: {
        label: string;
        value: string | number;
    }[];
    actions?: {
        main: TInternalButton;
        secondary?: TInternalButton;
        clear?: TInternalButton;
    };
};
```

### demo examples found
<!-- components/TaskModal/ui/TaskModalDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { Content } from './Content'
import { TaskModal } from '../../../../src'

export const TaskModalDemo = ({
    content: _content,
    onClose: _onClose,
    opened: argsOpened,
    ...args
}: ComponentProps<typeof TaskModal>) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <Button size="s" text="open modal" view="accent" onClick={() => setIsOpen(!isOpen)} />
            <TaskModal content={<Content />} opened={argsOpened || isOpen} onClose={handleClose} {...args} />
        </>
    )
}
```

---

## useConfirm
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/notifications

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Хук для работы с модальными окнами подтверждения действий.

Позволяет использовать модальные окна подтверждения по всему приложению.
Работает через контекст, поэтому требует обертки в ˋConfirmProviderˋ.

Возвращает объект контекста с методами для показа модальных окон подтверждения.
Если хук используется вне провайдера, то выбрасывает ошибку.
```

### raw props type
```ts
export declare const useConfirm: () => TConfirmModalContext;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useGlobalBulkActions
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/bulkActions

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const useGlobalBulkActions: TUseGlobalBulkActions;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
