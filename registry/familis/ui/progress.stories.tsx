import * as React from "react"
import { Progress } from "@/components/ui/progress"
import type { Meta, StoryObj } from "@storybook/react-vite"
function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress aria-label="Project completion" value={progress} className="w-[60%]" />
}

const meta = {
  title: "UI/Progress",
  component: ProgressDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/progress)",
      },
    },
  },
} satisfies Meta<typeof ProgressDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
