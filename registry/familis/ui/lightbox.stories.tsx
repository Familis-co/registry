import { XIcon } from "lucide-react"
import { Button } from "@/registry/familis/ui/button"
import {
  Lightbox,
  LightboxClose,
  LightboxContent,
  LightboxTitle,
  LightboxTrigger,
} from "@/registry/familis/ui/lightbox"
import { expect, fn, waitFor, within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "UI/Lightbox",
  component: Lightbox,
  subcomponents: { LightboxTrigger, LightboxContent, LightboxTitle, LightboxClose },
  args: { onOpenChange: fn() },
  render: (args) => (
    <Lightbox {...args}>
      <LightboxTrigger
        aria-label="View workspace photo"
        className="overflow-hidden rounded-lg ring-1 ring-foreground/10 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <img src="/fixtures/avatar.svg" alt="" className="size-32 object-cover" />
      </LightboxTrigger>
      <LightboxContent className="flex-col">
        <header className="flex items-center justify-between gap-4 p-4">
          <LightboxTitle>workspace.png</LightboxTitle>
          <LightboxClose render={<Button variant="ghost" size="icon-sm" />}>
            <XIcon />
            <span className="sr-only">Close</span>
          </LightboxClose>
        </header>
        <div className="flex min-h-0 flex-1 items-center justify-center p-4">
          <img
            src="/fixtures/avatar.svg"
            alt="Workspace"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </LightboxContent>
    </Lightbox>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "A full-screen, dark stage for media, built on the [Base UI dialog](https://base-ui.com/react/components/dialog). It traps focus, closes on Escape and restores focus to its trigger.",
      },
    },
  },
} satisfies Meta<typeof Lightbox>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent, canvasElement }) => {
    const trigger = canvas.getByRole("button", { name: "View workspace photo" })
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(trigger)
    const lightbox = await page.findByRole("dialog", { name: "workspace.png" })
    await expect(lightbox).toHaveClass("dark")
    // The popup fades in from zero opacity, which jest-dom treats as hidden.
    await waitFor(() =>
      expect(within(lightbox).getByRole("img", { name: "Workspace" })).toBeVisible(),
    )
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()

    await userEvent.click(trigger)
    const reopened = await page.findByRole("dialog", { name: "workspace.png" })
    await userEvent.click(within(reopened).getByRole("button", { name: "Close" }))
    await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false, expect.anything())
  },
}
