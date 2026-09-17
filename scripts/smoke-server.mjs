import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { setTimeout as delay } from "node:timers/promises"

const port = "4317"
const origin = `http://127.0.0.1:${port}`
const assertNoIndex = (response) =>
  assert.match(response.headers.get("x-robots-tag") ?? "", /\bnoindex\b/, response.url)
const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT: port, HOST: "127.0.0.1" },
  stdio: "inherit",
})
let exited = false
server.once("exit", () => {
  exited = true
})

try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    if (exited) throw new Error("Production server exited before becoming ready")
    try {
      ready = (await fetch(`${origin}/api/health`)).ok
    } catch {
      /* Wait for the listener. */
    }
    if (ready) break
    await delay(100)
  }
  assert.ok(ready, "Production server did not start")
  assert.deepEqual(await (await fetch(`${origin}/api/health`)).json(), {
    status: "ok",
    service: "familis-registry",
  })
  const page = await fetch(origin)
  assert.equal(page.status, 200)
  assertNoIndex(page)
  const html = await page.text()
  assert.match(html, /Familis/)
  assert.match(html, /<meta\b[^>]*name="robots"[^>]*content="noindex, nofollow"/)
  assert.match(html, /<svg\b[^>]*data-slot="familis-logo"/)
  const robots = await fetch(`${origin}/robots.txt`)
  assert.equal(robots.status, 200)
  assertNoIndex(robots)
  assert.match(await robots.text(), /User-agent: \*\s+Allow: \//)
  const source = JSON.parse(await readFile("registry.json", "utf8"))
  const catalog = await fetch(`${origin}/r/registry.json`)
  assert.equal(catalog.status, 200)
  assertNoIndex(catalog)
  assert.equal((await catalog.json()).items.length, source.items.length)
  for (const item of source.items) {
    const response = await fetch(`${origin}/r/${item.name}.json`)
    assert.equal(response.status, 200)
    assertNoIndex(response)
    assert.match(response.headers.get("content-type"), /application\/json/)
    const payload = await response.json()
    assert.equal(payload.name, item.name)
    assert.ok((payload.files ?? []).every((file) => file.content.length > 0))
  }
  const storybook = await fetch(`${origin}/storybook/`)
  assert.equal(storybook.status, 200)
  assertNoIndex(storybook)
  assert.match(await storybook.text(), /<title>[^<]*Storybook/)
  const storybookIndex = await fetch(`${origin}/storybook/index.json`)
  assert.equal(storybookIndex.status, 200)
  assertNoIndex(storybookIndex)
  assert.ok(Object.keys((await storybookIndex.json()).entries).length > 0)
  const missing = await fetch(`${origin}/r/missing.json`)
  assert.equal(missing.status, 404)
  const removed = await fetch(`${origin}/r/project-card.json`)
  assert.equal(removed.status, 404, "Removed blocks must no longer be served")
  console.log(
    "Production SSR, logo, noindex, registry payloads, Storybook, health, and 404 passed.",
  )
} finally {
  if (!exited) {
    const stopped = new Promise((resolve) => server.once("exit", resolve))
    server.kill("SIGTERM")
    await stopped
  }
}
