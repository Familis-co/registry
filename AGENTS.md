# Working on Familis Registry

Use English for code, documentation, branches, commits, and pull requests. Follow Conventional Commits.

For the registry authoring workflow and validation commands, read the "Adding components" and "Validation" sections in README.md. Registry files are installed into other projects: use `@/registry` for internal source imports, keep their dependencies self-contained, and verify installation in a separate consuming project when changing payloads.

Colors, fonts and the logo reach consuming projects through the `familis` style. When changing them, update `src/styles.css` and the `familis` and `font-*` items in `registry.json` together, following "Changing brand foundations" in README.md.

Use shadcn's CLI to install upstream primitives and fetch current component documentation before composing them. Match the Base UI APIs configured in components.json. Use semantic Tailwind tokens, component variants for appearance, and className for layout.

After changes, run `pnpm build` and `pnpm check`, and fix all errors. Changes to component behavior also require `pnpm test:stories`. Changes to server or build configuration require the production smoke check. Generate `public/r/` from source rather than editing payloads directly.
