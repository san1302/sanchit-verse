# Stitch Portfolio Redesign Brief

## Design Direction
- **Theme:** Dark, futuristic, premium, creative — NOT generic template
- **Background:** Near-black (#0A0A0F)
- **Primary Accent:** Warm Red (#DC2626) — brand identity, glows, headings, active states
- **Secondary Accent:** Electric Cyan (#22D3EE) — links, badges, hover states, interactive elements
- **Text Primary:** Off-white (#F0F0F5)
- **Text Muted:** Warm gray (#9CA3AF)
- **Surface/Cards:** Dark elevated (#141419) with glassmorphism effects
- **Typography Headings:** Bold serif (Playfair Display or similar) with letter-spacing
- **Typography Body:** Clean sans-serif (Inter or DM Sans)
- **Logo:** Typographic — stylized "SA" monogram or "SANCHIT" text mark in bold serif, white on dark, with subtle red glow

## References
- **Foliofy** (foliofy.framer.website) — layout structure, floating glass nav, stats cards, red glow effects, clean project grid
- **Cortiz** (cortiz.dev) — bold serif headings with letter-spacing, scrolling marquee, Selected Works layout, 3D hero element, contact section with large logo

## Mode: Experimental (50 credits/month)
Upload reference screenshots with each prompt. Max 2 screenshots per prompt.

---

## Prompt 1 — Full Page Layout (Wireframe)

**Upload:** `current-site-full.png`

> Redesign this personal portfolio website for a software engineer named Sanchit Agarwal. Completely new dark futuristic theme. Background: near-black (#0A0A0F). Primary accent: warm red (#DC2626). Secondary accent: electric cyan (#22D3EE).
>
> Logo: A typographic logo — stylized "SA" monogram in bold serif font, white text, placed in the top-left of the navigation. This same logo mark should appear larger in the contact/footer section.
>
> The page should have these sections in this order:
>
> 1. Floating pill-shaped navigation bar with frosted glass effect (rounded, semi-transparent dark background with backdrop blur). Nav items: Home, About, Works, Skills, Contact. "SA" logo on the left in bold serif.
> 2. Hero section — large bold serif heading with name "SANCHIT AGARWAL", subtitle "Software Engineer | Ex-Amazon | AB InBev" below. A placeholder rectangular area for a 3D animated element. Two CTA buttons: "View Projects" (filled red) and "Download Resume" (outlined).
> 3. About section — two-column: bio text left with spaced serif heading "ABOUT ME", professional photo right with red glow behind it.
> 4. Stats row — 3 glassmorphism cards showing metrics (5+ years, 20+ projects, etc.) with warm red glow.
> 5. Experience timeline — vertically stacked role entries with company name and dates.
> 6. Selected Works — numbered project cards (01, 02, 03, 04) with screenshots, descriptions, and category tags.
> 7. Skills/Tech section — grid of technology icons in subtle dark cards.
> 8. Contact section — large "SA" typographic logo centered with red glow, tagline below, horizontal social link buttons (Email, LinkedIn, GitHub).
> 9. Simple footer with copyright.
>
> Typography: Bold serif for headings (Playfair Display), clean sans-serif for body (Inter). Generous whitespace. Premium, creative, futuristic feel.

---

## Prompt 2 — Hero Section (Detail)

**Upload:** `foliofy-hero.png` + `cortiz-hero-actual.png`

> Design a hero section for a dark portfolio website, taking inspiration from both reference images. Background: near-black (#0A0A0F).
>
> Top: Floating pill-shaped navigation bar with frosted glass effect. Left side: "SA" typographic logo in bold white serif. Right side: nav items (About, Works, Skills, Contact) in clean sans-serif. The nav should float above the content with a semi-transparent dark background and subtle border.
>
> Hero content: Center-aligned. Small greeting text in muted gray: "Hi, I'm Sanchit Agarwal". Below: very large bold serif heading — "Software Engineer" on line one, "& Problem Solver" on line two. The word "Engineer" should have a subtle red glow/highlight behind it. Below the heading: one-line subtitle in muted gray. Below: two CTA buttons — "View Projects" (filled red #DC2626, white text) and "Download Resume" (outlined, white text).
>
> Right side of the heading area: leave a rectangular placeholder area (for a 3D animated element added later in code).
>
> Bottom of hero: horizontal scrolling ticker/marquee with repeating text "SOFTWARE ENGINEER — FULL STACK DEVELOPER —" in uppercase, very muted dark gray (barely visible watermark effect, like the second reference).
>
> Background: subtle warm red radial glow behind the center content (like the first reference). Bold, confident, futuristic feel.

---

## Prompt 3 — About Section

**Upload:** `foliofy-about.png` + `cortiz-about.png`

> Design an About Me section for a dark portfolio. Background: near-black (#0A0A0F).
>
> Two-column layout. Left column: Large spaced-out serif heading "ABOUT ME" at the top (with letter-spacing between each character, inspired by the second reference). Below: a paragraph of bio text in light gray describing a software engineer with experience at Amazon and AB InBev. Below the bio: a row of skill/tech tags in pill-shaped badges with subtle cyan (#22D3EE) borders — React, Node.js, AWS, TypeScript, MongoDB, Next.js.
>
> Right column: A professional portrait photo placeholder in a rounded-corner frame. Behind the photo, a soft warm red radial glow effect (like the first reference).
>
> Below both columns: a row of small social icons (GitHub, LinkedIn, Email) in muted gray.
>
> Typography: Serif for the heading, sans-serif for body. Clean and spacious.

---

## Prompt 4 — Stats + Experience

**Upload:** `foliofy-stats.png`

> Design a stats and experience section for a dark portfolio. Background: near-black (#0A0A0F).
>
> Stats Row: Three cards in a horizontal row. Each card has a large bold number (e.g., "5+", "20+", "100%"), a small description below, and a glassmorphism effect (semi-transparent background with backdrop blur). The cards should have a faint warm red gradient glow at the edges. Use the reference image for layout direction.
>
> Below the stats: Experience Timeline section. Heading: "My Experience" in bold serif. Timeline: vertically stacked entries, each in a subtle card/row. Each entry has: Job Title (bold, white), Company Name (muted gray), Date range (right-aligned, muted). Show three entries:
> - Software Engineer, Amazon, dates
> - Software Engineer, AB InBev, dates
> - Previous role, Company, dates
>
> Clean separators between entries. Same dark theme with red (#DC2626) and cyan (#22D3EE) accents.

---

## Prompt 5 — Selected Works

**Upload:** `cortiz-selected-works-detail.png` + `foliofy-work.png`

> Design a Selected Works / project showcase section for a dark portfolio. Background: near-black (#0A0A0F). This is the most important section.
>
> Large serif heading "SELECTED WORKS" with letter-spacing at the top center. Subtitle in muted gray: "A selection of projects I've built and shipped."
>
> Show 4 project cards in a two-column grid. Each card has:
> - Large screenshot/mockup image area at the top
> - Project name in bold white below
> - One-line description in muted gray
> - Category tag in a small pill badge with cyan (#22D3EE) border (e.g., "Web App", "Open Source", "Plugin", "Tool")
> - Subtle number in the corner ("01", "02", "03", "04") in muted text
> - Cards have a subtle dark border (#1F1F28) and slight red glow on hover (show one card in hover state)
>
> Below all cards: "All Projects" button in outlined style.
>
> Take layout inspiration from both references — the numbered project approach from the first, the clean card grid from the second.

---

## Prompt 6 — Skills + Contact + Footer

**Upload:** `cortiz-contact.png`

> Design two sections and a footer for a dark portfolio.
>
> Section 1 — Tech Stack: Heading "Tech Stack" in bold serif. Below: a grid of technology items. Each item is a subtle dark card (#141419) with a tech icon/logo and the name below (React, Node.js, TypeScript, Next.js, AWS, MongoDB, PostgreSQL, Docker, Git, Tailwind CSS). Icons in muted white. Show one in a cyan (#22D3EE) highlighted hover state.
>
> Section 2 — Contact: Centered layout. At top: large "SA" typographic logo in bold serif, much bigger than the nav version, with a subtle warm red glow radiating behind it (like the reference image's metallic logo treatment but using typography). Below the logo: "Let's build something great together." in serif. Below: 4 horizontal contact buttons in a row — EMAIL, LINKEDIN, GITHUB, TWITTER — each with icon on left, outlined style with subtle border and white text. Show one button in red (#DC2626) filled hover state.
>
> Footer: Simple centered line — "© 2026 Sanchit Agarwal. All rights reserved." in muted gray. Minimal.
>
> Same dark theme throughout.

---

## After Stitch — Next Steps

1. Export DESIGN.md (color tokens, typography, spacing)
2. Export HTML/CSS of each section
3. Bring back to Claude Code for implementation in Next.js + Tailwind
4. We add: GSAP scroll animations, Framer Motion transitions, React Three Fiber 3D hero element, CSS marquee/glow effects

---

## Screenshot-to-Prompt Mapping Quick Reference

| Prompt | Upload These |
|--------|-------------|
| 1 - Full Layout | `current-site-full.png` |
| 2 - Hero | `foliofy-hero.png` + `cortiz-hero-actual.png` |
| 3 - About | `foliofy-about.png` + `cortiz-about.png` |
| 4 - Stats/Experience | `foliofy-stats.png` |
| 5 - Selected Works | `cortiz-selected-works-detail.png` + `foliofy-work.png` |
| 6 - Skills/Contact | `cortiz-contact.png` |
| Bonus - Marquee ref | `cortiz-marquee-brands.png` (if needed) |
| Bonus - Services ref | `foliofy-services.png` (if adding accordion skills) |
