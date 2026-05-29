import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

/**
 * /resume — standalone dossier page promoted from Stitch Design B
 * ("The Dossier"). Two-column on desktop: sticky left rail with portrait +
 * identity + contact + links + skills + education; right main with a
 * `$ whoami` lead, the experience timeline, and the HireGenie side project.
 *
 * Lives outside the `(main)` route group on purpose — it has its own sticky
 * page bar (back-to-portfolio + Download PDF), so the floating site header
 * would clash. Mobile collapses to a single column at `md:` breakpoint.
 *
 * Source content: Sanchit_resume_2026.pdf (last updated 26 Apr 2026).
 */

const ACCENT = '#DC2626';

type Experience = {
  company: string;
  role: string;
  dates: string;
  loc: string;
  current?: boolean;
  bullets: string[];
};

type SkillGroup = { group: string; items: string[] };

type ResumeLink = { label: string; proto: string; value: string; href: string };

const RESUME = {
  name: 'Sanchit Agarwal',
  title: 'Senior Software Engineer',
  email: 'san@sanchit-verse.com',
  phone: '+91 7355144155',
  location: 'Bengaluru, India',

  links: [
    {
      label: 'Portfolio',
      proto: 'Portfolio://',
      value: 'sanchit-verse.com',
      href: 'https://sanchit-verse.com',
    },
    {
      label: 'GitHub',
      proto: 'Github://',
      value: 'san1302',
      href: 'https://github.com/san1302',
    },
    {
      label: 'LinkedIn',
      proto: 'LinkedIn://',
      value: 'sanchitagarwal0332',
      href: 'https://linkedin.com/in/sanchitagarwal0332',
    },
  ] satisfies ResumeLink[],

  sideProject: {
    name: 'HireGenie',
    url: 'hiregenie.io',
    href: 'https://hiregenie.io',
    blurb:
      'Most AI cover-letter tools write the kind of letter no human would send. HireGenie scores its own output against the ATS the recruiter actually uses, and rewrites until the score clears. Built solo on React, Node, and LLM APIs.',
    tags: ['React', 'Node', 'LLM APIs'],
  },

  education: {
    school: 'BIT Mesra',
    degree: 'BE in Information Technology',
    meta: 'Graduated 2021 · Ranchi, India',
  },

  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
    {
      group: 'Frontend',
      items: ['React', 'Redux', 'Next.js', 'Tailwind', 'Design Systems'],
    },
    {
      group: 'Backend & Data',
      items: ['Node.js', 'GraphQL', 'MongoDB', 'Azure SQL', 'Cosmos DB', 'MSSQL'],
    },
    {
      group: 'Cloud',
      items: [
        'AWS · Lambda · S3 · DynamoDB · Fargate',
        'Azure · Functions · Data Factory · DevOps',
      ],
    },
    {
      group: 'AI / Agentic',
      items: ['Claude Code', 'GitHub Copilot', 'MCP Servers', 'Cursor'],
    },
  ] satisfies SkillGroup[],

  experience: [
    {
      company: 'AB InBev',
      role: 'Senior Software Engineer',
      dates: 'Feb 2025 — Present',
      loc: 'Bangalore, India',
      current: true,
      bullets: [
        "Built Cortex, AB InBev's productivity platform for 5,000–7,000 engineers. Tracks GitHub Copilot adoption and per-developer throughput. Replaced $1M/yr LinearB and saved $600K Y1, $1M/yr ongoing.",
        'Shipped Cortex at 20% of the original T-shirt estimate using agentic Claude Code workflows. Biggest of 5–7 Anthropic POCs at AB InBev — pushed leadership to roll out enterprise Claude alongside Copilot.',
        'Built CodePulse, an in-house static code analysis platform covering 10,000+ repositories on Azure DevOps and GitHub. Replaced SonarCloud company-wide and saved $400K/yr in licensing.',
        'Built MCP servers connecting Azure SQL and Cosmos DB to Claude Code and Cursor. 3,000–4,000 engineers use them today for agentic data access. Wrote the auth layer and prompt-injection guardrails.',
        "Started and run AB InBev's AI Engineering Guild — a monthly cross-team forum on agentic workflows, MCP recipes, and Claude Code / Cursor patterns. 5,000+ members today.",
      ],
    },
    {
      company: 'AB InBev',
      role: 'Software Engineer',
      dates: 'Apr 2023 — Feb 2025',
      loc: 'Bangalore, India',
      bullets: [
        "Built and shipped AB InBev's Global Design System, published as an internal NPM package. 20,000+ downloads, used by product teams across every global zone.",
        'Built DevBrewery, a unified analytics platform that pulled multiple Power BI dashboards (DevOps cost, infra, code KPIs) into a single React + Node + GraphQL stack. Cut data retrieval time 30% for 50+ teams.',
        'Built a self-service portal automating Azure DevOps tool access (replacing ServiceNow). Saved $20K/yr in cross-charging and dropped provisioning from days to minutes.',
      ],
    },
    {
      company: 'Amazon',
      role: 'Software Engineer (SDE I)',
      dates: 'Aug 2021 — Dec 2022',
      loc: 'Bangalore, India',
      bullets: [
        "Owned the CIBIL consent flow for Amazon Pay's Free Credit Score feature, shipping the RBI-mandated work in under 3 weeks to hit a hard regulatory deadline.",
        "Automated internal installment-plan tools at Amazon Pay, including a bulk-update feature that wiped out the team's manual operations work.",
      ],
    },
    {
      company: 'Amazon',
      role: 'Software Engineering Intern',
      dates: 'Jan 2021 — Jul 2021',
      loc: 'Bangalore, India',
      bullets: [
        'Built a secure internal channel that handled confidential file exchange with lenders from intake through processing to storage. Used AWS Lambda, Data Pipeline, Fargate, DynamoDB, and S3.',
      ],
    },
  ] satisfies Experience[],
};

