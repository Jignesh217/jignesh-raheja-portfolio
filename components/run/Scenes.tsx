"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SceneId } from "@/lib/story";

const vp = { once: true, margin: "-60px" } as const;
const frame =
  "relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/15 bg-[#070707]";

function Chrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
      <span className="h-2 w-2 rounded-full bg-white/25" />
    </div>
  );
}

/* ----------------------- 01 · animated mini dashboard --------------------- */
function CountUp({ to, className }: { to: number; className?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0]?.isIntersecting && !ran.current) {
        ran.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 900);
          setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className={className}>{n.toLocaleString()}</span>;
}

function Dashboard() {
  const bars = [40, 62, 50, 78, 68, 92, 84, 72, 88];
  const legend = [
    ["Sessions", "8.2k"],
    ["Revenue", "₹4.2L"],
    ["Retention", "94%"],
  ];
  return (
    <div className={frame}>
      <Chrome />
      <div className="flex h-[calc(100%-37px)] flex-col gap-3 p-4">
        {/* top KPI row */}
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Active users</span>
            <div className="flex items-baseline gap-2">
              <CountUp to={12480} className="font-display text-3xl text-white sm:text-4xl" />
              <span className="font-mono text-[10px] text-white/60">▲ 12%</span>
            </div>
          </div>
          <div className="rounded-md border border-white/10 p-2">
            <span className="block h-1.5 w-8 rounded bg-white/30" />
            <motion.svg viewBox="0 0 60 22" className="mt-1.5 w-16" fill="none">
              <motion.path d="M0 18 L12 12 L24 16 L36 6 L48 10 L60 3" stroke="#fff" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp} transition={{ duration: 1, delay: 0.3 }} />
            </motion.svg>
          </div>
        </div>
        {/* bars fill the middle */}
        <div className="flex flex-1 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={vp}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-sm bg-white/80" />
          ))}
        </div>
        {/* legend row */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
          {legend.map(([k, v]) => (
            <div key={k}>
              <span className="block font-mono text-[8px] uppercase tracking-widest text-white/35">{k}</span>
              <span className="font-mono text-sm text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------- 02 · self-drawing site blueprint ------------------- */
function Blueprint() {
  const [solid, setSolid] = useState(false);
  return (
    <div
      className={frame + " cursor-pointer"}
      data-cursor="hover"
      data-cursor-label={solid ? "wireframe" : "render"}
      onMouseEnter={() => setSolid(true)}
      onMouseLeave={() => setSolid(false)}
      onClick={() => setSolid((s) => !s)}
    >
      <Chrome />
      <svg viewBox="0 0 200 150" className="h-full w-full p-4" fill="none">
        {[
          "M8 14 H192", // nav line
          "M8 8 H40", // logo
          "M150 8 H192", // menu
          "M8 34 H120", // h1
          "M8 46 H92", // h2
          "M8 62 H64", // button
          "M118 30 H192 V96 H118 Z", // hero image
          "M8 110 H56 V140 H8 Z", // card
          "M76 110 H124 V140 H76 Z",
          "M144 110 H192 V140 H144 Z",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#fff"
            strokeWidth="1.4"
            initial={{ pathLength: 0, opacity: 0.5 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={vp}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          />
        ))}
        {/* fills appear when "rendered" */}
        <motion.g initial={false} animate={{ opacity: solid ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <rect x="118" y="30" width="74" height="66" fill="#fff" opacity="0.85" />
          <rect x="8" y="110" width="48" height="30" fill="#fff" opacity="0.25" />
          <rect x="76" y="110" width="48" height="30" fill="#fff" opacity="0.25" />
          <rect x="144" y="110" width="48" height="30" fill="#fff" opacity="0.25" />
          <rect x="8" y="58" width="56" height="8" fill="#fff" />
        </motion.g>
      </svg>
    </div>
  );
}

/* ----------------------- 03 · the honest machine -------------------------- */
const QA = [
  { q: "how does the pricing scale?", bars: [82, 96, 60], src: ["§ docs", "§ pricing", "§ faq"] },
  { q: "is my data encrypted?", bars: [72, 90, 80], src: ["§ security", "§ soc2"] },
  { q: "can I cancel anytime?", bars: [88, 64, 78], src: ["§ terms", "§ billing"] },
  { q: "do you support SSO?", bars: [76, 92, 70], src: ["§ auth", "§ enterprise"] },
];

function Machine() {
  const [run, setRun] = useState(0);
  const qa = QA[run % QA.length];
  return (
    <div className={frame}>
      <Chrome />
      <div className="flex h-[calc(100%-37px)] flex-col gap-3 p-4">
        {/* the question */}
        <motion.div key={"q" + run} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-md border border-white/15 px-3 py-2">
          <span className="font-mono text-[10px] text-white/40">?</span>
          <span className="font-mono text-xs text-white/75">{qa.q}</span>
        </motion.div>
        {/* the grounded answer — re-animates each ask */}
        <motion.div key={"a" + run} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-md bg-white/5 p-3">
          <div className="space-y-1.5">
            {qa.bars.map((w, i) => (
              <motion.span key={i} initial={{ width: 0 }} animate={{ width: `${w}%` }}
                transition={{ delay: 0.25 + i * 0.13, duration: 0.4 }} className="block h-1.5 rounded bg-white/55" />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {qa.src.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12 }}
                className="rounded border border-white/25 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <button
          onClick={() => setRun((r) => r + 1)}
          data-cursor="hover"
          data-cursor-label="ask"
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-colors hover:border-white hover:text-white"
        >
          ↻ ask another
        </button>
      </div>
    </div>
  );
}

/* ----------------------- 04 · interactive design system ------------------- */
function System() {
  const [dense, setDense] = useState(false);
  const pad = dense ? "6px 12px" : "10px 18px";
  return (
    <div className={frame}>
      <Chrome />
      <div className="flex h-[calc(100%-37px)] flex-col gap-3 p-4">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/35">Type scale</span>
          <div className="mt-1 flex items-baseline gap-3">
            {[34, 22, 14].map((s) => (
              <span key={s} style={{ fontSize: s }} className="font-display leading-none text-white">Aa</span>
            ))}
          </div>
        </div>
        <div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/35">Palette</span>
          <div className="mt-1 flex gap-2">
            {["#fff", "#a3a3a3", "#525252", "#1f1f1f"].map((c) => (
              <span key={c} className="h-6 flex-1 rounded" style={{ background: c, border: "1px solid rgba(255,255,255,0.15)" }} />
            ))}
          </div>
        </div>
        <div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/35">Spacing</span>
          <motion.div initial={false} animate={{ gap: dense ? 4 : 12 }} className="mt-1 flex">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.span key={i} animate={{ width: dense ? 10 : 18 }} className="h-3 rounded-sm bg-white/30" />
            ))}
          </motion.div>
        </div>
        {/* live components — the working density switch drives everything above */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/35">Components</span>
            <button
              type="button"
              onClick={() => setDense((d) => !d)}
              data-cursor="hover"
              data-cursor-label={dense ? "comfy" : "compact"}
              aria-pressed={dense}
              className="flex items-center gap-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                {dense ? "compact" : "comfortable"}
              </span>
              <span className={`flex h-5 w-9 items-center rounded-full border px-0.5 transition-colors ${dense ? "justify-end border-white bg-white/15" : "justify-start border-white/30"}`}>
                <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className="h-3.5 w-3.5 rounded-full bg-white" />
              </span>
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <motion.span animate={{ padding: pad }} className="rounded-md bg-white font-mono text-[10px] font-semibold text-black">Button</motion.span>
            <motion.span animate={{ padding: pad }} className="rounded-md border border-white/25 font-mono text-[10px] text-white/70">Ghost</motion.span>
            <motion.span animate={{ padding: pad }} className="rounded-md border border-dashed border-white/20 font-mono text-[10px] text-white/45">Input</motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectScene({ id }: { id: SceneId }) {
  switch (id) {
    case "dashboard":
      return <Dashboard />;
    case "blueprint":
      return <Blueprint />;
    case "machine":
      return <Machine />;
    case "system":
      return <System />;
  }
}
