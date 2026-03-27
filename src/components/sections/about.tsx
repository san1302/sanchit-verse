export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 max-w-6xl mx-auto items-center">
        {/* Left Column: Content */}
        <div className="md:col-span-7">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-body mb-6">
            I&apos;M SANCHIT AGARWAL
          </p>

          <h2 className="font-headline text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
            Hey, {"⚡"} software engineer
          </h2>

          <p className="text-[#c6c6c7] font-body text-base leading-relaxed mb-6">
            With over{" "}
            <span className="text-white font-medium">
              5+ years of experience
            </span>{" "}
            at global giants like{" "}
            <span className="text-white font-medium">Amazon</span> and{" "}
            <span className="text-white font-medium">AB InBev</span>, I
            specialize in architecting scalable platforms and robust design
            systems. My focus lies at the intersection of high-performance
            cloud-native architectures and seamless user experiences.
          </p>

          <p className="text-[#c6c6c7] font-body text-base leading-relaxed">
            Beyond writing code, I am a tech mentor and an advocate for blending
            technology with creativity. I believe that engineering isn&apos;t
            just about solving problems—it&apos;s about building digital
            environments that feel as fluid and intentional as high-end physical
            products.
          </p>

          <button className="bg-primary-container text-white px-8 py-3 rounded-full font-body text-[12px] uppercase tracking-wider font-bold hover:scale-105 transition-transform mt-8">
            Get In Touch
          </button>
        </div>

        {/* Right Column: Portrait */}
        <div className="md:col-span-5 relative flex justify-center">
          {/* Red glow behind portrait */}
          <div className="absolute inset-0 editorial-glow" />

          {/* Device frame */}
          <div className="w-[300px] h-[400px] md:w-[380px] md:h-[500px] bg-surface-container-lowest rounded-[3rem] p-4 shadow-2xl mx-auto relative group">
            {/* Photo placeholder */}
            <div className="w-full h-full rounded-[2.5rem] bg-surface-container overflow-hidden flex items-center justify-center">
              <span className="text-zinc-600 font-label text-sm tracking-widest uppercase">
                Photo
              </span>
            </div>

            {/* Available for opportunities badge */}
            <div className="absolute -top-4 right-0 glass-card px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] text-white uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for opportunities
            </div>

            {/* Floating role pills */}
            <div className="hidden sm:block absolute bottom-20 -left-4 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
              Full-Stack Developer
            </div>
            <div className="hidden sm:block absolute bottom-32 -right-8 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
              Cloud Architect
            </div>
            <div className="hidden sm:block absolute bottom-8 -right-4 glass-card px-3 py-1.5 rounded-full text-[10px] text-zinc-300 uppercase tracking-wider">
              Software Engineer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
