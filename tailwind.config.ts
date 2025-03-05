import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#D4AF37', // Classic gold color
          600: '#B8860B', // Darker gold
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
