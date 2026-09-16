import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Meta, StoryObj } from "@storybook/react-vite"
function InputDemo() {
  return (
    <Field>
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
    </Field>
  )
}

const meta = {
  title: "UI/Input",
  component: InputDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input)",
      },
    },
  },
} satisfies Meta<typeof InputDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
