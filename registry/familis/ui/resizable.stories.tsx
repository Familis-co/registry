import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/familis/ui/resizable"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Resizable",
  component: ResizablePanelGroup,
  subcomponents: { ResizablePanel, ResizableHandle },
  args: {
    orientation: "horizontal",
    className: "max-w-sm rounded-lg border",
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup
          orientation={args.orientation === "vertical" ? "horizontal" : "vertical"}
        >
          <ResizablePanel defaultSize="25%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/resizable)",
      },
    },
  },
} satisfies Meta<typeof ResizablePanelGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Vertical: Story = {
  args: { orientation: "vertical", className: "h-[200px] max-w-sm rounded-lg border" },
  render: (args) => (
    <ResizablePanelGroup {...args}>
      <ResizablePanel defaultSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="75%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
