// Served under a sub-path (e.g. onurkagancoskun.com/openhouse). Baked in at build time.
const basePath = process.env.BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  // Standalone only for the Docker image (set in Dockerfile); `next start` doesn't support it
  output: process.env.NEXT_STANDALONE === 'true' ? 'standalone' : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    appDir: true,
  },
  images: {
    // Images come from Cloudinary/Google already sized; skip the on-device optimizer (slow on a Pi)
    unoptimized: true,
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
