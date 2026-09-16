import "../src/styles.css"

import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react-vite"
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

  parameters: {
    layout: "centered",
    options: {
      storySort: {
        order: ["Design", ["Color", "Radius", "Typography", "Spacing", "Shadow"], "UI"],
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    actions: { argTypesRegex: "^on.*" },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
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
