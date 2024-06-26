/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "portfolio.zhemwel.net",
            "lh3.googleusercontent.com"
        ],
    }
}

module.exports = nextConfig
