import Link from "next/link";

const EXPERIENCES = [
  {
    title: "Senior Software Engineer",
    company: "AB InBev",
    dates: "April 2023 - Present",
    isCurrent: true,
  },
  {
    title: "Software Engineer",
    company: "Amazon",
    dates: "Aug 2021 - Dec 2022",
    isCurrent: false,
  },
  {
    title: "Software Engineering Intern",
    company: "Amazon",
    dates: "Jan 2021 - July 2021",
    isCurrent: false,
  },
] as const;

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-32 px-6 bg-black relative">
      {/* Background glow */}
      <div className="crimson-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] pointer-events-none" />

      {/* Heading */}
      <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4 text-center">
        My Experience
      </h2>

      {/* Subtitle */}
      <p className="text-[#c6c6c7] font-body max-w-lg mx-auto leading-relaxed mb-10 md:mb-16 text-center">
        A journey through building scalable systems at global organizations.
      </p>

      {/* Experience cards */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto relative z-10">
        {EXPERIENCES.map((exp) => (
          <div
            key={`${exp.company}-${exp.dates}`}
            className="glass-card glass-card-gradient w-full rounded-xl p-6 sm:p-8 md:p-12 transition-all hover:bg-white/[0.02]"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Left: role + company */}
              <div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold font-headline text-white">
                  {exp.isCurrent && (
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#DC2626] shadow-[0_0_10px_rgba(220,38,38,0.8)] mr-3" />
                  )}
                  {exp.title}
                </p>
                <p className="text-[#c6c6c7] font-body mt-1 text-sm">
                  {exp.company}
                </p>
              </div>

              {/* Right: dates */}
              <p className="text-[#c6c6c7] font-body text-sm mt-2 md:mt-0 opacity-70">
                {exp.dates}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View full resume link */}
      <div className="text-center mt-12">
        <Link
          href="/resume"
          className="text-[#c6c6c7] text-sm font-body hover:text-white transition-colors"
        >
          View full resume &rarr;
        </Link>
      </div>
    </section>
  );
}
