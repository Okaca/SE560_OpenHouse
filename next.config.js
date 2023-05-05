/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    distDir: 'build'
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ]
  }
}

module.exports = nextConfig