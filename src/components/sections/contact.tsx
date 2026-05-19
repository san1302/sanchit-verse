import { Mail, Linkedin, Github, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ContactForm from '@/components/contact-form'
import { Reveal } from '@/components/ui/reveal'

interface SocialLink {
  readonly label: string
  readonly icon: LucideIcon
  readonly href: string
}

const SOCIALS: readonly SocialLink[] = [
  { label: 'Email', icon: Mail, href: 'mailto:sanchitagarwal0332@gmail.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sanchitagarwal0332/' },
  { label: 'GitHub', icon: Github, href: 'https://github.com/san1302' },
  { label: 'X', icon: Twitter, href: 'https://x.com/sanchit_verse' },
] as const

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 px-6 bg-black overflow-hidden"
    >
      {/* Atmospheric red glow from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(220, 38, 38, 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Headline */}
        <Reveal>
          <div className="text-center mb-16">
            {/* Terminal eyebrow with blinking caret */}
            <div className="flex justify-center mb-5">
              <div className="font-mono text-[11px] text-zinc-500 inline-flex items-center gap-3">
                <span className="text-[#DC2626] font-bold">$</span>
                <span className="text-white">./contact</span>
                <span
                  aria-hidden
                  className="inline-block w-2 h-3.5 bg-[#DC2626] motion-safe:animate-[caretBlink_1s_step-end_infinite]"
                />
              </div>
            </div>

            <h2 className="font-headline font-extrabold text-[2.5rem] md:text-[5rem] leading-[0.95] mb-6 text-white text-balance tracking-tight">
              Let&apos;s build something<br />
              <span className="italic font-serif text-[#DC2626]">worth shipping</span>.
            </h2>

            <div className="text-[#C6C6C7] font-body text-lg max-w-md mx-auto leading-relaxed">
              <p>Drop me a message or reach out directly</p>
              <p>— I&apos;ll get back within a day.</p>
            </div>
          </div>
        </Reveal>

        {/* Form + Social */}
        <div className="w-full max-w-[500px] mx-auto mb-20 px-4">
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>

          <Reveal delay={240}>
            {/* Separator */}
            <div className="flex items-center gap-4 my-12 opacity-40">
              <div className="h-px flex-1 bg-stone-800" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white whitespace-nowrap">
                Or find me on
              </span>
              <div className="h-px flex-1 bg-stone-800" />
            </div>

            {/* Social Pill Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white text-[11px] font-bold tracking-widest uppercase bg-[#1f1f24]/50 backdrop-blur-[12px] border border-[#5c403c33] hover:bg-[#DC2626] hover:border-[#DC2626] transition-all duration-300"
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
