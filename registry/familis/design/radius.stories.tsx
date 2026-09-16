import type { Meta, StoryObj } from "@storybook/react-vite"
import { cn } from "@/lib/utils"
const radii = [
  ["Small", "rounded-sm"],
  ["Medium", "rounded-md"],
  ["Large", "rounded-lg"],
  ["Extra large", "rounded-xl"],
  ["2XL", "rounded-2xl"],
  ["3XL", "rounded-3xl"],
  ["4XL", "rounded-4xl"],
  ["Full", "rounded-full"],
] as const
function RadiusTokens() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <h1 className="text-2xl font-semibold">Corner radius</h1>
      <p className="text-muted-foreground">
        The radius scale derives from the shared --radius variable in src/styles.css.
      </p>
      <div className="flex flex-wrap gap-6">
        {radii.map(([name, classes]) => (
          <div key={name} className="flex flex-col gap-2">
            <div
              className={cn("flex size-24 items-center justify-center border bg-muted", classes)}
            >
              {name}
            </div>
            <code className="text-xs">{classes}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
const meta = {
  title: "Design/Radius",
  component: RadiusTokens,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadiusTokens>
export default meta
type Story = StoryObj<typeof meta>
export const Scale: Story = {}
