import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"

const readJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"))
const source = await readJson("../registry.json")
const catalog = await readJson("../public/r/registry.json")
const itemsByName = new Map(source.items.map((item) => [item.name, item]))
const itemsByPath = new Map(
  source.items.flatMap((item) => item.files.map((file) => [file.path, item])),
)
assert.equal(itemsByName.size, source.items.length, "Registry item names must be unique")
assert.equal(catalog.name, source.name)
assert.equal(catalog.homepage, source.homepage)
assert.deepEqual(
  (await readdir(new URL("../public/r/", import.meta.url)))
    .filter((name) => name.endsWith(".json"))
    .sort(),
  ["registry.json", ...source.items.map((item) => `${item.name}.json`)].sort(),
  "Generated payloads must exclude removed registry items",
)
assert.deepEqual(
  catalog.items.map((item) => item.name).sort(),
  source.items.map((item) => item.name).sort(),
)

for (const item of source.items) {
  assert.ok(item.title?.trim(), `Missing title: ${item.name}`)
  assert.ok(item.description?.trim(), `Missing description: ${item.name}`)
  assert.ok(item.files.length > 0, `Missing files: ${item.name}`)
  for (const address of item.registryDependencies ?? []) {
    if (!address.startsWith("Familis-co/registry/")) continue
    assert.ok(
      itemsByName.has(address.slice("Familis-co/registry/".length)),
      `Unknown registry dependency ${address} in ${item.name}`,
    )
  }
  const built = await readJson(`../public/r/${item.name}.json`)
  assert.equal(built.name, item.name)
  assert.equal(built.type, item.type)
  assert.equal(built.title, item.title)
  assert.equal(built.description, item.description)
  assert.deepEqual(built.dependencies, item.dependencies)
  assert.deepEqual(built.registryDependencies, item.registryDependencies)
  assert.equal(built.files.length, item.files.length)
  for (const file of item.files) {
    assert.ok(file.path.startsWith("registry/"), `Source must live under registry/: ${file.path}`)
    const payload = built.files.find((entry) => entry.path === file.path)
    assert.ok(payload, `Missing built file: ${file.path}`)
    assert.equal(payload.type, file.type)
    assert.equal(payload.target, file.target)
    assert.equal(
      payload.content,
      await readFile(new URL(`../${file.path}`, import.meta.url), "utf8"),
      `Stale registry content: ${file.path}`,
    )
    for (const match of payload.content.matchAll(/(?:from\s+|import\s*[(]?)["']([^"']+)["']/g)) {
      const imported = match[1]
      if (imported.startsWith("@/registry/")) {
        const path = imported.slice(2)
        const owner = [path, `${path}.tsx`, `${path}.ts`, `${path}/index.tsx`, `${path}/index.ts`]
          .map((candidate) => itemsByPath.get(candidate))
          .find(Boolean)
        assert.ok(owner, `Import is not an installable registry file: ${imported} in ${item.name}`)
        if (owner.name !== item.name) {
          assert.ok(
            item.registryDependencies?.includes(`Familis-co/registry/${owner.name}`),
            `Undeclared registry dependency ${owner.name} in ${item.name}`,
          )
        }
        continue
      }
      assert.ok(
        !imported.startsWith(".") && !imported.startsWith("@/"),
        `Internal source imports must use @/registry: ${imported} in ${item.name}`,
      )
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
for (const item of source.items.filter((entry) => entry.type === "registry:block")) {
  const story = await readFile(
    new URL(`../registry/familis/blocks/${item.name}/${item.name}.stories.tsx`, import.meta.url),
    "utf8",
  )
  assert.match(story, /title: "UI\/Blocks\//, `Missing block story: ${item.name}`)
  assert.ok(item.meta?.storybookId, `Missing block preview ID: ${item.name}`)
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
