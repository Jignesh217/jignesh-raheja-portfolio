# Jignesh Raheja — Portfolio

> A memorable portfolio, powered by a game.

A black-and-white interactive portfolio built to do one job: make visitors **trust** Jignesh, **remember** him, and **contact** him. The spine of the experience is a scroll-driven **parkour run** across a night skyline — and the run *is* the portfolio. You never forget you're learning about Jignesh, because the story is told from the rooftops he's crossing.

## The idea

Most portfolios are "a game with some content," or "content with a decorative animation." This is neither. The run is structured as **five acts** that map to the only questions that matter — and each act reveals itself as discovered, in-world content rather than a wall of text:

1. **Who I am** — the opening rooftops: name, the 10-second answer, what he builds.
2. **What I build** — a district of **billboards** (websites, web apps, AI tools, redesigns).
3. **Selected work** — four project **screens / blueprints** the runner reaches as destinations.
4. **How I think** — beliefs as **graffiti** on the walls he wall-runs and vaults past.
5. **Let's work together** — the summit, then the hand-off.

Each act announces itself with a title-card; the atmosphere shifts from dim dawn → a bright mid-journey → night as you progress. When the run ends, an **Arrival** hands you off into the interactive *proof*: the build wireframe and the four project worlds you can actually poke at — then the conversation.

## The runner

The signature, and now the engine. One smooth filled hooded silhouette, built procedurally: a biomechanical gait (forward-kinematics rig, Gaussian knee-tuck, capsule/ribbon body), driven by scroll. The movement is **purposeful, never a trick reel** — the athlete only does what the terrain demands:

- **precision jump** across a narrow gap (arms out to balance)
- **running leap** across a wide one
- **kong vault** over rooftop machinery
- **wall run** up a tower too tall to leap, kicking to the ledge
- **roll landing** to absorb a hard drop (the only "flip", and it serves a purpose)
- **slide** under an overhang
- **ledge climb / mantle** onto a higher roof

Every move has a loaded takeoff, a believable arc, and a landing that compresses then recovers into stride. ([`lib/parkour.ts`](lib/parkour.ts) · [`components/run/Parkour.tsx`](components/run/Parkour.tsx))

It's all position-driven (no autoplay), so it naturally honours `prefers-reduced-motion`, and the hero/ending loops pause when the tab is hidden.

## Design system

- **Pure black / pure white. Maximum contrast.** In-world content is white-on-dark glass over the night sky; titles are pure white in Fraunces, body copy at white/65–85.
- **Typography with hierarchy:** Geist Sans for clarity, **Fraunces** italic for personality (project names, beliefs, the "point" of each project).
- **Restraint:** every visible area carries content — billboards, screens, blueprints, machinery, a parallax skyline, stars. No empty rooftops; no animation that competes with the words.

## Conversion arc

The experience answers, in order: *who he is → what he builds → the work → how he thinks → why he's different → why to reach out.* Each project ends on a one-line **takeaway** (what it reveals about working with him); the close surfaces his working principles, availability, and four ways to make contact.

## Tech

Next.js 14 · TypeScript · Tailwind · Framer Motion · Lenis smooth scroll · Fraunces + Geist. No Three.js — the whole run is SVG + transforms.

## Structure

```
app/
  layout.tsx              # fonts, theme, providers, SEO
  page.tsx                # Hero → Parkour → Arrival → Build → Projects → Ending
  globals.css             # B&W, hidden scrollbar, grain, cursor + Lenis CSS
lib/
  parkour.ts              # the engine: 5-act WORLD, movement system, FK + silhouette
  story.ts                # ALL copy — hero, builds, principles, projects, beliefs, ending
  site.ts                 # contact links (env-overridable) · motion.ts
components/
  run/Hero · Parkour · Arrival · Build · Projects · Scenes · Ending · Nav · RunnerLoop
  ui/Cursor · Magnetic · Reveal
  world/Character · Atmosphere
  levels/Secret.tsx       # the "founder" easter egg (type `founder`, or find the ✦)
  providers/SmoothScroll.tsx
```

## Run it

Requires Node 18.17+.

```bash
npm install
cp .env.example .env.local   # optional — contact links & site URL
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm run start`. (Don't run `build` while `dev` is live — they share `.next`.)

## Also in this repo

Two extra routes, sharing the same content (`lib/story.ts`, `lib/site.ts`):

- **`/v2`** — a loud, fully interactive **brutalist** cut of the portfolio (no game): scramble hero, scrolling marquees, a shuffle-the-pitch machine, expandable work, a chaos accent-color switch, and a drag-the-stickers board.
- **`/roast`** — **“Roast My Site”**, a brutalist toy: drop a URL, get a deterministic, savage verdict, then an offer to fix it. Satire — it doesn't crawl the live site.

## Configuration

Contact links live in [`lib/site.ts`](lib/site.ts) / `.env.local`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_CALENDLY_URL`. **All copy is in [`lib/story.ts`](lib/story.ts)** — projects are clearly framed as concept pieces; no fabricated clients, metrics, or credentials.

## License
Personal project — all rights reserved by Jignesh Raheja.
