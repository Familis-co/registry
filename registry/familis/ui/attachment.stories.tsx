import { FileCodeIcon, XIcon } from "lucide-react"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/familis/ui/attachment"
import { Spinner } from "@/registry/familis/ui/spinner"
import type { Meta, StoryObj } from "@storybook/react-vite"

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "/fixtures/avatar.svg",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "/fixtures/avatar.svg",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "/fixtures/avatar.svg",
    alt: "Office",
  },
]

const meta = {
  title: "UI/Attachment",
  component: Attachment,
  subcomponents: {
    AttachmentGroup,
    AttachmentMedia,
    AttachmentContent,
    AttachmentTitle,
    AttachmentDescription,
    AttachmentActions,
    AttachmentAction,
  },
  args: { state: "done", size: "default", orientation: "horizontal", className: "w-full" },
  argTypes: {
    state: { control: "select", options: ["idle", "uploading", "processing", "error", "done"] },
    size: { control: "inline-radio", options: ["xs", "sm", "default"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  decorators: [
    (Story) => (
      <div className="flex w-96 flex-col py-12">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <FileCodeIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
        <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove message-renderer.tsx">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/attachment)",
      },
    },
  },
} satisfies Meta<typeof Attachment>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Uploading: Story = {
  args: { state: "uploading" },
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
}
export const Failed: Story = { args: { state: "error" } }
export const ImageGroup: Story = {
  args: { orientation: "vertical", className: undefined },
  render: (args) => (
    <AttachmentGroup>
      {images.map((image) => (
        <Attachment key={image.name} {...args}>
          <AttachmentMedia variant="image">
            <img src={image.src} alt={image.alt} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{image.name}</AttachmentTitle>
            <AttachmentDescription>{image.meta}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
}
