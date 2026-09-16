import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

function ChartDemo() {
  return (
    <div className="w-96 max-w-full">
      <ChartContainer config={{ projects: { label: "Projects", color: "var(--chart-2)" } }}>
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
      </ChartContainer>
    </div>
  )
}
const meta = { title: "UI/Chart", component: ChartDemo } satisfies Meta<typeof ChartDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
