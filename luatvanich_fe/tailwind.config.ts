import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          soft: "hsl(var(--primary-soft))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          alt: "hsl(var(--surface-alt))",
        },
        // Hệ màu Nhận diện Thương hiệu Vạn Ích (Vanich Royal Palette)
        vanich: {
          navy: {
            DEFAULT: "#0b1d3f",
            deep: "#06122b",
            light: "#16336a",
          },
          gold: {
            DEFAULT: "#c29a45",
            light: "#f0d28a",
            soft: "#f6dc98",
          },
          red: {
            DEFAULT: "#a3171e",
            dark: "#7c1015",
          },
          paper: {
            DEFAULT: "#fbf7ee",
            alt: "#fffaf0",
          },
          line: "#e7dcc3",
          mute: "#5b6174",
          ink: "#0f1b33",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        royal: ["var(--font-royal)", "Georgia", "serif"],
        hanzi: ["var(--font-hanzi)", "serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "radar-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(3.2)", opacity: "0" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-240" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        "radar-pulse": "radar-pulse 3s ease-out infinite",
        "dash-flow": "dash-flow 14s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
