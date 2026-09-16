import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

const readJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"))
const source = await readJson("../registry.json")
const catalog = await readJson("../public/r/registry.json")
assert.equal(catalog.name, source.name)
assert.deepEqual(
  catalog.items.map((item) => item.name).sort(),
  source.items.map((item) => item.name).sort(),
)

for (const item of source.items) {
  const built = await readJson(`../public/r/${item.name}.json`)
  assert.equal(built.name, item.name)
  assert.deepEqual(built.dependencies, item.dependencies)
  assert.deepEqual(built.registryDependencies, item.registryDependencies)
  assert.equal(built.files.length, item.files.length)
  for (const file of item.files) {
    const payload = built.files.find((entry) => entry.path === file.path)
    assert.ok(payload, `Missing built file: ${file.path}`)
    assert.equal(
      payload.content,
      await readFile(new URL(`../${file.path}`, import.meta.url), "utf8"),
      `Stale registry content: ${file.path}`,
    )
    for (const match of payload.content.matchAll(/(?:from\s+|import\s*[(]?)["']([^"']+)["']/g)) {
      const imported = match[1]
      if (imported.startsWith("@/components/ui/") || imported.startsWith("@/hooks/")) {
        const dependency = imported.split("/").at(-1)
        assert.ok(
          item.registryDependencies?.includes(`Familis-co/registry/${dependency}`),
          `Undeclared registry dependency ${dependency} in ${item.name}`,
        )
      }
      if (imported.startsWith(".") || imported.startsWith("@/")) continue
      const dependency = imported.startsWith("@")
        ? imported.split("/").slice(0, 2).join("/")
        : imported.split("/")[0]
      if (["react", "react-dom"].includes(dependency)) continue
      assert.ok(
        item.dependencies?.some(
          (entry) => entry === dependency || entry.startsWith(`${dependency}@`),
        ),
        `Undeclared dependency ${dependency} in ${item.name}`,
      )
    }
    assert.doesNotMatch(
      payload.content,
      /(?:from\s+["'](?:next\/|@\/routes|@\/lib\/registry))/,
      "Registry files must be portable React components",
    )
  }
}
// Keep the installable UI catalog and Storybook coverage in sync.
for (const item of source.items.filter((entry) => entry.type === "registry:ui")) {
  const story = await readFile(
    new URL(`../registry/familis/ui/${item.name}.stories.tsx`, import.meta.url),
    "utf8",
  )
  assert.match(story, /title: "UI\//, `Missing UI story: ${item.name}`)
}
for (const name of ["color", "radius", "typography", "spacing", "shadow"]) {
  const story = await readFile(
    new URL(`../registry/familis/tokens/${name}.stories.tsx`, import.meta.url),
    "utf8",
  )
  assert.match(story, /title: "Design\//, `Missing design story: ${name}`)
}
console.log(`Validated ${source.items.length} registry items and their source payloads.`)
