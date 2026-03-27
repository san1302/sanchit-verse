# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign the sanchit-verse.com homepage from a light minimalist template into a dark, futuristic, premium portfolio using Stitch-generated designs as the source of truth.

**Architecture:** Rebuild the homepage (`src/app/page.tsx`) as a composition of new section components, each translating a Stitch HTML export into React/Next.js. Replace the global styling (Tailwind config, CSS variables, fonts) with the new dark design system. Keep existing sub-pages (articles, portfolio, resume, meet) functional but defer their redesign.

**Tech Stack:** Next.js 15 (App Router), React 18, Tailwind CSS 3.4, Manrope + Inter fonts (Google Fonts), react-icons (Simple Icons for tech logos), lucide-react (UI icons), CSS animations for marquee/glow effects. GSAP and Framer Motion deferred to a polish phase.

**Design References:** All in `design-references/stitch-exports/`. Primary DESIGN.md: `design-system-primary/DESIGN.md` ("The Digital Curator"). Issues & overrides: `design-references/FINDINGS.md`.

---

## File Structure

### New Files
- `src/components/sections/hero.tsx` — Hero section (Server Component)
- `src/components/sections/about.tsx` — About Me section (Server Component)
- `src/components/sections/experience.tsx` — Experience timeline (Server Component)
- `src/components/sections/tech-stack.tsx` — Tech stack grid (Server Component)
- `src/components/sections/contact.tsx` — Contact CTA section (Server Component)
- `src/components/layout/nav.tsx` — New floating pill glassmorphism nav (Client Component)
- `src/components/layout/site-footer.tsx` — New minimal dark footer (Server Component)
- `src/app/(main)/layout.tsx` — Route group layout for sub-pages (wraps old Header + Footer)

### Modified Files
- `tailwind.config.ts` — New color tokens, fonts, border radius, spacing
- `src/app/globals.css` — New CSS variables, dark-first theme, glassmorphism utilities, animations
- `src/app/layout.tsx` — Swap fonts (Geist → Manrope + Inter), remove Header/Footer/container wrapper, dark-only ThemeProvider
- `src/app/page.tsx` — Complete rewrite composing new section components
- `src/components/layout/header.tsx` — Keep for sub-pages (fix "Minimalist Muse" → "Sanchit Agarwal" in mobile menu)

### Moved Files (route group for sub-pages)
- `src/app/articles/` → `src/app/(main)/articles/`
- `src/app/portfolio/` → `src/app/(main)/portfolio/`
- `src/app/resume/` → `src/app/(main)/resume/`
- `src/app/meet/` → `src/app/(main)/meet/`
- `src/app/not-found.tsx` → `src/app/(main)/not-found.tsx`

Note: Route groups `(main)` don't affect URLs. `/articles` still works as `/articles`.

### Untouched
- `src/lib/markdown.ts` — Keep as-is
- `src/content/` — Keep as-is

---

## Task 1: Design System Foundation — Tailwind Config & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update Tailwind config with new design tokens**

Replace the existing color system, fonts, and border radius with the Digital Curator design system tokens. Reference: `design-references/stitch-exports/design-system-primary/DESIGN.md`

