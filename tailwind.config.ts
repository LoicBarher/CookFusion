import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" },
        },
        fadeOut: {
          '0%': { opacity: "1" },
          '100%': { opacity: "0" },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        fadeOut: 'fadeOut 0.8s ease-in-out',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
