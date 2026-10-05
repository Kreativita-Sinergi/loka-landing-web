import { pick, type Locale } from '@/data/localized';

/**
 * Copy halaman /harga.
 *
 * Isi tabel dan kotak info mengikuti FAQ asli (masa percobaan, outlet tambahan,
 * biaya lain) dan `data/pricing.ts`. Angka paket sendiri dibaca PricingPlans
 * dari API harga.
 */

/** `true` = tersedia, `false` = tidak tersedia, string = nilai yang ditampilkan. */
export type CompareValue = boolean | string;
export type CompareRow = { label: string; free: CompareValue; pro: CompareValue; proShort?: string };
export type CompareGroup = { title: string; rows: CompareRow[] };

const harga = {
  id: {
    metaTitle: 'Harga Loka Kasir',
    metaDescription:
      'Harga Loka Kasir jelas tanpa biaya tersembunyi. Paket Gratis untuk usaha yang baru mulai, paket Pro Rp59.000/bulan dengan semua fitur. Gratis 30 hari sejak transaksi pertama.',
    crumbHome: 'Beranda',
    crumb: 'Harga',
    title: 'Harga jelas, tanpa biaya tersembunyi',
    desc: 'Semua fitur Pro gratis 30 hari, dihitung sejak transaksi pertama. Setelah itu pilih paket yang pas.',
    compareTitle: 'Bandingkan paket',
    colFeature: 'Fitur',
    colFree: 'Gratis',
    colPro: 'Pro',
    yes: 'Tersedia',
    no: 'Tidak tersedia',
    groups: [
      {
        title: 'Penjualan',
        rows: [
          { label: 'Transaksi per bulan', free: '50', pro: 'Tanpa batas', proShort: '∞' },
          { label: 'Outlet', free: '1', pro: '1 termasuk', proShort: '1+' },
          { label: 'Produk, varian & cetak struk', free: true, pro: true },
          { label: 'Tunai, QRIS, kartu & transfer', free: true, pro: true },
          { label: 'Mode offline', free: true, pro: true },
          { label: 'Diskon, refund & void', free: false, pro: true },
        ],
      },
      {
        title: 'Stok & HPP',
        rows: [
          { label: 'Stok per outlet & peringatan menipis', free: true, pro: true },
          { label: 'Bahan baku, resep & waste', free: false, pro: true },
          { label: 'Supplier & purchase order', free: false, pro: true },
          { label: 'HPP, profit produk & saran harga', free: false, pro: true },
        ],
      },
      {
        title: 'Tim & operasional',
        rows: [
          { label: 'Buka/tutup shift & PIN kasir', free: true, pro: true },
          { label: 'Absensi karyawan', free: false, pro: true },
          { label: 'Meja, QR order & layar dapur', free: false, pro: true },
        ],
      },
      {
        title: 'Laporan',
        rows: [
          { label: 'Laporan dasar', free: true, pro: true },
          { label: 'Laporan keuangan & ekspor CSV', free: false, pro: true },
          { label: 'Analisis jam ramai & produk terlaris', free: false, pro: true },
          { label: 'Bantuan teknis prioritas', free: false, pro: true },
        ],
      },
    ] as CompareGroup[],
    trial: {
      title: 'Uji coba gratis 30 hari',
      items: [
        'Semua fitur Pro terbuka',
        'Transaksi tanpa batas',
        'Multi-outlet hingga 5 cabang',
        'Dihitung dari transaksi pertama, bukan saat daftar',
        'Tanpa komitmen, bisa turun ke paket Gratis',
      ],
    },
    costs: {
      title: 'Biaya lain yang perlu diketahui',
      items: [
        'Outlet tambahan Rp49.000/outlet/bulan atau Rp490.000/tahun',
        'Tidak ada biaya setup, per transaksi, atau per karyawan',
        'Harga sudah termasuk PPN',
        'Bayar lewat transfer bank atau dompet digital',
        'Bantuan setup online lewat WhatsApp',
      ],
    },
    faqTitle: 'Pertanyaan seputar harga',
    faqMore: 'Lihat semua FAQ',
    faq: [
      'Apakah ada masa percobaan gratis?',
      'Berapa banyak outlet dan pengguna yang bisa ditambahkan?',
      'Apakah ada biaya tambahan di luar harga langganan?',
    ],
  },
};

export const getHargaCopy = (locale: Locale) => pick(harga, locale);
