import type { MetadataRoute } from "next";

import { SIZES } from "./icon1";

const manifest = (): MetadataRoute.Manifest => ({
  short_name: "reclaim",
  name: "reclaim",
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
  description: "reclaim",
});

export default manifest;
