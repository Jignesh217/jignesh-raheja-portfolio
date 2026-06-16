"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  segments,
  acts,
  sample,
  kinematics,
  buildBody,
  type Feature,
  type Skill,
} from "@/lib/parkour";

/* Human-readable name for the move the athlete is performing right now. */
const SKILL_LABEL: Record<Skill, string> = {
  run: "running",
  precision: "precision jump",
  leap: "running leap",
  vault: "vault",
  wallrun: "wall run",
  roll: "roll landing",
  slide: "slide",
  climb: "ledge climb",
};

function useVp() {
  const [v, setV] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const f = () => setV({ w: window.innerWidth, h: window.innerHeight });
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}
function rng(seed: number) {
  return () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
}

/* Rooftop machinery — dark volumes, a faint rim of city light on top edges. */
const FILL = "#0b0b10";
const EDGE = "rgba(255,255,255,0.16)";
const RIM = "rgba(255,255,255,0.34)"; // catches the sky on upward-facing edges

/** A rim-lit box: dark face, edge stroke, and a brighter top lip. */
function Crate({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={RIM} strokeWidth={1.4} />
    </g>
  );
}

function Prop({ type }: { type: string }) {
  if (type === "box") return <Crate x={-32} y={-58} w={64} h={58} />;
  if (type === "crates")
    return (
      <g>
        <Crate x={-46} y={-46} w={46} h={46} />
        <Crate x={4} y={-64} w={42} h={64} />
        <Crate x={-30} y={-78} w={40} h={32} />
      </g>
    );
  if (type === "drum")
    return (
      <g>
        <rect x={-24} y={-62} width={48} height={62} rx={3} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <ellipse cx={0} cy={-62} rx={24} ry={7} fill={FILL} stroke={RIM} strokeWidth={1.2} />
        <line x1={-24} y1={-42} x2={24} y2={-42} stroke={EDGE} strokeWidth={0.8} />
        <line x1={-24} y1={-22} x2={24} y2={-22} stroke={EDGE} strokeWidth={0.8} />
      </g>
    );
  if (type === "ac")
    return (
      <g>
        <rect x={-40} y={-44} width={80} height={44} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <line x1={-40} y1={-44} x2={40} y2={-44} stroke={RIM} strokeWidth={1.4} />
        <circle cx={-18} cy={-22} r={13} fill="none" stroke={EDGE} strokeWidth={1.2} />
        <circle cx={18} cy={-22} r={13} fill="none" stroke={EDGE} strokeWidth={1.2} />
        {/* fan blades */}
        {[0, 60, 120].map((a) => (
          <line key={a} x1={-18} y1={-22} x2={-18 + 11 * Math.cos((a * Math.PI) / 180)} y2={-22 + 11 * Math.sin((a * Math.PI) / 180)} stroke={EDGE} strokeWidth={1} />
        ))}
        {[0, 60, 120].map((a) => (
          <line key={a} x1={18} y1={-22} x2={18 + 11 * Math.cos((a * Math.PI) / 180)} y2={-22 + 11 * Math.sin((a * Math.PI) / 180)} stroke={EDGE} strokeWidth={1} />
        ))}
      </g>
    );
  if (type === "generator")
    return (
      <g>
        <rect x={-56} y={-80} width={112} height={80} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <line x1={-56} y1={-80} x2={56} y2={-80} stroke={RIM} strokeWidth={1.4} />
        <rect x={28} y={-104} width={15} height={26} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <rect x={-46} y={-66} width={34} height={52} fill="none" stroke={EDGE} strokeWidth={0.8} />
        <line x1={-40} y1={-54} x2={-18} y2={-54} stroke={EDGE} strokeWidth={1} />
        <line x1={-40} y1={-42} x2={-18} y2={-42} stroke={EDGE} strokeWidth={1} />
        <line x1={-40} y1={-30} x2={-18} y2={-30} stroke={EDGE} strokeWidth={1} />
        <circle cx={12} cy={-46} r={9} fill="none" stroke={EDGE} strokeWidth={1} />
      </g>
    );
  if (type === "overhang")
    return (
      <g>
        <rect x={-64} y={-92} width={128} height={13} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <line x1={-64} y1={-92} x2={64} y2={-92} stroke={RIM} strokeWidth={1.2} />
        <rect x={-60} y={-92} width={6} height={92} fill={FILL} stroke={EDGE} strokeWidth={0.8} />
        <rect x={54} y={-92} width={6} height={92} fill={FILL} stroke={EDGE} strokeWidth={0.8} />
      </g>
    );
  if (type === "antenna")
    return (
      <g>
        <rect x={-16} y={-30} width={32} height={30} fill={FILL} stroke={EDGE} strokeWidth={1.2} />
        <line x1={0} y1={-30} x2={0} y2={-190} stroke={FILL} strokeWidth={4} />
        <line x1={0} y1={-30} x2={0} y2={-190} stroke={EDGE} strokeWidth={1.2} />
        <line x1={-22} y1={-110} x2={22} y2={-110} stroke={EDGE} strokeWidth={1.4} />
        <line x1={-16} y1={-150} x2={16} y2={-150} stroke={EDGE} strokeWidth={1.4} />
        <circle cx={0} cy={-194} r={3.5} fill="#fff" className="animate-flicker" opacity={0.85} />
      </g>
    );
  return null;
}

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">{children}</span>
);

