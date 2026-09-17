import { Checkbox } from "@/registry/familis/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/registry/familis/ui/field"
import { Label } from "@/registry/familis/ui/label"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  args: {
    id: "terms-checkbox",
    name: "terms-checkbox",
    disabled: false,
    onCheckedChange: fn(),
  },
  render: (args) => (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox {...args} />
        <Label htmlFor={args.id}>Accept terms and conditions</Label>
      </Field>
    </FieldGroup>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/checkbox)",
      },
    },
  },
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole("checkbox", { name: "Accept terms and conditions" })
    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await expect(args.onCheckedChange).toHaveBeenCalledOnce()
  },
}
export const WithDescription: Story = {
  args: { id: "terms-checkbox-2", name: "terms-checkbox-2", defaultChecked: true },
  render: (args) => (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal">
        <Checkbox {...args} />
        <FieldContent>
          <FieldLabel htmlFor={args.id}>Accept terms and conditions</FieldLabel>
          <FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
}
export const Disabled: Story = {
  args: { id: "toggle-checkbox", name: "toggle-checkbox", disabled: true },
  render: (args) => (
    <FieldGroup className="max-w-sm">
      <Field orientation="horizontal" data-disabled={args.disabled || undefined}>
        <Checkbox {...args} />
        <FieldLabel htmlFor={args.id}>Enable notifications</FieldLabel>
      </Field>
    </FieldGroup>
  ),
  play: async ({ args, canvas, userEvent }) => {
    const disabled = canvas.getByRole("checkbox", { name: "Enable notifications" })
    await expect(disabled).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(disabled)
    await expect(disabled).not.toBeChecked()
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
  },
}
export const Card: Story = {
  args: { id: "toggle-checkbox-2", name: "toggle-checkbox-2" },
  render: (args) => (
    <FieldGroup className="max-w-sm">
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox {...args} />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
}
