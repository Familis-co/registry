import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

function SonnerDemo({ theme }: { theme: "light" | "dark" }) {
  return (
    <>
      <Button variant="outline" onClick={() => toast.success("Project saved")}>
        Show Sonner notification
      </Button>
      <Toaster theme={theme} />
    </>
  )
}
const meta = {
  title: "UI/Sonner",
  component: SonnerDemo,
  args: { theme: "light" },
  render: (args, context) => (
    <SonnerDemo {...args} theme={context.globals.theme === "dark" ? "dark" : "light"} />
  ),
  parameters: {
    docs: {
      description: {
        component:
          "Sonner is included for compatibility. New Base UI compositions use the Toast component.",
      },
    },
  },
} satisfies Meta<typeof SonnerDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
