import { readdir, readFile } from "node:fs/promises"
import semver from "semver"
import { registryItemSchema, registrySchema, type RegistryItem } from "shadcn/schema"
import { describe, expect, it } from "vitest"

import components from "../components.json"
import source from "../registry.json"

const root = new URL("../", import.meta.url)
const namespace = "Familis-co/registry/"
const brandDirectory = "registry/familis/brand/"
const registry = registrySchema.parse(source)
const items = registry.items
const itemsByName = new Map(items.map((item) => [item.name, item]))
const itemsByPath = new Map(
  items.flatMap((item) => (item.files ?? []).map((file) => [file.path, item] as const)),
)
const brandItems = items.filter((item) =>
  item.files?.some((file) => file.path.startsWith(brandDirectory)),
)

/**
 * Reads a file of the repository as text.
 *
 * @param {string} path - The path relative to the repository root.
 * @returns {Promise<string>} The file content.
 */
function read(path: string): Promise<string> {
  return readFile(new URL(path, root), "utf8")
}

/**
 * Reads and parses a JSON file of the repository.
 *
 * @param {string} path - The path relative to the repository root.
 * @returns {Promise<any>} The parsed document.
 */
async function readJson(path: string) {
  return JSON.parse(await read(path))
}

/**
 * Splits a registry dependency into its package name and version range.
 *
 * @param {string} entry - A dependency as written in registry.json, such as `@base-ui/react@^1.8.0`.
 * @returns {{ name: string; range: string }} The package name and its range, `*` when unversioned.
 */
function parseDependency(entry: string): { name: string; range: string } {
  const separator = entry.lastIndexOf("@")
  if (separator <= 0) return { name: entry, range: "*" }
  return { name: entry.slice(0, separator), range: entry.slice(separator + 1) }
}

/**
 * Lists the module specifiers a source file imports, statically or dynamically.
 *
 * @param {string} content - The source of a TypeScript or TSX module.
 * @returns {string[]} The imported specifiers, such as `lucide-react` or `@/registry/familis/ui/button`.
 */
