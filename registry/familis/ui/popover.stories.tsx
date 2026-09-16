import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Meta, StoryObj } from "@storybook/react-vite"
function PopoverDemo() {
  const [width, setWidth] = useState("100%")
  const [height, setHeight] = useState("320px")
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Edit dimensions</PopoverTrigger>
      <PopoverContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="width">Width</FieldLabel>
            <Input id="width" value={width} onChange={(event) => setWidth(event.target.value)} />
          </Field>
          <Field>
            <FieldLabel htmlFor="height">Height</FieldLabel>
            <Input id="height" value={height} onChange={(event) => setHeight(event.target.value)} />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}

const meta = {
  title: "UI/Popover",
  component: PopoverDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/popover)",
      },
    },
  },
} satisfies Meta<typeof PopoverDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
