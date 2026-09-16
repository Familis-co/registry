import { useState } from "react"
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
import { expect, within, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("Pedro Duarte")
  const [username, setUsername] = useState("@peduarte")
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="username-1">Username</FieldLabel>
              <Input
                id="username-1"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
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
}

const meta = {
  title: "UI/Dialog",
  component: DialogDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/dialog)",
      },
    },
  },
} satisfies Meta<typeof DialogDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole("button", { name: "Open Dialog" })
    await userEvent.click(trigger)
    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole("dialog", { name: "Edit profile" })
    await expect(within(dialog).getByLabelText("Name")).toHaveValue("Pedro Duarte")
    await userEvent.click(within(dialog).getByRole("button", { name: "Cancel" }))
    await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
