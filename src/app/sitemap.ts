import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/siteDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteDetails.siteUrl;
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
