'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

const EASING = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
const DURATION_MS = 700;
const TRANSLATE_PX = 20;

/**
 * useReveal — scroll-triggered, one-shot reveal hook.
 * Returns a ref to attach to the target element and a boolean that flips to
 * `true` once the element first intersects the viewport. Respects
 * `prefers-reduced-motion`: skips animation and reports `shown=true` immediately.
 */
export function useReveal(
  threshold = 0.15,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref as React.RefObject<HTMLDivElement>, shown];
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: 'div' | 'section';
};

/**
 * Reveal — wraps children in a fade-up transition that fires once the wrapper
 * scrolls into view. Use `delay` to stagger sibling reveals.
 */
export function Reveal({
  children,
  delay = 0,
  threshold = 0.15,
  className,
  as = 'div',
}: RevealProps) {
  const [ref, shown] = useReveal(threshold);

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : `translateY(${TRANSLATE_PX}px)`,
    transition: `opacity ${DURATION_MS}ms ${EASING} ${delay}ms, transform ${DURATION_MS}ms ${EASING} ${delay}ms`,
    willChange: 'opacity, transform',
  };

  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
