import { pick, type Locale } from '@/data/localized';

/** Alamat aplikasi Loka Kasir Accounting (web terpisah dari Web Admin kasir). */
export const ACCOUNTING_APP_URL = 'https://accounting.lokakasir.id';
export const ACCOUNTING_REGISTER_URL = `${ACCOUNTING_APP_URL}/register`;

/**
 * Copy halaman `/accounting` dan teaser di beranda.
 * Harga dan masa trial harus sama dengan yang tampil di aplikasi Loka Kasir
 * Accounting (lokakasir-accounting-web, LandingPage.tsx).
 * Baru tersedia dalam bahasa Indonesia; bahasa lain jatuh ke versi ini.
 */
const id = {
  metaTitle: 'Loka Kasir Accounting — Software Akuntansi Online',
  metaDescription:
    'Kelola jurnal, penjualan, pembelian, kas dan bank, persediaan, aset, dan laporan keuangan dengan Loka Kasir Accounting. Coba gratis 14 hari.',
  home: 'Beranda',
  title: 'Loka Kasir Accounting',
  desc: 'Kelola pembukuan dari penjualan, pembelian, dan kas sampai jurnal dan laporan keuangan. Gunakan secara mandiri atau hubungkan dengan Loka Kasir.',
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
    { icon: 'chart', title: 'Pajak & analisis', desc: 'Siapkan XML e-Faktur, tinjau SPT Masa PPN, dan pantau anggaran serta profitabilitas proyek.' },
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
  teaserEyebrow: 'Pembukuan usaha',
  teaserTitle: 'Loka Kasir Accounting',
  teaserDesc: 'Catat transaksi, pantau piutang dan utang, lalu baca laporan keuangan dari satu tempat. Accounting bisa dipakai mandiri atau terhubung dengan Loka Kasir.',
  teaserPoints: ['Penjualan, pembelian, dan rekonsiliasi bank', 'Persediaan, aset tetap, dan e-Faktur', 'Laba rugi, neraca, dan arus kas'],
  teaserCta: 'Lihat fitur Accounting',
  heroLink: 'Kenali Loka Kasir Accounting',
  previewCaption: 'Tampilan akun demo Loka Kasir Accounting',
};

export const getAccountingCopy = (locale: Locale) => pick({ id }, locale);
