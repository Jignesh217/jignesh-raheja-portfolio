import type { Metadata } from "next";
import { RoastApp } from "./RoastApp";

export const metadata: Metadata = {
  title: "Roast My Site",
  description:
    "Paste a URL and get it taken apart, line by line — then rebuilt by someone who won't let it happen again. A brutally honest site roast by Jignesh Raheja.",
  robots: { index: true, follow: true },
};

export default function RoastPage() {
  return <RoastApp />;
}
