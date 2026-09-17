import { Checkbox } from "@/registry/familis/ui/checkbox"
import { Label } from "@/registry/familis/ui/label"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Label",
  component: Label,
  args: { children: "Accept terms and conditions", htmlFor: "terms" },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/label)",
      },
    },
  },
} satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithCheckbox: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label {...args} />
    </div>
  ),
}
