import { Skeleton } from "@/components/ui/skeleton"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  args: { className: "h-4 w-[250px]" },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/skeleton)",
      },
    },
  },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Circle: Story = { args: { className: "h-12 w-12 rounded-full" } }
export const Profile: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton {...args} />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}
