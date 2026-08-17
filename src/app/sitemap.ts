import type { MetadataRoute } from "next";
import { siteDetails } from "@/data/siteDetails";
import { DEFAULT_LOCALE, LOCALES, localePath } from "@/data/localized";

/**
 * Setiap halaman didaftarkan sekali per bahasa, dan setiap entri menyebut
 * seluruh saudaranya di `alternates.languages`.
 *
 * Prioritasnya sengaja tidak sama: bahasa Indonesia adalah versi yang paling
 * lama hidup dan paling lengkap (ia satu-satunya yang memuat layanan setup
 * onsite), jadi ia tetap yang utama. Bahasa lain diturunkan sedikit — bukan
 * karena kurang penting, melainkan supaya mesin pencari tidak menebak sendiri
 * mana yang asli ketika keduanya sama-sama cocok.
 */
const paths = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/web-admin", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/download/windows", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/hapus-akun", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteDetails.siteUrl;
  const lastModified = new Date();

  return paths.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, `${baseUrl}${localePath(locale, path)}`]),
    );

    return LOCALES.map((locale) => ({
      url: `${baseUrl}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority: locale === DEFAULT_LOCALE ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages },
    }));
  });
}
