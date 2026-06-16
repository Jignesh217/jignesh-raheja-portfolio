import type { Metadata } from "next";
import { Portfolio } from "./Portfolio";

export const metadata: Metadata = {
  title: "Jignesh Raheja — Brutalist Cut",
  description:
    "A loud, interactive, brutalist take on the portfolio of Jignesh Raheja — full-stack developer & product builder. Drag things, shuffle the pitch, change the colours, get your site roasted.",
  robots: { index: true, follow: true },
};

export default function V2Page() {
  return <Portfolio />;
}
