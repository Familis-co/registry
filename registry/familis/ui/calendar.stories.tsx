import { Calendar } from "@/components/ui/calendar"
import type { OnSelectHandler } from "react-day-picker"
import { useArgs } from "storybook/preview-api"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  args: {
    mode: "single",
    selected: new Date(),
    onSelect: fn(),
    captionLayout: "dropdown",
    className: "rounded-lg border",
  },
  argTypes: {
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    buttonVariant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    // DayPicker props are a union keyed by `mode` and `required`; narrowing to optional single
    // selection types `onSelect` as a `Date | undefined` handler. Other modes render the args as-is.
    if (args.mode !== "single" || args.required) return <Calendar {...args} />
    return (
      <Calendar
        {...args}
        onSelect={(...params: Parameters<OnSelectHandler<Date | undefined>>) => {
          args.onSelect?.(...params)
          updateArgs({ selected: params[0] })
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/calendar)",
      },
    },
  },
} satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Label: Story = { args: { captionLayout: "label" } }
