/**
 * The story. Written to sound like a real, ambitious builder — confident,
 * curious, thoughtful. No fabricated clients, metrics, or achievements.
 * Projects are concept pieces, clearly framed as such.
 */

export const hero = {
  name: "Jignesh Raheja",
  // The 10-second answer: who, what, why-different.
  headline: ["I build digital products", "that feel effortless."],
  sub: "Full-stack developer & product builder. I help founders launch websites, web apps, and AI tools that are clear, fast, and genuinely worth remembering.",
  available: "Available for freelance work",
} as const;

/* ------------------------------ What I build ------------------------------ */

export interface BuildItem {
  no: string;
  title: string;
  body: string;
}

export const builds: BuildItem[] = [
  {
    no: "01",
    title: "Websites that earn trust",
    body: "Marketing sites that make people believe you before they ever pick up the phone — fast, clear, and built to convert.",
  },
  {
    no: "02",
    title: "Web apps that feel simple",
    body: "Dashboards, portals and SaaS products with real architecture underneath and an interface people actually enjoy using.",
  },
  {
    no: "03",
    title: "AI tools that make sense",
    body: "LLM features that remove busywork instead of adding noise — explained so clearly the magic feels obvious.",
  },
  {
    no: "04",
    title: "Redesigns that wake things up",
    body: "Taking something dated and slow and turning it into something modern, quick, and unmistakably yours.",
  },
];

/* ----------------------------- How I think -------------------------------- */
// Personality, revealed as short confident statements.

export const principles = [
  {
    k: "care",
    big: "I care about the details nobody asks for.",
    small: "The 1% you can't quite name is the 1% everybody feels. I live there.",
  },
  {
    k: "feel",
    big: "I obsess over how it feels, not just how it looks.",
    small: "Beautiful is table stakes. The win is when something feels effortless to use.",
  },
  {
    k: "memorable",
    big: "I'd rather build something memorable than something trendy.",
    small: "Trends age in a season. A site people remember keeps working for years.",
  },
  {
    k: "partner",
    big: "I work like a partner, not a vendor.",
    small: "I ask why we're building this — and I'll tell you when I think we shouldn't.",
  },
];

/* ----------------------------- What I believe ----------------------------- */

export const beliefs = [
  { belief: "Good design disappears.", note: "If you notice it, it got in the way." },
  { belief: "Fast beats fancy.", note: "Nobody waits for a clever animation to load." },
  { belief: "Simple is the hard part.", note: "Subtraction is the most underrated skill there is." },
  { belief: "Experiences outlast features.", note: "People forget what you built. They remember how it felt." },
];

/* -------------------------------- Projects -------------------------------- */

export type SceneId = "dashboard" | "blueprint" | "machine" | "system";

export interface Project {
  kind: "concept";
  no: string;
  name: string;
  category: string;
  scene: SceneId;
  problem: string; // one line
  move: string; // the idea, one line
  outcome: string; // one line
  takeaway: string; // the point — what this reveals about working with me
}

// Concise on purpose — the interactive scene does the showing.
export const projects: Project[] = [
  {
    kind: "concept",
    no: "01",
    name: "The Quiet Dashboard",
    category: "SaaS Product",
    scene: "dashboard",
    problem: "A team running on spreadsheets, with no shared view of how things were going.",
    move: "Show the one number that changes a decision — hide the rest until asked.",
    outcome: "A single source of truth the whole team actually opens.",
    takeaway: "I build for the one decision that matters — not for the demo.",
  },
  {
    kind: "concept",
    no: "02",
    name: "First Impression",
    category: "Brand Website",
    scene: "blueprint",
    problem: "Great work, a website that made them look like everyone else.",
    move: "Earn belief in the first three seconds — before a word is read.",
    outcome: "Strangers arrived already convinced. The first call got easier.",
    takeaway: "Trust is won in the first scroll. I design that scroll on purpose.",
  },
  {
    kind: "concept",
    no: "03",
    name: "The Honest Machine",
    category: "AI Tool",
    scene: "machine",
    problem: "An AI nobody trusted, because it never showed its sources.",
    move: "Make every answer traceable — the magic stops feeling like a trick.",
    outcome: "Hours saved a week, and the rare thing: an AI people believed.",
    takeaway: "If users can't trust it, it doesn't ship. I make the magic legible.",
  },
  {
    kind: "concept",
    no: "04",
    name: "Common Ground",
    category: "Design System",
    scene: "system",
    problem: "A product where every screen felt built by a different person.",
    move: "One small system — type, space, rhythm — so everything finally agreed.",
    outcome: "Faster builds, fewer arguments, a product that feels like one thing.",
    takeaway: "Consistency isn't a nice-to-have. It's how small teams move fast.",
  },
];

/* --------------------------- What's next / excites ------------------------ */

export const next = {
  intro: "What I'm building toward",
  items: [
    "AI that quietly removes busywork — not another chatbot nobody opens.",
    "Interfaces that feel alive without ever getting in the way.",
    "A small studio that ships a few unforgettable things a year, not forty forgettable ones.",
  ],
};

/* -------------------------------- Ending ---------------------------------- */

export const ending = {
  line: "If you've made it this far, thanks for spending a few minutes in my world.",
  line2: "Now I'd love to hear about yours.",
} as const;
