import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @repo/ui ships raw TypeScript from src/ with no build step, so Next must
  // compile it rather than treat it as a prebuilt dependency.
  transpilePackages: ["@repo/ui"],
};

export default nextConfig;
