import { pick, type Locale } from './localized';

export const siteDetails = {
  siteName: 'Loka',
  siteUrl: 'https://lokakasir.id',
  dashboardUrl: 'https://app.lokakasir.id',
  metadata: {
    title: 'Loka Kasir — Naik Kelas Tanpa Ribet | Kasir Digital untuk UMKM',
    description:
      'Loka Kasir adalah aplikasi kasir (POS) modern untuk warung, toko, dan UMKM. Kelola stok, transaksi, shift, dan laporan bisnis Anda dengan mudah dan profesional.',
  },
  language: 'id',
  locale: 'id-ID',
  siteLogo: '/images/logo.png', // ✅ Perbaikan: tanda kutip ditutup
  // ID GA4 (G-XXXX). Diisi lewat env var NEXT_PUBLIC_GA_ID — biarkan kosong jika belum ada.
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  sitemapUrl: 'https://lokakasir.id/sitemap.xml',
  robotsUrl: 'https://lokakasir.id/robots.txt',
  social: {
    instagramPage: 'https://instagram.com/lokakasir.id',
  },
};

/**
 * Judul & deskripsi hasil pencarian, per pasar.
 *
 * Bukan terjemahan judul Indonesia: yang diketik orang di kotak pencarian
 * berbeda di tiap pasar. "Kasir digital UMKM" tidak dicari siapa pun di Jepang;
 * yang dicari di sana adalah POSレジアプリ untuk 個人店 (toko perorangan). Judul
 * yang menang di satu pasar dan judul yang menang di pasar lain jarang berupa
 * kalimat yang sama.
 */
const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  id: {
    title: 'Loka Kasir — Naik Kelas Tanpa Ribet | Kasir Digital untuk UMKM',
    description:
      'Loka Kasir adalah aplikasi kasir (POS) modern untuk warung, toko, dan UMKM. Kelola stok, transaksi, shift, dan laporan bisnis Anda dengan mudah dan profesional.',
  },
  en: {
    title: 'Loka Kasir — POS App for Small Shops, Cafés & Restaurants',
    description:
      'A complete point-of-sale app for small businesses. Ring up sales, track stock, manage shifts and staff, and read your numbers from anywhere. Free for 30 days, no card required.',
  },
  ms: {
    title: 'Loka Kasir — Aplikasi POS untuk Kedai, Kafe & Restoran',
    description:
      'Aplikasi mesin daftar tunai (POS) lengkap untuk perniagaan kecil. Urus jualan, stok, syif, dan pekerja, serta baca laporan dari mana-mana. Percuma 30 hari, tanpa kad kredit.',
  },
  ja: {
    title: 'Loka Kasir — 個人店・カフェ・飲食店のためのPOSレジアプリ',
    description:
      'スマホやタブレットがそのままレジになるPOSアプリ。会計・在庫・シフト・スタッフ管理から売上レポートまで、これひとつで。初回30日間無料、クレジットカード登録も不要です。',
  },
};

export const getSiteMetadata = (locale: Locale) => pick(metadataByLocale, locale);
