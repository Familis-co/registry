import { Skeleton } from "@/components/ui/skeleton"
import type { Meta, StoryObj } from "@storybook/react-vite"
function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

const meta = {
  title: "UI/Skeleton",
  component: SkeletonDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/skeleton)",
      },
    },
  },
} satisfies Meta<typeof SkeletonDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
