import { Button } from "@/registry/familis/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/familis/ui/tooltip"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  subcomponents: { TooltipTrigger, TooltipContent },
  args: { onOpenChange: fn() },
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/tooltip)",
      },
    },
  },
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
