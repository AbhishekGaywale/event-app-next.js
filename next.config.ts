import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // Increase limit as needed
    },
  },
  api: {
    bodyParser: false, // Required for file uploads (FormData)
  },
  
};

export default nextConfig;
