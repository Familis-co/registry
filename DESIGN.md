---
name: Familis
description: >-
  One brand blue on neutral grays, with compact controls and hairline surfaces.
  Built on shadcn/ui with Base UI, the base-nova style, Tailwind CSS v4 and Lucide icons.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.145 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.501476 0.11577 241.263)"
  primary-foreground: "oklch(0.985 0 0)"
  link: "oklch(0.501476 0.11577 241.263)"
  secondary: "oklch(0.97 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.54 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.205 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.501476 0.11577 241.263)"
  chart-1: "oklch(0.82 0.06 241.263)"
  chart-2: "oklch(0.68 0.1 241.263)"
  chart-3: "oklch(0.501476 0.11577 241.263)"
  chart-4: "oklch(0.42 0.095 241.263)"
  chart-5: "oklch(0.34 0.074 241.263)"
  sidebar: "oklch(0.985 0 0)"
  sidebar-foreground: "oklch(0.145 0 0)"
  sidebar-primary: "oklch(0.501476 0.11577 241.263)"
  sidebar-primary-foreground: "oklch(0.985 0 0)"
  sidebar-accent: "oklch(0.97 0 0)"
  sidebar-accent-foreground: "oklch(0.205 0 0)"
  sidebar-border: "oklch(0.922 0 0)"
  sidebar-ring: "oklch(0.501476 0.11577 241.263)"
colors-dark:
  background: "oklch(0.145 0 0)"
  foreground: "oklch(0.985 0 0)"
  card: "oklch(0.205 0 0)"
  card-foreground: "oklch(0.985 0 0)"
  popover: "oklch(0.205 0 0)"
  popover-foreground: "oklch(0.985 0 0)"
  primary: "oklch(0.501476 0.11577 241.263)"
  primary-foreground: "oklch(0.985 0 0)"
  link: "oklch(0.68 0.105 241.263)"
  secondary: "oklch(0.269 0 0)"
  secondary-foreground: "oklch(0.985 0 0)"
  muted: "oklch(0.269 0 0)"
  muted-foreground: "oklch(0.708 0 0)"
  accent: "oklch(0.269 0 0)"
  accent-foreground: "oklch(0.985 0 0)"
  destructive: "oklch(0.704 0.191 22.216)"
  border: "oklch(1 0 0 / 10%)"
  input: "oklch(1 0 0 / 15%)"
  ring: "oklch(0.68 0.105 241.263)"
  chart-1: "oklch(0.86 0.055 241.263)"
  chart-2: "oklch(0.77 0.082 241.263)"
  chart-3: "oklch(0.68 0.105 241.263)"
  chart-4: "oklch(0.59 0.112 241.263)"
  chart-5: "oklch(0.501476 0.11577 241.263)"
  sidebar: "oklch(0.205 0 0)"
  sidebar-foreground: "oklch(0.985 0 0)"
  sidebar-primary: "oklch(0.501476 0.11577 241.263)"
  sidebar-primary-foreground: "oklch(0.985 0 0)"
  sidebar-accent: "oklch(0.269 0 0)"
  sidebar-accent-foreground: "oklch(0.985 0 0)"
  sidebar-border: "oklch(1 0 0 / 10%)"
  sidebar-ring: "oklch(0.68 0.105 241.263)"
typography:
  heading:
    fontFamily: '"Manrope Variable", "Inter Variable", ui-sans-serif, system-ui, sans-serif'
  body:
    fontFamily: '"Inter Variable", ui-sans-serif, system-ui, sans-serif'
  serif:
    fontFamily: '"Source Serif 4 Variable", ui-serif, Georgia, Cambria, "Times New Roman", serif'
  mono:
    fontFamily: '"JetBrains Mono Variable", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.625rem
  xl: 0.875rem
  2xl: 1.125rem
  3xl: 1.375rem
  4xl: 1.625rem
spacing:
  unit: 0.25rem
components:
  button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    height: 2rem
  input:
    borderColor: "{colors.input}"
    rounded: "{rounded.lg}"
    height: 2rem
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
  badge:
    rounded: "{rounded.4xl}"
---

# Familis Design System

How Familis interfaces are built: the tokens every project shares, and the rules for composing components with them. It applies to this registry and to every project that installs from it.

