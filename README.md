# Familis Registry

Shared React components and building blocks for Familis projects, distributed as source through the shadcn registry protocol.

The catalog runs on **TanStack Start** and **Nitro**. Components use **shadcn/ui with Base UI** and **Tailwind CSS v4**, with **Storybook** for documentation, interaction tests, and accessibility checks. **Oxfmt** and **Oxlint** handle formatting and linting, with the new **@shadcn/lint** plugin registered.

## Development

Use Node.js 22.12+ (Node.js 24 recommended) and the pnpm version declared in `package.json`.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. The development command builds registry payloads before starting Vite. Run `pnpm registry:build` again after changing registry source while the server is running.

```sh
pnpm storybook
```

Storybook runs at http://localhost:6006 with light and dark theme controls. Its navigation has two sections:

- **Design**: Color, Radius, Typography, Spacing, and Shadow, using the actual CSS tokens.
- **UI**: every available Base UI component, with Familis compositions under **UI / Blocks**.

The reusable blocks include:

- **Empty state**: an explanation, optional icon and action for empty screens.
- **Metric card**: a formatted dashboard value, comparison trend and optional footer.
- **Settings panel**: controlled boolean preferences with labels, descriptions and disabled states.
- **Search toolbar**: controlled search, clear and focus restoration, loading indicator, result announcement and action slots.
- **Confirmation dialog**: asynchronous confirmation with pending state, duplicate submission protection and retry after failure. Supports controlled or internal open state.

Typography uses **Manrope** for headings, **Inter** for body and UI content, **JetBrains Mono** for code and commands, and **Source Serif 4** for optional editorial content. Variable fonts are bundled locally through Fontsource, including Inter and Source Serif 4 italics. The shared Tailwind tokens are `font-heading`, `font-sans`, `font-mono`, and `font-serif`; semantic HTML headings use Manrope automatically.

The homepage includes interactive block previews, font and palette samples, and a searchable UI catalog. Its theme follows the system preference until a choice is saved locally. The blue and white logos in `public/assets/` follow the light and dark themes.

All authored registry content lives under `registry/familis/`, grouped by concern:

```text
registry/familis/
  blocks/           # Familis compositions and their colocated stories
  ui/               # Upstream primitives and their stories
    hooks/          # Shared UI hooks
  tokens/           # Shared CSS tokens and their stories
```

