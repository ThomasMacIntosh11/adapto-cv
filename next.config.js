/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export for development - add back for deployment if needed
  images: {
    unoptimized: true
  }
};

export default nextConfig;