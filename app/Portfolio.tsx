"use client";

import { useEffect, useRef, useState } from "react";
import { hero, builds, projects, principles, beliefs } from "@/lib/story";
import { siteConfig, mailtoLink, whatsappLink } from "@/lib/site";

/* Jarring brutalist accent palette — the CHAOS button cycles through it. */
const PALETTE = ["#ff2d1a", "#2b44ff", "#ffe600", "#ff4fa3", "#00d17a"];

/* Injected, fully self-contained CSS (keeps the existing site untouched). */
const STYLE = `
@keyframes v2mL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes v2mR{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes v2blink{0%,49%{opacity:1}50%,100%{opacity:0}}
.v2-marq:hover .v2-track{animation-play-state:paused}
.v2-card{transition:transform .12s steps(2),box-shadow .12s steps(2)}
.v2-card:hover{transform:translate(-3px,-3px);box-shadow:11px 11px 0 #000}
`;

/* ── scramble-in headline ─────────────────────────────────────────────────── */
function Scramble({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&*/\\<>0123456789";
    let f = 0;
    const total = text.length * 1.6 + 8;
    const id = setInterval(() => {
      f++;
      setOut(text.split("").map((c, i) => (c === " " ? " " : i < f / 1.6 ? c : chars[Math.floor(Math.random() * chars.length)])).join(""));
      if (f > total) { clearInterval(id); setOut(text); }
    }, 26);
    return () => clearInterval(id);
  }, [text]);
  return <span className={className} style={style}>{out}</span>;
}

/* ── full-bleed scrolling marquee ─────────────────────────────────────────── */
function Marquee({ items, reverse, duration = 24, dark = true }: { items: string[]; reverse?: boolean; duration?: number; dark?: boolean }) {
  const blob = items.join("   ✺   ") + "   ✺   ";
  return (
    <div className={`v2-marq overflow-hidden border-y-[3px] border-black py-3 ${dark ? "bg-black text-white" : "text-black"}`} style={dark ? {} : { background: "var(--accent)" }}>
      <div className="v2-track flex w-max whitespace-nowrap" style={{ animation: `${reverse ? "v2mR" : "v2mL"} ${duration}s linear infinite` }}>
        <span className="px-4 text-xl font-black uppercase tracking-tight sm:text-2xl">{blob}</span>
        <span className="px-4 text-xl font-black uppercase tracking-tight sm:text-2xl" aria-hidden>{blob}</span>
      </div>
    </div>
  );
}

/* ── interactive headline word machine ───────────────────────────────────── */
const SLOTS = [
  ["EFFORTLESS", "FAST", "HONEST", "MEMORABLE", "RIDICULOUS"],
  ["WEBSITES", "WEB APPS", "AI TOOLS", "INTERFACES", "WEAPONS"],
];
function HeadlineMachine() {
  const [idx, setIdx] = useState([0, 0]);
  const shuffle = () => setIdx(idx.map((_, i) => Math.floor(Math.random() * SLOTS[i].length)));
  return (
    <div className="border-[3px] border-black bg-white p-6 sm:p-10" style={{ boxShadow: "8px 8px 0 #000" }}>
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">{"// the elevator pitch, randomised"}</div>
      <p className="mt-4 text-3xl font-black uppercase leading-[1.05] sm:text-5xl">
        I build{" "}
        <button onClick={shuffle} className="inline-block border-[3px] border-black px-2 align-middle text-black" style={{ background: "var(--accent)" }}>
          {SLOTS[0][idx[0]]}
        </button>{" "}
        <button onClick={shuffle} className="inline-block border-[3px] border-black px-2 align-middle text-black" style={{ background: "var(--accent)" }}>
          {SLOTS[1][idx[1]]}
        </button>{" "}
        for founders who refuse to look generic.
      </p>
      <button onClick={shuffle} className="mt-6 border-[3px] border-black bg-black px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition-transform hover:-translate-y-1 active:translate-y-0">
        ⟳ shuffle the pitch
      </button>
    </div>
  );
}

