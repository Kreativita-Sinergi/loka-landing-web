import { siteDetails } from '@/data/siteDetails';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  if (params.slug !== 'xml') {
    return new Response('Not found', { status: 404 });
  }

  const pages = ['', '/features', '/pricing', '/testimonials', '/faq'];
  const baseUrl = siteDetails.siteUrl.replace(/\/$/, '');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
    },
  });
}
