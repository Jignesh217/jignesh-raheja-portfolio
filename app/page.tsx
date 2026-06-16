import { Vignette } from "@/components/world/Atmosphere";
import { Nav } from "@/components/run/Nav";
import { Hero } from "@/components/run/Hero";
import { Parkour } from "@/components/run/Parkour";
import { Arrival } from "@/components/run/Arrival";
import { Build } from "@/components/run/Build";
import { Projects } from "@/components/run/Projects";
import { Ending } from "@/components/run/Ending";
import { Secret } from "@/components/levels/Secret";

// The journey IS the portfolio. Hero is the title screen; Parkour is the
// five-act run that tells the whole story in-world; Arrival hands you off into
// the interactive proof (Build + Projects); Ending is the conversation.
export default function Page() {
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
