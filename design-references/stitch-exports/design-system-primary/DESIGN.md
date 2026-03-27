# Design System Documentation: The Editorial Portfolio

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Curator"
This design system is built to move beyond the "template-heavy" look of modern portfolios. We are not building a dashboard; we are curating an editorial experience. The "Digital Curator" philosophy treats the screen as a high-end gallery space where negative space is as important as the content. 

By leveraging **intentional asymmetry**, **massive typographic scales**, and **layered depth**, we create an environment that feels both authoritative and personal. The system breaks the rigid grid by allowing elements to overlap, using dramatic radial glows for warmth, and utilizing glassmorphism to create a sense of physical light and air within a dark, premium digital space.

---

## 2. Colors

The palette is rooted in deep blacks and high-contrast accents, designed to guide the eye through dramatic "pools" of light.

### Palette Strategy
- **Base Surface:** `surface` (#131318) or Pure Black (#000000). The foundation of the system is absolute darkness to allow accents to pop.
- **Primary Accent (The Heat):** `primary_container` (#DC2626). Used for the "North Star" actions. This red isn't just a color; it’s an invitation. Use it for CTAs and large, soft radial glows behind key imagery.
- **Secondary Accent (The Spark):** `secondary` (#22D3EE). This is a "micro-interaction" color. It is strictly reserved for link hover states to provide a high-contrast, unexpected spark of life.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off parts of the page. 
- Section boundaries must be defined through background color shifts (e.g., moving from `surface` to `surface_container_low`). 
- Visual separation should be achieved through generous white space (refer to the **Spacing Scale**) rather than structural lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create nested depth:
1. **Background:** `surface` / #000000.
2. **Sectioning:** `surface_container_low`.
3. **Primary Cards:** `surface_container` (#141419).
4. **Floating Elements:** Glassmorphism layers (see Elevation & Depth).

### The "Glass & Glow" Rule
To avoid a flat, "flat-ui" feel:
- Use **Radial Glows**: Large, low-opacity (#DC2626) blurs behind hero images or cards to create a "warmth" that feels premium and personal.
- Use **Glassmorphism**: For floating elements like navigation, use semi-transparent surface colors with a `20px` to `40px` backdrop-blur.

---

## 3. Typography

The typography strategy relies on the contrast between the massive, expressive **Manrope** and the technical, clean **Inter**.

| Category | Token | Font | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Bold | Hero statements. Massive impact. |
| **Headline** | `headline-lg` | Manrope | 2.0rem | Bold | Section headers and project titles. |
| **Title** | `title-lg` | Inter | 1.375rem | Medium | Sub-sections and card titles. |
| **Body** | `body-lg` | Inter | 1.0rem | Regular | Core readability and descriptions. |
| **Label** | `label-md` | Inter | 0.75rem | Medium | Metadata, tags, and small utility text. |

**Editorial Note:** Use tight letter-spacing on Manrope headings to create a "locked" and intentional look. Ensure body text has generous line-height for a premium, airy reading experience.

---

## 4. Elevation & Depth

We eschew traditional shadows in favor of **Tonal Layering** and **Atmospheric Glass**.

### The Layering Principle
Depth is achieved by stacking. A `surface_container_highest` element should only ever sit on top of a `surface_container` or lower. This creates a soft, natural lift without the "heaviness" of a black shadow.

### Ambient Shadows
For floating components (like the navigation pill), use "Ambient Shadows":
- **Blur:** 32px – 64px.
- **Opacity:** 4% – 8%.
- **Color:** Tint the shadow with the `on_surface` color rather than pure black to simulate realistic light bounce.

### The "Ghost Border"
When a container requires a boundary (e.g., the glass navigation), use a **Ghost Border**:
- **Token:** `outline_variant` at **10% opacity**.
- This creates a "sharpness" to the edge of the glass without feeling like a heavy stroke.

### Glassmorphism
Floating elements must feel like physical objects. Apply `backdrop-filter: blur(20px)` and a background color of `surface_container_high` at 60-70% opacity.

---

## 5. Components

### Navigation (The Floating Pill)
- **Shape:** `rounded-full` (9999px).
- **Surface:** Glassmorphism (Backdrop blur + 10% opacity ghost border).
- **Layout:** Floating at the top of the viewport, centered or asymmetrically aligned.

### Buttons
- **Primary:** `primary_container` (#DC2626) background, `on_primary_container` text. Shape: `rounded-full`.
- **Secondary:** Transparent background with an `outline` ghost border (20% opacity). Shape: `rounded-full`.
- **Hover State:** Subtle scale-up (1.02x) and increase in backdrop-blur intensity.

### Cards & Lists
- **Rule:** No divider lines.
- **Structure:** Use `surface_container` (#141419) as the card base. 
- **Separation:** Use `spacing-8` (2.75rem) or `spacing-10` (3.5rem) to separate list items. 
- **Interaction:** Cards should utilize a subtle background shift (to `surface_bright`) on hover rather than an outline.

### Status Chips (e.g., "Available for Work")
- **Shape:** `rounded-full`.
- **Style:** Small, high-contrast markers. Use a vibrant green or `secondary` (#22D3EE) to denote status, keeping the typography in `label-sm`.

---

## 6. Do's and Don'ts

### Do
- **Do** use massive headings that break across lines for an editorial feel.
- **Do** lean into the "Pure Black" (#000000) base; let the content be the light source.
- **Do** overlap images and text to create visual tension and depth.
- **Do** use the Spacing Scale strictly; hierarchy is maintained through consistent gaps.

### Don'ts
- **Don't** use 1px solid borders for layout—it kills the "premium" vibe immediately.
- **Don't** use the Cyan accent for anything other than link hover states.
- **Don't** use standard "drop shadows" (0, 4, 10, 0). They feel dated and "out-of-the-box."
- **Don't** use gradients on the background surface. Keep the background deep and flat, allowing the radial glows to provide the texture.