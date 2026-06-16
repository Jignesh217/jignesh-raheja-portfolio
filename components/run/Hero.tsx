"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RunnerLoop } from "./RunnerLoop";
import { hero } from "@/lib/story";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28">
      {/* faint skyline, far back, never competing with text */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end opacity-[0.35]">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#0c0c0c]"
            style={{
              width: `${100 / 48}%`,
              height: 60 + ((i * 71) % 160),
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
            }}
          />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

      {/* CONTENT — the priority */}
      <div className="container-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-white/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {hero.available}
        </motion.div>

        <h1 className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-8xl">
          {hero.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic>
            <a
              href="#contact"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-colors hover:bg-white/90"
            >
              Start a project
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <a
            href="#run"
            data-cursor="hover"
            className="text-base font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            Take the run ↓
          </a>
        </motion.div>
      </div>

      {/* RUNNER — a quiet signature on the rooftop, not the show */}
      <div className="relative z-10 mt-12">
        <div className="container-px flex items-end justify-between">
          <div className="flex items-end gap-2">
            <RunnerLoop size={108} speed={1} />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-2 pb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            <ArrowDown size={13} className="animate-bob" />
            scroll
          </motion.div>
        </div>
        {/* rooftop line */}
        <div className="h-px w-full bg-white/25" />
      </div>
    </section>
  );
}
