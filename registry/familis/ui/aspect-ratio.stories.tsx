import { AspectRatio } from "@/registry/familis/ui/aspect-ratio"
import type { Meta, StoryObj } from "@storybook/react-vite"
const meta = {
  title: "UI/Aspect Ratio",
  component: AspectRatio,
  args: { ratio: 16 / 9, className: "w-full max-w-sm rounded-lg bg-muted" },
  argTypes: { ratio: { control: { type: "number", step: 0.1 } } },
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="/fixtures/avatar.svg"
        alt="Team member"
        className="rounded-lg object-cover grayscale"
      />
    </AspectRatio>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/aspect-ratio)",
      },
    },
  },
} satisfies Meta<typeof AspectRatio>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Square: Story = { args: { ratio: 1 } }
