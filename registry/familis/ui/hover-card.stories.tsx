import { Button } from "@/registry/familis/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/familis/ui/hover-card"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Hover Card",
  component: HoverCard,
  subcomponents: { HoverCardTrigger, HoverCardContent },
  args: { onOpenChange: fn() },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger delay={10} closeDelay={100} render={<Button variant="link" />}>
        Hover Here
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-0.5">
        <div className="font-semibold">@familis</div>
        <div>Shared components for Familis products.</div>
        <div className="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/hover-card)",
      },
    },
  },
} satisfies Meta<typeof HoverCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
