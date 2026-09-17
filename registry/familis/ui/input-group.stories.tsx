import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/registry/familis/ui/input-group"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Input Group",
  component: InputGroup,
  subcomponents: { InputGroupAddon, InputGroupInput, InputGroupButton, InputGroupText },
  args: { className: "max-w-xs" },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="Search..." aria-label="Search projects" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input-group)",
      },
    },
  },
} satisfies Meta<typeof InputGroup>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="example.com" aria-label="Website" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Copy</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args} data-disabled="true">
      <InputGroupInput placeholder="Search..." aria-label="Search projects" disabled />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  ),
}
