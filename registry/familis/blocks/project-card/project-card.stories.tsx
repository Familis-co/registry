import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { ProjectCard } from "./project-card"

const meta = {
  title: "UI/Blocks/Project card",
  component: ProjectCard,
  args: {
    title: "Client portal",
    description: "A shared workspace for clients and their team.",
    href: "#client-portal",
    detail: "Updated today · 4 team members",
  },
  decorators: [
    (Story) => (
      <div className="w-80 max-w-full">
        <Story />
      </div>
    ),
  ],
  argTypes: { status: { control: "select", options: ["active", "draft", "archived"] } },
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: { status: "active" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "View project: Client portal" })).toHaveAttribute(
      "href",
      "#client-portal",
    )
  },
}
export const Draft: Story = { args: { status: "draft" } }
export const Archived: Story = { args: { status: "archived" } }
export const LongContent: Story = {
  args: {
    title: "A project with a longer name that wraps across lines",
    description:
      "Long descriptions remain readable on smaller screens and never hide the navigation action.",
  },
}
