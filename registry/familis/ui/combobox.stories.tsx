import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import type { Meta, StoryObj } from "@storybook/react-vite"
const frameworks = ["TanStack Start", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const

function ComboboxBasic() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const meta = {
  title: "UI/Combobox",
  component: ComboboxBasic,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/combobox)",
      },
    },
  },
} satisfies Meta<typeof ComboboxBasic>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
