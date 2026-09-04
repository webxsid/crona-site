# Repository Guidelines

## Project Structure

This is the public Crona website, built with Astro, TypeScript, and Sass. Page routes live in `src/pages/`; route-specific styles and browser scripts are colocated in folders such as `src/pages/_home/` and `src/pages/_releases/`. Reusable Astro components are in `src/components/`, and the shared shell is `src/layouts/BaseLayout.astro`.

Documentation is hosted at `https://docs.crona.work/`; the releases page reads published release data from GitHub. Global design tokens and shared styling live in `src/styles/global/`. Static files, fonts, logos, and public screenshots belong in `public/`; imported optimized screenshots belong in `src/assets/screenshots/`.

## Build, Check, and Development

Use the pinned pnpm version from `package.json`.

- `pnpm dev` starts the Astro development server.
- `pnpm check` runs Astro and TypeScript diagnostics.
- `pnpm build` runs `check` and produces the static site in `dist/`.
- `pnpm preview` serves the built output for final local verification.

Run `pnpm build` after any route, content, component, or stylesheet change. There is no separate unit-test suite currently; a clean build is required.

## Coding Style

Use two-space indentation in `.astro`, `.ts`, `.js`, and `.scss` files. Keep components focused and colocate their `.astro`, `.scss`, and optional `.js` files. Use kebab-case for route folders and content slugs, for example `focus-sessions.md` and `legacy-to-scoop.md`. Follow existing BEM-style class names such as `.docs-sidebar__search-shell`.

Prefer existing CSS custom properties from `_tokens.scss` over literal colors or spacing values. Preserve the dark terminal aesthetic and validate responsive behavior when changing shared layout or navigation styles.

## Content and Documentation

Keep documentation factual and aligned with the Crona application. Markdown frontmatter and collection schemas are defined in `src/content.config.ts`; match existing entries. Update related navigation, sitemap, and screenshots when adding a user-facing route.

## Commits and Pull Requests

Use concise conventional-style subjects: `docs(install): ...`, `fix(ui): ...`, `feat(site): ...`, or `design: ...`. Keep commits scoped and separately commit visual refinements when practical. Pull requests should state the user-visible change, link relevant issues, include screenshots for visual work, and report `pnpm build` results.
