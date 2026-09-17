import type { Meta, StoryObj } from "@storybook/react-vite"
import { SearchIcon } from "lucide-react"
import { expect, fn } from "storybook/test"
import { EmptyState } from "@/registry/familis/blocks/empty-state/empty-state"

const meta = {
  title: "UI/Blocks/Empty state",
  component: EmptyState,
  args: {
    title: "No items yet",
    description: "Add your first item to get started.",
    action: { label: "Add item", onClick: fn() },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Add item" }))
    await expect(args.action?.onClick).toHaveBeenCalledOnce()
  },
}
export const Disabled: Story = {
  args: { action: { label: "Add item", onClick: fn(), disabled: true } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeDisabled()
  },
}
export const NoAction: Story = {
  args: {
    title: "No results found",
    description: "Try another search or adjust your filters.",
    icon: SearchIcon,
    action: undefined,
  },
}
