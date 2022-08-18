/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookside.fbsbx.com",
      "firebasestorage.googleapis.com"
    ]
  }
}

module.exports = nextConfig
