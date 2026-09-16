import { GitBranchIcon, SearchIcon } from "lucide-react"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Marker",
  component: Marker,
  subcomponents: { MarkerIcon, MarkerContent },
  args: { variant: "default" },
  argTypes: { variant: { control: "select", options: ["default", "separator", "border"] } },
  decorators: [
    (Story) => (
      <div className="flex w-96 flex-col py-12">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/marker)",
      },
    },
  },
} satisfies Meta<typeof Marker>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = {
  args: { role: "status" },
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent className="shimmer">Thinking...</MarkerContent>
    </Marker>
  ),
}
export const Separator: Story = {
  args: { variant: "separator" },
  render: (args) => (
    <Marker {...args}>
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
  ),
}
export const Border: Story = {
  args: { variant: "border" },
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  ),
}
