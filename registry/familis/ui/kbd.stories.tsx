import { Kbd, KbdGroup } from "@/components/ui/kbd"
import type { Meta, StoryObj } from "@storybook/react-vite"
function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}

const meta = {
  title: "UI/Kbd",
  component: KbdDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/kbd)",
      },
    },
  },
} satisfies Meta<typeof KbdDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
