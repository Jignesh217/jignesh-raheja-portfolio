"use client";

import { useEffect, createContext, useContext, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance (e.g. for programmatic scrollTo). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in Lenis smooth scrolling and exposes a global CSS variable
 * `--scroll-progress` (0 → 1) for scroll-driven effects.
 *
 * Respects `prefers-reduced-motion`: skips smoothing entirely.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    setLenis(instance);
    // Expose for anchor-link helpers and debugging.
    (window as unknown as { lenis?: Lenis }).lenis = instance;

    instance.on("scroll", ({ progress }: { progress: number }) => {
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(progress)
      );
    });

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
