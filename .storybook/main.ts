import type { StorybookConfig } from "@storybook/react-vite"
import { fileURLToPath } from "node:url"

const config: StorybookConfig = {
  stories: ["../registry/familis/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: fileURLToPath(new URL("./vite.config.ts", import.meta.url)),
      },
    },
  },
  core: { disableTelemetry: true },
}

export default config
