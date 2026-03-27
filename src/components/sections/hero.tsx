import { Terminal, Cloud, Building2 } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-black">
        {/* Dramatic Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] editorial-glow pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center">
          {/* Intro Line */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <span className="text-on-surface-variant font-label text-[12px] tracking-[0.2em] uppercase font-medium">
              Hi! I&apos;m Sanchit Agarwal
            </span>
            <div className="w-8 h-[1px] bg-outline-variant/30" />
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full border border-white/5">
              <span className="text-[12px]" aria-label="India flag">{"🇮🇳"}</span>
              <span className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase font-medium">
                Based in India
              </span>
            </div>
          </div>

          {/* Massive Headline */}
          <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-white leading-[0.9] mb-8">
            Software Engineer
            <br />
            <span className="text-white/40">& Problem Solver</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-on-surface-variant text-lg md:text-xl font-body leading-relaxed mb-12">
            I build scalable platforms, design systems, and cloud-native
            architectures that drive impact.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-24">
            <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-label tracking-wider uppercase text-[12px] font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-red-900/20 active:scale-95">
              View Projects
            </button>
            <button className="bg-transparent text-white border border-white/20 px-10 py-4 rounded-full font-label tracking-wider uppercase text-[12px] font-bold hover:bg-white/5 hover:scale-105 transition-all duration-300 active:scale-95">
              Download Resume
            </button>
          </div>

          {/* Image Area with Floating Elements */}
          <div className="relative w-full max-w-4xl group">
            {/* Background Warmth */}
            <div className="absolute inset-0 bg-primary-container/10 blur-[100px] rounded-full group-hover:bg-primary-container/20 transition-colors duration-700" />

            {/* Mockup Frame */}
            <div className="relative bg-surface-container rounded-t-xl md:rounded-t-3xl p-2 md:p-4 border-t border-x border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-surface-container-lowest rounded-t-lg md:rounded-t-2xl overflow-hidden aspect-video relative">
                {/* Placeholder for photo */}
                <div className="w-full h-full flex items-center justify-center grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
                  <span className="text-on-surface-variant/40 font-label text-sm tracking-widest uppercase">
                    Your Photo Here
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}

            {/* Available Badge */}
            <div className="absolute -top-6 -left-4 md:-left-12 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl animate-bounce-slow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-label text-[10px] font-bold tracking-widest uppercase">
                Available for work
              </span>
            </div>

            {/* Signature Style Text */}
            <div className="absolute -bottom-8 -right-4 md:-right-12 text-white/20 font-serif italic text-4xl md:text-6xl select-none pointer-events-none -rotate-12">
              Sanchit A.
            </div>

            {/* Tech Badge */}
            <div className="absolute top-1/2 -right-6 md:-right-16 translate-y-[-50%] bg-surface-container-high/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl hidden md:block">
              <div className="flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Teaser / Brief About Transition */}
      <section className="bg-black py-32 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="w-full md:w-1/3">
            <h2 className="font-headline text-3xl font-bold text-white tracking-tight">
              The Digital Curator.
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-on-surface-variant text-2xl font-body leading-relaxed mb-12">
              Specializing in{" "}
              <span className="text-white font-medium">
                architecting high-performance systems
              </span>{" "}
              and refined user experiences. My approach blends technical rigor
              with editorial aesthetics to create products that feel as good as
              they perform.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div>
                <span className="text-primary-container font-headline text-4xl font-extrabold">
                  05+
                </span>
                <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase mt-2">
                  Years Experience
                </p>
              </div>
              <div>
                <span className="text-primary-container font-headline text-4xl font-extrabold">
                  40+
                </span>
                <p className="text-on-surface-variant font-label text-[10px] tracking-widest uppercase mt-2">
                  Projects Shipped
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
