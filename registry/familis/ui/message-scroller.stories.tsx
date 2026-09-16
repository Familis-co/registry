import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Button } from "@/components/ui/button"
import { Message, MessageContent } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller"

const meta = {
  title: "UI/Message Scroller",
  component: MessageScrollerProvider,
  subcomponents: {
    MessageScroller,
    MessageScrollerViewport,
    MessageScrollerContent,
    MessageScrollerItem,
    MessageScrollerButton,
  },
  args: { autoScroll: true, initialCount: 8 },
  argTypes: {
    defaultScrollPosition: { control: "inline-radio", options: ["start", "end", "last-anchor"] },
    initialCount: { control: { type: "number", min: 0 } },
  },
  render: function Render({ initialCount = 8, ...args }) {
    const [count, setCount] = useState(initialCount)
    return (
      <div className="flex w-80 max-w-full flex-col gap-4">
        <MessageScrollerProvider {...args}>
          <MessageScroller className="h-72">
            <MessageScrollerViewport>
              <MessageScrollerContent aria-label="Project conversation">
                {Array.from({ length: count }, (_, index) => (
                  <MessageScrollerItem key={index}>
                    <Message>
                      <MessageContent>
                        <Bubble variant="muted">
                          <BubbleContent>Project update {index + 1}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
        <Button onClick={() => setCount(count + 1)}>Add update</Button>
      </div>
    )
  },
} satisfies Meta<React.ComponentProps<typeof MessageScrollerProvider> & { initialCount?: number }>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Add update" }))
    await expect(canvas.getByText("Project update 9")).toBeVisible()
  },
}
export const LongConversation: Story = { args: { initialCount: 40 } }
