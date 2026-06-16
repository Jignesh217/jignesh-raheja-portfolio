/**
 * Content for the playable experience. One file, all the words.
 * No fabricated clients or metrics — projects are concept worlds, clearly
 * framed as such.
 */

/* ----------------------------- Level 1 · Entry ---------------------------- */

export const entryLines = [
  "Most websites are forgotten.",
  "Some become experiences.",
  "Keep scrolling.",
] as const;

/* ---------------------------- Level 2 · Parkour --------------------------- */

export const parkourPlatforms = [
  "I build websites.",
  "I build products.",
  "I build experiences.",
  "For people who refuse to blend in.",
] as const;

/* --------------------------- Level 3 · Playground ------------------------- */

export interface PlaygroundObject {
  id: string;
  label: string;
  title: string;
  line: string;
}

export const playgroundObjects: PlaygroundObject[] = [
  {
    id: "monitor",
    label: "the monitor",
    title: "What I do",
    line: "Full-stack development & product design. I take an idea and ship the whole thing — design, build, launch.",
  },
  {
    id: "terminal",
    label: "the terminal",
    title: "How I work",
    line: "Fast, honest, hands-on. You always know what's happening. I'd rather over-communicate than leave you guessing.",
  },
  {
    id: "cube",
    label: "the cube",
    title: "What I care about",
    line: "The details nobody asks for. That's the difference between a website and something people remember.",
  },
  {
    id: "door",
    label: "the door",
    title: "Who I'm for",
    line: "Founders and small teams who'd rather stand out than fit in. If that's you, you're in the right place.",
  },
  {
    id: "light",
    label: "the light",
    title: "Why I do this",
    line: "Because the web is mostly noise — and once in a while you get to build something quiet and unforgettable.",
  },
];

/* ---------------------------- Level 4 · The Lab --------------------------- */

export const labHaveObservations = [
  "Your hero is probably saying everything and meaning nothing.",
  "There's a button somewhere important that doesn't look clickable.",
  "It likely takes a beat too long to load. People feel that.",
  "Three voices, three fonts, no single clear story.",
  "The mobile version is doing 70% of the work and getting none of the love.",
];

export const labHaveFixes = [
  "One promise. One path. One obvious next move.",
  "Cut half the words — watch the message double in strength.",
  "Motion that points the eye exactly where it should go.",
];

export interface DreamType {
  key: string;
  label: string;
  vision: string;
  moves: [string, string, string];
}

export const labDreamTypes: DreamType[] = [
  {
    key: "brand",
    label: "A brand people trust on sight",
    vision: "A site that makes a stranger think 'these people know what they're doing' before they read a word.",
    moves: [
      "A hero that states the promise in one breath",
      "Proof and personality woven through, never dumped",
      "A close that makes reaching out feel obvious",
    ],
  },
  {
    key: "launch",
    label: "A launch people talk about",
    vision: "A moment, not a page. Built to be screenshotted, shared, and remembered past day one.",
    moves: [
      "An opening that earns attention in two seconds",
      "One interaction worth telling a friend about",
      "A waitlist that actually fills",
    ],
  },
  {
    key: "tool",
    label: "A product that explains itself",
    vision: "An interface so clear the 'how does this work' question never gets asked.",
    moves: [
      "Show the magic, don't describe it",
      "Onboarding that feels like progress, not paperwork",
      "Every screen earning its place",
    ],
  },
];

/* ------------------------- Level 5 · Project Worlds ----------------------- */

export interface ProjectWorld {
  kind: "concept";
  index: string;
  name: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const projectWorlds: ProjectWorld[] = [
  {
    kind: "concept",
    index: "I",
    name: "The Quiet Dashboard",
    challenge: "A team drowning in spreadsheets, with no shared sense of how things were going.",
    solution: "A calm, real-time interface that turns noise into a single, glanceable truth.",
    outcome: "Decisions in seconds instead of meetings. One place everyone trusts.",
  },
  {
    kind: "concept",
    index: "II",
    name: "The First Impression",
    challenge: "A capable studio with a website that made them look like everyone else.",
    solution: "A cinematic, motion-led site that matched how good the work actually was.",
    outcome: "Strangers started arriving already convinced. Conversations got easier.",
  },
  {
    kind: "concept",
    index: "III",
    name: "The Honest Machine",
    challenge: "An AI tool people didn't trust because it never showed its work.",
    solution: "Grounded answers with sources — every claim traceable, nothing hand-wavy.",
    outcome: "Hours saved a week, and the rare thing: an AI feature people believed.",
  },
];

/* ------------------------- Level 6 · The Beliefs Room --------------------- */

export interface BeliefObject {
  id: string;
  object: string;
  belief: string;
  detail: string;
}

export const beliefObjects: BeliefObject[] = [
  {
    id: "clock",
    object: "Clock",
    belief: "Speed matters.",
    detail: "A site nobody waits for beats a beautiful one nobody finishes loading.",
  },
  {
    id: "compass",
    object: "Compass",
    belief: "Direction beats motion.",
    detail: "Busy isn't the same as building. I'd rather do the right thing slowly than the wrong thing fast.",
  },
  {
    id: "mirror",
    object: "Mirror",
    belief: "Good design disappears.",
    detail: "If you notice the design, it got in the way. The best work just feels effortless.",
  },
  {
    id: "lamp",
    object: "Lamp",
    belief: "Simple wins.",
    detail: "Most sites say too much. Subtraction is the hardest, most underrated skill there is.",
  },
];

/* --------------------------- Level 7 · The Secret ------------------------- */

export const founder = {
  focus: "Building modern websites & AI products for founders who refuse to look generic.",
  building: [
    "A one-person studio for interactive web experiences",
    "Small AI tools that quietly remove busywork",
    "Experiments like the world you're standing in",
  ],
  ambitions: [
    "Build a handful of things genuinely worth remembering",
    "Work only with people who care about the details",
    "Stay small. Stay sharp. Stay curious.",
  ],
  availability: "Open for 1–2 new projects this quarter.",
} as const;

/* ------------------------------- Final Level ------------------------------ */

export const finalLine = "If you've made it this far, we should probably talk.";
