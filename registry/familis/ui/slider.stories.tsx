import { Field, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import type { Meta, StoryObj } from "@storybook/react-vite"
function SliderDemo() {
  return (
    <Field className="w-80 max-w-full">
      <FieldLabel id="volume-label">Volume</FieldLabel>
      <Slider
        aria-labelledby="volume-label"
        defaultValue={[75]}
        max={100}
        step={1}
        className="mx-auto w-full max-w-xs"
      />
    </Field>
  )
}

const meta = {
  title: "UI/Slider",
  component: SliderDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/slider)",
      },
    },
  },
} satisfies Meta<typeof SliderDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
