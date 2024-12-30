import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: "https://reclaim.sh", lastModified: new Date() },
];

export default sitemap;
