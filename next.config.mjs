/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Sajikan format modern yang jauh lebih ringan bila browser mendukung.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
