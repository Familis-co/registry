import { cn } from "@/lib/utils"
import type { Meta, StoryObj } from "@storybook/react-vite"

const tokens = [
  ["Background", "bg-background text-foreground"],
  ["Foreground", "bg-foreground text-background"],
  ["Primary", "bg-primary text-primary-foreground"],
  ["Secondary", "bg-secondary text-secondary-foreground"],
  ["Muted", "bg-muted text-muted-foreground"],
  ["Accent", "bg-accent text-accent-foreground"],
  ["Card", "bg-card text-card-foreground"],
  ["Popover", "bg-popover text-popover-foreground"],
  ["Destructive", "bg-destructive text-background"],
  ["Border", "bg-border text-foreground"],
  ["Input", "bg-input text-foreground"],
  ["Ring", "bg-ring text-foreground"],
] as const

function ColorTokens() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">Semantic colors</h1>
      <p className="text-muted-foreground">
        Tokens adapt to the theme. Use the Storybook toolbar to compare light and dark.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {tokens.map(([name, classes]) => (
          <div key={name} className="flex flex-col gap-2">
            <div aria-hidden="true" className={cn(classes, "h-20 rounded-lg border")} />
            <span className="font-medium">{name}</span>
            <code className="text-xs">{classes.split(" ")[0]}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
const meta = {
  title: "Design/Color",
  component: ColorTokens,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Color specimens display each semantic token. Labels sit outside the decorative swatches so contrast is checked on their intended text surfaces.",
      },
    },
  },
} satisfies Meta<typeof ColorTokens>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Dark: Story = { parameters: { theme: "dark" } }
