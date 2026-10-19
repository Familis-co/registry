import { FileCodeIcon } from "lucide-react"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/registry/familis/ui/code-block"
import { expect, fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/react-vite"

const command = "pnpm dlx shadcn@latest add Familis-co/registry/code-block"

const code = `export function greet(name: string) {
  return \`Hello, \${name}!\`
}

greet("Familis")`

const meta = {
  title: "UI/Code Block",
  component: CodeBlock,
  subcomponents: {
    CodeBlockHeader,
    CodeBlockTitle,
    CodeBlockActions,
    CodeBlockCopyButton,
    CodeBlockContent,
    CodeBlockLine,
    CodeBlockFooter,
  },
  args: { variant: "default", size: "default", className: "max-w-lg" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["default", "sm"] },
  },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCodeIcon />
          greet.ts
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{code}</CodeBlockContent>
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        component:
          "[Official component documentation](https://ui.shadcn.com/docs/components/base/code-block)",
      },
    },
  },
} satisfies Meta<typeof CodeBlock>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const writeText = fn(() => Promise.resolve())
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true })
    await userEvent.click(canvas.getByRole("button", { name: "Copy" }))
    await expect(writeText).toHaveBeenCalledWith(code)
    await expect(await canvas.findByRole("button", { name: "Copied" })).toBeVisible()
  },
}

export const FloatingActions: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockActions>
        <CodeBlockCopyButton value={command} />
      </CodeBlockActions>
      <CodeBlockContent>{command}</CodeBlockContent>
    </CodeBlock>
  ),
}

export const LineNumbers: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent lineNumbers startLine={12}>
        {code}
      </CodeBlockContent>
    </CodeBlock>
  ),
}

export const Diff: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent>
        <CodeBlockLine>{"export function greet(name: string) {"}</CodeBlockLine>
        <CodeBlockLine variant="removed">{"  return `Hi ${name}`"}</CodeBlockLine>
        <CodeBlockLine variant="added">{"  return `Hello, ${name}!`"}</CodeBlockLine>
        <CodeBlockLine>{"}"}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  ),
}

export const Wrap: Story = {
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent wrap>
        {`${command} && pnpm dlx shadcn@latest add Familis-co/registry/trace Familis-co/registry/message`}
      </CodeBlockContent>
      <CodeBlockFooter>Runs from the root of a project initialized with shadcn.</CodeBlockFooter>
    </CodeBlock>
  ),
}

export const Small: Story = { args: { size: "sm" } }

export const Destructive: Story = {
  args: { variant: "destructive", size: "sm" },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockContent wrap>
        ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile" because pnpm-lock.yaml is
        not up to date with package.json
      </CodeBlockContent>
    </CodeBlock>
  ),
}
