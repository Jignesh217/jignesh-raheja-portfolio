"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { RunnerLoop } from "./RunnerLoop";

/**
 * The hand-off. The run was the trailer — the whole story, told from the
 * rooftops. This is the runner stopping, turning to you, and inviting you to
 * touch the proof: the interactive build + the project worlds just below.
 */
export function Arrival() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden py-28 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(255,255,255,0.06),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container-px relative z-10"
      >
        <div className="flex justify-center">
          <RunnerLoop size={88} speed={0.9} />
        </div>
        <div className="mx-auto mt-2 h-px w-40 bg-white/25" />

        <span className="mt-10 block font-mono text-xs uppercase tracking-[0.35em] text-white/45">
          End of the run
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
          That was the whole story, told from the rooftops.
          <span className="text-white/55"> Now you can touch it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
          Below: the kinds of things I build, taking shape in real time — and four project
          worlds you can actually poke at. The thinking is the point.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
        >
          <ArrowDown size={13} className="animate-bob" />
          step inside
        </motion.div>
      </motion.div>
    </section>
  );
}
