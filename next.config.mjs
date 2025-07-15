/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap/xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