/* ── draggable sticker board ──────────────────────────────────────────────── */
function Sticker({ children, x, y, rot }: { children: React.ReactNode; x: number; y: number; rot: number }) {
  const [p, setP] = useState({ x, y });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  return (
    <button
      onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); drag.current = { sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y }; }}
      onPointerMove={(e) => { if (drag.current) setP({ x: drag.current.ox + (e.clientX - drag.current.sx), y: drag.current.oy + (e.clientY - drag.current.sy) }); }}
      onPointerUp={() => (drag.current = null)}
      className="absolute cursor-grab touch-none select-none border-[3px] border-black px-4 py-2 text-sm font-black uppercase tracking-wide active:cursor-grabbing"
      style={{ left: 0, top: 0, transform: `translate(${p.x}px, ${p.y}px) rotate(${rot}deg)`, background: "var(--accent)", boxShadow: "5px 5px 0 #000" }}
    >
      {children}
    </button>
  );
}
function StickerBoard() {
  const stk = [
    { t: "DRAG ME →", x: 24, y: 30, r: -6 },
    { t: "NO TEMPLATES", x: 220, y: 60, r: 5 },
    { t: "100% HUMAN", x: 70, y: 150, r: -3 },
    { t: "SHIP IT", x: 320, y: 150, r: 8 },
    { t: "DETAILS > VIBES", x: 150, y: 240, r: -7 },
    { t: "FAST BEATS FANCY", x: 360, y: 250, r: 4 },
  ];
  return (
    <div className="relative h-[340px] w-full overflow-hidden border-[3px] border-black bg-white sm:h-[320px]" style={{ boxShadow: "8px 8px 0 #000", backgroundImage: "radial-gradient(#0001 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }}>
      {stk.map((s) => <Sticker key={s.t} x={s.x} y={s.y} rot={s.r}>{s.t}</Sticker>)}
    </div>
  );
}

/* ── copy-to-clipboard email ──────────────────────────────────────────────── */
function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard?.writeText(email).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); })}
      className="w-full break-all border-[3px] border-black bg-white px-5 py-4 text-left text-lg font-black uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
      style={{ boxShadow: "6px 6px 0 var(--accent)" }}
    >
      {done ? "COPIED ✓" : email}
    </button>
  );
}

