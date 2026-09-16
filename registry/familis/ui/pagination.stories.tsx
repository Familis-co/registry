import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  subcomponents: {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
  },
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#example" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#example">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#example" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#example">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#example" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/pagination)",
      },
    },
  },
} satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
