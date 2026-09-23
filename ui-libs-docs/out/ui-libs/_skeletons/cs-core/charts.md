<!-- SKELETON for cs-core/charts.md — raw material only, not the final doc. 9 symbols. -->

## HorizontalBar

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/bars/HorizontalBar

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
[__HorizontalBar__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-horizontalbar--docs) - Компонент визуализации горизонтальных столбчатых
диаграмм. Предоставляет удобное сравнение показателей по категориям через горизонтальные столбцы с интерактивными возможностями.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- А также свойства ResponsiveBar (valueFormat, colors, colorBy, layout, margin, theme и т.д.)

- Для пользовательской логики при клике по всему виджету используйте `widgetOnClick` (он имеет приоритет над `href`).

@summary компонент визуализации горизонтальных столбчатых диаграмм с интерактивностью для сравнения показателей по категориям
```

### raw props type

```ts
export declare const HorizontalBar: <D extends TWidgetItem>({
    data,
    onClick,
    tooltip,
    getHref,
    navigate,
    valueFormat: customValueFormat,
    enableTooltip,
    percentDecimalScale,
    ...rest
}: TBarProps<D>) => import('react').JSX.Element
```

### demo examples found

<!-- widgets/Bars/HorizontalBar/HorizontalBarDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { BodyM } from '@salutejs/sdds-cs'

import { FlexBox, HorizontalBar } from '../../../../src'

export const HorizontalBarDemo = (props: Partial<ComponentProps<typeof HorizontalBar>>) => {
    return (
        <FlexBox flexDirection="column" gap={2} height="100%">
            <BodyM bold>Доля участия руководителей направлений</BodyM>
            <HorizontalBar
                data={[
                    { id: 'Выполнено', value: 92, label: 'Левин Л. Н.' },
                    { id: 'В работе', value: 50, label: 'Шайдеман Д. Г.' },
                    { id: 'На согласование', value: 15, label: 'Васин В. В.' },
                    { id: 'Подписание', value: 24, label: 'Петров П. П.' },
                    { id: 'Отклонено', value: 21, label: 'Сидоров С. С.' },
                ]}
                {...props}
            />
        </FlexBox>
    )
}
```

---

## Line

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/Line

propsType: TLineProps (source: cs-core)

### raw description (RU, from JSDoc)

```
[Line](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-areagradients--docs) — Компонент линейного графика с градиентными областями на основе Nivo Line.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив серий данных; каждая серия расширяет `TWidgetItem` (содержит `id`, `label`, опциональный `unit`) и массив точек `data: { x, y }[]`;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на серию (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для серии (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике, если не задан `onClick`;
- А также свойства `ResponsiveLine` (curve, enableArea, margin, theme и т.д.)

@summary компонент линейного графика с градиентными областями под линиями
```

### raw props type

```ts
export type TLineProps<S extends TLineDatum, D extends TLineItem<S>> = {
    /** Массив серий данных */
    data: D[]
} & TLineTooltip<S, D> &
    Omit<LineSvgProps<D>, 'data' | 'tooltip' | 'height' | 'width' | 'colors'> &
    TClickableLayerProps<D>
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## Pie

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/Pie

propsType: TPieProps (source: cs-core)

### raw description (RU, from JSDoc)

```
[__Pie__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-pie--docs) - Компонент круговой диаграммы на основе Nivo Pie с расширенной интерактивностью.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `legendTitle` - заголовок легенды диаграммы;
- `legendItemCountVisible` - флаг для управления видимостью суммы у элементов легенды;
- `legendMaxHeight` - максимальная высота легенды;
- `centeredMetricPostfixVisible` - флаг для управления видимостью надписи после общего количества элементов;
- `centeredMetricPostfix` - текст надписи после общего количества;
- `centeredMetric` - кастомный компонент для отображения в центре диаграммы (по умолчанию отображается сумма значений);
- `valueFormat` и `arcLabel` из ResponsivePie

Секторы, подписи которых накладываются друг на друга, схлопываются в один сектор «Прочее»:
в легенде он раскрывается списком, в тултипе показывается строка на каждый вошедший элемент.

