/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "platform-lookside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig
