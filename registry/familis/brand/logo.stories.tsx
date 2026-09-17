import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Logo } from "@/registry/familis/brand/logo"

const meta = {
  title: "Design/Logo",
  component: Logo,
  args: { variant: "wordmark" },
  argTypes: {
    variant: { control: "inline-radio", options: ["wordmark", "symbol"] },
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Wordmark: Story = {
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Familis" })
    await expect(logo).toHaveAttribute("viewBox", "0 0 850 216")
    await expect(logo).toHaveAttribute("fill", "currentColor")
  },
}
export const SymbolOnly: Story = {
  args: { variant: "symbol" },
  play: async ({ canvas }) => {
    const logo = canvas.getByRole("img", { name: "Familis" })
    await expect(logo.querySelectorAll("path")).toHaveLength(3)
  },
}
export const Dark: Story = { globals: { theme: "dark" } }
export const CustomColor: Story = {
  args: { className: "h-12 text-red-500" },
}
