import { AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/registry/familis/ui/alert"
import { Button } from "@/registry/familis/ui/button"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Alert",
  component: Alert,
  subcomponents: { AlertTitle, AlertDescription, AlertAction },
  args: {
    className: "max-w-md",
    children: (
      <>
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to your email address.
        </AlertDescription>
      </>
    ),
  },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/alert)",
      },
    },
  },
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Info: Story = {
  args: {
    children: (
      <>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account settings.
        </AlertDescription>
      </>
    ),
  },
}
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertCircleIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your card was declined. Update your payment method and try again.
        </AlertDescription>
      </>
    ),
  },
}
export const WithAction: Story = {
  args: {
    children: (
      <>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account settings.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            Enable
          </Button>
        </AlertAction>
      </>
    ),
  },
}
