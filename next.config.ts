import type { NextConfig } from "next";

// GitHub Pages deploys project repositories under /<repository-name>/.
// Keep local `npm run dev` at / and compute the deployment subpath during CI.
const onPages = process.env.DEPLOY_GITHUB_PAGES === "true";
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "frontend-design-library";
const projectPath = repository.endsWith(".github.io") ? "" : `/${repository}`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: onPages ? projectPath : "",
  images: { unoptimized: true },
};

export default nextConfig;
