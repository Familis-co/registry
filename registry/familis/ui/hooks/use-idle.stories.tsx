import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fireEvent, waitFor } from "storybook/test"
import { useIdle } from "@/registry/familis/ui/hooks/use-idle"

function IdleExample({ ms }: { ms: number }) {
  const idle = useIdle(ms)
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Move, type, or scroll to reset the {ms} ms timeout.
      </p>
      <p role="status">{idle ? "Idle" : "Active"}</p>
    </div>
  )
}

const meta = {
  title: "UI/Hooks/Idle",
  component: IdleExample,
  args: { ms: 1000 },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof IdleExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status")
    await waitFor(() => expect(status).toHaveTextContent("Idle"), { timeout: 2500 })
    fireEvent.keyDown(window, { key: "a" })
    await waitFor(() => expect(status).toHaveTextContent("Active"))
    await waitFor(() => expect(status).toHaveTextContent("Idle"), { timeout: 2500 })
    fireEvent(document, new Event("visibilitychange"))
    await waitFor(() => expect(status).toHaveTextContent("Active"))
  },
}

export const FrequentActivity: Story = {
  args: { ms: 300 },
  play: async ({ canvas }) => {
    const status = canvas.getByRole("status")
    await waitFor(() => expect(status).toHaveTextContent("Idle"))
    // Each event must reactivate immediately, including events within the former 500 ms throttle.
    for (const event of ["mousemove", "mousedown", "resize", "touchstart", "wheel"]) {
      fireEvent(window, new Event(event))
      await waitFor(() => expect(status).toHaveTextContent("Active"))
      await waitFor(() => expect(status).toHaveTextContent("Idle"))
    }
  },
}
