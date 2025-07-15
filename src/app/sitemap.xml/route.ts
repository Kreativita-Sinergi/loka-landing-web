// src/app/sitemap.xml/route.ts
import { siteDetails } from "@/data/siteDetails";

export async function GET() {
  const pages = ["", "/features", "/pricing", "/testimonials", "/faq"];

  const baseUrl = siteDetails.siteUrl.replace(/\/$/, ""); // hapus trailing slash

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
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    },
  });
}
