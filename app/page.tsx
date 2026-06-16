import type { Metadata } from "next";
import { Portfolio } from "./v2/Portfolio";

export const metadata: Metadata = {
  title: { absolute: "Jignesh Raheja — Full-Stack Developer & Product Builder" },
  description:
    "Jignesh Raheja builds websites, web apps, and AI tools that are clear, fast, and genuinely worth remembering. A loud, interactive, brutalist portfolio.",
};

// The brutalist, interactive portfolio is the front door.
// The original scroll-driven parkour cut lives on at /parkour.
export default function Home() {
  return <Portfolio />;
}
