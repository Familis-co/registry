import { Field, FieldLabel } from "@/registry/familis/ui/field"
import { Slider } from "@/registry/familis/ui/slider"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Slider",
  component: Slider,
  args: {
    "aria-labelledby": "volume-label",
    defaultValue: [75],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    className: "mx-auto w-full max-w-xs",
    onValueChange: fn(),
    onValueCommitted: fn(),
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  render: (args) => (
    <Field className="w-80 max-w-full">
      <FieldLabel id="volume-label">Volume</FieldLabel>
      <Slider {...args} />
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/slider)",
      },
    },
  },
} satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Range: Story = { args: { defaultValue: [25, 75] } }
export const Disabled: Story = { args: { disabled: true } }
