"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { founder } from "@/lib/world";

const WORD = "founder";

/**
 * Hidden easter egg. Two ways in: type the word "founder", or find the faint
 * star drifting in the corner and click it. Unlocks Founder Mode.
 */
export function Secret() {
  const [open, setOpen] = useState(false);
  const buf = useRef("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      const el = document.activeElement;
      if (el && /input|textarea/i.test(el.tagName)) return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      buf.current = (buf.current + e.key.toLowerCase()).slice(-WORD.length);
      if (buf.current === WORD) {
        setOpen(true);
        buf.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* the hidden star — faint until a curious cursor finds it */}
      <button
        type="button"
        aria-label="A secret"
        onClick={() => setOpen(true)}
        data-cursor="hover"
        className="fixed right-5 top-1/2 z-30 text-base text-white/10 transition-all duration-500 hover:scale-150 hover:text-white"
        title="…"
      >
        ✦
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Founder mode"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg border border-white/20 bg-black p-8 sm:p-10"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>

              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
                ✦ Founder mode
              </span>
              <h3 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                You found the door behind the curtain.
              </h3>

              <div className="mt-8 space-y-6 text-sm">
                <Block label="Right now, I'm focused on">
                  <p className="text-white/85">{founder.focus}</p>
                </Block>
                <Block label="Things I'm building">
                  <List items={[...founder.building]} />
                </Block>
                <Block label="Where this is going">
                  <List items={[...founder.ambitions]} />
                </Block>
                <Block label="Availability">
                  <p className="text-white">{founder.availability}</p>
                </Block>
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-cursor="hover"
                className="mt-9 inline-block border-b border-white pb-1 font-semibold text-white"
              >
                Now let&apos;s talk →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        {label}
      </p>
      {children}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex gap-2 text-white/85">
          <span className="text-white/40">—</span>
          {it}
        </li>
      ))}
    </ul>
  );
}