export const metadata: Metadata = {
  title: 'Resume — Sanchit Agarwal',
  description:
    'Senior Software Engineer. AI/agentic platforms, design systems, cloud-native architecture. Cortex, CodePulse, MCP servers, AB InBev, Amazon.',
};

export default function ResumePage() {
  return (
    <>
      <PageBar />
      <div className="mx-auto max-w-[1120px] border-l border-r border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
          <Rail />
          <Main />
        </div>
      </div>
    </>
  );
}

/* ───────── Page bar (sticky top) ───────── */

function PageBar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-white/[0.07] bg-[#08080a]/[0.72] px-[18px] py-[13px] backdrop-blur-xl md:px-7 md:py-4">
      <div className="flex items-center gap-3.5">
        <Link
          href="/"
          aria-label="Back to portfolio home"
          className="grid h-[30px] w-[30px] place-items-center rounded-[7px] bg-[#DC2626] font-headline text-xs font-extrabold text-white no-underline"
        >
          SA
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 no-underline transition-colors hover:text-white"
        >
          <span aria-hidden>←</span> Back to portfolio
        </Link>
      </div>
      <a
        href="/Sanchit_Agarwal_Resume.pdf"
        download
        className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold tracking-[0.02em] text-white no-underline transition-all hover:border-[#DC2626] hover:bg-[#DC2626] hover:text-white hover:shadow-[0_8px_24px_rgba(220,38,38,0.32)]"
      >
        <DownloadIcon />
        Download PDF
      </a>
    </header>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 1v8M3.5 6.5L7 10l3.5-3.5M2 12.5h10" />
    </svg>
  );
}

/* ───────── Left rail ───────── */

function RailHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
      {children}
    </div>
  );
}