**Правильное применение ссылок:**
- Для перехода на детальную страницу элемента диаграммы используйте `getHref + navigate`.
```

<Pie
data={data}
getHref={(item) => `/detail/${item.id}`}
navigate={navigate}
/>

```
- Для пользовательской логики при клике на элемент используйте `onClick` (он имеет приоритет над `navigate`).

@summary компонент круговой диаграммы на основе Nivo с расширенной интерактивностью
```

### raw props type

```ts
export type TPieProps<D extends TPieItem> = {
    /** Массив данных для диаграммы */
    data: D[]
    /** Кастомный компонент тултипа */
    tooltip?: FC<
        PieTooltipProps<D> & {
            formatPercent: (item: D) => string
            groupedItems: D[]
        }
    >
    /** Заголовок легенды диаграммы */
    legendTitle?: string
    /** Флаг видимости суммы элементов в легенде */
    legendItemCountVisible?: boolean
    /** Максимальная высота легенды */
    legendMaxHeight?: CSSProperties['height']
    /** Флаг видимости постфикса метрики в центре диаграммы */
    centeredMetricPostfixVisible?: boolean
    /** Текст постфикса метрики в центре диаграммы */
    centeredMetricPostfix?: string
    /** Кастомный компонент метрики в центре диаграммы */
    centeredMetric?: FC<
        PieCustomLayerProps<D> & {
            centeredMetricPostfixVisible?: boolean
            centeredMetricPostfix?: string
        }
    >
    /** Выбранная легенда */
    selectedId?: string
    /** Флаг включения/отключения тултипа */
    enableTooltip?: boolean
} & TPropsFromResponsivePie<D> &
    TClickableLayerProps<D> &
    TPercentDecimalScale
```

### demo examples found

<!-- components/Pie/ui/PieDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { IconInfoCircleOutline } from '@salutejs/plasma-icons'
import { BodyM } from '@salutejs/sdds-cs'

import { FlexBox, Pie } from '../../../../src'

export const argsPieDemo: ComponentProps<typeof Pie> = {
    data: [
        { id: 'Выполнено', value: 92, label: 'Левин Л. Н.' },
        {
            id: 'В работе',
            value: 50,
            label: 'Шайдеман Д. Г.',
            icon: IconInfoCircleOutline,
            textTooltip: 'Дополнительная информация о руководителе',
        },
        { id: 'На согласование', value: 3, label: 'Васин В. В.' },
    ],
    centeredMetricPostfixVisible: true,
    centeredMetricPostfix: 'шт.',
    onClick: undefined,
}

export const PieDemo = (props: ComponentProps<typeof Pie>) => {
    return (
        <FlexBox flexDirection="column" gap={2}>
            <BodyM bold>Доля участия руководителей направлений</BodyM>
            <Pie
                centeredMetricPostfix="шт."
                centeredMetricPostfixVisible={true}
                getHref={(item) => `/?${item.id}`}
                navigate={console.info} // указано для логирования. В приложении надо указывать navigate из useNavigate.
                {...props}
                data={props.data}
            />
        </FlexBox>
    )
}
```

<!-- components/Pie/ui/PieSelectedLegendDemo.tsx -->

```tsx
import { BodyM } from '@salutejs/sdds-cs'
import { useState, type ComponentProps } from 'react'

import { FlexBox, Pie } from '../../../../src'

export const argsPieSelectedLegendDem: ComponentProps<typeof Pie> = {
    data: [
        { id: 'Выполнено', value: 92, label: 'Левин Л. Н.' },
        { id: 'В работе', value: 50, label: 'Шайдеман Д. Г.' },
        { id: 'На согласование', value: 3, label: 'Васин В. В.' },
    ],
    centeredMetricPostfixVisible: true,
    centeredMetricPostfix: 'шт.',
}

export const PieSelectedLegendDemo = (props: ComponentProps<typeof Pie>) => {
    const [selectedLegend, setSelectedLegend] = useState('В работе')

    return (
        <FlexBox flexDirection="column" gap={2}>
            <BodyM bold>Доля направлений</BodyM>
            <Pie
                centeredMetricPostfix="шт."
                centeredMetricPostfixVisible={true}
                selectedId={selectedLegend}
                {...props}
                data={props.data}
                onClick={(e, data) => {
                    e.preventDefault()
                    setSelectedLegend(data.id)
                }}
            />
        </FlexBox>
    )
}
```

