import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"
import { expect, fn } from "storybook/test"
import { EmptyState } from "./empty-state"

const meta = {
  title: "UI/Blocks/Empty state",
  component: EmptyState,
  args: {
    title: "No projects yet",
    description: "Create a project to bring your team and clients together.",
    action: { label: "Create project", onClick: fn() },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Create project" }))
    await expect(args.action?.onClick).toHaveBeenCalledOnce()
  },
}
export const Disabled: Story = {
  args: { action: { label: "Create project", onClick: fn(), disabled: true } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Create project" })).toBeDisabled()
  },
}
export const NoAction: Story = {
  args: {
    title: "No matching projects",
    description: "Try another search or adjust your filters.",
    icon: SearchIcon,
    action: undefined,
  },
}
