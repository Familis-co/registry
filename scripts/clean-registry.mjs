import { rm } from "node:fs/promises"

// Registry payloads are generated entirely from registry.json and declared source files.
await rm(new URL("../public/r/", import.meta.url), { recursive: true, force: true })
