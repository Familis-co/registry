import { Separator } from "@/components/ui/separator"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Separator",
  component: Separator,
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">shadcn/ui</div>
        <div className="text-muted-foreground">The Foundation for your Design System</div>
      </div>
      <Separator {...args} />
      <div>
        A set of beautifully designed components that you can customize, extend, and build on.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/separator)",
      },
    },
  },
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Blog</div>
      <Separator {...args} />
      <div>Docs</div>
      <Separator {...args} />
      <div>Source</div>
    </div>
  ),
}
