# sdds-cs — Typography & style tokens

Level: `@salutejs/sdds-cs` (typography components) and `@salutejs/sdds-themes` (color tokens,
pinned into cs-portal). Always `import { X } from '@sber-front-cs-core/cs-portal'`.

---

### Typography components

JSX replacements for raw HTML tags (`h1`, `p`...). Scale, largest to smallest:

| Group     | Components                                     | Use for                              |
| --------- | ---------------------------------------------- | ------------------------------------ |
| Hero      | `DsplL`, `DsplM`, `DsplS`                      | large marketing/landing headings     |
| Headings  | `H1`, `H2`, `H3`, `H4`, `H5`                   | page/section headings                |
| Interface | `BodyL`, `BodyM`, `BodyS`, `BodyXS`, `BodyXXS` | labels, buttons, captions, UI chrome |
| Text      | `TextL`, `TextM`, `TextS`, `TextXS`            | article/paragraph body, descriptions |

Shared props: `as` (override rendered tag, e.g. `<BodyM as="span">`), `bold`/`medium`/`extraBold`
(weight, component-config dependent), `isItalic`, `isNumeric` (tabular/monospace numbers),
`breakWord` (default `true`), `noWrap` (default `false`).

```tsx
<H2 medium>Heading</H2>
<BodyM as="span" bold>Label</BodyM>
<TextS>Paragraph body text.</TextS>
```

Fonts (SB Sans Text/Display/Mono) load via CDN `<link>` at the app shell level, not per component
— nothing to configure per-usage.

---

### Style mixins (`bodyM`, `h3Bold`, ...)

CSS-in-JS functions for the same scale, for use inside `styled(...)`/`css` templates instead of a
component — e.g. styling text inside an element that isn't a typography component itself.
Naming: `{scale}{Weight?}` where scale is `dspl{L|M|S}` / `h{1-5}` / `body{L|M|S|XS|XXS}` /
`text{L|M|S|XS}`, and an optional `Bold` suffix selects the bold cut (34 total: every scale name,
plus `Bold` for all except the numbered headings which already differ per level).

```tsx
import styled from '@emotion/styled'
const Label = styled.span`
    ${bodyMBold}
`
```

Prefer a typography _component_ (above) when you're rendering an actual text node; reach for a
mixin only when you need the typography styles applied to something else (e.g. a styled
non-text element, or composed with other CSS).

---

### Style mixin helpers (from `@salutejs/sdds-cs`'s `utils/mixins`, not re-exported by cs-portal — import directly: `import { addFocus, applyPaper } from '@salutejs/sdds-cs'`)

- **`addFocus(options?)`** — adds a focus ring via `::before` (doesn't affect layout/scroll).
  `outlineColor` (default `var(--text-accent)`), `outlineSize`, `outlineOffset` (negative = inside
  the element), `outlineRadius`, `hasTransition`.
    ```tsx
    const Focusable = styled.div`
        ${addFocus({ outlineColor: 'var(--text-accent)' })}
    `
    ```
- **`applyPaper(options)`** — returns a style object for a themed "paper" surface (background +
  radius + shadow, all as theme tokens).
    ```tsx
    <div
        style={applyPaper({
            backgroundColor: 'surfaceAccent',
            borderRadius: 'borderRadiusM',
            shadow: 'shadowDownHardM',
        })}
    >
        Card
    </div>
    ```

---

### Color tokens (`sdds-themes`)

CSS custom-property-backed color tokens, used as plain values (`color: textSecondary` in a
styled-components template, or via `var(--...)` — check one usage site for the exact form this
codebase uses). Grouped by prefix; the app code uses these most:

| Prefix                 | Examples                                                     | Meaning                                                  |
| ---------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `text*`                | `textPrimary`, `textSecondary`, `textAccent`, `textNegative` | text color by role                                       |
| `surface*`             | `surfaceAccent`, `surfaceSolidTertiary`                      | fill/background color by role                            |
| `background*`          | `backgroundColor`                                            | page/container background                                |
| `onLight*` / `onDark*` | `onLightSurfaceSolidSecondary`                               | color meant for use on a light/dark surface specifically |

There's no separate token browser page on the docs site — treat this table as a starting map, not
an exhaustive list; grep the codebase for more `textX`/`surfaceX` names in use before inventing a
new one.

---

See also: [actions.md](actions.md), [inputs-forms.md](inputs-forms.md).
