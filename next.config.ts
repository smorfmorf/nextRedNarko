import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    useCache: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
