import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { MetricCard } from "@/registry/familis/blocks/metric-card/metric-card"

const meta = {
  title: "UI/Blocks/Metric card",
  component: MetricCard,
  args: {
    label: "Families supported",
    value: "128",
    description: "This month",
    trend: { direction: "up", value: "+12%", label: "vs. last month" },
    footer: "Updated just now",
    className: "w-72 max-w-full",
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Decreasing: Story = {
  args: {
    label: "Pending requests",
    value: "16",
    trend: { direction: "down", value: "−8%", label: "vs. last week" },
  },
}
export const Zero: Story = {
  args: { value: 0, trend: undefined, footer: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Families supported" })).toHaveTextContent("0")
  },
}
export const Dark: Story = { globals: { theme: "dark" } }
