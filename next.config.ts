import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
};

export default nextConfig;
