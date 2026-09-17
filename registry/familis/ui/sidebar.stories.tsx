import type * as React from "react"
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
} from "@/registry/familis/ui/sidebar"

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  subcomponents: {
    SidebarProvider,
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
  },
  args: { collapsible: "icon", side: "left", variant: "sidebar", defaultOpen: true },
  argTypes: {
    collapsible: { control: "select", options: ["offcanvas", "icon", "none"] },
    side: { control: "inline-radio", options: ["left", "right"] },
    variant: { control: "select", options: ["sidebar", "floating", "inset"] },
  },
  render: ({ defaultOpen, ...args }) => (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar {...args}>
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
  ),
  parameters: { layout: "fullscreen" },
} satisfies Meta<React.ComponentProps<typeof Sidebar> & { defaultOpen?: boolean }>
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
export const Collapsed: Story = { args: { defaultOpen: false } }
export const Floating: Story = { args: { variant: "floating" } }
export const Inset: Story = { args: { variant: "inset" } }
export const Right: Story = { args: { side: "right" } }
export const Offcanvas: Story = { args: { collapsible: "offcanvas" } }
