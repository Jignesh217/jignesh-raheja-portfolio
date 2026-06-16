"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { builds } from "@/lib/story";

type Block = { x: number; y: number; w: number; h: number; o?: number };

// Four schematic layouts the wireframe assembles into — one per kind of work.
const layouts: Block[][] = [
  // 01 marketing site
  [
    { x: 4, y: 4, w: 18, h: 5 }, { x: 70, y: 4, w: 26, h: 5, o: 0.4 },
    { x: 4, y: 18, w: 54, h: 9 }, { x: 4, y: 30, w: 40, h: 5, o: 0.5 },
    { x: 4, y: 40, w: 22, h: 7 }, { x: 64, y: 16, w: 32, h: 34, o: 0.85 },
    { x: 4, y: 60, w: 27, h: 24, o: 0.3 }, { x: 36, y: 60, w: 27, h: 24, o: 0.3 }, { x: 68, y: 60, w: 28, h: 24, o: 0.3 },
  ],
  // 02 web app
  [
    { x: 4, y: 4, w: 18, h: 92, o: 0.5 }, { x: 26, y: 4, w: 70, h: 7 },
    { x: 26, y: 16, w: 21, h: 16, o: 0.35 }, { x: 50, y: 16, w: 21, h: 16, o: 0.35 }, { x: 74, y: 16, w: 22, h: 16, o: 0.35 },
    { x: 26, y: 38, w: 70, h: 26, o: 0.8 },
    { x: 26, y: 68, w: 70, h: 5, o: 0.3 }, { x: 26, y: 76, w: 70, h: 5, o: 0.3 }, { x: 26, y: 84, w: 70, h: 5, o: 0.3 },
  ],
  // 03 AI tool
  [
    { x: 4, y: 4, w: 92, h: 7 },
    { x: 4, y: 18, w: 52, h: 14, o: 0.85 },
    { x: 44, y: 36, w: 52, h: 14, o: 0.4 },
    { x: 4, y: 54, w: 40, h: 10, o: 0.85 },
    { x: 4, y: 78, w: 92, h: 12, o: 0.5 },
    { x: 6, y: 80, w: 14, h: 8 }, { x: 22, y: 80, w: 14, h: 8 },
  ],
  // 04 redesign (before → after)
  [
    { x: 4, y: 6, w: 40, h: 6, o: 0.3 }, { x: 4, y: 16, w: 30, h: 6, o: 0.3 }, { x: 4, y: 26, w: 44, h: 6, o: 0.3 },
    { x: 4, y: 40, w: 24, h: 18, o: 0.2 }, { x: 4, y: 64, w: 40, h: 6, o: 0.3 }, { x: 4, y: 76, w: 18, h: 6, o: 0.3 },
    { x: 56, y: 8, w: 40, h: 9 }, { x: 56, y: 22, w: 28, h: 5, o: 0.6 },
    { x: 56, y: 36, w: 40, h: 26, o: 0.85 }, { x: 56, y: 68, w: 19, h: 16, o: 0.4 }, { x: 77, y: 68, w: 19, h: 16, o: 0.4 },
  ],
];

function Wireframe({ active }: { active: number }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/15 bg-[#070707]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 font-mono text-[9px] text-white/30">{builds[active].title.toLowerCase().replace(/\s+/g, "-")}.app</span>
      </div>
      {/* key on active → blocks re-assemble each time */}
      <div key={active} className="relative h-[calc(100%-29px)] w-full p-3">
        {layouts[active].map((b, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute rounded-[3px] bg-white"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
              opacity: b.o ?? 0.9,
            }}
          />
        ))}
        {active === 3 && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-lg text-white">→</span>
        )}
      </div>
    </div>
  );
}

export function Build() {
  const [active, setActive] = useState(0);

  return (
    <section id="build" className="relative py-28 sm:py-40">
      <div className="container-px">
        <Reveal className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            What I build · up close
          </span>
          <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Pick a kind of thing. Watch it take shape.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            You ran past these on the billboards. Here they are, building themselves.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* the list drives the wireframe */}
          <ul>
            {builds.map((item, i) => {
              const on = i === active;
              return (
                <li key={item.no}>
                  <button
                    data-cursor="hover"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group block w-full border-b border-white/12 py-6 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`font-mono text-sm transition-colors ${on ? "text-white" : "text-white/30"}`}>
                        {item.no}
                      </span>
                      <h3 className={`text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${on ? "text-white" : "text-white/45"}`}>
                        {item.title}
                      </h3>
                    </div>
                    <motion.p
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <span className="block pl-10 pt-3 text-base leading-relaxed text-white/65">
                        {item.body}
                      </span>
                    </motion.p>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* the assembling preview */}
          <div className="lg:sticky lg:top-24">
            <Wireframe active={active} />
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              live wireframe — hover the list
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
