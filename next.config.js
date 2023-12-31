/** @type {import('next').NextConfig} */
const nodeExternals = require("webpack-node-externals");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
};

module.exports = {
  ...nextConfig,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.externals = [nodeExternals()];
  //   }

  //   return config;
  // },
};
