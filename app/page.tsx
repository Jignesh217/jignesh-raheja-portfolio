import type { Metadata } from "next";
import { Portfolio } from "./Portfolio";

export const metadata: Metadata = {
  title: { absolute: "Jignesh Raheja — Full-Stack Developer & Product Builder" },
  description:
    "Jignesh Raheja builds websites, web apps, and AI tools that are clear, fast, and genuinely worth remembering. A loud, interactive, brutalist portfolio.",
};

// The brutalist, interactive portfolio — the whole site.
export default function Home() {
  return <Portfolio />;
}
