import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pure monochrome. Grays are only for atmospheric depth.
        paper: "#ffffff",
        void: "#000000",
        ash: {
          100: "#e6e6e6",
          200: "#bdbdbd",
          300: "#8a8a8a",
          400: "#5c5c5c",
          500: "#3a3a3a",
          600: "#222222",
          700: "#141414",
          800: "#0b0b0b",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        walk: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-2px) rotate(-3deg)" },
          "75%": { transform: "translateY(-2px) rotate(3deg)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(-40px,-80px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.86" },
          "47%": { opacity: "0.4" },
          "49%": { opacity: "0.9" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        actcard: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(220%)" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        walk: "walk 0.5s ease-in-out infinite",
        bob: "bob 4s ease-in-out infinite",
        drift: "drift 12s linear infinite",
        flicker: "flicker 5s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
        actcard: "actcard 1.6s cubic-bezier(0.22,1,0.36,1) forwards",
        scan: "scan 3.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
