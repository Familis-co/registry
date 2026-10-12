# Familis Design System

How Familis interfaces are built: the foundations every project shares, and the rules for composing them. It applies to this registry and to every project that installs from it.

The system is [shadcn/ui](https://ui.shadcn.com) on **Base UI** with the `base-nova` style, **Tailwind CSS v4**, and **Lucide** icons. Components are distributed as source through the registry, so a project owns the files it installs. [README.md](README.md) covers installation and registry authoring; [Storybook](https://registry.familis.care/storybook/) shows every token and component live.

## Foundations

`src/styles.css` is the source of truth for every value below. The `familis` registry item installs the same values in consuming projects, and `pnpm test:registry` fails when the two differ.

### Color

Colors are semantic tokens. Each surface token pairs with a `-foreground` token for the text and icons placed on it.

| Token                                | Use                                            |
| ------------------------------------ | ---------------------------------------------- |
| `background` / `foreground`          | Page surface and default text                  |
| `card` / `card-foreground`           | Raised surfaces such as `Card`                 |
| `popover` / `popover-foreground`     | Floating surfaces: menus, popovers, tooltips   |
| `primary` / `primary-foreground`     | Main action and brand accents, in Familis blue |
| `secondary` / `secondary-foreground` | Secondary actions                              |
| `muted` / `muted-foreground`         | Subdued surfaces, secondary text               |
| `accent` / `accent-foreground`       | Hover and selected states                      |
| `destructive`                        | Errors and destructive actions                 |
| `border`, `input`, `ring`            | Borders, form control borders, focus rings     |
| `chart-1` to `chart-5`               | Data visualization, a light-to-dark blue ramp  |
| `sidebar`, `sidebar-*`               | The `Sidebar` component only                   |

Familis blue is `oklch(0.501476 0.11577 241.263)`. It is `primary` in both themes, and the chart ramp shares its hue. Apart from the red `destructive`, every other token is a neutral gray.

There is no success or warning token. Show a positive or neutral status with a `Badge` variant, and an error with `destructive`. When a design needs a new status color, add a token pair to `src/styles.css` and the `familis` item rather than reaching for a Tailwind palette color.

### Dark theme

The dark theme is the `.dark` class on the root element. Tokens change value between themes, so a component written with tokens needs no `dark:` variant. The catalog uses `next-themes` with `attribute="class"`.

### Typography

| Token          | Typeface       | Applied to                                       |
| -------------- | -------------- | ------------------------------------------------ |
| `font-sans`    | Inter          | The document, by default                         |
| `font-heading` | Manrope        | `h1` to `h6`, automatically                      |
| `font-mono`    | JetBrains Mono | `code`, `kbd`, `samp` and `pre`, automatically   |
| `font-serif`   | Source Serif 4 | Nothing by default: opt in for editorial content |

Use semantic heading elements and they pick up Manrope without a class. Sizes and weights are the Tailwind scale (`text-sm`, `font-medium`).

For long-form content such as articles, documentation or rendered Markdown, wrap it in `.typeset`. It sets rhythm, heading sizes, lists, tables and code for everything inside. Exclude an embedded component with `.not-typeset`, and wrap a wide table in `.typeset-scroll`.

### Radius, spacing and shadow

- **Radius** derives from `--radius` (`0.625rem`): `rounded-sm` to `rounded-4xl` are multiples of it. Use the scale so a change to `--radius` reaches every corner.
- **Spacing** and **shadow** are the Tailwind defaults.

### Logo

`Logo` renders the wordmark, or the mark alone with `variant="symbol"` for tight spaces such as a collapsed sidebar. It is Familis blue in the light theme and the foreground color in the dark theme. Size it with a height class and leave the width automatic.

## Composing interfaces

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

### Styling

Change appearance in this order, stopping at the first that works:

1. A built-in variant: `variant="outline"`, `size="sm"`.
2. A new variant added to the component source, when the design calls for one across the product.
3. A new token in `src/styles.css`, when the design calls for a new color.

`className` on a component is for layout: width, margin, grid placement. Colors, typography and internal spacing belong to the component.

```tsx
// Layout on the component, appearance from its variant.
<Button variant="outline" className="w-full">Cancel</Button>

// Restyles the component and breaks in the dark theme.
<Button className="bg-blue-600 px-6 text-white">Cancel</Button>
```

- **Tokens, never palette colors.** `bg-primary` and `text-muted-foreground`, not `bg-blue-600` or `text-gray-500`.
- **No `dark:` color overrides.** Tokens already switch.
- **`gap-*`, not `space-x-*` or `space-y-*`.** A vertical stack is `flex flex-col gap-4`.
- **`size-*` when width and height match.** `size-10`, not `w-10 h-10`.
- **`truncate`** rather than its three utilities.
- **`cn()` for conditional classes**, imported from `cn`, not template-literal ternaries.
- **No `z-index` on overlays.** `Dialog`, `Popover`, `Tooltip` and the other overlays manage their own stacking.

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

Structure that assistive technology depends on:

- **Items live inside their group**: `SelectItem` in `SelectGroup`, `DropdownMenuItem` in `DropdownMenuGroup`, `CommandItem` in `CommandGroup`.
- **`Dialog`, `Sheet`, `Drawer` and `Lightbox` need a title.** Add `className="sr-only"` when the design shows none.
- **`TabsTrigger` lives inside `TabsList`.**
- **`Avatar` includes an `AvatarFallback`.**
- **`Card` uses its parts**: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

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

- **Mark an icon inside a `Button` with `data-icon`**, `inline-start` or `inline-end`. The button sets its size and spacing, so the icon takes no size class.
- **Give an icon-only button an accessible name** with `aria-label` or visually hidden text.
- **A pending button** is `disabled` with a `Spinner` as its icon. `Button` has no loading prop.

### Feedback

Notifications use the `toast` component: `toast.add({ title, description, type })`. The registry also publishes `sonner` and the `use-toast` hook for projects already built on Sonner. Use one of the two in a project, not both.

### Conversations

Chat interfaces compose the chat components. `MessageScroller` owns scrolling, including following a streaming response and the jump-to-latest button, so a project writes no scroll logic of its own. Use `Attachment` for files and `Marker` for system notes and dividers. Apply the `shimmer` utility to text that represents work in progress, and `scroll-fade` to fade the edges of a scroll container.

## Changing the system

A change here reaches every Familis product, so it follows the registry workflow in [README.md](README.md):

- **Colors, fonts or the logo**: "Changing brand foundations". Update `src/styles.css` and the `familis` and `font-*` items together.
- **A new component, block or hook**: "Adding components". Each one ships with a story.
- **An upstream component update**: preview it with `pnpm dlx shadcn@latest add <component> --diff`, then merge it while keeping the Familis changes.

Some components differ from upstream on purpose, for contrast and accessible names. Read the diff before overwriting one.

## Enforcement

- `pnpm test:registry` checks that the installable style matches `src/styles.css`, and that each item declares what it imports.
- `pnpm test:stories` renders every story in Chromium with interaction and accessibility checks.
- [`@shadcn/lint`](https://github.com/shadcn-ui/lint) is registered in `.oxlintrc.json` and can enforce the styling rules above. Its rules are off until the team chooses a policy: see "Design-system lint policy" in [README.md](README.md).
