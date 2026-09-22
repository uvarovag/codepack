<!-- SKELETON for cs-core/pages-layouts.md — raw material only, not the final doc. 29 symbols. -->

## AccordionPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/AccordionPageLegacy

propsType: TAccordionPageLegacyProps (source: cs-core)

### raw description (RU, from JSDoc)
```
AccordionPageLegacy - компонент страницы, который состоит из:
 - header
 - [AccordionContentLegacy](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-accordioncontentlegacy--docs)
 - footer
@deprecated Используйте AccordionPageNew
```

### raw props type
```ts
export type TAccordionPageLegacyProps = Pick<TPageProps, 'header' | 'footer'> & TAccordionContentLegacyProps;
```

### demo examples found
<!-- pages/AccordionPage/AccordionPageDemo.tsx -->
```tsx
import { Breadcrumbs, Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { AccordionPageNew, PageHeader, Paper, SplitContainer } from '../../../src'
import { accordionItemsMock } from '../../lib/mocks/accordionItemsMock'

export const AccordionPageDemo = () => {
    const [value, setValue] = useState(['6'])

    const breadcrumbsItems = [{ title: 'Портал поставщика', href: '/' }, { title: 'Заявка' }]
    return (
        <SplitContainer
            master={
                <AccordionPageNew
                    footer={
                        <Paper justifyContent="end" variant="filled">
                            <Button>Согласовать</Button>
                        </Paper>
                    }
                    header={
                        <PageHeader breadcrumbs={<Breadcrumbs items={breadcrumbsItems} size="s" />} title="Заголовок" />
                    }
                    items={accordionItemsMock}
                    value={value}
                    onChange={setValue}
                />
            }
        />
    )
}
```

---

## AccordionPageNew
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/AccordionPage

propsType: TAccordionPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[AccordionPage](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/pages-accordionpage--docs) - Страница-обёртка, объединяющая секции аккордеона с Page.
```

### raw props type
```ts
export type TAccordionPageProps = Pick<TPageProps, 'header' | 'footer'> & TAccordionContentProps;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## createMultiRegistryItem
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/MultiRegistryPage

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const createMultiRegistryItem: <RowData extends TRowData>(item: TMultiRegistryPageItem<RowData>) => TMultiRegistryPageItem<TRowData>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## CSProvider
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/CSProvider

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
CSProvider - компонент провайдеров

Принимает следующие **props**:
- children - группа дочерних элементов `ReactNode`

