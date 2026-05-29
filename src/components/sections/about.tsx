import Image from 'next/image'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

/**
 * About — three-block layout matching the Stitch design's MAbout (mobile)
 * and AboutSection (desktop). Server Component; entrance handled by Reveal.
 *
 * Mobile (single column):  Eyebrow+H2 → Photo card → Bio paragraphs
 * Desktop (12-col grid):   Left column = Eyebrow+H2 above bio; right column
 *                          = Photo card spanning both rows.
 *
 * Photo is a plain 4/5 card (no device frame, no role pills, no glow) with
 * a mono "identity · capture" label top-left and a caption strip at the
 * bottom showing name + location + a red ↗ accent.
 */
export default function About() {
  return (
    <section
      id="about"
      className="border-t border-white/[0.06] bg-black py-16 md:py-32 px-5 sm:px-6"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:gap-16 items-start">
        {/* Block 1 — Eyebrow + heading */}
        <Reveal className="md:col-span-7 md:row-start-1">
          <Eyebrow num="01" label="about" />
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-balance m-0">
            Engineering as a craft of{' '}
            <span className="italic font-serif text-[#DC2626]">quiet</span>{' '}
            reliability.
          </h2>
        </Reveal>

        {/* Block 2 — Photo card (simple identity card with caption strip).
            On mobile sits between the heading and bio paragraphs via DOM
            order; on desktop spans both grid rows in the right column. */}
        <Reveal
          delay={100}
          className="md:col-span-5 md:row-start-1 md:row-span-2"
        >
          <div className="relative overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#0e0e13] aspect-[4/5]">
            <Image
              src="/images/sanchit-portrait-2.png"
              alt="Sanchit Agarwal"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 335px, 420px"
            />

            {/* "identity · capture" label, top-left */}
            <div className="absolute top-3 left-3 rounded-[3px] border border-white/10 bg-black/50 px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">
              identity · capture
            </div>

            {/* Bottom caption strip (gradient → black) */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-b from-transparent to-black/85 px-3.5 pt-10 pb-3.5 font-mono text-[10px] text-zinc-400">
              <div>
                <div className="text-[11px] font-semibold text-white">
                  Sanchit Agarwal
                </div>
                <div>Bengaluru, IN</div>
              </div>
              <span className="text-[#DC2626]">↗</span>
            </div>
          </div>
        </Reveal>

        {/* Block 3 — Bio paragraphs (kept unchanged per scope decision). */}
        <Reveal
          delay={200}
          className="md:col-span-7 md:row-start-2 md:self-start"
        >
          <p className="font-body text-base leading-relaxed text-[#c6c6c7] mb-6">
            With over{' '}
            <span className="text-white font-medium">
              5+ years of experience
            </span>{' '}
            at global giants like{' '}
            <span className="text-white font-medium">Amazon</span> and{' '}
            <span className="text-white font-medium">AB InBev</span>, I
            specialize in architecting scalable platforms and robust design
            systems. My focus lies at the intersection of high-performance
            cloud-native architectures and seamless user experiences.
          </p>

          <p className="font-body text-base leading-relaxed text-[#c6c6c7]">
            Beyond writing code, I am a tech mentor and an advocate for
            blending technology with creativity. I believe that engineering
            isn&apos;t just about solving problems—it&apos;s about building
            digital environments that feel as fluid and intentional as
            high-end physical products.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
