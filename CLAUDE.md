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
- `src/components/layout/` — site header, nav, footer.
- `src/components/sections/` — homepage sections (hero, about, experience, tech-stack, contact).
- `src/components/hero/` — hero sub-components: `terminal.tsx` (auto-typing JSON), `photo-card.tsx`, `cursor-spotlight.tsx`, `count-stat.tsx`.
- `src/components/ui/` — reusable primitives: `eyebrow.tsx` (`$ cd ./xx-name` mono labels), `reveal.tsx` (IntersectionObserver fade-up).
- `src/components/providers/` — global providers: `smooth-scroll.tsx` (Lenis + GSAP bridge).
- `src/lib/markdown.ts` — Markdown processing pipeline (gray-matter frontmatter + remark to HTML).
- `src/actions/` — Server actions (contact form with Zod validation + Resend email delivery).
- `content/articles/` — Markdown files that power the blog. Filename = URL slug.
- `design-references/` — Stitch design briefs, exports, and reference screenshots. DESIGN.md files define the visual language.

### Server vs Client components

Server Components are the default. Files marked `'use client'`:
- `layout/nav.tsx` — mobile menu + active-section tracking + `useLenis().scrollTo` for anchor links
- `layout/header.tsx` — mobile menu interactivity
- `providers/smooth-scroll.tsx` — Lenis + GSAP bridge (mounts client-only)
- `theme-provider.tsx`, `theme-toggle.tsx` — next-themes wrappers
- `contact-form.tsx` — form state/handlers
- `sections/hero.tsx` — mouse parallax + GSAP word reveal
- `sections/tech-stack.tsx` — needed for animated card hover
- `ui/reveal.tsx` — IntersectionObserver
- `hero/terminal.tsx`, `hero/cursor-spotlight.tsx`, `hero/count-stat.tsx` — all interactive

### Content system

Articles are markdown files in `content/articles/` with YAML frontmatter (`title`, `date`, `excerpt`, `tags`). The `src/lib/markdown.ts` module reads them from disk, parses with gray-matter, and converts to HTML with remark + remark-gfm. Article pages use `generateStaticParams()` for static generation.

## Motion system

The page is alive on scroll. Three layers, in order of foundation → choreography:

### Layer 1 — Smooth scroll (Lenis)
Lenis intercepts native scroll and eases it via lerp interpolation. Wrapped around the app in `src/components/providers/smooth-scroll.tsx`:

```tsx
<ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: false }} />
```

- `lerp: 0.1` = industry standard (matches lusion.co, basement.studio, every awwwards SOTD)
- `syncTouch: false` = mobile uses native scroll. Don't change — iOS rubber-band overscroll fights Lenis.
- Anchor links (`#about`, `#experience`) route through `lenis.scrollTo()` in `nav.tsx` so they inherit the same easing.

### Layer 2 — Lenis ↔ GSAP ScrollTrigger bridge
Without bridging, GSAP's ScrollTrigger reads native `window.scrollY` which lags Lenis's interpolated position. The bridge in `smooth-scroll.tsx`:

```tsx
// One RAF loop for both libs
gsap.ticker.add((time) => lenisRef.current?.lenis?.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// ScrollTrigger updates on every Lenis scroll
lenis.on('scroll', ScrollTrigger.update)
```

The provider sets `autoRaf: false` on Lenis since GSAP's ticker now drives it.

### Layer 3 — GSAP animations
Always use `useGSAP` from `@gsap/react` (scoped + HMR-safe + auto-cleanup). Register plugins once at module scope in `smooth-scroll.tsx`.

**Current animations:**
- Hero headline → word-by-word `gsap.fromTo` on mount (each word has `data-word`)
- Section eyebrows + sub-blocks → IntersectionObserver `<Reveal>` (lighter than ScrollTrigger for one-shot fades)

### Accessibility: `prefers-reduced-motion`
Respected at every layer:
- Lenis bypassed (`<SmoothScroll>` returns children directly with native scroll)
- GSAP animations gated with `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check
- `<Reveal>` shows immediately, no fade
- Mouse parallax disabled

## Styling

Tailwind CSS with class-based dark mode (`next-themes`). Design system: warm-red-on-black, terminal-meets-editorial.

- **Background:** pure black (`#000000`)
- **Primary accent:** warm red (`#DC2626`) — CTAs, focal glows, current-role dot
- **Secondary accent:** cyan (`#22D3EE`) — minimal, only on hover halos
- **Surface:** `#1F1F24` (cards), `#0e0e13` (deepest)
- **Ghost borders:** `#5C403C` at 15% opacity
- **Fonts:**
  - **Manrope** (`font-headline`) — bold display headlines, tracking-tight
  - **Inter** (`font-body`, `font-sans`) — paragraph text
  - **JetBrains Mono** (`font-mono`) — section eyebrows, terminal motifs, frame labels
  - **Fraunces italic** (`font-serif`) — single-word editorial accents (`quiet` in About, `worth shipping` in Contact, `3am` in Hero)
- **Terminal motifs:** mono section eyebrows render `$ cd ./{num}-{name}` via `<Eyebrow num="01" label="about" />`
- **Component classes** in `globals.css` `@layer components`: `.btn`, `.card`, `.glass-card`, `.editorial-glow`, `.crimson-glow`

### CRITICAL Tailwind gotcha — borderRadius override
`tailwind.config.ts` overrides borderRadius:
- `rounded` (DEFAULT) = **16px**
- `rounded-lg` = **32px** (NOT 8px)
- `rounded-xl` = **48px** (NOT 12px)
- `rounded-full` = `9999px`

For standard small radii, use arbitrary values: `rounded-[10px]`, `rounded-[12px]`. The class `rounded-xl` will produce stadium pills, not cards.

