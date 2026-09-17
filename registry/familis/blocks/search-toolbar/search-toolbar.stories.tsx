import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import {
  SearchToolbar,
  type SearchToolbarProps,
} from "@/registry/familis/blocks/search-toolbar/search-toolbar"
import { Button } from "@/registry/familis/ui/button"

function SearchExample(args: SearchToolbarProps) {
  const [query, setQuery] = useState(args.query)
  return (
    <SearchToolbar
      {...args}
      query={query}
      onQueryChange={(next) => {
        setQuery(next)
        args.onQueryChange(next)
      }}
    />
  )
}

const meta = {
  title: "UI/Blocks/Search toolbar",
  component: SearchToolbar,
  render: (args) => <SearchExample {...args} />,
  args: {
    query: "",
    label: "Search families",
    placeholder: "Name or email",
    resultLabel: "24 families",
    onQueryChange: fn(),
    className: "w-80 max-w-full",
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof SearchToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("searchbox", { name: "Search families" })
    await userEvent.type(input, "Amira")
    await expect(input).toHaveValue("Amira")
    await expect(args.onQueryChange).toHaveBeenLastCalledWith("Amira")
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }))
    await expect(input).toHaveValue("")
    await expect(input).toHaveFocus()
    await expect(args.onQueryChange).toHaveBeenLastCalledWith("")
  },
}
export const WithActions: Story = {
  args: {
    actions: (
      <Button variant="outline" onClick={fn()}>
        Filters
      </Button>
    ),
  },
}
export const Loading: Story = {
  args: { loading: true, query: "Amira", resultLabel: "Searching…" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("searchbox")).toHaveAttribute("aria-busy", "true")
    await expect(canvas.getByRole("status")).toHaveTextContent("Searching…")
  },
}
export const Disabled: Story = {
  args: { disabled: true, query: "Amira" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("searchbox")).toBeDisabled()
    await expect(canvas.getByRole("button", { name: "Clear search" })).toBeDisabled()
  },
}
export const Dark: Story = { globals: { theme: "dark" } }
