import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { expect, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-[12rem] sm:max-w-xs">
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
  )
}

const meta = {
  title: "UI/Carousel",
  component: CarouselDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/carousel)",
      },
    },
  },
} satisfies Meta<typeof CarouselDemo>
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
