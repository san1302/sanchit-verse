'use client'

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiGraphql,
  SiDocker,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiCplusplus,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'

interface TechItem {
  readonly name: string
  readonly icon: IconType
}

const TECH_STACK: readonly TechItem[] = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'AWS', icon: FaAws },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Docker', icon: SiDocker },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Git', icon: SiGit },
  { name: 'C++', icon: SiCplusplus },
] as const

export default function TechStack() {
  return (
    <section id="skills" className="py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
          Tech Stack
        </h2>
        <p className="text-[#c6c6c7] font-body mb-16">
          Technologies I work with daily.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="glass-card p-8 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:border-[#22D3EE]/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
            >
              <tech.icon className="text-2xl text-white" />
              <span className="text-[10px] uppercase tracking-widest text-[#c6c6c7] font-body">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
