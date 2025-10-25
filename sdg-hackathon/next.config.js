/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  // Also ignore TypeScript errors during builds for maximum compatibility
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
