import { Nav } from '@/components/layout/nav'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Experience from '@/components/sections/experience'
import TechStack from '@/components/sections/tech-stack'
import Contact from '@/components/sections/contact'
import SiteFooter from '@/components/layout/site-footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