### Anchor styles via `:where()` for low specificity
Default link styles in `globals.css` are wrapped in `:where(a)` so component classes (e.g. `text-white`) always win — including on `:hover`. Without `:where()`, `a:hover { color: red }` beats `.text-white` on specificity and buttons go red-on-red on hover.

```css
:where(a) { @apply text-[#dc2626] underline-offset-4; }
:where(a):hover { @apply text-[#dc2626]/80; }
```

Article inline links still get red via `.prose a` (higher specificity than `:where(a)`).

## Coding gotchas — file in your mental cache

These bit us in development. Adding a new motion feature? Check this list first.

1. **`gsap.from()` + React StrictMode = invisible elements.** With StrictMode's double-mount, GSAP's cleanup reverts elements to the FROM state. The second mount's `from()` then reads the current invisible state as the "natural" target and animates `opacity:0 → opacity:0`. **Always use `gsap.fromTo()`** with explicit FROM and TO states. The `from()` shortcut is only safe for one-shot user-triggered animations (clicks), never for mount-time animations.

2. **`:where(a)` for global anchor defaults.** See Styling section above. Same pattern for any base-layer rule that components need to override.

3. **`rounded-xl` ≠ 12px in this project.** It's 48px. See Styling section. Use `rounded-[Npx]` arbitrary values.

4. **`<ReactLenis>` needs `autoRaf: false` when bridged to GSAP.** Otherwise both libs run their own RAF loops and compete. Setting `autoRaf: false` lets GSAP's `gsap.ticker.add` drive Lenis's `raf()`.

5. **Avoid `gsap.matchMedia()` for reduced-motion gating in `useGSAP`.** Their combined cleanup (mm.revert + gsap.context.revert) double-reverts and freezes elements. Use a plain `window.matchMedia(...).matches` check and early-return.

6. **Don't `scrollIntoView({ behavior: 'smooth' })` when Lenis is active.** The browser's native smooth scroll fights Lenis's lerp. Route through `lenis.scrollTo()` instead (see `nav.tsx`).

## Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Backlog

### Done
- [x] OG image: resize to 1200×630
- [x] Contact form with Resend email delivery
- [x] Repository cleanup (dead code, mock data, console.logs)
- [x] Terminal-aesthetic homepage redesign (Stitch handoff → implementation)
- [x] Section eyebrows + IntersectionObserver scroll-reveals across all sections
- [x] Italic-serif keyword treatment (Fraunces) on About + Contact + Hero
- [x] Brand colors on tech-stack icons (React cyan, Postgres royal blue, etc.)
- [x] Lenis smooth scroll + GSAP foundation with Lenis↔ScrollTrigger bridge
- [x] Hero headline word-by-word reveal via GSAP `fromTo`
- [x] 16 visual bugs fixed via Playwright QA (col-span, radii, mobile stacking, etc.)
- [x] `:where(a)` global anchor fix (CTA red-on-red bug)

### Up next
- [ ] **Phase A — Pin About section + line-by-line bio reveal** (GSAP ScrollTrigger pin/scrub + SplitText)
- [ ] **Phase B — 3D interlude section** (Apple-style canvas image sequence: Blender render → WebP frames → GSAP-driven `<canvas>.drawImage`)
- [ ] **Phase C (optional)** — R3F particle field behind hero (drei primitives + bloom postprocessing)

### Content / structure
- [ ] **Portfolio case studies** — Replace fake projects with real case studies from Amazon/AB InBev (Global Design System, DevRewbery, Process Automation, CIBIL Compliance). Problem → Role → Tech Decisions → Outcome format.
- [ ] **Technical articles** — Replace generic articles with deep-dive posts about real problems solved. SEO long-tail play.
- [ ] **Remove dead pages** — Portfolio page has fake projects, Meet page has broken Calendly. Either rebuild or remove from header nav.

### Quality / security
- [ ] Add HTML sanitization for markdown content (dangerouslySetInnerHTML)
- [ ] Add security headers to next.config.ts (CSP, X-Frame-Options, etc.)
- [ ] Remove `ignoreBuildErrors` from next.config.ts and fix pre-existing `params: Promise` issue in `articles/[slug]/page.tsx` (Next.js 15 migration)

## Environment variables

- `RESEND_API_KEY` — Required for contact form email delivery. Set in `.env` locally and in Vercel dashboard for production.

## Build config notes

- `next.config.ts` has `ignoreBuildErrors: true` for both TypeScript and ESLint — errors won't fail the build but should still be fixed. There's one pre-existing TypeScript error in `articles/[slug]/page.tsx` (Next.js 15 `params` is now a `Promise`).
- Remote images allowed from `picsum.photos`.

## Installed Claude Code skill packs (relevant to motion work)

- **`gsap-skills`** (official GreenSock) — installed via `claude plugin marketplace add greensock/gsap-skills`. Provides 8 skills covering core, timelines, ScrollTrigger, plugins (SplitText/Flip/Draggable), utils, React (`useGSAP`), performance, frameworks. Use these as the source of truth for GSAP patterns — they're maintained by the GSAP team itself.

## Stack summary

- **Framework:** Next.js 15.5.x (App Router) + React 18 + TypeScript strict
- **Styling:** Tailwind 3.4 + Fraunces/Manrope/Inter/JetBrains Mono via `next/font`
- **Motion:** Lenis 1.3.x (smooth scroll) + GSAP 3.15.x + ScrollTrigger + @gsap/react
- **Forms:** Zod validation + Resend (email)
- **Content:** gray-matter + remark + remark-gfm (markdown articles)
- **Icons:** lucide-react (UI) + react-icons (brand SVGs in tech stack)
- **Deploy:** Vercel (auto-deploy from `master`)
