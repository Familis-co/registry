import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "@/components/ui/toast"

function ToastDemo() {
  return (
    <>
      <Button
        onClick={() =>
          toast.add({
            title: "Project saved",
            description: "Your changes are available to the team.",
          })
        }
      >
        Show notification
      </Button>
      <Toaster />
    </>
  )
}
const meta = { title: "UI/Toast", component: ToastDemo } satisfies Meta<typeof ToastDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show notification" }))
    await expect(
      await within(canvasElement.ownerDocument.body).findByText("Project saved"),
    ).toBeVisible()
  },
}
