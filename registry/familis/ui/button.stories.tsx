import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Create project", onClick: fn() },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Create project" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
export const Secondary: Story = { args: { variant: "secondary" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Destructive: Story = { args: { variant: "destructive", children: "Delete project" } }
export const Link: Story = { args: { variant: "link" } }
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Create project" })).toBeDisabled()
  },
}
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon data-icon="inline-start" />
        Create project
      </>
    ),
  },
}
export const IconOnly: Story = {
  args: { size: "icon", "aria-label": "Create project", children: <PlusIcon /> },
}
export const Pending: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Spinner data-icon="inline-start" />
        Creating project
      </>
    ),
  },
}
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="xs" />
      <Button {...args} size="sm" />
      <Button {...args} />
      <Button {...args} size="lg" />
    </div>
  ),
}

export const Dark: Story = { globals: { theme: "dark" } }
