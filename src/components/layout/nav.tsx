'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export function Nav() {
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4 sm:mx-auto sm:mt-6 sm:w-fit">
        <div className="flex items-center justify-between bg-zinc-900/60 backdrop-blur-xl rounded-2xl sm:rounded-full px-5 py-3 sm:px-6 sm:py-3 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] sm:gap-8">
          {/* Logo */}
          <Image
            src="/favicon-512.png"
            alt="SA"
            width={36}
            height={36}
            className=""
          />

          {/* Desktop Links */}
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

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-zinc-400 transition-colors duration-300 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Nav links */}
          <div className="flex flex-col items-center gap-2">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleClick(e, href)}
                className="text-2xl font-headline text-white py-4 hover:text-zinc-400 transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
