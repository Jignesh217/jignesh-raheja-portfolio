/**
 * Central site configuration.
 *
 * Every value falls back to a sensible default so the project runs with zero
 * env setup. Override anything via `.env.local` (see `.env.example`).
 */

export const siteConfig = {
  name: "Jignesh Raheja",
  role: "Full-Stack Developer & AI Product Builder",
  // Short tagline used in <title> and OG tags.
  tagline: "I build modern websites, web apps, and AI-powered digital products.",
  description:
    "Jignesh Raheja is a full-stack developer and AI product builder helping businesses launch fast, modern websites and web applications that convert visitors into customers.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jigneshraheja.com",

  // NOTE: update these to your real handles before going live.
  email: process.env.NEXT_PUBLIC_EMAIL ?? "jigneshraheja2101@gigzs.com",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/jignesh-raheja",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // digits only, e.g. 919999999999
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",

  // Location — shown in the About section. Update if needed.
  location: "India",

  // Used by the sticky CTA + hero badge.
  availability: "Available for freelance projects",
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds a pre-filled WhatsApp deep link, or null when no number is set. */
export function whatsappLink(message?: string): string | null {
  if (!siteConfig.whatsapp) return null;
  const text = encodeURIComponent(
    message ?? "Hi Jignesh, I'd like to discuss a website project."
  );
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

/** Builds a mailto link with an optional subject/body. */
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${siteConfig.email}${qs ? `?${qs}` : ""}`;
}
