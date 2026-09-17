import { Avatar, AvatarFallback, AvatarImage } from "@/registry/familis/ui/avatar"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/registry/familis/ui/bubble"
import { Marker, MarkerContent } from "@/registry/familis/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/registry/familis/ui/message"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Message",
  component: Message,
  subcomponents: { MessageAvatar, MessageContent, MessageFooter },
  args: { align: "start" },
  argTypes: {
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      <Message {...args}>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@rabbit" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant={args.align === "end" ? "default" : "muted"}>
            <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/message)",
      },
    },
  },
} satisfies Meta<typeof Message>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Sent: Story = {
  args: { align: "end" },
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      <Message {...args}>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>It&apos;s a one-line change.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
}
export const Conversation: Story = {
  render: (args) => (
    <div className="flex w-full max-w-sm flex-col gap-6 py-12">
      <Message {...args} align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>Deploying to prod real quick.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message {...args}>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@rabbit" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble variant="muted">
            <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message {...args} align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>
            <BubbleContent>It&apos;s a one-line change.</BubbleContent>
          </Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
      <Message {...args}>
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="/fixtures/avatar.svg" alt="@rabbit" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s always a one-line change 😭.</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Alright, let me take a look.</BubbleContent>
              <BubbleReactions aria-label="Reactions: thumbs up">
                <span>👍</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Marker role="status">
        <MarkerContent className="shimmer">
          <span className="font-medium">Oliver</span> is typing...
        </MarkerContent>
      </Marker>
    </div>
  ),
}
