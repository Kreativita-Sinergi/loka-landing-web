import { pick, type Locale } from '@/data/localized';

/**
 * Halaman per jenis usaha (/usaha/<slug>).
 *
 * Pertanyaan FAQ di sini harus SAMA PERSIS dengan pertanyaan di
 * `data/faq/id.ts`, karena jawabannya diambil dari sana oleh `FaqList`.
 */
export type BusinessFeatureIcon = 'layers' | 'qr' | 'monitor' | 'clock' | 'grid' | 'chef' | 'receipt' | 'user' | 'package' | 'barcode' | 'truck' | 'notebook' | 'phone' | 'offline' | 'wallet' | 'chart';

export type BusinessPage = {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  image: string;
  imageAlt: string;
  screenshot: string;
  screenshotAlt: string;
  painTitle: string;
  pains: { before: string; after: string }[];
  featTitle: string;
  feats: { icon: BusinessFeatureIcon; title: string; desc: string; pro?: boolean }[];
  planTitle: string;
  planNote: string;
  faq: string[];
};

export const BUSINESS_SLUGS = ['kafe', 'resto', 'toko', 'warung'] as const;
export type BusinessSlug = (typeof BUSINESS_SLUGS)[number];

const id: Record<BusinessSlug, BusinessPage> = {
  kafe: {
    slug: 'kafe',
    name: 'Kafe & Kedai Kopi',
    short: 'kafe',
    metaTitle: 'Aplikasi Kasir untuk Kafe & Kedai Kopi',
    metaDescription: 'Pesanan dengan varian dan add-on tetap cepat di jam ramai. QR order, layar bar, serta resep dan HPP per gelas di Loka Kasir.',
    h1: 'Aplikasi kasir untuk kafe & kedai kopi',
    sub: 'Pesanan dengan varian dan add-on tetap cepat di jam ramai. Modal per gelas kelihatan, harga jual jadi masuk akal.',
    image: '/images/site/foto-kasir-kafe.webp',
    imageAlt: 'Barista melayani pesanan di meja kasir kedai kopi',
    screenshot: '/images/site/app-transaksi.webp',
    screenshotAlt: 'Layar transaksi Loka Kasir dengan pesanan kopi di keranjang',
    painTitle: 'Jam ramai datang, antrean panjang, pesanan salah varian',
    pains: [
      { before: 'Antrean menumpuk karena kasir harus menulis pesanan satu per satu.', after: 'Pilih menu dan varian dalam beberapa ketukan, struk langsung tercetak.' },
      { before: 'Pesanan ukuran atau extra shot sering salah sampai ke barista.', after: 'Varian dan add-on tercatat jelas di pesanan dan layar bar.' },
      { before: 'Tidak tahu berapa modal satu gelas kopi susu.', after: 'Resep dan bahan baku menghitung HPP per gelas secara otomatis.' },
    ],
    featTitle: 'Dibuat untuk alur pesanan kafe',
    feats: [
      { icon: 'layers', title: 'Varian & add-on', desc: 'Ukuran, level gula, extra shot, semuanya dengan harga sendiri.' },
      { icon: 'qr', title: 'QR order dari meja', desc: 'Pelanggan memesan dari HP, pesanan langsung masuk ke kasir.', pro: true },
      { icon: 'monitor', title: 'Layar dapur & bar', desc: 'Barista melihat pesanan yang masuk dan statusnya.', pro: true },
      { icon: 'clock', title: 'Analisis jam ramai', desc: 'Atur jadwal karyawan sesuai jam paling sibuk.', pro: true },
    ],
    planTitle: 'Pro, Rp59.000/bulan',
    planNote: 'QR order, layar dapur, resep & HPP ada di paket Pro. Coba gratis 30 hari dulu.',
    faq: [
      'Apa itu variasi produk dan bagaimana cara menggunakannya?',
      'Apakah stok bahan baku berkurang otomatis saat ada transaksi?',
      'Bagaimana alur order untuk restoran dan kafe (FNB)?',
    ],
  },
  resto: {
    slug: 'resto',
    name: 'Rumah Makan & Resto',
    short: 'resto',
    metaTitle: 'Aplikasi Kasir untuk Rumah Makan & Restoran',
    metaDescription: 'Meja, pesanan, dan dapur terhubung. Denah meja, Kitchen Display System, pajak dan service otomatis di Loka Kasir.',
    h1: 'Aplikasi kasir untuk rumah makan & restoran',
    sub: 'Meja, pesanan, dan dapur terhubung. Kasir tahu meja mana yang belum bayar, dapur tahu pesanan mana yang harus dimasak dulu.',
    image: '/images/site/foto-resto.webp',
    imageAlt: 'Hidangan rumah makan tersaji di meja',
    screenshot: '/images/site/app-dapur.webp',
    screenshotAlt: 'Layar pesanan berjalan dengan status dapur di Loka Kasir',
    painTitle: 'Pesanan tercecer antara meja, kasir, dan dapur',
    pains: [
      { before: 'Kertas pesanan ke dapur hilang atau terbaca salah.', after: 'Pesanan langsung muncul di layar dapur lengkap dengan catatannya.' },
      { before: 'Sulit tahu meja mana yang masih makan dan mana yang belum bayar.', after: 'Denah meja menampilkan status setiap meja secara langsung.' },
      { before: 'Pajak dan service charge dihitung manual di kalkulator.', after: 'Pajak dan service terhitung otomatis di setiap transaksi.' },
    ],
    featTitle: 'Dari meja sampai dapur, satu alur',
    feats: [
      { icon: 'grid', title: 'Denah & status meja', desc: 'Lihat meja kosong, terisi, dan menunggu bayar.', pro: true },
      { icon: 'chef', title: 'Kitchen Display System', desc: 'Status pesanan: menunggu, dimasak, siap saji, tersaji.', pro: true },
      { icon: 'receipt', title: 'Pajak & service', desc: 'Diatur sekali, terhitung otomatis di struk.' },
      { icon: 'user', title: 'Mode pelayan', desc: 'Pelayan membuat pesanan dari meja tanpa akses pembayaran.' },
    ],
    planTitle: 'Pro, Rp59.000/bulan',
    planNote: 'Denah meja, layar dapur, dan QR order per meja ada di paket Pro. Coba gratis 30 hari dulu.',
    faq: [
      'Bagaimana alur order untuk restoran dan kafe (FNB)?',
      'Apa saja peran (role) yang tersedia dan apa bedanya?',
      'Apakah bisa mencetak struk ke printer thermal?',
    ],
  },
  toko: {
    slug: 'toko',
    name: 'Toko & Kelontong',
    short: 'toko',
    metaTitle: 'Aplikasi Kasir untuk Toko & Kelontong',
    metaDescription: 'Ratusan produk tetap rapi. Stok berkurang otomatis, peringatan stok menipis, supplier dan kasbon pelanggan di Loka Kasir.',
    h1: 'Aplikasi kasir untuk toko & kelontong',
    sub: 'Ratusan produk tetap rapi. Stok berkurang sendiri setiap ada penjualan, dan Anda diberi tahu sebelum barang habis.',
    image: '/images/site/foto-toko.webp',
    imageAlt: 'Pemilik toko buah tersenyum di kiosnya',
    screenshot: '/images/site/app-produk.webp',
    screenshotAlt: 'Layar daftar produk dan stok Loka Kasir',
    painTitle: 'Barang habis tanpa sadar, utang pelanggan tercatat di buku',
    pains: [
      { before: 'Baru sadar stok habis saat pembeli menanyakan barangnya.', after: 'Peringatan muncul saat stok di bawah batas minimum.' },
      { before: 'Memasukkan ratusan produk satu per satu memakan waktu.', after: 'Impor produk sekaligus dari file CSV.' },
      { before: 'Utang pelanggan dicatat di buku dan sering lupa ditagih.', after: 'Kasbon pelanggan tercatat di aplikasi lengkap dengan riwayatnya.' },
    ],
    featTitle: 'Stok rapi tanpa hitung manual',
    feats: [
      { icon: 'package', title: 'Stok & peringatan menipis', desc: 'Batas minimum per produk dan per outlet.' },
      { icon: 'barcode', title: 'Scan barcode', desc: 'Cari dan tambah produk lebih cepat dengan kamera.' },
      { icon: 'truck', title: 'Supplier & purchase order', desc: 'Catat pembelian, stok bertambah otomatis.', pro: true },
      { icon: 'notebook', title: 'Kasbon pelanggan', desc: 'Utang pelanggan tercatat dan mudah ditagih.', pro: true },
    ],
    planTitle: 'Mulai Gratis, naik ke Pro saat ramai',
    planNote: 'Stok dan peringatan menipis ada di semua paket. Supplier, PO, dan kasbon pelanggan ada di Pro.',
    faq: [
      'Bagaimana cara menambah produk ke dalam sistem?',
      'Bagaimana cara memantau stok yang hampir habis?',
      'Bagaimana cara transfer stok antar outlet atau cabang?',
    ],
  },
  warung: {
    slug: 'warung',
    name: 'Warung & Usaha Kecil',
    short: 'warung',
    metaTitle: 'Aplikasi Kasir Gratis untuk Warung & Usaha Kecil',
    metaDescription: 'Cukup pakai HP Android yang sudah ada. Penjualan tercatat, kas jelas, dan tetap jalan walau sinyal hilang. Mulai dari paket Gratis.',
    h1: 'Aplikasi kasir gratis untuk warung & usaha kecil',
    sub: 'Cukup pakai HP Android yang sudah ada. Penjualan tercatat, uang usaha tidak bercampur, dan tetap jalan walau sinyal hilang.',
    image: '/images/site/foto-warung.webp',
    imageAlt: 'Warung makan kecil di pinggir jalan',
    screenshot: '/images/site/app-beranda.webp',
    screenshotAlt: 'Layar beranda Loka Kasir dengan ringkasan penjualan hari ini',
    painTitle: 'Penjualan dicatat di buku, uang usaha bercampur',
    pains: [
      { before: 'Catatan di buku sering terlewat saat warung sedang ramai.', after: 'Setiap penjualan tercatat otomatis, lengkap dengan jamnya.' },
      { before: 'Uang usaha dan uang pribadi bercampur di satu dompet.', after: 'Kas masuk dan keluar tercatat, saldo laci selalu jelas.' },
      { before: 'Sinyal di lokasi warung sering hilang.', after: 'Mode offline menyimpan transaksi dan mengirimnya saat online.' },
    ],
    featTitle: 'Sederhana, cukup dari HP',
    feats: [
      { icon: 'phone', title: 'Cukup HP Android', desc: 'Tidak perlu beli mesin kasir atau komputer.' },
      { icon: 'offline', title: 'Tetap jalan offline', desc: 'Jualan tidak berhenti karena sinyal.' },
      { icon: 'wallet', title: 'Kas masuk & keluar', desc: 'Catat belanja harian supaya kas tetap cocok.' },
      { icon: 'chart', title: 'Laporan harian', desc: 'Lihat penjualan hari ini langsung di beranda.' },
    ],
    planTitle: 'Gratis, Rp0 selamanya',
    planNote: 'Paket Gratis mencakup 50 transaksi per bulan, 1 outlet, cetak struk, dan mode offline.',
    faq: [
      'Apakah ada masa percobaan gratis?',
      'Bagaimana jika koneksi internet terputus saat transaksi?',
      'Di perangkat apa saja App Kasir bisa dijalankan?',
    ],
  },
};

const common = {
  id: {
    crumbHome: 'Beranda',
    crumbSection: 'Jenis Usaha',
    primary: 'Coba Gratis 30 Hari',
    whatsapp: 'Chat WhatsApp',
    painEyebrow: 'Masalah yang sering terjadi',
    featEyebrow: 'Fitur unggulan',
    planLabel: 'Paket yang cocok',
    planCta: 'Lihat Harga',
    faqEyebrow: 'FAQ',
    faqTitle: 'Pertanyaan seputar',
    faqMore: 'Lihat semua FAQ',
    waMessage: (name: string) => `Halo tim Loka, saya punya usaha ${name.toLowerCase()} dan mau tanya tentang Loka Kasir.`,
  },
};

export const getBusinessPage = (slug: BusinessSlug, locale: Locale) => pick({ id }, locale)[slug];
export const getBusinessCommon = (locale: Locale) => pick(common, locale);
export const isBusinessSlug = (s: string): s is BusinessSlug => (BUSINESS_SLUGS as readonly string[]).includes(s);
