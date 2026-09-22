import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { InputPhone, type InputPhoneProps } from "@/registry/familis/ui/input-phone"
import { Field, FieldLabel, FieldDescription } from "@/registry/familis/ui/field"

function Example(args: InputPhoneProps) {
  const [value, setValue] = useState(args.value ?? "")
  return (
    <Field
      data-invalid={args["aria-invalid"]}
      data-disabled={args.disabled}
      className="w-96 max-w-full"
    >
      <FieldLabel htmlFor="phone">Phone number</FieldLabel>
      <InputPhone
        {...args}
        id="phone"
        value={value}
        onChange={(next) => {
          setValue(next)
          args.onChange(next)
        }}
      />
      <FieldDescription>
        {args["aria-invalid"]
          ? "Enter a valid phone number."
          : "Choose a country and enter your phone number."}
      </FieldDescription>
      <output aria-label="Phone value">{value || "No number"}</output>
    </Field>
  )
}
const meta = {
  title: "UI/Phone input",
  component: InputPhone,
  render: (args) => <Example {...args} />,
  args: { onChange: fn() },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof InputPhone>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const input = canvas.getByRole("textbox", { name: "Phone number" })
    await expect(canvas.getByRole("option", { name: "🇧🇪 Belgium (+32)" })).toBeInTheDocument()
    await userEvent.type(input, "0470123456")
    await expect(args.onChange).toHaveBeenLastCalledWith("+32470123456")
    await userEvent.clear(input)
    await expect(args.onChange).toHaveBeenLastCalledWith("")
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: "Country" }), "FR")
    await userEvent.type(input, "0612345678")
    await expect(args.onChange).toHaveBeenLastCalledWith("+33612345678")
  },
}
export const CustomCountries: Story = {
  args: { defaultCountry: "FR", countries: ["FR", "BE", "CA"], addInternationalOption: true },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox", { name: "Country" })
    await expect(select).toHaveValue("FR")
    await expect(canvas.getByRole("option", { name: "🇨🇦 Canada (+1)" })).toBeInTheDocument()
    await expect(canvas.getByRole("option", { name: /^🌐/ })).toBeInTheDocument()
    await expect(canvas.queryByRole("option", { name: /Germany/ })).not.toBeInTheDocument()
  },
}
export const WithValue: Story = { args: { value: "+32470123456" } }
export const Disabled: Story = {
  args: { disabled: true, value: "+32470123456" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toBeDisabled()
    await expect(canvas.getByRole("combobox")).toBeDisabled()
  },
}
export const ReadOnly: Story = { args: { readOnly: true, value: "+32470123456" } }
export const Invalid: Story = { args: { "aria-invalid": true, value: "+32123" } }
export const Dark: Story = { globals: { theme: "dark" } }
