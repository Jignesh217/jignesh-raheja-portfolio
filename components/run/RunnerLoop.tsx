"use client";

import { useEffect, useRef } from "react";
import { runPose, kinematics, buildBody } from "@/lib/parkour";

/**
 * The hero runner — the same smooth filled silhouette as the parkour scene,
 * rendered white on the dark hero. Time-based (a natural continuous gait);
 * pauses when the tab is hidden and for prefers-reduced-motion.
 */
export function RunnerLoop({
  size = 132,
  speed = 1,
  className = "",
}: {
  size?: number;
  speed?: number;
  className?: string;
}) {
  const g = useRef<SVGGElement>(null);
  const far = useRef<SVGPathElement>(null);
  const core = useRef<SVGPathElement>(null);
  const near = useRef<SVGPathElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (stride: number) => {
      const j = kinematics(runPose(stride), 0, 1);
      const b = buildBody(j);
      far.current?.setAttribute("d", b.far);
      core.current?.setAttribute("d", b.core);
      near.current?.setAttribute("d", b.near);
      const bob = 6 * Math.cos(2 * stride) - 1;
      if (g.current) g.current.setAttribute("transform", `translate(0,${bob.toFixed(1)})`);
    };

    draw(0.6); // a real filled frame on mount

    if (reduce) return;
    let raf = 0, start = 0, acc = 0, last = 0;
    const loop = (t: number) => {
      if (!start) { start = t; last = t; }
      acc += ((t - last) / 1000) * speed * 5.4;
      last = t;
      draw(acc);
      raf = requestAnimationFrame(loop);
    };
    const run = () => { if (!raf) { last = 0; start = 0; raf = requestAnimationFrame(loop); } };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVis);
    if (!document.hidden) run();
    return () => { document.removeEventListener("visibilitychange", onVis); stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="-76 -150 152 222"
      className={className}
      aria-hidden
    >
      {/* soft ground pool */}
      <ellipse cx="0" cy="64" rx="30" ry="5" fill="#fff" opacity="0.16" />
      <g ref={g} className="drop-shadow-[0_0_14px_rgba(255,255,255,0.16)]">
        <path ref={far} fill="#fff" />
        <path ref={core} fill="#fff" />
        <path ref={near} fill="#fff" />
      </g>
    </svg>
  );
}
