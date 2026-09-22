<!-- SKELETON for cs-core/navigation.md — raw material only, not the final doc. 14 symbols. -->

## AnchorMenu
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./navigations/AnchorMenu

propsType: TAnchorMenuProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент AnchorMenu используется для быстрого перемещения по разделам страницы.


**Внимание:** компонент располагается строго справа от навигируемого контейнера на расстоянии 24px!

**Применение:**

Используйте якорное меню на длинных страницах с большим объёмом информации.
Наименования разделов в якорном меню должны быть короткими, понятными, информативными и соответствовать ожиданиям пользователей.
Якорное меню должно состоять из 3-10 пунктов, так как большее количество может затруднить навигацию и сделать меню слишком длинным.
Текст в каждом пункте начинается с прописной буквы, остальные строчные, соблюдая правила русского языка.

**Использование:**

AnchorMenu принимает следующие свойства:
- items - массив объектов, предоставляющий собой набор ссылок;
- containerScrollRef - ref на контейнер, где будут располагаться секции, между которыми необходима навигация;
- sectionMapRef - реф, который используется для хранения ссылок на DOM-элементы секций;
- isLoading (опционально) - флаг загрузки данных в компоненте;
- skeletonCount (опционально) - количество скелетонов загрузки данных.

Свойство sectionMapRef необходимо создать с помощью useRef и инициализировать, как new Map().
Это позволит хранить пары ключ-значение, где ключом будет идентификатор секции типа string, а значением — соответствующий DOM-элемент.

Каждый элемент массива items состоит из 3-х свойств:
- value - уникальное значение элемента, являющееся его идентификатором;
- label - название раздела;
- textHint (опционально) - текст подсказка, дополнительная информация, которая описывает детали раздела.
```

### raw props type
```ts
export type TAnchorMenuProps = TUseScrollSpyParams & Pick<TBaseMenu, 'items'> & {
    isLoading?: boolean;
    skeletonCount?: 4 | 5 | 6;
};
```

### demo examples found
<!-- navigation/AnchorMenu/ui/AnchorMenuDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { useRef } from 'react'

import { FlexBox, AnchorMenu, Paper } from '../../../../src'
import { sectionsMocks } from '../../lib/sectionsMocks'

export const AnchorMenuDemo = (props: ComponentProps<typeof AnchorMenu>) => {
    const paperRef = useRef<HTMLDivElement | null>(null)
    const sectionMapRef = useRef<Map<string, HTMLDivElement>>(new Map())

    return (
        <FlexBox gap={3} height="45vh">
            <Paper ref={paperRef} flexDirection="column" gap={4} overflow="auto">
                {sectionsMocks.map((section) => (
                    <div
                        key={section.value}
                        ref={(node) => {
                            if (node) {
                                sectionMapRef.current.set(section.value, node)
                            }
                        }}
                    >
                        {section.content}
                    </div>
                ))}
            </Paper>
            <AnchorMenu {...props} containerScrollRef={paperRef} items={sectionsMocks} sectionMapRef={sectionMapRef} />
        </FlexBox>
    )
}
```

---

## SegmentProvider
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core

propsType: TSegmentProviderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
@deprecated Данный провайдер устарел, используйте _HostProvider_
```

### raw props type
```ts
export type TSegmentProviderProps = PropsWithChildren<TSegmentContextProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Tabs
tier: A · origin: cs-core · usedByApps: true · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TTabsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [Tabs](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-tabcontent-tabs--docs) является шаблоном вкладок.

Принимает следующие свойства:
- view (по умолчанию 'outer') - вид вкладок. Вид 'outer' отвечает за расположение вне Paper, а вид 'inner' - внутри Paper;
- items - массив объектов, предоставляющий собой контент каждой вкладки (обязательное свойство);
- value - Значение выбранной вкладки. (обязательное свойство);
- onChange - Функция для изменения выбранной вкладки. (обязательное свойство);
- selectedTabId - __deprecated__ используйте `value`. ID выбранной вкладки;
- setSelectedTabId - __deprecated__ используйте `onChange`. Функция для изменения выбранной вкладки;
- portal - свойство для Dropdown из SDDS;

