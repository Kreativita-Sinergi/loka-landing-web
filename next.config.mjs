/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return ['', 'id', 'en', 'ms', 'ja'].map((locale) => ({
      source: `${locale ? `/${locale}` : ''}/:image(opengraph-image|twitter-image)`,
      destination: `/images/share/loka-kasir-${locale || 'id'}-v1.jpg`,
      permanent: false,
    }));
  },
  images: {
    // Sajikan format modern yang jauh lebih ringan bila browser mendukung.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
