/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Allow larger image/audio uploads through Server Actions (default is 1 MB).
      bodySizeLimit: "25mb",
    },
  },
}

export default nextConfig
