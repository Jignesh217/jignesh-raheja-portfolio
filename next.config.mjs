/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Strip console.* in production builds (keeps errors).
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // /v2 was the brutalist preview route; it's now the homepage.
    return [{ source: "/v2", destination: "/", permanent: false }];
  },
};

export default nextConfig;
