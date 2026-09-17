import { useEffect, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fireEvent, fn, waitFor } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/registry/familis/ui/field"
import { Input } from "@/registry/familis/ui/input"
import { useDebounce } from "@/registry/familis/ui/hooks/use-debounce"

interface ExampleProps {
  delay: number
  onValueChange: (value: unknown) => void
}

function DebounceExample({ delay, onValueChange }: ExampleProps) {
  const [value, setValue] = useState("Initial")
  const debounced = useDebounce(value, delay)
  useEffect(() => {
    onValueChange(debounced)
  }, [debounced, onValueChange])

  return (
    <div className="flex w-80 max-w-full flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="debounced-query">Search query</FieldLabel>
        <Input
          id="debounced-query"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <FieldDescription>The output updates after {delay} ms without changes.</FieldDescription>
      </Field>
      <p role="status">Debounced: {debounced}</p>
    </div>
  )
}

const initialCallback = () => "Initial"
const updatedCallback = () => "Updated"

function CallbackValueExample({ delay, onValueChange }: ExampleProps) {
  const [value, setValue] = useState(() => initialCallback)
  const debounced = useDebounce(value, delay)
  useEffect(() => {
    onValueChange(debounced)
  }, [debounced, onValueChange])

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setValue(() => updatedCallback)}>Update callback value</Button>
      <p role="status">Debounced: {debounced()}</p>
    </div>
  )
}

const meta = {
  title: "UI/Hooks/Debounce",
  component: DebounceExample,
  args: { delay: 400, onValueChange: fn() },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof DebounceExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole("textbox", { name: "Search query" })
    fireEvent.change(input, { target: { value: "First" } })
    await new Promise((resolve) => setTimeout(resolve, 100))
    fireEvent.change(input, { target: { value: "Latest" } })
    await expect(canvas.getByRole("status")).toHaveTextContent("Debounced: Initial")
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Debounced: Latest"))
    await waitFor(() => expect(args.onValueChange).toHaveBeenLastCalledWith("Latest"))
    await expect(args.onValueChange).not.toHaveBeenCalledWith("First")
  },
}

export const FunctionValue: Story = {
  render: (args) => <CallbackValueExample {...args} />,
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent("Debounced: Initial")
    await userEvent.click(canvas.getByRole("button", { name: "Update callback value" }))
    await waitFor(() => expect(canvas.getByRole("status")).toHaveTextContent("Debounced: Updated"))
    await waitFor(() => expect(args.onValueChange).toHaveBeenCalledTimes(2))
    await expect(args.onValueChange).toHaveBeenLastCalledWith(expect.any(Function))
  },
}