/* The discovered, in-world content. Each kind reads as a different object. */
function FeatureView({ f }: { f: Feature }) {
  if (f.kind === "graffiti")
    return (
      <div className="w-[300px] -rotate-1 sm:w-[360px]">
        <h3
          className="font-display text-3xl italic leading-[1.05] text-white sm:text-4xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
        >
          {f.title}
        </h3>
        {f.body && <p className="mt-2 max-w-[300px] text-sm leading-relaxed text-white/60">{f.body}</p>}
      </div>
    );

  if (f.kind === "plaque")
    return (
      <div className="w-[320px] text-center sm:w-[380px]">
        {f.tag && <Tag>{f.tag}</Tag>}
        <h3 className="mt-3 font-display text-3xl leading-[1.08] text-white sm:text-[2.6rem]">{f.title}</h3>
        {f.body && <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-relaxed text-white/70">{f.body}</p>}
      </div>
    );

  if (f.kind === "billboard")
    return (
      <div className="relative w-[300px] border border-white/20 bg-[#0a0a0e]/85 p-5 sm:w-[340px]">
        {/* corner brackets — an out-of-home frame */}
        {[
          "left-[-1px] top-[-1px] border-l-2 border-t-2",
          "right-[-1px] top-[-1px] border-r-2 border-t-2",
          "left-[-1px] bottom-[-1px] border-l-2 border-b-2",
          "right-[-1px] bottom-[-1px] border-r-2 border-b-2",
        ].map((c) => (
          <span key={c} className={`absolute h-3 w-3 border-white/55 ${c}`} />
        ))}
        {f.tag && <Tag>{f.tag}</Tag>}
        <h3 className="mt-2 font-display text-2xl leading-tight text-white sm:text-[1.7rem]">{f.title}</h3>
        {f.body && <p className="mt-2 text-sm leading-relaxed text-white/65">{f.body}</p>}
      </div>
    );

  if (f.kind === "screen")
    return (
      <div className="relative w-[310px] overflow-hidden rounded-md border border-white/20 bg-[#08080c]/90 sm:w-[350px]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          {f.tag && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">{f.tag}</span>}
        </div>
        <div className="relative p-5">
          <h3 className="font-display text-2xl leading-tight text-white sm:text-[1.7rem]">{f.title}</h3>
          {f.body && <p className="mt-2 text-sm leading-relaxed text-white/70">{f.body}</p>}
          {/* a hint of a live interface */}
          <div className="mt-4 flex items-end gap-1.5">
            {[40, 66, 52, 80, 70, 92, 60].map((h, i) => (
              <span key={i} className="flex-1 rounded-sm bg-white/25" style={{ height: h * 0.32 }} />
            ))}
          </div>
          {/* faint CRT scan, kept subtle so it never competes with the words */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-scan h-8 w-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />
      </div>
    );

  // blueprint
  return (
    <div
      className="relative w-[300px] border border-white/20 p-5 sm:w-[340px]"
      style={{
        backgroundColor: "rgba(9,9,14,0.86)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="flex items-center justify-between">
        {f.tag && <Tag>{f.tag}</Tag>}
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">spec</span>
      </div>
      <h3 className="mt-2 font-display text-2xl leading-tight text-white sm:text-[1.7rem]">{f.title}</h3>
      {f.body && <p className="mt-2 text-sm leading-relaxed text-white/65">{f.body}</p>}
      <div className="mt-4 flex items-center gap-2">
        <span className="h-px flex-1 bg-white/25" />
        <span className="font-mono text-[9px] text-white/35">↔</span>
        <span className="h-px flex-1 border-t border-dashed border-white/25" />
      </div>
    </div>
  );
}

const POLE = 156; // height a rooftop feature floats above its roof

export function Parkour() {
  const { w: vw, h: vh } = useVp();
  const SCROLL = vw * 34;
  // On phones the runner sits centred so the rooftop content (which is centred
  // over him) stays fully on-screen; on wider screens he runs left-of-centre
  // with the content given room to the right.
  const charX = vw < 640 ? vw * 0.5 : vw * 0.3;
  const baseY = vh * 0.72; // screen-y of an elevation-0 rooftop

  const section = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const farL = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const stars = useRef<HTMLDivElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const root = useRef<SVGSVGElement>(null);

  const [skill, setSkill] = useState<Skill>("run");
  const [actIdx, setActIdx] = useState(0);
  const [pinned, setPinned] = useState(false);
  const last = useRef({ skill: "run", act: 0, pinned: false });

  const buildings = useMemo(() => segments.filter((s) => s.kind === "building"), []);
  const features = useMemo(() => segments.filter((s) => s.feature), []);
  const skyline = useMemo(() => {
    const r = rng(7);
    return Array.from({ length: 60 }, () => ({
      x: r() * (SCROLL + vw),
      w: 60 + r() * 150,
      h: vh * 0.1 + r() * vh * 0.32,
    }));
  }, [vw, vh, SCROLL]);
  const starfield = useMemo(() => {
    const r = rng(31);
    return Array.from({ length: 70 }, () => ({
      x: r() * 100,
      y: r() * 55,
      s: 0.6 + r() * 1.6,
      o: 0.3 + r() * 0.6,
    }));
  }, []);

  const ref = {
    far: useRef<SVGPathElement>(null),
    core: useRef<SVGPathElement>(null),
    near: useRef<SVGPathElement>(null),
    edge: useRef<SVGPathElement>(null),
    belt: useRef<SVGGElement>(null),
  };

  useEffect(() => {
    const apply = () => {
      const sec = section.current;
      if (!sec) return;
      const range = sec.offsetHeight - window.innerHeight;
      const rel = window.scrollY - sec.offsetTop;
      const p = Math.min(1, Math.max(0, rel / (range || 1)));
      const inView = rel > -window.innerHeight * 0.5 && rel < range + window.innerHeight * 0.5;

      if (world.current) world.current.style.transform = `translate3d(${-p * SCROLL}px,0,0)`;
      if (farL.current) farL.current.style.transform = `translate3d(${-p * SCROLL * 0.4}px,0,0)`;
      if (meter.current) meter.current.style.transform = `scaleX(${p})`;
      if (hint.current) hint.current.style.opacity = p < 0.025 ? "1" : "0";

      // atmosphere arc: dim dawn → bright mid-journey → night by the end
      if (glow.current) glow.current.style.opacity = String(0.12 + 0.32 * Math.sin(Math.PI * p));
      if (stars.current) stars.current.style.opacity = String(Math.max(0, (p - 0.42) / 0.4) * 0.85);
      if (night.current) night.current.style.opacity = String(Math.max(0, (p - 0.5) / 0.45) * 0.55);

      const s = sample(p);
      const j = kinematics(s.pose, s.rot, s.scaleX);
      const b = buildBody(j);
      if (root.current) root.current.style.transform = `translate(${charX - 80}px, ${baseY - s.lift - 210}px)`;
      ref.far.current?.setAttribute("d", b.far);
      ref.core.current?.setAttribute("d", b.core);
      ref.near.current?.setAttribute("d", b.near);
      ref.edge.current?.setAttribute("d", b.edge);
      ref.belt.current?.setAttribute("transform", b.belt);

      if (shadow.current) {
        const air = Math.max(0, s.lift - s.ground);
        shadow.current.style.transform = `translate3d(${charX}px, ${baseY - s.ground}px, 0) translate(-50%,-50%) scaleX(${1 - Math.min(0.55, air / 300)})`;
        shadow.current.style.opacity = String(Math.max(0.04, 0.28 - air / 340));
      }

      // act detection (last act whose start we've passed)
      let ai = 0;
      for (let k = 0; k < acts.length; k++) if (p >= acts[k].s - 0.001) ai = k;

      const L = last.current;
      if (s.skill !== L.skill) { L.skill = s.skill; setSkill(s.skill); }
      if (ai !== L.act) { L.act = ai; setActIdx(ai); }
      if (inView !== L.pinned) { L.pinned = inView; setPinned(inView); }
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vw, vh, SCROLL, charX, baseY]);

  return (
    <section id="run" ref={section} className="relative h-[840vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* deep, premium night-city sky (always dark — no jarring bright flash) */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom,#04040a 0%,#0a0b13 46%,#0c0d16 64%,#050507 100%)" }}
        />
        {/* stars — fade in as night falls toward the final acts */}
        <div ref={stars} className="pointer-events-none absolute inset-0" style={{ opacity: 0 }}>
          {starfield.map((st, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, opacity: st.o }}
            />
          ))}
        </div>
        {/* horizon glow behind the runner — brightest at mid-journey */}
        <div
          ref={glow}
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(120% 70% at 30% 78%, rgba(255,255,255,0.5), rgba(255,255,255,0.08) 46%, transparent 72%)", opacity: 0.12 }}
        />

        {/* distant parallax skyline */}
        <div ref={farL} className="absolute inset-0 will-change-transform">
          {skyline.map((b, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: b.x, bottom: vh * 0.24, width: b.w, height: b.h, background: "#0a0a12", opacity: 0.8, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>
        {/* fog seating the city base */}
        <div
          className="pointer-events-none absolute inset-x-0"
          style={{ top: baseY - 30, height: 110, background: "linear-gradient(to top, rgba(120,130,160,0.18), transparent)" }}
        />

        {/* ACT watermark — the district name written huge across the sky, BEHIND
            the city and its content so it never competes with what you read */}
        {pinned && (
          <div key={actIdx} className="animate-actcard pointer-events-none absolute inset-x-0 top-[11%] z-0 text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.7em] text-white/30 sm:text-xs">
              Act {acts[actIdx]?.no}
            </div>
            <h2 className="mt-3 font-display font-medium leading-[0.88] tracking-tight text-white/[0.12] text-[15vw] sm:text-[11vw]">
              {acts[actIdx]?.title}
            </h2>
          </div>
        )}

        {/* WORLD: buildings, machinery, discovered content */}
        <div ref={world} className="absolute inset-0 will-change-transform">
          {buildings.map((s, i) => {
            const prev = segments[s.i - 1];
            const grabTarget = prev?.kind === "gap" && (prev.skill === "climb" || prev.skill === "wallrun");
            return (
              <div
                key={`bld${i}`}
                className="absolute"
                style={{
                  left: charX + s.s * SCROLL,
                  top: baseY - s.elev,
                  width: (s.e - s.s) * SCROLL,
                  height: vh,
                  backgroundColor: "#060609",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 46px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 38px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* a lit lip on the platforms he grabs — the ledge to catch */}
                {grabTarget && (
                  <div
                    className="absolute left-0 top-0"
                    style={{
                      width: 60,
                      height: 9,
                      transform: "translateY(-100%)",
                      background: "#0c0c12",
                      borderTop: "2px solid rgba(255,255,255,0.45)",
                      borderRight: "1px solid rgba(255,255,255,0.2)",
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* machinery */}
          <svg className="absolute left-0 top-0 overflow-visible" style={{ width: SCROLL + vw, height: 1 }}>
            {buildings.map((s, i) =>
              s.prop !== "none" ? (
                <g key={`pr${i}`} transform={`translate(${charX + ((s.s + s.e) / 2) * SCROLL}, ${baseY - s.elev})`}>
                  <Prop type={s.prop} />
                </g>
              ) : null
            )}
          </svg>

          {/* features — billboards/screens float on a pole; graffiti sits on the wall */}
          {features.map((s, i) => {
            const f = s.feature!;
            const cx = charX + ((s.s + s.e) / 2) * SCROLL;
            const roofY = baseY - s.elev;
            const isWall = f.kind === "graffiti";
            return (
              <div key={`ft${i}`} className="absolute" style={{ left: cx, top: roofY }}>
                {!isWall && (
                  <>
                    <div
                      className="absolute"
                      style={{ left: 0, top: -POLE, width: 2, height: POLE, transform: "translateX(-50%)", background: "linear-gradient(to top, rgba(255,255,255,0.22), rgba(255,255,255,0.04))" }}
                    />
                    <div
                      className="absolute"
                      style={{ left: 0, top: -7, width: 36, height: 7, transform: "translateX(-50%)", background: "#0a0a0e", border: "1px solid rgba(255,255,255,0.14)" }}
                    />
                  </>
                )}
                <div
                  className="absolute"
                  style={{ left: 0, top: isWall ? 44 : -POLE, transform: isWall ? "translate(-50%,0)" : "translate(-50%,-100%)" }}
                >
                  <FeatureView f={f} />
                </div>
              </div>
            );
          })}
        </div>

        {/* planted contact shadow */}
        <div
          ref={shadow}
          className="pointer-events-none absolute left-0 top-0 h-[10px] w-[64px] rounded-[50%] will-change-transform"
          style={{ background: "rgba(0,0,0,0.55)", filter: "blur(3px)" }}
        />

        {/* the filled hooded runner */}
        <svg
          ref={root}
          width="160"
          height="220"
          viewBox="-80 -150 160 220"
          className="absolute left-0 top-0 z-20 overflow-visible"
          style={{ willChange: "transform", filter: "drop-shadow(0 0 22px rgba(255,255,255,0.18))" }}
          aria-hidden
        >
          <path ref={ref.far} fill="#f4f4f6" />
          <path ref={ref.core} fill="#fafafa" />
          <path ref={ref.near} fill="#ffffff" />
          <g ref={ref.belt}>
            <rect x={-12} y={-2.6} width={24} height={5.2} rx={2} fill="#0a0a0a" opacity={0.85} />
          </g>
          <path ref={ref.edge} fill="none" stroke="#0a0a0a" strokeWidth={1} opacity={0.18} style={{ vectorEffect: "non-scaling-stroke" } as React.CSSProperties} />
        </svg>

        {/* seam-blend with neighbouring black sections */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />

        {/* HUD */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="container-px flex items-start justify-between pt-6 sm:pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
              The Run · {acts[actIdx]?.no} {acts[actIdx]?.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/75">{SKILL_LABEL[skill]}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/12">
            <div ref={meter} className="h-full w-full origin-left bg-white/70" style={{ transform: "scaleX(0)" }} />
          </div>
          <div
            ref={hint}
            className="absolute bottom-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/55 transition-opacity duration-300"
          >
            scroll to run →
          </div>
        </div>
      </div>
    </section>
  );
}
