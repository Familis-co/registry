import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Input",
  component: Input,
  args: {
    id: "input-demo-api-key",
    type: "password",
    placeholder: "sk-...",
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search", "tel", "url", "file"],
    },
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor={args.id}>API Key</FieldLabel>
      <Input {...args} />
      <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input)",
      },
    },
  },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { "aria-invalid": true } }
