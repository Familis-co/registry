import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Toggle Group",
  component: ToggleGroup,
  subcomponents: { ToggleGroupItem },
  args: { variant: "outline", multiple: true, onValueChange: fn() },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    spacing: { control: "number" },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/toggle-group)",
      },
    },
  },
} satisfies Meta<typeof ToggleGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Single: Story = { args: { multiple: false, variant: "default" } }
export const Small: Story = { args: { size: "sm" } }
export const Attached: Story = { args: { spacing: 0 } }
export const Vertical: Story = { args: { orientation: "vertical" } }
export const Disabled: Story = { args: { disabled: true } }