Каждый элемент массива items состоит из двух обязательных свойств:
- value - Значение вкладки;
- label - Название вкладки;
- id - __deprecated__ используйте `value`. уникальный ID вкладки;
- title - __deprecated__ используйте `label`. название вкладки;
- visible (опционально) - свойство, которое определяет, что вкладка будет, или не будет отображаться в списке вкладок;
- contentRight (опционально) - контент, который будет отображаться справа от названия вкладки. При `view = 'outer'` доступен только counter,
а при `view = 'inner'` доступен как counter, так и вспомогательный текст.

**contentRight** состоит из двух свойств: **variant** `('counter' | 'text')`и **value**, соответственно `number`, если выбран счётчик, и `string`,
если выбран текст.

Обратите внимание, что в ситуациях, когда табы перестают помещаться в ширину, то при  `view = 'outer'` часть табов группируются в кебаб-меню,
а при при  `view = 'inner'` к компоненту добавляется иконка стрелки для прокрутки табов.
```

### raw props type
```ts
export type TTabsProps = {
    /** Массив табов.*/
    items: Omit<TTab, 'content'>[];
    /** Свойство для Dropdown из SDDS.*/
    portal?: string | RefObject<HTMLElement>;
} & TTabsOnChange;
```

### demo examples found
<!-- components/TabContent/Tabs/ui/TabsDemo.tsx -->
```tsx
import type { TBaseTabsProps } from '../../../../../src/components/TabContent/Tabs/types'

import { useState } from 'react'

import { FlexBox } from '../../../../../src'
import { Tabs } from '../../../../../src'

export const TabsDemo = ({ view, items }: TBaseTabsProps) => {
    const [value, setValue] = useState(items[0].value)

    return (
        <FlexBox flexDirection="column" gap={3}>
            <FlexBox>
                <Tabs items={items} value={value} view={view} onChange={setValue} />
            </FlexBox>
        </FlexBox>
    )
}
```

---

## TextMenu
tier: A · origin: cs-core · usedByApps: false · fromSpec: ./navigations/TextMenu

propsType: TTextMenuProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент TextMenu используется для организации навигации по страницам.

**Внимание:** компонент располагается строго слева от навигируемого контейнера на расстоянии 24px!

**Применение:**

Используйте текстовое меню для отображения определенных функций объёмного сценария и разделов контента. Текстовое меню позволяет разместить более
подробное описание каждого пункта. Элемент содержит список ссылок, которые переключают содержимое контента.
Наименования разделов в меню должны быть короткими, понятными, информативными и соответствовать ожиданиям пользователей.
Текстовое меню состоит из 3-10 пунктов, так как большее количество может затруднить навигацию и сделать меню слишком длинным.
Текст в каждом пункте начинается с прописной буквы, остальные строчные, соблюдая правила русского языка.

**Использование:**

TextMenu принимает следующие свойства:
- items - массив объектов, предоставляющий собой набор ссылок;
- activeItem - value активной ссылки;
- onChangeActiveItem - функция, которая будет вызвана при выборе другого элемента;
- isLoading (опционально) - флаг загрузки данных в компоненте;
- skeletonCount (опционально) - количество скелетонов загрузки данных.

Каждый элемент массива items состоит из 3-х свойств:
- value - уникальное значение элемента, являющееся его идентификатором;
- label - название раздела;
- textHint (опционально) - текст подсказка, дополнительная информация, которая описывает детали раздела.
```

### raw props type
```ts
export type TTextMenuProps = TBaseMenu & {
    isLoading?: boolean;
    skeletonCount?: 4 | 5 | 6;
};
```

### demo examples found
<!-- navigation/TextMenu/ui/TextMenuDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { BodyM } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FlexBox, TextMenu, Paper } from '../../../../src'
import { itemsTextMenuMocks } from '../../lib/itemsTextMenuMocks'

export const TextMenuDemo = (props: ComponentProps<typeof TextMenu>) => {
    const [activeLink, setActiveLink] = useState('v-3')
    const activeItem = itemsTextMenuMocks.find((item) => item.value === activeLink)

    return (
        <FlexBox gap={3}>
            <TextMenu
                {...props}
                activeItem={activeLink}
                items={itemsTextMenuMocks}
                onChangeActiveItem={(e) => setActiveLink(e)}
            />
            <Paper flexDirection="column">
                <BodyM>выбран:{activeLink}</BodyM>
                <BodyM>Пример контента: {activeItem?.label}</BodyM>
            </Paper>
        </FlexBox>
    )
}
```

---

## useSegment
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Хук для получения текущего сегмента приложения.

Позволяет определить, в каком сегменте (ALPHA, SIGMA, INTERNET) работает приложение.

Требует `SegmentProvider`.

@returns {TSegment} Текущий сегмент ('ALPHA' по умолчанию)
@throws {Error} Если хук используется вне SegmentProvider

@deprecated Данный хук устарел, необходимо использовать `useHost + HostProvider`
```

