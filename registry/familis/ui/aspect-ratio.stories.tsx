import { AspectRatio } from "@/components/ui/aspect-ratio"
import type { Meta, StoryObj } from "@storybook/react-vite"
function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-lg bg-muted">
      <img
        src="/fixtures/avatar.svg"
        alt="Team member"

        className="rounded-lg object-cover grayscale "
      />
    </AspectRatio>
  )
}

const meta = {
  title: "UI/Aspect Ratio",
  component: AspectRatioDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/aspect-ratio)",
      },
    },
  },
} satisfies Meta<typeof AspectRatioDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
