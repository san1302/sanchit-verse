# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check (tsc --noEmit)
```

No test framework is configured yet.

## Architecture

**Next.js 15 App Router** portfolio/blog site with TypeScript strict mode.

### Key directories

- `src/app/` — App Router pages. Dynamic route at `articles/[slug]/` for markdown articles.
- `src/components/` — React components. `layout/` has header and footer.
- `src/lib/markdown.ts` — Markdown processing pipeline (gray-matter frontmatter + remark to HTML).
- `src/actions/` — Server actions (contact form with Zod validation).
- `content/articles/` — Markdown files that power the blog. Filename = URL slug.

### Server vs Client components

Server Components are the default. Only these files use `'use client'`:
- `header.tsx` (mobile menu interactivity)
- `contact-form.tsx` (form state/handlers)
- `theme-toggle.tsx` (theme switching)
- `theme-provider.tsx` (next-themes wrapper)

### Content system

Articles are markdown files in `content/articles/` with YAML frontmatter (`title`, `date`, `excerpt`, `tags`). The `src/lib/markdown.ts` module reads them from disk, parses with gray-matter, and converts to HTML with remark + remark-gfm. Article pages use `generateStaticParams()` for static generation.

### Styling

Tailwind CSS with class-based dark mode (`next-themes`). Primary color: `#00acb5`. Reusable component classes (`.btn`, `.card`, `.badge`) defined in `globals.css` `@layer components`. Typography plugin used for article prose styling. Theme colors use CSS variables in HSL format.

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Build config notes

- `next.config.ts` has `ignoreBuildErrors: true` for both TypeScript and ESLint — errors won't fail the build but should still be fixed.
- Remote images allowed from `picsum.photos`.