---

## VerticalBar

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/bars/VerticalBar

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
[__VerticalBar__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-verticalbar--docs) - Компонент визуализации вертикальных столбчатых
диаграмм. Предоставляет удобное сравнение показателей по категориям через вертикальные столбцы с интерактивными возможностями.

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- А также свойства ResponsiveBar (valueFormat, colors, colorBy, layout, margin, theme и т.д.)

@summary компонент визуализации вертикальных столбчатых диаграмм с интерактивностью для сравнения показателей по категориям
```

### raw props type

```ts
export declare const VerticalBar: <D extends TWidgetItem = TWidgetItem>({
    data,
    onClick,
    getHref,
    navigate,
    tooltip,
    valueFormat: customValueFormat,
    enableTooltip,
    percentDecimalScale,
    ...rest
}: TBarProps<D>) => import('react').JSX.Element
```

### demo examples found

<!-- widgets/Bars/VerticalBar/VerticalBarDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { VerticalBar } from '../../../../src'

export const VerticalBarDemo = (props: Partial<ComponentProps<typeof VerticalBar>>) => {
    return (
        <VerticalBar
            data={[
                { id: 'Выполнено', value: 92, label: 'Левин Л. Н.' },
                { id: 'В работе', value: 50, label: 'Шайдеман Д. Г.' },
                { id: 'На согласование', value: 15, label: 'Васин В. В.' },
                { id: 'Подписание', value: 24, label: 'Петров П. П.' },
                { id: 'Отклонено', value: 21, label: 'Сидоров С. С.' },
            ]}
            {...props}
        />
    )
}
```

---

## WidgetHorizontalBar

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetHorizontalBar

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
[__WidgetHorizontalBar__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-widgethorizontalbar--docs) - Компонент визуализации горизонтальных столбчатых диаграмм. Предоставляет удобное сравнение показателей по категориям через горизонтальные столбцы с интерактивными возможностями.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- А также свойства ResponsiveBar (valueFormat, colors, colorBy, layout, margin, theme и т.д.)

**Правильное применение ссылок:**
- Для перехода на детальную страницу элемента диаграммы используйте `getHref + navigate`:
```

<WidgetHorizontalBar
data={data}
getHref={(item) => `/detail/${item.id}`}
navigate={navigate}
/>

```
- Для пользовательской логики при клике на элемент используйте `onClick` (он имеет приоритет над `navigate`).

- Для перехода по виджету целиком используйте `href + navigate`:
```

<WidgetHorizontalBar
    data={data}
    href="/details"
    navigate={navigate}
  />

```
- Для пользовательской логики при клике по всему виджету используйте `widgetOnClick` (он имеет приоритет над `href`).

@summary компонент визуализации горизонтальных столбчатых диаграмм с интерактивностью для сравнения показателей по категориям
```

### raw props type

```ts
export declare const WidgetHorizontalBar: <D extends TWidgetItem>({
    data,
    navigate,
    ...rest
}: TWidgetBarProps<D>) => import('react').JSX.Element
```

### demo examples found

<!-- widgets/WidgetHorizontalBar/WidgetHorizontalBarDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { WidgetHorizontalBar } from '../../../src'

export const WidgetHorizontalBarDemo = ({ data, ...rest }: ComponentProps<typeof WidgetHorizontalBar>) => {
    return (
        <WidgetHorizontalBar
            data={data}
            getHref={(item) => `/?${item.id}`}
            href="/my-app"
            navigate={console.info}
            {...rest}
        />
    )
}
```

---

## WidgetLine

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetLine

propsType: TWidgetLineProps (source: cs-core)

### raw description (RU, from JSDoc)

```
[__WidgetLine__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-widgetareagradients--docs) — виджет линейного графика с градиентными областями на основе Line.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив серий данных; каждая серия расширяет `TWidgetItem` (содержит `id`, `label`, опциональный `unit`) и массив точек `data: { x, y }[]`;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на серию (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для серии (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике, если не задан `onClick`;
- А также свойства `ResponsiveLine` (curve, enableArea, margin, theme и т.д.)

@summary компонент визуализации линейного графика с градиентными областями под линиями
```

### raw props type

```ts
export type TWidgetLineProps<D extends TLineItem<TLineDatum>> = TLineProps<TLineDatum, D> & TWidgetPaperProps
```

