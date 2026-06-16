"use client";

import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { hero } from "@/lib/story";

const links = [
  { href: "#build", label: "Build" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          solid ? "border-b border-white/10 bg-black/70 backdrop-blur-md" : ""
        }`}
      >
        <nav className="container-px flex items-center justify-between py-4">
          <a href="#top" data-cursor="hover" className="font-mono text-sm font-semibold tracking-tight text-white">
            {hero.name}
          </a>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 sm:flex">
              {links.slice(0, 2).map((l) => (
                <a key={l.href} href={l.href} data-cursor="hover" className="text-sm text-white/60 transition-colors hover:text-white">
                  {l.label}
                </a>
              ))}
            </div>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                data-cursor="hover"
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Let&apos;s talk
              </a>
            </Magnetic>
          </div>
        </nav>
      </div>
    </header>
  );
}
