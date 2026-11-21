import { pick, type Locale } from '@/data/localized';

export function getProBusinessesCopy(locale: Locale, count: number) {
  const n = count.toLocaleString(locale);
  return pick({
    id: {
      eyebrow: 'Pelanggan Loka Kasir',
      title: `${n} usaha berlangganan Loka Kasir Pro`,
      more: 'Lihat semua usaha',
      less: 'Tampilkan lebih sedikit',
    },
    en: {
      eyebrow: 'LOKA KASIR CUSTOMERS',
      title: `${n} ${count === 1 ? 'business uses' : 'businesses use'} Loka Kasir Pro`,
      more: 'View all businesses',
      less: 'Show fewer businesses',
    },
    ms: {
      eyebrow: 'PELANGGAN LOKA KASIR',
      title: `${n} perniagaan melanggan Loka Kasir Pro`,
      more: 'Lihat semua perniagaan',
      less: 'Tunjukkan lebih sedikit',
    },
    ja: {
      eyebrow: 'LOKA KASIRのお客様',
      title: `${n}社がLoka Kasir Proを利用しています`,
      more: 'すべてのお店を見る',
      less: '表示を減らす',
    },
  }, locale);
}
