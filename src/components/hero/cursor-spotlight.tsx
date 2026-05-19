'use client';

import { useEffect, useRef, useState } from 'react';

type CursorSpotlightProps = {
  size?: number;
  intensity?: number;
  accent?: string;
};

/**
 * Renders a radial-gradient spotlight that follows the cursor inside the
 * parent element. Falls back to a static centered glow when the user
 * prefers reduced motion.
 */
export function CursorSpotlight({
  size = 600,
  intensity = 0.18,
  accent = 'rgba(220, 38, 38, 1)',
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current?.parentElement;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  // Build a translucent version of the accent color.
  const tintedAccent = toRgba(accent, intensity);

  const xPct = (reducedMotion ? 0.5 : pos.x) * 100;
  const yPct = (reducedMotion ? 0.5 : pos.y) * 100;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background: `radial-gradient(circle ${size}px at ${xPct}% ${yPct}%, ${tintedAccent} 0%, transparent 60%)`,
        transition: reducedMotion ? undefined : 'background 120ms linear',
      }}
    />
  );
}

/**
 * Accepts `#RRGGBB`, `rgb(...)`, or `rgba(...)` and returns an rgba() string
 * with the given alpha. Falls back to the input if parsing fails.
 */
function toRgba(input: string, alpha: number): string {
  const hex = input.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }
  const rgb = input.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgb) {
    return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
  }
  return input;
}
