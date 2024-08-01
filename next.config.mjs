/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "***.scdn.co",
            },
            {
                protocol: "https",
                hostname: "***.spotifycdn.com",
            },
        ],
    }
};

export default nextConfig;
