import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import type { Meta, StoryObj } from "@storybook/react-vite"
function NativeSelectDemo() {
  return (
    <NativeSelect aria-label="Project status">
      <NativeSelectOption value="">Select status</NativeSelectOption>
      <NativeSelectOption value="todo">Todo</NativeSelectOption>
      <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
      <NativeSelectOption value="done">Done</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
    </NativeSelect>
  )
}

const meta = {
  title: "UI/Native Select",
  component: NativeSelectDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/native-select)",
      },
    },
  },
} satisfies Meta<typeof NativeSelectDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
