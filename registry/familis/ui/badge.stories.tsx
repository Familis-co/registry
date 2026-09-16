import { Badge } from "@/components/ui/badge"
import type { Meta, StoryObj } from "@storybook/react-vite"
function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

const meta = {
  title: "UI/Badge",
  component: BadgeDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/badge)",
      },
    },
  },
} satisfies Meta<typeof BadgeDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const Dark: Story = { parameters: { theme: "dark" } }
