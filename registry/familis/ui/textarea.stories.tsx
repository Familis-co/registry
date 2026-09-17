import { Textarea } from "@/registry/familis/ui/textarea"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  args: { "aria-label": "Message", placeholder: "Type your message here.", onChange: fn() },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/textarea)",
      },
    },
  },
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const textarea = canvas.getByRole("textbox", { name: "Message" })
    await userEvent.type(textarea, "Hello")
    await expect(textarea).toHaveValue("Hello")
    await expect(args.onChange).toHaveBeenCalled()
  },
}
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Message" })).toBeDisabled()
  },
}
export const Invalid: Story = { args: { "aria-invalid": true } }
