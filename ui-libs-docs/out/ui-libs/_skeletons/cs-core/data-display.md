<!-- SKELETON for cs-core/data-display.md — raw material only, not the final doc. 63 symbols. -->

## Badge
tier: A · origin: cs-core · usedByApps: false · fromSpec: @sber-front-cs-core/cs-core
SHADOW NOTE: cs-portal gives the cs-core version; also defined in: sdds-cs (site)

propsType: TBadgeProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Badge](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-badge--docs) — компонент визуального индикатора для привлечения внимания к важной информации. Используйте его там, где он помогает быстрее считать информацию.

**Особенности:** это некликабельный элемент. Текст в маркере должен быть лаконичным — до двух слов и умещаться в одну строку, без точки в конце.
Ширина маркеров подстраивается под контент внутри.

Badge предоставляется в двух видах — статус-маркер и инфо-маркер и принимает обязательное свойство `view` ('status' | 'info'), которое переключает вид Badge.

Статус-маркер (`view = 'status'`) показывает состояние объекта в системе, при таком view Badge принимает следующие свойства:
- text - текст маркера;
- status - вид статуса, которое может принимать одно из следующих значений:
 - `new` - новый (используется по умолчанию);
 - `attention` - требует внимания;
 - `critical` - критичный;
 - `successful` - успешно завершённый;
 - `closed` - закрытый/архивированный;
 - `mobileOnClick` - клик для стрелки-кнопки, которая отображается только на мобильных экранах.

Инфо-маркер (`view = 'info'`) используется для обозначения вида документа или для указания на наличие важных событий или напоминаний и прочее. Компонент Badge
принимает в таком случе следующие свойства:
- color (по умолчанию skyBlue) - цвет маркера;
- text - текст маркера (взаимозаменяемый свойство с icon);
- icon - иконка маркера (взаимозаменяемое свойство с text), может быть одной из следующего набора:
 - fireOutline;
 - magic;
 - clockCircleOutline;
 - doneDouble;
 - percent;
- tooltipText - текст для отображения в тултипе (для `view = 'info'`);

**Внимание: ** нельзя одновременно использовать свойства `text` и `icon`.

@summary компонент визуального индикатора для привлечения внимания к важной информации
```

### raw props type
```ts
export type TBadgeProps = TPrettify<TBadgeView & TPropsFromBadgeSDDS>;
```

### demo examples found
<!-- components/Badge/ui/BadgeAllDemo.tsx -->
```tsx
import { Badge, FlexBox, Paper } from '../../../../src'
import { iconMap } from '../../../../src/components/Badge/lib'

const STATUS_BADGE = ['new', 'attention', 'critical', 'successful', 'closed'] as const
const COLOR_BADGE = [
    'red',
    'amber',
    'sunny',
    'spring',
    'arctic',
    'skyBlue',
    'electricBlue',
    'orchid',
    'fuchsia',
    'coolGray1',
    'coolGray2',
    'white',
] as const

export const BadgeAllDemo = () => {
    const iconKeys = Object.keys(iconMap) as Array<keyof typeof iconMap>

    return (
        <Paper flexDirection="column" gap={3} width="800px">
            <FlexBox gap={1}>
                {STATUS_BADGE.map((status) => (
                    <Badge key={`status-${status}`} status={status} text="Статус" view="status" />
                ))}
            </FlexBox>
            <FlexBox gap={1}>
                {COLOR_BADGE.map((color) => (
                    <Badge key={`info-text-${color}`} color={color} text="Label" view="info" />
                ))}
            </FlexBox>
            <FlexBox flexWrap="wrap" gap={1}>
                {COLOR_BADGE.flatMap((color) =>
                    iconKeys.map((iconKey) => (
                        <Badge key={`info-icon-${color}-${iconKey}`} color={color} icon={iconKey} view="info" />
                    ))
                )}
            </FlexBox>
        </Paper>
    )
}
```
<!-- components/Badge/ui/BadgeDemo.tsx -->
```tsx
import { Badge } from '../../../../src'

export const BadgeDemo = Badge
```

---

## AccordionContent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/AccordionContentLegacy

propsType: TAccordionContentLegacyProps (source: cs-core)

### raw description (RU, from JSDoc)
```
@deprecated Используйте AccordionContentNew
```

### raw props type
```ts
export type TAccordionContentLegacyProps = {
    /** Массив объектов для отображения в аккордеоне. */
    items: TAccordionContentLegacyItem[];
    /** Массив ID изначально открытых секций. */
    initialItemIds?: TAccordionContentLegacyItem['id'][];
    /** Обработчик изменения состояния секции. */
    onChange?: (item: TAccordionContentLegacyItem, isActive: boolean) => void;
};
```

### demo examples found
<!-- components/AccordionContent/AccordionContentDemo.tsx -->
```tsx
import { useState } from 'react'

import { AccordionContentNew } from '../../../src'
import { accordionItemsMock } from '../../lib/mocks/accordionItemsMock'

export const AccordionContentDemo = () => {
    const [value, setValue] = useState(['6'])
    return <AccordionContentNew items={accordionItemsMock} value={value} onChange={setValue} />
}
```

---

## AccordionContentNew
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/AccordionContent

propsType: TAccordionContentProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент-аккордеон для отображения набора секций с возможностью раскрытия и закрытия.
@remarks Свойства `label`, `content`, `value` каждой секции являются обязательными. Секции с `visible: false` скрываются при рендере.
```

### raw props type
```ts
export type TAccordionContentProps = {
    /** Массив секций. */
    items: TAccordionContentItem[];
    /** Массив открытых секций. */
    value: string[];
    /** Обработчик изменения состояния секции. */
    onChange?: (newValue: string[], item: TAccordionContentItem, event?: MouseEvent<HTMLElement, globalThis.MouseEvent> | number) => void;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Chat
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Chat

propsType: TChatProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Chat](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-chat--docs)-
компонент, представляющий собой интерфейс для обмена сообщениями между пользователями в реальном времени.

Компонент Chat включает в себя область ввода текста, кнопку отправки сообщения и список ранее отправленных сообщений, а также кнопку прикрепления вложений
и доп. элементами чата. Элементы чата располагаются на нейтральной подложке, которая обеспечивает читаемость текста и удобство использования. В чате добавлен
функционал ответа на сообщения и копирование текстового содержимого сообщения. Если тело сообщения было реализовано через ReactNode, то функционал копирования
будет недоступен. Текстовые сообщения от AI-агента можно копировать, но на них нельзя отвечать.


**Передаваемые свойства:**
 - `messages` - массив сообщений;
 - `onLike` (опционально) - коллбэк при лайке сообщения;
 - `onDislike` (опционально) - коллбэк при дизлайке сообщения;
 - `likeVisible` (опционально) - глобальный флаг видимости кнопок "Полезно/лайк" для всех сообщений (по умолчанию true);
 - `dislikeVisible` (опционально) - глобальный флаг видимости кнопок "Не полезно/дизлайк" для всех сообщений (по умолчанию true);
 - `onSuggestionClick` (опционально) - колбэк, который вызывается при нажатии на suggestion-кнопку (Если колбэк не будет прокинуть,
то клик по suggestion-кнопке будет вызывать onMessage при наличии.);
 - `onChangeIsRead` (опционально) - колбэк, который срабатывает при прочтении сообщений пользователем. Для того, чтобы прочитывание работало со стороны AI
нужно вручную менять флаг isRead у сообщений от пользователя;
 - `onReplyToMessage` (опционально) - колбэк, который срабатывает при ответе на сообщение;
 - `tabOptions` (опционально) - объект с частью свойств из компонента Tabs, для отображения табов внутри компонента;
 - `isChatClosed` (опционально) - флаг, что чат закрыт;
 - `isLoadingContent`(опционально) - флаг, что идёт загрузка контента чата;
 - `isLoadingTabs`(опционально) - флаг, что идёт загрузка табов для чата;
 - `typing` - (опционально) - массив объектов с полем role, который показывает, что кто-то из определённой роли набирает сообщение (свойство используется также
для запрета отправлять сообщение, когда AI агент отвечает);
- `visibleCopyMessageAction` (опционально) - флаг отображения экшена "скопировать" у каждого сообщения (по умолчанию true);
- `visibleReplyMessageAction` (опционально) - флаг отображения экшена "ответить" у каждого сообщения (по умолчанию true);
- `onChangeIsPinned` (опционально) - колбэк, который срабатывает при изменении состояния isPinned (булавки) у сообщения;
- `suggestionButtons` (опционально) - отображение вспомогательных кнопок в чате для бизнес-действий.
 - `Message` (опционально) - передаваемый компонент, который заменяет полностью тело сообщения. Должен принимать свойство messages;

**Взаимозаменяемые опциональные** свойства:<br />
- `header` или `title` c `icon`:
     - свойство header прокидывается в том случае, когда нужно полностью переопределить заголовок;
     - свойство title прокидывается для определение текста заголовка, icon в этом случае опционально.
     - если не передать ни одного из этих свойств — заголовок не будет отображён.

**Взаимозаменяемые обязательные** свойства:<br />
- `footer` или `onMessage` c `attachVisible`:
     - свойство footer прокидывается в том случае, когда нужно полностью переопределить компонент с полем ввода и отправки сообщения;
     - свойство onMessage является коллбэком отправки сообщения;
     - свойство attachVisible (опционально) - флаг включения функционала прикрепления файлов к сообщению (по умолчанию false).

Элемент из массива `messages` состоит из следующих параметров:
- `id` - идентификатор сообщения;
- `content` - текст/тело сообщения;
- `isUser` (опционально) - флаг, что сообщение исходящее и от пользователя;
- `like` (опционально) - флаг нажатия кнопки "Полезно/лайк" (по умолчанию false);
- `dislike` (опционально) - флаг нажатия кнопки "Не полезно/дизлайк" (по умолчанию false);
- `likeVisible` (опционально) - флаг отображения кнопки "Полезно/лайк" (по умолчанию true);
- `dislikeVisible` (опционально) - флаг отображения кнопки "Не полезно/дизлайк" (по умолчанию true);
- `suggestions` (опционально) - массив string - кнопок помощников, состоящий из двух обязательных свойств: `text` и `onClick`;
- `date` (опционально) - дата отправки сообщения в формате ISO;
- `role` (опционально) - к какой роли принадлежит сообщение:
  - inner - внутренний сотрудник;
  - external - внешний сотрудник;
  - system - сообщение от системы;
  - AI - сообщение от AI-ассистента;
- `isRead` (опционально) - флаг, прочитано сообщение или нет (использовать в связке с колбэком onChangeIsRead);
- `senderName` (опционально) - имя отправителя сообщения;
- `attachedFiles` (опционально) - массив прикреплённых файлов к сообщению (тип тот же, что в компоненте UploadList, но немного урезанный);
- `repliedMessage`(опционально) - объект сообщения, на которое ответили в текущем сообщении;
- `isSendError` (опционально) - флаг, что не удалось отправить сообщение;
- `isPinned` (опционально) - флаг, что сообщение отмечено у поддержки.

@summary компонент интерфейса для обмена сообщениями в реальном времени
```

