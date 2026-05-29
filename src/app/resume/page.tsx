import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

/**
 * /resume — standalone dossier page promoted from Stitch Design B
 * ("The Dossier"). Source content: Sanchit_resume_2026.pdf.
 *
 * Layout strategy
 * ───────────────
 * The desktop and mobile layouts are different enough that we render the
 * dossier body twice — once in a mobile-first vertical priority stack
 * (`md:hidden`) and once in a two-column desktop grid (`hidden md:grid`).
 * CSS hides the wrong one based on the breakpoint. No client JS, no
 * resize listener, no layout shift.
 *
 *   Desktop ≥768px → 320px sidebar (portrait + identity + contact + links
 *                    + skills + education) + main column (statement +
 *                    experience + side project)
 *   Mobile  <768px → priority-ordered single column:
 *                    horizontal compact identity → contact → links →
 *                    statement (with top border separator) →
 *                    experience → side project → skills → education
 *                    (skills + education move BELOW so work isn't
 *                    buried under the sidebar on phones)
 *
 * The body components (`ContactBody`, `LinksBody`, `SkillsBody`,
 * `EducationBody`, `StatementBlock`, `ExperienceBody`, `SideProjectBody`)
 * are shared — same DOM, same data, only their outer wrapping differs
 * by breakpoint.
 *
 * Lives outside the `(main)` route group on purpose — it has its own
 * sticky page bar (back-to-portfolio + Download PDF), so the floating
 * site header would collide.
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
      {/* mt-20/sm:mt-24 clears the fixed floating nav above. Borders only
          span the dossier so the gap above stays clean black, matching
          the homepage where the nav floats over the hero. */}
      <div className="mx-auto mt-20 max-w-[1120px] border-l border-r border-white/[0.06] sm:mt-24">
        <MobileDossier />
        <DesktopDossier />
      </div>
    </>
  );
}

/* ───────── Page bar (floating pill — matches homepage <Nav>) ─────────
 *
 * Same visual chrome as `src/components/layout/nav.tsx` so the resume
 * page reads as part of the site, not a separate template: fixed-centered
 * pill, `bg-zinc-900/60` + `backdrop-blur-xl`, white/10 border, large
 * drop shadow, 36×36 favicon logo on the left, mono-uppercase 10px nav
 * items at `tracking-[0.2em]`, zinc-400 default → white on hover.
 *
 * Resume-specific contents: the logo itself is the back-to-home link
 * (with a small `← Back` label revealed at sm+ to give the action
 * intent visible weight). The right side is a `Download PDF` action
 * styled like a nav item — same mono uppercase weight, no separate
 * button chrome, because the pill is already the container.
 */
function PageBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-4 mt-4 sm:mx-auto sm:mt-6 sm:w-fit">
      <div className="flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-zinc-900/60 px-5 py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl sm:gap-10 sm:rounded-full sm:px-6 sm:py-3">
        {/* Left: logo (clickable → home) + optional inline back label */}
        <Link
          href="/"
          aria-label="Back to portfolio home"
          className="group flex items-center gap-3 no-underline sm:gap-4"
        >
          <Image
            src="/favicon-512.png"
            alt="SA"
            width={36}
            height={36}
            priority
          />
          <span className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-white sm:inline">
            ← Back
          </span>
        </Link>

        {/* Right: download PDF as a nav-item-styled action */}
        <a
          href="/Sanchit_Agarwal_Resume.pdf"
          download
          className="inline-flex items-center gap-2 whitespace-nowrap font-body text-[10px] uppercase tracking-[0.2em] text-zinc-400 no-underline transition-colors hover:text-white"
        >
          <DownloadIcon />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </a>
      </div>
    </nav>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="12"
      height="12"
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

/* ───────── Shared bits ───────── */

