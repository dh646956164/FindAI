import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = staticExport ? process.env.NEXT_PUBLIC_BASE_PATH || "" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export" as const, trailingSlash: true, basePath, images: { unoptimized: true } } : {}),
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
