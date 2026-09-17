import type { ComponentProps } from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/familis/ui/combobox"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const frameworks = ["TanStack Start", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  subcomponents: { ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem },
  args: {
    items: frameworks,
    placeholder: "Select a framework",
    showClear: false,
    disabled: false,
    onValueChange: fn(),
  },
  render: ({ placeholder, showClear, ...args }) => (
    <Combobox {...args}>
      <ComboboxInput
        placeholder={placeholder}
        aria-label="Framework"
        showClear={showClear}
        disabled={args.disabled}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/combobox)",
      },
    },
  },
} satisfies Meta<ComponentProps<typeof Combobox> & { placeholder?: string; showClear?: boolean }>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithDefaultValue: Story = { args: { defaultValue: "Astro", showClear: true } }
export const Disabled: Story = { args: { disabled: true } }
