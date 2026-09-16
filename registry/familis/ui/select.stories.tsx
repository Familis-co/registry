import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { expect, within, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

function SelectDemo() {
  return (
    <Select items={items}>
      <SelectTrigger aria-label="Fruit" className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {items
            .filter((item) => item.value !== null)
            .map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const meta = {
  title: "UI/Select",
  component: SelectDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/select)",
      },
    },
  },
} satisfies Meta<typeof SelectDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Fruit" }))
    const page = within(canvasElement.ownerDocument.body)
    const list = await page.findByRole("listbox")
    await userEvent.click(await page.findByRole("option", { name: "Apple" }))
    await expect(canvas.getByRole("combobox", { name: "Fruit" })).toHaveTextContent("Apple")
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(list).not.toBeVisible())
  },
}
