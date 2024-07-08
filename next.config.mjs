/** @type {import('next').NextConfig} */

import { withHydrationOverlayWebpack } from "@builder.io/react-hydration-overlay/next";

const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_SERVER: process.env.URL_SERVER,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config, options) => {
    config = withHydrationOverlayWebpack({
      appRootSelector: "#__next",
      isMainAppEntryPoint: (entryPointName) =>
        !options.isServer &&
        (entryPointName === "pages/_app" || entryPointName === "main-app"),
    })(config);
    return config;
  },
};

export default nextConfig;
