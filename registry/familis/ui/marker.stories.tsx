import { GitBranchIcon, SearchIcon } from "lucide-react"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"
import type { Meta, StoryObj } from "@storybook/react-vite"
function MarkerDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-8 py-12">
      <Marker>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to a new branch</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
    </div>
  )
}

const meta = {
  title: "UI/Marker",
  component: MarkerDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/marker)",
      },
    },
  },
} satisfies Meta<typeof MarkerDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
