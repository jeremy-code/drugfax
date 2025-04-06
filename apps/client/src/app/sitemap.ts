import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: "https://drugfax.io", lastModified: new Date() },
];

export default sitemap;
