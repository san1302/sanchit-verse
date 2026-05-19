'use client';

import { useEffect, useState } from 'react';

type CountStatProps = {
  n: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

const DURATION_MS = 1200;

/**
 * Animates a number from 0 to `n` over 1200ms using a cubic ease-out curve.
 * Honors prefers-reduced-motion by snapping to the final value instantly.
 */
export function CountStat({ n, suffix = '', decimals = 0, label }: CountStatProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setValue(n);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(n * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  return (
    <div>
      <div className="font-headline text-[32px] font-extrabold leading-none tracking-tight text-white tabular-nums">
        {value.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </div>
    </div>
  );
}
