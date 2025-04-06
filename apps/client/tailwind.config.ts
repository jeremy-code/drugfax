import { dirname, join } from "node:path";

import type { Config } from "tailwindcss";
import ui from "@drugfax/ui/tailwind.config";

export default {
  presets: [ui],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Ensures Tailwind CSS classes are scanned from `@drugfax/ui` package
    join(
      dirname(require.resolve("@drugfax/ui/tailwind.config")),
      "./components/**/*.{js,jsx,ts,tsx}",
    ),
  ],
} satisfies Config;
