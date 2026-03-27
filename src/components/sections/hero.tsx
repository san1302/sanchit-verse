import { Terminal, Cloud, Building2, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 px-6 overflow-hidden bg-black">
        {/* Dramatic Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] editorial-glow pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center">
          {/* Intro Line — single clean row */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 animate-fade-in flex-wrap">
            <span className="text-on-surface-variant font-body text-sm sm:text-base font-light">
              Hi! I&apos;m Sanchit Agarwal
            </span>
            <div className="w-6 h-[1px] bg-outline-variant/30 hidden sm:block" />
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-full border border-white/5">
              <span className="text-[12px]" aria-label="India flag">{"🇮🇳"}</span>
              <span className="text-on-surface-variant font-body text-[10px] sm:text-xs tracking-widest uppercase font-medium">
                Based in India
              </span>
            </div>
          </div>

          {/* Massive Headline */}
          <h1 className="font-headline text-3xl sm:text-4xl md:text-8xl font-extrabold tracking-tighter text-white leading-[0.9] mb-8">
            Software Engineer
            <br />
            <span className="text-white/40">& Problem Solver</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-on-surface-variant text-lg md:text-xl font-body leading-relaxed mb-12">
            I build scalable platforms, design systems, and cloud-native
            architectures that drive impact.
          </p>

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
            <div className="absolute -bottom-8 -right-4 md:-right-12 text-white/20 font-serif italic text-2xl md:text-4xl lg:text-6xl select-none pointer-events-none -rotate-12">
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-on-surface-variant/40 font-body text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-on-surface-variant/40" />
        </div>
      </section>
    </>
  );
}
