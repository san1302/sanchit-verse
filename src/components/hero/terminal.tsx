'use client';

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';

type TerminalProps = {
  className?: string;
  style?: CSSProperties;
};

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string }
  | { kind: 'json' };

const ACCENT = '#DC2626';
const TYPE_BASE_MS = 50;
const TYPE_JITTER_MS = 30;
const POST_CMD_PAUSE_MS = 280;
const POST_JSON_PAUSE_MS = 600;
const POST_OUT_PAUSE_MS = 350;

const SCRIPT: ReadonlyArray<Line> = [
  { kind: 'cmd', text: 'cat identity.json' },
  { kind: 'json' },
  { kind: 'cmd', text: 'uptime' },
  { kind: 'out', text: '5y 2mo · 99.94% sla · 0 pages this week' },
  { kind: 'cmd', text: './hire-me' },
];

/**
 * Terminal-style panel that auto-types a small shell session. The full final
 * state is rendered immediately when the user prefers reduced motion.
 */
export function Terminal({ className, style }: TerminalProps) {
  const script = useMemo(() => SCRIPT, []);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');

  // Detect reduced-motion preference and snap to the end if requested.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setStep(script.length);
      setTyped('');
    }
    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setStep(script.length);
        setTyped('');
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [script.length]);

  // Drive the typing animation. Each effect schedules a single timeout so
  // unmounting / state changes cleanly cancel the next tick.
  useEffect(() => {
    if (reducedMotion) return;
    if (step >= script.length) return;

    const current = script[step];

    if (current.kind === 'json') {
      const t = setTimeout(() => setStep((s) => s + 1), POST_JSON_PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (current.kind === 'out') {
      const t = setTimeout(() => setStep((s) => s + 1), POST_OUT_PAUSE_MS);
      return () => clearTimeout(t);
    }

    // cmd: type one character at a time, then pause and advance.
    if (typed.length < current.text.length) {
      const delay = TYPE_BASE_MS + Math.random() * TYPE_JITTER_MS;
      const t = setTimeout(
        () => setTyped(current.text.slice(0, typed.length + 1)),
        delay,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setTyped('');
      setStep((s) => s + 1);
    }, POST_CMD_PAUSE_MS);
    return () => clearTimeout(t);
  }, [reducedMotion, script, step, typed]);

  const containerClasses = [
    'relative',
    'overflow-hidden',
    'rounded-[12px]',
    'border',
    'border-white/[0.08]',
    'bg-[#0f0f12]/85',
    'backdrop-blur-xl',
    'font-mono',
    'text-[13px]',
    'leading-[1.7]',
    'shadow-[0_40px_80px_rgba(0,0,0,0.5)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} style={style}>
      {/* Blink keyframe — scoped here so the component is fully self-contained. */}
      <style>{`
        @keyframes heroTerminalBlink { 50% { opacity: 0; } }
      `}</style>

      {/* Title bar */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="block h-3 w-3 rounded-full bg-zinc-800" />
        <span className="block h-3 w-3 rounded-full bg-zinc-800" />
        <span className="block h-3 w-3 rounded-full bg-zinc-800" />
        <div className="flex-1" />
        <span className="text-[11px] text-zinc-600">~/sanchit/about.sh</span>
      </div>

      {/* Body */}
      <div className="min-h-[360px] p-5">
        {script.slice(0, step).map((line, i) => (
          <RenderedLine key={i} line={line} />
        ))}

        {/* In-flight typing line */}
        {step < script.length && script[step].kind === 'cmd' && (
          <div className="text-[#e2e2e2]">
            <Prompt />
            <span className="ml-2 text-white">{typed}</span>
            <Caret />
          </div>
        )}

        {/* Idle prompt at the end */}
        {step >= script.length && (
          <div className="text-[#e2e2e2]">
            <Prompt />
            <Caret />
          </div>
        )}
      </div>
    </div>
  );
}

function RenderedLine({ line }: { line: Line }) {
  if (line.kind === 'cmd') {
    return (
      <div className="text-[#e2e2e2]">
        <Prompt />
        <span className="ml-2 text-white">{line.text}</span>
      </div>
    );
  }
  if (line.kind === 'out') {
    return (
      <div className="mb-2 mt-0.5 pl-4 text-zinc-400">{line.text}</div>
    );
  }
  return <JsonBlock />;
}

function JsonBlock() {
  return (
    <div className="mb-2 mt-0.5 whitespace-pre pl-4 text-zinc-400">
      {'{'}
      {'\n'}
      {'  '}
      <JKey>name</JKey>: <JStr>&quot;Sanchit Agarwal&quot;</JStr>,{'\n'}
      {'  '}
      <JKey>role</JKey>: <JStr>&quot;Sr. Software Engineer&quot;</JStr>,{'\n'}
      {'  '}
      <JKey>at</JKey>: <JStr>&quot;AB InBev&quot;</JStr>,{'\n'}
      {'  '}
      <JKey>prev</JKey>: <JStr>&quot;Amazon (2021–22)&quot;</JStr>,{'\n'}
      {'  '}
      <JKey>loc</JKey>: <JStr>&quot;Bengaluru, IN&quot;</JStr>,{'\n'}
      {'  '}
      <JKey>stack</JKey>: [<JArr>&quot;TS&quot;</JArr>, <JArr>&quot;Node&quot;</JArr>,{' '}
      <JArr>&quot;AWS&quot;</JArr>, <JArr>&quot;Next&quot;</JArr>],{'\n'}
      {'  '}
      <JKey>available</JKey>: <JArr>true</JArr>
      {'\n'}
      {'}'}
    </div>
  );
}

function JKey({ children }: { children: ReactNode }) {
  return <span className="text-sky-300">&quot;{children}&quot;</span>;
}
function JStr({ children }: { children: ReactNode }) {
  return <span className="text-amber-200">{children}</span>;
}
function JArr({ children }: { children: ReactNode }) {
  return <span className="text-emerald-300">{children}</span>;
}

function Prompt() {
  return (
    <span className="font-bold" style={{ color: ACCENT }}>
      $
    </span>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-1 inline-block align-middle"
      style={{
        width: 8,
        height: 16,
        background: ACCENT,
        animation: 'heroTerminalBlink 1s step-end infinite',
      }}
    />
  );
}
