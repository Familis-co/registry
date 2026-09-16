import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import type { Meta, StoryObj } from "@storybook/react-vite"
function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item
        variant="outline"
        size="sm"
        render={<a href="#example" aria-label="View verified profile" />}
      >
        <ItemMedia>
          <BadgeCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon />
        </ItemActions>
      </Item>
    </div>
  )
}

const meta = {
  title: "UI/Item",
  component: ItemDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/item)",
      },
    },
  },
} satisfies Meta<typeof ItemDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