### demo examples found

(none — write a minimal example by hand from the props)

---

## WidgetPie

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetPie

propsType: TWidgetPieProps (source: cs-core)

### raw description (RU, from JSDoc)

```
[__WidgetPie__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-widgetpie--docs) - Компонент визуализации круговых диаграмм с интерактивностью и настраиваемостью. Позволяет удобно отображать доли различных категорий данных и взаимодействовать с ними через клики и изменения активного состояния сегментов.

__Цветовая схема__
<div style="display:flex; flex-wrap: wrap; gap: 1rem; font-size: 12px;">
  <span style="background-color:#F7BFC5; padding: .5em;">#F7BFC5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BFC5, #F7BFC5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BFC5</span>
  <span style="background-color:#F5DEB2; padding: .5em;">#F5DEB2</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F5DEB2, #F5DEB2 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F5DEB2</span>
  <span style="background-color:#EEEB9B; padding: .5em;">#EEEB9B</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #EEEB9B, #EEEB9B 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#EEEB9B</span>
  <span style="background-color:#D4ECA7; padding: .5em;">#D4ECA7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D4ECA7, #D4ECA7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D4ECA7</span>
  <span style="background-color:#A9F4DF; padding: .5em;">#A9F4DF</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #A9F4DF, #A9F4DF 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#A9F4DF</span>
  <span style="background-color:#B2E7F5; padding: .5em;">#B2E7F5</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #B2E7F5, #B2E7F5 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#B2E7F5</span>
  <span style="background-color:#BBD2F7; padding: .5em;">#BBD2F7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #BBD2F7, #BBD2F7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#BBD2F7</span>
  <span style="background-color:#E1BFF7; padding: .5em;">#E1BFF7</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #E1BFF7, #E1BFF7 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#E1BFF7</span>
  <span style="background-color:#F7BBED; padding: .5em;">#F7BBED</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #F7BBED, #F7BBED 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#F7BBED</span>
  <span style="background-color:#D5DFE6; padding: .5em;">#D5DFE6</span>
  <span style="color: transparent; background: repeating-linear-gradient(-45deg, #D5DFE6, #D5DFE6 4.5px, #ffffff 4.5px, #ffffff 7px); padding: .5em;">#D5DFE6</span>
</div>

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- `legendTitle` - заголовок легенды диаграммы;
- `legendItemCountVisible` - флаг для управления видимостью суммы у элементов легенды;
- `legendMaxHeight` - максимальная высота легенды;
- `centeredMetricPostfixVisible` - флаг для управления видимостью надписи после общего количества элементов;
- `centeredMetricPostfix` - текст надписи после общего количества;
- `centeredMetric` - кастомный компонент для отображения в центре диаграммы (по умолчанию отображается сумма значений);
- А также свойства `valueFormat` и `arcLabel` из ResponsivePie

**Правильное применение ссылок:**
- Для перехода на детальную страницу элемента диаграммы используйте `getHref + navigate`:
```

<WidgetPie
data={data}
getHref={(item) => `/detail/${item.id}`}
navigate={navigate}
/>

```
- Для пользовательской логики при клике на элемент используйте `onClick` (он имеет приоритет над `navigate`).

- Для перехода по виджету целиком используйте `href + navigate`:
```

<WidgetPie
    data={data}
    href="/details"
    navigate={navigate}
  />

```
- Для пользовательской логики при клике по всему виджету используйте `widgetOnClick` (он имеет приоритет над `href`).

@summary компонент визуализации круговых диаграмм с интерактивностью для отображения долей категорий
```

### raw props type

```ts
export type TWidgetPieProps<WidgetItem extends TPieItem> = TPieProps<WidgetItem> &
    Omit<TWidgetPaperProps, 'onMouseEnter' | 'onMouseLeave' | 'ref'>
```

### demo examples found

<!-- widgets/WidgetPie/WidgetPieDemo.tsx -->

