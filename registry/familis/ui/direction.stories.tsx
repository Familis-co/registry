import type { Meta, StoryObj } from "@storybook/react-vite"
import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"

const meta = {
  title: "UI/Direction",
  component: DirectionProvider,
  args: { direction: "ltr" },
  argTypes: { direction: { control: "inline-radio", options: ["ltr", "rtl"] } },
  render: (args) => (
    <DirectionProvider {...args}>
      <div dir={args.direction} className="flex w-72 flex-col gap-3">
        <p>Direction: {args.direction?.toUpperCase()}</p>
        <Button>
          Continue
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </DirectionProvider>
  ),
} satisfies Meta<typeof DirectionProvider>
export default meta
type Story = StoryObj<typeof meta>
export const LeftToRight: Story = {}
export const RightToLeft: Story = { args: { direction: "rtl" } }
