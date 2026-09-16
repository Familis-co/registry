import { expect, within, waitFor } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FolderIcon, HomeIcon } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>Familis</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HomeIcon />
                    Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderIcon />
                    Projects
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-3 p-4">
          <SidebarTrigger />
          <h1>Client portal</h1>
        </header>
        <p className="p-4">Use the sidebar trigger to collapse the navigation.</p>
      </SidebarInset>
    </SidebarProvider>
  )
}
const meta = {
  title: "UI/Sidebar",
  component: SidebarDemo,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SidebarDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Toggle Sidebar" })
    const sidebar = canvasElement.querySelector('[data-slot="sidebar"]')
    await userEvent.click(trigger)
    if (sidebar) {
      await expect(sidebar).toHaveAttribute("data-state", "collapsed")
      await userEvent.click(trigger)
      await expect(sidebar).toHaveAttribute("data-state", "expanded")
    } else {
      const page = within(canvasElement.ownerDocument.body)
      await expect(await page.findByRole("dialog", { name: "Sidebar" })).toBeVisible()
      await userEvent.keyboard("{Escape}")
      await waitFor(() => expect(page.queryByRole("dialog")).not.toBeInTheDocument())
    }
  },
}
