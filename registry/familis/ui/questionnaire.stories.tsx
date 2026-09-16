import { useState } from "react"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"
const items = [
  {
    name: "project",
    required: true,
    title: "Which project should we start?",
    choices: [
      { label: "Client portal", value: "portal" },
      { label: "Team workspace", value: "workspace" },
    ],
  },
  {
    name: "timing",
    required: true,
    title: "When should we begin?",
    choices: [
      { label: "This week", value: "week" },
      { label: "Next month", value: "month" },
    ],
  },
] as const

const meta = {
  title: "UI/Questionnaire",
  component: Questionnaire,
  subcomponents: {
    QuestionnaireProgress,
    QuestionnaireItem,
    QuestionnaireTitle,
    QuestionnaireDescription,
    QuestionnaireChoices,
    QuestionnaireChoice,
    QuestionnaireError,
    QuestionnaireActions,
    QuestionnairePrevious,
    QuestionnaireNext,
    QuestionnaireSubmit,
  },
  args: { items, defaultItem: "project", onItemChange: fn(), onSubmit: fn() },
  argTypes: {
    defaultItem: { control: "select", options: items.map((item) => item.name) },
  },
  render: function Render({ onSubmit, ...args }) {
    const [submitted, setSubmitted] = useState(false)
    return (
      <div className="w-96 max-w-full">
        <Questionnaire
          {...args}
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
            onSubmit?.(event)
          }}
        >
          <QuestionnaireProgress />
          {items.map((question) => (
            <QuestionnaireItem key={question.name} name={question.name} required>
              <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
              <QuestionnaireDescription>Select one option to continue.</QuestionnaireDescription>
              <QuestionnaireChoices>
                {question.choices.map((choice) => (
                  <QuestionnaireChoice key={choice.value} value={choice.value}>
                    {choice.label}
                  </QuestionnaireChoice>
                ))}
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
          ))}
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Save answers</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
        {submitted && <output aria-live="polite">Answers saved</output>}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/questionnaire)",
      },
    },
  },
} satisfies Meta<typeof Questionnaire>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Client portal" }))
    await userEvent.click(canvas.getByRole("button", { name: "Next" }))
    await userEvent.click(await canvas.findByRole("radio", { name: "This week" }))
    await expect(args.onItemChange).toHaveBeenCalledWith("timing")
    await userEvent.click(canvas.getByRole("button", { name: "Save answers" }))
    await expect(await canvas.findByText("Answers saved")).toBeVisible()
    await expect(args.onSubmit).toHaveBeenCalledOnce()
  },
}
export const SecondQuestion: Story = { args: { defaultItem: "timing" } }
