'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

/**
 * About — pinned section with line-by-line bio reveal as user scrolls.
 *
 * Flow:
 *  1. Section enters viewport → Reveal fades eyebrow + heading up (one-shot).
 *  2. Section top hits viewport top → ScrollTrigger PINS the section.
 *  3. As user scrolls within pinned range (1× viewport), each bio line fades+
 *     translates up in stagger via SplitText. Driven by `scrub`.
 *  4. Last line settled → pin releases, user scrolls past normally.
 *
 * Reduced motion: skip pin/scrub entirely. Lines render in their natural
 * visible state. Reveal still works (it has its own reduced-motion check).
 */
export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bioRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (
        typeof window === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return
      }

      const bio = bioRef.current
      if (!bio) return

      // Split bio paragraphs into individual line spans. SplitText handles
      // viewport-aware wrapping — lines re-count if the user resizes.
      const split = new SplitText(bio.querySelectorAll('p'), {
        type: 'lines',
        linesClass: 'about-bio-line',
      })

      gsap.set(split.lines, { y: 30, opacity: 0 })

      const tween = gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        ease: 'none',
        duration: 0.5,
        stagger: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        split.revert()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 md:py-32 px-6 bg-black"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 max-w-6xl mx-auto items-center">
        {/* Left Column: Content */}
        <div className="md:col-span-7">
          <Reveal>
            <Eyebrow num="01" label="about" />

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8 text-balance">
              Engineering as a craft<br />
              of{' '}
              <span className="italic font-serif text-[#DC2626]">quiet</span>{' '}
              reliability.
            </h2>
          </Reveal>

          {/* Bio paragraphs — line-by-line scrub-reveal via ScrollTrigger.
              Do NOT wrap in Reveal — ScrollTrigger fully controls visibility. */}
          <div ref={bioRef}>
            <p className="text-[#c6c6c7] font-body text-base leading-relaxed mb-6">
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

            <p className="text-[#c6c6c7] font-body text-base leading-relaxed">
              Beyond writing code, I am a tech mentor and an advocate for
              blending technology with creativity. I believe that engineering
              isn&apos;t just about solving problems—it&apos;s about building
              digital environments that feel as fluid and intentional as
              high-end physical products.
            </p>
          </div>

          <a
            href="#contact"
            className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-6 py-3.5 rounded-[10px] text-sm font-semibold shadow-[0_8px_24px_rgba(220,38,38,0.3)] inline-flex items-center gap-2 transition mt-8"
          >
            Get in touch <span className="opacity-60">→</span>
          </a>
        </div>

        {/* Right Column: Portrait */}
        <Reveal
          delay={120}
          className="md:col-span-5 order-first md:order-last"
        >
          <div className="relative flex justify-center">
            {/* Red glow behind portrait */}
            <div className="absolute inset-0 editorial-glow" />

            {/* Device frame */}
            <div className="w-full max-w-[280px] aspect-[3/4] sm:max-w-[300px] md:max-w-none md:w-[380px] md:h-[500px] md:aspect-auto bg-surface-container-lowest rounded-[3rem] p-4 shadow-2xl mx-auto relative group">
              {/* Portrait */}
              <div className="w-full h-full rounded-[2.5rem] bg-black overflow-hidden relative">
                <Image
                  src="/images/sanchit-portrait.png"
                  alt="Sanchit Agarwal"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 380px"
                />
              </div>

              {/* Floating role pills */}
              <div className="hidden sm:block absolute bottom-20 -left-4 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
                Full-Stack Developer
              </div>
              <div className="hidden sm:block absolute bottom-32 -right-8 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
                Cloud Architect
              </div>
              <div className="hidden sm:block absolute bottom-8 -right-4 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
                Software Engineer
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
