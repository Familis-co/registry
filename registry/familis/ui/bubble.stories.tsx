import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Bubble",
  component: Bubble,
  subcomponents: { BubbleContent, BubbleGroup, BubbleReactions },
  args: { variant: "default", align: "end" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"],
    },
    align: { control: "inline-radio", options: ["start", "end"] },
  },
  decorators: [
    (Story) => (
      <div className="flex w-96 flex-col gap-8 py-12">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
    </Bubble>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/bubble)",
      },
    },
  },
} satisfies Meta<typeof Bubble>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Muted: Story = {
  args: { variant: "muted", align: "start" },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
    </Bubble>
  ),
}
export const WithReactions: Story = {
  args: { variant: "muted", align: "start" },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>
        Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
      </BubbleContent>
      <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
        <span>👍</span>
        <span>🔥</span>
        <span>👀</span>
        <span>+2</span>
      </BubbleReactions>
    </Bubble>
  ),
}
export const Conversation: Story = {
  render: (args) => (
    <>
      <Bubble {...args}>
        <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            I can group messages, switch sides, and keep the whole thread easy to scan.
          </BubbleContent>
          <BubbleReactions role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
      <Bubble {...args}>
        <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
        </BubbleContent>
        <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
          <span>👍</span>
          <span>🔥</span>
          <span>👀</span>
          <span>+2</span>
        </BubbleReactions>
      </Bubble>
    </>
  ),
}
