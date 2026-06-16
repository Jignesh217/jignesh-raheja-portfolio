# Jignesh Raheja — Portfolio

> Loud, interactive, brutalist. No fluff.

A black-on-white **brutalist** portfolio for Jignesh Raheja — full-stack developer & product builder. Thick borders, hard offset shadows, monospace type, and a handful of things you can actually mess with.

## What's in it

**`/` — the portfolio.** One interactive page:
- **Scramble hero** — the headline decodes from random glyphs on load.
- **CHAOS ⚡** — one button recolors the entire site (cycles a jarring accent palette).
- **Headline machine** — click to reshuffle the elevator pitch.
- **What I build** — hard-shadow cards that shift on hover and expand on click.
- **Selected work** — an accordion; each project opens to problem / idea / outcome + a one-line takeaway.
- **How I think** — alternating black/white manifesto blocks.
- **Drag-a-sticker board** — grab and fling the stickers around.
- **Contact** — click-to-copy email, plus LinkedIn / WhatsApp / Book-a-call.

**`/roast` — "Roast My Site".** Drop a URL, get a deterministic, savage verdict (score, per-category roasts, a final verdict), then an offer to fix it. Satire — it doesn't crawl the live site.

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Geist Sans/Mono. All interactivity is plain React + CSS — no animation library. First load JS ~95 kB.

## Structure

```
app/
  layout.tsx          # fonts, SEO metadata, JSON-LD, white/black base
  page.tsx            # home → renders the brutalist Portfolio
  Portfolio.tsx       # the interactive brutalist portfolio
  globals.css         # minimal brutalist base styles
  roast/              # "Roast My Site" — page.tsx · RoastApp.tsx · roast.ts
  api/contact/        # contact endpoint
  opengraph-image.tsx · robots.ts · sitemap.ts · icon.svg
lib/
  story.ts            # ALL copy — hero, builds, projects, principles, beliefs
  site.ts             # contact links & site config (env-overridable)
```

## Run it

Requires Node 18.17+.

```bash
npm install
cp .env.example .env.local   # optional — contact links & site URL
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm run start`.

## Configuration

All copy lives in [`lib/story.ts`](lib/story.ts). Contact links & site URL live in [`lib/site.ts`](lib/site.ts) / `.env.local`: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_CALENDLY_URL`. Projects are clearly framed as concept pieces — no fabricated clients, metrics, or credentials.

## License
Personal project — all rights reserved by Jignesh Raheja.
