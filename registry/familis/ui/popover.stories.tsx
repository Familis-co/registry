import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Popover",
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverContent },
  args: { defaultOpen: false, modal: false, onOpenChange: fn() },
  argTypes: {
    modal: { control: "select", options: [false, true, "trap-focus"] },
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Edit dimensions</PopoverTrigger>
      <PopoverContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="width">Width</FieldLabel>
            <Input id="width" defaultValue="100%" />
          </Field>
          <Field>
            <FieldLabel htmlFor="height">Height</FieldLabel>
            <Input id="height" defaultValue="320px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/popover)",
      },
    },
  },
} satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Open: Story = { args: { defaultOpen: true } }
