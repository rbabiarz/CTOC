import type { NextConfig } from "next";
import path from "path";

const isGitHubPages =
  process.env.GITHUB_PAGES === "true" ||
  (process.env.GITHUB_ACTIONS === "true" && process.env.CI === "true");

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  basePath: isGitHubPages ? "/CTOC" : "",
  assetPrefix: isGitHubPages ? "/CTOC/" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
