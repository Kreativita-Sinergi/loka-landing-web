import { pick, type Locale } from '@/data/localized';

const id = {
  eyebrow: 'PELANGGAN LOKA KASIR',
  title: 'Dipercaya pemilik usaha seperti Anda.',
  desc: 'Kenali usaha-usaha yang menjalankan operasionalnya bersama Loka Kasir Pro.',
  more: 'Lihat semua usaha',
  less: 'Tampilkan lebih sedikit',
};

export function getProBusinessesCopy(locale: Locale) {
  return pick({
    id,
    en: {
      eyebrow: 'LOKA KASIR CUSTOMERS',
      title: 'Trusted by business owners like you.',
      desc: 'Meet the businesses running their day-to-day operations with Loka Kasir Pro.',
      more: 'View all businesses',
      less: 'Show fewer businesses',
    },
    ms: {
      eyebrow: 'PELANGGAN LOKA KASIR',
      title: 'Dipercayai pemilik perniagaan seperti anda.',
      desc: 'Kenali perniagaan yang mengurus operasi harian bersama Loka Kasir Pro.',
      more: 'Lihat semua perniagaan',
      less: 'Tunjukkan lebih sedikit',
    },
    ja: {
      eyebrow: 'LOKA KASIRのお客様',
      title: '多くの事業者に選ばれています。',
      desc: 'Loka Kasir Proを日々の店舗運営に活用しているお店をご紹介します。',
      more: 'すべてのお店を見る',
      less: '表示を減らす',
    },
  }, locale);
}
