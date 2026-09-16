import type { Preview } from "@storybook/react-vite"
import "../registry/familis/design/tokens.css"
import { useLayoutEffect, type ReactNode } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"

function ThemeCanvas({
  theme,
  globalTheme,
  children,
}: {
  theme: string
  globalTheme: string
  children: ReactNode
}) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const wasDark = root.classList.contains("dark")
    const scheme = root.style.colorScheme
    root.classList.toggle("dark", globalTheme === "dark")
    root.style.colorScheme = globalTheme
    return () => {
      root.classList.toggle("dark", wasDark)
      root.style.colorScheme = scheme
    }
  }, [globalTheme])
  return (
    <div
      className={`${theme === "dark" ? "dark " : ""}bg-background text-foreground p-6`}
      style={{ colorScheme: theme }}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  tags: ["autodocs"],
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: { icon: "circlehollow", items: ["light", "dark"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        order: ["Design", ["Color", "Radius", "Typography", "Spacing", "Shadow"], "UI"],
      },
    },
    a11y: { test: "error" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    (Story, context) => (
      <ThemeCanvas
        theme={context.parameters.theme ?? context.globals.theme}
        globalTheme={context.globals.theme}
      >
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      </ThemeCanvas>
    ),
  ],
}

export default preview
