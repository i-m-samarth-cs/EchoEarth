import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  allowedDevOrigins: ['192.168.56.2', 'localhost'],
};

export default nextConfig;
