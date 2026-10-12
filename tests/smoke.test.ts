import { spawn, type ChildProcess } from "node:child_process"
import { once } from "node:events"
import { fileURLToPath } from "node:url"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import registry from "../registry.json"

const port = "4317"
const origin = `http://127.0.0.1:${port}`
let server: ChildProcess

/**
 * Requests a path from the production server and checks that it forbids search indexing.
 *
 * @param {string} path - The path to request, starting with `/`.
 * @returns {Promise<Response>} The successful response.
 */
async function fetchOk(path: string): Promise<Response> {
  const response = await fetch(`${origin}${path}`)
  expect(response.status, path).toBe(200)
  expect(response.headers.get("x-robots-tag"), path).toMatch(/\bnoindex\b/)
  return response
}

// Run `pnpm build` first: this starts the Nitro Node server from .output/.
beforeAll(async () => {
  server = spawn(
    process.execPath,
    [fileURLToPath(new URL("../.output/server/index.mjs", import.meta.url))],
    { env: { ...process.env, PORT: port, HOST: "127.0.0.1" }, stdio: "inherit" },
  )
  await vi.waitFor(
    async () => {
      if (server.exitCode !== null) throw new Error("Production server exited before being ready")
      expect((await fetch(`${origin}/api/health`)).ok).toBe(true)
    },
    { timeout: 10_000, interval: 100 },
  )
}, 15_000)

afterAll(async () => {
  if (server.exitCode !== null) return
  server.kill("SIGTERM")
  await once(server, "exit")
})

describe("production server", () => {
  it("reports its health", async () => {
    const response = await fetch(`${origin}/api/health`)
    expect(await response.json()).toEqual({ status: "ok", service: "familis-registry" })
  })

  // Stories only render in a browser, so this is the one place a server-only failure shows up.
  it("renders the catalog on the server with the logo and noindex", async () => {
    const html = await (await fetchOk("/")).text()
    expect(html).toMatch(/Familis/)
    expect(html).toMatch(/<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/)
    expect(html).toMatch(/<svg\b[^>]*role="img"[^>]*aria-label="Familis"/)
  })

  it("serves the registry built from registry.json", async () => {
    const catalog = await (await fetchOk("/r/registry.json")).json()
    expect(catalog.items).toHaveLength(registry.items.length)
    const response = await fetchOk("/r/button.json")
    expect(response.headers.get("content-type")).toMatch(/application\/json/)
    const [file] = (await response.json()).files
    expect(file.content).not.toHaveLength(0)
  })

  it("serves Storybook and its story index", async () => {
    expect(await (await fetchOk("/storybook/")).text()).toMatch(/<title>[^<]*Storybook/)
    const index = await (await fetchOk("/storybook/index.json")).json()
    expect(Object.keys(index.entries)).not.toHaveLength(0)
  })

  it("answers 404 for an item the registry does not publish", async () => {
    expect((await fetch(`${origin}/r/missing.json`)).status).toBe(404)
  })
})
