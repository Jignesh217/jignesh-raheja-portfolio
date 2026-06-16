"use client";

import { useMemo } from "react";

/** Fixed vignette to focus the eye and deepen the black at the edges. */
export function Vignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.7) 100%)",
      }}
    />
  );
}

/** Drifting dust motes. A handful of light divs — cheap, atmospheric. */
export function Dust({ count = 18 }: { count?: number }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic + rounded so SSR and client render byte-identical strings.
        const r = (n: number) => (Math.sin(i * 9.13 + n) + 1) / 2;
        return {
          left: `${(r(1) * 100).toFixed(2)}%`,
          top: `${(r(2) * 100).toFixed(2)}%`,
          size: Number((1 + r(3) * 2).toFixed(2)),
          delay: `${(r(4) * -12).toFixed(2)}s`,
          duration: `${(10 + r(5) * 12).toFixed(2)}s`,
          opacity: Number((0.15 + r(6) * 0.35).toFixed(3)),
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-drift"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}

/** A soft moon of light behind the action. */
export function MoonGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 45%, transparent 70%)",
      }}
    />
  );
}
