/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    outputStandalone: true,
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
