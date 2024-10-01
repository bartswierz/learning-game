/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        xxsm: "400px",
        xsm: "560px",
        "2xl": "1400px",
      },
      container: {
        center: true, // Center the container content
        padding: "2rem", // Add padding to the container
      },
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        themeRed: {
          primary: "#EF4444",
          secondary: "#DC2626",
        },
        themeOrange: {
          primary: "#F97316",
          secondary: "#EA580C",
        },
        themeAmber: {
          primary: "#F59E0B",
          secondary: "#D97706",
        },
        themeYellow: {
          primary: "#EAB308",
          secondary: "#CA8A04",
        },
        themeLime: {
          primary: "#84CC16",
          secondary: "#65A30D",
        },
        themeGreen: {
          primary: "#22C55E",
          secondary: "#16A34A",
        },
        themeEmerald: {
          primary: "#10B981",
          secondary: "#059669",
        },
        themeTeal: {
          primary: "#14B8A6",
          secondary: "#0D9488",
        },
        themeCyan: {
          primary: "#06B6D4",
          secondary: "#0891B2",
        },
        themeSky: {
          primary: "#0EA5E9",
          secondary: "#0284C7",
        },
        themeBlue: {
          primary: "#3B82F6",
          secondary: "#2563EB",
        },
        themeIndigo: {
          primary: "#6366F1",
          secondary: "#4F46E5",
        },
        themeViolet: {
          primary: "#8B5CF6",
          secondary: "#7C3AED",
        },
        themePurple: {
          primary: "#A855F7",
          secondary: "#9333EA",
        },
        themeFuchsia: {
          primary: "#D946EF",
          secondary: "#C026D3",
        },
        themePink: {
          primary: "#EC4899",
          secondary: "#DB2777",
        },
        // bg-themeRose-primary
        themeRose: {
          primary: "#F43F5E",
          secondary: "#E11D48",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // Safelist to preserve dynamic classes in the build
  safelist: [
    {
      pattern:
        /bg-theme(Red|Orange|Amber|Yellow|Lime|Green|Emerald|Teal|Cyan|Sky|Blue|Indigo|Violet|Purple|Fuchsia|Pink|Rose)-(primary|secondary)/,
      variants: ["hover", "focus"], // Include hover and focus variants if needed
    },
    {
      pattern:
        /from-(themeRed|themeOrange|themeAmber|themeYellow|themeLime|themeGreen|themeEmerald|themeTeal|themeCyan|themeSky|themeBlue|themeIndigo|themeViolet|themePurple|themeFuchsia|themePink|themeRose)-(primary|secondary)/,
    },
    {
      pattern:
        /to-(themeRed|themeOrange|themeAmber|themeYellow|themeLime|themeGreen|themeEmerald|themeTeal|themeCyan|themeSky|themeBlue|themeIndigo|themeViolet|themePurple|themeFuchsia|themePink|themeRose)-(primary|secondary)/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
