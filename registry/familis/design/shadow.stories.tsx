import type { Meta, StoryObj } from "@storybook/react-vite"
import { cn } from "@/lib/utils"
const shadows = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"] as const
function ShadowTokens() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">Elevation</h1>
      <p className="text-muted-foreground">
        Use elevation to distinguish surfaces. Overlay components manage their own stacking.
      </p>
      <div className="flex flex-wrap gap-8">
        {shadows.map((shadow) => (
          <div
            key={shadow}
            className={cn(
              "flex h-24 w-32 items-center justify-center rounded-lg border bg-card text-xs",
              shadow,
            )}
          >
            {shadow}
          </div>
        ))}
      </div>
    </div>
  )
}
const meta = {
  title: "Design/Shadow",
  component: ShadowTokens,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ShadowTokens>
export default meta
type Story = StoryObj<typeof meta>
export const Scale: Story = {}
