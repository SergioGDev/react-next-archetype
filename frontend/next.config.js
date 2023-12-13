const API_URL = process.env.API_URL;

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_URL: process.env.API_URL || "http://api-backend:3028",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};
