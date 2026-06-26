export const siteDetails = {
  siteName: 'Loka',
  siteUrl: 'https://lokakasir.id',
  dashboardUrl: 'https://app.lokakasir.id',
  metadata: {
    title: 'Loka Kasir - Solusi Kasir Digital Modern untuk UMKM',
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
