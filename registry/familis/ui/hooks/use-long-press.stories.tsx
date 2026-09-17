import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fireEvent, fn, waitFor } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import {
  useLongPress,
  type LongPressOptions,
  type PressEvent,
} from "@/registry/familis/ui/hooks/use-long-press"

interface ExampleProps extends LongPressOptions {
  onLongPress: (event: PressEvent) => void
}

function LongPressExample({ onLongPress, onStart, onFinish, onCancel, threshold }: ExampleProps) {
  const [status, setStatus] = useState("Ready")
  const handlers = useLongPress(
    (event) => {
      setStatus("Long press detected")
      onLongPress(event)
    },
    {
      threshold,
      onStart: (event) => {
        setStatus("Pressing")
        onStart?.(event)
      },
      onFinish: (event) => {
        setStatus("Finished")
        onFinish?.(event)
      },
      onCancel: (event) => {
        setStatus("Cancelled")
        onCancel?.(event)
      },
    },
  )

  return (
    <div className="flex flex-col gap-4">
      <Button {...handlers}>Press and hold</Button>
      <p role="status">{status}</p>
    </div>
  )
}

function UnmountExample(args: ExampleProps) {
  const [mounted, setMounted] = useState(true)
  return (
    <div className="flex flex-col gap-4">
      {mounted && <LongPressExample {...args} />}
      <Button variant="outline" onClick={() => setMounted(false)}>
        Unmount target
      </Button>
    </div>
  )
}

const meta = {
  title: "UI/Hooks/Long press",
  component: LongPressExample,
  args: {
    threshold: 400,
    onLongPress: fn(),
    onStart: fn(),
    onFinish: fn(),
    onCancel: fn(),
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof LongPressExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.mouseDown(button)
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Long press detected"))
    fireEvent.mouseUp(button)
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Finished"))
    await expect(args.onLongPress).toHaveBeenCalledTimes(1)
    await expect(args.onStart).toHaveBeenCalledTimes(1)
    await expect(args.onFinish).toHaveBeenCalledTimes(1)
    await expect(args.onCancel).not.toHaveBeenCalled()
  },
}

export const ShortPress: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.mouseDown(button)
    fireEvent.mouseUp(button)
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Cancelled"))
    await new Promise((resolve) => setTimeout(resolve, 500))
    await expect(args.onCancel).toHaveBeenCalledTimes(1)
    await expect(args.onLongPress).not.toHaveBeenCalled()
    await expect(args.onFinish).not.toHaveBeenCalled()
  },
}

export const LeaveTarget: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.mouseDown(button)
    fireEvent.mouseOut(button)
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Cancelled"))
    await new Promise((resolve) => setTimeout(resolve, 500))
    await expect(args.onCancel).toHaveBeenCalledTimes(1)
    await expect(args.onLongPress).not.toHaveBeenCalled()
  },
}

export const Touch: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.touchStart(button, { touches: [new window.Touch({ identifier: 1, target: button })] })
    // A compatibility mouse event must not start a second timer for the same press.
    fireEvent.mouseDown(button)
    await waitFor(() => expect(args.onLongPress).toHaveBeenCalledTimes(1))
    fireEvent.touchEnd(button, { touches: [] })
    fireEvent.mouseUp(button)
    await expect(args.onStart).toHaveBeenCalledTimes(1)
    await expect(args.onFinish).toHaveBeenCalledTimes(1)
    await expect(args.onCancel).not.toHaveBeenCalled()
  },
}

export const TouchCancellation: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.touchStart(button, { touches: [new window.Touch({ identifier: 1, target: button })] })
    fireEvent.touchCancel(button)
    await new Promise((resolve) => setTimeout(resolve, 500))
    await expect(args.onCancel).toHaveBeenCalledTimes(1)
    await expect(args.onLongPress).not.toHaveBeenCalled()
  },
}

export const SecondaryButton: Story = {
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Press and hold" })
    fireEvent.mouseDown(button, { button: 2 })
    fireEvent.mouseUp(button, { button: 2 })
    await new Promise((resolve) => setTimeout(resolve, 500))
    await expect(args.onStart).not.toHaveBeenCalled()
    await expect(args.onLongPress).not.toHaveBeenCalled()
    await expect(args.onCancel).not.toHaveBeenCalled()
  },
}

export const Unmount: Story = {
  render: (args) => <UnmountExample {...args} />,
  play: async ({ args, canvas }) => {
    fireEvent.mouseDown(canvas.getByRole("button", { name: "Press and hold" }))
    fireEvent.click(canvas.getByRole("button", { name: "Unmount target" }))
    await waitFor(() => expect(canvas.queryByRole("button", { name: "Press and hold" })).toBeNull())
    await new Promise((resolve) => setTimeout(resolve, 500))
    await expect(args.onStart).toHaveBeenCalledTimes(1)
    await expect(args.onLongPress).not.toHaveBeenCalled()
  },
}
