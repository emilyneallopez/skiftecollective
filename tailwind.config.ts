import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: {
          DEFAULT: "#C96A3A",
          50: "#FDF3ED",
          100: "#FAE1D2",
          200: "#F3C3A5",
          300: "#E9A178",
          400: "#D4844F",
          500: "#C96A3A",
          600: "#A85530",
          700: "#874426",
          800: "#66331D",
          900: "#452213",
        },
        cream: {
          DEFAULT: "#FAF5EF",
          50: "#FEFCFA",
          100: "#FAF5EF",
          200: "#F0E5D6",
          300: "#E5D5BD",
        },
        forest: {
          DEFAULT: "#3A6349",
          50: "#EEF4F0",
          100: "#D4E5DA",
          200: "#A9CBB5",
          300: "#7EB190",
          400: "#53976B",
          500: "#3A6349",
          600: "#2E4F3A",
          700: "#233B2C",
          800: "#17271D",
          900: "#0C130F",
        },
        "warm-white": "#FEFCFA",
        ink: "#2C2C2C",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
