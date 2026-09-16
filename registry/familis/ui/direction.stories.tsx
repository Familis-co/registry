import type { Meta, StoryObj } from "@storybook/react-vite"
import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

function DirectionDemo({ direction }: { direction: "ltr" | "rtl" }) {
  return (
    <DirectionProvider direction={direction}>
      <div dir={direction} className="flex w-72 flex-col gap-3">
        <p>Direction: {direction.toUpperCase()}</p>
        <Button>
          Continue
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </DirectionProvider>
  )
}
const meta = {
  title: "UI/Direction",
  component: DirectionDemo,
  args: { direction: "ltr" },
  argTypes: { direction: { control: "inline-radio", options: ["ltr", "rtl"] } },
} satisfies Meta<typeof DirectionDemo>
export default meta
type Story = StoryObj<typeof meta>
export const LeftToRight: Story = {}
export const RightToLeft: Story = { args: { direction: "rtl" } }
