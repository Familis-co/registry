import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@/registry": fileURLToPath(new URL("./registry", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: process.env.NITRO_PRESET,
      publicAssets: [{ baseURL: "/storybook", dir: "storybook-static" }],
      routeRules: {
        "/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
      },
      cloudflare: {
        wrangler: {
          name: "familis-registry",
          route: {
            custom_domain: true,
            pattern: "registry.familis.care",
          },
        },
      },
    }),
    react(),
  ],
})
