import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Meta, StoryObj } from "@storybook/react-vite"
function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

const meta = {
  title: "UI/Tooltip",
  component: TooltipDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/tooltip)",
      },
    },
  },
} satisfies Meta<typeof TooltipDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
