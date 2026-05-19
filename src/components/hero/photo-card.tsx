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
  const wrapperClasses = [
    'relative',
    'aspect-[3/4]',
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
      <div className="absolute left-3 top-3 rounded-[3px] border border-white/10 bg-black/50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">
        ID · 0001
      </div>

      {/* Bottom caption strip */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3.5 pb-3 pt-3 font-mono text-[10px] tracking-[0.05em] text-zinc-400">
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-white">
            Sanchit Agarwal
          </div>
          <div>Bengaluru, IN · Senior Software Engineer</div>
        </div>
      </div>
    </div>
  );
}
