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
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
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

function AttachmentDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
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
      <Attachment state="uploading" className="w-full">
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
      <Attachment className="w-full">
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
    </div>
  )
}

const meta = {
  title: "UI/Attachment",
  component: AttachmentDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/attachment)",
      },
    },
  },
} satisfies Meta<typeof AttachmentDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
