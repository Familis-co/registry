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
import { expect } from "storybook/test"
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
function QuestionnaireDemo() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="w-96 max-w-full">
      <Questionnaire
        items={items}
        defaultItem="project"
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
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
}

const meta = {
  title: "UI/Questionnaire",
  component: QuestionnaireDemo,
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/questionnaire)",
      },
    },
  },
} satisfies Meta<typeof QuestionnaireDemo>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Client portal" }))
    await userEvent.click(canvas.getByRole("button", { name: "Next" }))
    await userEvent.click(await canvas.findByRole("radio", { name: "This week" }))
    await userEvent.click(canvas.getByRole("button", { name: "Save answers" }))
    await expect(await canvas.findByText("Answers saved")).toBeVisible()
  },
}