Key changes:
- Colors: surface hierarchy (#000000, #0e0e0e, #131318, #1b1b20, #1f1f24, #2a292f, #35343a), primary-container (#DC2626), secondary (#22D3EE), tertiary (#c6c6c7), on-surface (#e2e2e2), outline-variant (#5c403c)
- Fonts: headline → Manrope, body → Inter
- Border radius: DEFAULT 1rem, lg 2rem, xl 3rem, full 9999px
- Keep existing container config

- [ ] **Step 2: Rewrite globals.css with dark-first design system**

Replace existing CSS variables and component classes:
- Remove light mode `:root` variables — this is dark-only
- Set `:root` to pure black background, off-white text
- Add glassmorphism utility: `.glass-card` (rgba bg + backdrop-blur + ghost border)
- Add `.editorial-glow` (radial-gradient red at 15% opacity)
- Add `.ghost-border` (outline-variant at 10% opacity)
- Add marquee animation keyframes
- Add bounce-slow and fade-in animation keyframes
- Keep existing button/card classes but restyle for dark theme
- Remove all light-mode specific styling

- [ ] **Step 3: Verify Tailwind builds without errors**

Run: `cd /Users/sanchitagarwal/code/studio && npm run build`
Expected: Build succeeds (existing pages may look different but should not break)

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: replace design system with dark futuristic theme tokens"
```

---

## Task 2: Font, Layout & Route Group Setup

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/(main)/layout.tsx`
- Move: articles, portfolio, resume, meet, not-found into `src/app/(main)/`

- [ ] **Step 0: Install react-icons for tech stack logos**

Run: `cd /Users/sanchitagarwal/code/studio && npm install react-icons`

lucide-react doesn't have tech brand logos (React, AWS, Docker, etc.). react-icons provides Simple Icons (`si` prefix) which covers all of them.

- [ ] **Step 1: Replace Geist font with Manrope + Inter**

Import Manrope (weights 400, 700, 800) and Inter (weights 400, 500) from `next/font/google`. Apply Manrope as `--font-headline` and Inter as `--font-body` CSS variables on the HTML element.

- [ ] **Step 2: Strip layout.tsx to a clean shell**

Remove the existing `<Header />`, `<Footer />`, and the `<main className="flex-grow container py-10">` wrapper from layout.tsx. The layout should contain ONLY: html tag with font variables + dark class, ThemeProvider with `defaultTheme="dark"` and `enableSystem={false}`, and `{children}` with no wrapper. This ensures full-bleed sections on the homepage aren't constrained by the old container.

- [ ] **Step 3: Create route group for sub-pages**

Create `src/app/(main)/layout.tsx` that wraps children with the old Header, the `container py-10` main wrapper, and the old Footer. Then move these directories into `(main)`:
- `src/app/articles/` → `src/app/(main)/articles/`
- `src/app/portfolio/` → `src/app/(main)/portfolio/`
- `src/app/resume/` → `src/app/(main)/resume/`
- `src/app/meet/` → `src/app/(main)/meet/`
- `src/app/not-found.tsx` → `src/app/(main)/not-found.tsx`

This keeps sub-pages working with the old header/footer while giving the homepage a clean canvas. URLs are not affected by route groups.

- [ ] **Step 4: Fix mobile menu brand name**

In `src/components/layout/header.tsx`, change "Minimalist Muse" to "Sanchit Agarwal".

- [ ] **Step 5: Verify both homepage and sub-pages load**

Run: `cd /Users/sanchitagarwal/code/studio && npm run dev`
- Homepage (`/`): should show bare dark page with no header/footer/container
- Sub-pages (`/articles`, `/portfolio`, `/resume`): should still show old header, content, footer

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: route group setup, Manrope + Inter fonts, dark-only layout"
```

---

## Task 3: Floating Pill Navigation

**Files:**
- Create: `src/components/layout/nav.tsx`

- [ ] **Step 1: Create the glassmorphism floating pill nav**

Client component with:
- Fixed position, centered, z-50
- Pill shape (rounded-full)
- Glassmorphic background (bg-zinc-900/60, backdrop-blur-xl, border border-white/10)
- "SA" logo on the left in bold Manrope (sans-serif, NOT serif)
- Nav links: About, Works, Skills, Contact — uppercase, letter-spaced, 10px Inter
- Active link has red dot indicator (pseudo-element, `after:content-[''] after:bg-red-600 after:rounded-full after:w-1 after:h-1`)
- Links scroll to section IDs on click (use `href="#about"` etc.)
- Mobile: hamburger icon (defer full mobile menu to polish)

Reference: `design-references/stitch-exports/hero/code.html` lines 89-97

- [ ] **Step 2: Verify nav renders correctly on the page**

Temporarily import into page.tsx and verify:
- Pill floats at top center
- Glass effect is visible
- Links are styled correctly
- "SA" logo is bold sans-serif (Manrope)

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/nav.tsx
git commit -m "feat: add floating glassmorphism pill navigation"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Build the hero section component**

Server component with:
- Full viewport height, centered content, pure black background
- Intro line: "Hi! I'm Sanchit Agarwal" with separator and "Based in India" pill (flag emoji)
- Massive heading: "Software Engineer" + "& Problem Solver" (40% opacity) in Manrope extrabold 5xl/8xl
- Description paragraph in muted gray Inter
- Two CTA buttons: "View Projects" (red fill, rounded-full) + "Download Resume" (ghost outline, rounded-full)
- Photo area: laptop mockup frame with grayscale placeholder image, red glow behind
- Floating elements: "Available for work" badge (green dot, bounce animation), "Sanchit A." signature watermark, tech icons card
- Radial red glow behind center (editorial-glow class)

Reference: `design-references/stitch-exports/hero/code.html`

- [ ] **Step 2: Add the stats teaser below the hero**

Two-column layout below the main hero:
- Left: "The Digital Curator." heading in Manrope bold
- Right: description paragraph + stats row ("05+" years, "40+" projects) in red Manrope with labels

Reference: hero/code.html lines 172-193

- [ ] **Step 3: Verify hero renders at full viewport height**

Run dev server and verify:
- Hero fills viewport
- Text hierarchy is correct (massive heading > subtitle > description)
- Buttons are styled (red fill + ghost)
- Red glow is subtle, not overpowering

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add hero section with editorial typography and floating elements"
```

---

## Task 5: About Section

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 1: Build the about section component**

Server component with:
- Two-column grid (lg:grid-cols-12, 7+5 split)
- Left column:
  - "I'M SANCHIT AGARWAL" label in uppercase letter-spaced
  - Large heading: "Hey, ⚡ software engineer" in Manrope extrabold
  - Two bio paragraphs in Inter, muted gray (#c6c6c7)
  - Mention "Amazon" and "AB InBev" as highlighted text (bold white, NOT cyan links — per FINDINGS.md ISSUE-001 fix)
  - ONE button only: "Get In Touch" (red fill, rounded-full) — NOT cyan. No "View Resume" here (hero already has "Download Resume")
- Right column:
  - Device-frame portrait placeholder (rounded-[3rem], dark bg, red glow behind)
  - Image with grayscale → color on hover
  - Floating status badge: "Available for opportunities" with green pulse dot
  - Floating role pills: "Full-Stack Developer", "Cloud Architect", "Software Engineer"

Reference: `design-references/stitch-exports/about/code.html`
Fixes: FINDINGS.md ISSUE-001 (cyan → red for buttons), ISSUE-005 (single resume CTA)

- [ ] **Step 2: Verify about section layout**

Check:
- Two-column layout works on desktop
- Stacks on mobile
- Portrait has red glow behind it
- Floating badges are positioned correctly
- No cyan on buttons (red fill only)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/about.tsx
git commit -m "feat: add about section with portrait frame and floating badges"
```

---

## Task 6: Experience Section

**Files:**
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 1: Build the experience section component**

Server component with:
- Centered heading: "My Experience" in Manrope bold 4xl-5xl
- Subtitle in muted gray
- Three glassmorphism cards stacked vertically with generous spacing (gap-8)
- Each card: full-width, rounded-xl, p-12, glass-card class, ghost border gradient effect
- Card content: role title (left, bold Manrope 2xl), company name (muted gray), dates (right-aligned)
- Card 1: "Senior Software Engineer" / AB InBev / April 2023 - Present (red dot indicator for current)
- Card 2: "Software Engineer" / Amazon / Aug 2021 - Dec 2022
- Card 3: "Software Engineering Intern" / Amazon / Jan 2021 - July 2021
- Below cards: "View full resume →" link in muted gray
- Background: warm red radial glow (crimson-glow class) behind middle area

Reference: `design-references/stitch-exports/experience/code.html`
Fix: FINDINGS.md ISSUE-004 (title = "Senior Software Engineer")

- [ ] **Step 2: Add ghost border gradient CSS**

The experience cards use a pseudo-element gradient border effect. Add the `.glass-card-gradient::before` CSS to globals.css:
- Gradient from rgba(255,180,171,0.2) to transparent
- mask-composite for border-only effect

- [ ] **Step 3: Verify experience section**

Check:
- Cards are full-width, vertically stacked
- Glass effect is visible
- First card has red dot for "current"
- Background glow is warm and subtle

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/experience.tsx src/app/globals.css
git commit -m "feat: add experience section with glassmorphism timeline cards"
```

---

## Task 7: Tech Stack Section

**Files:**
- Create: `src/components/sections/tech-stack.tsx`

- [ ] **Step 1: Build the tech stack grid component**

Server component with:
- Heading: "Tech Stack" in Manrope bold, left-aligned
- Subtitle in muted gray
- Responsive grid: 2 cols (mobile) → 3 → 4 → 6 (desktop)
- 12 tech cards, each:
  - glass-card styling (semi-transparent, backdrop-blur, ghost border)
  - Icon from react-icons Simple Icons (`si` prefix) in monochrome white (e.g., `SiReact`, `SiNodedotjs`, `SiTypescript`, `SiAmazonwebservices`, `SiMongodb`, `SiNextdotjs`, `SiGraphql`, `SiDocker`, `SiPostgresql`, `SiTailwindcss`, `SiGit`, `SiCplusplus`)
  - Tech name below in Inter uppercase letter-spaced label
  - Hover: scale-105, subtle cyan glow border (`hover:border-[#22D3EE]/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]`)
- Technologies: React, Node.js, TypeScript, AWS, MongoDB, Next.js, GraphQL, Docker, PostgreSQL, Tailwind CSS, Git, C++

Reference: `design-references/stitch-exports/skills-contact-footer/code.html`

- [ ] **Step 2: Verify tech stack grid**

Check:
- Grid is responsive (2→3→4→6 columns)
- Cards have glass effect
- Icons are monochrome white
- Hover shows cyan accent

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/tech-stack.tsx
git commit -m "feat: add tech stack grid with glassmorphism cards"
```

---

## Task 8: Contact Section

**Files:**
- Create: `src/components/sections/contact.tsx`

- [ ] **Step 1: Build the contact CTA section**

Server component with:
- Large "SA" typographic logo (Manrope, 8-12rem, centered)
- Red radial glow behind the SA text
- Heading: "Let's build something amazing together." in Manrope bold
- Subtitle in muted gray Inter
- Four horizontal glass pill buttons: EMAIL, LINKEDIN, GITHUB, TWITTER
  - Each: glass-card, rounded-full, icon + label
  - All ghost/outlined by default
  - One shown with red hover state (CSS :hover with bg-[#DC2626])
- Links: actual hrefs to mailto, linkedin, github, twitter URLs

Reference: `design-references/stitch-exports/skills-contact-footer/code.html`
Fix: All buttons ghost by default, red on hover (not pre-filled)

- [ ] **Step 2: Verify contact section**

Check:
- SA logo is massive and centered
- Red glow behind it is subtle
- Buttons are glass pills in a row
- Hover turns them red

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/contact.tsx
git commit -m "feat: add contact section with large SA logo and social buttons"
```

---

## Task 9: Footer

**Files:**
- Create: `src/components/layout/site-footer.tsx`

- [ ] **Step 1: Build the new minimal footer**

Server component with:
- Subtle horizontal line (white at 5% opacity, max-w-4xl)
- Copyright: "© 2026 Sanchit Agarwal. All rights reserved." in Inter, 10px, uppercase, letter-spaced, muted gray (#71717A)
- Centered

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/site-footer.tsx
git commit -m "feat: add minimal dark footer"
```

---

## Task 10: Compose Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx to compose all sections**

Replace entire homepage content with:
```tsx
import { Nav } from '@/components/layout/nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { TechStack } from '@/components/sections/tech-stack'
import { Contact } from '@/components/sections/contact'
import { SiteFooter } from '@/components/layout/site-footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
```

Note: The route group was already set up in Task 2. The homepage renders its own Nav/Footer. Sub-pages use the old Header/Footer via `(main)/layout.tsx`.

- [ ] **Step 2: Full visual verification**

Run dev server and scroll through entire homepage:
- Nav floats at top ✓
- Hero fills viewport ✓
- About two-column layout ✓
- Experience glass cards ✓
- Tech stack grid ✓
- Contact with large SA ✓
- Footer minimal ✓
- Section spacing is generous (8.5rem between sections) ✓
- No light mode artifacts ✓

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: compose redesigned homepage with all sections"
```

---

## Task 11: Polish & Fixes

**Files:**
- Modify: Various components based on FINDINGS.md

- [ ] **Step 1: Apply all FINDINGS.md fixes**

- ISSUE-001: Ensure no cyan CTA buttons anywhere — all buttons red
- ISSUE-002: Nav active state uses red dot consistently
- ISSUE-003: Primary buttons always red, never cyan
- ISSUE-004: AB InBev title = "Senior Software Engineer"
- ISSUE-005: Single resume button (hero's "Download Resume" only). About has "Get In Touch" only — no second resume CTA

- [ ] **Step 2: Responsive checks**

Test at:
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)
- Wide (1440px+)

Fix any layout breaks.

- [ ] **Step 3: Performance check**

Run: `npm run build`
Check: No build errors, page loads under 3s, no massive bundle warnings.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: apply design system fixes and responsive polish"
```

---

## Deferred Work (Not in this plan)

- **Selected Works section** — Stitch design not yet generated. Add as a future task.
- **GSAP scroll animations** — Text reveals, section transitions. Phase 2.
- **Framer Motion** — Page transitions, hover effects. Phase 2.
- **Three.js / React Three Fiber** — 3D hero element. Phase 2.
- **Marquee animation** — CSS exists in Stitch code, add in polish phase.
- **Sub-page redesign** — Articles, Portfolio, Resume, Meet pages. Phase 3.
- **Mobile navigation** — Full hamburger menu. Phase 2.
- **Contact form functionality** — Currently placeholder. Phase 3.
