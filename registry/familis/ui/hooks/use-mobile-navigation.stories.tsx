import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import { useMobileNavigation } from "@/registry/familis/ui/hooks/use-mobile-navigation"

function MobileNavigationExample() {
  const cleanup = useMobileNavigation()
  return <Button onClick={cleanup}>Complete mobile navigation</Button>
}

const meta = {
  title: "UI/Hooks/Mobile navigation",
  component: MobileNavigationExample,
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof MobileNavigationExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const body = document.body
    const previous = body.style.getPropertyValue("pointer-events")
    const priority = body.style.getPropertyPriority("pointer-events")
    try {
      body.style.setProperty("pointer-events", "none")
      // A child with an explicit pointer-events value remains usable while the body is locked.
      const button = canvas.getByRole("button", { name: "Complete mobile navigation" })
      button.style.setProperty("pointer-events", "auto")
      await userEvent.click(button)
      await expect(body.style.getPropertyValue("pointer-events")).toBe("")
      button.style.removeProperty("pointer-events")
      await userEvent.click(button)
      await expect(body.style.getPropertyValue("pointer-events")).toBe("")
    } finally {
      if (previous) body.style.setProperty("pointer-events", previous, priority)
      else body.style.removeProperty("pointer-events")
    }
  },
}
