import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import type { Meta, StoryObj } from "@storybook/react-vite"
function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage src="/fixtures/avatar.svg" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/fixtures/avatar.svg" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="/fixtures/avatar.svg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/fixtures/avatar.svg" alt="@maxleiter" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/fixtures/avatar.svg" alt="@evilrabbit" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}

const meta = {
  title: "UI/Avatar",
  component: AvatarDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/avatar)",
      },
    },
  },
} satisfies Meta<typeof AvatarDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const Fallback: Story = {
  render: () => (
    <Avatar aria-label="Familis team">
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
}
export const Dark: Story = { parameters: { theme: "dark" } }
