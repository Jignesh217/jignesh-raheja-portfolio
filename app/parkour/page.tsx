import type { Metadata } from "next";
import { Vignette } from "@/components/world/Atmosphere";
import { Nav } from "@/components/run/Nav";
import { Hero } from "@/components/run/Hero";
import { Parkour } from "@/components/run/Parkour";
import { Arrival } from "@/components/run/Arrival";
import { Build } from "@/components/run/Build";
import { Projects } from "@/components/run/Projects";
import { Ending } from "@/components/run/Ending";
import { Secret } from "@/components/levels/Secret";

export const metadata: Metadata = {
  title: "The Parkour Cut",
  description:
    "A scroll-driven parkour run that tells the whole story from the rooftops — the original interactive cut of Jignesh Raheja's portfolio.",
  robots: { index: true, follow: true },
};

// The original game-as-spine portfolio, preserved at /parkour.
export default function ParkourPage() {
  return (
    <>
      <Vignette />
      <Nav />
      <Secret />
      <main className="relative bg-black">
        <Hero />
        <Parkour />
        <Arrival />
        <Build />
        <Projects />
        <Ending />
      </main>
    </>
  );
}