function Rail() {
  return (
    <aside className="border-b border-white/[0.07] bg-[#0c0c0f] px-[22px] pb-9 pt-8 md:border-b-0 md:border-r md:px-[34px] md:pb-12 md:pt-10">
      {/* Portrait — capped + centered on mobile so it doesn't stretch the
          full viewport width on phones; full rail width on desktop. */}
      <div className="relative mx-auto mb-6 aspect-[4/5] max-w-[300px] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#15151b] md:mx-0 md:max-w-none">
        <Image
          src="/images/sanchit-portrait-2.png"
          alt={RESUME.name}
          fill
          priority
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover object-top"
        />
        <div className="absolute left-3 top-3 rounded-[3px] border border-white/10 bg-black/50 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-zinc-400">
          available · 2026
        </div>
      </div>

      <h1 className="m-0 mb-2 font-headline text-[30px] font-extrabold leading-none tracking-[-0.035em] text-white">
        {RESUME.name}
      </h1>
      <div className="mb-7 text-[13.5px] font-semibold text-[#DC2626]">
        {RESUME.title}
      </div>

      {/* Contact */}
      <RailHead>Contact</RailHead>
      <div className="mb-[30px] flex flex-col gap-[9px]">
        <a
          href={`mailto:${RESUME.email}`}
          className="text-[13px] text-white no-underline hover:text-white"
        >
          {RESUME.email}
        </a>
        <div className="text-[13px] text-zinc-400">{RESUME.phone}</div>
        <div className="text-[13px] text-zinc-400">{RESUME.location}</div>
      </div>

      {/* Links — `Proto://value` in mono, accent on the protocol part */}
      <RailHead>Links</RailHead>
      <div className="mb-[30px] flex flex-col gap-2">
        {RESUME.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11.5px] text-zinc-400 no-underline"
          >
            <span className="text-[#DC2626]">{l.proto}</span>{' '}
            <span className="text-zinc-200">{l.value}</span>
          </a>
        ))}
      </div>

      {/* Skills */}
      <RailHead>Skills</RailHead>
      <div className="mb-[30px] flex flex-col gap-4">
        {RESUME.skills.map((s) => (
          <div key={s.group}>
            <div className="mb-[7px] text-[10.5px] uppercase tracking-[0.1em] text-zinc-500">
              {s.group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((it) => (
                <span
                  key={it}
                  className="rounded-md border border-white/[0.07] bg-white/[0.04] px-[9px] py-1 text-[11px] text-[#c6c6c7]"
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <RailHead>Education</RailHead>
      <div className="font-headline text-base font-bold text-white">
        {RESUME.education.school}
      </div>
      <div className="mb-[3px] text-[12.5px] text-zinc-400">
        {RESUME.education.degree}
      </div>
      <div className="font-mono text-[10.5px] text-zinc-500">
        {RESUME.education.meta}
      </div>
    </aside>
  );
}

/* ───────── Right main ───────── */

function Main() {
  return (
    <main className="px-[22px] pb-12 pt-9 md:px-14 md:pb-14 md:pt-12">
      {/* whoami statement — terminal-style lead in */}
      <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.26em] text-zinc-500">
        <span className="text-[#DC2626]">$</span> whoami
      </div>
      <p className="mb-11 font-headline text-[18px] font-medium leading-[1.45] tracking-[-0.015em] text-zinc-200 text-pretty md:text-[21px]">
        I gave up trying to out-code the model. The fight now is who can{' '}
        <span className="text-[#DC2626]">orchestrate</span> best. The edge is in
        knowing what AI doesn&apos;t.
      </p>

      {/* Experience */}
      <div className="mb-[22px] font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-600">
        Experience
      </div>
      <div className="flex flex-col gap-3.5">
        {RESUME.experience.map((e, i) => (
          <ExperienceCard key={`${e.company}-${i}`} exp={e} />
        ))}
      </div>

      {/* Side Project */}
      <div className="mb-[22px] mt-10 font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-600">
        Side Project
      </div>
      <article className="rounded-[12px] border border-[#DC2626]/20 bg-gradient-to-br from-[#DC2626]/[0.07] to-[#0f0f12]/70 px-7 py-[26px]">
        <div className="mb-3 flex items-baseline gap-3">
          <h3 className="m-0 font-headline text-xl font-bold tracking-[-0.02em] text-white">
            {RESUME.sideProject.name}
          </h3>
          <a
            href={RESUME.sideProject.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#DC2626] no-underline"
          >
            ↗ {RESUME.sideProject.url}
          </a>
        </div>
        <p className="mb-4 text-[13.5px] leading-relaxed text-[#b4b4b8] text-pretty">
          {RESUME.sideProject.blurb}
        </p>
        <div className="flex gap-[7px]">
          {RESUME.sideProject.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10.5px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </main>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const borderClass = exp.current
    ? 'border-[#DC2626]/[0.28]'
    : 'border-white/[0.08]';

  return (
    <article
      className={`rounded-[12px] border ${borderClass} bg-[#0f0f12]/70 px-[26px] py-6`}
    >
      {/* Card header: role/company left, dates/location right. `flex-wrap`
          lets the date block drop below the role on narrow screens instead
          of crowding it. On mobile the date block left-aligns and uses
          " · " inline; on desktop it right-aligns with dates and loc
          stacked on two lines. */}
      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h3 className="m-0 mb-[3px] font-headline text-[19px] font-bold tracking-[-0.02em] text-white">
            {exp.role}
          </h3>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#DC2626]">
            {exp.current && (
              <span
                aria-label="Current role"
                className="inline-block h-[7px] w-[7px] rounded-full bg-[#DC2626] shadow-[0_0_10px_rgba(220,38,38,0.8)]"
              />
            )}
            {exp.company}
          </div>
        </div>
        <div className="shrink-0 text-left font-mono text-[11px] leading-[1.6] text-zinc-500 md:text-right">
          {exp.dates}
          <span className="md:hidden"> · </span>
          <br className="hidden md:inline" />
          <span className="text-zinc-600">{exp.loc}</span>
        </div>
      </div>
      <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
        {exp.bullets.map((b, j) => (
          <li
            key={j}
            className="relative pl-5 text-[13.5px] leading-relaxed text-zinc-400 text-pretty"
          >
            <span
              aria-hidden
              className="absolute left-0 top-[10px] h-[1.5px] w-1.5 bg-[#DC2626]"
            />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}