```tsx
import type { ComponentProps } from 'react'

import { IconInfoCircleOutline } from '@salutejs/plasma-icons'
import { useEffect, useState } from 'react'

import { SimpleDatePicker } from './SimpleDatePicker'
import { FlexBox, WidgetPie, type TPieItem } from '../../../src'
import { Box } from '../../../src/layouts/Box'

export const argsWidgetPie: ComponentProps<typeof WidgetPie> = {
    title: 'Сервис по сопровождению',
    legendTitle: 'Легенда в шт.',
    data: [
        { id: 'Выполнено', value: 50, label: 'Выполнено', unit: 'шт.', color: '#F7BBED' },
        { id: 'В работе', value: 2, label: 'В работе', unit: 'шт.' },
        {
            id: 'На согласование',
            value: 3,
            label: 'На согласование',
            unit: 'шт.',
            icon: IconInfoCircleOutline,
            textTooltip: 'Дополнительная информация о руководителе',
        },
        { id: 'Подписание', value: 24, label: 'Подписание', unit: 'шт.' },
        { id: 'Отклонено', value: 21, label: 'Отклонено', unit: 'шт.' },
        { id: 'Отклонено1', value: 21, label: 'Отклонено1', unit: 'шт.' },
        { id: 'Отклонено2', value: 21, label: 'Отклонено2', unit: 'шт.' },
        { id: 'Отклонено3', value: 21, label: 'Отклонено3', unit: 'шт.' },
        { id: 'Отклонено4', value: 21, label: 'Отклонено4', unit: 'шт.' },
        {
            id: 'Отклонено5',
            value: 21,
            label: 'Отклонено5',
            unit: 'шт.',
            icon: IconInfoCircleOutline,
            textTooltip: 'Дополнительная информация о руководителе',
        },
        { id: 'Отклонено6', value: 21, label: 'Отклонено6', unit: 'шт.' },
    ],
    centeredMetricPostfixVisible: true,
    legendItemCountVisible: false,
    centeredMetricPostfix: 'шт.',
    enableTooltip: true,
}

export const WidgetPieDemo = <WidgetItem extends TPieItem>({
    data,
    ...rest
}: ComponentProps<typeof WidgetPie<WidgetItem>>) => {
    const [date, setDate] = useState<Date>(new Date('2025-05-21'))
    co
```

---

## WidgetStackedHorizontalBar

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetStackedHorizontalBar

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
[__WidgetStackedHorizontalBar__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-widgetstackedhorizontalbar--docs) - Компонент визуализации горизонтальных столбчатых диаграмм с разделением на категории внутри одного столбца.

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- `colorBy` - способ определения цвета;
- `colors` - массив цветов;
- `fill` - режим заполнения стека;
- А также все свойства `ResponsiveBar`

**Правильное применение ссылок:**
- Для перехода на детальную страницу элемента диаграммы используйте `getHref + navigate`:
```

<WidgetStackedHorizontalBar
data={data}
getHref={(item) => `/detail/${item.id}`}
navigate={navigate}
/>

```
- Для пользовательской логики при клике на элемент используйте `onClick` (он имеет приоритет над `navigate`).

- Для перехода по виджету целиком используйте `href + navigate`:
```

<WidgetStackedHorizontalBar
    data={data}
    href="/details"
    navigate={navigate}
  />

```
- Для пользовательской логики при клике по всему виджету используйте `widgetOnClick` (он имеет приоритет над `href`).

@summary компонент визуализации горизонтальных столбчатых диаграмм с разделением на категории внутри одного столбца
```

### raw props type

```ts
export declare const WidgetStackedHorizontalBar: <D extends TStackedWidgetItem = TStackedWidgetItem>({
    data,
    onClick,
    getHref,
    navigate,
    tooltip,
    colorBy,
    colors,
    fill,
    enableTooltip,
    ...rest
}: TWidgetStackHorizontalBarProps<D>) => import('react').JSX.Element
```

### demo examples found

<!-- widgets/WidgetStackedHorizontalBar/WidgetStackedHorizontalBarDemo.tsx -->

```tsx
import type { TWidgetStackHorizontalBarProps } from '../../../src/widgets/WidgetStackedHorizontalBar/types'

import { BodyS, textSecondary } from '@salutejs/sdds-cs'
import { Tooltip } from '@salutejs/sdds-cs/beta'

import { DividerStyled } from './DividerStyled'
import { ClearButton, FlexBox, WidgetStackedHorizontalBar } from '../../../src'
import { colors } from '../../../src/widgets/lib'

