import { Label } from "@/registry/familis/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/familis/ui/radio-group"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Radio Group",
  component: RadioGroup,
  subcomponents: { RadioGroupItem },
  args: { defaultValue: "comfortable", className: "w-fit", onValueChange: fn() },
  render: (args) => (
    <RadioGroup {...args}>
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
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/radio-group)",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const compact = canvas.getByRole("radio", { name: "Compact" })
    await userEvent.click(compact)
    await expect(compact).toBeChecked()
    await expect(args.onValueChange).toHaveBeenCalled()
  },
}
export const Disabled: Story = { args: { disabled: true } }
