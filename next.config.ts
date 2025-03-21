import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if needed
        hostname: 'cdn.dummyjson.com',
        port: '', // Leave empty if default port (80 or 443)
        pathname: '/**', // Allow all paths from this hostname
      },
    ],
  },
};

export default nextConfig;
