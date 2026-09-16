import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Meta, StoryObj } from "@storybook/react-vite"
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  args: { className: "h-72 w-48 rounded-md border" },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/scroll-area)",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
