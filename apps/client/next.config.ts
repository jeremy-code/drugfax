import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  poweredByHeader: false,
  experimental: {
    webpackBuildWorker: true,
    reactCompiler: true,
  },
} satisfies NextConfig;

export default withBundleAnalyzer(nextConfig);
