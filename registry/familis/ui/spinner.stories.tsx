import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import type { Meta, StoryObj } from "@storybook/react-vite"
function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}

const meta = {
  title: "UI/Spinner",
  component: SpinnerDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/spinner)",
      },
    },
  },
} satisfies Meta<typeof SpinnerDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
