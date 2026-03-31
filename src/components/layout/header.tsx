'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import * as React from 'react';
import { ThemeToggle } from '@/components/theme-toggle'; // Import ThemeToggle
import Image from "next/image";

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/articles', label: 'Articles' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/resume', label: 'Resume' },
  { href: '/meet', label: 'Meet' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/images/logo-sanchit-verse.png"
            alt="Sanchit Agarwal Logo"
            width={40}
            height={200}
          />
          {/* <span className="font-bold hidden sm:inline-block">Sanchit Agarwal</span> */}
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // Use template literals for class names
              className={`transition-colors hover:text-foreground/80 ${
                pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/60' // Adjusted active state style
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-2 ml-auto"> {/* Added ml-auto to push theme toggle to the right */}
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
           <ThemeToggle /> {/* Add theme toggle for mobile */}
           {/* Basic button for mobile menu toggle */}
           <button
             onClick={toggleMobileMenu}
             className="btn btn-ghost btn-icon ml-2" // Use Tailwind button classes
             aria-label="Toggle Menu"
            >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Sheet replacement) */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Overlay */}
         <div
            className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={closeMobileMenu}
        />
        {/* Content */}
        <div className="fixed left-0 top-0 h-full w-3/4 max-w-xs bg-background p-6 shadow-lg z-50">
             <button
                 onClick={closeMobileMenu}
                 className="absolute top-4 right-4 btn btn-ghost btn-icon" // Use Tailwind button classes
                 aria-label="Close menu"
             >
                 <X className="h-5 w-5" />
             </button>
          <Link href="/" className="flex items-center mb-8" onClick={closeMobileMenu}>
             <Image
               src="/images/logo-sanchit-verse.png"
               alt="Sanchit Agarwal Logo"
               width={32}
               height={32}
               className="rounded bg-white p-1"
             />
            <span className="font-bold">Sanchit Agarwal</span>
          </Link>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`text-lg transition-colors hover:text-foreground/80 py-2 ${
                  pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
