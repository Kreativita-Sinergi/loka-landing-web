import { pick, type Locale } from '@/data/localized';

/**
 * Blog Loka.
 *
 * Infrastrukturnya sudah siap, tapi baru SATU artikel yang benar-benar ditulis.
 * Judul lain di bawah adalah rencana (`draft: true`): tidak dirender, tidak
 * ditautkan, dan tidak dibuat halamannya. Untuk menerbitkan, tulis `content`-nya
 * lalu hapus `draft`.
 */
export type BlogCategory = 'Keuangan' | 'Tips Jualan' | 'Pembayaran' | 'Fitur Loka';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'calc'; cards: { title: string; rows: [string, string][]; resultLabel: string; result: string; good?: boolean }[] }
  | { type: 'tip'; lead: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** Tanggal terbit, ISO (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  author: string;
  image: string;
  imageAlt: string;
  content: BlogBlock[];
  draft?: boolean;
};

const posts: BlogPost[] = [
  {
    slug: 'diskon-vs-beli-2-gratis-1',
    title: 'Diskon 20% atau beli 2 gratis 1, mana yang lebih untung?',
    excerpt: 'Dua promo yang terdengar mirip, tapi efeknya ke laba bisa jauh berbeda. Kita hitung dengan contoh harga sungguhan.',
    category: 'Keuangan',
    date: '2026-10-05',
    readMinutes: 5,
    author: 'Tim Loka',
    image: '/images/site/foto-toko.webp',
    imageAlt: 'Pedagang buah memegang dua nanas di kiosnya',
    content: [
      { type: 'p', text: 'Dua promo ini sering dianggap sama. Padahal, untuk barang dengan modal dan harga yang sama, hasilnya ke laba bisa sangat berbeda. Mari kita hitung dengan satu contoh.' },
      { type: 'h2', text: 'Contohnya: harga jual Rp10.000, modal Rp6.000' },
      { type: 'p', text: 'Tanpa promo, setiap barang yang terjual memberi untung Rp4.000, jadi tiga barang memberi untung Rp12.000. Sekarang bandingkan dua promo untuk pembeli yang membawa pulang tiga barang.' },
      {
        type: 'calc',
        cards: [
          { title: 'Diskon 20% (3 barang)', rows: [['Harga per barang', 'Rp8.000'], ['Total dibayar', 'Rp24.000'], ['Total modal', 'Rp18.000']], resultLabel: 'Untung', result: 'Rp6.000', good: true },
          { title: 'Beli 2 gratis 1 (3 barang)', rows: [['Barang dibayar', '2'], ['Total dibayar', 'Rp20.000'], ['Total modal', 'Rp18.000']], resultLabel: 'Untung', result: 'Rp2.000' },
        ],
      },
      { type: 'p', text: 'Beli 2 gratis 1 sebenarnya sama dengan diskon sekitar 33% per barang. Promo ini cocok untuk barang dengan margin besar atau stok yang perlu cepat habis. Untuk barang dengan margin tipis, diskon persen yang kecil biasanya lebih aman.' },
      { type: 'tip', lead: 'Di Loka:', text: 'buat diskon otomatis per produk atau kategori dari Web Admin, lalu bandingkan laba sebelum dan sesudah promo di laporan profit per produk.' },
    ],
  },
  // ── Rencana artikel (belum ditulis, tidak tampil) ──
  { slug: 'pisahkan-uang-usaha-dan-pribadi', title: 'Kenapa uang usaha dan uang pribadi harus dipisah', excerpt: 'Tanpa dipisah, Anda tidak pernah tahu usaha sebenarnya untung atau rugi.', category: 'Keuangan', date: '', readMinutes: 5, author: 'Tim Loka', image: '/images/site/foto-warung.webp', imageAlt: '', content: [], draft: true },
  { slug: 'istilah-keuangan-pemilik-usaha', title: '7 istilah keuangan yang wajib dipahami pemilik usaha', excerpt: 'Omzet, laba kotor, HPP, sampai arus kas, dijelaskan dengan contoh warung.', category: 'Keuangan', date: '', readMinutes: 6, author: 'Tim Loka', image: '/images/site/foto-toko.webp', imageAlt: '', content: [], draft: true },
  { slug: 'qris-untuk-usaha-kecil', title: 'Kenalan dengan QRIS untuk usaha kecil', excerpt: 'Cara kerja QRIS, apa yang perlu disiapkan, dan kapan cocok dipakai.', category: 'Pembayaran', date: '', readMinutes: 4, author: 'Tim Loka', image: '/images/site/foto-kafe.webp', imageAlt: '', content: [], draft: true },
  { slug: 'risiko-catat-penjualan-di-buku', title: 'Masih catat penjualan di buku? Ini risikonya', excerpt: 'Catatan yang terlewat, angka yang tidak cocok, dan waktu yang habis di akhir hari.', category: 'Tips Jualan', date: '', readMinutes: 4, author: 'Tim Loka', image: '/images/site/foto-resto.webp', imageAlt: '', content: [], draft: true },
  { slug: 'arti-kode-di-struk-belanja', title: 'Arti kode-kode di struk belanja', excerpt: 'Membaca struk dengan benar membantu Anda merancang struk sendiri.', category: 'Tips Jualan', date: '', readMinutes: 3, author: 'Tim Loka', image: '/images/site/foto-kasir-kafe.webp', imageAlt: '', content: [], draft: true },
  { slug: 'kedai-selalu-ramai', title: 'Yang membuat kedai selalu ramai', excerpt: 'Bukan cuma soal rasa: kecepatan layanan dan konsistensi juga menentukan.', category: 'Tips Jualan', date: '', readMinutes: 5, author: 'Tim Loka', image: '/images/site/foto-kafe.webp', imageAlt: '', content: [], draft: true },
];

const copy = {
  id: {
    metaTitle: 'Blog Loka',
    metaDescription: 'Tips jualan, keuangan usaha, dan cara memaksimalkan aplikasi kasir Anda dari tim Loka Kasir.',
    crumbHome: 'Beranda',
    crumbBlog: 'Blog',
    title: 'Blog Loka',
    desc: 'Tips jualan, keuangan usaha, dan cara memaksimalkan kasir Anda.',
    all: 'Semua',
    readTime: (m: number) => `${m} menit baca`,
    readMore: 'Baca artikel',
    latest: 'Artikel terbaru',
    empty: 'Artikel lain sedang kami tulis. Nantikan ya.',
    followTitle: 'Dapat tips jualan setiap minggu',
    followDesc: 'Ikuti @lokakasir.id di Instagram untuk konten terbaru.',
    followCta: 'Ikuti di Instagram',
    share: 'Bagikan:',
    shareWa: 'Bagikan ke WhatsApp',
    copyLink: 'Salin tautan',
    copied: 'Tautan disalin',
    alsoRead: 'Baca juga',
  },
};

export const getBlogCopy = (locale: Locale) => pick(copy, locale);

/** Artikel yang sudah terbit, terbaru dulu. */
export const getPublishedPosts = (): BlogPost[] =>
  posts.filter(p => !p.draft).sort((a, b) => b.date.localeCompare(a.date));

export const getPublishedPost = (slug: string): BlogPost | undefined => getPublishedPosts().find(p => p.slug === slug);

export const BLOG_CATEGORIES: BlogCategory[] = ['Keuangan', 'Tips Jualan', 'Pembayaran', 'Fitur Loka'];

/** "2026-10-05" → "5 Oktober 2026". */
export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}
