import { Badge } from "@/registry/familis/ui/badge"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Badge" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/badge)",
      },
    },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } }
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } }
export const Outline: Story = { args: { variant: "outline", children: "Outline" } }

export const Dark: Story = { globals: { theme: "dark" } }
