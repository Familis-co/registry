import * as React from "react"
import { useArgs } from "storybook/preview-api"
import { toast, Toaster } from "@/registry/familis/ui/toast"
import { Badge } from "@/registry/familis/ui/badge"
import { Button } from "@/registry/familis/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/familis/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/familis/ui/field"
import { RadioGroup, RadioGroupItem } from "@/registry/familis/ui/radio-group"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
]

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
  },
  args: {
    open: false,
    modal: true,
    swipeDirection: "right",
    showSwipeHandle: false,
    onOpenChange: fn(),
  },
  argTypes: {
    swipeDirection: { control: "select", options: ["up", "down", "left", "right"] },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<{ open?: boolean }>()
    const [deliveryTime, setDeliveryTime] = React.useState("asap")

    function handleConfirm() {
      const selected = deliveryTimes.find((time) => time.value === deliveryTime)

      if (!selected) {
        return
      }

      updateArgs({ open: false })
      toast.add({ title: "Delivery time confirmed", description: selected.label })
    }

    return (
      <Drawer
        {...args}
        onOpenChange={(open, eventDetails) => {
          updateArgs({ open })
          args.onOpenChange?.(open, eventDetails)
        }}
      >
        <Toaster />
        <DrawerTrigger render={<Button variant="secondary" />}>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Pick a delivery time</DrawerTitle>
            <DrawerDescription>
              We&apos;ll prepare your order as soon as possible.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 scroll-fade overflow-y-auto p-4">
            <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime} className="gap-2">
              {deliveryTimes.map((time) => (
                <FieldLabel key={time.value} htmlFor={time.id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle className="flex items-center gap-2">
                        {time.label}
                        {time.badge ? <Badge variant="secondary">{time.badge}</Badge> : null}
                      </FieldTitle>
                      <FieldDescription>{time.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={time.value} id={time.id} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </div>
          <DrawerFooter>
            <Button onClick={handleConfirm} size="default">
              Confirm Delivery Time
            </Button>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/drawer)",
      },
    },
  },
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Bottom: Story = { args: { swipeDirection: "down", showSwipeHandle: true } }
