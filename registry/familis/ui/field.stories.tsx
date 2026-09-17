import { Button } from "@/registry/familis/ui/button"
import { Checkbox } from "@/registry/familis/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/familis/ui/field"
import { Input } from "@/registry/familis/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/familis/ui/select"
import { Textarea } from "@/registry/familis/ui/textarea"
import type { Meta, StoryObj } from "@storybook/react-vite"
const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

const meta = {
  title: "UI/Field",
  component: Field,
  subcomponents: {
    FieldSet,
    FieldLegend,
    FieldGroup,
    FieldLabel,
    FieldDescription,
    FieldSeparator,
    FieldContent,
    FieldTitle,
    FieldError,
  },
  args: { orientation: "vertical", className: "w-72" },
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal", "responsive"] },
  },
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="field-card-number">Card Number</FieldLabel>
      <Input id="field-card-number" placeholder="1234 5678 9012 3456" required />
      <FieldDescription>Enter your 16-digit card number</FieldDescription>
    </Field>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/field)",
      },
    },
  },
} satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Field {...args}>
      <Checkbox id="field-same-as-shipping" defaultChecked />
      <FieldLabel htmlFor="field-same-as-shipping" className="font-normal">
        Same as shipping address
      </FieldLabel>
    </Field>
  ),
}
export const Invalid: Story = {
  render: (args) => (
    <Field {...args} data-invalid>
      <FieldLabel htmlFor="field-card-number-invalid">Card Number</FieldLabel>
      <Input id="field-card-number-invalid" defaultValue="1234" aria-invalid required />
      <FieldError>Card number must be 16 digits</FieldError>
    </Field>
  ),
}
export const PaymentForm: Story = {
  args: { className: undefined },
  render: (args) => (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
            <FieldGroup>
              <Field {...args}>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">Name on Card</FieldLabel>
                <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
              </Field>
              <Field {...args}>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">Card Number</FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>Enter your 16-digit card number</FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field {...args}>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">Month</FieldLabel>
                  <Select items={months}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {months.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field {...args}>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">Year</FieldLabel>
                  <Select items={years}>
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {years.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field {...args}>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="checkout-7j9-same-as-shipping-wgm" defaultChecked />
                <FieldLabel htmlFor="checkout-7j9-same-as-shipping-wgm" className="font-normal">
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field {...args}>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">Comments</FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  ),
}
