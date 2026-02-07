/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ml5dafx6yq9i.i.optimole.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
