import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/registry/familis/ui/field"
import { Input } from "@/registry/familis/ui/input"

type FormStoryArgs = React.ComponentProps<typeof FieldGroup> & {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

const meta = {
  title: "UI/Form",
  component: FieldGroup,
  subcomponents: { Field, FieldLabel },
  args: { onSubmit: fn() },
  /**
   * Renders a native form around the field group. Named so hooks lint treats it as a component.
   * @param props - Story args.
   * @param props.onSubmit - Spy called with the submit event after the default is prevented.
   * @returns The form story markup.
   */
  render: function Render({ onSubmit, ...args }: FormStoryArgs) {
    const [saved, setSaved] = useState(false)
    return (
      <form
        className="w-72"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit?.(event)
          setSaved(true)
        }}
      >
        <FieldGroup {...args}>
          <Field>
            <FieldLabel htmlFor="project-name">Project name</FieldLabel>
            <Input id="project-name" name="projectName" required />
          </Field>
          <Button type="submit">Save project</Button>
          {saved && <output aria-live="polite">Project saved</output>}
        </FieldGroup>
      </form>
    )
  },
  parameters: {
    docs: {
      description: {
        component:
          "The historical form registry entry has no Base UI source. Use FieldGroup and Field with native forms or your preferred form library.",
      },
    },
  },
} satisfies Meta<FormStoryArgs>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: "Project name" }), "Client portal")
    await userEvent.click(canvas.getByRole("button", { name: "Save project" }))
    await expect(canvas.getByText("Project saved")).toBeVisible()
    await expect(args.onSubmit).toHaveBeenCalledOnce()
  },
}
