/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose specific environment variables to the browser
  env: {
    // We're only exposing the version number, not the actual API keys
    WATSONX_VERSION: process.env.WATSONX_VERSION,
  },
  // Other Next.js config options
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
