# Portfolio Redesign — Stitch Findings & Issues

## Brand Taglines (Approved Options)
- **Active:** "Full-stack engineer — backend-heavy, frontend-polished, production-paranoid."
- **Alternative:** "I build full-stack products. The backend scales, the frontend delights, and the on-call engineer sleeps."

## Design Direction (Locked In)
- **Vibe:** Warm, personal, confident, premium — Foliofy energy, NOT cold editorial
- **Font:** Manrope (bold sans-serif) for headings, Inter for body/labels
- **Background:** Pure black (#000000)
- **Red (#DC2626):** CTA buttons, logo accent, subtle radial glows behind focal points
- **Cyan (#22D3EE):** Text links, skill badge borders, hover states ONLY — keep minimal
- **NO purple**
- **Logo:** Typographic "SA" in bold Manrope, white

---

## Sections Generated

### 1. Full Page Layout (Stitch Export: `/Downloads/stitch/`)
- **Status:** Generated, usable as wireframe reference
- **Verdict:** Too minimalistic but clean foundation
- **DESIGN.md:** "The Monolith Editorial" — strict color discipline, No-Line rule, Ghost Borders. GOOD.

### 2. Hero Section (Stitch Export: `/Downloads/stitch 3/warm_hero_sanchit_agarwal/`)
- **Status:** Generated, APPROVED direction
- **What works:**
  - Center-aligned, Foliofy-style warm energy
  - "Software Engineer & Problem Solver" in massive Manrope bold
  - "Hi! I'm Sanchit Agarwal · Based in India" intro line
  - Photo in laptop mockup frame (grayscale → color on hover)
  - "Available for work" floating badge with green dot + bounce animation
  - "Sanchit A." italic signature watermark
  - Floating tech icons card (terminal, cloud, architecture)
  - Red CTA + ghost outline button — correct hierarchy
  - Red radial glow behind photo — warm, not fog
  - Stats teaser below ("05+", "40+") as transition to next section

### 3. About Section (Stitch Export: `/Downloads/stitch (2)/`)
- **Status:** Generated, APPROVED direction
- **What works:**
  - "Hey, ⚡ software engineer" — big, bold, personal
  - Two-column: text left, portrait right
  - Portrait with floating role badges ("Full-Stack Developer", "Cloud Architect", "Software Engineer")
  - "Available for opportunities" green dot badge
  - "Amazon" and "AB InBev" highlighted in text
  - Red glow behind portrait — contained, warm
  - Bio text is well-written and personal

### 4. Experience Section (Stitch Export: `/Downloads/stitch (7)/`)
- **Status:** Generated, APPROVED direction
- **What works:**
  - Vertical stacked full-width glassmorphism cards — matches Foliofy
  - Minimal content per card — title, company, dates only. No resume bullets
  - Warm red/crimson radial glow behind the cards in background
  - Red dot indicator on current role (AB InBev)
  - "View Full Resume →" link below
  - Clean heading centered with subtitle
- **Issues to fix in code:**
  - Title should be "Senior Software Engineer" not "Software Engineer" for AB InBev
  - Nav says "NOCTURNAL MUSE" — replace with "SA"
  - Cards need slightly more padding/height for premium feel
  - Background glow could be warmer/stronger — enhance with CSS
  - Remove "Hire Me" nav button

### 5. Selected Works — NOT YET GENERATED

### 6. Tech Stack + Contact + Footer (Stitch Export: `/Downloads/stitch (9)/`)
- **Status:** Generated, APPROVED direction
- **What works:**
  - Tech Stack: Clean 4x3 grid of glassmorphism cards, monochrome white icons, cyan hover state on one card
  - Contact: Large "SA" typographic logo with 3D text effect and red glow behind it. "Let's build something amazing together." Bold heading. 4 social buttons in horizontal row (EMAIL, LINKEDIN, GITHUB, TWITTER) as glass pills, one shown with red hover state
  - Footer: Simple copyright line, minimal
  - Flow from Experience → Tech Stack → Contact → Footer feels natural
- **Issues to fix in code:**
  - Ensure all 12 tech icons are present and correct
  - Social buttons: all should be ghost/outlined by default, red fill on hover only (EMAIL appears pre-filled red)
  - "SA" logo 3D effect can be enhanced with CSS text-shadow or Three.js
  - Verify the nav matches "SA" logo style from hero/about sections

---

## Issues To Fix In Code

### ISSUE-001: Cyan Overuse in About Section
- **Severity:** Medium
- **Where:** About section
- **Problem:** Cyan is used for primary CTA button ("View Resume"), text links ("Amazon", "AB InBev"), floating badge dots — too dominant
- **Fix:** Change "View Resume" button to red (#DC2626) to match hero's "View Projects". Keep cyan ONLY for text links and badge borders.
- **Rule:** Red = action buttons everywhere. Cyan = information/links everywhere.

### ISSUE-002: Nav Active State Inconsistency
- **Severity:** Low
- **Where:** Hero nav vs About nav
- **Problem:** Hero shows active link with a red dot indicator. About shows active link with cyan text color.
- **Fix:** Use the red dot indicator consistently across all sections — it's more unique and subtle.

### ISSUE-003: Cyan Button in About DESIGN.md
- **Severity:** Medium
- **Where:** About section's DESIGN.md ("The Neon Nocturne")
- **Problem:** DESIGN.md defines primary buttons as cyan (`#2fd9f4`) which contradicts the hero's red CTA pattern.
- **Fix:** Override in our merged DESIGN.md — primary buttons are ALWAYS red (#DC2626). Cyan is never used for buttons.

### ISSUE-004: Experience Title Wrong
- **Severity:** Low
- **Where:** Experience section — AB InBev card
- **Problem:** Shows "Software Engineer" instead of "Senior Software Engineer"
- **Fix:** Update title text in code

### ISSUE-005: About Section "View Resume" Should Match Hero
- **Severity:** Low
- **Where:** About section
- **Problem:** About has "View Resume" + "Get In Touch" as CTAs. Hero has "View Projects" + "Download Resume". "Download Resume" appears in both sections.
- **Fix:** Remove duplicate. About section should have "Get In Touch" (red fill) + "View Resume" (ghost outline). Only one resume button across the whole site.

---

## DESIGN.md — Merged Rules (Use This When Coding)

### From "The Monolith Editorial" (Full Page):
- Pure black background — NO gradients on background
- No-Line Rule — no 1px borders for sectioning, use spacing
- Ghost Borders — `outline-variant` (#5C403C) at 15% opacity for card edges
- Color discipline — Red for action, Cyan for information
- No Red Tints — all neutrals must be pure or cool-toned
- Embrace the Void — 8.5rem spacing between major sections

### From "The Neon Nocturne" (About):
- Intentional asymmetry — overlapping elements for depth
- Dramatic Glows — `radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)` behind focal points
- Surface hierarchy — Level 0 (black) → Level 1 (#1f1f1f) → Level 2 (#353535)
- Glassmorphism — 40% opacity + 20px backdrop blur for floating elements
- Body text in warm gray (#C6C6C7), NOT pure white

### From "The Digital Curator" (Hero variant):
- Editorial watermark technique — large text at 2% opacity behind content
- Italic keywords in headlines for "signature" look
- Ambient shadows with accent-tinted glows (not black shadows)

### OVERRIDE — Primary Buttons:
- **Always red (#DC2626)**, rounded-full, uppercase tracking-wider
- **Never cyan for buttons** — regardless of what individual DESIGN.md files say
- Cyan is exclusively for: text links, skill badges, hover states, status indicators

---

## Animation Plan (Added In Code, Not Stitch)

### From Cortiz (What We Loved):
- GSAP ScrollTrigger — text reveals on scroll (letter by letter or line by line)
- Framer Motion — page/section transitions, hover effects
- Smooth scroll between sections
- Project card hover animations (tilt, glow)

### From the Hero Code:
- Grayscale → color photo transition on hover (already in Stitch code)
- "Available for work" badge gentle bounce animation
- Fade-in animation on intro text

### To Add:
- Three.js / React Three Fiber — 3D element in hero (replace the mockup frame or add behind it)
- Marquee/ticker — CSS animation for scrolling text (code exists from editorial hero variant)
- Parallax subtle effect on scroll
- Cursor glow/trail effect (optional)
- Stats counter animation (numbers count up on scroll into view)

---

## Files Reference

| What | Path |
|------|------|
| Reference screenshots | `~/stitch-portfolio-references/` |
| Stitch brief & prompts | `~/stitch-portfolio-references/STITCH-BRIEF.md` |
| This findings doc | `~/stitch-portfolio-references/FINDINGS.md` |
| Full page layout export | `~/Downloads/stitch/` |
| Editorial hero export | `~/Downloads/stitch 2/editorial_hero_sanchit_agarwal/` |
| About section export | `~/Downloads/stitch (2)/` |
| Warm hero export | `~/Downloads/stitch 3/warm_hero_sanchit_agarwal/` |
| About (duplicate) export | `~/Downloads/stitch 3/about_me_sanchit_agarwal/` |
