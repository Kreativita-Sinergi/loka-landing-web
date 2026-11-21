import { pick, type Locale } from '@/data/localized';

export function getProBusinessesCopy(locale: Locale, count: number) {
  const copy = pick({
    id: {
      eyebrow: 'Pelanggan Loka Kasir',
      label: 'usaha berlangganan Loka Kasir Pro',
      more: 'Lihat semua usaha',
      less: 'Tampilkan lebih sedikit',
    },
    en: {
      eyebrow: 'LOKA KASIR CUSTOMERS',
      label: `${count === 1 ? 'business uses' : 'businesses use'} Loka Kasir Pro`,
      more: 'View all businesses',
      less: 'Show fewer businesses',
    },
    ms: {
      eyebrow: 'PELANGGAN LOKA KASIR',
      label: 'perniagaan melanggan Loka Kasir Pro',
      more: 'Lihat semua perniagaan',
      less: 'Tunjukkan lebih sedikit',
    },
    ja: {
      eyebrow: 'LOKA KASIRのお客様',
      label: '社がLoka Kasir Proを利用しています',
      more: 'すべてのお店を見る',
      less: '表示を減らす',
    },
  }, locale);
  const number = count.toLocaleString(locale);
  return { ...copy, number, title: `${number}${locale === 'ja' ? '' : ' '}${copy.label}` };
}
