import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { expect } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function CheckboxDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-2" name="terms-checkbox-2" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-2">Accept terms and conditions</FieldLabel>
          <FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox" name="toggle-checkbox" disabled />
        <FieldLabel htmlFor="toggle-checkbox">Enable notifications</FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}

const meta = {
  title: "UI/Checkbox",
  component: CheckboxDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/checkbox)",
      },
    },
  },
} satisfies Meta<typeof CheckboxDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getAllByRole("checkbox", { name: "Accept terms and conditions" })[0]!
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    const disabled = canvas
      .getAllByRole("checkbox", { name: "Enable notifications" })
      .find((control) => control.getAttribute("aria-disabled") === "true")!
    await expect(disabled).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(disabled)
    await expect(disabled).not.toBeChecked()
  },
}
