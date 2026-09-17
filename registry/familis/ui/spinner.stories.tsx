import { Item, ItemContent, ItemMedia, ItemTitle } from "@/registry/familis/ui/item"
import { Spinner } from "@/registry/familis/ui/spinner"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/spinner)",
      },
    },
  },
} satisfies Meta<typeof Spinner>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Large: Story = { args: { className: "size-8" } }
export const InItem: Story = {
  render: (args) => (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner {...args} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  ),
}
