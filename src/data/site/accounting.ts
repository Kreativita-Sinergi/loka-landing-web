import { pick, type Locale } from '@/data/localized';

/** Alamat aplikasi Loka Kasir Accounting (web terpisah dari Web Admin kasir). */
export const ACCOUNTING_APP_URL = 'https://accounting.lokakasir.id';

/**
 * Copy halaman `/accounting` dan teaser di beranda.
 * Harga dan masa trial harus sama dengan yang tampil di aplikasi Loka Kasir
 * Accounting (lokakasir-accounting-web, LandingPage.tsx).
 * Baru tersedia dalam bahasa Indonesia; bahasa lain jatuh ke versi ini.
 */
const id = {
  metaTitle: 'Loka Kasir Accounting — Software Akuntansi Online untuk UMKM',
  metaDescription:
    'Loka Kasir Accounting: jurnal, buku besar, kas & bank, persediaan, aset tetap, hingga laba rugi dan neraca. Terhubung dengan Loka Kasir. Trial 14 hari.',
  home: 'Beranda',
  badge: 'Produk baru',
  title: 'Pembukuan rapi, langsung dari transaksi kasir',
  desc: 'Loka Kasir Accounting adalah aplikasi akuntansi online untuk usaha Anda. Penjualan dari Loka Kasir masuk ke jurnal, lalu jadi laporan keuangan yang siap dibaca — tanpa salin angka ke spreadsheet.',
  ctaPrimary: 'Coba gratis 14 hari',
  ctaSecondary: 'Lihat fitur',
  heroNote: 'Akun Accounting terpisah dari akun kasir. Integrasi dengan Loka Kasir bisa dinyalakan kapan saja.',
  flowTitle: 'Dari kasir ke laporan keuangan',
  flowDesc: 'Kasir mencatat penjualan seperti biasa. Accounting mengubahnya menjadi jurnal dan laporan.',
  flow: [
    { title: 'Loka Kasir', desc: 'Transaksi penjualan, pembayaran, dan pembatalan dari outlet.' },
    { title: 'Jurnal otomatis', desc: 'Setiap transaksi dipetakan ke akun sesuai pengaturan Anda.' },
    { title: 'Laporan keuangan', desc: 'Laba rugi, neraca, arus kas, dan buku besar siap dibaca.' },
  ],
  featuresTitle: 'Satu sistem untuk seluruh pembukuan',
  featuresDesc: 'Catat sekali. Transaksi, persediaan, dan laporan memakai data yang sama.',
  features: [
    { icon: 'report', title: 'Laporan keuangan', desc: 'Laba rugi, neraca, arus kas, buku besar, dan neraca saldo dari transaksi yang sama.' },
    { icon: 'receipt', title: 'Penjualan & pembelian', desc: 'Penawaran, pesanan, invoice, retur, serta umur piutang dan utang.' },
    { icon: 'bank', title: 'Kas & bank', desc: 'Penerimaan, pembayaran, transfer, impor mutasi, dan rekonsiliasi bank.' },
    { icon: 'box', title: 'Persediaan & aset', desc: 'Kartu stok, multi-gudang, penyesuaian, dan penyusutan aset tetap.' },
    { icon: 'shield', title: 'Kontrol tim', desc: 'Hak akses per peran, kunci periode, jejak audit, dan autentikasi dua faktor.' },
    { icon: 'chart', title: 'Analisis', desc: 'Proyek, departemen, anggaran, pajak, dan multi mata uang.' },
  ],
  pricingTitle: 'Harga',
  pricingAmount: 'Rp149.000',
  pricingUnit: '/ organisasi / bulan',
  pricingPoints: ['Trial 14 hari dengan seluruh fitur', 'Tidak diperpanjang otomatis', 'Undang tim dengan peran berbeda', 'Integrasi Loka Kasir opsional'],
  pricingNote: 'Langganan Accounting terpisah dari paket Loka Kasir.',
  faqTitle: 'Pertanyaan umum',
  faqs: [
    { q: 'Apakah harus memakai Loka Kasir?', a: 'Tidak. Loka Kasir Accounting bisa dipakai sebagai aplikasi pembukuan mandiri. Integrasi dengan Loka Kasir bersifat opsional.' },
    { q: 'Apa bedanya dengan laporan di Web Admin?', a: 'Web Admin menampilkan laporan penjualan dan stok outlet. Accounting adalah pembukuan lengkap: jurnal, buku besar, neraca, kas & bank, utang-piutang, dan aset.' },
    { q: 'Apakah cocok untuk bisnis Indonesia?', a: 'Ya. Tersedia chart of accounts awal, format Rupiah, profil pajak Indonesia, dan periode fiskal.' },
    { q: 'Bagaimana memindahkan data yang sudah ada?', a: 'Gunakan template impor untuk akun dan saldo awal. Data laporan juga dapat diekspor.' },
  ],
  teaserEyebrow: 'Baru · Loka Kasir Accounting',
  teaserTitle: 'Penjualan tercatat. Pembukuan ikut rapi.',
  teaserDesc: 'Hubungkan Loka Kasir dengan Loka Kasir Accounting: transaksi kasir menjadi jurnal, lalu laba rugi dan neraca — tanpa input ulang.',
  teaserPoints: ['Jurnal otomatis dari transaksi kasir', 'Laba rugi, neraca & arus kas', 'Kas & bank, utang-piutang, aset'],
  teaserCta: 'Kenali Accounting',
};

export const getAccountingCopy = (locale: Locale) => pick({ id }, locale);
