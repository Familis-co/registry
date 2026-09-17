import type { ComponentProps } from "react"
import { Button } from "@/registry/familis/ui/button"
import { Input } from "@/registry/familis/ui/input"
import { Label } from "@/registry/familis/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/familis/ui/sheet"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  subcomponents: {
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
  },
  args: { side: "right", onOpenChange: fn() },
  argTypes: {
    side: { control: "select", options: ["top", "right", "bottom", "left"] },
  },
  render: ({ side, ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/sheet)",
      },
    },
  },
} satisfies Meta<
  ComponentProps<typeof Sheet> & { side?: ComponentProps<typeof SheetContent>["side"] }
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Top: Story = { args: { side: "top" } }
export const Bottom: Story = { args: { side: "bottom" } }
export const Left: Story = { args: { side: "left" } }
