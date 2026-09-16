import { FolderCodeIcon } from "lucide-react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import type { Meta, StoryObj } from "@storybook/react-vite"
function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </EmptyContent>
      <a href="#example" className={buttonVariants({ variant: "link", size: "sm" })}>
        Learn More <ArrowUpRightIcon data-icon="inline-end" />
      </a>
    </Empty>
  )
}

const meta = {
  title: "UI/Empty",
  component: EmptyDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/empty)",
      },
    },
  },
} satisfies Meta<typeof EmptyDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
