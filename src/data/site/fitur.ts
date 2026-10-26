import { pick, type Locale } from '@/data/localized';

/** Copy halaman /fitur. Daftar kategori fiturnya ada di `shared.ts`. */
const fitur = {
  id: {
    metaTitle: 'Semua Fitur Loka Kasir',
    metaDescription:
      'Fitur lengkap Loka Kasir: penjualan & kasir, grup ekstra, resto & QR order, stok & HPP, karyawan, saldo pelanggan, Rapor Toko, Radar Kebocoran, dan Pojok Pajak. Fitur Pro bisa dicoba gratis 30 hari.',
    crumbHome: 'Beranda',
    crumb: 'Fitur',
    title: 'Semua fitur Loka Kasir',
    desc: 'Dari meja kasir sampai laporan pemilik. Fitur bertanda Pro tersedia di paket Pro dan bisa dicoba gratis 30 hari.',
    jumpLabel: 'Lompat ke kategori',
    platformNote: 'Kasir tersedia di Android dan Windows. Pemilik mengatur semuanya lewat Web Admin di browser, tanpa instal apa pun.',
    platformLink: 'Lihat Web Admin',
    videosEyebrow: 'Fitur unggulan',
    videosTitle: 'Lihat langsung cara kerjanya',
    videosDesc: 'Video singkat tentang fitur yang paling sering membuat pemilik usaha beralih ke Loka, dari Rapor Toko dan grup ekstra terbaru sampai QR order dan laporan laba per produk.',
  },
};

export const getFiturCopy = (locale: Locale) => pick(fitur, locale);
