import { CircleAlertIcon, CircleCheckIcon, GlobeIcon, LoaderCircleIcon } from "lucide-react"
import { CodeBlock, CodeBlockContent } from "@/registry/familis/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/familis/ui/trace"
import { expect } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Trace",
  component: Trace,
  subcomponents: {
    TraceLine,
    TraceIcon,
    TraceTitle,
    TraceDescription,
    TraceCollapsible,
    TraceCollapsibleTrigger,
    TraceCollapsibleContent,
  },
  args: { className: "w-96" },
  render: (args) => (
    <Trace {...args}>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <CircleCheckIcon />
            </TraceIcon>
            <TraceTitle>Thought for 4s</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          The family asked to move the visit to Friday. I should check the calendar for open slots
          before suggesting a time.
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <GlobeIcon />
        </TraceIcon>
        <TraceTitle>Searched the calendar</TraceTitle>
        <TraceDescription>3 results</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderCircleIcon className="animate-spin" />
        </TraceIcon>
        <TraceTitle>Drafting a reply</TraceTitle>
      </TraceLine>
    </Trace>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/trace)",
      },
    },
  },
} satisfies Meta<typeof Trace>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Thought for 4s" })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByText(/move the visit to Friday/)).toBeVisible()
  },
}

export const Status: Story = {
  render: (args) => (
    <Trace {...args}>
      <TraceLine>
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Loaded the family profile</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderCircleIcon className="animate-spin" />
        </TraceIcon>
        <TraceTitle>Checking availability</TraceTitle>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <CircleAlertIcon />
        </TraceIcon>
        <TraceTitle>Failed to send the reminder</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <CircleCheckIcon />
        </TraceIcon>
        <TraceTitle>Confirm the visit</TraceTitle>
      </TraceLine>
    </Trace>
  ),
}

export const ToolOutput: Story = {
  render: (args) => (
    <Trace {...args}>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <CircleAlertIcon />
            </TraceIcon>
            <TraceTitle>Failed to run pnpm install</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm" variant="destructive">
            <CodeBlockContent wrap>
              ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because
              pnpm-lock.yaml is not up to date with package.json
            </CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
}
