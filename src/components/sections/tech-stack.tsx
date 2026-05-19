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
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

interface TechItem {
  readonly name: string
  readonly icon: IconType
  readonly color: string
}

const TECH_STACK: readonly TechItem[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
] as const

export default function TechStack() {
  return (
    <section id="skills" className="py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Eyebrow num="03" label="stack" />
        </div>
        <Reveal>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">
            Tech Stack
          </h2>
          <p className="text-[#c6c6c7] font-body mb-16">
            Technologies I work with daily.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {TECH_STACK.map((tech, i) => (
            <Reveal key={tech.name} delay={120 + i * 40}>
              <div
                className="glass-card p-8 rounded-[12px] flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:scale-105 hover:border-[#22D3EE]/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              >
                <tech.icon className="text-2xl" style={{ color: tech.color }} />
                <span className="text-[10px] uppercase tracking-widest text-[#c6c6c7] font-body">
                  {tech.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
