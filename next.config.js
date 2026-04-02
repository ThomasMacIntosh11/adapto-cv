/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export for development - add back for deployment if needed
  images: {
    unoptimized: true
  },
  // Keep pdf-parse and mammoth as server-side only (not bundled for the client)
  serverExternalPackages: ['pdf-parse', 'mammoth'],
};

export default nextConfig;