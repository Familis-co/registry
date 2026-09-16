import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, within } from "storybook/test"
import { Button } from "@/components/ui/button"
import { Toast, ToastAction, ToastClose, toast, Toaster } from "@/components/ui/toast"

const meta = {
  title: "UI/Toast",
  component: Toaster,
  subcomponents: { Toast, ToastAction, ToastClose },
  args: {
    title: "Project saved",
    description: "Your changes are available to the team.",
  },
  argTypes: {
    type: { control: "select", options: ["success", "info", "warning", "error", "loading"] },
  },
  render: ({ title, description, type, ...args }) => (
    <Toaster {...args}>
      <Button onClick={() => toast.add({ title, description, type })}>Show notification</Button>
    </Toaster>
  ),
} satisfies Meta<
  ComponentProps<typeof Toaster> & { title?: string; description?: string; type?: string }
>
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
export const Success: Story = { args: { type: "success" } }
export const ErrorToast: Story = {
  args: {
    type: "error",
    title: "Save failed",
    description: "Check your connection and try again.",
  },
}
