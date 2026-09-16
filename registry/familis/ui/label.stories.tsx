import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Meta, StoryObj } from "@storybook/react-vite"
function LabelDemo() {
  return (
    <div className="flex gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

const meta = {
  title: "UI/Label",
  component: LabelDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/label)",
      },
    },
  },
} satisfies Meta<typeof LabelDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
