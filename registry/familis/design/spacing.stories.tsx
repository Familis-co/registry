import type { Meta, StoryObj } from "@storybook/react-vite"
import { cn } from "@/lib/utils"
const sizes = [
  ["1 · 4px", "w-1"],
  ["2 · 8px", "w-2"],
  ["4 · 16px", "w-4"],
  ["6 · 24px", "w-6"],
  ["8 · 32px", "w-8"],
  ["12 · 48px", "w-12"],
  ["16 · 64px", "w-16"],
  ["24 · 96px", "w-24"],
] as const
function SpacingTokens() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-6">
      <h1 className="text-2xl font-semibold">Spacing</h1>
      <p className="text-muted-foreground">
        Use the shared spacing scale for padding, margin, and layout gaps.
      </p>
      {sizes.map(([label, width]) => (
        <div key={label} className="flex items-center gap-6">
          <code className="w-24 text-xs">{label}</code>
          <div className={cn("h-4 rounded-sm bg-primary", width)} />
        </div>
      ))}
    </div>
  )
}
const meta = {
  title: "Design/Spacing",
  component: SpacingTokens,
  parameters: { layout: "padded" },
} satisfies Meta<typeof SpacingTokens>
export default meta
type Story = StoryObj<typeof meta>
export const Scale: Story = {}
