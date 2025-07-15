import { siteDetails } from "@/data/siteDetails";

export async function GET() {
  const pages = ["", "/features", "/pricing", "/testimonials", "/faq"];
  const baseUrl = siteDetails.siteUrl;

  const urls = pages
    .map((page) => {
      return `<url><loc>${baseUrl}${page}</loc></url>`;
    })
    .join("\n"); // pakai newline!

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` + 
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
