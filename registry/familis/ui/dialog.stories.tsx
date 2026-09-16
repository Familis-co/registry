import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { expect, fn, within, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  },
  args: { onOpenChange: fn() },
  /**
   * Renders the dialog with local open state so submitting the form can close it.
   * @param args - Story args spread onto `Dialog`.
   * @returns The composed dialog.
   */
  render: function Render(args) {
    const [open, setOpen] = useState(args.defaultOpen ?? false)
    return (
      <Dialog
        {...args}
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          args.onOpenChange?.(nextOpen, eventDetails)
          setOpen(nextOpen)
        }}
      >
        <DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setOpen(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name-1">Name</FieldLabel>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel htmlFor="username-1">Username</FieldLabel>
                <Input id="username-1" name="username" defaultValue="@peduarte" />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/dialog)",
      },
    },
  },
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole("button", { name: "Open Dialog" })
    await userEvent.click(trigger)
    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole("dialog", { name: "Edit profile" })
    await expect(within(dialog).getByLabelText("Name")).toHaveValue("Pedro Duarte")
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false, expect.anything())
  },
}