### raw props type
```ts
export type TChatProps = TPrettify<{
    /** Компонент, который полностью заменяет отображение сообщений. */
    Message?: FC<TMessageProps>;
    /** Массив сообщений. */
    messages?: TMessage[];
    /** Коллбэк при нажатии на кнопку "Полезно/лайк". */
    onLike?: (message: TMessage) => void;
    /** Коллбэк при нажатии на кнопку "Не полезно/дизлайк". */
    onDislike?: (message: TMessage) => void;
    /** Флаг включения прикрепления файлов. */
    attachVisible?: boolean;
    /** Коллбэк при нажатии на кнопку-помощницу. */
    onSuggestionClick?: (message: string) => void;
    /** Коллбэк при прочтении сообщений. */
    onChangeIsRead?: (messages?: TMessage[]) => void;
    /** Коллбэк при ответе на сообщение. */
    onReplyToMessage?: (message: TMessage) => void;
    /** Объект с частью свойств из компонента Tabs для отображения табов. */
    tabOptions?: TTabOptionsChat;
    /** Флаг, отвечающий за закрытие чата. */
    isChatClosed?: boolean;
    /** Флаг загрузки контента чата. */
    isLoadingContent?: boolean;
    /** Флаг загрузки табов для чата. */
    isLoadingTabs?: boolean;
    /** Массив объектов с полем role, который показывает, кто набирает сообщение. */
    typing?: TTyping[];
    /** Флаг отображения экшена "скопировать" у каждого сообщения. */
    visibleCopyMessageAction?: boolean;
    /** Флаг отображения экшена "ответить" у каждого сообщения. */
    visibleReplyMessageAction?: boolean;
    /** Коллбэк при изменении состояния isPinned у сообщения. */
    onChangeIsPinned?: (message: TMessage, newValue: boolean) => void;
    /** Массив вспомогательных дополнительных кнопок */
    suggestionButtons?: TInternalButton[] & {
        length: 0 | 1 | 2;
    };
}> & TChatEventsButtonVisible & THeader & TFooter;
```

### demo examples found
<!-- components/Chat/ui/ChatAIDemo.tsx -->
```tsx
import type { TMessage, TOnMessage } from '../../../../src'

import type { ComponentProps } from 'react'

import { useCallback, useRef, useState } from 'react'

import { Chat } from '../../../../src'
import { getNewMessage } from '../lib/getNewMessage'
import { handleAIResponse } from '../lib/handleAIResponse'

type TChatProps = Omit<ComponentProps<typeof Chat>, 'message' | 'onMessage'> & {
    messages: Required<ComponentProps<typeof Chat>>['messages']
} & {
    title: string
    header: undefined
    footer: undefined
}

export const ChatAIDemo = (args: TChatProps) => {
    const [messages, setMessages] = useState(args.messages)
    const [isTypingAI, setIsTypingAI] = useState(false)
    const lastUserMessageIdRef = useRef<string | null>(null)

    const handleChangeReadIt = useCallback((messages: TMessage[] | undefined) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                const changedMsg = messages?.find((m) => m.id === msg.id)
                if (changedMsg) {
                    return { ...msg, isRead: true }
                }
                return msg
            })
        )
    }, [])

    const handleMessage: TOnMessage = async (value, files, repliedMessage) => {
        const userMessage = getNewMessage(value, files, true, repliedMessage)
        lastUserMessageIdRef.current = userMessage.id
        setMessages((prevMessages) => [...prevMessages, userMessage])

        // Имитация ответа AI
        handleAIResponse({ setIsTypingAI, setMessages, lastUserMessageIdRef })
    }

    const changeReaction = useCallback((message: TMessage, reaction: 'like' | 'dislike') => {
        const oppositeReaction = reaction === 'like' ? 'dislike' : 'like'

        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg.id !== message.id) return msg

                const newRatingValue = !msg[reaction]

                return {
                    ...msg,
                    [reaction]:
```
<!-- components/Chat/ui/ChatDemo.tsx -->
```tsx
import type { TMessage, TOnMessage } from '../../../../src'

import type { ComponentProps } from 'react'

import { useCallback, useRef, useState } from 'react'

import { Chat } from '../../../../src'
import { getNewMessage } from '../lib/getNewMessage'
import { handleAIResponse } from '../lib/handleAIResponse'

type TChatProps = Omit<ComponentProps<typeof Chat>, 'message' | 'onMessage'> & {
    messages: Required<ComponentProps<typeof Chat>>['messages']
} & {
    title?: string
    header?: undefined
    footer?: undefined
}

export const ChatDemo = (args: TChatProps) => {
    const [messages, setMessages] = useState(args.messages)
    const [isTypingAI, setIsTypingAI] = useState(false)
    const lastUserMessageIdRef = useRef<string | null>(null)

    const handleChangeReadIt = useCallback((messages: TMessage[] | undefined) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                const changedMsg = messages?.find((m) => m.id === msg.id)
                if (changedMsg) {
                    return { ...msg, isRead: true }
                }
                return msg
            })
        )
    }, [])

    const handleMessage: TOnMessage = async (value, files, repliedMessage) => {
        const userMessage = getNewMessage(value, files, true, repliedMessage)
        lastUserMessageIdRef.current = userMessage.id
        setMessages((prevMessages) => [...prevMessages, userMessage])

        // Имитация ответа AI
        handleAIResponse({ setIsTypingAI, setMessages, lastUserMessageIdRef })
    }

    return (
        <Chat
            {...args}
            messages={messages}
            typing={isTypingAI ? [{ role: 'AI' }] : undefined}
            onChangeIsRead={handleChangeReadIt}
            onMessage={handleMessage}
        />
    )
}
```
<!-- components/Chat/ui/ChatSuggestionDemo.tsx -->
```tsx
import type { TMessage, TOnMessage } from '../../../../src'

import { BodyM } from '@salutejs/sdds-cs'
import { useCallback, useRef, useState } from 'react'

import { Chat, FlexBox, Modal } from '../../../../src'
import { getNewMessage } from '../lib/getNewMessage'
import { handleAIResponse } from '../lib/handleAIResponse'
import { messagesSuggestion } from '../lib/messagesSuggestion'

export const ChatSuggestionDemo = () => {
    const [openModal, setOpenModal] = useState(false)
    const [messages, setMessages] = useState(messagesSuggestion)
    const [isTypingAI, setIsTypingAI] = useState(false)
    const lastUserMessageIdRef = useRef<string | null>(null)

    const handleChangeReadIt = useCallback((messages: TMessage[] | undefined) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                const changedMsg = messages?.find((m) => m.id === msg.id)
                if (changedMsg) {
                    return { ...msg, isRead: true }
                }
                return msg
            })
        )
    }, [])

    const handleMessage: TOnMessage = async (value, files, repliedMessage) => {
        const userMessage = getNewMessage(value, files, true, repliedMessage)
        lastUserMessageIdRef.current = userMessage.id
        setMessages((prevMessages) => [...prevMessages, userMessage])

        // Имитация ответа AI
        handleAIResponse({ setIsTypingAI, setMessages, lastUserMessageIdRef })
    }

    const handleChangeIsPinned = useCallback((message: TMessage, newValue: boolean) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => {
                if (msg.id === message.id) {
                    return { ...msg, isPinned: newValue }
                }
                return msg
            })
        )
    }, [])

    return (
        <FlexBox height="800px" width="800px">
            <Chat
                attachVisible
                messages={messages}
                suggestionButtons=
```

---

