import { Separator } from "@/components/ui/separator"
import type { Meta, StoryObj } from "@storybook/react-vite"
function SeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">The Foundation for your Design System</div>
      </div>
      <Separator />
      <div>
        A set of beautifully designed components that you can customize, extend, and build on.
      </div>
    </div>
  )
}

const meta = {
  title: "UI/Separator",
  component: SeparatorDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/separator)",
      },
    },
  },
} satisfies Meta<typeof SeparatorDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
