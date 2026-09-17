import { useEffect } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor, within } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import { toast } from "@/registry/familis/ui/hooks/use-toast"
import { Toaster } from "@/registry/familis/ui/sonner"

const TOAST_ID = "hook-toast-example"

function ToastExample({ theme }: { theme: "light" | "dark" }) {
  useEffect(
    () => () => {
      toast.dismiss(TOAST_ID)
    },
    [],
  )
  return (
    <>
      <Button onClick={() => toast.success("Changes saved", { id: TOAST_ID })}>
        Show notification
      </Button>
      <Toaster theme={theme} />
    </>
  )
}

const meta = {
  title: "UI/Hooks/Toast",
  component: ToastExample,
  args: { theme: "light" },
  render: (_, { globals }) => <ToastExample theme={globals.theme === "dark" ? "dark" : "light"} />,
  parameters: {
    a11y: { test: "error" },
    docs: {
      description: {
        component:
          "Re-exports toast from Sonner. Render a Sonner Toaster in the application to display notifications.",
      },
    },
  },
} satisfies Meta<typeof ToastExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show notification" }))
    const page = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(page.getByText("Changes saved")).toBeVisible())
    toast.dismiss(TOAST_ID)
    await waitFor(() => expect(page.queryByText("Changes saved")).not.toBeInTheDocument())
  },
}
