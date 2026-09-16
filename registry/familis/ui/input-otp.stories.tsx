import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
function InputOTPDemo() {
  const [code, setCode] = useState("123456")
  return (
    <InputOTP aria-label="Verification code" maxLength={6} value={code} onChange={setCode}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

const meta = {
  title: "UI/Input OTP",
  component: InputOTPDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/input-otp)",
      },
    },
  },
} satisfies Meta<typeof InputOTPDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
