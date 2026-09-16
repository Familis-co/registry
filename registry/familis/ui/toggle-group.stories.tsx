import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Meta, StoryObj } from "@storybook/react-vite"
function ToggleGroupDemo() {
  return (
    <ToggleGroup variant="outline" multiple>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

const meta = {
  title: "UI/Toggle Group",
  component: ToggleGroupDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/toggle-group)",
      },
    },
  },
} satisfies Meta<typeof ToggleGroupDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
