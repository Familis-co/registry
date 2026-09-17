import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/familis/ui/input-otp"
import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Input OTP",
  component: InputOTP,
  subcomponents: { InputOTPGroup, InputOTPSlot, InputOTPSeparator },
  args: {
    "aria-label": "Verification code",
    maxLength: 6,
    defaultValue: "123456",
    disabled: false,
    onChange: fn(),
    onComplete: fn(),
    children: (
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    ),
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input-otp)",
      },
    },
  },
} satisfies Meta<typeof InputOTP>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Empty: Story = { args: { defaultValue: "" } }
export const WithSeparator: Story = {
  args: {
    defaultValue: "",
    children: (
      <>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </>
    ),
  },
}
export const Disabled: Story = { args: { disabled: true } }
