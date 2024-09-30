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
        // backgroundColor: {
        //   // "themeRed-primary": "var(--bg-themeRed-primary)",
        //   // "themeRed-secondary": "var(--bg-themeRed-secondary)",
        //   // "themeOrange-primary": "var(--bg-themeOrange-primary)",
        //   // "themeOrange-secondary": "var(--bg-themeOrange-secondary)",
        //   "color-themeRed": "#EF4444",
        //   "themeRed-secondary": "#DC2626",
        //   "themeOrange-primary": "#F97316",
        //   "themeOrange-secondary": "#EA580C",
        // },
        // TODO ADDING PLACEHOLDERS FOR OUR THEME COLORS
        themeRed: {
          primary: "#EF4444", // Theme 1 Primary Color
          secondary: "#DC2626", // Theme 1 Secondary Color
        },
        themeOrange: {
          primary: "#F97316", // Theme 2 Primary Color
          secondary: "#EA580C", // Theme 2 Secondary Color
        },
        themeAmber: {
          primary: "#F59E0B", // Theme 2 Primary Color
          secondary: "#D97706", // Theme 2 Secondary Color
        },
        themeYellow: {
          primary: "#EAB308", // Theme 2 Primary Color
          secondary: "#CA8A04", // Theme 2 Secondary Color
        },
        themeLime: {
          primary: "#84CC16", // Theme 2 Primary Color
          secondary: "#65A30D", // Theme 2 Secondary Color
        },
        themeGreen: {
          primary: "#22C55E", // Theme 2 Primary Color
          secondary: "#16A34A", // Theme 2 Secondary Color
        },
        themeEmerald: {
          primary: "#10B981", // Theme 2 Primary Color
          secondary: "#059669", // Theme 2 Secondary Color
        },
        themeTeal: {
          primary: "#14B8A6", // Theme 2 Primary Color
          secondary: "#0D9488", // Theme 2 Secondary Color
        },
        themeCyan: {
          primary: "#06B6D4", // Theme 2 Primary Color
          secondary: "#0891B2", // Theme 2 Secondary Color
        },
        themeSky: {
          // primary: "#0EA5E9", // Theme 2 Primary Color
          primary: "#06B6D4", // Theme 2 Primary Color
          secondary: "#0284C7", // Theme 2 Secondary Color
        },
        themeBlue: {
          primary: "#3B82F6", // Theme 2 Primary Color
          secondary: "#2563EB", // Theme 2 Secondary Color
        },
        themeIndigo: {
          primary: "#6366F1", // Theme 2 Primary Color
          secondary: "#4F46E5", // Theme 2 Secondary Color
        },
        themeViolet: {
          primary: "#8B5CF6", // Theme 2 Primary Color
          secondary: "#7C3AED", // Theme 2 Secondary Color
        },
        themePurple: {
          primary: "#A855F7", // Theme 2 Primary Color
          secondary: "#9333EA", // Theme 2 Secondary Color
        },
        themeFuchsia: {
          primary: "#D946EF", // Theme 2 Primary Color
          secondary: "#C026D3", // Theme 2 Secondary Color
        },
        themePink: {
          primary: "#EC4899", // Theme 2 Primary Color
          secondary: "#DB2777", // Theme 2 Secondary Color
        },
        // bg-themeRose-primary
        themeRose: {
          primary: "#F43F5E", // Theme 2 Primary Color
          secondary: "#E11D48", // Theme 2 Secondary Color
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
    // Manually include theme background classes for primary and secondary colors
    {
      pattern:
        /bg-theme(Red|Orange|Amber|Yellow|Lime|Green|Emerald|Teal|Cyan|Sky|Blue|Indigo|Violet|Purple|Fuchsia|Pink|Rose)-(primary|secondary)/,
      variants: ["hover", "focus"], // Include hover and focus variants if needed
    },
  ],
  plugins: [require("tailwindcss-animate")],
};