This file is a `DESIGN.md` brand spec, the format the shadcn skill reads to theme a project. The frontmatter mirrors `src/styles.css`, which stays the source of truth: `pnpm test:registry` fails when the two differ. Projects do not copy these values by hand. They install them with the `familis` registry item (see [README.md](README.md)), and [Storybook](https://registry.familis.care/storybook/) renders every token and component.

## Overview

Familis is [shadcn/ui](https://ui.shadcn.com) on **Base UI** with the `base-nova` style, **Tailwind CSS v4** and **Lucide** icons. Components are distributed as source, so a project owns the files it installs.

The look is one brand blue on neutral grays. Geometry is compact: 32px controls, a 10px base radius, and hairlines instead of shadows on resting surfaces. Only floating layers cast a shadow.

## Colors

Colors are semantic roles. Each surface pairs with a `-foreground` token for the text and icons placed on it, and each role has a value per theme.

| Role                                 | Use                                                  |
| ------------------------------------ | ---------------------------------------------------- |
| `background` / `foreground`          | Page surface and default text                        |
| `card` / `card-foreground`           | Resting surfaces such as `Card`                      |
| `popover` / `popover-foreground`     | Floating surfaces: menus, popovers, dialogs          |
| `primary` / `primary-foreground`     | The main action and brand accents, in Familis blue   |
| `link`                               | Brand-colored text: links and the `link` variant     |
| `secondary` / `secondary-foreground` | Secondary actions                                    |
| `muted` / `muted-foreground`         | Subdued surfaces and secondary text                  |
| `accent` / `accent-foreground`       | Hover and selected states                            |
| `destructive`                        | Errors and destructive actions                       |
| `border`, `input`, `ring`            | Hairlines, form control borders, focus rings         |
| `chart-1` to `chart-5`               | Data visualization, a light-to-dark ramp of the blue |
| `sidebar`, `sidebar-*`               | The `Sidebar` component only                         |

Familis blue is `oklch(0.501476 0.11577 241.263)`, `#056a9f` in sRGB. It is `primary` in both themes, and the chart ramp shares its hue. On the dark background that blue is too dark for text, so `link` is the brand blue in the light theme and a lighter one, `oklch(0.68 0.105 241.263)`, in the dark theme. Apart from the red `destructive`, every other role is a neutral gray.

### Contrast

Measured from the values in the frontmatter, as WCAG 2 contrast ratios. Body text needs 4.5:1.

| Text on surface                       | Light | Dark  |
| ------------------------------------- | ----- | ----- |
| `foreground` on `background`          | 19.80 | 18.97 |
| `card-foreground` on `card`           | 19.80 | 17.18 |
| `primary-foreground` on `primary`     | 5.64  | 5.64  |
| `secondary-foreground` on `secondary` | 16.44 | 14.50 |
| `accent-foreground` on `accent`       | 16.44 | 14.50 |
| `muted-foreground` on `background`    | 5.02  | 7.66  |
| `muted-foreground` on `muted`         | 4.61  | 5.86  |
| `destructive` on `background`         | 4.77  | 6.85  |
| `link` on `background`                | 5.88  | 6.96  |

Every pair passes. `primary` itself is a surface color: as text it reaches only 3.36:1 on the dark background, which is why brand-colored text uses `link`.

### Dark theme

The dark theme is the `.dark` class on the root element. Roles change value between themes, so a component written with roles needs no `dark:` variant. The class also works on a section: `className="dark"` renders everything inside it with the dark values, which is how `Lightbox` stays dark in a light app.

## Typography

| Token          | Typeface       | Applied to                                       |
| -------------- | -------------- | ------------------------------------------------ |
| `font-sans`    | Inter          | The document, by default                         |
| `font-heading` | Manrope        | `h1` to `h6`, automatically                      |
| `font-mono`    | JetBrains Mono | `code`, `kbd`, `samp` and `pre`, automatically   |
| `font-serif`   | Source Serif 4 | Nothing by default: opt in for editorial content |

All four are variable fonts, self-hosted through Fontsource. Inter and Source Serif 4 ship with italics.

There is no Familis type scale beyond these families. Sizes and weights are the Tailwind scale, and components set most of their text at `text-sm` (14px), with `text-xs` for captions and metadata. Use semantic heading elements and they pick up Manrope without a class.

For long-form content such as articles, documentation or rendered Markdown, wrap it in `.typeset`. It sets rhythm, heading sizes, lists, tables and code for everything inside. Add `.typeset-docs` for documentation or `.typeset-chat` for conversations to adjust the rhythm. Exclude an embedded component with `.not-typeset`, and wrap a wide table in `.typeset-scroll`.

## Layout

Spacing is the Tailwind scale on a 4px unit. Space siblings with `gap-*` on their parent rather than margins on each child.

Controls share one height per size, so a button lines up with the field next to it:

| Size      | Height | Use                                   |
| --------- | ------ | ------------------------------------- |
| `xs`      | 24px   | Dense toolbars, inside other controls |
| `sm`      | 28px   | Secondary actions in tight layouts    |
| `default` | 32px   | Buttons, inputs, selects, tabs        |
| `lg`      | 36px   | A prominent standalone action         |

When a control height changes in one component, change the others with it. `button`, `input`, `input-group`, `select`, `native-select`, `combobox`, `toggle`, `input-otp`, `tabs`, `menubar` and `command` all carry the 32px default.

## Elevation

| Level    | Treatment                              | Used by                                             |
| -------- | -------------------------------------- | --------------------------------------------------- |
| Flat     | None                                   | Page, bands, inputs                                 |
| Hairline | `ring-1 ring-foreground/10`, no shadow | `Card`, `Dialog`, `AlertDialog`                     |
| Raised   | `shadow-md`                            | `Popover`, `Select`, `Combobox`, menus, `HoverCard` |
| Overlay  | `shadow-lg`                            | `Sheet`, `Toast`, submenus                          |

Shadows are the Tailwind defaults. A resting surface never takes one: separate it with a hairline or a `muted` fill.

## Shapes

Every radius derives from `--radius` (`0.625rem`, 10px), so one change reaches every corner.

| Class          | Radius | Used by                                         |
| -------------- | ------ | ----------------------------------------------- |
| `rounded-sm`   | 6px    | `Kbd`, small accents                            |
| `rounded-md`   | 8px    | Menu, select and command items                  |
| `rounded-lg`   | 10px   | Buttons, inputs, selects, tabs, popovers, menus |
| `rounded-xl`   | 14px   | Cards, dialogs, command palette                 |
| `rounded-2xl`  | 18px   | Toasts                                          |
| `rounded-4xl`  | 26px   | Badges                                          |
| `rounded-full` | Pill   | Avatars, switches, radios, sliders, progress    |

## Components

### Start from a component

Check the registry before writing markup. A styled `div` that repeats an existing component drifts from it over time.

| Need                            | Use                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Action                          | `Button` with a variant                                                                                           |
| Form control                    | `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `InputOTP`, `InputPhone` |
| Choice among 2 to 7 options     | `ToggleGroup`                                                                                                     |
| Callout                         | `Alert`                                                                                                           |
| Empty screen or result          | `Empty`                                                                                                           |
| Loading                         | `Skeleton` for layout, `Spinner` for an action in progress                                                        |
| Status label                    | `Badge`                                                                                                           |
| Divider                         | `Separator`                                                                                                       |
| Modal, side panel, bottom sheet | `Dialog`, `Sheet`, `Drawer`                                                                                       |
| Confirmation                    | `AlertDialog`, or the `confirmation-dialog` block for an asynchronous action                                      |
| Menu                            | `DropdownMenu`, `ContextMenu`, `Menubar`                                                                          |
| Navigation                      | `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Tabs`, `Pagination`                                                   |
| Tabular data                    | `Table`, or the `data-table` block for sorting, filtering and pagination                                          |
| Chart                           | `Chart`, colored with `chart-1` to `chart-5`                                                                      |
| Conversation                    | `MessageScroller`, `Message`, `Bubble`, `Attachment`, `Marker`                                                    |
| Media viewer                    | `Lightbox`                                                                                                        |

Blocks are compositions of these components for a recurring screen pattern. Install one when it matches, then edit the installed source: it belongs to the project.

### Changing an appearance

Stop at the first step that works:

1. A built-in variant: `variant="outline"`, `size="sm"`.
2. A new variant added to the component source, when the design calls for one across the product.
3. A new role in `src/styles.css`, when the design calls for a new color.

`Button` has six variants. Use one `default` button per group of actions, `outline` or `secondary` for the alternatives, `ghost` for toolbars and icon buttons, `destructive` for an action that deletes, and `link` for inline navigation.

### Base UI composition

These components wrap Base UI, whose API differs from the Radix examples found in most shadcn/ui tutorials.

```tsx
// A custom trigger uses `render`. Base UI has no `asChild`.
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>

// Rendering a button as another element needs `nativeButton={false}`.
<Button render={<a href="/docs" />} nativeButton={false}>Read the docs</Button>
```

- **`Select`** takes its options through an `items` prop on the root. A placeholder is an item with `value: null`.
- **`ToggleGroup`** and **`Accordion`** have no `type` prop. Pass `multiple` for multi-selection; `value` and `defaultValue` are always arrays.
- **`Slider`** takes a plain number for a single thumb and an array for a range.

### Forms

```tsx
<FieldGroup>
  <Field data-invalid>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <Input id="email" aria-invalid />
    <FieldDescription>Enter a valid email address.</FieldDescription>
  </Field>
</FieldGroup>
```

- **Lay out forms with `FieldGroup` and `Field`**, not a `div` with spacing utilities.
- **Mark an invalid field twice**: `data-invalid` on `Field` for the styling, `aria-invalid` on the control for assistive technology. A disabled field takes `data-disabled` on `Field` and `disabled` on the control.
- **Group related checkboxes or radios** with `FieldSet` and `FieldLegend`.
- **Put icons and buttons inside an input** with `InputGroup`, `InputGroupInput` and `InputGroupAddon`.

### Icons

Icons come from `lucide-react`.

```tsx
<Button>
  <SearchIcon data-icon="inline-start" />
  Search
</Button>
```

Mark an icon inside a `Button` with `data-icon`, `inline-start` or `inline-end`. The button sets its size and spacing, so the icon takes no size class. A pending button is `disabled` with a `Spinner` as its icon: `Button` has no loading prop.

### Feedback and conversations

Notifications use the `toast` component, built on Base UI toasts: `toast.add({ title, description, type })`. It is the Familis standard. The registry still publishes `sonner` and the `use-toast` hook for projects already built on Sonner; do not add them to new work.

Chat interfaces compose the chat components. `MessageScroller` owns scrolling, including following a streaming response and the jump-to-latest button, so a project writes no scroll logic of its own. Use `Attachment` for files and `Marker` for system notes and dividers. Apply the `shimmer` utility to text that represents work in progress, and `scroll-fade` to fade the edges of a scroll container.

## Accessibility

Components target WCAG 2.2 AA, and every story runs automated accessibility checks. What a project adds must keep to the same rules:

- **Focus stays visible.** Controls show a 3px ring in `ring` at 50% opacity with a `ring` border. Never remove an outline without replacing it.
- **Every control has a name.** An icon-only button takes `aria-label` or visually hidden text. `Dialog`, `Sheet`, `Drawer` and `Lightbox` take a title, with `className="sr-only"` when the design shows none.
- **Structure carries meaning.** Items live inside their group (`SelectItem` in `SelectGroup`, `DropdownMenuItem` in `DropdownMenuGroup`, `CommandItem` in `CommandGroup`), `TabsTrigger` inside `TabsList`, and `Avatar` includes an `AvatarFallback`.
- **Targets are at least 24px.** That is the `xs` control size, the smallest the system offers.
- **Status changes are announced.** Results that update without a page load go in an element with `role="status"`, as `search-toolbar` does for its result count.
- **Color is never the only signal.** Pair a status color with a label or an icon.

## Do's and Don'ts

| Do                                                                     | Don't                                                              |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Color with roles: `bg-primary`, `text-muted-foreground`.               | Use palette colors such as `bg-blue-600` or `text-gray-500`.       |
| Let roles switch themes.                                               | Add `dark:` color overrides.                                       |
| Use `className` on a component for layout: width, margin, grid.        | Override a component's colors, typography or padding.              |
| Use one `default` button per group of actions.                         | Put two primary buttons side by side.                              |
| Space siblings with `gap-*`.                                           | Use `space-x-*` or `space-y-*`.                                    |
| Use `size-10` when width and height match, and `truncate`.             | Write `w-10 h-10`, or the three truncation utilities.              |
| Merge conditional classes with `cn()` from `cn`.                       | Build class strings with template-literal ternaries.               |
| Let overlays manage their own stacking.                                | Add `z-index` to `Dialog`, `Popover`, `Tooltip` or other overlays. |
| Use the radius scale.                                                  | Hard-code a radius such as `rounded-[12px]`.                       |
| Separate resting surfaces with a hairline or a `muted` fill.           | Put a shadow on a `Card` or a page section.                        |
| Show a status with a `Badge` variant, and an error with `destructive`. | Reach for green or amber: there is no success or warning role.     |
| Color links and brand-colored text with `text-link`.                   | Use `text-primary` for text: it fails contrast in the dark theme.  |

## Known Gaps

- **Borders are about 1.3:1 against the page** in both themes. An input is identified by its border alone, which falls short of the 3:1 WCAG asks of control boundaries. Labels and focus rings compensate; the border values are the shadcn/ui defaults.
- **No success or warning role.** Add a role pair to `src/styles.css` and the `familis` item when a design needs one.
- **No Familis type scale, spacing scale, elevation scale or motion tokens.** These are the Tailwind and `base-nova` defaults.
- **Brand voice is not specified here.**

## Changing the system

A change here reaches every Familis product, so it follows the registry workflow in [README.md](README.md):

- **Colors, fonts or the logo**: "Changing brand foundations". Update `src/styles.css`, the `familis` and `font-*` items, and the frontmatter of this file together.
- **A new component, block or hook**: "Adding components". Each one ships with a story.
- **An upstream component update**: preview it with `pnpm dlx shadcn@latest add <component> --diff`, then merge it while keeping the Familis changes. Some components differ from upstream on purpose, for contrast and accessible names.

`pnpm lint` enforces the color and `className` rules above through [`@shadcn/lint`](https://github.com/shadcn-ui/lint): see "Design-system lint policy" in [README.md](README.md).
