import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/familis/ui/chart"

const meta = {
  title: "UI/Chart",
  component: ChartContainer,
  subcomponents: { ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent },
  args: {
    className: "w-96 max-w-full",
    config: { projects: { label: "Projects", color: "var(--chart-2)" } },
    children: (
      <BarChart
        accessibilityLayer
        data={[
          { month: "April", projects: 6 },
          { month: "May", projects: 12 },
          { month: "June", projects: 9 },
        ]}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="projects" fill="var(--color-projects)" isAnimationActive={false} />
      </BarChart>
    ),
  },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof ChartContainer>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithLegend: Story = {
  args: {
    config: {
      active: { label: "Active", color: "var(--chart-2)" },
      archived: { label: "Archived", color: "var(--chart-4)" },
    },
    children: (
      <BarChart
        accessibilityLayer
        data={[
          { month: "April", active: 6, archived: 2 },
          { month: "May", active: 12, archived: 3 },
          { month: "June", active: 9, archived: 5 },
        ]}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="active" fill="var(--color-active)" isAnimationActive={false} />
        <Bar dataKey="archived" fill="var(--color-archived)" isAnimationActive={false} />
      </BarChart>
    ),
  },
}
