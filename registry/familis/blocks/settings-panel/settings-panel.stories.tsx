import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import {
  SettingsPanel,
  type SettingsPanelProps,
} from "@/registry/familis/blocks/settings-panel/settings-panel"

function SettingsExample(args: SettingsPanelProps) {
  const [values, setValues] = useState<Record<string, boolean>>({})
  return (
    <SettingsPanel
      {...args}
      options={args.options.map((option) => ({
        ...option,
        checked: values[option.id] ?? option.checked,
      }))}
      onCheckedChange={(id, checked) => {
        setValues((current) => ({ ...current, [id]: checked }))
        args.onCheckedChange(id, checked)
      }}
    />
  )
}

const meta = {
  title: "UI/Blocks/Settings panel",
  component: SettingsPanel,
  render: (args) => <SettingsExample {...args} />,
  args: {
    title: "Notifications",
    description: "Choose how you hear from your team.",
    options: [
      {
        id: "messages",
        label: "New messages",
        description: "When someone sends you a message.",
        checked: true,
      },
      {
        id: "summary",
        label: "Weekly summary",
        description: "A digest every Monday.",
        checked: false,
      },
      {
        id: "security",
        label: "Security updates",
        description: "Required by your organization.",
        checked: true,
        disabled: true,
      },
    ],
    onCheckedChange: fn(),
    className: "w-80 max-w-full",
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof SettingsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const summary = canvas.getByRole("switch", { name: "Weekly summary" })
    await userEvent.click(canvas.getByText("Weekly summary"))
    await expect(summary).toBeChecked()
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith("summary", true)
    await userEvent.click(summary)
    await expect(summary).not.toBeChecked()
    const security = canvas.getByRole("switch", { name: "Security updates" })
    await expect(security).toHaveAttribute("aria-disabled", "true")
    await userEvent.click(canvas.getByText("Security updates"))
    await expect(args.onCheckedChange).toHaveBeenCalledTimes(2)
  },
}
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    for (const toggle of canvas.getAllByRole("switch")) {
      await expect(toggle).toHaveAttribute("aria-disabled", "true")
      await userEvent.click(toggle)
    }
    await expect(args.onCheckedChange).not.toHaveBeenCalled()
  },
}
export const MultiplePanels: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <SettingsExample {...args} />
      <SettingsExample {...args} />
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const [first, second] = canvas.getAllByRole("switch", { name: "Weekly summary" })
    await expect(first.id).not.toBe(second.id)
    await userEvent.click(first)
    await expect(first).toBeChecked()
    await expect(second).not.toBeChecked()
  },
}
export const Dark: Story = { globals: { theme: "dark" } }
