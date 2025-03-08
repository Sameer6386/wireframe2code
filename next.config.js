/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["preline.co"], // Add any external image domains you're using
    unoptimized: process.env.NODE_ENV === "development",
  },
  // // Optimize production builds
  // swcMinify: true,
  // Optimize page loading
  reactStrictMode: true,
  // Optimize compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Cache optimization
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  webpack: (config, { isServer }) => {
    // Handling punycode deprecation
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };
    return config;
  },
};

module.exports = nextConfig;
