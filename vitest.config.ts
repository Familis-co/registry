import { fileURLToPath } from "node:url"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig, mergeConfig } from "vitest/config"
import storybookVite from "./.storybook/vite.config.ts"

export default mergeConfig(
  storybookVite,
  defineConfig({
    test: {
      projects: [
        {
          test: {
            name: "registry",
            environment: "node",
            include: ["tests/registry.test.ts"],
          },
        },
        {
          test: {
            name: "smoke",
            environment: "node",
            include: ["tests/smoke.test.ts"],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({ configDir: fileURLToPath(new URL("./.storybook", import.meta.url)) }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              provider: playwright({ launchOptions: { channel: "chromium" } }),
              headless: true,
              instances: [{ browser: "chromium" }],
            },
          },
        },
      ],
    },
  }),
)
