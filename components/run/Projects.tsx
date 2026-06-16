"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectScene } from "./Scenes";
import { projects, type SceneId } from "@/lib/story";

/* Each project is its own place. The atmosphere behind it shifts so arriving
   at one feels different from the last — a destination, not a row in a list. */
function Ambient({ scene }: { scene: SceneId }) {
  const common = "pointer-events-none absolute inset-0 -z-10 overflow-hidden";
  if (scene === "dashboard")
    return (
      <div className={common}>
        <div className="absolute right-[8%] top-1/2 h-[60vh] w-[60vh] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07),transparent_65%)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 60px)" }} />
      </div>
    );
  if (scene === "blueprint")
    return (
      <div className={common}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="absolute left-[10%] top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)]" />
      </div>
    );
  if (scene === "machine")
    return (
      <div className={common}>
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 26 }).map((_, i) => {
            const x = (i * 137) % 1000, y = (i * 271) % 500;
            return <circle key={i} cx={x} cy={y} r="2.5" fill="#fff" />;
          })}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={(i * 137) % 1000} y1={(i * 271) % 500} x2={((i + 3) * 137) % 1000} y2={((i + 5) * 271) % 500} stroke="#fff" strokeWidth="0.6" />
          ))}
        </svg>
      </div>
    );
  return (
    <div className={common}>
      <div className="absolute inset-y-0 right-[6%] flex w-[42vw] gap-[3vw] opacity-[0.05]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-full flex-1 bg-white" style={{ opacity: 1 - i * 0.22 }} />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Selected work · up close</span>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            You glimpsed these from the rooftops. Step inside.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Four concept pieces — each a small, live demonstration of how I think. Hover them, click them. The thinking is the point.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 sm:mt-28">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={p.no} className="relative flex min-h-[88svh] items-center py-16">
              <Ambient scene={p.scene} />
              {/* the place's index — a quiet landmark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-2 select-none font-display text-[34vw] leading-none text-white/[0.03] sm:text-[24vw]"
                style={flip ? { right: "2%" } : { left: "2%" }}
              >
                {p.no}
              </span>

              <div className="container-px relative z-10 w-full">
                <Reveal>
                  <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 24 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className={flip ? "lg:order-2" : ""}
                    >
                      <ProjectScene id={p.scene} />
                    </motion.div>

                    <div className={flip ? "lg:order-1" : ""}>
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/45">
                        {p.no} · {p.category} · concept
                      </span>
                      <h3 className="mt-3 font-display text-4xl leading-none text-white sm:text-6xl">{p.name}</h3>

                      <dl className="mt-8 space-y-4">
                        {[
                          ["The problem", p.problem],
                          ["The idea", p.move],
                          ["The outcome", p.outcome],
                        ].map(([label, body]) => (
                          <div key={label} className="flex gap-4">
                            <dt className="w-24 shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</dt>
                            <dd className="text-base leading-relaxed text-white/85 sm:text-lg">{body}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* the conversion punchline — what this says about working with me */}
                      <p className="mt-8 flex gap-4 border-t border-white/12 pt-6">
                        <span className="w-24 shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">The point</span>
                        <span className="font-display text-xl italic leading-snug text-white sm:text-2xl">{p.takeaway}</span>
                      </p>
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
