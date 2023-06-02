/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    distDir: 'build'
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig