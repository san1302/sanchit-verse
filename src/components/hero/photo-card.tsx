import type { CSSProperties } from 'react';
import Image from 'next/image';

type PhotoCardProps = {
  photoSrc: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Server-rendered framed photo card with a bottom vignette, caption strip
 * and a small frame label in the top-left corner. The `style` prop is
 * exposed so a client parent can apply a parallax transform.
 */
export function PhotoCard({ photoSrc, alt, className, style }: PhotoCardProps) {
  // `h-full` so the card fills its grid cell when used inside a stretch grid
  // (matches the design's `alignItems: 'stretch'` behavior — photo height
  // tracks the terminal). `aspect-[3/4]` remains as a fallback for any
  // future use outside a stretch context — when the parent has no explicit
  // height, height:100% resolves to auto and aspect-ratio takes over.
  const wrapperClasses = [
    'relative',
    'aspect-[3/4]',
    'h-full',
    'w-full',
    'overflow-hidden',
    'rounded-[12px]',
    'border',
    'border-white/[0.08]',
    'bg-[#0e0e13]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      {/* Photo */}
      <Image
        src={photoSrc}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Top-left frame label */}
      <div className="absolute left-3 top-3 rounded-[3px] border border-white/10 bg-black/50 px-[7px] py-[3px] font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">
        ID · 0001
      </div>

      {/* Bottom caption strip — left: name + year stamp, right: green pulse
          dot (online echo). Year stamp reads like photo metadata, matching
          the contact-sheet feel of the ID·0001 label up top. */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3.5 pb-3 pt-3 font-mono text-[10px] tracking-[0.05em] text-zinc-400">
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">
            Sanchit Agarwal
          </div>
          <div>Bengaluru, IN · 2026</div>
        </div>
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]"
        />
      </div>
    </div>
  );
}