function importsOf(content: string): string[] {
  return [...content.matchAll(/(?:from\s+|import\s*[(]?)["']([^"']+)["']/g)].map(
    (match) => match[1],
  )
}

/**
 * Locates the story documenting an item and the Storybook section it must appear in.
 *
 * @param {RegistryItem} item - A registry item.
 * @returns {{ path: string; section: string; previewed: boolean } | undefined} The story path,
 * its title prefix and whether the catalog links to it through `meta.storybookId`. Styles and
 * fonts have no story.
 */
function storyOf(
  item: RegistryItem,
): { path: string; section: string; previewed: boolean } | undefined {
  const { name } = item
  if (item.type === "registry:block") {
    return {
      path: `registry/familis/blocks/${name}/${name}.stories.tsx`,
      section: "UI/Blocks/",
      previewed: true,
    }
  }
  if (item.type === "registry:ui") {
    return { path: `registry/familis/ui/${name}.stories.tsx`, section: "UI/", previewed: false }
  }
  if (item.type === "registry:hook") {
    return {
      path: `registry/familis/ui/hooks/${name}.stories.tsx`,
      section: "UI/Hooks/",
      previewed: true,
    }
  }
  if (brandItems.includes(item)) {
    return { path: `${brandDirectory}${name}.stories.tsx`, section: "Design/", previewed: true }
  }
}

/**
 * Collapses whitespace and uses single quotes, matching how registry.json stores CSS values.
 *
 * @param {string} value - A CSS value or rule as written in a stylesheet.
 * @returns {string} The normalized text.
 */
function normalizeCss(value: string): string {
  return value.replace(/\s+/g, " ").trim().replaceAll('"', "'")
}

/**
 * Reads the custom properties declared by a top-level rule of the app stylesheet.
 *
 * @param {string} stylesheet - The stylesheet source.
 * @param {string} prelude - The rule's selector or at-rule, such as `:root` or `@theme static`.
 * @returns {Record<string, string>} Normalized values keyed by property name without the `--`.
 */
function readCustomProperties(stylesheet: string, prelude: string): Record<string, string> {
  const escaped = prelude.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const body = stylesheet.match(new RegExp(`^${escaped}\\s*\\{([^}]*)\\}`, "m"))?.[1]
  if (!body) throw new Error(`Missing ${prelude} in src/styles.css`)
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
 * Lists the npm modules a registry item imports through its `css` field.
 *
 * @param {RegistryItem} item - A registry item.
 * @returns {string[]} Imported module specifiers, such as `@fontsource-variable/inter/wght-italic.css`.
 */
function cssImports(item: RegistryItem): string[] {
  return Object.keys(item.css ?? {}).flatMap(
    (rule) => rule.match(/^@import "([^."][^"]*)"$/)?.[1] ?? [],
  )
}

describe("registry.json", () => {
  it("names every item once", () => {
    expect(itemsByName.size).toBe(items.length)
  })

  describe.each(items)("$name", (item) => {
    const files = item.files ?? []
    const dependencies = (item.dependencies ?? []).map(parseDependency)

    it("has a title, a description and source under registry/", () => {
      expect(item.title?.trim(), "Missing title").toBeTruthy()
      expect(item.description?.trim(), "Missing description").toBeTruthy()
      // Styles and fonts only change the consumer's CSS, dependencies and configuration.
      if (item.type !== "registry:base" && item.type !== "registry:font") {
        expect(files, "Missing files").not.toHaveLength(0)
      }
      for (const file of files) {
        expect(file.path, "Source must live under registry/").toMatch(/^registry\//)
      }
    })

    it("depends on Familis items that exist", () => {
      for (const address of item.registryDependencies ?? []) {
        if (!address.startsWith(namespace)) continue
        expect(itemsByName.has(address.slice(namespace.length)), `Unknown ${address}`).toBe(true)
      }
    })

    it("declares every package and registry item its files import", async () => {
      for (const file of files) {
        const content = await read(file.path)
        expect(content, "Registry files must be portable React components").not.toMatch(
          /from\s+["'](?:next\/|@\/routes|@\/lib\/registry)/,
        )
        for (const imported of importsOf(content)) {
          if (imported.startsWith("@/registry/")) {
            const path = imported.slice(2)
            const owner = [
              path,
              `${path}.tsx`,
              `${path}.ts`,
              `${path}/index.tsx`,
              `${path}/index.ts`,
            ]
              .map((candidate) => itemsByPath.get(candidate))
              .find(Boolean)
            expect(owner, `${imported} is not an installable registry file`).toBeDefined()
            if (owner !== item) {
              expect(
                item.registryDependencies,
                `Undeclared registry dependency ${owner?.name}`,
              ).toContain(`${namespace}${owner?.name}`)
            }
            continue
          }
          expect(imported, "Internal source imports must use @/registry").not.toMatch(/^(?:\.|@\/)/)
          const name = imported
            .split("/")
            .slice(0, imported.startsWith("@") ? 2 : 1)
            .join("/")
          if (name === "react" || name === "react-dom") continue
          expect(
            dependencies.map((dependency) => dependency.name),
            `Undeclared dependency ${name}`,
          ).toContain(name)
        }
      }
    })

    it("installs the dependency versions tested in this repository", async () => {
      for (const { name, range } of dependencies) {
        // Consumers resolve these ranges themselves, so a range excluding the version installed
        // here would ship source that was only ever rendered against another release.
        const { version } = await readJson(`node_modules/${name}/package.json`)
        expect(
          semver.satisfies(version, range),
          `${name}@${range} excludes ${version}, the version stories run against`,
        ).toBe(true)
      }
    })

    const story = storyOf(item)
    it.runIf(story)("has a story in its Storybook section", async () => {
      expect(await read(story!.path)).toContain(`title: "${story!.section}`)
      if (story!.previewed) expect(item.meta?.storybookId, "Missing preview ID").toBeTruthy()
    })
  })
})

describe("design tokens", () => {
  it.each(["color", "radius", "typography", "spacing", "shadow"])(
    "documents %s in the Design section",
    async (name) => {
      expect(await read(`registry/familis/tokens/${name}.stories.tsx`)).toContain('title: "Design/')
    },
  )
})

// The catalog and Storybook render src/styles.css, so the installable style must match it.
describe("Familis style", async () => {
  const stylesheet = await read("src/styles.css")
  const styles = items.filter((item) => item.type === "registry:base")
  const fontItems = items.filter((item) => item.type === "registry:font")
  const fonts = fontItems.map((item) => item.font)
  const [style] = styles

  it("is the only style and matches components.json", () => {
    expect(styles).toHaveLength(1)
    expect(style.config?.style).toBe(components.style)
    expect(style.config?.iconLibrary).toBe(components.iconLibrary)
  })

  it("installs every font and brand component", () => {
    for (const item of [...fontItems, ...brandItems]) {
      expect(style.registryDependencies).toContain(`${namespace}${item.name}`)
    }
  })

  it("declares the colors and fonts of src/styles.css", () => {
    expect(style.cssVars?.light).toEqual(readCustomProperties(stylesheet, ":root"))
    expect(style.cssVars?.dark).toEqual(readCustomProperties(stylesheet, ".dark"))
    expect({
      ...style.cssVars?.theme,
      ...Object.fromEntries(fonts.map((font) => [font.variable.slice(2), font.family])),
    }).toEqual(readCustomProperties(stylesheet, "@theme static"))
  })

  it("applies each font with the rule src/styles.css uses", () => {
    // shadcn applies every selector-less font to html in one @apply, where the last utility
    // alphabetically wins, so a second one would replace Inter across the whole document.
    expect(fonts.filter((font) => !font.selector).length).toBeLessThanOrEqual(1)
    const flatStylesheet = normalizeCss(stylesheet)
    for (const font of fonts) {
      expect(flatStylesheet).toContain(
        `${font.selector ?? "html"} { @apply ${font.variable.slice(2)}; }`,
      )
    }
  })

  it("loads exactly the font files src/styles.css imports", () => {
    const sources = [style, ...fontItems]
    for (const item of sources) {
      const declared = (item.dependencies ?? []).map((entry) => parseDependency(entry).name)
      for (const imported of cssImports(item)) {
        // Next.js projects load registry:font items with next/font, so the CLI installs
        // font.dependency only for other frameworks. Extra imports need their own dependency.
        expect(declared, `Undeclared dependency in ${item.name}`).toContain(
          imported.split("/").slice(0, 2).join("/"),
        )
      }
    }
    expect(
      [...stylesheet.matchAll(/^@import "(@fontsource[^"]+)";$/gm)].map((match) => match[1]).sort(),
    ).toEqual([...fonts.map((font) => font.dependency), ...sources.flatMap(cssImports)].sort())
  })
})

// Run `pnpm registry:build` first: these compare the generated payloads with their source.
describe("public/r", () => {
  it("holds the catalog and one payload per item, without removed items", async () => {
    const payloads = (await readdir(new URL("public/r/", root))).filter((name) =>
      name.endsWith(".json"),
    )
    expect(payloads.sort()).toEqual(
      ["registry.json", ...items.map((item) => `${item.name}.json`)].sort(),
    )
    const catalog = registrySchema.parse(await readJson("public/r/registry.json"))
    expect(catalog.name).toBe(registry.name)
    expect(catalog.homepage).toBe(registry.homepage)
    expect(catalog.items.map((item) => item.name)).toEqual(items.map((item) => item.name))
  })

  it.each(items)("publishes $name as built from its source", async (item) => {
    const built = registryItemSchema.parse(await readJson(`public/r/${item.name}.json`))
    const { files = [], ...definition } = item
    const { files: builtFiles = [], ...builtDefinition } = built
    expect(builtDefinition).toEqual({ $schema: expect.any(String), ...definition })
    expect(builtFiles).toHaveLength(files.length)
    for (const file of files) {
      const payload = builtFiles.find((entry) => entry.path === file.path)
      expect(payload, `Missing built file ${file.path}`).toMatchObject(file)
      expect(payload?.content, `Stale registry content: ${file.path}`).toBe(await read(file.path))
    }
  })
})
