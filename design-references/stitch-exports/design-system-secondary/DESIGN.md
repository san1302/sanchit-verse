# Design System Document: The Premium Portfolio

## 1. Overview & Creative North Star

### Creative North Star: "The Neon Nocturne"
The Neon Nocturne is an editorial-first design philosophy that balances the stark, infinite depth of a pure black canvas with the vibrant, energetic pulse of high-end technology. It moves away from the "standard dashboard" aesthetic into a space that feels like a curated gallery or a high-end luxury device.

To break the "template" look, this design system leans into **intentional asymmetry**. Text should not always align to a rigid grid; instead, use large typography to "break" the flow of sections. Overlap elements—such as a portrait photo bleeding out of its container or a floating glass card hovering over a radial red glow—to create a sense of physical layering and depth that feels custom and bespoke.

---

## 2. Colors

The color palette is designed for maximum contrast and emotional resonance. It uses the depth of `#000000` to make the secondary cyan and primary red accents "pop" with an almost emissive quality.

### Color Palette Reference
*   **Core Background:** `#131313` (Surface/Dim) transitions to `#000000` (Pure Black) for the deep hero sections.
*   **Interactive Primary:** `primary: #2fd9f4` (Cyan). Use this for "live" states, primary CTAs, and links.
*   **Emotional Accent:** `secondary: #ffb4ab` / `#DC2626` (Red). Reserved for dramatic radial glows and small, intentional brand icons.
*   **Neutral Surface:** `tertiary: #c6c6c7` (Light Gray). Use for secondary text and descriptive elements.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. Content blocks must be defined through:
1.  **Background Shifts:** Use `surface_container_low` (`#1b1b1b`) against the core `background` (`#131313`).
2.  **Negative Space:** Leverage the Spacing Scale (specifically `12` to `24`) to create breathing room between thoughts.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Level 0:** Pure Black Background.
*   **Level 1:** `surface_container` (`#1f1f1f`) for the main "About Me" bio card.
*   **Level 2:** `surface_container_highest` (`#353535`) for interactive chips or nested detail boxes.

### Signature Textures (Glass & Glow)
*   **Glassmorphism:** For floating elements (like a "Hire Me" badge), use `surface_variant` at 40% opacity with a `20px` backdrop blur.
*   **Dramatic Glows:** Behind focal points like portraits, use a large radial gradient: `radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, rgba(0, 0, 0, 0) 70%)`.

---

## 3. Typography

The typography strategy pairs the structural confidence of **Manrope** with the effortless readability of **Inter**.

*   **Display (Manrope - Bold):** Use `display-lg` (3.5rem) for the "Hey, I'm..." headlines. This is the "voice" of the portfolio. It should be high-contrast white.
*   **Headlines (Manrope):** `headline-lg` (2rem) for section titles. These provide the editorial structure.
*   **Body (Inter):** Use `body-lg` (1rem) with a generous line-height (1.7 or 1.8). Color should be `on_surface_variant` (`#e6bdb8`) to reduce eye strain against the black background while maintaining warmth.
*   **Labels (Manrope):** `label-md` (0.75rem) in Uppercase for small taglines or metadata.

---

## 4. Elevation & Depth

Hierarchy is achieved through **Tonal Layering** rather than structural lines.

### The Layering Principle
Depth is created by stacking surface tiers. A `surface_container_highest` card placed on a `surface` background provides a soft, natural lift.

### Ambient Shadows
For "Floating" elements (e.g., a device frame):
*   **Blur:** 40px - 60px.
*   **Opacity:** 8%.
*   **Color:** Use a tinted version of the red accent to mimic light reflecting off the "glow" background.

### The "Ghost Border" Fallback
If a container requires a boundary (e.g., a card on a dark surface), use a **Ghost Border**:
*   **Token:** `outline_variant` (`#5c403c`).
*   **Opacity:** 10%.
*   **Width:** 1px.
*   **Effect:** This provides just enough definition without creating a "boxed-in" feel.

---

## 5. Components

### Buttons
*   **Primary:** Cyan background (`#2fd9f4`), `on_primary` text. No border. Roundedness: `full`.
*   **Secondary (Glass):** Transparent background with a `10%` ghost border and backdrop blur.
*   **Tertiary:** Text-only with an arrow icon using the Spacing Scale `1.5` for the gap.

### Floating Device Frames
The "About Me" portrait should be housed in a "Device-like" container.
*   **Radius:** `xl` (1.5rem).
*   **Background:** `surface_container_lowest` (`#0e0e0e`).
*   **Effect:** Place a red radial glow *behind* this frame to separate it from the pure black background.

### Interaction Chips
*   **Style:** `surface_container_high` (`#2a2a2a`) background.
*   **Icon:** Use the red accent for a 16px icon within the chip to signify personality or expertise.

### Input Fields & Cards
*   **Cards:** Forbid divider lines. Use `spacing.8` to separate header from body text.
*   **Inputs:** `surface_container` background with a `2px` cyan bottom border only when focused.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text and imagery overlap to create a "custom build" feel.
*   **Do** use the `1.7` line-height for body text to ensure the portfolio feels "approachable" and "warm."
*   **Do** apply a subtle `2px` corner radius to icons to match the `roundedness` scale of the containers.

### Don't
*   **Don't** use 100% opaque white borders. They break the "no-line" rule and feel "cheap."
*   **Don't** use standard drop shadows. Always use diffused, low-opacity ambient shadows.
*   **Don't** use pure white for long-form body text; use `tertiary` (`#c6c6c7`) to soften the reading experience.
*   **Don't** align everything to a center axis. Offset your headlines to create visual interest.