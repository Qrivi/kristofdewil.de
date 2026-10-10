# AGENTS.md

Guidance for agents working in this repository.

## Project Overview

- Personal website built with Astro 6 and TypeScript.
- Styling uses Tailwind CSS v4 through `@tailwindcss/vite` plus custom utilities in `src/styles/global.css`.
- Content is managed through Astro content collections in `src/content/`.
- The site includes a small amount of React support, but the current app structure is mostly Astro components and Markdown/MDX content.

## Important Paths

- `src/pages/`: route entrypoints
- `src/pages/_components/`: page-specific Astro components
- `src/components/`: shared Astro components
- `src/layouts/`: shared layouts
- `src/content/posts/`: blog posts
- `src/content/experiences/`: resume/work experience entries
- `src/content.config.ts`: collection schemas
- `src/styles/global.css`: global styles, theme tokens, utilities, and component classes
- `src/utils/`: small formatting helpers for dates and durations
- `public/`: static assets, including custom cursor images

## Package Manager

- This repository uses Bun.

## Local Commands

Use the repo scripts instead of ad hoc commands when possible.

- Install deps: `bun install`
- Start dev server: `bun run dev`
- Build: `bun run build`
- Preview production build: `bun run preview`
- Full checks: `bun run check`
- Auto-fix formatting/lint where possible: `bun run check:fix`
- Lint only: `bun run lint`
- Format only: `bun run fmt`

## Working Conventions

- Prefer TypeScript and Astro-first solutions over adding new framework complexity.
- Use the `~/` path alias for imports from `src/`.
- Keep content schema changes in sync with frontmatter changes in `src/content/`.
- Preserve the existing visual language in `src/styles/global.css` instead of introducing a parallel styling approach.
- Keep components small and colocated with their usage when they are page-specific.
- Favor server-rendered Astro patterns unless there is a clear reason to introduce client-side interactivity.

## Content Notes

- Posts and experience items are loaded from filesystem collections using `glob(...)`.
- `posts` frontmatter currently expects:
  - `title`
  - `description`
  - `publishDate`
  - optional `editDate`
  - `topics`
  - optional `draft`
- `experiences` frontmatter currently expects:
  - `organization`
  - `description`
  - `link`
  - `logo` (relative image path beside the Markdown entry, validated with Astro's `image()` helper)
  - `locationMap` (`image`, descriptive `alt`, and map `link`)
  - `titles`
  - `startDate`
  - optional `endDate`
  - `locations`
  - `technologies` (technical category keys mapped to lists of technology names, in display order; supported keys: `backend`, `frontend`, `frontend-mobile`, `data`, `devops`, `testing`, `other`)
  - `summary`

## Style Notes

- Fonts are configured in `astro.config.ts` and consumed through `astro/components/Font.astro`.
- The design relies on CSS custom properties for colors, fonts, and cursor assets.
- Dark mode styles are handled in CSS via the `.dark` class variant.
- Global utility classes such as `wrapper`, `mesh`, `mesh-center`, and `title-section` are part of the layout system; reuse them before inventing new layout primitives.

## Validation Expectations

- `bun run check` should pass after every change.
- Run `bun run build` when changing routing, content schemas, Astro config, or site-wide styling.
- If you change collection schemas, verify that existing content entries still parse successfully.

## Cautions

- The `dev` script clears `.astro` and Vite cache before starting; do not be surprised by that behavior.
- The working tree may contain user changes. Do not revert unrelated edits.