### raw props type
```ts
export declare const useSegment: () => import("../..").TSegment;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ExternalNavigationProvider
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useExternalNavigate

propsType: TExternalNavigationProviderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
@deprecated Данный провайдер устарел, используйте _HostProvider_
```

### raw props type
```ts
export type TExternalNavigationProviderProps = PropsWithChildren<TExternalNavigationContextProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## IconTabContent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/IconTabContent

propsType: TIconTabContentProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент IconTabContent является шаблоном вкладок из иконок в боковой панели страницы.
```

### raw props type
```ts
export type TIconTabContentProps = {
    items: TIconTabContent[];
    /** Значение выбранной вкладки по умолчанию. */
    defaultValue?: TIconTabContent['value'];
    /** Функция, которая будет вызвана при изменении вкладки. */
    onChange?: (iconTab: TIconTabContent) => void;
};
```

### demo examples found
<!-- components/IconTabContent/IconTabContentDemo.tsx -->
```tsx
import {
    IconDocumentAttachOutline,
    IconDocumentInquirerOutline,
    IconHistory,
    IconMessageOutline,
} from '@salutejs/plasma-icons'
import { Button } from '@salutejs/sdds-cs'
import { type ComponentProps } from 'react'

import { EventsHistory, FlexBox, IconTabContent, StatusTrack, UploadSet } from '../../../src'
import { messagesWithRole } from '../Chat/lib/messagesWithRole'
import { ChatDemo } from '../Chat/ui/ChatDemo'
import { itemsAbstractEventHistory } from '../EventsHistory/lib/mocks'
import { itemsStatusTrack } from '../StatusTrack/lib/itemsStatusTrackMocks'

const ProductUploadSet = () => (
    <UploadSet
        abortVisible={false}
        downloadAllVisible={false}
        items={[
            {
                id: '1',
                name: 'Договор №10007859756',
                extension: 'docx',
                size: 102400,
                errorMessages: [],
            },
            {
                id: '2',
                name: 'Договор №10007859756',
                extension: 'docx',
                size: 204800,
                errorMessages: [],
            },
        ]}
        renameVisible={false}
        saveVisible={false}
        onFileUpload={() => {}}
    />
)

export const argsIconTabs: ComponentProps<typeof IconTabContent> = {
    items: [
        {
            value: '1',
            icon: IconDocumentAttachOutline,
            textTooltip: 'Документы',
            content: <ProductUploadSet />,
            header: {
                title: 'Документы',
            },
            footer: {
                buttons: [
                    <Button key="1" view="clear">
                        Отменить
                    </Button>,
                    <Button key="2">Сохранить</Button>,
                ],
            },
            quickFilters: {
                onChange: (item) => {
                    console.info('onChange', item)
                },
                view: 'clear',
                value: ['qf1'],
      
```

---

## IconTabs
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/IconTabs

propsType: TIconTabsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TIconTabsProps = {
    /** Массив табов-иконок*/
    items: TIconTab[];
    /** Функция для изменения выбранной вкладки.*/
    onChange: (iconTabValue: string) => void;
    /** Значение выбранной вкладки.*/
    value?: string;
    /** Портал для тултипа */
    portal?: ComponentProps<typeof Tooltip>['portal'];
};
```

### demo examples found
<!-- components/IconTabs/IconTabsDemo.tsx -->
```tsx
import {
    IconDocumentAttachOutline,
    IconDocumentInquirerOutline,
    IconHistory,
    IconMessageOutline,
} from '@salutejs/plasma-icons'
import { useState, type ComponentProps } from 'react'

import { IconTabs } from '../../../src'

export const argsIconTabs: ComponentProps<typeof IconTabs> = {
    items: [
        {
            value: '1',
            icon: IconDocumentAttachOutline,
            textTooltip: 'Документы',
        },
        {
            value: '12',
            icon: IconHistory,
            textTooltip: 'История',
        },
        {
            value: '13',
            icon: IconMessageOutline,
            textTooltip: 'Чат',
        },
        {
            value: '14',
            icon: IconDocumentInquirerOutline,
            textTooltip: 'Статусы',
        },
    ],
    value: '1',
    onChange: () => {},
}

