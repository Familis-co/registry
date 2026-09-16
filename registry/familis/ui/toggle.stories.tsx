import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { expect } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  )
}

const meta = {
  title: "UI/Toggle",
  component: ToggleDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/toggle)",
      },
    },
  },
} satisfies Meta<typeof ToggleDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle bookmark" })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute("aria-pressed", "true")
  },
}
