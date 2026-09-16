import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@/components/ui": fileURLToPath(new URL("./registry/familis/ui", import.meta.url)),
      "@/hooks": fileURLToPath(new URL("./registry/familis/ui/hooks", import.meta.url)),
      "@/registry": fileURLToPath(new URL("./registry", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [tailwindcss(), tanstackStart(), nitro(), react()],
})
