import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/registry/familis/ui/native-select"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Native Select",
  component: NativeSelect,
  subcomponents: { NativeSelectOption, NativeSelectOptGroup },
  args: {
    "aria-label": "Project status",
    size: "default",
    disabled: false,
    onChange: fn(),
    children: (
      <>
        <NativeSelectOption value="">Select status</NativeSelectOption>
        <NativeSelectOption value="todo">Todo</NativeSelectOption>
        <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        <NativeSelectOption value="done">Done</NativeSelectOption>
        <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
      </>
    ),
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/native-select)",
      },
    },
  },
} satisfies Meta<typeof NativeSelect>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { "aria-invalid": true } }
export const WithGroups: Story = {
  args: {
    defaultValue: "in-progress",
    children: (
      <>
        <NativeSelectOptGroup label="Open">
          <NativeSelectOption value="todo">Todo</NativeSelectOption>
          <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Closed">
          <NativeSelectOption value="done">Done</NativeSelectOption>
          <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
        </NativeSelectOptGroup>
      </>
    ),
  },
}