export const WidgetStackedHorizontalBarDemo = (props: TWidgetStackHorizontalBarProps) => {
    return (
        <WidgetStackedHorizontalBar
            actions={
                <FlexBox alignItems="center" gap={0.5}>
                    <FlexBox gap={1}>
                        <Tooltip
                            delayClose={0}
                            placement="top"
                            target={
                                <ClearButton>
                                    <BodyS>Текущая</BodyS>
                                </ClearButton>
                            }
                            trigger="hover"
                        >
                            16.02.2026 - 20.02.2026
                        </Tooltip>
                        <DividerStyled length="14px" orientation="vertical" />
                        <Tooltip
                            delayClose={0}
                            placement="top"
                            target={
                                <ClearButton>
                                    <BodyS>прошлая</BodyS>
                                </ClearButton>
                            }
                            trigger="hover"
                        >
                            09.02.2026 - 13.02.2026
                        </Tooltip>
                    </FlexBox>
                    <BodyS color={textSecondary}>неделя</BodyS>
                </FlexBox>
            }
            colors={(d) => {
                if (d.id === 'прошлая неделя') {
                    return '#D5DFE6'
                }

```

---

## WidgetVerticalBar

tier: B · origin: cs-core · usedByApps: false · fromSpec: ./widgets/WidgetVerticalBar

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)

```
[__WidgetVerticalBar__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/widgets-widgetverticalbar--docs) - Компонент визуализации вертикальных столбчатых диаграмм. Предоставляет удобное сравнение показателей по категориям через вертикальные столбцы с интерактивными возможностями.

Компонент принимает следующие свойства:
- `data` - массив элементов диаграммы;
- `tooltip` - кастомный tooltip;
- `onClick` - обработчик клика на элемент графика (принимает `event` и `data`); имеет приоритет над `navigate` и `getHref`;
- `getHref` - функция генерации ссылки для элемента графика (принимает `data`, возвращает `string`); используется совместно с `navigate` для роутинга;
- `navigate` - функция роутинга (из `react-router`); вызывается при клике на элемент графика, если не задан `onClick`;
- `title` - заголовок виджета;
- `actions` - область для действий;
- `href` - ссылка для перехода по виджету целиком;
- `widgetOnClick` - обработчик клика по виджету целиком (имеет приоритет над `href` и `navigate`);
- `isEmpty` - состояние пустых данных;
- `hasFilters` - состояние фильтров;
- `isLoading` - состояние загрузки;
- `size` - размер виджета ( '1x1' | '2x1' | '2x2' | '4x2');
- А также свойства ResponsiveBar (valueFormat, colors, colorBy, layout, margin, theme и т.д.)

**Правильное применение ссылок:**
- Для перехода на детальную страницу элемента диаграммы используйте `getHref + navigate`:
```

<WidgetVerticalBar
data={data}
getHref={(item) => `/detail/${item.id}`}
navigate={navigate}
/>

```
- Для пользовательской логики при клике на элемент используйте `onClick` (он имеет приоритет над `navigate`).

- Для перехода по виджету целиком используйте `href + navigate`:
```

<WidgetVerticalBar
    data={data}
    href="/details"
    navigate={navigate}
  />

```
- Для пользовательской логики при клике по всему виджету используйте `widgetOnClick` (он имеет приоритет над `href`).

@summary компонент визуализации вертикальных столбчатых диаграмм с интерактивностью для сравнения показателей по категориям
```

### raw props type

```ts
export declare const WidgetVerticalBar: <D extends TWidgetItem = TWidgetItem>({
    data,
    navigate,
    ...rest
}: TWidgetBarProps<D>) => import('react').JSX.Element
```

### demo examples found

<!-- widgets/WidgetVerticalBar/WidgetVerticalBarDemo.tsx -->

```tsx
import type { TWidgetItem } from '../../../src'

import type { ComponentProps } from 'react'

import { WidgetVerticalBar } from '../../../src'

export const WidgetVerticalBarDemo = ({ data, ...rest }: ComponentProps<typeof WidgetVerticalBar<TWidgetItem>>) => {
    return (
        <WidgetVerticalBar
            data={data}
            getHref={(item) => `/?${item.id}`}
            href="/my-app"
            navigate={console.info}
            {...rest}
        />
    )
}
```

---
