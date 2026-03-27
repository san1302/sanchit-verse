'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 sm:gap-8 bg-zinc-900/60 backdrop-blur-xl rounded-full mt-6 mx-auto w-fit px-4 py-2.5 sm:px-6 sm:py-3 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="text-xl font-bold tracking-tighter text-white font-headline">
        SA
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ label, href }) => {
          const sectionId = href.slice(1)
          const isActive = activeSection === sectionId

          return (
            <a
              key={href}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={`relative font-body tracking-[0.2em] text-[10px] uppercase transition-colors duration-300 ${
                isActive
                  ? "text-white after:content-[''] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:bg-red-600 after:rounded-full"
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          )
        })}
      </div>

      <button
        className="md:hidden text-zinc-400 hover:text-white transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
    </nav>
  )
}
