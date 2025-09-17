import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        // tvoja brend paleta (slobodno promeni nijanse)
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#5458e9",
          700: "#4649d6",
          800: "#3b3fb7",
          900: "#313593",
        },
      },
      boxShadow: {
        // za .shadow-soft u CSS-u
        soft: "0 6px 24px rgba(15, 23, 42, 0.06)",
      },
      ringColor: {
        // da focus ring iz .input koristi brand nijanse
        DEFAULT: "#c7d2fe", // = brand-200
      },
    },
  },

  plugins: [],
} satisfies Config;
