/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://87.242.117.38:8080/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
