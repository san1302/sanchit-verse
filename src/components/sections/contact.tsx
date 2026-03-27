import { Mail, Linkedin, Github, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SocialLink {
  readonly label: string
  readonly icon: LucideIcon
  readonly href: string
}

const SOCIALS: readonly SocialLink[] = [
  { label: 'Email', icon: Mail, href: 'mailto:sanchitagarwal0332@gmail.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sanchitagarwal0332/' },
  { label: 'GitHub', icon: Github, href: 'https://github.com/san1302' },
  { label: 'Twitter', icon: Twitter, href: '#' },
] as const

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40 px-6 bg-black relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] editorial-glow pointer-events-none" />

      <div className="text-center relative z-10">
        <p className="font-headline text-[5rem] sm:text-[6rem] md:text-[12rem] font-extrabold text-white leading-none mb-4 md:mb-8 select-none">
          SA
        </p>
        <h2 className="font-headline text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4">
          Let&apos;s build something amazing together.
        </h2>
        <p className="text-[#c6c6c7] font-body text-base sm:text-lg mb-8 md:mb-12">
          Drop me a message to discuss your next project or just say hi!
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto glass-card px-6 py-3 rounded-full flex items-center justify-center gap-3 text-white text-[11px] uppercase tracking-widest font-body font-bold hover:bg-[#DC2626] hover:border-transparent transition-all duration-300"
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
