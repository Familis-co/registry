import { Label } from "@/registry/familis/ui/label"
import { Switch } from "@/registry/familis/ui/switch"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Switch",
  component: Switch,
  args: {
    id: "airplane-mode",
    size: "default",
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/switch)",
      },
    },
  },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Airplane Mode" })
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).not.toBeChecked()
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(2)
  },
}
export const Checked: Story = { args: { defaultChecked: true } }
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
