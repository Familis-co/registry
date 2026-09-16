import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import type { Meta, StoryObj } from "@storybook/react-vite"
function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border"
      captionLayout="dropdown"
    />
  )
}

const meta = {
  title: "UI/Calendar",
  component: CalendarDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/calendar)",
      },
    },
  },
} satisfies Meta<typeof CalendarDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
