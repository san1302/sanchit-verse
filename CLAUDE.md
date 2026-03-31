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
- `src/actions/` — Server actions (contact form with Zod validation + Resend email delivery).
- `content/articles/` — Markdown files that power the blog. Filename = URL slug.
- `design-references/` — Stitch design briefs, exports, and reference screenshots. DESIGN.md files define the visual language.

### Server vs Client components

Server Components are the default. Only these files use `'use client'`:
- `header.tsx` (mobile menu interactivity)
- `contact-form.tsx` (form state/handlers)
- `theme-toggle.tsx` (theme switching)
- `theme-provider.tsx` (next-themes wrapper)
- `nav.tsx` (client-side navigation with active link tracking)

### Content system

Articles are markdown files in `content/articles/` with YAML frontmatter (`title`, `date`, `excerpt`, `tags`). The `src/lib/markdown.ts` module reads them from disk, parses with gray-matter, and converts to HTML with remark + remark-gfm. Article pages use `generateStaticParams()` for static generation.

### Styling

Tailwind CSS with class-based dark mode (`next-themes`). Design system from Google Stitch ("The Nocturnal Curator" / "Neon Nocturne"). Primary color: `#dc2626` (red). Ghost borders: `#5C403C` at 15% opacity. Surface: `#1F1F24`. Fonts: Manrope (headlines), Inter (body). Reusable component classes (`.btn`, `.card`, `.badge`, `.glass-card`, `.editorial-glow`, `.crimson-glow`) defined in `globals.css` `@layer components`. Note: `borderRadius` is overridden in tailwind.config — `rounded-xl` = 3rem, use explicit `rounded-[12px]` for standard 12px radius.

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Backlog

- [x] ~~**OG image: resize to 1200×630**~~ — Done. Split layout: favicon character left, name + tagline code block right.
- [x] ~~**Contact form with Resend**~~ — Done. Working form on home page, emails via Resend to san@sanchit-verse.com. Stitch design system applied.
- [x] ~~**Repository cleanup**~~ — Done. Removed dead AI files, unused deps, mock data, duplicate favicons, console.logs, fixed docs.
- [ ] **Portfolio case studies** — Replace fake projects with real case studies from Amazon/AB InBev (Global Design System, DevRewbery, Process Automation, CIBIL Compliance). Problem → Role → Tech Decisions → Outcome format.
- [ ] **Technical articles** — Replace generic articles with deep-dive posts about real problems solved. SEO long-tail play.
- [ ] **Remove dead pages** — Portfolio page has fake projects, Meet page has broken Calendly. Either rebuild or remove from header nav.
- [ ] Add HTML sanitization for markdown content (dangerouslySetInnerHTML)
- [ ] Add security headers to next.config.ts (CSP, X-Frame-Options, etc.)
- [ ] Remove ignoreBuildErrors from next.config.ts and fix all type/lint errors

## Environment variables

- `RESEND_API_KEY` — Required for contact form email delivery. Set in `.env` locally and in Vercel dashboard for production.

## Build config notes

- `next.config.ts` has `ignoreBuildErrors: true` for both TypeScript and ESLint — errors won't fail the build but should still be fixed.
- Remote images allowed from `picsum.photos`.