export const IconTabsDemo = (args: ComponentProps<typeof IconTabs>) => {
    const [value, setValue] = useState(args.value)

    return <IconTabs items={args.items} value={value} onChange={setValue} />
}
```

---

## MultiSegments
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/segments

propsType: TMultiSegmentsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TMultiSegmentsProps<TValue extends string | object = string, TItem extends TSegmentsItem<TValue> = TSegmentsItem<TValue>> = {
    /** Группы сегментов. */
    groups: Pick<TSegmentsProps<TValue, TItem>, 'items' | 'required' | 'resetOptions' | 'renderItem'>[];
    /** Функция, которая будет вызвана при изменении выбранного сегмента. */
    onChange: (item: TItem) => void;
    /** CSS-класс. */
    className?: string;
} & TValueOptions<TValue, TItem> & Pick<TSegmentsProps<TValue, TItem>, 'view'>;
```

### demo examples found
<!-- components/segments/MultiSegments/ui/MultiSegmentsDemo.tsx -->
```tsx
import type { TViewType } from '../lib/types'

import type { ComponentProps } from 'react'

import { useState } from 'react'

import { MultiSegments } from '../../../../../src'

export const MultiSegmentsDemo = ({ groups, view }: ComponentProps<typeof MultiSegments<TViewType>>) => {
    const [selectedValues, setSelectedValues] = useState<TViewType[]>([])

    return (
        <MultiSegments<TViewType>
            groups={groups}
            value={selectedValues}
            view={view}
            onChange={(selectedItem) => {
                if (selectedValues.includes(selectedItem.value)) {
                    setSelectedValues(selectedValues.filter((value) => value !== selectedItem.value))
                } else {
                    setSelectedValues([...selectedValues, selectedItem.value])
                }
            }}
        />
    )
}
```
<!-- components/segments/MultiSegments/ui/MultiSegmentsSingleDemo.tsx -->
```tsx
import type { TViewType } from '../lib/types'

import type { ComponentProps } from 'react'

import { useState } from 'react'

import { MultiSegments } from '../../../../../src'

export const MultiSegmentsSingleDemo = ({ groups, view }: ComponentProps<typeof MultiSegments<TViewType>>) => {
    const [selectedValue, setSelectedValue] = useState<TViewType>('main')

    return (
        <MultiSegments<TViewType>
            groups={groups}
            value={[selectedValue]}
            view={view}
            onChange={(selectedItem) => setSelectedValue(selectedItem.value)}
        />
    )
}
```

---

## navigateFallback
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useExternalNavigate

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const navigateFallback: NavigateFunction;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Segments
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/segments

propsType: TSegmentsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TSegmentsProps<TValue extends string | object = string, TItem extends TSegmentsItem<TValue> = TSegmentsItem<TValue>> = {
    /** Массив сегментов. */
    items: TItem[];
    /** Функция, которая будет вызвана при изменении выбранного сегмента. */
    onChange: (item: TItem) => void;
    /** Флаг обязательного выбора сегмента. */
    required?: boolean;
    /** Настройки кнопки сброса. */
    resetOptions?: TResetOptions;
    /** Вид сегментов. 'default' - на белом фоне. 'clear' - на сером фоне. 'onDark' - на темном фоне.*/
    view?: 'default' | 'onDark' | 'clear';
    /** CSS-класс. */
    className?: string;
    /** Функция для отображения кастомного элемента. */
    renderItem?: (props: TSegmentsRenderItemProps<TValue, TItem>) => ReactNode;
} & TValueOptions<TValue, TItem>;
```

### demo examples found
<!-- components/segments/Segments/ui/SegmentsDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { useState } from 'react'

import { Segments } from '../../../../../src'

export const SegmentsDemo = ({ items, view }: ComponentProps<typeof Segments<string>>) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    return (
        <Segments
            items={items}
            value={selectedValues}
            view={view}
            onChange={(selectedItem) => {
                if (selectedValues.includes(selectedItem.value)) {
                    setSelectedValues(selectedValues.filter((value) => value !== selectedItem.value))
                } else {
                    setSelectedValues([...selectedValues, selectedItem.value])
                }
            }}
        />
    )
}
```
<!-- components/segments/Segments/ui/SegmentsSingleDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { useState } from 'react'

