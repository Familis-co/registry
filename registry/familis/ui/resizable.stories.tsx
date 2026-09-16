import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import type { Meta, StoryObj } from "@storybook/react-vite"
function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="max-w-sm rounded-lg border">
      <ResizablePanel defaultSize="50%">
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
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
  )
}

const meta = {
  title: "UI/Resizable",
  component: ResizableDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/resizable)",
      },
    },
  },
} satisfies Meta<typeof ResizableDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
