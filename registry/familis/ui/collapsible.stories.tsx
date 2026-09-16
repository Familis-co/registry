import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleTrigger, CollapsibleContent },
  args: {
    defaultOpen: false,
    disabled: false,
    onOpenChange: fn(),
    className: "flex w-[350px] flex-col gap-2",
  },
  render: (args) => (
    <Collapsible {...args}>
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">Order #4189</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
          <ChevronsUpDown />
          <span className="sr-only">Toggle details</span>
        </CollapsibleTrigger>
      </div>
      <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium">Shipped</span>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Shipping address</p>
          <p className="text-muted-foreground">100 Market St, San Francisco</p>
        </div>
        <div className="rounded-md border px-4 py-2 text-sm">
          <p className="font-medium">Items</p>
          <p className="text-muted-foreground">2x Studio Headphones</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/collapsible)",
      },
    },
  },
} satisfies Meta<typeof Collapsible>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Open: Story = { args: { defaultOpen: true } }
export const Disabled: Story = { args: { disabled: true } }
