import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import type { Meta, StoryObj } from "@storybook/react-vite"
function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." aria-label="Search projects" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}

const meta = {
  title: "UI/Input Group",
  component: InputGroupDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input-group)",
      },
    },
  },
} satisfies Meta<typeof InputGroupDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
