import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // SeoJama-hosted news featured images and in-content media.
        protocol: "https",
        hostname: "seojama.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