Обертка включает в себя следующие провайдеры и компоненты:
- [PopupProvider](https://plasma.sberdevices.ru/sdds-cs/components/popup/#%D0%BF%D1%80%D0%BE%D0%B2%D0%B0%D0%B9%D0%B4%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%B0)
- [GlobalBulkActionsProvider](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-bulkactions-globalbulkactions--docs)
- ConfirmProvider - Для того, чтобы можно было использовать хук [useConfirm](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/hooks-useconfirm--docs)
```

### raw props type
```ts
export declare const CSProvider: ({ children, enableGlobalBulkActions, }: PropsWithChildren<{
    enableGlobalBulkActions?: boolean;
}>) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## EmptyPages
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/EmptyPages

propsType: TEmptyPagesProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [EmptyPages](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/pages-emptypages--docs) - это отображение
экранов при глобальных ошибках в системе.

Используете EmptyPages для обратной связи от системы:
- когда произошли неполадки с сервером;
- при ошибках доступа;
- при нарушении взаимодействий нескольких серверов.

Компонент EmptyPages можно использовать в виде готового шаблона и принимает следующие свойства:
- view - вид шаблона `'notFound' | 'forbidden'`;
- onClick - функция, вызываемая при нажатии на кнопку;

Виды шаблонов:
- forbidden (403) - нет доступа, нужно перезайти в систему, или обратиться в тех.поддержку;
- notFound (404) - сервер не может найти данные согласно запросу с клиента;
- unavailable (503) - система не доступна;

Ширина и высота компонента занимает всё доступное пространство родительского блока. Ширина блока с заголовком, текстом и кнопкой – 336 рх.
Картинка может занимать всё пространство пустого экрана
```

### raw props type
```ts
export type TEmptyPagesProps = {
    view: 'notFound';
    description?: never;
    onClick?: () => void;
} | {
    view: 'forbidden';
    description?: ReactNode;
    onClick?: () => void;
} | {
    view: 'unavailable';
    description?: never;
    onClick?: () => void;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## FlexBox
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/FlexBox

propsType: TFlexBoxProps (source: cs-core)

### raw description (RU, from JSDoc)
```
FlexBox - обертка над компонентом`Box` из библиотеки `cs-core`, в режиме <code>display: flex</code>, упрощающая работу
над позиционированием группы дочерних компонентов и ограничивающая,
актуальным набором параметров, исходный набор характеристик.
```

### raw props type
```ts
export type TFlexBoxProps = Pick<TBoxProps, TFlexBoxProperties>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## FormElementFlex
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormElementFlex является шаблонным блоком для элемента формы.
Принимает свойства компонента FlexBox.
FormElementFlex - дочерний компонент FormGroupFlex.
```

### raw props type
```ts
export declare const FormElementFlex: ({ children, ...res }: TFlexBoxProps) => import("react").JSX.Element;
```

### demo examples found
<!-- layout/Form/components/FormFlex/components/FormElementFlex/ui/FormElementReadDemo.tsx -->
```tsx
import { DataField, FormElementFlex, FormFlex, FormGroupFlex } from '../../../../../../../../src'

export const FormElementReadDemo = () => {
    return (
        <FormFlex readonly>
            <FormGroupFlex>
                <FormElementFlex>
                    <DataField label="label" value="text" />
                </FormElementFlex>
            </FormGroupFlex>
        </FormFlex>
    )
}
```
<!-- layout/Form/components/FormFlex/components/FormElementFlex/ui/FormElementUpdateDemo.tsx -->
```tsx
import { TextField } from '@salutejs/sdds-cs'

import { FormElementFlex, FormFlex, FormGroupFlex } from '../../../../../../../../src'

export const FormElementUpdateDemo = () => {
    return (
        <FormFlex>
            <FormGroupFlex>
                <FormElementFlex>
                    <TextField label="label" value="text" />
                </FormElementFlex>
            </FormGroupFlex>
        </FormFlex>
    )
}
```

---

## FormElementGrid
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormElementGrid является шаблонным блоком для элемента формы.
Принимает соедующие свойства:

- свойства компонента FlexBox;
- свойство newLine, которое используется для того, чтобы начать элемент с новой строки;
- свойство size, определяющее размер элемента:

     - `s` одна колонка;
     - `m` две колонки;
     - `l` 3 колонки.

По умолчанию используется `s`.
FormElementGrid - дочерний компонент FormGroupGrid.
```

### raw props type
```ts
export declare const FormElementGrid: ({ children, newLine, ...res }: TGridFormElementProps) => import("react").JSX.Element;
```

### demo examples found
<!-- layout/Form/components/FormGrid/components/FormElementGrid/ui/FormElementReadDemo.tsx -->
```tsx
import { DataField, FormElementGrid, FormGrid, FormGroupGrid } from '../../../../../../../../src'

export const FormElementReadDemo = () => {
    return (
        <FormGrid readonly width="900px">
            <FormGroupGrid>
                <FormElementGrid>
                    <DataField label="label" value="text" />
                </FormElementGrid>
                <FormElementGrid newLine>
                    <DataField label="label" value="text" />
                </FormElementGrid>
                <FormElementGrid size="m">
                    <DataField label="label" value="text" />
                </FormElementGrid>
            </FormGroupGrid>
        </FormGrid>
    )
}
```
<!-- layout/Form/components/FormGrid/components/FormElementGrid/ui/FormElementUpdateDemo.tsx -->
```tsx
import { TextField } from '@salutejs/sdds-cs'

import { FormElementGrid, FormGrid, FormGroupGrid } from '../../../../../../../../src'

export const FormElementUpdateDemo = () => {
    return (
        <FormGrid width="900px">
            <FormGroupGrid>
                <FormElementGrid>
                    <TextField label="label" value="text" />
                </FormElementGrid>
                <FormElementGrid newLine>
                    <TextField label="label" value="text" />
                </FormElementGrid>
                <FormElementGrid size="m">
                    <TextField label="label" value="text" />
                </FormElementGrid>
            </FormGroupGrid>
        </FormGrid>
    )
}
```

---

## FormFlex
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: TFormFlexProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormFlex является flex-контейнером, унаследованным от компонента FlexBox, обеспечивающий размещение и позиционирование дочерних элементов.
Компонент формы принимает свойство readonly, которое отвечает за внешний вид формы. Если передан readonly, то в форме используются только компоненты,
 которые находятся в режиме чтения, если свойство не передано, то в форме используются компоненты в режиме редактирования.
Данный компонент рекомендуется использовать в связки с компонентами FormGroupFlex и FormElementFlex.

В примере показаны две формы: без свойства readonly и с свойством readonly.
```

### raw props type
```ts
export type TFormFlexProps = PropsWithChildren<{
    readonly?: boolean;
} & Omit<TFlexBoxProps, 'gap' | 'columnGap' | 'rowGap'>>;
```

### demo examples found
<!-- layout/Form/components/FormFlex/ui/FormFlexDemo.tsx -->
```tsx
import { BodyM, textSecondary } from '@salutejs/sdds-cs'

import { FlexBox, FormGroupFlex, FormElementFlex, FormFlex, DataField } from '../../../../../../src'
import { contentData } from '../../../lib/mocks'

export const FormFlexDemo = () => {
    return (
        <FlexBox flexDirection="column" gap="40px" width="900px">
            <FormFlex>
                <FormGroupFlex label="Заголовок группы">
                    <FormElementFlex>{contentData[0].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[1].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[2].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[3].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[4].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[5].contentEdit}</FormElementFlex>
                </FormGroupFlex>
                <FormGroupFlex
                    label={
                        <FlexBox gap={0.5}>
                            <BodyM bold>Пример заголовка</BodyM>
                            <BodyM color={textSecondary}>ReactNode</BodyM>
                        </FlexBox>
                    }
                >
                    <FormElementFlex>{contentData[6].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[7].contentEdit}</FormElementFlex>
                </FormGroupFlex>
                <FormGroupFlex>
                    <FormElementFlex>{contentData[8].contentEdit}</FormElementFlex>
                    <FormElementFlex>{contentData[9].contentEdit}</FormElementFlex>
                </FormGroupFlex>
            </FormFlex>
            <FormFlex readonly flexDirection="row">
                <FormGroupFlex label="Заголовок группы">
                    <FormElementFlex>
                        <DataField label={contentData[0].label} value={contentData[0].contentRead} />
                    </FormElementF
```

---

## FormGrid
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: TFormGridProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormGrid является flex-контейнером, унаследованным от компонента FlexBox, обеспечивающий размещение и позиционирование дочерних элементов.
Компонент формы принимает свойство readonly, которое отчевает за внеший вид формы. Если передан readonly, то в форме используются только компоненты,
 которые находятся в режиме чтения, если свойство не передано, то в форме используются компоненты в режиме редактирования.
Данный компонент рекомендуется использовать в связки с компонентами FormGroupGrid и FormElementGrid.

В примере показаны две формы: без свойства readonly и с свойством readonly.
```

### raw props type
```ts
export type TFormGridProps = {
    readonly?: boolean;
    children: ReactNode;
} & Omit<TFlexBoxProps, 'gap' | 'columnGap' | 'rowGap' | 'flexDirection'>;
```

### demo examples found
<!-- layout/Form/components/FormGrid/ui/FormGridDemo.tsx -->
```tsx
import { BodyM, textSecondary } from '@salutejs/sdds-cs'

import { FlexBox, FormGroupGrid, FormElementGrid, FormGrid, DataField } from '../../../../../../src'
import { contentData } from '../../../lib/mocks'

export const FormGridDemo = () => {
    return (
        <FlexBox flexDirection="column" gap="100px" width="900px">
            <FormGrid>
                <FormGroupGrid label="Заголовок группы">
                    <FormElementGrid>{contentData[0].contentEdit}</FormElementGrid>
                    <FormElementGrid size="m">{contentData[1].contentEdit}</FormElementGrid>
                    <FormElementGrid size="l">{contentData[2].contentEdit}</FormElementGrid>
                    <FormElementGrid>{contentData[3].contentEdit}</FormElementGrid>
                    <FormElementGrid>{contentData[4].contentEdit}</FormElementGrid>
                    <FormElementGrid newLine>{contentData[5].contentEdit}</FormElementGrid>
                    <FormElementGrid>{contentData[9].contentEdit}</FormElementGrid>
                </FormGroupGrid>
                <FormGroupGrid
                    label={
                        <FlexBox gap={0.5}>
                            <BodyM bold>Пример заголовка</BodyM>
                            <BodyM color={textSecondary}>ReactNode</BodyM>
                        </FlexBox>
                    }
                >
                    <FormElementGrid size="m">{contentData[6].contentEdit}</FormElementGrid>
                    <FormElementGrid>{contentData[7].contentEdit}</FormElementGrid>
                </FormGroupGrid>
                <FormGroupGrid label="Заголовок группы">
                    <FormElementGrid>{contentData[8].contentEdit}</FormElementGrid>
                    <FormElementGrid>{contentData[8].contentEdit}</FormElementGrid>
                </FormGroupGrid>
            </FormGrid>
            <FormGrid readonly>
                <FormGroupGrid label="Заголовок группы">
                    <FormElementGrid>
           
```

---

## FormGroupFlex
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormGroupFlex используется для вставки в виде дочернего элемента в компонент FormFlex и для группировки элементов FormElementFlex.
FormGroupFlex так же принимается дополнительное свойство label.
```

### raw props type
```ts
export declare const FormGroupFlex: ({ label, children }: TFormGroupProps) => import("react").JSX.Element;
```

### demo examples found
<!-- layout/Form/components/FormFlex/components/FormGroupFlex/ui/FormGroupDemo.tsx -->
```tsx
import { TextField } from '@salutejs/sdds-cs'

import { FormElementFlex, FormFlex, FormGroupFlex } from '../../../../../../../../src'

export const FormGroupDemo = () => {
    return (
        <FormFlex>
            <FormGroupFlex label="Заголовок группы">
                <FormElementFlex>
                    <TextField label="label" value="text" />
                </FormElementFlex>
                <FormElementFlex>
                    <TextField label="Пример label, в котором содержится какой-то длинный текст" value="text" />
                </FormElementFlex>
                <FormElementFlex>
                    <TextField label="label" value="text" />
                </FormElementFlex>
            </FormGroupFlex>
            <FormGroupFlex>
                <FormElementFlex>
                    <TextField label="label" value="text" />
                </FormElementFlex>
            </FormGroupFlex>
        </FormFlex>
    )
}
```

---

## FormGroupGrid
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Form

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент FormGroupGrid используется для вставки в виде дочернего элемента в компонент FormGrid и для группировки элементов FormElementGrid.
FormGroupGrid так же принимается допольнительное свойство label.
```

### raw props type
```ts
export declare const FormGroupGrid: ({ label, children }: TFormGroupProps) => import("react").JSX.Element;
```

### demo examples found
<!-- layout/Form/components/FormGrid/components/FormGroupGrid/ui/FormGroupDemo.tsx -->
```tsx
import { TextField } from '@salutejs/sdds-cs'

import { FormElementGrid, FormGrid, FormGroupGrid } from '../../../../../../../../src'

export const FormGroupDemo = () => {
    return (
        <FormGrid width="900px">
            <FormGroupGrid label="Заголовок группы">
                <FormElementGrid>
                    <TextField label="label" value="text" />
                </FormElementGrid>
                <FormElementGrid size="m">
                    <TextField label="Пример label, в котором содержится какой-то длинный текст" value="text" />
                </FormElementGrid>
                <FormElementGrid>
                    <TextField label="label" value="text" />
                </FormElementGrid>
            </FormGroupGrid>
            <FormGroupGrid>
                <FormElementGrid>
                    <TextField label="label" value="text" />
                </FormElementGrid>
            </FormGroupGrid>
        </FormGrid>
    )
}
```

---

## globalCSS
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/StandAloneWrapper

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
globalCSS - глобальные стили переопределяющие основные css-свойства
```

### raw props type
```ts
export declare const globalCSS: import("@emotion/utils").SerializedStyles;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## LoaderPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/LoaderPage

propsType: TLoaderPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[LoaderPage](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/pages-loaderpage--docs) - компонент-шаблона страницы загрузки.
Представляет из себя крутящийся спиннер, который позиционируется по центру родительского блока.
```

### raw props type
```ts
export type TLoaderPageProps = {
    text?: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## MultiRegistryPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/MultiRegistryPage

propsType: TMultiRegistryPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент страницы с множественными таблицами

Представляет собой страницу с табами, где каждый таб содержит отдельную таблицу с данными.
Позволяет переключаться между различными наборами данных с сохранением состояния каждой таблицы.

- title - Заголовок страницы.
- items - Массив элементов (табов с таблицами).
- breadcrumbs - Хлебные крошки для навигации.
- defaultValue - Значение начального активного таба.
- initialItemId - __deprecated__ используйте `defaultValue`. ID начального активного таба.
- onClickCreate - Обработчик клика по кнопке "Создать".
- includeGlobalBulkActions - включение провайдера GlobalBulkActionsProvider для страницы.
```

### raw props type
```ts
export type TMultiRegistryPageProps<RowData extends TRowData> = {
    /** Заголовок страницы. */
    title: string;
    /** Массив элементов (табов с таблицами). */
    items: TMultiRegistryPageItem<RowData>[];
    /** Обработчик клика по кнопке "Создать". */
    onClickCreate?: () => void;
} & Pick<TPageHeaderProps, 'breadcrumbs'> & Pick<TTabContentProps, 'initialItemId' | 'onChange' | 'defaultValue'> & Pick<TPageProps, 'includeGlobalBulkActions'>;
```

### demo examples found
<!-- pages/MultiRegistryPage/ui/MultiRegistryPageDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { BodyS, Breadcrumbs, textPrimary } from '@salutejs/sdds-cs'

import { useCheckOnTable } from './useCheckOnTable'
import { useDeliveryTable } from './useDeliveryTable'
import { createMultiRegistryItem, MultiRegistryPage, SplitContainer } from '../../../../src'

export const MultiRegistryPageDemo = (args: ComponentProps<typeof MultiRegistryPage>) => {
    const items = [
        createMultiRegistryItem({
            label: 'Название таблица 1',
            value: '1',
            table: useDeliveryTable(),
            count: 2,
        }),
        createMultiRegistryItem({
            label: 'Название таблица 2',
            value: '2',
            table: useCheckOnTable(),
        }),
    ]

    return (
        <SplitContainer
            master={
                <MultiRegistryPage
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                {
                                    title: 'Главная',
                                    href: '#',
                                },
                                {
                                    renderItem: () => <BodyS color={textPrimary}>Реестры</BodyS>,
                                },
                            ]}
                        />
                    }
                    {...args}
                    items={items}
                    onClickCreate={() => console.info('Create')}
                />
            }
        />
    )
}
```
<!-- pages/MultiRegistryPage/ui/MultiRegistryPageSaveTabDemo.tsx -->
```tsx
import { BodyS, Breadcrumbs, textPrimary } from '@salutejs/sdds-cs'

import { useCheckOnTable } from './useCheckOnTable'
import { useDeliveryTable } from './useDeliveryTable'
import { createMultiRegistryItem, MultiRegistryPage, SplitContainer } from '../../../../src'

export const MultiRegistryPageSaveTabDemo = () => {
    const deliveryTable = useDeliveryTable()
    const checkonTable = useCheckOnTable()

    const items = [
        createMultiRegistryItem({
            label: 'Название таблица 1',
            value: '1',
            table: deliveryTable,
            count: deliveryTable.getRowCount(),
        }),
        createMultiRegistryItem({
            label: 'Название таблица 2',
            value: '2',
            table: checkonTable,
            count: checkonTable.getRowCount(),
        }),
    ]

    const savedTabId = localStorage.getItem('activeTab')

    return (
        <SplitContainer
            master={
                <MultiRegistryPage
                    breadcrumbs={
                        <Breadcrumbs
                            items={[
                                {
                                    title: 'Главная',
                                    href: '#',
                                },
                                {
                                    renderItem: () => <BodyS color={textPrimary}>Реестры</BodyS>,
                                },
                            ]}
                        />
                    }
                    defaultValue={savedTabId ?? undefined}
                    items={items}
                    title="Страница реестров"
                    onChange={(tab) => {
                        localStorage.setItem('activeTab', tab.value as string)
                    }}
                    onClickCreate={() => console.info('Create')}
                />
            }
        />
    )
}
```

---

## Page
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/Page

propsType: TPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Page - компонент страницы, который состоит из header, content и footer.
```

### raw props type
```ts
export type TPageProps = {
    contentOverflow?: TFlexBoxProps['overflow'];
    contentBorderRadius?: TBorderRadiusSizes;
    /** @deprecated Больше не работает, можно удалить. Теперь всегда используется GlobalBulkActions из createApp */
    includeGlobalBulkActions?: boolean;
} & TContent;
```

### demo examples found
<!-- pages/Page/ui/PageDemo.tsx -->
```tsx
import { IconCopyOutline, IconDownload, IconEdit } from '@salutejs/plasma-icons'
import { Breadcrumbs, Button, IconButton, TextM } from '@salutejs/sdds-cs'

import { SplitContainer, Page, PageHeader, Paper, FlexBox } from '../../../../src'

export const PageDemo = () => {
    const breadcrumbs = [{ title: 'Реестр документов', href: '/' }, { title: 'Документ' }]

    return (
        <SplitContainer
            master={
                <Page
                    content={
                        <Paper>
                            <TextM>Контент страницы</TextM>
                        </Paper>
                    }
                    footer={
                        <Paper>
                            <FlexBox flexGrow={1} justifyContent="end">
                                <Button view="accent">Действие</Button>
                            </FlexBox>
                        </Paper>
                    }
                    header={
                        <PageHeader
                            actionsToolbar={
                                <>
                                    <IconButton size="s" view="clear">
                                        <IconEdit color="inherit" size="s" />
                                    </IconButton>
                                    <IconButton size="s" view="clear">
                                        <IconDownload color="inherit" size="s" />
                                    </IconButton>
                                    <IconButton size="s" view="clear">
                                        <IconCopyOutline color="inherit" size="s" />
                                    </IconButton>
                                </>
                            }
                            breadcrumbs={<Breadcrumbs items={breadcrumbs} size="s" />}
                            title="Заголовок страницы"
                        />
                    }
                />
            }
        />
    )
}
```

---

## PageHeader
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/PageHeader

propsType: TPageHeaderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент PageHeader является шаблоном для блока заголовка страницы.

Компонент PageHeader принимает следующие свойства:
- breadcrumbs - список ссылок, которые помогают визуализировать местоположение страницы;
- title - краткое значение или наименование объекта;
- subtitle - это дополнительный заголовок, который располагается под основным и может в себе содержать наименование объекта или другую информацию которая раскрывает суть объекта. Если текст превышает 2 строки, то он сокращается в многоточие;
- status - статус-баджа у title. Тип такой же как у [Badge](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-badge--docs);
- infoItems - массив объектов для отображения информационного баджа (может быть иконкой или текстом). Так же как [Badge](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-badge--docs) Инфо-маркер.;
- count - счётчик;
- actionsToolbar - блок для системных кнопок действий. При размещении более 5-ти штук необходимо использовать другой компонент;
- content - Это блок содержащий в себе аналитики, относящиеся к объекту, которые пользователь не может редактировать. Может содержать в себе текстовый контент и ссылки. Рекомендуется использовать компонент `PageHeaderDetail`.
- isLoading - это свойство, которое позволяет отобразить анимацию загрузки данных в виде "skeleton" при передачи параметра.
- skeletonCount - количество скелетонов.
```

### raw props type
```ts
export type TPageHeaderProps = {
    /** Хлебные крошки */
    breadcrumbs?: ReactNode;
    /** Заголовок шапки */
    title?: string | ReactNode;
    /** Вспомогательный заголовок шапки */
    subtitle?: string | ReactNode;
    /** Панель экшенов */
    actionsToolbar?: ReactNode;
    /** Контент шапки */
    content?: ReactNode;
    /** Флаг состояния загрузки */
    isLoading?: boolean;
    /** Количество скелетонов */
    skeletonCount?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
} & TPageHeaderBadges;
```

### demo examples found
<!-- pages/PageHeader/ui/PageHeaderBreadcrumbsDemo.tsx -->
```tsx
import type { BreadcrumbsProps } from '@salutejs/sdds-cs'

import { IconEdit, IconDownload, IconCopyOutline, IconHomeAltOutline } from '@salutejs/plasma-icons'
import { Breadcrumbs, IconButton, Button, Dropdown, Link } from '@salutejs/sdds-cs'

import { PageHeader, PageHeaderDetail, PageHeaderDetailGroup } from '../../../../src'
import { viewColors } from '../../../../src/constants'

export const PageHeaderBreadcrumbsDemo = () => {
    const breadcrumbsItems: BreadcrumbsProps['items'] = [
        {
            renderItem: () => (
                <Link href="/">
                    <IconHomeAltOutline color={viewColors['accent']} size="xs" />
                </Link>
            ),
        },
        {
            renderItem: () => {
                const itemsDropdown = [
                    {
                        value: 'Путь 1',
                        label: 'Путь 1',
                    },
                    {
                        value: 'Путь 2',
                        label: 'Путь 2',
                    },
                ]
                return (
                    <Dropdown items={itemsDropdown} offset={[-16, 4]} placement="bottom">
                        <span>...</span>
                    </Dropdown>
                )
            },
        },
        { title: 'Заявки', href: '/' },
        { renderItem: () => <div style={{ color: viewColors['primary'] }}>№764389</div> },
    ]

    return (
        <PageHeader
            actionsToolbar={
                <>
                    <IconButton size="s" view="clear">
                        <IconEdit color="inherit" size="s" />
                    </IconButton>
                    <IconButton size="s" view="clear">
                        <IconDownload color="inherit" size="s" />
                    </IconButton>
                    <IconButton size="s" view="clear">
                        <IconCopyOutline color="inherit" size="s" />
                    </IconButton>
                    <Button vie
```
<!-- pages/PageHeader/ui/PageHeaderDemo.tsx -->
```tsx
import { IconEdit, IconDownload, IconCopyOutline } from '@salutejs/plasma-icons'
import { Breadcrumbs, IconButton, Button } from '@salutejs/sdds-cs'

import { PageHeader, PageHeaderDetail, PageHeaderDetailGroup } from '../../../../src'

export const PageHeaderDemo = () => {
    const breadcrumbsItems = [
        { title: 'Портал поставщика', href: '/' },
        { title: 'Заявки', href: '/' },
        { title: '№764389' },
    ]

    return (
        <PageHeader
            actionsToolbar={
                <>
                    <IconButton size="s" view="clear">
                        <IconEdit color="inherit" size="s" />
                    </IconButton>
                    <IconButton size="s" view="clear">
                        <IconDownload color="inherit" size="s" />
                    </IconButton>
                    <IconButton size="s" view="clear">
                        <IconCopyOutline color="inherit" size="s" />
                    </IconButton>
                    <Button view="clear">Согласовать</Button>
                </>
            }
            breadcrumbs={<Breadcrumbs items={breadcrumbsItems} size="s" />}
            content={
                <PageHeaderDetail>
                    <PageHeaderDetailGroup
                        elements={[
                            {
                                value: 'Создание и обслуживание систем водоснабжения нагруженных компрессионным затвором теплоподачи',
                            },
                        ]}
                        label='ООО "СТК"'
                    />
                    <PageHeaderDetailGroup
                        elements={[
                            {
                                label: 'Подписант',
                                value: 'Галицына С. М.',
                            },
                            {
                                newLine: true,
                                label: 'ИНН',
                                value: '50 29 14762 2
```

---

## PageHeaderDetail
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/PageHeader

propsType: TPageHeaderDetailProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент PageHeaderDetail предоставляет полную картину об объекте и его условиях, являясь детальной информацией, которая содержит
важные условия карточки объекта, например, наименование сторон, предмет договора, сроки исполнения, стоимость услуг или товаров и другие
полезные аналитики. Компонент может содержать текст, ссылки и иконки. Максимальная высота компонента 80 рх.
Аналитики располагаются в один ряд или собираются в смысловую группу. Группы аналитик располагаются в один ряд, следуя друг за другом.

**Использование: **

Аналитика, которая предоставляет из себя только текст должна быть *обязательно с заголовком группы*. Аналитики, состоящие из `подпись` и `значение`,
могут быть, как с заголовком, так и без него. Примечание: если используется заголовок группы, то на контент остаётся условно 2 строки.

Компонент `PageHeaderDetail` является обвёрткой для группировки компонентов `PageHeaderDetailGroup`.
```

### raw props type
```ts
export type TPageHeaderDetailProps = {
    children: ReactNode;
};
```

### demo examples found
<!-- pages/PageHeaderDetail/PageHeaderDetail/ui/PageHeaderDetailFourColumnDemo.tsx -->
```tsx
import { PageHeaderDetail, PageHeaderDetailGroup } from '../../../../../src'

export const PageHeaderDetailFourColumnDemo = () => {
    return (
        <PageHeaderDetail>
            <PageHeaderDetailGroup
                items={[
                    { label: '№ внешний', value: '14-0184' },
                    { label: 'Дата', value: '24.04.2026', newLine: true },
                    { label: 'Договор', value: '050000085583', newLine: true },
                ]}
                label="Реквизиты документа"
                maxCountRow={4}
            />
            <PageHeaderDetailGroup
                items={[
                    { value: 'ОАО «Омскоблводопровод»' },
                    { label: 'ИНН', value: '5528022202', newLine: true },
                    { label: 'КПП', value: '552801001', newLine: true },
                ]}
                label="Контрагент"
                maxCountRow={4}
            />

            <PageHeaderDetailGroup
                items={[
                    { label: 'БИК', value: '026413612' },
                    { label: 'Расчётный счет', value: '45967951545967951512', newLine: true },
                    { label: 'Корреспондентский счёт', value: '124801515459672342342951512', newLine: true },
                ]}
                label="Платёжные данные"
                maxCountRow={4}
            />
            <PageHeaderDetailGroup
                items={[
                    { value: 'Омское ГОСБ № 8634 ПАО СБЕРБАНК' },
                    { label: 'ИНН', value: '7707083893', newLine: true },
                    { label: 'КПП', value: '552801001', newLine: true },
                ]}
                maxCountRow={3}
            />
        </PageHeaderDetail>
    )
}
```

---

## PageHeaderDetailGroup
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/PageHeader

propsType: TPageHeaderDetailGroupProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент PageHeaderDetailGroup используется в качестве дочернего элемента компонента PageHeaderDetail.

Принимает следующие параметры:
- `label` (опционально) - заголовок группы (текст или ReactNode);
- `items`: элементы группы, каждый элемент состоит из следующих свойств:
     - `label` (опционально): текст к значению;
     - `value`: значение элемента, предоставляющее собой обычно текст, ссылку или иконку;
     - `newLine` (опционально): если true, то с этого элемента начинается новая строка;
     - `iconRight` (опционально): иконка, отображающаяся справа от значения элемента. Можно вывести иконку информации или копирования.
- `info` (опционально) - объект для отображения иконки инфо с тултипом, принимает два свойства: `text` и `view`;
- `maxCountRow` (опционально) - максимальное количество видимых строк (3 или 4) в группе.

Если в группе необходимо использовать один текст, то обязательно должен быть прокинут заголовок к группе, а в elements указывается только один
элемент `value: 'какой-то текст'`.

На данный момент регламентировано 3 использования PageHeaderDetailGroup: заголовок группы + элементы, элементы без заголовка группы,
заголовок группы + текст. Примеры показаны ниже.
```

### raw props type
```ts
export type TPageHeaderDetailGroupProps = {
    /**Заголовочная часть группы */
    label?: ReactNode;
    /**@deprecated: используйте объект items */
    elements?: TPageHeaderElement[];
    /**Массив элементов группы */
    items?: TPageHeaderElement[];
    /**@deprecated: используйте объект info */
    textIconInfo?: string;
    /**Отображение тултипа с иконкой info у label группы*/
    info?: TIconInfo;
    /**Количество строк для каждого PageHeaderDetailGroup в компоненте*/
    maxCountRow?: 3 | 4;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Paper
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/Paper

propsType: TPaperProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Paper - flex-контейнер унаследованный от компонента ```FlexBox``` обеспечивает размещение и позиционирование дочерних элементов.
Предоставляет доступ к актуальному набору flex-свойств, а также реализует свое визуальное представление через
значение свойства ```variant```.
```

### raw props type
```ts
export type TPaperProps = TPaperTypeProps & TFlexBoxProps;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## PaperCard
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/PaperCard

propsType: TPaperCardProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[PaperCard](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-papercard--docs) - представляет собой шаблон карточки, состоящий из заголовка, контента
и футера. В свойстве content должен использоваться специальным компонент
[PaperCardElement](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-papercard-papercardelement--docs).

Компонент принимает следующие свойства:
- `header` (опционально) - заголовок карточки;
- `content` - наполнение карточки в виде массива компонентов [PaperCardElement](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-papercard-papercardelement--docs),
т.к. тип ReactNode, то рекомендуется прокидывать компоненты в ReactFragment:
```
<>
   <PaperCardElementOne />
   <PaperCardElementTwo />
</>
```
- `footer` (опционально) - нижняя часть карточки, состоящая из ReactNode или двух свойств - buttons: ReactNode[] - массив кнопок футера, и description: string (опционально) - описание.
- `enableScroll` (опционально) - флаг по которому контент прикрепляется и появляется скролл у контента;
- `quickFilters` (опционально) - быстрые фильтры;
- `description` (опционально) - текст описания под заголовком;

Свойство `header` принимает следующие свойства:
- `title` - текстовое значение заголовка;
- `subTitle` (опционально) - текст вспомогательного заголовка, располагающегося над заголовком;
- `marks` (опционально) - массив признаков;
- `buttons` (опционально) - массив текстовых кнопок в виде объекта со следующими свойствами:
     - label - текст кнопки;
     - onClick - колбэк нажатия на кнопку;
     - isLoading (опционально) - флаг ожидания обработки клика;
- `actionToolbar` (опционально) - панель кнопок-иконок. Рекомендуется прокидывать иконки таким образом:
```
actionsToolbar: [
     {
         icon: IconEditOutline,
         onClick: () => {},
         isLoading?: true/false
     },
     {
         icon: IconDownload,
         onClick: () => {},
         isLoading?: true/false
     },
]
```
Также можно использовать готовый экшен, например:
```
actionsToolbar: {
     type: 'switch',
     text?: string,
     options: Pick<ComponentProps<typeof Switch>, 'onChange' | 'defaultChecked' | 'value' | 'checked'>
 ```
```

### raw props type
```ts
export type TPaperCardProps<TValue extends string | object = string, TItem extends TSegmentsItem<TValue> = TSegmentsItem<TValue>> = {
    header?: THeaderPaperCard;
    content: ReactNode;
    footer?: TFooterPaperCard | ReactNode;
    quickFilters?: TMultiSegmentsProps<TValue, TItem>;
    enableScroll?: boolean;
    description?: string;
};
```

### demo examples found
<!-- layout/PaperCard/PaperCard/ui/PaperCardNumberInputDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { IconTrashOutline } from '@salutejs/plasma-icons'
import { Button } from '@salutejs/sdds-cs'
import { FormProvider, useForm } from 'react-hook-form'

import { PaperCardElementExample } from './PaperCardElementExample'
import { PaperCard } from '../../../../../src'

export const argsPaperCardNumberInputDemo: ComponentProps<typeof PaperCard> = {
    header: {
        title: 'Заголовок карточки',
        marks: ['Признак 1', 'Признак 2', 'Признак 3'],
        buttons: [
            {
                text: 'Добавить',
                onClick: () => {},
            },
        ],
        actionsToolbar: [
            {
                icon: IconTrashOutline,
                onClick: () => {},
            },
        ],
        numberInput: {
            name: 'paperCardNumberInput',
            onChange: (e) => {
                console.info(e)
            },
        },
        subTitle: 'Вспомогательный заголовок',
        badge: {
            view: 'status',
            text: 'Badge',
        },
    },
    content: (
        <>
            <PaperCardElementExample />
            <PaperCardElementExample openedAccordion />
        </>
    ),
    footer: {
        description: 'Убедитесь что все изменения внесены по форме 2-83-НФПА',
        buttons: [
            <Button key="btn-1" view="clear">
                Отменить
            </Button>,
            <Button key="btn-2">Сохранить</Button>,
        ],
    },
}

export const PaperCardNumberInputDemo = ({ content, footer, header }: ComponentProps<typeof PaperCard>) => {
    const form = useForm({
        defaultValues: {
            paperCardNumberInput: 2,
        },
    })

    return (
        <FormProvider {...form}>
            <PaperCard content={content ?? <PaperCardElementExample />} footer={footer} header={header} />
        </FormProvider>
    )
}
```
<!-- layout/PaperCard/PaperCard/ui/PaperCardWithFiltersDemo.tsx -->
```tsx
import { Button } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FormElementFlex, FormGroupFlex, PaperCard } from '../../../../../src'
import { FlexBox, FormFlex, PaperCardElement } from '../../../../../src'
import { contentData } from '../../../Form/lib/mocks'

type TViewType = 'main' | 'positions' | 'sum' | 'errors'

const DynamicPaperCardElementExample = ({ view }: { view: TViewType }) => {
    const [opened, setOpen] = useState(false)

    const headerWithState = {
        title: 'Заголовок раздела',
        opened,
        onOpen: (newCollapsed?: boolean) => setOpen(newCollapsed ?? !opened),
    }

    const contentMap: Record<TViewType, number[]> = {
        main: [5, 7, 8, 9],
        positions: [5],
        sum: [7, 8, 9],
        errors: [8],
    }

    const getContent = (view: TViewType) => {
        const indices = contentMap[view]
        return indices.map((index) => <FormElementFlex key={index}>{contentData[index].contentEdit}</FormElementFlex>)
    }

    const commonFormElements = [0, 1, 2, 3]

    return (
        <PaperCardElement
            content={
                <FlexBox flexDirection="column" gap={3}>
                    <FormFlex>
                        <FormGroupFlex label="Заголовок группы элементов формы">
                            {commonFormElements.map((index) => (
                                <FormElementFlex key={index}>{contentData[index].contentEdit}</FormElementFlex>
                            ))}
                        </FormGroupFlex>
                    </FormFlex>
                </FlexBox>
            }
            footer={
                <>
                    <Button view="clear">Отменить</Button>
                    <Button>Сохранить</Button>
                </>
            }
            header={headerWithState}
            visibleContent={
                <FormFlex>
                    <FormGroupFlex label="Заголовок группы элементов формы">{getContent(view)}</FormGroupFlex>
               
```

---

## PaperCardElement
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/PaperCard

propsType: TPaperCardElementProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[PaperCardElement](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-papercard-papercardelement--docs) - представляет собой шаблон содержимого раздела
 для карточек, состоящих из нескольких частей, и, **внимание**, является дочерним элементом компонента [PaperCard](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-papercard--docs).

Компонент принимает следующие свойства:
- `header` (опционально) - объект заголовка раздела, принимает следующие свойства:

- `view` (опционально) - вид раздела `solid`, `secondary` или `selected` (по умолчанию  `solid`);
- `content` - наполнение раздела ReactNode;
- `visibleContent` (опционально) - часть нескрываемого контента при аккордеоне `(работает только при наличии свойств в header - opened и onOpen)`;
- `footer` (опционально) - нижняя часть раздела. Т.к. тип ReactNode, то рекомендуется прокидывать содержимое футера в ReactFragment,
чтобы было правильное позиционирование;
- `accordion` (опционально) - объект для управления состоянием открытия и закрытия аккордеона. Принимает следующие свойства:
     - opened - флаг раскрытия или закрытия аккордеона;
     - onOpen - колбэк для изменения состояния;
- `checked` (опционально) - объект для управления состоянием выбора карточки (чекбокс, радио или свич). При наличие этих свойств у хедера появляется
соответствующий компонент. Объект принимает следующие свойства:
     - opened - флаг выбора раздела;
     - onOpen - колбэк для изменения состояния;
     - visible - флаг отображение компонента для изменения состояния;
     - type - тип компонента изменения состояния ('radio' | 'switch' | 'checkbox', по умолчанию используется 'checkbox');
     - **Внимание:** компонент изменения состояния ('radio' | 'switch' | 'checkbox') не будет отображаться при `paddingSize === 's'`.

Свойство **`header`** принимает следующие свойства:
- `title` - текстовое значение заголовка;
- `subTitle` (опционально) - текст вспомогательного заголовка, располагающегося над заголовком;
- `marks` (опционально) - массив признаков;
- `buttons` (опционально) - массив текстовых кнопок в виде объекта со следующими свойствами:
     - label - текст кнопки;
     - onClick - колбэк нажатия на кнопку;
     - isLoading (опционально) - флаг ожидания обработки клика;
- `badge` (опционально) - бадж карточки;
- `titleSize` (опционально) - размер title ('H4'| 'MB' | 'MN');
- `paddingSize` (опционально) - наследуемое свойство от компонента [Paper](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/layout-paper--docs),
определяющее размер padding: `s` - 16px, `m` - 24px. Также при размере s доступен клик по всей карточки;
- `isEdit` (опционально) - флаг отображающий, что карточка находится в режиме редактирования (свойство нужно прокидывать в true, чтобы корректно применялись некоторые стили);
- `onClick` (опционально) - колбэк клика на карточку, работает только при paddingSize = 's' - в других случаях игнорируется.
- `image` (опционально) - картинка в виде ReactNode, **нельзя одновременно использовать со свойством informer**;
- `informer` (опционально) - объект, содержащий свойства компонента;
- `description` (опционально) - краткое описание карточки.
[Informer](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-informer--docs), **нельзя одновременно использовать со свойством image**.
- `actionToolbar` (опционально) - панель кнопок-иконок. Рекомендуется прокидывать иконки таким образом:
```
actionsToolbar: [
     {
         icon: IconEditOutline,
         onClick: () => {},
         isLoading?: true/false
     },
     {
         icon: IconDownload,
         onClick: () => {},
         isLoading?: true/false
     },
]
```
```

### raw props type
```ts
export type TPaperCardElementProps = {
    header?: THeaderPaperCardElement;
    content?: ReactNode;
    visibleContent?: ReactNode;
    footer?: ReactNode;
    view?: 'solid' | 'secondary' | 'selected';
    isEdit?: boolean;
    onClick?: () => void;
    description?: string;
    accordion?: TAccordion;
    checked?: TChecked;
    hoverView?: THoverViewPaperCardElement;
} & TFromPaperProps & TAdditionalProps & Pick<TFlexBoxProps, 'id'>;
```

### demo examples found
<!-- layout/PaperCard/PaperCardElement/ui/PaperCardElementDemo.tsx -->
```tsx
import type { TPaperCardElementProps } from '../../../../../src/layouts/PaperCard/PaperCardElement/types'

import { useState } from 'react'

import { PaperCardElement } from '../../../../../src'

export const PaperCardElementDemo = (args: TPaperCardElementProps) => {
    const [opened, setOpen] = useState(false)
    const [select, setSelect] = useState(false)

    return (
        <PaperCardElement
            {...args}
            accordion={{ opened: opened, onOpen: setOpen }}
            checked={{ checked: select, onChange: setSelect, type: args.checked?.type }}
        />
    )
}
```
<!-- layout/PaperCard/PaperCardElement/ui/PaperCardElementInformerDemo.tsx -->
```tsx
import type { TPaperCardElementProps } from '../../../../../src/layouts/PaperCard/PaperCardElement/types'

import { BodyS, Link } from '@salutejs/sdds-cs'

import { PaperCardElement } from '../../../../../src'
import { footerMocks } from '../../lib/argsMocks'

export const PaperCardElementInformerDemo = (args: TPaperCardElementProps) => {
    return (
        <PaperCardElement
            footer={footerMocks}
            header={{
                title: 'Пример карточки c Informer',
                titleSize: 'MB',
            }}
            informer={{
                content: (
                    <BodyS>
                        Используйте{' '}
                        <Link href="/" view="accent">
                            уведомления
                        </Link>
                        , чтобы информировать пользователей об обновлениях или{' '}
                        <Link href="/" view="accent">
                            изменениях
                        </Link>{' '}
                        состояния системы
                    </BodyS>
                ),
                opened: true,
                title: 'Длинный заголовок закончится. Переноса не будет',
                view: 'warning',
            }}
            onClick={() => {}}
            {...args}
            content={<BodyS>Какой-то контент</BodyS>}
            image={undefined}
        />
    )
}
```
<!-- layout/PaperCard/PaperCardElement/ui/PaperCardElementNestedDemo.tsx -->
```tsx
import type { TPaperCardElementProps } from '../../../../../src/layouts/PaperCard/PaperCardElement/types'

import { IconCartOutline, IconInfoCircleOutline } from '@salutejs/plasma-icons'

import { FlexBox, PaperCardElement } from '../../../../../src'
import { footerMocks } from '../../lib/argsMocks'

export const PaperCardElementNestedDemo = (args: TPaperCardElementProps) => {
    return (
        <PaperCardElement
            footer={footerMocks}
            header={{
                title: 'Пример карточки c Informer',
                titleSize: 'MB',
                actionsToolbar: [
                    {
                        icon: IconInfoCircleOutline,
                        onClick: () => console.info,
                    },
                ],
            }}
            onClick={() => {}}
            {...args}
            content={
                <FlexBox flexDirection="column" gap={1}>
                    <PaperCardElement
                        header={{
                            title: 'Ещё пример карточки, размер которой s',
                            marks: ['42'],
                            titleSize: 'MN',
                            actionsToolbar: [
                                {
                                    icon: IconCartOutline,
                                    onClick: () => console.info,
                                },
                            ],
                        }}
                        paddingSize="s"
                        view="secondary"
                    />
                    <PaperCardElement
                        header={{
                            title: 'Ещё пример карточки, размер которой s',
                            marks: ['42'],
                            titleSize: 'MN',
                            actionsToolbar: [
                                {
                                    icon: IconCartOutline,
                                    onClick: () => console.info,
            
```

---

## PaperCardElementCatalog
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/PaperCard

propsType: TPaperCardElementCatalogProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[PaperCardElementCatalog](https://tvldw-efs003257.cloud.delta.sbrf.ru/?path=/docs/layout-papercard-papercardelementcatalog--docs) - представляет собой карточку каталога.

Компонент принимает следующие свойства:
- header (опционально) - заголовок карточки;
- content - наполнение раздела ReactNode;
- footer (опционально) - нижняя часть карточки;
- rating (опционально) - рейтинг, оценка карточки, представляющий собой объект c ограниченными свойства компонента Rating из sdds;

Свойство `header` принимает следующие свойства:
- title - текстовое значение заголовка;
- marks (опционально) - массив признаков;

Свойство `footer` принимает следующие свойства:
- icon - иконка активного действия карточки;
- onClick - клик по иконке;
- content (опционально) - контент футера в виде ReactNode;
- isLoading (опционально) - флаг ожидания обработки клика;
- numberInput (опционально) - отображение счётчика на основе компонента MutationNumberInput, принимающий объект из свойств `name`, `onChange` и `step`.
Для того, чтобы работал функционал счётчика необходимо обернуть компонент/компоненты PaperCardElementCatalog в форму из react-hook-form.
```

### raw props type
```ts
export type TPaperCardElementCatalogProps = {
    /** Заголовок раздела (обязательное свойство) */
    header: Pick<THeaderPaperCard, 'title' | 'marks'>;
    /** Основное содержимое раздела */
    content?: ReactNode;
    /** Футер карточки (опциональное свойство) */
    footer?: TFooter;
    /** Отображение рейтинга в виде звёзд у карточки (опциональное свойство) */
    rating?: TRatingSDDSProps;
};
```

### demo examples found
<!-- layout/PaperCard/PaperCardElementCatalog/ui/PaperCardElementCatalogDemo.tsx -->
```tsx
import { IconCartOutline } from '@salutejs/plasma-icons'
import { BodyM, BodyS, SegmentGroup, SegmentItem, textSecondary } from '@salutejs/sdds-cs'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

import { FlexBox, PaperCardElementCatalog } from '../../../../../src'
import { segmentItems } from '../lib/segmentItems'

export const PaperCardElementCatalogDemo = () => {
    const form = useForm({
        defaultValues: {
            numberInputCatalog2: 2,
        },
    })

    return (
        <FormProvider {...form}>
            <CatalogExample />
        </FormProvider>
    )
}

const CatalogExample = () => {
    const { setValue } = useFormContext()

    const enableNumberInput = (name: string) => {
        setValue(name, 1)
    }

    return (
        <FlexBox gap={2}>
            <PaperCardElementCatalog
                content={content}
                footer={{
                    numberInput: {
                        name: 'numberInputCatalog1',
                    },
                    content: <BodyM>Какой-то контент footer</BodyM>,
                    icon: IconCartOutline,
                    onClick: () => {
                        enableNumberInput('numberInputCatalog1')
                    },
                }}
                header={{
                    title: 'Стеганая куртка СБЕР',
                    marks: ['В наличии: 68 шт.'],
                }}
                rating={{
                    value: 4.8,
                }}
            />
            <PaperCardElementCatalog
                content={content}
                footer={{
                    numberInput: {
                        name: 'numberInputCatalog2',
                    },
                    content: <BodyM>Какой-то большой контент footer, который занимает больше ожидаемой высоты</BodyM>,
                    icon: IconCartOutline,
                    onClick: () => {
                        enableNumberInput('numberInputCatalog2')
                   
```

---

## RegistryPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/RegistryPage

propsType: TRegistryPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент страницы реестра с одной таблицей

Представляет собой стандартную страницу для отображения табличных данных с возможностью
создания новых записей и отображения общего количества элементов.

- title - Заголовок страницы;
- table - Экземпляр таблицы для отображения данных;
- onClickCreate - Обработчик клика по кнопке "Создать";
- breadcrumbs - Хлебные крошки для навигации;
- count - Количество строк в таблице;
- includeGlobalBulkActions - включение провайдера GlobalBulkActionsProvider для страницы.
```

### raw props type
```ts
export type TRegistryPageProps<RowData extends TRowData> = TPrettify<{
    title: string;
    table: TTableInstance<RowData>;
    onClickCreate?: () => void;
    count?: number;
} & TPageHeader & Pick<TPageProps, 'includeGlobalBulkActions'>>;
```

### demo examples found
<!-- pages/RegistryPage/ui/RegistryPageDemo.tsx -->
```tsx
import type { TRowData } from '../../../../src'
import type { TRegistryPageProps } from '../../../../src/pages/RegistryPage/types'

import { IconAddSmileOutline, IconCarOutline, IconCartOutline } from '@salutejs/plasma-icons'
import { BodyS, Breadcrumbs, textPrimary } from '@salutejs/sdds-cs'

import { dataDemo, tableColumnsDemo } from './constants'
import { RegistryPage, SplitContainer, useTable } from '../../../../src'

export const RegistryPageDemo = (args: TRegistryPageProps<TRowData>) => {
    const table = useTable({
        data: dataDemo,
        columns: tableColumnsDemo,
        globalActions: [
            {
                label: 'Выгрузить таблицу',
                onClick: () => console.info('Выгрузить таблицу'),
            },
            {
                label: 'Глобальное действие Б',
                onClick: () => console.info('Глобальное действие Б'),
            },
        ],
        customActions: [
            {
                icon: IconAddSmileOutline,
                onClick: () => console.info('Click IconAddSmileOutline'),
            },
            {
                icon: IconCarOutline,
                onClick: () => console.info('Click IconCarOutline'),
            },
        ],
        massActions: [
            {
                label: 'Массовое действие А',
                visibleAccessorKey: 'actionControl.createEdo',
                onClick: (a) => console.info('Массовое действие А', a),
            },
            {
                label: 'Массовое действие Б',
                onClick: (a) => console.info('Массовое действие Б', a),
            },
        ],
        rowActions: [
            {
                label: 'Действие с рядом',
                visibleAccessorKey: 'actionControl.createEdo',
                onClick: (a) => {
                    console.info('Действие с рядом', a)
                },
            },
            {
                label: 'Удаление',
                icon: 'delete',
                onClick: (a) => {

```

---

## SplitContainer
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/SplitContainer

propsType: TSplitContainerProps (source: cs-core)

### raw description (RU, from JSDoc)
```
SplitContainer - компонент для разделения контента на две части. Master слева, detail справа. fixed позволяет переключать размер основного и
второго модулей.  Компонент принимает следующие свойства:
- `master` - содержимое в виде ReactNode части master;
- `detail` - содержимое в виде ReactNode части detail;
- `fixed` (`master | detail`) - переключение размеров обоих модулей (по умолчанию fixed);
- `className` - название класса компонента;
- `enableScroll` - флаг включение скролла на странице - в таком случае detail всегда будет отображаться справа, а у master будет скрол в правой части
страницы, также при наличии этого свойства будет работать автоматическая мобильная адаптация.

Можно обратится к классам 'master' и 'detail'.

@summary компонент для разделения контента на две части
```

### raw props type
```ts
export type TSplitContainerProps = {
    master?: ReactNode;
    detail?: ReactNode;
    fixed?: 'master' | 'detail';
    className?: string;
    enableScroll?: boolean;
};
```

### demo examples found
<!-- pages/SplitContainer/ui/SplitContainerDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { TextM } from '@salutejs/sdds-cs'

import { SplitContainer, Paper, Page } from '../../../../src'

export const SplitContainerDemo = (args: ComponentProps<typeof SplitContainer>) => {
    return (
        <SplitContainer
            detail={
                <Page
                    content={
                        <Paper flexDirection="column">
                            <TextM>Detail {args.fixed === 'detail' ? 'fixed' : ''}</TextM>
                        </Paper>
                    }
                />
            }
            master={
                <Page
                    content={
                        <Paper flex={1} flexDirection="column">
                            <TextM>Master {args.fixed === 'master' ? 'fixed' : ''}</TextM>
                        </Paper>
                    }
                />
            }
            {...args}
        />
    )
}
```
<!-- pages/SplitContainer/ui/SplitContainerEnableScrollDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { TextM } from '@salutejs/sdds-cs'

import { SplitContainer, Paper, FlexBox, Page } from '../../../../src'

export const SplitContainerEnableScrollDemo = (args: ComponentProps<typeof SplitContainer>) => {
    return (
        <SplitContainer
            enableScroll
            detail={
                <Page
                    content={
                        <Paper flexDirection="column" height="30vh" variant="glassed">
                            <TextM>Detail</TextM>
                        </Paper>
                    }
                />
            }
            master={
                <Page
                    content={
                        <Paper flex={1} flexDirection="column" variant="glassed">
                            <FlexBox height="160vh">
                                <TextM>Master</TextM>
                            </FlexBox>
                        </Paper>
                    }
                />
            }
            {...args}
        />
    )
}
```

---

## StandAloneWrapper
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./layouts/StandAloneWrapper

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
StandAloneWrapper - обертка для stand-alone приложения, с следующими свойствами:

- width: 100vh;
- height: 100%;
- backgroundColor: #060A0C;
- padding: 16px;

Принимает следующие **props**:
- children - группа дочерних элементов `ReactNode`

В состав StandAloneWrapper входит:
- [themeCSS](https://plasma.sberdevices.ru/sdds-cs/#%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-styled-component)
- globalCSS - глобальные стили переопределяющие основные css-свойства

Для работы приложения в Стартовом менеджере подключать StandAloneWrapper не требуется!
```

### raw props type
```ts
export declare const StandAloneWrapper: ({ children }: PropsWithChildren) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## TabPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/TabPage

propsType: TTabPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
TabPage - компонент страницы, который состоит из header, компонента TabContent и footer.
```

### raw props type
```ts
export type TTabPageProps = Pick<TPageProps, 'header' | 'footer' | 'includeGlobalBulkActions'> & TTabContentProps;
```

### demo examples found
<!-- pages/TabPage/ui/TabPageDemo.tsx -->
```tsx
import type { TabContent } from '../../../../src'

import type { ComponentProps } from 'react'

import { Breadcrumbs, Button } from '@salutejs/sdds-cs'

import { SplitContainer, TabPage, Paper, PageHeader } from '../../../../src'

type TabPageDemoProps = {
    isLoading?: boolean
    items: ComponentProps<typeof TabContent>['items']
    skeletonCount?: number
    initialItemId?: string
}

export const TabPageDemo = (args: TabPageDemoProps) => {
    const breadcrumbsItems = [{ title: 'Портал поставщика', href: '/' }, { title: 'Заявка' }]
    return (
        <SplitContainer
            master={
                <TabPage
                    footer={
                        <Paper justifyContent="end" variant="filled">
                            <Button>Согласовать</Button>
                        </Paper>
                    }
                    header={
                        <PageHeader breadcrumbs={<Breadcrumbs items={breadcrumbsItems} size="s" />} title="Заголовок" />
                    }
                    {...args}
                />
            }
        />
    )
}
```
<!-- pages/TabPage/ui/TabPageWithTimeoutDemo.tsx -->
```tsx
import type { TabContent } from '../../../../src'

import type { ComponentProps } from 'react'

import { BodyM } from '@salutejs/sdds-cs'
import { useState, useEffect } from 'react'

import { Paper, TabPage } from '../../../../src'
import { MainContentDemo } from '../../../lib/ui/ForTabs/MainContentDemo'

export const TabPageWithTimeoutDemo = () => {
    const [isFirstTabVisible, setIsFirstTabVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFirstTabVisible(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const items: ComponentProps<typeof TabContent>['items'] = [
        {
            value: 'Детали',
            label: 'Детали',
            content: (
                <Paper variant="filled">
                    <BodyM>Контент для tab 1</BodyM>
                </Paper>
            ),
            visible: isFirstTabVisible,
        },
        {
            value: 'Основная информация',
            label: 'Основная информация',
            contentRight: {
                variant: 'counter',
                value: 3,
            },
            content: <MainContentDemo title="Основная информация" />,
        },
    ]

    return <TabPage items={items} />
}
```

---

## WizardPage
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./pages/WizardPage

propsType: TWizardPageProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[WizardPage](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/pages-wizardpage--docs) — шаблонная страница для сложных и многоступенчатых процессов,
которые состоят из объёмных форм с большим количеством элементов выбора и ввода.

Используйте компонент для сложных и многоступенчатых процессов. Такие процессы состоят из объёмных форм
с большим количеством элементов выбора и ввода. Например, при создании объекта.

Избегайте использования компонента для выполнения простых задач, которые состоят из одного или двух шагов
с одиночными полями ввода. Для таких случаев лучше подойдёт компонент «Шкала прогресса».
Фокусируйте пользователя на данных, которые необходимы для успешного завершения бизнес-процесса.
Избегайте необязательных шагов.

**Виды шагов:**
- *Варианты выбора* — страница с вариантами выбора, которая определяет следующий набор шагов. Размер контентной области — S.
  На этой странице нет кнопки «Продолжить». Нажимая на один из вариантов, экран автоматически переходит на следующий шаг.
  Набор кнопок: кнопка второстепенного действия (отмена процесса), кнопка-иконка «Назад».
- *Множественный выбор* — страница с возможностью добавления дополнительных групп подобных блоков.
  Для добавления используется кнопка «Добавить ещё», расположенная под последним блоком. Размер контентной области — S, M.
  Набор кнопок: кнопка «Продолжить», кнопка второстепенного действия (отмена), кнопка-иконка «Назад».

Компонент WizardPage принимает следующие свойства:
- `title` — заголовок визарда;
- `value` — текущее значение пути визарда (string[]);
- `onChange` — колбэк при изменении пути (value: string[]) => void;
- `items` — массив элементов визарда (шагов) типа TWizardItem, состоит из следующих свойств:
     - `title` — заголовок шага;
     - `value` — значение шага;
     - `description` (опционально) — описание шага;
     - `content` — контент шага;<br/>
     **Примечание:** если шаг **одиночный**, то контент представляет собой тип `ReactNode`, если шаг - **множественный выбор**, то в контентной
части автоматически отображаются несколько PaperCardElement и тип контента предоставляет собой объект с тремя свойствами: `title`, `description`
и `nextValue`;
     - `nextValue` — значение следующего шага - передавайте null если шаг завершающий, или представляет из себя множественный выбор;
     - `size` — размер шага ('s' | 'm' | 'fs', по умолчанию - 's');
- `handleSubmit` (опционально) — функция сабмита формы;
- `breadcrumbs` — хлебные крошки для шапки страницы (тип TPageHeaderProps['breadcrumbs']);
- `isLoading` (опционально) — флаг загрузки;
- `steps` (опционально, deprecated) — место для использования степпера визарда - компонент Steps из sdds (будет удалён в мажорном релизе 9);
- `textFinish` — текст кнопки завершения;
- `onFinish` — колбэк завершения визарда;
- `textCancel` — текст кнопки отмены;
- `onCancel` (опционально) — колбэк отмены;
- `onContinue` (опционально) — колбэк продолжения;
- `onBack` (опционально) — колбэк возврата.
@summary - шаблонная страница для отображения пошаговых этапов одного процесса.
```

### raw props type
```ts
export type TWizardPageProps<TFieldValues extends FieldValues, TTransformedValues = TFieldValues> = TWizardPageItem<TFieldValues, TTransformedValues> & Pick<TPageHeaderProps, 'breadcrumbs'>;
```

### demo examples found
<!-- pages/WizardPage/WizardPage/WizardPageDemo.tsx -->
```tsx
import type { TUseWizardHandleSubmit, TWizardItem } from '../../../../src'
import type { FieldValues } from 'react-hook-form'

import type { ComponentProps } from 'react'

import { BodyM, Breadcrumbs } from '@salutejs/sdds-cs'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FlexBox, MutationCheckbox, SplitContainer } from '../../../../src'
import { WizardPage } from '../../../../src/pages/WizardPage/WizardPage'
import { wizardData } from '../lib/wizardData'

/** Шаги с формой. */
const WITH_FORM_STEP_VALUES = ['2', 'equipment-5', 'tech-5']

/** Какая-то компонента с любой формой. */
const StepCheckbox = ({ label, value }: { value: string; label: string }) => {
    return <MutationCheckbox item={{ label }} label={label} name={value} options={{ required: 'Обязательное поле' }} />
}

/**
 * К каждому шагу есть своя компонента - делаем map для удобства.
 * Компонента с формой используется одна - это для удобства, в реальности могут быть разные.
 */
const contentMap: Record<string, TWizardItem['content']> = {
    '1': (
        <FlexBox height="70vh">
            <BodyM>Контент шага 1: начальный экран</BodyM>
        </FlexBox>
    ),
    '2': <StepCheckbox label="Подтвердить" value="2" />,
    'equipment-4': <BodyM>Контент шага оборудования 4: детали</BodyM>,
    'equipment-5': <StepCheckbox label="Закупить оборудование" value="equipment-5" />,
    'tech-4': <BodyM>Контент шага техники 4: детали</BodyM>,
    'tech-5': <StepCheckbox label="Закупить технику" value="tech-5" />,
    final: <BodyM>Контент шага общего завершающего шага</BodyM>,
}
/**
 * Подставляем content для каждого шага.
 * Вместо contentMap можно использовать Outlet, но тогда маппинг надо делать внутри WizardPageDemo и управлять состоянием value придётся самостоятельно.
 */
export const items: TWizardItem[] = wizardData.map((item) => ({
    ...item,
    content: item.content || contentMap[item.value],
    // content: item.content || <Outlet>,
}
```

---

## WidgetPaper
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetPaper

propsType: TWidgetPaperProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[WidgetPaper](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-widgetpaper--docs) - представляет из себя небольшой прямоугольный или квадратный модуль, который отображает данные в кратком виде или в виде диаграмм. Обеспечивает доступ к подробной информации.

Компонент принимает следующие собственные свойства:
- title - заголовок карточки;
- widgetOnClick - колбэк при нажатии на компонент (имеет приоритет над href и navigate);
- children - наполнение компонента в виде любой ReactNode;
- actions (опционально) - наполнение заголовка в виде любой ReactNode (**Внимание:** у компонента ограничена высота заголовка в 24px);
- ref (опционально) - ref элемента;
- size (опционально) - размер карточки;
- isLoading (опционально) - состояние, когда контент внутри компонента загружается;
- isEmpty (опционально) - состояние пустых данных;
- hasFilters (опционально) - состояние фильтров;
- href (опционально) - ссылка для перехода;
- navigate (опционально) - функция роутинга (используется если не задан widgetOnClick);

**Внимание:** рекомендуется учитывать размеры родителя и передавать соответствующий `size`:
- `size = '1x1'`   (128 x 128 px)
- `size = '2x1'`   (260 x 128 px)
- `size = '2x2'`   (260 x 260 px)
- `size = '4x2'`   (524 x 260 px)

Также компонент принимает все свойства (кроме 'height' | 'width') от FlexBox и Paper.

@summary компонент для отображения данных в кратком виде или в виде диаграмм
```

### raw props type
```ts
export type TWidgetPaperProps = {
    /** Флаг отображения пустого состояния @default false */
    isEmpty?: boolean;
    /** Флаг наличия фильтров @default false */
    hasFilters?: boolean;
    /** Флаг состояния загрузки @default false */
    isLoading?: boolean;
    /** Заголовок виджета (строка или ReactNode) */
    title: string | ReactNode;
    /** Область для действий */
    actions?: ReactNode;
    /** Обработчик клика по виджету целиком. Имеет приоритет над href и navigate */
    widgetOnClick?: THandleLinkChange;
    /** Ссылка для перехода по виджету целиком */
    href?: string;
    /** Размер виджета @default '4x2' */
    size?: TWidgetSize;
    /** Функция роутинга из react-router. Вызывается при клике по виджету, если не задан widgetOnClick */
    navigate?: NavigateFunction;
    /** Флаг видимости иконки стрелки при наведении @default true */
    arrowVisible?: boolean;
} & Omit<TFlexBoxProps, 'height' | 'width' | 'onClick'>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