Sources and stories are colocated; only the source files declared in `registry.json` are installed into consumers. Internal imports use `@/registry/familis/`, following the [shadcn registry guidelines](https://ui.shadcn.com/docs/registry/getting-started#guidelines). The UI and hook aliases in `components.json` point to the authored registry folders, so the CLI discovers the existing primitives and installs upstream additions alongside them. TypeScript and Vite resolve the same `@/registry` path. The CLI rewrites these imports to each consumer's configured aliases during installation. Story examples are ordinary React components defined at module scope in `.stories.tsx`; hooks stay inside those components. This follows [Storybook CSF rendering](https://storybook.js.org/docs/writing-stories) and the [React rules of Hooks](https://react.dev/reference/rules/rules-of-hooks).

Each component has a rendered example. Familis source includes accessibility fixes for fallback/keycap text contrast, destructive variants, combobox button names, and decorative command separators. The mobile hook uses an SSR-safe media-query subscription, and Carousel removes both event subscriptions on unmount. Button includes appearance, size, icon, pending, and disabled states. Interaction tests cover buttons, accordion expansion, checkboxes, dialog dismissal and focus restoration, selection, carousel navigation, sidebar collapse, forms, questionnaires, notifications, messages, and Familis blocks. Every story runs accessibility checks.

The current upstream index lists 63 UI entries: 62 provide component source and are published by this registry. The legacy `form` entry has no Base UI source; **UI / Form** demonstrates a native React form composed with `Field`, rather than exposing an unavailable API. Both Base UI `Toast` and the optional framework-independent `Sonner` integration have stories.

Storybook uses a separate Vite configuration so Start and Nitro do not run inside the component workshop.

## Dependency updates

Use [taze](https://github.com/antfu-collective/taze) to select dependency updates interactively, write the selected versions, and run pnpm install to update the lockfile:

```sh
pnpm deps:update
```

By default, updates stay within the declared version ranges and pinned dependencies are skipped. To also consider major releases, run `pnpm deps:update major`; add `--include-locked` to include pinned dependencies. Taze also checks GitHub Actions. Run the validation commands after applying updates.

[Dependabot](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference) checks npm dependencies (including pnpm manifests and lockfiles) and GitHub Actions every Monday at 09:00 Europe/Brussels. Minor and patch npm updates are grouped into one pull request; major updates have separate pull requests. GitHub Actions updates are grouped together. Pull request titles and commits follow Conventional Commits. The configuration lives in `.github/dependabot.yml` and takes effect once it is pushed to the default branch.

## Using the registry

### Directly from GitHub

Initialize a consuming React project with shadcn, choosing **Base UI**. For a new TanStack Start project:

```sh
pnpm dlx shadcn@latest init --template start --preset nova --base base
```

Install a Familis component from this public repository:

```sh
pnpm dlx shadcn@latest add Familis-co/registry/metric-card
pnpm dlx shadcn@latest add Familis-co/registry/settings-panel
pnpm dlx shadcn@latest add Familis-co/registry/search-toolbar
pnpm dlx shadcn@latest add Familis-co/registry/confirmation-dialog
pnpm dlx shadcn@latest add Familis-co/registry/empty-state
pnpm dlx shadcn@latest add Familis-co/registry/button
pnpm dlx shadcn@latest add Familis-co/registry/dialog
```

GitHub registry addresses read the root `registry.json` and its source files, so this method works without a deployed catalog. Pin an address to a release tag or commit for reproducible installations: `Familis-co/registry/metric-card#<ref>`.

Internal registry dependencies point back to Familis GitHub addresses so installation uses the same primitives previewed here. The CLI installs the declared npm and registry dependencies and rewrites imports to the consumer's aliases. Registry components use ordinary React props, links, and callbacks, so they can be used in other React frameworks too. The initial primitives target Base UI; check compatibility before installing into a Radix or React Aria design system.

### From a hosted registry

The app serves the catalog at `/r/registry.json` and items at `/r/{name}.json`. To try it locally in a consuming project:

```sh
pnpm dlx shadcn@latest registry add '@familis=http://localhost:3000/r/{name}.json'
pnpm dlx shadcn@latest add @familis/metric-card
```

Replace the local origin with the registry's deployed public origin for shared use. `@familis` is a project-configured namespace; it is not registered in the official shadcn index.

```sh
pnpm dlx shadcn@latest list http://localhost:3000/r/registry.json
pnpm dlx shadcn@latest view http://localhost:3000/r/metric-card.json
```

## Adding components

1. Add portable source under `registry/familis/blocks/<name>/` and import shared primitives through `@/registry/familis/ui/<name>`. Use `components/`, `hooks/`, and `lib/` subdirectories when an item contains multiple files. Keep application routing, server code, and environment access in `src/`.
2. Add a colocated `.stories.tsx` file showing relevant states and interactions. For upstream primitives, add the story to `registry/familis/ui/<name>.stories.tsx`, defining composed examples in the story module at module scope.
3. Add the item to the root `registry.json`. Declare every npm dependency and shadcn dependency. Bare dependency names refer to official shadcn items; use a GitHub address or configured namespace for other Familis items.
4. Add its Storybook ID to the item's metadata. The catalog lists UI entries automatically; add a live preview in `src/routes/index.tsx` for a new Familis block.
5. Run the registry build and validation commands below. Verify installation in a separate consuming project before publishing a release.

The registry build cleans and generates `public/r/`, so removed items no longer have an installable payload. This directory is ignored by Git and rebuilt for development and production. Stories are documentation, and are intentionally excluded from installable payloads. Use `components/`, `hooks/`, and `lib/` subdirectories when a block needs multiple source files.

## Validation

```sh
pnpm build
pnpm check
pnpm storybook:build
pnpm exec playwright install --no-shell chromium
pnpm test:stories
node scripts/smoke-server.mjs
```

`pnpm check` checks formatting, lint, TypeScript, and that built registry payloads match their source. The Storybook tests run in Chromium and include interaction and accessibility checks. The smoke check starts the production Nitro server, verifies SSR, `/api/health`, every JSON payload, and missing-item handling, then stops it. CI runs these checks on pull requests and pushes to `main`.

For source changes, use `pnpm format` and `pnpm lint:fix` before validation.

### Design-system lint policy

`@shadcn/lint` is registered through `jsPlugins` in `.oxlintrc.json`. Its design-system rules are **not enabled by default**, following the plugin's setup guide: the team can choose allowed styling policies in the `rules` object without inheriting unreviewed restrictions. Oxlint's correctness checks are enabled.

For example, to enforce semantic colors and reserve component `className` overrides for layout, add:

```json
{
  "rules": {
    "shadcn/no-raw-colors": "error",
    "shadcn/no-restyle": ["error", { "allow": ["layout"] }]
  },
  "overrides": [
    {
      "files": ["registry/familis/ui/**"],
      "rules": { "shadcn/no-restyle": "off" }
    }
  ]
}
```

See the [available rules](https://github.com/shadcn-ui/lint#rules) and [configuration guide](https://github.com/shadcn-ui/lint/blob/main/docs/design-systems.md). The Oxlint JavaScript plugin API is currently experimental.

## Deployment

Search indexing is disabled through the root robots meta tag and a site-wide `X-Robots-Tag: noindex, nofollow` response header, including registry JSON and hosted Storybook assets. `robots.txt` permits crawling so search engines can read these directives, following [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Nitro's Vite integration builds the app for different providers from the same Start source. It currently uses the Nitro 3 beta; its exact version is pinned in `package.json` and the lockfile.

For a Node server:

```sh
NITRO_PRESET=node-server pnpm build
pnpm start
```

The complete deployable output is `.output/`. Set `HOST` and `PORT` at runtime as needed. For other supported providers, select the appropriate `NITRO_PRESET` at build time (for example `vercel` or `netlify`) and deploy the output that preset emits. Provider output shapes differ; `pnpm start` is for the Node output. These provider presets are available through Nitro but only the Node server is verified in this repository's CI.

`pnpm build` also builds Storybook into `storybook-static/`, and Nitro ships it as public assets under `/storybook/` (for example https://registry.familis.care/storybook/). The app links there by default in production; set `VITE_STORYBOOK_URL` before building to point at a Storybook hosted elsewhere. Development links to http://localhost:6006.

Publishing this repository does not deploy the website or Storybook. GitHub installations are available as soon as the repository is public.

References: [TanStack Start hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [shadcn registries](https://ui.shadcn.com/docs/registry/getting-started), [Storybook React/Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite).

## Contributing

Use English for code, documentation, branch names, commits, and pull requests. Create branches such as `codex/add-metric-card` and use Conventional Commits, for example `feat(registry): add metric card`.

[Lefthook](https://lefthook.dev/) installs Git hooks automatically during `pnpm install`. The `pre-commit` hook runs `pnpm format:check`, `pnpm lint`, and `pnpm typecheck` in parallel across the project. These checks do not modify or stage files; use `pnpm format` and `pnpm lint:fix` to fix reported issues before committing.

The Lefthook installation script is explicitly allowed in `pnpm-workspace.yaml`. If dependencies were installed with `--ignore-scripts`, install the hooks manually:

```sh
pnpm exec lefthook install
```

Lefthook's npm installer skips hook installation when `CI=true`. The GitHub Actions workflow also sets `LEFTHOOK=0` to disable hook execution and keeps running all validation commands explicitly. Use these environment variables for other CI/CD providers too. Production deployments use `.output/` and do not need Lefthook or Git hooks.

## License

MIT. See [LICENSE](LICENSE). The shadcn/ui component source is also MIT licensed; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
