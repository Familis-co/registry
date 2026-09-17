import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"

const readJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), "utf8"))
const source = await readJson("../registry.json")
const catalog = await readJson("../public/r/registry.json")
const itemsByName = new Map(source.items.map((item) => [item.name, item]))
const itemsByPath = new Map(
  source.items.flatMap((item) => (item.files ?? []).map((file) => [file.path, item])),
)
// Styles and fonts only change the consumer's CSS, dependencies and configuration.
const fileless = new Set(["registry:base", "registry:font"])
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
  const files = item.files ?? []
  if (!fileless.has(item.type)) assert.ok(files.length > 0, `Missing files: ${item.name}`)
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
  assert.deepEqual(built.cssVars, item.cssVars)
  assert.deepEqual(built.css, item.css)
  assert.deepEqual(built.font, item.font)
  assert.deepEqual(built.config, item.config)
  assert.equal((built.files ?? []).length, files.length)
  for (const file of files) {
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
const brandItems = source.items.filter((item) =>
  item.files?.some((file) => file.path.startsWith("registry/familis/brand/")),
)
for (const item of brandItems) {
  const story = await readFile(
    new URL(`../registry/familis/brand/${item.name}.stories.tsx`, import.meta.url),
    "utf8",
  )
  assert.match(story, /title: "Design\//, `Missing brand story: ${item.name}`)
  assert.ok(item.meta?.storybookId, `Missing brand preview ID: ${item.name}`)
}

/**
 * Collapses whitespace and uses single quotes, matching how registry.json stores CSS values.
 *
 * @param {string} value - A CSS value or rule as written in a stylesheet.
 * @returns {string} The normalized text.
 */
const normalizeCss = (value) => value.replace(/\s+/g, " ").trim().replaceAll('"', "'")

/**
 * Reads the custom properties declared by a top-level rule of the app stylesheet.
 *
 * @param {string} stylesheet - The stylesheet source.
 * @param {string} prelude - The rule's selector or at-rule, such as `:root` or `@theme static`.
 * @returns {Record<string, string>} Normalized values keyed by property name without the `--`.
 */
function readCustomProperties(stylesheet, prelude) {
  const escaped = prelude.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const body = stylesheet.match(new RegExp(`^${escaped}\\s*\\{([^}]*)\\}`, "m"))?.[1]
  assert.ok(body, `Missing ${prelude} in src/styles.css`)
  return Object.fromEntries(
    body
      .split(";")
      .map((declaration) => declaration.trim())
      .filter((declaration) => declaration.startsWith("--"))
      .map((declaration) => {
        const colon = declaration.indexOf(":")
        return [declaration.slice(2, colon).trim(), normalizeCss(declaration.slice(colon + 1))]
      }),
  )
}

/**
 * Lists the npm packages a registry item imports through its `css` field.
 *
 * @param {{ css?: Record<string, unknown> }} item - A registry item.
 * @returns {string[]} Imported module specifiers, such as `@fontsource-variable/inter/wght-italic.css`.
 */
const cssImports = (item) =>
  Object.keys(item.css ?? {})
    .map((rule) => rule.match(/^@import "([^."][^"]*)"$/)?.[1])
    .filter(Boolean)

// The catalog and Storybook render src/styles.css, so the installable style must match it.
const stylesheet = await readFile(new URL("../src/styles.css", import.meta.url), "utf8")
const components = await readJson("../components.json")
const styles = source.items.filter((item) => item.type === "registry:base")
const fonts = source.items.filter((item) => item.type === "registry:font")
assert.equal(styles.length, 1, "The registry must publish exactly one Familis style")
const [style] = styles
assert.equal(style.config?.style, components.style, "The style must match components.json")
assert.equal(style.config?.iconLibrary, components.iconLibrary)
for (const item of [...fonts, ...brandItems]) {
  assert.ok(
    style.registryDependencies?.includes(`Familis-co/registry/${item.name}`),
    `The ${style.name} style must install ${item.name}`,
  )
}
assert.deepEqual(style.cssVars?.light, readCustomProperties(stylesheet, ":root"))
assert.deepEqual(style.cssVars?.dark, readCustomProperties(stylesheet, ".dark"))
assert.deepEqual(
  {
    ...style.cssVars?.theme,
    ...Object.fromEntries(fonts.map(({ font }) => [font.variable.slice(2), font.family])),
  },
  readCustomProperties(stylesheet, "@theme static"),
)
// shadcn applies every selector-less font to html in one @apply, where the last utility
// alphabetically wins, so a second one would replace Inter across the whole document.
assert.ok(
  fonts.filter(({ font }) => !font.selector).length <= 1,
  "Only one font may omit a selector",
)
const flatStylesheet = normalizeCss(stylesheet)
for (const { font } of fonts) {
  const rule = `${font.selector ?? "html"} { @apply ${font.variable.slice(2)}; }`
  assert.ok(flatStylesheet.includes(rule), `Missing base rule in src/styles.css: ${rule}`)
}
for (const item of [style, ...fonts]) {
  for (const imported of cssImports(item)) {
    const dependency = imported.split("/").slice(0, 2).join("/")
    // Next.js projects load registry:font items with next/font, so the CLI installs
    // font.dependency only for other frameworks. Extra imports need their own dependency.
    assert.ok(
      item.dependencies?.some((entry) => entry.replace(/@[^@/]+$/, "") === dependency),
      `Undeclared dependency ${dependency} in ${item.name}`,
    )
  }
}
assert.deepEqual(
  [...stylesheet.matchAll(/^@import "(@fontsource[^"]+)";$/gm)].map((match) => match[1]).sort(),
  [
    ...fonts.map(({ font }) => font.dependency),
    ...[style, ...fonts].flatMap((item) => cssImports(item)),
  ].sort(),
  "src/styles.css must load exactly the fonts the style installs",
)
console.log(`Validated ${source.items.length} registry items and their source payloads.`)
