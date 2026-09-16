import type * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { expect, fn, within, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const meta = {
  title: "UI/Select",
  component: Select,
  subcomponents: {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
  },
  args: { items, size: "default", onValueChange: fn(), onOpenChange: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
    defaultValue: {
      control: "select",
      options: items.map((item) => item.value),
    },
  },
  render: ({ size, ...args }) => (
    <Select {...args}>
      <SelectTrigger aria-label="Fruit" size={size} className="w-full max-w-48">
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
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/select)",
      },
    },
  },
} satisfies Meta<React.ComponentProps<typeof Select> & { size?: "sm" | "default" }>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Fruit" }))
    const page = within(canvasElement.ownerDocument.body)
    const list = await page.findByRole("listbox")
    await userEvent.click(await page.findByRole("option", { name: "Apple" }))
    await expect(canvas.getByRole("combobox", { name: "Fruit" })).toHaveTextContent("Apple")
    await expect(args.onValueChange).toHaveBeenCalledWith("apple", expect.anything())
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(list).not.toBeVisible())
  },
}
export const WithDefaultValue: Story = { args: { defaultValue: "banana" } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
