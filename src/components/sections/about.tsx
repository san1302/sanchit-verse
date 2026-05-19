import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 px-6 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 max-w-6xl mx-auto items-center">
        {/* Left Column: Content */}
        <Reveal className="md:col-span-7">
          <div>
            <Eyebrow num="01" label="about" />

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8 text-balance">
              Engineering as a craft<br />
              of <span className="italic font-serif text-[#DC2626]">quiet</span> reliability.
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

            <a
              href="#contact"
              className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white px-6 py-3.5 rounded-[10px] text-sm font-semibold shadow-[0_8px_24px_rgba(220,38,38,0.3)] inline-flex items-center gap-2 transition mt-8"
            >
              Get in touch <span className="opacity-60">→</span>
            </a>
          </div>
        </Reveal>

        {/* Right Column: Portrait */}
        <Reveal delay={120} className="md:col-span-5 order-first md:order-last">
          <div className="relative flex justify-center">
            {/* Red glow behind portrait */}
            <div className="absolute inset-0 editorial-glow" />

            {/* Device frame */}
            <div className="w-full max-w-[280px] aspect-[3/4] sm:max-w-[300px] md:max-w-none md:w-[380px] md:h-[500px] md:aspect-auto bg-surface-container-lowest rounded-[3rem] p-4 shadow-2xl mx-auto relative group">
              {/* Portrait */}
              <div className="w-full h-full rounded-[2.5rem] bg-black overflow-hidden relative">
                <Image
                  src="/images/sanchit-portrait.png"
                  alt="Sanchit Agarwal"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 280px, 380px"
                />
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
        </Reveal>
      </div>
    </section>
  );
}
