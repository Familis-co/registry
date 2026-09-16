import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { setTimeout as delay } from "node:timers/promises"

const port = "4317"
const origin = `http://127.0.0.1:${port}`
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
  assert.match(await page.text(), /Familis/)
  const source = JSON.parse(await readFile("registry.json", "utf8"))
  const catalog = await fetch(`${origin}/r/registry.json`)
  assert.equal(catalog.status, 200)
  assert.equal((await catalog.json()).items.length, source.items.length)
  for (const item of source.items) {
    const response = await fetch(`${origin}/r/${item.name}.json`)
    assert.equal(response.status, 200)
    assert.match(response.headers.get("content-type"), /application\/json/)
    const payload = await response.json()
    assert.equal(payload.name, item.name)
    assert.ok(payload.files.every((file) => file.content.length > 0))
  }
  const missing = await fetch(`${origin}/r/missing.json`)
  assert.equal(missing.status, 404)
  console.log("Production SSR, health route, registry catalog, items, and 404 passed.")
} finally {
  if (!exited) {
    const stopped = new Promise((resolve) => server.once("exit", resolve))
    server.kill("SIGTERM")
    await stopped
  }
}
