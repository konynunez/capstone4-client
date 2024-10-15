//** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  // Expose environment variables to the client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Optional: Add future configuration settings for Next.js (if needed)
  reactStrictMode: true,
};

export default nextConfig;
