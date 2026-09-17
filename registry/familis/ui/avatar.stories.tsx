import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/familis/ui/avatar"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount },
  args: { size: "default" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "default", "lg"] } },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/fixtures/avatar.svg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/avatar)",
      },
    },
  },
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/fixtures/avatar.svg" alt="@evilrabbit" />
      <AvatarFallback>ER</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}
export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      <Avatar {...args}>
        <AvatarImage src="/fixtures/avatar.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="/fixtures/avatar.svg" alt="@maxleiter" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="/fixtures/avatar.svg" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
}
export const Fallback: Story = {
  args: { "aria-label": "Familis team" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
}
export const Dark: Story = { globals: { theme: "dark" } }
