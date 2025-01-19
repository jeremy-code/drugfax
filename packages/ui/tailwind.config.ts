import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import radix from "tailwindcss-radix";
import { fontFamily } from "tailwindcss/defaultTheme";
import type {
  PresetsConfig,
  ResolvableTo,
  ThemeConfig,
} from "tailwindcss/types/config";

type ResolvedType<T> = T extends ResolvableTo<infer R> ? R : never;

// Without `PresetsConfig` type annotation, TypeScript errors for plugins'
// types: "The inferred type of 'default' cannot be named without a reference to
// '*'. This is likely not portable. A type annotation is necessary"
const uiConfig: PresetsConfig = {
  content: ["./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    // eslint-disable-next-line @typescript-eslint/unbound-method -- theme() is an external Tailwind CSS type
    container: ({ theme }) => ({
      center: true,
      padding: theme("spacing.4", "1rem") as ResolvedType<
        ThemeConfig["spacing"]
      >[string], // 1rem (16px)
    }),
    extend: {
      animation: {
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
      },
      borderColor: { DEFAULT: "hsl(var(--border))" },
      colors: ({ colors }) => ({
        gray: colors.slate,
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(210, 63%, 97%)", // #f2f7fc
          100: "hsl(206, 57%, 93%)", // #e2eef7
          200: "hsl(206, 60%, 87%)", // #cbe1f2
          300: "hsl(204, 58%, 78%)", // #a8cee8
          400: "hsl(206, 56%, 68%)", // #7fb3db
          500: "hsl(210, 55%, 59%)", // #5d97d0
          600: "hsl(214, 50%, 53%)", // #4c81c4
          700: "hsl(217, 46%, 48%)", // #426eb3
          800: "hsl(219, 42%, 40%)", // #3b5a92
          900: "hsl(217, 39%, 33%)", // #334c75
          950: "hsl(217, 35%, 21%)", // #233148
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
      }),
      fontFamily: {
        sans: ["var(--font-lexend)", ...fontFamily.sans],
      },
      ringColor: { DEFAULT: "hsl(var(--ring))" },
      ringOffsetColor: { DEFAULT: "hsl(var(--background))" },
      transitionProperty: {
        size: "width, height",
      },
    },
  },
  plugins: [animate, radix({ variantPrefix: "radix" }), typography],
};

export default uiConfig;