import { Segments } from '../../../../../src'

export const SegmentsSingleDemo = ({ items, view }: ComponentProps<typeof Segments<string>>) => {
    const [selectedValue, setSelectedValue] = useState<string>('1')

    return (
        <Segments
            required
            items={items}
            value={[selectedValue]}
            view={view}
            onChange={({ value }) => setSelectedValue(value)}
        />
    )
}
```

---

## TabContent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/TabContent

propsType: TTabContentProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент TabContent является шаблоном вкладок.

Принимает следующие свойства:

items - массив объектов, предоставляющий собой контент каждой вкладки (обязательное свойство).
- defaultValue - Значение выбранной вкладки по умолчанию.
- initialItemId - __deprecated__ используйте `defaultValue` - ID выбранной вкладки по умолчанию
- onChange - функция, которая будет вызвана при изменении вкладки
- portal - свойство для Dropdown из SDDS
- view (по умолчанию 'outer') - вид вкладок. Вид 'outer' отвечает за расположение вне Paper, а вид 'inner' - внутри Paper;
- isLoading (опционально) - флаг загрузки данных в компоненте;
- skeletonCount (опционально) - количество скелетонов загрузки данных.

Каждый элемент массива items состоит из 4-х свойств:
- id - уникальный ID вкладки
- title - название вкладки.
- content (необязательное свойство) - контент вкладки, представляющий собой любую ReactNode
- visible (необязательное свойство) - флаг видимости элемента.
```

### raw props type
```ts
export type TTabContentProps<Tab extends TTab = TTab> = {
    items: Tab[];
    /**
     * @deprecated Это свойство устарело используйте defaultValue
     */
    initialItemId?: Tab['id'];
    /** Значение выбранной вкладки по умолчанию. */
    defaultValue?: Tab['value'];
    /** Функция, которая будет вызвана при изменении вкладки. */
    onChange?: (tab: Tab) => void;
    /** Свойство для Dropdown из SDDS */
    portal?: string | RefObject<HTMLElement>;
    /** Вид вкладок. Вид 'outer' отвечает за расположение вне Paper, а вид 'inner' - внутри Paper */
    view?: 'outer' | 'inner';
} & TSkeletonType;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useExternalNavigate
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useExternalNavigate

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Хук для навигации во внешних разделах приложения.

Позволяет использовать навигацию за пределами React Router (например, в модалках,
которые рендерятся вне основного дерева React). Работает через контекст,
поэтому требует обертки в `ExternalNavigationProvider`.

Возвращает функцию навигации, совместимую с react-router
Если хук используется вне провайдера, то выбрасывает ошибку

@deprecated Данный хук устарел, необходимо использовать `useHost + HostProvider`
```

### raw props type
```ts
export declare const useExternalNavigate: () => import("react-router").NavigateFunction;
```

### demo examples found
<!-- notifications/useExternalNavigate/ui/UseExternalNavigateDemo.tsx -->
```tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const UseExternalNavigateDemo = () => {
    const code = `
import type { ProviderParams } from '@module-federation/bridge-react'
import { useExternalNavigate, ExternalNavigationProvider, navigateFallback, CSProvider } from '@sber-front-cs-core/cs-core'
import { store } from './store'

type TAppProps = {
    externalNavigate?: NavigateFunction
} & ProviderParams

export const App = ({ basename, externalNavigate }: TAppProps) => {

  if (!externalNavigate) {
      console.error('host did not pass externalNavigation')
  }

  return (
    <Provider store={store}>
      <ExternalNavigationProvider externalNavigate={externalNavigate ?? navigateFallback}>
        <CSProvider>
          <Suspense fallback={<StatusPage view="loading" />}>
              <RouterProvider router={createBrowserRouter(routes, { basename })} />
          </Suspense>
        </CSProvider>
      </ExternalNavigationProvider>
    </Provider>
  )
}
`

    return (
        <SyntaxHighlighter language="tsx" style={oneLight}>
            {code}
        </SyntaxHighlighter>
    )
}
```

---

## useTabContent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/TabContent

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const useTabContent: <Tab extends TTabBase = TTab>({ items, defaultValue, onChange, }: TUseTabContentParams<Tab>) => {
    selectedTab: Tab | undefined;
    selectedTabValue: string | undefined;
    setSelectedTabValue: (newValue: string) => void;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---
