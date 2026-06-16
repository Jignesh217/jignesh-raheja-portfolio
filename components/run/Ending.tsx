"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, CalendarClock } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { RunnerLoop } from "./RunnerLoop";
import { ending, principles } from "@/lib/story";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site";

export function Ending() {
  const wa = whatsappLink();
  const bookCall = siteConfig.calendly || mailtoLink(`Booking a call with ${siteConfig.name}`);
  const links = [
    { label: "Email", value: siteConfig.email, href: mailtoLink(`Hello ${siteConfig.name}`), icon: Mail, ext: false },
    { label: "LinkedIn", value: "Connect with me", href: siteConfig.linkedin, icon: Linkedin, ext: true },
    wa ? { label: "WhatsApp", value: "Send a message", href: wa, icon: MessageCircle, ext: true } : null,
    { label: "Book a call", value: "Find a time", href: bookCall, icon: CalendarClock, ext: !!siteConfig.calendly },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: typeof Mail; ext: boolean }[];

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      {/* a quiet rooftop horizon — never a blank screen */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end opacity-30">
        {Array.from({ length: 52 }).map((_, i) => (
          <div key={i} className="bg-[#0c0c0c]" style={{ width: `${100 / 52}%`, height: 30 + ((i * 47) % 120), boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)" }} />
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="container-px relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end gap-3"
        >
          <RunnerLoop size={64} speed={0.85} />
          <span className="mb-1 h-px w-24 bg-white/30" />
        </motion.div>

        <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl">
          {ending.line}
          <br className="hidden sm:block" />
          <span className="text-white/55"> {ending.line2}</span>
        </h2>

        {/* why me — the last, quiet argument before the ask */}
        <div className="mt-14 grid max-w-4xl gap-x-10 gap-y-7 sm:grid-cols-2">
          {principles.map((pr) => (
            <div key={pr.k} className="border-l border-white/15 pl-5">
              <p className="font-display text-xl leading-snug text-white sm:text-2xl">{pr.big}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{pr.small}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.3em] text-white/45">
          Available for freelance work — open to 1–2 projects this quarter.
        </p>

        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Magnetic key={l.label} strength={0.15}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 border border-white/15 px-6 py-5 transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <Icon size={20} />
                  <span className="flex flex-col">
                    <span className="text-base font-semibold text-white group-hover:text-black">{l.label}</span>
                    <span className="text-sm text-white/50 group-hover:text-black/60">{l.value}</span>
                  </span>
                </a>
              </Magnetic>
            );
          })}
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
          {siteConfig.name} — {siteConfig.role}
        </p>
      </div>
    </section>
  );
}
