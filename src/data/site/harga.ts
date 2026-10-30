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
export type CompareRow = { label: string; trial: CompareValue; pro: CompareValue; trialShort?: string; proShort?: string };
export type CompareGroup = { title: string; rows: CompareRow[] };

const harga = {
  id: {
    metaTitle: 'Harga Loka Kasir',
    metaDescription:
      'Harga Loka Kasir jelas tanpa biaya tersembunyi. Paket Pro Rp59.000/bulan dengan semua fitur, bisa bulanan, tahunan, atau 3 tahun. Coba gratis 14 hari sejak transaksi pertama.',
    crumbHome: 'Beranda',
    crumb: 'Harga',
    title: 'Harga jelas, tanpa biaya tersembunyi',
    desc: 'Semua fitur Pro gratis 14 hari, dihitung sejak transaksi pertama. Setelah itu pilih paket langganan untuk terus berjualan.',
    compareTitle: 'Trial dan Pro, fiturnya sama lengkap',
    colFeature: 'Fitur',
    colTrial: 'Trial 14 hari',
    colPro: 'Pro',
    yes: 'Tersedia',
    no: 'Tidak tersedia',
    groups: [
      {
        title: 'Penjualan',
        rows: [
          { label: 'Transaksi per bulan', trial: 'Tanpa batas', trialShort: '∞', pro: 'Tanpa batas', proShort: '∞' },
          { label: 'Outlet', trial: 'Hingga 5', trialShort: '5', pro: '1 termasuk', proShort: '1+' },
          { label: 'Produk, varian & cetak struk', trial: true, pro: true },
          { label: 'Tunai, QRIS, kartu & transfer', trial: true, pro: true },
          { label: 'Mode offline', trial: true, pro: true },
          { label: 'Diskon, refund & void', trial: true, pro: true },
        ],
      },
      {
        title: 'Stok & HPP',
        rows: [
          { label: 'Stok per outlet & peringatan menipis', trial: true, pro: true },
          { label: 'Bahan baku, resep & waste', trial: true, pro: true },
          { label: 'Supplier & purchase order', trial: true, pro: true },
          { label: 'HPP, profit produk & saran harga', trial: true, pro: true },
        ],
      },
      {
        title: 'Tim & operasional',
        rows: [
          { label: 'Buka/tutup shift & PIN kasir', trial: true, pro: true },
          { label: 'Absensi karyawan', trial: true, pro: true },
          { label: 'Meja, QR order & layar dapur', trial: true, pro: true },
        ],
      },
      {
        title: 'Laporan',
        rows: [
          { label: 'Laporan dasar', trial: true, pro: true },
          { label: 'Laporan keuangan & ekspor CSV', trial: true, pro: true },
          { label: 'Analisis jam ramai & produk terlaris', trial: true, pro: true },
          { label: 'Bantuan teknis prioritas', trial: true, pro: true },
        ],
      },
    ] as CompareGroup[],
    trial: {
      title: 'Uji coba gratis 14 hari',
      items: [
        'Semua fitur Pro terbuka',
        'Transaksi tanpa batas',
        'Multi-outlet hingga 5 cabang',
        'Dihitung dari transaksi pertama, bukan saat daftar',
        'Setelah itu pilih Pro bulanan, tahunan, atau 3 tahun untuk terus berjualan',
        'Data tetap aman dan bisa dilihat kapan saja, walau belum berlangganan',
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
    referral: {
      eyebrow: 'Program referal',
      title: 'Ajak teman, langganan makin hemat',
      desc: 'Bagikan kode referal Anda. Teman dapat potongan di pembayaran Pro pertamanya, Anda dapat saldo yang otomatis memotong tagihan langganan berikutnya.',
      colPlan: 'Paket teman',
      colFriend: 'Teman hemat',
      colYou: 'Anda dapat',
      rows: [
        { plan: 'Pro bulanan', friend: 'Rp10.000', you: 'Rp15.000' },
        { plan: 'Pro tahunan', friend: 'Rp50.000', you: 'Rp59.000' },
      ],
      note: 'Saldo tersedia 7 hari setelah pembayaran teman terverifikasi, tidak hangus, dan memotong maksimal 50% tagihan bulanan atau tahunan. Berlaku untuk usaha baru yang belum pernah berlangganan Pro.',
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
