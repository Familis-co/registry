import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"
import { useIsMobile } from "@/registry/familis/ui/hooks/use-mobile"

function MobileExample() {
  const isMobile = useIsMobile()
  return <p role="status">{isMobile ? "Mobile viewport" : "Desktop viewport"}</p>
}

const meta = {
  title: "UI/Hooks/Mobile breakpoint",
  component: MobileExample,
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof MobileExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const expected = window.matchMedia("(max-width: 767px)").matches
      ? "Mobile viewport"
      : "Desktop viewport"
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent(expected))
  },
}
