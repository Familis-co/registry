import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { expect } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function AccordionDemo() {
  return (
    <Accordion defaultValue={["shipping"]} className="max-w-lg">
      <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on
          international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns accepted within 30 days. Items must be unused and in original packaging. Refunds
          processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          Reach us via email, live chat, or phone. We respond within 24 hours during business days.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const meta = {
  title: "UI/Accordion",
  component: AccordionDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/accordion)",
      },
    },
  },
} satisfies Meta<typeof AccordionDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "What is your return policy?" })
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(canvas.getByText(/Returns accepted within 30 days/)).toBeVisible()
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  },
}
