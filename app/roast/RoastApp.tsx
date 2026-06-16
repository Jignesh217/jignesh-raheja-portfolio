"use client";

import { useEffect, useRef, useState } from "react";
import { roastSite, cleanDomain, SCAN_STEPS, type Roast } from "./roast";
import { siteConfig, mailtoLink } from "@/lib/site";

const ACCENT = "#ff2d1a";

type Phase = "idle" | "scanning" | "done";

export function RoastApp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [url, setUrl] = useState("");
  const [scan, setScan] = useState<string[]>([]);
  const [roast, setRoast] = useState<Roast | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run(e?: React.FormEvent) {
    e?.preventDefault();
    if (!url.trim()) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setScan([]);
    setRoast(null);
    setPhase("scanning");

    const dom = cleanDomain(url);
    SCAN_STEPS.forEach((step, i) => {
      const id = window.setTimeout(() => {
        setScan((s) => [...s, `> ${step.replace("dns", `dns for ${dom}`)}`]);
      }, 220 * (i + 1));
      timers.current.push(id);
    });
    const done = window.setTimeout(() => {
      setRoast(roastSite(url));
      setPhase("done");
    }, 220 * (SCAN_STEPS.length + 1) + 350);
    timers.current.push(done);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    setPhase("idle");
    setRoast(null);
    setScan([]);
    setUrl("");
  }

  return (
    <main className="min-h-screen bg-white font-mono text-black">
      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        {/* top bar */}
        <div className="flex items-center justify-between border-b-[3px] border-black pb-3 text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs">
          <span>JIGNESH RAHEJA // SITE-ROAST v1.0</span>
          <a href="/" className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white">
            ← portfolio
          </a>
        </div>

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <header className="relative mt-10 sm:mt-14">
          <span
            className="absolute -right-1 top-0 rotate-6 border-[3px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white sm:text-xs"
            style={{ background: ACCENT, boxShadow: "5px 5px 0 #000" }}
          >
            brutal honesty
          </span>
          <h1 className="text-[16vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-8xl">
            Roast
            <br />
            My Site
          </h1>
          <p className="mt-6 max-w-xl border-l-[6px] border-black pl-4 text-sm leading-relaxed sm:text-base">
            Paste a URL. Get it taken apart, line by line. Then — if you can take a hint —
            get it rebuilt by someone who won&apos;t let it happen again.
          </p>
        </header>

        {/* ── INPUT ──────────────────────────────────────────────────────── */}
        {phase === "idle" && (
          <form onSubmit={run} className="mt-10">
            <label className="block text-xs font-bold uppercase tracking-[0.2em]">Drop the URL ↓</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="competitor-i-dont-like.com"
                autoComplete="off"
                spellCheck={false}
                className="w-full border-[3px] border-black bg-white px-4 py-4 text-base font-bold lowercase placeholder:text-black/30 focus:outline-none focus:ring-0"
                style={{ boxShadow: "6px 6px 0 #000" }}
              />
              <button
                type="submit"
                className="shrink-0 border-[3px] border-black px-7 py-4 text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]"
                style={{ background: "#000", boxShadow: `6px 6px 0 ${ACCENT}` }}
              >
                Roast it →
              </button>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-wider text-black/45">
              Satire. It doesn&apos;t crawl your real site — the fixes, however, are real.
            </p>
          </form>
        )}

        {/* ── SCANNING ───────────────────────────────────────────────────── */}
        {phase === "scanning" && (
          <div
            className="mt-10 border-[3px] border-black bg-black p-5 text-sm text-white sm:p-6"
            style={{ boxShadow: `8px 8px 0 ${ACCENT}` }}
          >
            <div className="mb-3 flex gap-2">
              <span className="h-3 w-3 border-2 border-white" />
              <span className="h-3 w-3 border-2 border-white" />
              <span className="h-3 w-3 border-2 border-white" />
            </div>
            {scan.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap leading-relaxed">{l}</div>
            ))}
            <span className="inline-block h-4 w-3 animate-pulse bg-white align-middle" />
          </div>
        )}

        {/* ── RESULTS ────────────────────────────────────────────────────── */}
        {phase === "done" && roast && (
          <section className="mt-10">
            <h2 className="text-2xl font-black uppercase leading-tight sm:text-4xl">
              We looked at <span style={{ background: ACCENT, color: "#fff", padding: "0 8px" }}>{roast.domain}</span>.
              <br className="hidden sm:block" /> We have notes.
            </h2>

            {/* big score */}
            <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr]">
              <div
                className="border-[3px] border-black px-6 py-5 text-center"
                style={{ boxShadow: "8px 8px 0 #000" }}
              >
                <div className="text-[12px] font-bold uppercase tracking-[0.2em]">Roast score</div>
                <div className="text-7xl font-black leading-none sm:text-8xl">{roast.score}</div>
                <div className="text-sm font-bold">/ 100</div>
              </div>
              <div
                className="flex flex-col justify-center border-[3px] border-black p-6 text-white"
                style={{ background: "#000", boxShadow: `8px 8px 0 ${ACCENT}` }}
              >
                <div className="text-3xl font-black uppercase leading-none sm:text-5xl" style={{ color: ACCENT }}>
                  {roast.grade}
                </div>
                <div className="mt-3 text-sm uppercase tracking-wide">{roast.gradeNote}</div>
              </div>
            </div>

            {/* category breakdown */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {roast.categories.map((c) => (
                <div key={c.key} className="border-[3px] border-black p-5" style={{ boxShadow: "6px 6px 0 #000" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">{c.label}</span>
                    <span className="text-xl font-black">{c.score}</span>
                  </div>
                  <div className="mt-2 h-4 w-full border-2 border-black">
                    <div className="h-full" style={{ width: `${c.score}%`, background: c.score < 50 ? ACCENT : "#000" }} />
                  </div>
                  <p className="mt-3 text-sm leading-snug">{c.line}</p>
                </div>
              ))}
            </div>

            {/* verdict */}
            <div className="mt-6 border-[3px] border-black p-6" style={{ background: ACCENT, boxShadow: "8px 8px 0 #000" }}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/70">Final verdict</div>
              <p className="mt-2 text-lg font-bold leading-snug text-white sm:text-2xl">{roast.verdict}</p>
            </div>

            {/* redemption CTA */}
            <div className="mt-6 border-[3px] border-black p-6" style={{ boxShadow: "8px 8px 0 #000" }}>
              <p className="text-xl font-black uppercase leading-tight sm:text-3xl">
                Brutal? Yes. Fixable? Also yes.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Roasts are free. Fixes aren&apos;t — but a site people actually trust pays for itself.
                I build websites, web apps and AI tools that don&apos;t need a roast.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={mailtoLink(`Fix my site — you roasted ${roast.domain}`)}
                  className="border-[3px] border-black px-6 py-4 text-center text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  style={{ background: "#000", boxShadow: `6px 6px 0 ${ACCENT}` }}
                >
                  → Get it fixed
                </a>
                <a
                  href="/"
                  className="border-[3px] border-black px-6 py-4 text-center text-base font-black uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
                >
                  See the work
                </a>
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-6 w-full border-[3px] border-black bg-white py-4 text-base font-black uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
            >
              ↻ Roast another
            </button>
          </section>
        )}

        {/* footer */}
        <footer className="mt-16 border-t-[3px] border-black pt-3 text-[11px] uppercase tracking-[0.2em] text-black/50">
          {siteConfig.name} — site-roast · all in good fun
        </footer>
      </div>
    </main>
  );
}
