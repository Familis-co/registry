import { Textarea } from "@/components/ui/textarea"
import type { Meta, StoryObj } from "@storybook/react-vite"
function TextareaDemo() {
  return <Textarea aria-label="Message" placeholder="Type your message here." />
}

const meta = {
  title: "UI/Textarea",
  component: TextareaDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/textarea)",
      },
    },
  },
} satisfies Meta<typeof TextareaDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