function SectionHead({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mb-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600 ${className}`}
    >
      {children}
    </div>
  );
}

/* ───────── Shared body blocks (identical DOM in both layouts) ───────── */

function ContactBody() {
  return (
    <div className="flex flex-col gap-[9px]">
      <a
        href={`mailto:${RESUME.email}`}
        className="text-[13px] text-white no-underline hover:text-white"
      >
        {RESUME.email}
      </a>
      <div className="text-[13px] text-zinc-400">{RESUME.phone}</div>
      <div className="text-[13px] text-zinc-400">{RESUME.location}</div>
    </div>
  );
}

/**
 * Links — single column on desktop, flow as a row-wrap on mobile so the
 * three protocols sit beside each other and don't eat vertical space.
 */
function LinksBody({ mobile = false }: { mobile?: boolean }) {
  const layoutClass = mobile
    ? 'flex flex-row flex-wrap gap-x-[14px] gap-y-2'
    : 'flex flex-col gap-2';
  return (
    <div className={layoutClass}>
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
  );
}

function SkillsBody() {
  return (
    <div className="flex flex-col gap-4">
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
  );
}

function EducationBody() {
  return (
    <div>
      <div className="font-headline text-base font-bold text-white">
        {RESUME.education.school}
      </div>
      <div className="mb-[3px] text-[12.5px] text-zinc-400">
        {RESUME.education.degree}
      </div>
      <div className="font-mono text-[10.5px] text-zinc-500">
        {RESUME.education.meta}
      </div>
    </div>
  );
}

/**
 * `$ whoami` editorial statement. Smaller on mobile (18px) to fit the
 * narrower column without becoming awkward two-word lines.
 */
function StatementBlock({ mobile = false }: { mobile?: boolean }) {
  const fontSize = mobile ? 'text-[18px]' : 'text-[18px] md:text-[21px]';
  return (
    <>
      <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.26em] text-zinc-500">
        <span className="text-[#DC2626]">$</span> whoami
      </div>
      <p
        className={`m-0 font-headline ${fontSize} font-medium leading-[1.45] tracking-[-0.015em] text-zinc-200 text-pretty`}
      >
        I gave up trying to out-code the model. The fight now is who can{' '}
        <span className="text-[#DC2626]">orchestrate</span> best. The edge is in
        knowing what AI doesn&apos;t.
      </p>
    </>
  );
}

/**
 * Experience cards. Mobile: 20px padding all around, role 17.5px, bullets
 * 13px, date/loc inline below the role separated by ` · `. Desktop:
 * 24/26px padding, role 19px, bullets 13.5px, date column right-aligned
 * with line break between dates and location.
 */
function ExperienceBody({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="flex flex-col gap-3.5">
      {RESUME.experience.map((e, i) => (
        <ExperienceCard key={`${e.company}-${i}`} exp={e} mobile={mobile} />
      ))}
    </div>
  );
}

function ExperienceCard({
  exp,
  mobile,
}: {
  exp: Experience;
  mobile: boolean;
}) {
  const borderClass = exp.current
    ? 'border-[#DC2626]/[0.28]'
    : 'border-white/[0.08]';

  const paddingClass = mobile ? 'p-5' : 'py-6 px-[26px]';
  const roleSizeClass = mobile ? 'text-[17.5px]' : 'text-[19px]';
  const bulletSizeClass = mobile ? 'text-[13px]' : 'text-[13.5px]';
  const dateAlignClass = mobile ? 'text-left' : 'text-right';

  return (
    <article
      className={`rounded-[12px] border ${borderClass} bg-[#0f0f12]/70 ${paddingClass}`}
    >
      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h3
            className={`m-0 mb-[3px] font-headline ${roleSizeClass} font-bold tracking-[-0.02em] text-white`}
          >
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
        <div
          className={`shrink-0 ${dateAlignClass} font-mono text-[11px] leading-[1.6] text-zinc-500`}
        >
          {exp.dates}
          {mobile ? (
            <span> · </span>
          ) : (
            <br />
          )}
          <span className="text-zinc-600">{exp.loc}</span>
        </div>
      </div>
      <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
        {exp.bullets.map((b, j) => (
          <li
            key={j}
            className={`relative pl-5 ${bulletSizeClass} leading-relaxed text-zinc-400 text-pretty`}
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

function SideProjectBody({ mobile = false }: { mobile?: boolean }) {
  const paddingClass = mobile ? 'p-5' : 'px-7 py-[26px]';
  return (
    <article
      className={`rounded-[12px] border border-[#DC2626]/20 bg-gradient-to-br from-[#DC2626]/[0.07] to-[#0f0f12]/70 ${paddingClass}`}
    >
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
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
  );
}

/* ───────── Mobile dossier — single priority-ordered column ───────── */

/**
 * Identity block (mobile only). Compact horizontal layout: 80×96 portrait
 * on the left, name + title + `available · 2026` stamp on the right.
 * Keeps the identity block from eating half the viewport above the fold.
 */
function IdentityMobile() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[12px] border border-white/10 bg-[#15151b]">
        <Image
          src="/images/sanchit-portrait-2.png"
          alt={RESUME.name}
          fill
          priority
          sizes="80px"
          className="object-cover object-top"
        />
      </div>
      <div>
        <h1 className="m-0 mb-[7px] font-headline text-[26px] font-extrabold leading-none tracking-[-0.035em] text-white">
          {RESUME.name}
        </h1>
        <div className="mb-[9px] text-[13px] font-semibold text-[#DC2626]">
          {RESUME.title}
        </div>
        <div className="inline-block rounded-[3px] border border-white/10 bg-white/[0.05] px-2 py-[3px] font-mono text-[8.5px] uppercase tracking-[0.1em] text-zinc-400">
          available · 2026
        </div>
      </div>
    </div>
  );
}

function MobileDossier() {
  return (
    <div className="bg-black px-[22px] pb-12 pt-8 text-white md:hidden">
      <IdentityMobile />

      <SectionHead className="mt-[30px]">Contact</SectionHead>
      <ContactBody />

      <SectionHead className="mt-[26px]">Links</SectionHead>
      <LinksBody mobile />

      {/* Statement gets a top-border separator on mobile — it's the
          editorial transition from "who I am" → "what I do." */}
      <div className="mt-8 border-t border-white/[0.08] pt-8">
        <StatementBlock mobile />
      </div>

      <SectionHead className="mt-9">Experience</SectionHead>
      <ExperienceBody mobile />

      <SectionHead className="mt-9">Side Project</SectionHead>
      <SideProjectBody mobile />

      {/* Skills + Education live at the bottom on mobile (priority order:
          work first, supporting credentials after) — opposite of desktop
          where they're prominent in the sidebar. */}
      <SectionHead className="mt-9">Skills</SectionHead>
      <SkillsBody />

      <SectionHead className="mt-9">Education</SectionHead>
      <EducationBody />
    </div>
  );
}

/* ───────── Desktop dossier — two-column sidebar + main ───────── */

function IdentityDesktop() {
  return (
    <>
      <div className="relative mb-[26px] aspect-[4/5] overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#15151b]">
        <Image
          src="/images/sanchit-portrait-2.png"
          alt={RESUME.name}
          fill
          priority
          sizes="320px"
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
    </>
  );
}

function DesktopDossier() {
  return (
    <div className="hidden md:grid md:grid-cols-[320px_1fr]">
      <aside className="border-r border-white/[0.07] bg-[#0c0c0f] px-[34px] pb-12 pt-10">
        <IdentityDesktop />

        <SectionHead>Contact</SectionHead>
        <div className="mb-[30px]">
          <ContactBody />
        </div>

        <SectionHead>Links</SectionHead>
        <div className="mb-[30px]">
          <LinksBody />
        </div>

        <SectionHead>Skills</SectionHead>
        <div className="mb-[30px]">
          <SkillsBody />
        </div>

        <SectionHead>Education</SectionHead>
        <EducationBody />
      </aside>

      <main className="px-14 pb-14 pt-12">
        <StatementBlock />
        <SectionHead className="mt-11">Experience</SectionHead>
        <ExperienceBody />
        <SectionHead className="mt-10">Side Project</SectionHead>
        <SideProjectBody />
      </main>
    </div>
  );
}
