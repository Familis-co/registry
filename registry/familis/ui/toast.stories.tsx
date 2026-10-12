import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/familis/ui/dialog"
import { Toast, ToastAction, ToastClose, toast, Toaster } from "@/registry/familis/ui/toast"

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
/**
 * A toast raised while a dialog is open has to stay above the dialog overlay: form errors
 * are often reported from a dialog that remains open.
 */
export const AboveDialog: Story = {
  args: {
    type: "error",
    title: "Save failed",
    description: "Check your connection and try again.",
  },
  render: ({ title, description, type, ...args }) => (
    <Toaster {...args}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Saving reports its result in a notification.</DialogDescription>
          </DialogHeader>
          <Button onClick={() => toast.add({ title, description, type })}>Save changes</Button>
        </DialogContent>
      </Dialog>
    </Toaster>
  ),
  play: async ({ canvas, userEvent, canvasElement }) => {
    const { ownerDocument } = canvasElement
    const body = within(ownerDocument.body)
    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }))
    await userEvent.click(await body.findByRole("button", { name: "Save changes" }))

    const title = await body.findByText("Save failed")
    const notification = title.closest<HTMLElement>("[data-slot=toast]")!
    await waitFor(() => expect(notification.getAnimations()).toHaveLength(0))

    const { left, top, width, height } = title.getBoundingClientRect()
    await expect(
      notification.contains(ownerDocument.elementFromPoint(left + width / 2, top + height / 2)),
    ).toBe(true)

    await userEvent.hover(notification)
    await userEvent.click(await within(notification).findByRole("button", { name: "Close toast" }))
    await waitFor(() => expect(body.queryByText("Save failed")).not.toBeInTheDocument())
    await expect(body.getByRole("dialog", { name: "Edit profile" })).toBeVisible()
  },
}
