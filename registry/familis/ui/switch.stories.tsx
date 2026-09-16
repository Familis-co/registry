import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { expect } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

const meta = {
  title: "UI/Switch",
  component: SwitchDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/switch)",
      },
    },
  },
} satisfies Meta<typeof SwitchDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("switch", { name: "Airplane Mode" })
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).not.toBeChecked()
  },
}
