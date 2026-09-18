import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Heading } from "@/registry/familis/blocks/heading/heading"
import { Button } from "@/registry/familis/ui/button"
const meta = {
  title: "UI/Blocks/Heading",
  component: Heading,
  args: {
    title: "Families",
    description: "Manage the families you support.",
    className: "w-96 max-w-full",
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 1, name: "Families" })).toBeVisible()
  },
}
export const Small: Story = {
  args: { variant: "small" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2, name: "Families" })).toBeVisible()
  },
}
export const WithActions: Story = { args: { children: <Button>Add family</Button> } }
export const TitleOnly: Story = { args: { description: undefined } }
export const Dark: Story = { globals: { theme: "dark" } }
