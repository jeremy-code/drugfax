import type { MetadataRoute } from "next";

import { SIZES } from "./icon1";

const manifest = (): MetadataRoute.Manifest => ({
  short_name: "drugfax",
  name: "drugfax",
  icons: [
    {
      src: "/icon.svg",
      type: "image/svg+xml",
      sizes: "any",
    },
    ...Object.entries(SIZES).map(([id, { width, height }]) => ({
      src: `/icon1/${id}`,
      type: "image/png",
      sizes: `${width}x${height}`,
    })),
  ],
  background_color: "white",
  display: "standalone",
  theme_color: "hsl(347, 77%, 57%)",
  description: "drugfax",
});

export default manifest;
