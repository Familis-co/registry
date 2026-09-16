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
const meta = {
  title: "UI/Item",
  component: Item,
  subcomponents: { ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions },
  args: { variant: "outline", size: "default" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "muted"] },
    size: { control: "select", options: ["default", "sm", "xs"] },
  },
  decorators: [
    (Story) => (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Item {...args}>
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
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/item)",
      },
    },
  },
} satisfies Meta<typeof Item>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Muted: Story = { args: { variant: "muted" } }
export const AsLink: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Item {...args} render={<a href="#example" aria-label="View verified profile" />}>
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
  ),
}
