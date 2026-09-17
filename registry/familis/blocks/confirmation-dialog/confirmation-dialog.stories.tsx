import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor, within } from "storybook/test"
import {
  ConfirmationDialog,
  type ConfirmationDialogProps,
} from "@/registry/familis/blocks/confirmation-dialog/confirmation-dialog"
import { Button } from "@/registry/familis/ui/button"

const meta = {
  title: "UI/Blocks/Confirmation dialog",
  component: ConfirmationDialog,
  args: {
    trigger: <Button variant="outline">Archive conversation</Button>,
    title: "Archive this conversation?",
    description: "You can find it again in your archived conversations.",
    confirmLabel: "Archive",
    onConfirm: fn(),
    onOpenChange: fn(),
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof ConfirmationDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Archive conversation" })
    await userEvent.click(trigger)
    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole("alertdialog", { name: "Archive this conversation?" })
    await waitFor(() => expect(dialog).toBeVisible(), { timeout: 5000 })
    await userEvent.click(page.getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(page.queryByRole("alertdialog")).not.toBeInTheDocument(), {
      timeout: 5000,
    })
    await expect(args.onConfirm).not.toHaveBeenCalled()
    await waitFor(() => expect(trigger).toHaveFocus(), { timeout: 5000 })
  },
}
export const Confirm: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Archive conversation" }))
    const page = within(canvasElement.ownerDocument.body)
    await page.findByRole("alertdialog")
    await userEvent.click(page.getByRole("button", { name: "Archive" }))
    await waitFor(() => expect(page.queryByRole("alertdialog")).not.toBeInTheDocument(), {
      timeout: 5000,
    })
    await expect(args.onConfirm).toHaveBeenCalledOnce()
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false)
  },
}
export const Destructive: Story = {
  args: {
    trigger: <Button variant="outline">Delete draft</Button>,
    title: "Delete this draft?",
    description: "The draft will be permanently deleted.",
    confirmLabel: "Delete draft",
    variant: "destructive",
    defaultOpen: true,
  },
}
export const Pending: Story = {
  args: { onConfirm: fn(() => new Promise<void>(() => {})), pendingLabel: "Archiving…" },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Archive conversation" }))
    const page = within(canvasElement.ownerDocument.body)
    await page.findByRole("alertdialog")
    await userEvent.dblClick(page.getByRole("button", { name: "Archive" }))
    await expect(page.getByRole("button", { name: "Archiving…" })).toBeDisabled()
    await expect(page.getByRole("button", { name: "Cancel" })).toBeDisabled()
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(page.getByRole("alertdialog")).toBeVisible(), { timeout: 5000 })
    await expect(args.onConfirm).toHaveBeenCalledOnce()
  },
}
export const RetryAfterFailure: Story = {
  args: {
    onConfirm: fn<() => Promise<void>>(),
    errorMessage: "Could not archive this conversation. Try again.",
  },
  beforeEach: ({ args }) => {
    args.onConfirm.mockRejectedValueOnce(new Error("Request failed")).mockResolvedValue(undefined)
  },
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Archive conversation" }))
    const page = within(canvasElement.ownerDocument.body)
    await page.findByRole("alertdialog")
    await userEvent.click(page.getByRole("button", { name: "Archive" }))
    await expect(await page.findByRole("alert")).toHaveTextContent(args.errorMessage!)
    await waitFor(() => expect(page.getByRole("alertdialog")).toBeVisible(), { timeout: 5000 })
    await userEvent.click(page.getByRole("button", { name: "Archive" }))
    await waitFor(() => expect(page.queryByRole("alertdialog")).not.toBeInTheDocument(), {
      timeout: 5000,
    })
    await expect(args.onConfirm).toHaveBeenCalledTimes(2)
  },
}

function ControlledExample(args: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false)
  return (
    <ConfirmationDialog
      {...args}
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        args.onOpenChange?.(next)
      }}
    />
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
  play: Confirm.play,
}
export const Dark: Story = { globals: { theme: "dark" }, args: { defaultOpen: true } }
