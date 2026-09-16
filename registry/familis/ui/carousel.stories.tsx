import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { expect, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Carousel",
  component: Carousel,
  subcomponents: { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext },
  args: {
    orientation: "horizontal",
    className: "w-full max-w-[12rem] sm:max-w-xs",
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center rounded-lg border bg-card text-card-foreground">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/carousel)",
      },
    },
  },
} satisfies Meta<typeof Carousel>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const previous = canvas.getByRole("button", { name: "Previous slide" })
    const next = canvas.getByRole("button", { name: "Next slide" })
    await expect(previous).toBeDisabled()
    await waitFor(() => expect(next).toBeEnabled())
    await userEvent.click(next)
    await waitFor(() => expect(previous).toBeEnabled())
  },
}
export const Loop: Story = { args: { opts: { loop: true } } }
export const Vertical: Story = {
  args: { orientation: "vertical", opts: { align: "start" }, className: "my-16 w-full max-w-xs" },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <div className="flex items-center justify-center rounded-lg border bg-card p-6 text-card-foreground">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
