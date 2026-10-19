import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, waitFor } from "storybook/test"
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/registry/familis/ui/code-block"
import { useHighlightedCode } from "@/registry/familis/ui/hooks/use-highlighted-code"

interface ExampleProps {
  code: string
  language: string
  title: string
}

function HighlightedCodeExample({ code, language, title }: ExampleProps) {
  const lines = useHighlightedCode(code, language)

  return (
    <CodeBlock className="w-md max-w-full">
      <CodeBlockHeader>
        <CodeBlockTitle>{title}</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent>
        {lines.map((line, index) => (
          <CodeBlockLine key={index}>{line}</CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

const meta = {
  title: "UI/Hooks/Highlighted code",
  component: HighlightedCodeExample,
  args: {
    title: "family.json",
    language: "json",
    code: `{
  "name": "Martin",
  "members": 4,
  "city": "Brussels",
  "languages": ["fr", "nl"]
}`,
  },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof HighlightedCodeExample>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const content = canvasElement.querySelector("[data-slot=code-block-content]")
    await expect(content?.querySelectorAll("[data-slot=code-block-line]")).toHaveLength(6)
    // Lines render as plain text until Shiki loads, then as one colored span per token.
    await waitFor(() => expect(content?.querySelector("[style*='--shiki-light']")).not.toBeNull())
    await expect(content).toHaveTextContent('"city": "Brussels"')
  },
}

export const TypeScript: Story = {
  args: {
    title: "greet.ts",
    language: "ts",
    code: `export function greet(name: string) {
  return \`Hello, \${name}!\`
}`,
  },
}

export const UnknownLanguage: Story = {
  args: { title: "notes.txt", language: "text", code: "Plain text stays unhighlighted." },
}
