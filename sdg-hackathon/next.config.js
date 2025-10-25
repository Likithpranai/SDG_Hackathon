/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose specific environment variables to the browser
  env: {
    // We're only exposing the version number, not the actual API keys
    WATSONX_VERSION: process.env.WATSONX_VERSION,
    // Add Grok API key - this makes it available to client-side code
    XAI_API_KEY: process.env.XAI_API_KEY,
  },
  // Other Next.js config options
  reactStrictMode: true,
  // swcMinify is deprecated in newer Next.js versions
  // swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // This ensures server-side environment variables are properly loaded
  serverRuntimeConfig: {
    // Will only be available on the server side
    XAI_API_KEY: process.env.XAI_API_KEY,
    OPENAI_API_KEY: process.env.XAI_API_KEY, // Use XAI_API_KEY as OPENAI_API_KEY
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};

module.exports = nextConfig;