## CURRENCY_SYMBOL
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const CURRENCY_SYMBOL: {
    rub: string;
    RUB: string;
    rur: string;
    RUR: string;
    usd: string;
    USD: string;
    eur: string;
    EUR: string;
    cny: string;
    CNY: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayBoolean
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение boolean значения

Свойства:
- value - значение для отображения.

@summary отображение boolean значения
```

### raw props type
```ts
export declare const DisplayBoolean: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<boolean>;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayDate
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение даты

Свойства:
- value - значение даты для отображения.
- UTC - флаг использования UTC.
- template - шаблон форматирования даты.

@summary отображение даты
```

### raw props type
```ts
export declare const DisplayDate: {
    (props: {
        value: import("../../..").TValue<string>;
        UTC?: boolean | undefined;
        template?: import("../../..").TDateTemplate | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayDateRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение периода дат

Свойства:
- from - начальная дата периода.
- to - конечная дата периода.
- UTC - флаг использования UTC.
- template - шаблон форматирования даты.

@summary отображение периода дат
```

### raw props type
```ts
export declare const DisplayDateRange: {
    (props: {
        from: import("../../..").TValue<string>;
        to: import("../../..").TValue<string>;
        UTC?: boolean | undefined;
        template?: import("../../..").TDateTemplate | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayDateTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение даты и времени

Свойства:
- value - значение даты и времени для отображения.
- UTC - флаг использования UTC.
- template - шаблон форматирования даты и времени.

@summary отображение даты и времени
```

### raw props type
```ts
export declare const DisplayDateTime: {
    (props: {
        value: import("../../..").TValue<string>;
        UTC?: boolean | undefined;
        template?: import("../../..").TDateTimeTemplate | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayLink
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
[__DisplayLink__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs-components-displaylink--docs) - Универсальная гиперссылка с поддержкой мета-данных.

**Правильное применение ссылок:**
- Для перехода по ссылке используйте `href + navigate`:
  ```
  <DisplayLink
    value="Ссылка"
    href="/details"
    navigate={navigate}
  />
  ```
- Для пользовательской логики при клике используйте `onClick` (он имеет приоритет над navigate).

@summary универсальная гиперссылка с поддержкой мета-данных
```

### raw props type
```ts
export declare const DisplayLink: {
    (props: Omit<{
        value: import("../../../utils/formatters").TFormatterValue<string | number>;
        navigate?: import("react-router").NavigateFunction | undefined;
        size?: "s" | "m" | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
        id?: string | undefined | undefined;
        content?: string | undefined | undefined;
        title?: string | undefined | undefined;
        onChange?: import("react").ChangeEventHandler<HTMLAnchorElement, Element> | undefined;
        slot?: string | undefined | undefined;
        style?: import("react").CSSProperties | undefined;
        view?: "secondary" | "accent" | "negative" | "warning" | "positive" | "paragraph" | "tertiary" | "clear" | "default" | undefined;
        disabled?: boolean | undefined;
        type?: string | undefined | undefined;
        defaultChecked?: boolean | undefined | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined | undefined;
        suppressHydrationWarning?: boolean | undefined | undefined;
        accessKey?: string | undefined | undefined;
        autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined | (string & {}) | undefined;
        autoFocus?: boolean | undefined | undefined;
        contentEditable?: "inherit" | (boolean | "true" | "false") | "plaintext-only" | undefined;
        contextMenu?: string | undefined | undefined;
        dir?: string | undefined | undefined;
        draggable?: (boolean | "true" | "false") | undefined;
        enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined | undefined;
        hidden?: boolean | undefined | undefined;
        lang?: string | undefined | undefined;
        nonce?: string | undefined | undefined;
        spellCheck?: (boolean | "true" | "false") | undefined;
        tabIndex?: number | undefined | undefined;
        translate?: "yes" | "no" | undefined | undefined;
        radioGroup?: string | undefined | undefined;
        role?: import("react").AriaRole | undefined;
        about?: string | undefined | undefined;
        datatype?: string | undefined | undefined;
        inlist?: any;
        prefix?: string | undefined | undefined;
        property?: string | undefined | undefined;
        rel?: string | undefined | undefined;
        resource?: string | undefined | undefined;
        rev?: string | undefined | undefined;
        typeof?: string | undefined | undefined;
        vocab?: string | undefined | undefined;
        autoCorrect?: string | undefined | undefined;
        autoSave?: string | undefined | undefined;
        itemProp?: string | undefined | undefined;
        itemScope?: boolean | undefined | undefined;
        itemType?: string | undefined | undefined;
        itemID?: string | undefined | undefined;
        itemRef?: string | undefined | undefined;
        results?: number | undefined | undefined;
        security?: string | undefined | undefined;
        unselectable?: "on" | "off" | undefined | undefined;
        popover?: "" | "auto" | "manual" | "hint" | undefined | undefined;
        popoverTargetAction?: "toggle" | "show" | "hide" | undefined | undefined;
        popoverTarget?: string | undefined | undefined;
        inert?: boolean | undefined | undefined;
        inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined | undefined;
        is?: string | undefined | undefined;
        exportparts?: string | undefined | undefined;
        part?: string | undefined | undefined;
        "aria-activedescendant"?: string | undefined | undefined;
        "aria-atomic"?: (boolean | "true" | "false") | undefined;
        "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined | undefined;
        "aria-braillelabel"?: string | undefined | undefined;
        "aria-brailleroledescription"?: string | undefined | undefined;
        "aria-busy"?: (boolean | "true" | "false") | undefined;
        "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined | undefined;
        "aria-colcount"?: number | undefined | undefined;
        "aria-colindex"?: number | undefined | undefined;
        "aria-colindextext"?: string | undefined | undefined;
        "aria-colspan"?: number | undefined | undefined;
        "aria-controls"?: string | undefined | undefined;
        "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined | undefined;
        "aria-describedby"?: string | undefined | undefined;
        "aria-description"?: string | undefined | undefined;
        "aria-details"?: string | undefined | undefined;
        "aria-disabled"?: (boolean | "true" | "false") | undefined;
        "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined | undefined;
        "aria-errormessage"?: string | undefined | undefined;
        "aria-expanded"?: (boolean | "true" | "false") | undefined;
        "aria-flowto"?: string | undefined | undefined;
        "aria-grabbed"?: (boolean | "true" | "false") | undefined;
        "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined | undefined;
        "aria-hidden"?: (boolean | "true" | "false") | undefined;
        "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined | undefined;
        "aria-keyshortcuts"?: string | undefined | undefined;
        "aria-label"?: string | undefined | undefined;
        "aria-labelledby"?: string | undefined | undefined;
        "aria-level"?: number | undefined | undefined;
        "aria-live"?: "off" | "assertive" | "polite" | undefined | undefined;
        "aria-modal"?: (boolean | "true" | "false") | undefined;
        "aria-multiline"?: (boolean | "true" | "false") | undefined;
        "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
        "aria-orientation"?: "horizontal" | "vertical" | undefined | undefined;
        "aria-owns"?: string | undefined | undefined;
        "aria-placeholder"?: string | undefined | undefined;
        "aria-posinset"?: number | undefined | undefined;
        "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined | undefined;
        "aria-readonly"?: (boolean | "true" | "false") | undefined;
        "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined | undefined;
        "aria-required"?: (boolean | "true" | "false") | undefined;
        "aria-roledescription"?: string | undefined | undefined;
        "aria-rowcount"?: number | undefined | undefined;
        "aria-rowindex"?: number | undefined | undefined;
        "aria-rowindextext"?: string | undefined | undefined;
        "aria-rowspan"?: number | undefined | undefined;
        "aria-selected"?: (boolean | "true" | "false") | undefined;
        "aria-setsize"?: number | undefined | undefined;
        "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined | undefined;
        "aria-valuemax"?: number | undefined | undefined;
        "aria-valuemin"?: number | undefined | undefined;
        "aria-valuenow"?: number | undefined | undefined;
        "aria-valuetext"?: string | undefined | undefined;
        dangerouslySetInnerHTML?: {
            __html: string | TrustedHTML;
        } | undefined | undefined;
        onCopy?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onCopyCapture?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onCut?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onCutCapture?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onPaste?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onPasteCapture?: import("react").ClipboardEventHandler<HTMLAnchorElement> | undefined;
        onCompositionEnd?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onCompositionEndCapture?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onCompositionStart?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onCompositionStartCapture?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onCompositionUpdate?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onCompositionUpdateCapture?: import("react").CompositionEventHandler<HTMLAnchorElement> | undefined;
        onFocus?: import("react").FocusEventHandler<HTMLAnchorElement> | undefined;
        onFocusCapture?: import("react").FocusEventHandler<HTMLAnchorElement> | undefined;
        onBlur?: import("react").FocusEventHandler<HTMLAnchorElement> | undefined;
        onBlurCapture?: import("react").FocusEventHandler<HTMLAnchorElement> | undefined;
        onChangeCapture?: import("react").ChangeEventHandler<HTMLAnchorElement, Element> | undefined;
        onBeforeInput?: import("react").InputEventHandler<HTMLAnchorElement> | undefined;
        onBeforeInputCapture?: import("react").InputEventHandler<HTMLAnchorElement> | undefined;
        onInput?: import("react").InputEventHandler<HTMLAnchorElement> | undefined;
        onInputCapture?: import("react").InputEventHandler<HTMLAnchorElement> | undefined;
        onReset?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onResetCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSubmit?: import("react").SubmitEventHandler<HTMLAnchorElement> | undefined;
        onSubmitCapture?: import("react").SubmitEventHandler<HTMLAnchorElement> | undefined;
        onInvalid?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onInvalidCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoad?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onError?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onErrorCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onKeyDown?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onKeyDownCapture?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onKeyPress?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onKeyPressCapture?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onKeyUp?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onKeyUpCapture?: import("react").KeyboardEventHandler<HTMLAnchorElement> | undefined;
        onAbort?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onAbortCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onCanPlay?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onCanPlayCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onCanPlayThrough?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onCanPlayThroughCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onDurationChange?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onDurationChangeCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEmptied?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEmptiedCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEncrypted?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEncryptedCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEnded?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onEndedCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadedData?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadedDataCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadedMetadata?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadedMetadataCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadStart?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onLoadStartCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPause?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPauseCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPlay?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPlayCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPlaying?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onPlayingCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onProgress?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onProgressCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onRateChange?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onRateChangeCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSeeked?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSeekedCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSeeking?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSeekingCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onStalled?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onStalledCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSuspend?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSuspendCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onTimeUpdate?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onTimeUpdateCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onVolumeChange?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onVolumeChangeCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onWaiting?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onWaitingCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onAuxClick?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onAuxClickCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onClick?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onClickCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onContextMenu?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onContextMenuCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onDoubleClick?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onDoubleClickCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onDrag?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragEnd?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragEndCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragEnter?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragEnterCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragExit?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragExitCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragLeave?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragLeaveCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragOver?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragOverCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragStart?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDragStartCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDrop?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onDropCapture?: import("react").DragEventHandler<HTMLAnchorElement> | undefined;
        onMouseDown?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseDownCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseEnter?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseLeave?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseMove?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseMoveCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseOut?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseOutCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseOver?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseOverCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseUp?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onMouseUpCapture?: import("react").MouseEventHandler<HTMLAnchorElement> | undefined;
        onSelect?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onSelectCapture?: import("react").ReactEventHandler<HTMLAnchorElement> | undefined;
        onTouchCancel?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchCancelCapture?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchEnd?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchEndCapture?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchMove?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchMoveCapture?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchStart?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onTouchStartCapture?: import("react").TouchEventHandler<HTMLAnchorElement> | undefined;
        onPointerDown?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerDownCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerMove?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerMoveCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerUp?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerUpCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerCancel?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerCancelCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerEnter?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerLeave?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerOver?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerOverCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerOut?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onPointerOutCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onGotPointerCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onGotPointerCaptureCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onLostPointerCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onLostPointerCaptureCapture?: import("react").PointerEventHandler<HTMLAnchorElement> | undefined;
        onScroll?: import("react").UIEventHandler<HTMLAnchorElement> | undefined;
        onScrollCapture?: import("react").UIEventHandler<HTMLAnchorElement> | undefined;
        onScrollEnd?: import("react").UIEventHandler<HTMLAnchorElement> | undefined;
        onScrollEndCapture?: import("react").UIEventHandler<HTMLAnchorElement> | undefined;
        onWheel?: import("react").WheelEventHandler<HTMLAnchorElement> | undefined;
        onWheelCapture?: import("react").WheelEventHandler<HTMLAnchorElement> | undefined;
        onAnimationStart?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onAnimationStartCapture?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onAnimationEnd?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onAnimationEndCapture?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onAnimationIteration?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onAnimationIterationCapture?: import("react").AnimationEventHandler<HTMLAnchorElement> | undefined;
        onToggle?: import("react").ToggleEventHandler<HTMLAnchorElement> | undefined;
        onBeforeToggle?: import("react").ToggleEventHandler<HTMLAnchorElement> | undefined;
        onTransitionCancel?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionCancelCapture?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionEnd?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionEndCapture?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionRun?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionRunCapture?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionStart?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        onTransitionStartCapture?: import("react").TransitionEventHandler<HTMLAnchorElement> | undefined;
        ref?: import("react").Ref<HTMLAnchorElement> | undefined;
        focused?: boolean | undefined;
        key?: import("react").Key | null | undefined;
        target?: import("react").HTMLAttributeAnchorTarget | undefined;
        href?: string | undefined | undefined;
        download?: any;
        hrefLang?: string | undefined | undefined;
        media?: string | undefined | undefined;
        ping?: string | undefined | undefined;
        referrerPolicy?: import("react").HTMLAttributeReferrerPolicy | undefined;
        underline?: "none" | "hover" | "always" | undefined;
    }, "ref"> & import("react").RefAttributes<HTMLAnchorElement> & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayNumber
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение чисел

Свойства:
- value - значение для отображения.
- hideFraction - флаг скрытия дробной части.

@summary отображение чисел
```

### raw props type
```ts
export declare const DisplayNumber: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<number>;
        hideFraction?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayPercent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение значения со знаком процента %

Свойства:
- value - значение для отображения.
- hideFraction - флаг скрытия дробной части.

@summary отображение значения со знаком процента
```

### raw props type
```ts
export declare const DisplayPercent: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<number>;
        hideFraction?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayPrice
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение стоимостей

Свойства:
- value - значение для отображения.
- symbol - символ валюты.
- unicodeSymbol - Unicode символ валюты.
- name - название валюты.
- hideFraction - флаг скрытия дробной части.
- tooltipVisible - флаг видимости всплывающей подсказки.
- portal - контейнер для всплывающей подсказки.
- showCopyButton - флаг отображения кнопки копирования.
- size - размер шрифта.

@summary отображение стоимостей
```

### raw props type
```ts
export declare const DisplayPrice: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<number>;
        symbol?: import("../../../utils/formatters").TFormatterValue<string>;
        unicodeSymbol?: import("../../../utils/formatters").TFormatterValue<string>;
        name: import("../../../utils/formatters").TFormatterValue<string>;
        hideFraction?: boolean | undefined;
        tooltipVisible?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
        portal?: (string | React.RefObject<HTMLElement | null>) | undefined;
        frame?: import("../../../internal/types").TSDDSPortal | undefined;
        usePortal?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayText
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение текста

Свойства:
- value - значение для отображения.
- isEllipsisInfo - флаг отображения с эллипсисом и подсказкой.
- noWrap - флаг запрета переноса текста.
- countLineClamp - количество строк для отображения с эллипсисом.
- portal - контейнер для всплывающей подсказки.
- frame - (устаревшее) используйте portal.
- showCopyButton - флаг отображения кнопки копирования.
- size - размер шрифта.

@summary отображение текста
```

### raw props type
```ts
export declare const DisplayText: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<string | number>;
        isEllipsisInfo?: boolean | undefined;
        noWrap?: boolean | undefined;
        portal?: (import("../../../internal/types").TSDDSPortal & (string | import("react").RefObject<HTMLElement | null>)) | undefined;
        frame?: import("../../../internal/types").TSDDSPortal | undefined;
        countLineClamp?: number | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение времени

Свойства:
- value - значение времени для отображения.
- UTC - флаг использования UTC.

@summary отображение времени
```

### raw props type
```ts
export declare const DisplayTime: {
    (props: {
        value: import("../../..").TValue<string>;
        UTC?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayTimeRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение временного периода со временем

Свойства:
- from - начальное время периода.
- to - конечное время периода.
- UTC - флаг использования UTC.

@summary отображение временного периода
```

### raw props type
```ts
export declare const DisplayTimeRange: {
    (props: {
        from: import("../../..").TValue<string>;
        to: import("../../..").TValue<string>;
        UTC?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DisplayUnit
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Отображение чисел с единицами измерения

Свойства:
- value - значение для отображения.
- name - название единицы измерения.
- description - описание единицы измерения.
- hideFraction - флаг скрытия дробной части.

@summary отображение чисел с единицами измерения
```

### raw props type
```ts
export declare const DisplayUnit: {
    (props: {
        value: import("../../../utils/formatters").TFormatterValue<number>;
        name: import("../../../utils/formatters").TFormatterValue<string>;
        description: import("../../../utils/formatters").TFormatterValue<string>;
        hideFraction?: boolean | undefined;
        size?: ("s" | "m") | undefined;
        showCopyButton?: boolean | undefined;
        bold?: boolean | undefined;
        color?: string | undefined;
        className?: string | undefined | undefined;
        as?: keyof import("@salutejs/plasma-new-hope").AllowedTextHTMLElements | undefined;
        breakWord?: boolean | undefined;
    } & {
        label?: string;
        meta?: import("../../..").TMetaSchemeProperty;
        textTooltip?: string;
    } & Pick<import("../../../layouts/Box").TBoxProps, "alignItems" | "flexDirection" | "gap" | "justifyContent">): import("react").JSX.Element;
    displayName: string;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## DraggableRows
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/DraggableRows

propsType: TDraggableRowsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TDraggableRowsProps<T extends TBaseItem = TBaseItem> = PropsWithChildren<{
    /** Порядок, группировка и выбор элементов */
    items: TNode<T>[];
    /** Определяет, включен ли режим редактирования */
    isEdit?: boolean;
    /** Разрешает объединять элементы в группы перетаскиванием */
    isGroupable?: boolean;
    /** Размер элементов */
    size?: TSize;
    /** Показывает порядковые номера у элементов верхнего уровня */
    withIndex?: boolean;
    /** Содержимое строки справа от заголовка */
    renderContent?: (item: TItem<T>) => ReactNode;
    /** Обработчик, вызываемый при изменении массива элементов */
    onChange: (items: TNode<T>[]) => void;
    /** Обработчик удаления; без него иконка удаления не отображается */
    onDelete?: (id: string, item: TNode<T>) => void;
}>;
```

### demo examples found
<!-- components/DraggableRows/ui/DraggableRowsDemo.tsx -->
```tsx
import { useState, type ComponentProps } from 'react'

import { DraggableRows, removeDraggableRowsItem } from '../../../../src'

export const DraggableRowsDemo = ({ items: initialItems, ...rest }: ComponentProps<typeof DraggableRows>) => {
    const [items, setItems] = useState(initialItems)

    return (
        <DraggableRows
            {...rest}
            items={items}
            onChange={setItems}
            onDelete={(id) => setItems((prev) => removeDraggableRowsItem(prev, id))}
        />
    )
}
```
<!-- components/DraggableRows/ui/DraggableRowsRenderContentDemo.tsx -->
```tsx
import type { TApprovalRow } from '../lib/mocks'

import { useState, type ComponentProps } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import {
    Badge,
    DraggableRows,
    FlexBox,
    FormElementFlex,
    MutationCombobox,
    removeDraggableRowsItem,
} from '../../../../src'

const DraggableRowsRow = ({ row, isEdit = true }: { row: TApprovalRow; isEdit?: boolean }) => {
    const value = useWatch({ name: row.comboboxOptions.name })
    const values = Array.isArray(value) ? value : [value]

    return isEdit ? (
        <FormElementFlex width="240px" onClick={(event) => event.stopPropagation()}>
            <MutationCombobox {...row.comboboxOptions} />
        </FormElementFlex>
    ) : (
        <FlexBox flexWrap="wrap" gap={0.5}>
            {values.map((current) => (
                <Badge
                    key={String(current)}
                    color="coolGray1"
                    text={
                        row.comboboxOptions.items.find((option) => option.value === current)?.label ?? String(current)
                    }
                    view="info"
                />
            ))}
        </FlexBox>
    )
}

export const DraggableRowsRenderContentDemo = ({
    items: initialItems,
    isEdit,
    ...rest
}: ComponentProps<typeof DraggableRows<TApprovalRow>>) => {
    const [items, setItems] = useState(initialItems)

    const form = useForm({
        defaultValues: { id1: 'customer', id2: 'signer', id3: 'signer', id4: ['signer', 'approver'], id5: 'approver' },
    })

    return (
        <FormProvider {...form}>
            <DraggableRows
                {...rest}
                isEdit={isEdit}
                items={items}
                renderContent={(item) => <DraggableRowsRow isEdit={isEdit} row={item} />}
                onChange={setItems}
                onDelete={(id) => setItems((prev) => removeDraggableRowsItem(prev, id))}
            />
        </FormProvider>
    )
}
```

---

## EllipsisInfo
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/EllipsisInfo

propsType: TEllipsisInfoProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[EllipsisInfo](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs/components-ellipsisinfo--docs) - компонент для отображения текста с возможностью эллипсиса
(сокращения длинного текста с помощью многоточия) и показа всплывающей подсказки с полным текстом при наведении курсора.

**Особенности:**
- Автоматическое определение переполнения текста
- Отображение многоточия при превышении количества строк
- Всплывающая подсказка с полным текстом при наведении
- Поддержка интерактивной иконки действия

**Передаваемые свойства:**
- `text` (обязательное) - текст для отображения;
- `typographyComponent` - компонент типографии из SDDS (по умолчанию `BodyS`);
- `countLineClamp` - максимальное количество строк для отображения. Если значение не передано или равно 0,
  текст отображается без обрезки и без подсказки;
- `colorText` - цвет текста (по умолчанию `textSecondary`);
- `wordBreak` - тип разрыва слова (по умолчанию `break-word`);
- `overflowWrap` - поведение переноса слова;
- `bold` - флаг жирного начертания;
- `noTooltip` - флаг отключения всплывающей подсказки при эллипсисе;
- `portal` - использовать portal для тултипа (свойство из SDDS Popover);
- `as` - HTML-элемент или компонент для отрисовки;
- `action` - отображение вспомогательной интерактивной иконки:
  - `icon` - иконка типа `ComponentType<IconProps>`;
  - `textTooltip` (не совместимо с `onClick`) - текст для тултипа иконки;
  - `onClick` (не совместимо с `textTooltip`) - колбэк клика по иконке.
  **Примечание:** если передано свойство `action`, текст не будет сокращаться многоточием.

Доступные компоненты для `typographyComponent`: BodyS, BodyM, BodyL, TextXS, TextS, TextM, TextL, H4, H5.

@summary компонент для отображения текста с эллипсисом и подсказкой
```

### raw props type
```ts
export type TEllipsisInfoProps = {
    /** Текст для отображения */
    text: string;
    /** Компонент типографии из SDDS */
    typographyComponent?: TSDDSTypography;
    /** Максимальное количество строк для отображения */
    countLineClamp?: number;
    /** Цвет текста */
    colorText?: string;
    /** Тип разрыва слова */
    wordBreak?: CSSProperties['wordBreak'];
    /** Поведение переноса слова */
    overflowWrap?: CSSProperties['overflowWrap'];
    /** Флаг отключения всплывающей подсказки */
    noTooltip?: boolean;
    /** HTML-элемент или компонент для отрисовки */
    as?: ElementType;
    /** Конфигурация действия с иконкой */
    action?: TEllipsisInfoAction;
    /** @deprecated Используйте свойство `portal` */
    frame?: TSDDSPortal;
    /** Контейнер для всплывающей подсказки (portal) */
    portal?: TSDDSPortal;
    onToggle?: (isOpen: boolean, event?: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | globalThis.MouseEvent) => void;
    shrinkToContent?: boolean;
    /**@deprecated Свойство usePortal больше не работает в sdds. Используйте свойство portal */
    usePortal?: boolean;
} & TPropsFromTooltip & TPropsFromTypography;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## EmptyStates
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/EmptyStates

propsType: TEmptyStatesProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [EmptyStates](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-emptystates--docs) - это отображение состояний, когда что-то пошло не так или пользователь ещё не совершил действий.
EmptyStates используется для обратной связи от системы:
- когда пользователь не отметил какие-либо элементы, например избранное;
- когда приложение состоит из различных рабочих пространств или дашбордов, но пользователь не добавил контент в эти области;
- список результатов поиска, если ничего не найдено, а также в других случаях, когда действие приводит к нулевому результату.

Компонент EmptyStates можно использовать в виде готового шаблона и принимает следующие свойства:
- `view`  - вид шаблона `'errorLoading' | 'loading' | 'construction' | 'blocker' | 'idSecure' | 'before' | 'after' | 'beforeWd' | 'afterWd'`;
- `onClick` (опционально) - функция, вызываемая при нажатии на кнопку;
- `description` - текст, который объясняет проблему и описывает пути её решения. Можно использовать тип ReactNode, однако допустимо
использовать внутри только обвёртку <></> с текстом и компонентом [Link](https://plasma.sberdevices.ru/sdds-cs/components/link/)
с указанием свойства target="_blank";
- `isHorizontal` (опционально) - включение горизонтальной ориентации (работает только при некоторых view: 'errorLoading' | 'loading' |
'construction' | 'before' | 'after')

Правильное использование свойства description при ReactNode:
```
<>
   Запросите доступ или напишите в
   <Link href={'ваша ссылка'} target="_blank" view="accent">
         техническую поддержку
   </Link>
</>
```
Виды шаблонов:
- долгая загрузка (`loading`) - когда требуется прервать или перезапустить процесс загрузки;
- не удалось загрузить данные (`errorLoading`) - когда с сервера возвращается ошибка;
- у вас нет доступа (`blocker`) - у роли отсутствует доступ;
- ведутся работы (`construction`) - "дразнилка" которая отображает ожидания и собирает информацию по количеству ожидающих;
- идентификация (`idSecure`) — требуется авторизоваться в системе с помощью электронного ключа или ключ-карты;
- тут пусто (`before`) — состояние когда пользователь не совершил пока никаких действий;
- ничего не нашлось (`after`) - состояние, когда пользователь совершил какие-то действия, которые влияли на отображение данных (например фильтры).

Виды шаблонов **для виджетов** (применяются ТОЛЬКО в виджетах размером 4x2):
- тут пусто (`beforeWd`) — состояние когда в этом блоке нет данных для отображения;
- ничего не нашлось (`afterWd`) - состояние, когда пользователь совершил какие-то действия, которые влияли на отображение данных (например фильтры).

<br/>
**ВНИМАНИЕ:** при использовании view `loading` компонент должен быть виден пользователю не менее, чем 2 секунды.
<br/>
<br/>
Компонент имеет фиксированную ширину - 336px (за исключением шаблонов для виджетов), и минимальную высоту, равную содержимому компонента, но обвёрнут в контейнер,
который растягивается на всю ширину и высоту, централизуя компонент.

@summary для отображает состояния загрузки, что-то пошло не так или пользователь ещё не совершил действий
```

### raw props type
```ts
export type TEmptyStatesProps = TPrettify<TViewsWithOrientation | TErrorLoadingView | TBlockerView | TIdSecureView | TWidgetViews>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## EventsHistory
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/EventsHistory

propsType: TEventsHistoryProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [EventsHistory](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-history--docs) используется для отображения
изменений объекта в системе.

Используйте компонент для отслеживания изменений документа: изменения в полях ввода, выбора, прикрепления файлов и т. п.
События в истории идут в обратном хронологическом порядке. В таком порядке сначала идут самые свежие или актуальные события,
затем предыдущие.

Максимальная высота компонента зависит от родительского контейнера, если высота компонента больше, то появляется прокрутка.

Компонент принимает следующие свойства:
- items - массив групп событий;
- itemsRef - массив ref элементов items;
- isLoading (опционально) - флаг загрузки данных в компоненте;
- skeletonCount (опционально) - количество скелетонов загрузки данных.

Свойство `items` состоит из следующих параметров:
- submittedAt - это точный календарный день и время изменения;
- description - описание группы событий или его тип;
- userName (опционально) - ФИО автора события;
- user (опционально) - объект пользователя, содержащего 3 обязательных свойства типа string: fullName, eMail и phone;
- parameters (может быть пустой массив) - объект, принимающий 2 необязательных поля description и value, для отображения таких типов событий, как `Добавление файла`,
`Удаление файла`, `Создание` и `Удаление элементов`;
- changedFields (может быть пустой массив) - объект, принимающий 3 поля: oldValue: string | null, newValue: string и необязательное свойство description.
Используется объект для отображения таких типов событий, как `Исправление`, `Переименование файла`, `Изменение статуса`,
`Редактирование позиции в таблице` и `Заполнение пустого поля`.

В дизайне различаются следующие типы событий:
- Создание - добавление нового объекта или внесение данных в полях ввода и выбора в форме, или объекте;
- Исправление - правки в полях ввода и выбора в форме или объекте;
- Удаление информации - полное удаление или очищение информации из полей ввода и выбора;
- Изменение статуса - обновление статуса объекта;
- Добавление файла - отображение новых прикреплённых файлов;
- Переименование файла - изменение названия существующего файла в системе;
- Удаление файла - полное удаление файлов из системы;
- Редактирование позиции в таблице - изменение значения в таблице;
- Заполнение пустого поля - это первое заполнение поля ввода или выбора.
```

### raw props type
```ts
export type TEventsHistoryProps = {
    items: TEvent[];
    itemsRef?: RefObject<(HTMLDivElement | null)[]>;
} & TSkeletonType;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## FALLBACK_VALUE
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const FALLBACK_VALUE = "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## format
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const format: ({ UTC, template, value }: TFormat) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatBoolean
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Форматирование boolean
```

### raw props type
```ts
export declare const formatBoolean: (value: TFormatterValue<boolean>) => "" | "Не заполнено" | "Нет данных" | "Да" | "Нет";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatDate
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatDate: ({ template, ...rest }: TFormatDate) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatDateRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatDateRange: ({ template, ...rest }: TFormatDateRange) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatDateTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatDateTime: ({ template, ...rest }: TFormatDateTime) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatNumber
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Форматирование чисел
```

### raw props type
```ts
export declare const formatNumber: (value: TFormatterValue<number>, hideFraction?: boolean) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatRange: ({ UTC, from, template, to }: TFormatRange) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatTime: (props: TFormatTime) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## formatTimeRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const formatTimeRange: (props: TFormatTimeRange) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## FRACTION_DIGITS
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const FRACTION_DIGITS = 2;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## getStack
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/LinkedDocs

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const getStack: ({ items, ...document }: TNodeData) => TDocument[];
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## HighlightComponent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Highlight

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const HighlightComponent: ({ nodeRef, text, contentKey }: THighlightProps) => import("react").JSX.Element;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Informer
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Informer

propsType: TInformerProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Informer](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-informer--docs) - информационный блок. Используется для вывода информации и привлечения внимания пользователя.
<br/>
Пропсы:
- opened - отвечает за отображение модального окна;
- content - передается описание для пользователя. Можно вставлять ссылки;
- view - (опционально) вариант отображения информера. default - информационный, warning - привлекает внимание (стандартно установлен 'default')
- withCloseButton - (опционально) включение/выключение кнопки закрытия информера (стандартно - включено);
- withIcon - (опционально) включение/выключение иконки информации (стандартно - включено);
- onClose - (опционально) обработчик клика по кнопке "закрыть";
- title - (опционально) заголовок в одну строку. Если будет длинный - будет обрезан многоточием;
- isLoading - (опционально), флаг отображения загрузки в виде скелетона.

Ширина зависит от родительского компонента
```

### raw props type
```ts
export type TInformerProps = {
    view?: TInformerView;
    title?: string;
    content: ReactNode;
    withCloseButton?: boolean;
    withIcon?: boolean;
    opened: boolean;
    onClose?: () => void;
    isLoading?: boolean;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## INVALID_VALUE
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const INVALID_VALUE = "";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## LinkedDocs
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/LinkedDocs

propsType: TLinkedDocsProps (source: cs-core)

### raw description (RU, from JSDoc)
```
LinkedDocs - компонент для визуализации цепочек документов
```

### raw props type
```ts
export type TLinkedDocsProps<TValue extends string | object = string, TItem extends TSegmentsItem<TValue> = TSegmentsItem<TValue>, RowData extends TRowData = TRowData, CustomQueryArg extends TCustomQueryArg = TCustomQueryArg, CustomInitialPageParam extends TCustomQueryArg = TCustomQueryArg> = {
    /** Массив узлов (документов) для отображения */
    items: TNode[];
    /** Массив рёбер (связей между документами) */
    edges: TEdge[];
    /** Редактор для создания новой связи */
    editor?: ReactNode;
    /** Видимость редактора */
    editorVisible?: boolean;
    /** Действия по умолчанию для всех документов */
    actions?: TAction[];
    /** Таблица стопки документов (для отображения в шторке) */
    stackTable?: TTableInstance<RowData, CustomQueryArg, CustomInitialPageParam>;
    /** Опции для компонента сегментов (фильтрация) */
    quickFilters?: TMultiSegmentsProps<TValue, TItem>;
    /** Поповер создания связи, открывается по иконке «плюс» */
    createPopover?: TCardPopover;
    /** Поповер редактирования, открывается по иконке «карандаш» */
    editPopover?: TCardPopover;
    /** Обработчик удаления документа */
    onDelete?: (id: string, nodeId: string) => void;
    /** Обработчик открытия стопки документов */
    onSearch?: (nodeId: string) => void;
    /** Обработчик создания новой связи (перетаскивание от коннектора к коннектору) */
    onConnect?: (connection: Pick<TEdge, 'source' | 'target'>) => void;
    /** Обработчик разрыва связи по клику на крестик на линии */
    onDisconnect?: (edge: TEdge) => void;
    /** Подсвечивать всю цепочку до выбранной карточки */
    enableHighlightPath?: boolean;
} & TLinkProps;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## Loader
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Loader

propsType: TLoaderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Компонент [Loader](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-loader--docs) используется,
чтобы показать, что система выполняет команду, которую дал пользователь.

Компонент Loader принимает:
- size: размер компонента;
- text: текстовое сообщение, которое показывается рядом с компонентом.
- justifyContent
- alignItems

В компоненте предусмотрено три размера:
- S — для встраивания в строку или небольшой компонент;
- M — для показа в карточках;
- L — для использования в рамках всей страницы, вместо скелетона.

Элемент с размером S прижимается к левому краю родительского контейнера, например когда интерфейс подгружает часть текстового
контента или дополнительные поля формы. Если используется без текста, то стремится к центру. Элемент с размером M и L стремится
в центр компонента в котором он был вызван.


**Использование:**

Если элемент используется для загрузки множества данных, покажите его в главном блоке или около заголовка, остальной контент отобразите в виде структурного скелетона.
Не используйте подписи:- «Идет загрузка»- «Пожалуйста, подождите»

Не используйте страдательный залог. Используйте существительное для названия процессов, например, «Проверка отчета»

Элемент не должен появляться на очень короткие промежутки времени, это приводит к неприятному миганию. Показывайте
индикатор загрузки, если после вызова команды прошло больше 300 мс. Если вы показали элемент, держите его на экране минимум 1 секунду.

@summary для отображения процесса загрузки
```

### raw props type
```ts
export type TLoaderProps = {
    /** Размер компонента. По умолчанию 's'. */
    size: TLoaderSize;
    /** Текстовое сообщение, отображаемое рядом с индикатором загрузки. */
    text?: string;
    /** Выравнивание по горизонтали (передаётся в FlexBox). */
    justifyContent?: CSSProperties['justifyContent'];
    /** Выравнивание по вертикали (передаётся в FlexBox). */
    alignItems?: CSSProperties['alignItems'];
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## NO_DATA_VALUE
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils/formatters

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const NO_DATA_VALUE = "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## PdfHighlighter
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/PdfHighlighter

propsType: TPdfHighlighterProps (source: cs-core)

### raw description (RU, from JSDoc)
```
PdfHighlighter - компонент для поиска текста в pdf-документах
 Компонент может принимать в качестве источник данных:
 - ссылку на файл
 - объект типа `File`
 - бинарные данные
 - строку в формате `Base64`
 <br/>

 Ширина и высота определяются родительским компонентом.
```

### raw props type
```ts
export type TPdfHighlighterProps = {
    /** Строка поиска или объект TMultiSearchQuery для поиска по нескольким полям */
    searchTerm?: string | TMultiSearchQuery;
    /** Массив строк контекста для поиска */
    searchContext?: string[];
    /** Позиция боковой панели: слева или справа */
    sideBarPosition?: 'left' | 'right';
    /** Контент шапки боковой панели */
    header?: ReactNode;
    /** Контент подвала боковой панели */
    footer?: ReactNode;
    /** Основное содержимое боковой панели */
    sidebarContent?: ReactNode;
    /** Размер боковой панели: компактный или стандартный */
    sidebarSize?: TSize;
    /** Определяет возможность изменения размеров блоков */
    enableResizing?: boolean;
} & Pick<TPdfViewerProps, 'pdfData' | 'content' | 'enableDocumentReload' | 'enableDragging'>;
```

### demo examples found
<!-- components/PdfHighlighter/ui/PdfHighlighterDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Button, H4 } from '@salutejs/sdds-cs'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FlexBox, MutationTextField, Paper, PaperCard, PaperCardElement, PdfHighlighter } from '../../../../src'

const TEST_DOC_NAME = 'pdfHighlighterTestDocument'

export const PdfHighlighterDemo = (args: ComponentProps<typeof PdfHighlighter>) => {
    const handleDownload = () => {
        const pdfUrl = `./${TEST_DOC_NAME}.pdf`
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = TEST_DOC_NAME
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const [activeSearchTerm, setActiveSearchTerm] = useState<
        | {
              name: string
              query: string
          }
        | undefined
    >(undefined)

    const form = useForm({
        values: {
            inn1: 'ООО УК "ЁдиминмылКибер"',
            inn2: 'ООО УК "ЁдиминмылКебер"',
            agent: 3152,
            external_number: 'Аренда оптических волокон',
            kpp: '',
            date1: '9458',
            date2: 'Резников В.В.',
        },
    })

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" gap={1} height="100%" width="100%">
                <Button text="Скачать тестовый файл" view="clear" onClick={handleDownload} />
                <PdfHighlighter
                    enableDocumentReload
                    enableDragging
                    enableResizing
                    content={
                        <Paper>
                            <H4>Продуктовая вставка</H4>
                        </Paper>
                    }
                    footer={
                        <Paper gap={1} justifyContent="space-between">
                            <Button stretching="filled" text="Кнопка" view="secondary" />
                            <Button
```

---

## PdfViewer
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/PdfViewer

propsType: TPdfViewerProps (source: cs-core)

### raw description (RU, from JSDoc)
```
PdfViewer - компонент просмотра pdf-документов
 Компонент может принимать в качестве источник данных:
 - ссылку на файл
 - объект типа `File`
 - бинарные данные
 - строку в формате `Base64`
 <br/>
```

### raw props type
```ts
export type TPdfViewerProps = {
    /** PDF-документ - может быть представлен: url-адресом, бинарными данными, строкой в формате base64 или объектом File */
    pdfData?: TPdfData;
    /** Контент, расположенный над документом */
    content?: ReactNode;
    /** Число страниц документа для отображения */
    numPages?: number;
    /** Коллбек, вызываемый при успешной загрузке документа */
    onLoadSuccess?: (pdf: pdfjs.PDFDocumentProxy) => void;
    /** Коллбек, вызываемый при успешной отрисовке документа */
    onRenderSuccess?: () => void;
    /** Коллбек, вызываемый при скачивании документа */
    onDownload?: (file: TPdfData | undefined) => Promise<void>;
    /** Ссылка на контейнер, в котором располагается документ */
    containerRef?: RefObject<HTMLDivElement | null>;
    /** Включает/выключает слой аннотаций */
    renderAnnotationLayer?: boolean;
    /** Включает/выключает текстовый слой */
    renderTextLayer?: boolean;
    /** Высота компонента */
    height?: CSSProperties['height'];
    /** Определяет возможность перетаскивания документа */
    enableDragging?: boolean;
    /** Определяет возможность вручную заменить документ */
    enableDocumentReload?: boolean;
    /** Определяет возможность скачивания документа */
    enableDownload?: boolean;
    /** Определяет возможность вращения документа */
    enableRotate?: boolean;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## removeDraggableRowsItem
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/DraggableRows


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

## RenderItem
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/RenderItem

propsType: TRenderItem (source: cs-core)

### raw description (RU, from JSDoc)
```
[RenderItem](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-renderitem--docs) - компонент, предназначенный для изменения внешнего вида item
в выпадающем списке (В DropDown, MutationSelect и пр.)

Компонент принимает следующие свойства:
- `label` - краткое название;
- `description` (опционально) - полное название или какое-то описание;
- `code` (опционально) - содержимое баджа, например код наименования;
- `action` (опционально) - экшен в виде иконки, принимает следующие свойства:
 - icon - иконка типа ComponentType<IconProps>;
 - onClick - колбэк по нажатию на иконку.

 [Пример использования RenderItem с MutationSelect](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-renderitem--docs-render-item-2)
```

### raw props type
```ts
export type TRenderItem = {
    label: string;
    description?: string;
    code?: string;
    action?: {
        icon: ComponentType<IconProps>;
        onClick: () => void;
    };
};
```

### demo examples found
<!-- components/RenderItem/ui/RenderItemAutocompleteDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { MutationAutocomplete, RenderItem } from '../../../../src'

type TSuggestionItem = {
    label: string
    value: string
    code?: string
    description?: string
}

export const itemsAutocomplete: TSuggestionItem[] = [
    {
        label: 'ООО банк',
        code: 'CX',
        value: 'cx',
        description: 'Остров Рождества',
    },
    {
        label: 'ООО банковское дело',
        description: 'Российская Федерация',
        value: 'rf',
        code: 'ru',
    },
    { label: 'Неизвестно', value: 'none' },
    {
        label: 'Банк',
        code: 'Mh',
        value: 'mh',
    },
    {
        label: 'Дело банковское',
        value: 'la',
        description: 'Лаосская Народно-Демократическая Республика',
    },
]

export const RenderItemAutocompleteDemo = (args: Partial<ComponentProps<typeof MutationAutocomplete>>) => {
    return (
        <MutationAutocomplete
            label="Страна происхождения"
            name="country"
            options={{ required: true }}
            renderItem={RenderItem}
            suggestions={itemsAutocomplete}
            {...args}
        />
    )
}
```
<!-- components/RenderItem/ui/RenderItemComboboxDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { MutationCombobox, RenderItem } from '../../../../src'

type TMutationComboboxItem = ComponentProps<typeof RenderItem> & {
    value: string
}

export const itemsCombobox: TMutationComboboxItem[] = [
    {
        label: 'о. Рождества',
        value: 'cx',
        code: 'CX',
        description: 'Остров Рождества',
    },
    {
        label: 'Российская',
        description: 'Российская Федерация',
        value: 'rf',
        code: 'ru',
    },
    { label: 'Неизвестно', value: 'none' },
    {
        label: 'Маршалловы о-ва',
        value: 'mh',
        code: 'Mh',
    },
    {
        label: 'Лаос',
        value: 'la',
        description: 'Лаосская Народно-Демократическая Республика',
    },
]

export const RenderItemComboboxDemo = (
    args: Omit<
        Partial<ComponentProps<typeof MutationCombobox>>,
        'onChange' | 'selectAllOptions' | 'virtual' | 'chipDisplayMode'
    >
) => {
    return (
        <MutationCombobox
            virtual
            items={itemsCombobox}
            label="Страна происхождения"
            multiple={false}
            renderItem={RenderItem}
            {...args}
            name="country"
        />
    )
}
```
<!-- components/RenderItem/ui/RenderItemDemo.tsx -->
```tsx
import type { IconProps } from '@salutejs/plasma-icons'

import type { FC } from 'react'
import type { ComponentProps } from 'react'

import { IconArrowDiagRightUp } from '@salutejs/plasma-icons'

import { MutationSelect, RenderItem } from '../../../../src'

type TAction = {
    icon: FC<IconProps>
    onClick: () => void
}

type TSelectItem = {
    label: string
    value: string
    code?: string
    description?: string
    action?: TAction
}

export const itemsSelect: TSelectItem[] = [
    {
        label: 'о. Рождества',
        value: 'cx',
        code: 'CX',
        description: 'Остров Рождества',
        action: {
            icon: IconArrowDiagRightUp,
            onClick: () => console.info('CX click'),
        },
    },
    {
        label: 'Российская',
        description: 'Российская Федерация',
        value: 'rf',
        code: 'ru',
    },
    { label: 'Неизвестно', value: 'none' },
    {
        label: 'Маршалловы о-ва',
        value: 'mh',
        code: 'Mh',
        action: {
            icon: IconArrowDiagRightUp,
            onClick: () => console.info('Mh click'),
        },
    },
    {
        label: 'Лаос',
        value: 'la',
        description: 'Лаосская Народно-Демократическая Республика',
        action: {
            icon: IconArrowDiagRightUp,
            onClick: () => console.info('la click'),
        },
    },
]

export const RenderItemDemo = (args: Partial<ComponentProps<typeof MutationSelect>>) => {
    return (
        <MutationSelect
            items={itemsSelect}
            label="Страна происхождения"
            name="country"
            options={{ required: true }}
            renderItem={RenderItem}
            {...args}
        />
    )
}
```

---

## setTopDocument
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/LinkedDocs

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const setTopDocument: (nodes: TNode[], documentId: string, nodeId?: string) => TNode[];
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## SLA
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/SLA

propsType: TSLAProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[SLA](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-sla--docs) - показывает, сколько времени прошло
и осталось до завершения установленного периода.

Используйте для отображения обратного отсчета времени: длительность тестов, этапов работы, выполнения задач и т.п. Компонент принимает
 следующие параметры:
- appointmentDate — дата назначения процесса;
- datePrefix — префикс, который описывает название процесса.

**Примечание: ** в `datePrefix` рекомендуется использовать краткое страдательное причастие (например, "Согласовано"/"Доставлено"/"Подписано") вместе со свойством
`negativeDatePrefix` для того, чтобы смысл слова менялся в зависимости от выполнения процесса: если процесс не выполнен добавляется частица "Не" к `datePrefix`,
если процесс завершён, то используется просто `datePrefix`.
- plannedDate (опционально) — плановая дата завершения процесса;
- factDate (опционально) — фактическое время завершения процесса;
- engineCount (опционально) — количество делений в таймере - '2' или '3';
- mulct (опционально) - описание текста штрафа и кнопка действия для него;
- detailedButton (опционально) - добавление кнопки "Подробнее", свойство состоит из двух параметров: onClick - колбэк нажатия, и ref (опционально) - реф кнопки,
чтобы можно было открыть поповер/тултип и пр. компоненты, для которых требуется указание target;
- negativeDatePrefix (опционально) - добавление частицы "Не" перед словом, когда процесс не закончен;
- plannedTimeVisible (опционально) - отображение времени плановой даты;
- changePlannedDateVisible (опционально) - флаг включения управления датами (открывается календарь при нажатии);
- calendarPopoverOptions (опционально) - опции для управления календарём CalendarBase из sdds и компонентом Popover.

Компонент может быть в одном из следующих состояний:
- `нейтральное` - это состояние, когда времени достаточно. Все пользователи видят одинаковую визуализацию;
- `предупреждающее` - это состояние, когда осталось менее 30% времени и engineCount === 3;
- `критическое` - это состояние, когда осталось менее 10% времени. Для всех участников индикатор внимания и линия прогресса
меняют цвет на красный;
- `нарушение срока` - это состояние, когда исполнитель нарушил сроки. После дня и времени плановой даты индикатор внимания окрашивается
в красный, линия прогресса исчезает, описание меняется на «Срок нарушен на», таймер запускает обратный отсчёт задержки в формате Х дн. Х ч.;
- `дата назначения отсутствует` - это состояние, когда по процессу предполагается заполнение плановой даты, но её ещё не заполнили;
- `выполнение в срок` - это состояние, когда единственный процесс завершился до или в момент плановой даты;
- `выполнение с опозданием` - это состояние, когда единственный процесс завершился до или в момент плановой даты;
- `общий вариант` - это состояние, когда по процессу было заложено больше одной плановой даты. Используется после последнего
фактического завершения процесса с плановой датой.
```

### raw props type
```ts
export type TSLAProps = {
    appointmentDate: string;
    plannedDate?: string | string[];
    datePrefix: string;
    factDate?: string | null;
    engineCount?: 2 | 3;
    mulct?: TMulct;
    detailedButton?: TMoreDetailed;
    negativeDatePrefix?: boolean;
    plannedTimeVisible?: boolean;
    changePlannedDateVisible?: boolean;
    calendarPopoverOptions?: TCalendarPopoverProps;
};
```

### demo examples found
<!-- components/SLA/ui/SLADemo.tsx -->
```tsx
import type { TSLAProps } from '../../../../src/components/SLA/types'

import { BodyM } from '@salutejs/sdds-cs'
import { useState } from 'react'

import { FlexBox, Popover, SLA } from '../../../../src'

export const SLADemo = ({ ...rest }: TSLAProps) => {
    const [open, setOpen] = useState(false)

    return (
        <FlexBox height="400px" width="400px">
            <Popover
                clearButton={{
                    text: 'Сбросить',
                    onClick: () => {},
                }}
                content={<BodyM>Ваш контент</BodyM>}
                opened={open}
                placement="right"
                primaryButton={{
                    text: 'Подтвердить',
                    onClick: () => {},
                }}
                target={
                    <FlexBox height="84px">
                        <SLA
                            {...rest}
                            detailedButton={{
                                onClick: () => {
                                    setOpen(true)
                                },
                            }}
                        />
                    </FlexBox>
                }
                title="Детали"
                onToggle={setOpen}
            />
        </FlexBox>
    )
}
```

---

## Spoiler
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Spoiler

propsType: TSpoilerProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Обертка над текстовым компонентом sdds возвращающая компонент со сворачивающимся,
по правилам заданным разработчиком, текстом. Компонент принимает следующие свойства:
 - text - текст для вывода;
 - typographyComponent (опционально) - компонент для вывода текста (по умолчанию BodyM);
 - visibleRows (опционально) - количество видимых строк (по умолчанию 1);
 - color (опционально) - цвет текста  (по умолчанию primary);
 - hyphens (опционально) - переносить ли по слогам (по умолчанию auto);
 - onToggle (опционально) - необязательная функция, вызываемая при изменении состояния расширения спойлера.
```

### raw props type
```ts
export type TSpoilerProps = {
    text: string;
    typographyComponent?: TSpoilerTypography;
    visibleRows?: number;
    color?: TViewColor;
    hyphens?: TCSSHyphens;
    onToggle?: (isExpanded: boolean) => void;
    as?: ElementType;
};
```

### demo examples found
<!-- components/Spoiler/ui/SpoilerDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Spoiler } from '../../../../src'

export const SpoilerDemo = (args: ComponentProps<typeof Spoiler>) => {
    return <Spoiler {...args} />
}
```

---

## StatusTrack
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/StatusTrack

propsType: TStatusTrackProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[StatusTrack](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-statustrack-statustrack--docs) - является шаблонным
компонентом для отображения событий в хронологическом порядке на временной шкале.
Компонент принимает следующие свойства:
- items -  массив объектов, каждый из которых является элементом одного события;
- title (опционально) - заголовок для компонента;
- view (опционально) - тема, внутри которой используется StatusTrack;
**Внимание:** для того, чтобы корректно применились цвета у кривых в StatusTrack при использовании компонента в Popover или внутри компонента с тёмной темой,
необходимо прокинуть `view = 'onDark'`.
- isLoading (опционально) - отображение загрузки компонента;
- skeletonCount (опционально) - количество скелетонов во время загрузки;
- opened (опционально) - флаг, что статус трек свёрнут;
- onOpened (опционально, обязателен при opened) - колбек для управления переключением флага opened.

Объект в массиве items должен содержать следующие свойства:
- condition - состояние события, которое может принимать одно из следующих значений:
`'notStarted' | 'inProgress' | 'completed' | 'blocker' | 'attention' | 'notDefined'`;
- titleStatus - заголовок статуса;
- person (опционально):
         - fio - Фамилия И.О.;
         - role (при наличии) - описание должности или подпись;
- description (опционально) - текст описания или ReactNode;
- date (опционально) - значение даты типом TDateStatusTrack.
Дату необходимо передавать в виде объекта:
 - plannedDate (опционально) - плановая дата в формате ISO;
 - factDate - фактическая дата в формате ISO.
 - dayDiff (опционально) - отображает разницу между сегодняшним днём и плановой датой. Без plannedDate это свойство нельзя использовать;
 - items (опционально) - вложенные элементы, имеющие тот же тип. Максимально может быть 3 уровня процессов.

 **Обратите внимание на то, что свойство date принимает string помимо типа TDateStatusTrack только до Q3.** На данный момент при передачи
даты типом string дата будет определяться, как плановая в настоящих и будущих процессах и как фактическая дата при прошлых процессах.
```

### raw props type
```ts
export type TStatusTrackProps = {
    /** Заголовок компонента */
    title?: string;
    /** Массив элементов */
    items?: TItemStatusTrack[];
    /** Флаг сворачивания и разворачивания компонента */
    opened?: boolean;
    /** Колбек для изменения флага collapsed*/
    onOpened?: Dispatch<SetStateAction<boolean>>;
} & TSkeletonType & TDeprecatedView;
```

### demo examples found
<!-- components/StatusTrack/ui/StatusTrackCollapsedDemo.tsx -->
```tsx
import type { TItemStatusTrack } from '../../../../src'

import { useState } from 'react'

import { Paper, StatusTrack } from '../../../../src'

type Props = {
    items?: TItemStatusTrack[]
    isLoading?: boolean
    skeletonCount?: number
}

export const StatusTrackCollapsedDemo = (args: Props) => {
    const [opened, setOpened] = useState(false)
    return (
        <Paper height="50vh" paddingSize="s">
            <StatusTrack
                isLoading={args.isLoading || false}
                items={args.items}
                opened={opened}
                skeletonCount={args.skeletonCount as number}
                onOpened={setOpened}
            />
        </Paper>
    )
}
```
<!-- components/StatusTrack/ui/StatusTrackDemo.tsx -->
```tsx
import type { TItemStatusTrack } from '../../../../src'

import { BodyM } from '@salutejs/sdds-cs'

import { FlexBox, StatusTrack } from '../../../../src'
import { itemsStatusTrack2 } from '../lib/itemsStatusTrackMocks'

type Props = {
    items?: TItemStatusTrack[]
    isLoading?: boolean
    skeletonCount?: number
}

export const StatusTrackDemo = (args: Props) => {
    return (
        <FlexBox flexDirection="column" gap="40px">
            <StatusTrack
                isLoading={args.isLoading || false}
                items={args.items}
                skeletonCount={args.skeletonCount as number}
            />
            <BodyM bold>Ещё примеры небольших StatusTrack:</BodyM>
            <StatusTrack items={itemsStatusTrack2} />
        </FlexBox>
    )
}
```
<!-- components/StatusTrack/ui/StatusTrackNotDefinedDemo.tsx -->
```tsx
import type { TItemStatusTrack } from '../../../../src'

import { FlexBox, StatusTrack } from '../../../../src'
import { itemsStatusTrackNotDefined2, itemsStatusTrackNotDefined3 } from '../lib/itemsStatusTrackNotDefined'

type Props = {
    items?: TItemStatusTrack[]
    isLoading?: boolean
    skeletonCount?: number
}

export const StatusTrackNotDefinedDemo = (args: Props) => {
    return (
        <FlexBox flexDirection="column" gap={3} width="400px">
            <StatusTrack items={args.items} />
            <StatusTrack items={itemsStatusTrackNotDefined2} />
            <StatusTrack items={itemsStatusTrackNotDefined3} />
        </FlexBox>
    )
}
```

---

## TextCopyButton
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/TextCopyButton

propsType: TTextCopyButtonProps (source: cs-core)

### raw description (RU, from JSDoc)
```
Копирует текст в буфер обмена. Для оповещения пользователя
используется компонент [Toast](https://plasma.sberdevices.ru/sdds-cs/components/toast/).
Правильная работа Toast требует оборачивания контента страницы в ToastProvider
\(`import { ToastProvider } from '@salutejs/sdds-cs'`\).
- text - сообщенный текст для копирования
- top, left, right, bottom - кнопка имеет relative координаты в своем контейнере,
эти свойства позволяют изменить её позицию
- top - координата верхнего левого угла, по умолчанию \-12px (в большинстве случаев выравнивает со строкой)
```

### raw props type
```ts
export type TTextCopyButtonProps = {
    text: string;
    size?: 'xs' | 's' | 'm';
} & TPositionTextCopyButton & {
    [key: `data-${string}`]: string | undefined;
};
```

### demo examples found
<!-- components/TextCopyButton/ui/TextCopyButtonDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { BodyS } from '@salutejs/sdds-cs'

import { FlexBox, TextCopyButton } from '../../../../src'

export const TextCopyButtonDemo = ({ text, top, left, right, bottom }: ComponentProps<typeof TextCopyButton>) => (
    <FlexBox>
        <BodyS>{text}</BodyS>
        <TextCopyButton bottom={bottom} left={left} right={right} text={text} top={top} />
    </FlexBox>
)
```

---

## Thread
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Thread

propsType: TThreadProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Thread](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-thread--docs) - компонент, который используется для отображения списка тредов/чатов.

Компонент принимает следующие свойства:
- items - массив тредов/чатов;
- onCreate - функция, которая вызывается при нажатии на кнопку "Новый чат";
- selectedThreadId - выбранный тред/чат;
- onSelect - колбэк, который вызывается при выборе треда/чата;
- ThreadItem - компонент, который используется для отображения треда/чата в списке;

Для заголовка списка тредов/чатов используются следующие взаимозаменяемые свойства:
- title - заголовок списка тредов/чатов

или
- header - заголовок списка тредов/чатов, предоставлявший из себя ReactNode.

Элемент массива items состоит из следующих свойств:
- id - идентификатор треда/чата;
- date - дата создания треда/чата;
- name - название треда/чата.
```

### raw props type
```ts
export type TThreadProps = TListThreadsProps & THeader & {
    onCreate: () => void;
};
```

### demo examples found
<!-- components/Thread/ui/ThreadDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { Paper, Thread } from '../../../../src'

export const ThreadDemo = (args: ComponentProps<typeof Thread>) => {
    return (
        <Paper flexDirection="column" gap={3} height="100%" overflow="hidden auto" width="400px">
            <Thread {...args} />
        </Paper>
    )
}
```

---

## Tile
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Tile

propsType: TTileProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[Tile](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-tile-tile--docs)- представляет из себя небольшой прямоугольный или квадратный модуль,
который легко встраивается в интерфейс и адаптируется под разные сценарии использования. Визуально группирует контент и обеспечивает доступ к подробной информации.

Компонент принимает следующие свойства:
- title - заголовок карточки;
- onClick - колбэк при нажатии на компонент (при view='active' onClick не будет срабатывать);
- description (опционально) - описание карточки;
- footer (опционально) - нижняя часть карточки (любая ReactNode);
- badges (опционально) - массив баджей с типом TBadgeProps (соответствует контракту компонента Badge);
- ref (опционально) - ref элемента;
- size (опционально) - размер карточки ('s' | 'm' | 'l'), от которого зависит внутренний рендеринг футера и баджей. Рекомендуется прокидывать следующие
значения свойства при соответствующей высоте родителя:
 - `s` - width: '280px', height: '96px';
 - `m` - width: '280px', height: '136px';
 - `l` - width: '280px', height: '176px';
- view (опционально) - вид карточки (по умолчанию 'default'). При view='active' onClick срабатывать не будет;
- showArrowAlways (опционально) - флаг отображения стрелки в правом верхнем углу всегда, не только по ховеру;
- suggestionText (опционально) - вспомогательный текст вверху плитки, отображается только при наличии баджей;
- titleIcon (опционально) - объект для отображении иконки с тултипом возле заголовка, принимает следующие свойтсва:
 - `textTooltip` - текст для тултипа;
 - `icon` (опционально) - иконка типа ComponentType<IconProps>, по умолчанию используется иконка IconInfoCircleOutline.
- action (опционально) - объект экшена или массив из двух экшенов, заменяющий стрелку в правом верхнем углу. Принимает следующие свойства:
 - `type` (опционально) - тип экшена ('dropDown | switch'), по умолчанию undefined;
 - `icon` (при type = 'switch' свойство не доступно) - иконка типа ComponentType<IconProps> ;
 - `onClick` (опционально) - клик по иконке (при type = 'switch' свойство не доступно);
 - `hasIndicator` (опционально) - отображение индикатора в правом углу иконки (при type = 'switch' свойство не доступно);
 - `ref` (опционально) - реф кнопки-иконки (RefObject<HTMLButtonElement>);
 - `options` (опционально, но обязательны при наличии type) - свойства пропсы, зависящие от выбранного type.

**Внимание:** компонент имеет ограничения по минимальной и максимальной высоте и ширине: минимальные - h-96px w-280px, максимальные - h-176px w-560px.

Компонент рекомендуется использовать совместно с **TileContainer**.
```

### raw props type
```ts
export type TTileProps = {
    title: string;
    badges?: TBadgeProps[];
    description?: string;
    footer?: ReactNode;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    size?: TTileSize;
    ref?: Ref<HTMLDivElement | null>;
    showArrowAlways?: boolean;
    action?: TActionTile | TActionTileArray;
    view?: TViewTile;
    suggestionText?: string;
    href?: string;
    navigate?: NavigateFunction;
    titleIcon?: TIcon;
    isLoading?: boolean;
    textIsLoading?: string;
} & TTestAttributes;
```

### demo examples found
<!-- components/Tile/ui/TileDemo.tsx -->
```tsx
import type { ComponentProps } from 'react'

import { IconFireOutline } from '@salutejs/plasma-icons'
import { BodyS } from '@salutejs/sdds-cs'

import { FlexBox, Tile } from '../../../../src'
export const TileDemo = (args: ComponentProps<typeof Tile>) => {
    return (
        <Tile
            badges={[
                {
                    view: 'info',
                    color: 'red',
                    icon: 'fireOutline',
                },
                {
                    view: 'info',
                    color: 'skyBlue',
                    text: 'Пример',
                },
            ]}
            footer={
                <FlexBox alignItems="center" gap={0.5}>
                    <BodyS>Какое-то наполнение</BodyS>
                    <IconFireOutline color="inherit" size="xs" />
                </FlexBox>
            }
            {...args}
        />
    )
}
```
<!-- components/Tile/ui/TileNavigateDemo.tsx -->
```tsx
import { BodyM } from '@salutejs/sdds-cs'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { FlexBox, Tile } from '../../../../src'

export const MainPage = () => {
    const navigate = useNavigate()
    return (
        <FlexBox flexDirection="column" gap={2}>
            <Tile
                description="Реестр запросов на согласование объектов обслуживания"
                href="/service"
                navigate={navigate}
                size="m"
                title="Реестр запросов на согласование"
            />
        </FlexBox>
    )
}

export const ServicePage = () => {
    return (
        <FlexBox flexDirection="column" gap={2}>
            <BodyM>Реестр запросов на согласование</BodyM>
            <Link to="/">Назад</Link>
        </FlexBox>
    )
}
```
<!-- components/Tile/ui/TileWithActionDemo.tsx -->
```tsx
import { IconDotsHorizontalOutline, IconSb } from '@salutejs/plasma-icons'

import { Tile } from '../../../../src'

export const TileWithActionDemo = () => {
    return (
        <Tile
            action={[
                {
                    icon: IconSb,
                    onClick: () => {
                        console.info('Click IconSb')
                    },
                    textTooltip: 'Текст IconSb',
                },
                {
                    icon: IconDotsHorizontalOutline,
                    type: 'dropDown',
                    options: {
                        items: [
                            { value: '1', label: 'ds' },
                            { value: '2', label: 'ds' },
                        ],
                    },
                    textTooltip: 'Текст dropDown',
                },
            ]}
            description="Договор о согласовании заявки"
            size="m"
            title="Подписать договор №21763"
            onClick={() => {
                console.info('Click Tile')
            }}
        />
    )
}
```

---

## TileContainer
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/Tile

propsType: TTileContainerProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[TileContainer](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-tile-tilecontainer--docs)- представляет из себя контейнер
для группировки компонента [Tile](https://cs-core.cloud.delta.sbrf.ru/?path=/docs/components-tile-tile--docs) с одинаковым размером и группой свойств.


Компонент принимает следующие свойства:
- items - массив объектов плиток Tile;
- size (опционально) - размер плиток:
 - `s` - width: '280px', height: '96px';
 - `m` - width: '280px', height: '136px';
 - `l` - width: '280px', height: '176px';
 - Если size не прокинут, то плитки будут растягиваться на всю ширину родителя (до 560px) и иметь высоту в 176px.
- showArrowAlways (опционально) - флаг отображения стрелки в правом верхнем углу всегда, не только по ховеру;
- enableAdaptive (опционально) - включение адаптивной сетки (при включении этого свойства игнорируются часть свойств от `FlexBox`);
- isLoading (опционально) - отображение скелетонов во время загрузки плиток;
- skeletonCount (опционально) - количество скелетонов (по умолчанию 3).
Также компонент принимает часть свойств компонента `FlexBox`.
```

### raw props type
```ts
export type TTileContainerProps = {
    items: Omit<TTileProps, TFromTileProps>[];
    gap?: '4px' | '8px';
    enableAdaptive?: boolean;
} & TSkeletonType & Pick<TFlexBoxProps, 'flexDirection' | 'className' | 'overflow' | 'onScroll' | 'width' | 'flexWrap' | 'id' | 'ref'> & Pick<TTileProps, TFromTileProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueBoolean
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueBooleanProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueBooleanProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<boolean>;
} & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueDate
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueDateProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueDateProps = TPrettify<
/** Формат даты. */
TFormatDate & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueDateRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueDateRangeProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueDateRangeProps = TPrettify<
/** Формат диапазона дат. */
TFormatDateRange & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueDateTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueDateTimeProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueDateTimeProps = TPrettify<
/** Формат даты и времени. */
TFormatDateTime & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueLink
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueLinkProps (source: cs-core)

### raw description (RU, from JSDoc)
```
[__ValueLink__](https://cs-core.cloud.delta.sbrf.ru/latest/?path=/docs-components-displaylink--docs) - Универсальная гиперссылка с поддержкой роутинга и onClick.

Компонент отображает значение как ссылку, если задан onClick или валидный href. При клике имеет приоритет onClick над navigate/href.

**Типы значений:**
- `string` - строковое значение
- `number` - числовое значение

Компонент принимает следующие свойства:
- `value` - значение для отображения (строка или число);
- `href` - ссылка для перехода (используется совместно с navigate);
- `onClick` - обработчик клика (имеет приоритет над navigate и href);
- `navigate` - функция роутинга (из react-router);
- `view` - внешний вид ссылки ('accent' по умолчанию);
- `size` - размер текста ('s' или 'm');
- `showCopyButton` - показывать кнопку копирования;
- `color` - цвет текста;
- А также все свойства Link из sdds.

**Правильное применение ссылок:**
- Для перехода по ссылке используйте `href + navigate`:
  ```
  <ValueLink
    value="Ссылка"
    href="/details"
    navigate={navigate}
  />
  ```
- Для пользовательской логики при клике используйте `onClick` (он имеет приоритет над navigate).

@summary универсальная гиперссылка с поддержкой роутинга и onClick
```

### raw props type
```ts
export type TValueLinkProps = TPrettify<{
    /** Значение для отображения (строка или число) */
    value: TFormatterValue<string | number>;
    /** Функция роутинга из react-router. Вызывается при клике, если не задан onClick */
    navigate?: NavigateFunction;
} & TDisplayTextBaseProps & TLinkRest>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueNumber
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueNumberProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueNumberProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<number>;
    /** Флаг скрытия дробной части. По умолчанию false. */
    hideFraction?: boolean;
} & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValuePercent
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValuePercentProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValuePercentProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<number>;
    /** Флаг скрытия дробной части. По умолчанию false. */
    hideFraction?: boolean;
} & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValuePrice
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValuePriceProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValuePriceProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<number>;
    /** Символ валюты. */
    symbol?: TFormatterValue<string>;
    /** Unicode символ валюты. */
    unicodeSymbol?: TFormatterValue<string>;
    /** Название валюты. */
    name: TFormatterValue<string>;
    /** Флаг скрытия дробной части. По умолчанию false. */
    hideFraction?: boolean;
    /** Флаг видимости всплывающей подсказки. По умолчанию false. */
    tooltipVisible?: boolean;
} & TDisplayTextBaseProps & TPropsFromTooltip>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueText
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueTextProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueTextProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<string | number>;
    /** Флаг отображения с эллипсисом и подсказкой. */
    isEllipsisInfo?: boolean;
    /** Флаг запрета переноса текста. */
    noWrap?: boolean;
} & TPropsFromEllipsisInfo & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueTime
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueTimeProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueTimeProps = TPrettify<
/** Формат времени. */
TFormatTime & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueTimeRange
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueTimeRangeProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueTimeRangeProps = TPrettify<
/** Формат диапазона времени. */
TFormatTimeRange & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ValueUnit
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./components/display

propsType: TValueUnitProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type TValueUnitProps = TPrettify<{
    /** Значение для отображения. */
    value: TFormatterValue<number>;
    /** Название единицы измерения. */
    name: TFormatterValue<string>;
    /** Описание единицы измерения. */
    description: TFormatterValue<string>;
    /** Флаг скрытия дробной части. По умолчанию false. */
    hideFraction?: boolean;
} & TDisplayTextBaseProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
