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
        sunshine: {
          DEFAULT: "#F5C842",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#F5C842",
          500: "#EAB308",
          600: "#CA8A04",
        },
        sky: {
          DEFAULT: "#5B8FD4",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#5B8FD4",
          500: "#3B82F6",
        },
        blush: {
          DEFAULT: "#F2A7B0",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#F2A7B0",
          400: "#FB7185",
        },
        mint: {
          DEFAULT: "#7EC8A4",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#7EC8A4",
          400: "#34D399",
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
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
