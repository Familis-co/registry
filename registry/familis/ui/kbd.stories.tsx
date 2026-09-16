import { Kbd, KbdGroup } from "@/components/ui/kbd"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Kbd",
  component: Kbd,
  subcomponents: { KbdGroup },
  args: { children: "⌘" },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/kbd)",
      },
    },
  },
} satisfies Meta<typeof Kbd>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Modifiers: Story = {
  render: (args) => (
    <KbdGroup>
      <Kbd {...args}>⌘</Kbd>
      <Kbd {...args}>⇧</Kbd>
      <Kbd {...args}>⌥</Kbd>
      <Kbd {...args}>⌃</Kbd>
    </KbdGroup>
  ),
}
export const Combination: Story = {
  render: (args) => (
    <KbdGroup>
      <Kbd {...args}>Ctrl</Kbd>
      <span>+</span>
      <Kbd {...args}>B</Kbd>
    </KbdGroup>
  ),
}
