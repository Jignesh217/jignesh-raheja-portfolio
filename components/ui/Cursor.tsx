"use client";

import { useEffect, useRef, useState } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Minimal, premium cursor — no trail, no stretch.
 *  - idle: a crisp dot that tracks the pointer
 *  - over interactive elements: morphs into a hollow ring (optionally labelled)
 *  - blends against both black and white via mix-blend-difference
 *  - pauses its loop when the tab is hidden
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const m = useRef({ px: -100, py: -100, rx: -100, ry: -100 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      m.current.px = e.clientX;
      m.current.py = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, input, textarea, [data-cursor]"
      );
      setHovering(!!el);
      setLabel(el?.getAttribute("data-cursor-label") || "");
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const loop = () => {
      const s = m.current;
      s.rx = lerp(s.rx, s.px, 0.18);
      s.ry = lerp(s.ry, s.py, 0.18);
      if (dot.current)
        dot.current.style.transform = `translate3d(${s.px}px, ${s.py}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden>
      {/* ring (grows on hover) */}
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white transition-[width,height,opacity,border-color] duration-300 ease-out"
        style={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
          opacity: hovering ? 1 : 0.4,
          mixBlendMode: "difference",
        }}
      >
        {label && (
          <span className="select-none font-mono text-[8px] uppercase tracking-[0.15em] text-white">
            {label}
          </span>
        )}
      </div>
      {/* dot (hides on hover) */}
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-200"
        style={{ opacity: hovering ? 0 : 1, mixBlendMode: "difference" }}
      />
    </div>
  );
}
