/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap/xml',
        permanent: true, // atau false jika ingin temporary
      },
    ];
  },
};

export default nextConfig;