/* ── the page ─────────────────────────────────────────────────────────────── */
export function Portfolio() {
  const [accent, setAccent] = useState(0);
  const [openBuild, setOpenBuild] = useState<number | null>(0);
  const [openProj, setOpenProj] = useState<number | null>(null);
  const wa = whatsappLink();

  return (
    <div className="v2 min-h-screen bg-white font-mono text-black" style={{ ["--accent" as string]: PALETTE[accent] }}>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-black bg-white px-5 py-3 sm:px-8">
        <a href="#top" className="text-sm font-black uppercase tracking-tight sm:text-base">JIGNESH RAHEJA</a>
        <nav className="flex items-center gap-2 sm:gap-3">
          {[["WORK", "#work"], ["THINKING", "#think"], ["CONTACT", "#contact"]].map(([l, h]) => (
            <a key={h} href={h} className="hidden border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white sm:block">{l}</a>
          ))}
          <button onClick={() => setAccent((a) => (a + 1) % PALETTE.length)} className="border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase text-black" style={{ background: "var(--accent)" }} title="Change everything">
            CHAOS ⚡
          </button>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* HERO */}
        <section className="relative pt-14 sm:pt-20">
          <span className="inline-flex items-center gap-2 border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase tracking-widest" style={{ background: "var(--accent)" }}>
            <span className="h-2.5 w-2.5 bg-black" style={{ animation: "v2blink 1s steps(1) infinite" }} />
            {hero.available}
          </span>
          <h1 className="mt-6 text-[15vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-[7rem]">
            <Scramble text="I BUILD" /><br />
            <Scramble text="DIGITAL" style={{ WebkitTextStroke: "2px #000", color: "transparent" }} /><br />
            <Scramble text="PRODUCTS." />
          </h1>
          <p className="mt-7 max-w-xl border-l-[6px] border-black pl-4 text-base leading-relaxed sm:text-lg">{hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="border-[3px] border-black bg-black px-7 py-4 text-center text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-1 hover:-translate-y-1" style={{ boxShadow: "6px 6px 0 var(--accent)" }}>
              START A PROJECT →
            </a>
            <a href="/roast" className="border-[3px] border-black px-7 py-4 text-center text-base font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white">
              ROAST MY SITE 🔥
            </a>
          </div>
        </section>

        <div className="mt-14 sm:mt-20" />
      </main>

      {/* MARQUEE */}
      <Marquee items={["AVAILABLE FOR FREELANCE WORK", "WEBSITES", "WEB APPS", "AI TOOLS", "REDESIGNS", "NO GENERIC ALLOWED"]} duration={26} />

      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* HEADLINE MACHINE */}
        <section className="py-14 sm:py-20"><HeadlineMachine /></section>

        {/* WHAT I BUILD */}
        <section className="pb-14 sm:pb-20">
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">WHAT I BUILD</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {builds.map((b, i) => {
              const open = openBuild === i;
              return (
                <button key={b.no} onClick={() => setOpenBuild(open ? null : i)} className="v2-card block border-[3px] border-black bg-white p-6 text-left" style={{ boxShadow: "8px 8px 0 #000" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-5xl font-black sm:text-6xl" style={{ WebkitTextStroke: "2px #000", color: open ? "var(--accent)" : "transparent" }}>{b.no}</span>
                    <span className="text-2xl font-black">{open ? "–" : "+"}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black uppercase leading-none">{b.title}</h3>
                  {open && <p className="mt-3 text-sm leading-relaxed">{b.body}</p>}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <Marquee items={beliefs.map((b) => b.belief)} reverse duration={28} dark={false} />

      {/* SELECTED WORK */}
      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <section id="work" className="py-14 sm:py-20">
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">SELECTED WORK</h2>
          <div className="border-[3px] border-black" style={{ boxShadow: "8px 8px 0 #000" }}>
            {projects.map((p, i) => {
              const open = openProj === i;
              return (
                <div key={p.no} className={i ? "border-t-[3px] border-black" : ""}>
                  <button onClick={() => setOpenProj(open ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-black hover:text-white sm:p-6" style={open ? { background: "var(--accent)", color: "#000" } : undefined}>
                    <span className="flex items-baseline gap-4">
                      <span className="text-sm font-black">{p.no}</span>
                      <span className="text-2xl font-black uppercase leading-none sm:text-4xl">{p.name}</span>
                    </span>
                    <span className="shrink-0 text-2xl font-black">{open ? "–" : "+"}</span>
                  </button>
                  {open && (
                    <div className="grid gap-4 border-t-[3px] border-black p-5 sm:grid-cols-3 sm:p-6">
                      {[["PROBLEM", p.problem], ["IDEA", p.move], ["OUTCOME", p.outcome]].map(([k, v]) => (
                        <div key={k}>
                          <div className="text-[11px] font-black uppercase tracking-widest text-black/50">{k}</div>
                          <p className="mt-1 text-sm leading-snug">{v}</p>
                        </div>
                      ))}
                      <p className="border-t-[3px] border-black pt-4 text-lg font-black uppercase leading-tight sm:col-span-3" style={{ color: "var(--accent)", WebkitTextStroke: "0.4px #000" }}>
                        ◆ {p.takeaway}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW I THINK */}
        <section id="think" className="pb-14 sm:pb-20">
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">HOW I THINK</h2>
          <div className="space-y-5">
            {principles.map((pr, i) => (
              <div key={pr.k} className="border-[3px] border-black p-6 sm:p-8" style={{ boxShadow: "8px 8px 0 #000", background: i % 2 ? "#000" : "#fff", color: i % 2 ? "#fff" : "#000" }}>
                <div className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>0{i + 1}</div>
                <p className="mt-2 text-2xl font-black uppercase leading-tight sm:text-4xl">{pr.big}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-70">{pr.small}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STICKER BOARD */}
        <section className="pb-14 sm:pb-20">
          <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter sm:text-6xl">DRAG STUFF AROUND</h2>
          <p className="mb-6 text-sm font-bold uppercase tracking-widest text-black/50">{"// because static is boring. grab the stickers."}</p>
          <StickerBoard />
        </section>

        {/* ROAST CTA */}
        <section className="pb-14 sm:pb-20">
          <a href="/roast" className="block border-[3px] border-black p-8 text-black transition-transform hover:-translate-x-1 hover:-translate-y-1 sm:p-12" style={{ background: "var(--accent)", boxShadow: "10px 10px 0 #000" }}>
            <div className="text-xs font-black uppercase tracking-[0.3em]">{"// the side quest"}</div>
            <p className="mt-3 text-4xl font-black uppercase leading-none sm:text-7xl">ROAST MY SITE 🔥</p>
            <p className="mt-4 max-w-xl text-base font-bold leading-snug">Paste any URL and watch me tear it apart, line by line — then offer to fix it. Free brutality. Click to play →</p>
          </a>
        </section>
      </main>

      {/* CONTACT */}
      <section id="contact" className="border-t-[3px] border-black bg-black text-white">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-8xl">
            LET&apos;S<br /><span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>BUILD</span><br />SOMETHING.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70">Open for 1–2 projects this quarter. Tell me what you&apos;re making — or just say hi.</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2"><CopyEmail email={siteConfig.email} /></div>
            <a href={mailtoLink(`Hello ${siteConfig.name}`)} className="border-[3px] border-white px-5 py-4 text-lg font-black uppercase transition-colors hover:bg-white hover:text-black">EMAIL →</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="border-[3px] border-white px-5 py-4 text-lg font-black uppercase transition-colors hover:bg-white hover:text-black">LINKEDIN →</a>
            {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="border-[3px] border-white px-5 py-4 text-lg font-black uppercase transition-colors hover:bg-white hover:text-black">WHATSAPP →</a>}
            {siteConfig.calendly && <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="border-[3px] border-white px-5 py-4 text-lg font-black uppercase transition-colors hover:bg-white hover:text-black">BOOK A CALL →</a>}
          </div>

          <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-white/30 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            <span>{siteConfig.name} — {siteConfig.role}</span>
            <a href="/roast" className="underline decoration-2 underline-offset-4 hover:text-white">roast a site →</a>
          </footer>
        </div>
      </section>
    </div>
  );
}
