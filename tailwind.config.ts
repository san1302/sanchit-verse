import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      colors: {
        "surface": "#131318",
        "surface-dim": "#131318",
        "surface-bright": "#39393e",
        "surface-container-lowest": "#0e0e13",
        "surface-container-low": "#1b1b20",
        "surface-container": "#1f1f24",
        "surface-container-high": "#2a292f",
        "surface-container-highest": "#35343a",
        "surface-variant": "#35343a",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#e6bdb8",
        "primary-container": "#dc2626",
        "on-primary-container": "#fff6f5",
        "secondary": "#22D3EE",
        "tertiary": "#c6c6c7",
        "outline": "#ac8884",
        "outline-variant": "#5c403c",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "Manrope", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        label: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke, opacity',
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
