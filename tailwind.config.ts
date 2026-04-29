import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  safelist: [
    // Used by light-mode override CSS — protect them from purge
    "text-emerald-300",
    "text-emerald-200",
    "text-amber-300",
    "text-sky-300",
    "text-rose-300",
    "text-rose-400",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#0c2e1a",
          100: "#0f3d22",
          200: "#155f33",
          300: "#16a34a",
          400: "#22c55e",
          500: "#4ade80",
          600: "#86efac",
          700: "#bbf7d0",
          800: "#dcfce7",
          900: "#f0fdf4",
        },
        // ink palette is INVERTED for dark mode:
        // ink-50 = darkest surface, ink-900 = lightest text
        ink: {
          50: "#0a0a0b",
          100: "#111113",
          200: "#1a1a1d",
          300: "#26262a",
          400: "#3a3a40",
          500: "#7c7c85",
          600: "#a8a8b0",
          700: "#c8c8cf",
          800: "#e6e6ea",
          900: "#f5f5f7",
        },
        // Semantic dark surfaces
        canvas: "#08080a",
        surface: "#101013",
        elevated: "#16161b",
        line: "rgba(255,255,255,0.08)",
        line2: "rgba(255,255,255,0.06)",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4)",
        pop: "0 24px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
        glow: "0 0 0 1px rgba(74,222,128,0.25), 0 12px 30px -10px rgba(74,222,128,0.35)",
        ring: "0 0 0 1px rgba(255,255,255,0.08)",
      },
      borderRadius: {
        xl2: "14px",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
export default config;
