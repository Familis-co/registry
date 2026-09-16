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

const meta = {
  title: "UI/Empty",
  component: Empty,
  subcomponents: { EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent },
  render: (args) => (
    <Empty {...args}>
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
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/empty)",
      },
    },
  },
} satisfies Meta<typeof Empty>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Outline: Story = { args: { className: "border" } }
