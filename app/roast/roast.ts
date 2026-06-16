/**
 * "Roast My Site" — a satirical, deterministic site-roast generator.
 *
 * It does NOT crawl the real URL (a browser can't, cross-origin). Instead it
 * seeds a deterministic RNG from the domain, so the same site always gets the
 * same roast — which makes it feel real and lets people share it. All in good
 * fun; the closing line points them at the person who can actually fix it.
 */

export interface CategoryResult {
  key: string;
  label: string;
  score: number;
  line: string;
}

export interface Roast {
  domain: string;
  score: number;
  grade: string;
  gradeNote: string;
  categories: CategoryResult[];
  verdict: string;
}

interface Cat {
  key: string;
  label: string;
  lines: string[];
}

const CATS: Cat[] = [
  {
    key: "speed",
    label: "LOAD SPEED",
    lines: [
      "It loads slower than a fax machine in a thunderstorm.",
      "I aged visibly waiting for the hero image. Singular. Image.",
      "Your site doesn't load — it negotiates.",
      "3.2MB of JavaScript to render one button. Bold.",
      "Lighthouse took one look and switched itself off.",
      "First Contentful Paint? More like Eventual Contentful Paint.",
    ],
  },
  {
    key: "design",
    label: "VISUAL DESIGN",
    lines: [
      "Five fonts. Three are fighting. Two are losing.",
      "The palette looks like a traffic cone fell into a 2009 PowerPoint.",
      "Whitespace called. It wants asylum.",
      "Every element is screaming. None of them are saying anything.",
      "Bootstrap default and proud of it, huh.",
      "The drop shadows have drop shadows. Why.",
    ],
  },
  {
    key: "copy",
    label: "COPYWRITING",
    lines: [
      "“A leading provider of innovative solutions.” Of what? To whom? Why?",
      "I read the entire homepage and still can't tell what you do.",
      "Your headline says everything and means nothing. Genuinely impressive.",
      "You used the word “synergy.” In this economy.",
      "The button says “Submit.” Submit to what? My disappointment?",
      "Three paragraphs about your journey. Zero about my problem.",
    ],
  },
  {
    key: "originality",
    label: "ORIGINALITY",
    lines: [
      "I've seen this exact template at 400 other startups. Hi again.",
      "The hero is a stock photo of people pointing at a laptop. Nobody points at laptops.",
      "It's giving “first result on a template marketplace.”",
      "Your “unique value proposition” is neither.",
      "Even the lorem ipsum looks tired.",
      "Gradient blob. Floating phone mockup. We've all been here.",
    ],
  },
  {
    key: "mobile",
    label: "MOBILE",
    lines: [
      "On mobile, the menu becomes a treasure hunt.",
      "I tried to tap a link and accidentally subscribed to a newsletter.",
      "Horizontal scroll on a phone. A genuine war crime.",
      "The text is so small I had to apologize to my eyes.",
      "The buttons are 6px apart. My thumb is not a stylus.",
      "It's “responsive” the way a brick is aerodynamic.",
    ],
  },
  {
    key: "trust",
    label: "TRUST & POPUPS",
    lines: [
      "Three popups before a single word. New record.",
      "Cookie banner the size of Belgium. I just wanted to read.",
      "A “spin the wheel for 10% off” wheel. We're not doing that anymore.",
      "The chatbot waved at me before the page finished loading. Clingy.",
      "“Trusted by industry leaders.” Names? No? Cool cool cool.",
      "An exit-intent popup. I was trying to exit for a reason.",
    ],
  },
];

const VERDICTS = [
  "There's a real business buried under all this. It deserves a site that isn't actively working against it.",
  "The bones are fine. The skin is on fire. Good news: fire is fixable.",
  "You don't need a redesign. You need an intervention. I happen to do those.",
  "This isn't a website, it's a cry for help with a domain name attached.",
  "Honestly? Ten good decisions away from great. You've made about two of them.",
  "It's not bad. It's worse: it's forgettable. That's the one thing I refuse to build.",
];

export const SCAN_STEPS = [
  "resolving dns ... found it, unfortunately",
  "measuring load time ... still measuring ...",
  "counting fonts ... too many",
  "scanning for original ideas ... 0 results",
  "checking mobile layout ... oh no",
  "tallying popups ... please stop",
  "reading the copy ... out loud, in disbelief",
  "compiling roast ...",
];

const GRADES: { min: number; label: string; note: string }[] = [
  { min: 0, label: "CERTIFIED DISASTER", note: "We need to talk. Urgently." },
  { min: 34, label: "ROUGH", note: "It's trying. That's the sad part." },
  { min: 52, label: "AGGRESSIVELY MID", note: "Nobody hates it. Nobody remembers it." },
  { min: 70, label: "ACTUALLY DECENT", note: "Annoyingly fine. I can still do better." },
  { min: 86, label: "...OK YOU'RE GOOD", note: "Rare. Suspicious. Let's collaborate." },
];

function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Pull a clean domain out of whatever the human typed. */
export function cleanDomain(input: string): string {
  let v = input.trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").replace(/^www\./, "");
  v = v.split(/[/?#]/)[0];
  return v || "your-site.com";
}

export function roastSite(input: string): Roast {
  const domain = cleanDomain(input);
  const r = rng(hash(domain));
  // weight scores low (it's a roast), but deterministic per domain
  const categories: CategoryResult[] = CATS.map((c) => ({
    key: c.key,
    label: c.label,
    score: Math.round(14 + r() * 58),
    line: c.lines[Math.floor(r() * c.lines.length)],
  }));
  const score = Math.round(categories.reduce((a, c) => a + c.score, 0) / categories.length);
  const g = [...GRADES].reverse().find((x) => score >= x.min) ?? GRADES[0];
  const verdict = VERDICTS[Math.floor(r() * VERDICTS.length)];
  return { domain, score, grade: g.label, gradeNote: g.note, categories, verdict };
}
