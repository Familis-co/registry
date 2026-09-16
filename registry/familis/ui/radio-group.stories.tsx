import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Meta, StoryObj } from "@storybook/react-vite"
function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}

const meta = {
  title: "UI/Radio Group",
  component: RadioGroupDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/radio-group)",
      },
    },
  },
} satisfies Meta<typeof RadioGroupDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
