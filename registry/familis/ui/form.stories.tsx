import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function FormDemo() {
  const [saved, setSaved] = useState(false)
  return (
    <form
      className="w-72"
      onSubmit={(event) => {
        event.preventDefault()
        setSaved(true)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="project-name">Project name</FieldLabel>
          <Input id="project-name" name="projectName" required />
        </Field>
        <Button type="submit">Save project</Button>
        {saved && <output aria-live="polite">Project saved</output>}
      </FieldGroup>
    </form>
  )
}
const meta = {
  title: "UI/Form",
  component: FormDemo,
  parameters: {
    docs: {
      description: {
        component:
          "The historical form registry entry has no Base UI source. Use FieldGroup and Field with native forms or your preferred form library.",
      },
    },
  },
} satisfies Meta<typeof FormDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: "Project name" }), "Client portal")
    await userEvent.click(canvas.getByRole("button", { name: "Save project" }))
    await expect(canvas.getByText("Project saved")).toBeVisible()
  },
}
