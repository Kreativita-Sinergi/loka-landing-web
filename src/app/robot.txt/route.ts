import { siteDetails } from '@/data/siteDetails';

export async function GET() {
  const baseUrl = siteDetails.siteUrl;

  const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
