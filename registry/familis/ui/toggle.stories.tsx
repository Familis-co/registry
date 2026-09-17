import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/familis/ui/toggle"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  args: {
    "aria-label": "Toggle bookmark",
    variant: "outline",
    size: "sm",
    onPressedChange: fn(),
    children: (
      <>
        <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
        Bookmark
      </>
    ),
  },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/toggle)",
      },
    },
  },
} satisfies Meta<typeof Toggle>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle bookmark" })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
    await expect(args.onPressedChange).toHaveBeenCalledWith(true, expect.anything())
  },
}
export const Ghost: Story = { args: { variant: "default" } }
export const Pressed: Story = {
  args: { defaultPressed: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Toggle bookmark" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  },
}
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Toggle bookmark" })).toBeDisabled()
  },
}
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Toggle {...args} size="sm" />
      <Toggle {...args} size="default" />
      <Toggle {...args} size="lg" />
    </div>
  ),
}
