import type { Meta, StoryObj } from "@storybook/react-vite"
function TypographyTokens() {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <h1 className="text-4xl font-semibold tracking-tight">Typography</h1>
      <h2 className="font-heading text-2xl font-semibold">Geist for headings and interface text</h2>
      <p className="text-base">Familis components use the shared font and Tailwind type scale.</p>
      <p className="text-sm text-muted-foreground">
        Supporting text stays readable and uses a semantic foreground token.
      </p>
      <p className="text-xs">Utility text · 12px</p>
      <code className="font-mono text-sm">pnpm dlx shadcn@latest add @familis/button</code>
    </div>
  )
}
const meta = {
  title: "Design/Typography",
  component: TypographyTokens,
  parameters: { layout: "padded" },
} satisfies Meta<typeof TypographyTokens>
export default meta
type Story = StoryObj<typeof meta>
export const Scale: Story = {}
