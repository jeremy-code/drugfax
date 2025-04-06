import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    // Not currently default, see https://github.com/vercel/next.js/pull/76065
    optimizePackageImports: ["radix-ui", "radix-ui/internal"],
    webpackBuildWorker: true,
    reactCompiler: true,
  },
} satisfies NextConfig;

export default withBundleAnalyzer(nextConfig);
