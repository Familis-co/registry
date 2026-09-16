import type { Meta, StoryObj } from "@storybook/react-vite"
import type * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  args: { type: "success", message: "Project saved", position: "bottom-right" },
  argTypes: {
    type: { control: "select", options: ["success", "info", "warning", "error"] },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
  },
  // The Toaster theme follows the Storybook theme toolbar instead of next-themes.
  render: ({ type, message, ...args }, { globals }) => (
    <>
      <Button variant="outline" onClick={() => toast[type ?? "success"](message)}>
        Show Sonner notification
      </Button>
      <Toaster {...args} theme={globals.theme === "dark" ? "dark" : "light"} />
    </>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "Sonner is included for compatibility. New Base UI compositions use the Toast component.",
      },
    },
  },
} satisfies Meta<
  React.ComponentProps<typeof Toaster> & {
    type?: "success" | "info" | "warning" | "error"
    message?: string
  }
>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ErrorToast: Story = { args: { type: "error", message: "Project could not be saved" } }
