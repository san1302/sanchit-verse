'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Reveal } from '@/components/ui/reveal';
import { CursorSpotlight } from '@/components/hero/cursor-spotlight';
import { CountStat } from '@/components/hero/count-stat';
import { PhotoCard } from '@/components/hero/photo-card';
import { Terminal } from '@/components/hero/terminal';

const PHOTO_TX_RANGE = -16;
const PHOTO_TY_RANGE = -10;
const TERM_TX_RANGE = 10;
const TERM_TY_RANGE = 6;
const PARALLAX_TRANSITION = 'transform 220ms ease-out';

type MousePos = { x: number; y: number };

/**
 * Hero — terminal-split layout. Headline + CTAs + stats on the left,
 * a layered photo + auto-typing terminal on the right with subtle
 * mouse-driven parallax. Respects prefers-reduced-motion.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [mouse, setMouse] = useState<MousePos>({ x: 0.5, y: 0.5 });
  const [parallaxEnabled, setParallaxEnabled] = useState(false);

  // Word-by-word entrance for the headline. The `[data-word]` spans inside
  // the <h1> animate up + fade in with a stagger.
  //
  // Uses fromTo (not from) — explicit FROM and TO states. With from(),
  // React 18 StrictMode can interrupt mid-animation, the cleanup snaps
  // elements back to the FROM state, then the second mount's from() reads
  // that current invisible state as its "natural" target and animates
  // opacity:0→opacity:0 (stays invisible). fromTo is immune because both
  // states are hardcoded.
  //
  // useGSAP handles its own context cleanup; we just bail out for
  // prefers-reduced-motion users so the animation never runs.
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '[data-word]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          delay: 0.15,
          ease: 'power3.out',
        },
      );
    },
    { scope: headlineRef },
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setParallaxEnabled(false);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    setParallaxEnabled(true);

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const photoTx = parallaxEnabled ? (mouse.x - 0.5) * PHOTO_TX_RANGE : 0;
  const photoTy = parallaxEnabled ? (mouse.y - 0.5) * PHOTO_TY_RANGE : 0;
  const termTx = parallaxEnabled ? (mouse.x - 0.5) * TERM_TX_RANGE : 0;
  const termTy = parallaxEnabled ? (mouse.y - 0.5) * TERM_TY_RANGE : 0;

  const photoStyle = {
    transform: `translate(${photoTx}px, ${photoTy}px)`,
    transition: PARALLAX_TRANSITION,
  };

  const terminalStyle = {
    transform: `translate(${termTx}px, ${termTy}px)`,
    transition: PARALLAX_TRANSITION,
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      <div className="relative flex-1">
        <CursorSpotlight size={700} intensity={0.18} accent="#DC2626" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 px-6 md:px-12 pt-28 pb-12 max-w-[1440px] mx-auto items-center">
          {/* Left column — headline + paragraph + CTAs + stats */}
          <div className="relative">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500 mb-6">
                <span className="rounded-[4px] border border-[#DC2626]/30 bg-[#DC2626]/15 px-2 py-[3px] font-semibold uppercase tracking-[0.1em] text-[#DC2626]">
                  v5.2
                </span>
                <span className="text-zinc-700">—</span>
                <span>Senior Software Engineer · 2021→now</span>
              </div>
            </Reveal>

            <h1
              ref={headlineRef}
              className="font-headline font-extrabold tracking-tight leading-[0.95] text-white text-balance text-[40px] sm:text-[52px] md:text-[72px] lg:text-[72px]"
            >
              <span data-word className="inline-block">I</span>{' '}
              <span data-word className="inline-block">build</span>{' '}
              <span data-word className="inline-block">platforms</span>
              <br />
              <span data-word className="inline-block">that</span>{' '}
              <span data-word className="inline-block">don&apos;t</span>{' '}
              <span data-word className="inline-block">page</span>{' '}
              <span data-word className="inline-block">you</span>
              <br />
              <span className="relative inline-block">
                <span data-word className="inline-block">at</span>{' '}
                <span data-word className="inline-block text-[#DC2626]">
                  3am
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[8%] h-3.5 bg-[#DC2626]/30 -z-10 rounded"
                />
              </span>
              <span className="text-white/40">.</span>
            </h1>

            <Reveal delay={240}>
              <p className="max-w-md text-zinc-400 text-base leading-relaxed mt-6">
                Backend-heavy, frontend-polished, production-paranoid. Five
                years shipping at{' '}
                <span className="text-white font-medium">Amazon</span> and{' '}
                <span className="text-white font-medium">AB&nbsp;InBev</span>{' '}
                — design systems, cloud platforms, the boring infrastructure
                that lets product teams move fast.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="flex gap-3 mt-8 flex-wrap">
                <a
                  href="#contact"
                  className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-6 py-3.5 rounded-[10px] text-sm font-semibold shadow-[0_8px_24px_rgba(220,38,38,0.3)] inline-flex items-center gap-2 transition"
                >
                  Get in touch <span className="opacity-60">→</span>
                </a>
                <a
                  href="/resume"
                  className="border border-white/15 hover:border-white/30 text-white px-6 py-3.5 rounded-[10px] text-sm font-medium inline-flex items-center gap-2 transition"
                >
                  View resume <span className="opacity-60">→</span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <div className="flex gap-6 sm:gap-10 mt-12 pt-6 border-t border-white/[0.08]">
                <CountStat n={5} suffix="+" label="years" />
                <CountStat n={3} suffix="" label="roles" />
                <CountStat n={2} suffix="" label="companies" />
              </div>
            </Reveal>
          </div>

          {/* Right column — layered photo + terminal with parallax */}
          <Reveal delay={300} className="relative min-h-[480px]">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr] gap-4 items-stretch">
              <PhotoCard
                photoSrc="/images/sanchit-portrait.png"
                alt="Sanchit Agarwal"
                style={photoStyle}
              />
              <Terminal style={terminalStyle} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-zinc-500/60 font-body text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-zinc-500/60" />
      </div>
    </section>
  );
}
