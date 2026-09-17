import { Progress, ProgressLabel, ProgressValue } from "@/registry/familis/ui/progress"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Progress",
  component: Progress,
  subcomponents: { ProgressLabel, ProgressValue },
  args: { "aria-label": "Project completion", value: 66, className: "w-[60%]" },
  argTypes: { value: { control: { type: "range", min: 0, max: 100, step: 1 } } },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/progress)",
      },
    },
  },
} satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Indeterminate: Story = { args: { value: null } }
export const WithLabel: Story = {
  args: {
    "aria-label": undefined,
    className: "w-80",
    children: (
      <>
        <ProgressLabel>Project completion</ProgressLabel>
        <ProgressValue />
      </>
    ),
  },
}
