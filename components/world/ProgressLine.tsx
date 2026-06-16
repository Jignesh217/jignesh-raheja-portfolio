"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin white line at the top — the only nod to "how far in" you are. */
export function ProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-white/70"
      aria-hidden
    />
  );
}
