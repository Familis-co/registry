import type * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { expect, fn, waitFor, within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Alert Dialog",
  component: AlertDialog,
  subcomponents: {
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
  },
  args: { size: "default", onOpenChange: fn() },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
  },
  render: ({ size, ...args }) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline" />}>Show Dialog</AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/alert-dialog)",
      },
    },
  },
} satisfies Meta<React.ComponentProps<typeof AlertDialog> & { size?: "default" | "sm" }>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show Dialog" }))
    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole("alertdialog")
    await waitFor(() => expect(dialog).toBeVisible())
    await expect(args.onOpenChange).toHaveBeenCalledWith(true, expect.anything())
    await userEvent.click(page.getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(page.queryByRole("alertdialog")).not.toBeInTheDocument())
  },
}
export const Small: Story = { args: { size: "sm" } }
