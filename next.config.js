/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // proxy
  async rewrites() {
    return [
      {
        source: '/proxyApi/:path*',
        destination: 'https://getpocket.com/v3/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
