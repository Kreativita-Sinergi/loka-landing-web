import { pick, type Locale } from '@/data/localized';

/**
 * Copy beranda desain 2026.
 *
 * Baru tersedia dalam bahasa Indonesia. Bahasa lain jatuh ke versi ini lewat
 * `pick`, sampai copy aslinya ditulis untuk tiap pasar.
 */
const id = {
  hero: {
    titleA: 'Aplikasi kasir yang bikin jualan',
    titleB: 'lebih rapi',
    desc: 'Catat penjualan, cetak struk, pantau stok, dan cocokkan kas setiap tutup shift. Tetap bisa jualan walau internet sedang mati.',
    primary: 'Coba Gratis 30 Hari',
    secondary: 'Lihat Harga',
    points: ['Bisa offline', 'Struk printer thermal', 'Ada paket gratis'],
    caption: 'Bisa dipakai di HP, tablet, PC, atau mesin POS Android yang sudah Anda punya.',
    imageAlt: 'Aplikasi Loka Kasir di mesin POS desktop, POS handheld, dan tablet, bersama printer struk',
  },
  stats: {
    users: 'usaha sudah terdaftar',
    transactions: 'transaksi tercatat di Loka',
    devicesTitle: 'HP, tablet & PC',
    devices: 'Android, Windows, dan Web Admin',
    onsiteTitle: 'Setup langsung',
    onsite: 'di Padang, Pekanbaru & Payakumbuh',
  },
  demo: {
    eyebrow: 'Coba langsung',
    title: 'Coba kasirnya, tanpa daftar',
    desc: 'Pilih menu, bayar, lalu lihat struknya. Begini rasanya melayani pembeli dengan Loka.',
    steps: ['Pilih menu', 'Bayar', 'Struk'],
    hint: 'Demo interaktif, klik menu untuk menambah pesanan',
    shop: 'Kedai Loka',
    open: 'Shift dibuka',
    order: 'Pesanan',
    empty: 'Pilih menu untuk mulai.',
    total: 'Total',
    pay: 'Bayar',
    paid: 'Pembayaran selesai',
    again: 'Transaksi baru',
    thanks: 'Terima kasih, mampir lagi!',
    cash: 'Tunai',
    products: [
      { name: 'Kopi susu', price: 18000 },
      { name: 'Es teh', price: 5000 },
      { name: 'Mie ayam', price: 18000 },
      { name: 'Nasi goreng', price: 25000 },
      { name: 'Roti bakar', price: 12000 },
      { name: 'Air mineral', price: 5000 },
    ],
  },
  business: {
    eyebrow: 'Jenis usaha',
    title: 'Cocok untuk usaha kecil sampai yang punya banyak cabang',
    desc: 'Alur pesanan menyesuaikan jenis usaha Anda, dari warung sampai restoran dengan layar dapur.',
    more: 'Lihat fitur',
    items: [
      { slug: 'kafe', title: 'Kafe & Kedai Kopi', desc: 'Varian ukuran, add-on, dan QR order dari meja.', image: '/images/site/foto-kafe.webp' },
      { slug: 'resto', title: 'Rumah Makan & Resto', desc: 'Denah meja, pesanan masuk ke layar dapur, pajak dan service.', image: '/images/site/foto-resto.webp' },
      { slug: 'toko', title: 'Toko & Kelontong', desc: 'Stok berkurang otomatis dan ada peringatan saat stok menipis.', image: '/images/site/foto-toko.webp' },
      { slug: 'warung', title: 'Warung & Usaha Kecil', desc: 'Mulai dari paket gratis. Cukup pakai HP Android yang ada.', image: '/images/site/foto-warung.webp' },
    ],
  },
  features: {
    eyebrow: 'Fitur',
    title: 'Yang dibutuhkan di meja kasir, sudah ada',
    desc: 'Dipakai harian oleh kasir, dipantau pemilik dari mana saja.',
    rows: [
      { eyebrow: 'Penjualan', title: 'Transaksi cepat, struk langsung tercetak', desc: 'Pilih produk, pilih cara bayar, struk keluar. Satu transaksi cukup hitungan detik.', bullets: ['Produk tampil sebagai grid atau daftar', 'Dine-in, takeaway, dan delivery', 'Tunai, QRIS, kartu, dan transfer', 'Printer thermal Bluetooth atau USB'], image: '/images/site/app-transaksi.webp', alt: 'Layar transaksi Loka Kasir dengan keranjang terisi' },
      { eyebrow: 'Stok', title: 'Setiap barang keluar, stok ikut tercatat', desc: 'Tidak perlu hitung manual di akhir hari. Stok berkurang sendiri setiap ada penjualan.', bullets: ['Stok per outlet dan peringatan stok menipis', 'Varian produk, bahan baku, dan resep', 'Supplier dan purchase order', 'HPP dan saran harga jual'], image: '/images/site/app-produk.webp', alt: 'Layar daftar produk dan stok Loka Kasir' },
      { eyebrow: 'Shift & kas', title: 'Tutup shift, uang di laci langsung cocok', desc: 'Saldo awal dicatat saat buka kasir. Saat tutup, selisih kas langsung kelihatan.', bullets: ['Buka dan tutup shift per kasir', 'Selisih kas tercatat otomatis', 'PIN kasir dan supervisor', 'Absensi karyawan dengan PIN'], image: '/images/site/app-tutupkasir.webp', alt: 'Layar tutup kasir dengan ringkasan penjualan dan selisih kas' },
      { eyebrow: 'Laporan', title: 'Pantau penjualan dari mana saja', desc: 'Pemilik bisa cek penjualan, stok, dan laporan lewat Web Admin, tanpa harus ke toko.', bullets: ['Dashboard penjualan real-time', 'Produk terlaris dan jam ramai', 'Laporan per outlet atau semua outlet', 'Ekspor laporan ke CSV'], image: '/images/site/app-jamramai.webp', alt: 'Layar analisis jam ramai Loka Kasir' },
    ],
  },
  offline: {
    eyebrow: 'Mode offline',
    title: 'Internet putus? Kasir tetap jalan',
    desc: 'Tidak perlu menunda pembeli karena sinyal hilang. Loka menyimpan transaksi di perangkat dan mengirimnya begitu online lagi.',
    steps: [
      { title: 'Sinyal hilang', desc: 'Aplikasi otomatis pindah ke mode offline. Tidak ada yang perlu diatur.' },
      { title: 'Transaksi tetap tersimpan', desc: 'Pesanan, pembayaran tunai, dan struk berjalan seperti biasa. Data disimpan di perangkat.' },
      { title: 'Online, langsung sinkron', desc: 'Begitu internet kembali, semua transaksi terkirim ke server dan laporan ikut terbarui.' },
    ],
    note: 'Pembayaran non-tunai seperti QRIS dan kartu tetap membutuhkan koneksi internet.',
  },
  allFeatures: {
    eyebrow: 'Semua fitur',
    title: 'Lengkap untuk operasional harian',
    more: 'Lihat semua fitur',
  },
  download: {
    eyebrow: 'Download',
    title: 'Download aplikasi Loka Kasir',
    desc: 'Pilih sesuai perangkat kasir Anda. Satu akun bisa dipakai di semua perangkat.',
    owner: 'Pemilik usaha? Pantau penjualan dan stok lewat Web Admin di browser.',
    ownerLink: 'Buka Web Admin →',
  },
  testimonials: {
    eyebrow: 'Pelanggan',
    title: 'Kata pemilik usaha yang sudah pakai Loka',
    dummyNote: 'Data dummy, ganti dengan testimoni asli sebelum rilis',
  },
  start: {
    eyebrow: 'Cara mulai',
    title: 'Daftar hari ini, besok sudah bisa jualan',
    steps: [
      { title: 'Buat akun', desc: 'Daftar gratis lewat aplikasi Android atau browser.' },
      { title: 'Masukkan produk', desc: 'Ketik satu per satu, atau impor sekaligus dari file CSV.' },
      { title: 'Buka kasir', desc: 'Masukkan saldo awal laci, kasir siap melayani pembeli.' },
    ],
    helpTitle: 'Butuh bantuan setup?',
    helpDesc: 'Tim Loka bisa datang langsung di Padang, Pekanbaru, dan Payakumbuh. Kota lain dibantu online.',
    helpCta: 'Chat Tim Loka',
    helpMessage: 'Halo tim Loka, saya butuh bantuan setup Loka Kasir.',
  },
  pricing: {
    eyebrow: 'Harga',
    title: 'Harga jelas, tanpa biaya tersembunyi',
    desc: 'Semua fitur Pro gratis 30 hari. Setelah itu pilih paket yang pas.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Pertanyaan yang sering ditanyakan',
    desc: 'Belum ketemu jawabannya? Tanya langsung ke tim kami.',
    cta: 'Tanya via WhatsApp',
    more: 'Lihat semua pertanyaan',
  },
  cta: {
    title: 'Mulai jualan lebih rapi hari ini',
    desc: 'Gratis 30 hari untuk semua fitur Pro. Tidak ada komitmen.',
    primary: 'Coba Gratis 30 Hari',
    secondary: 'Chat WhatsApp',
  },
};

export type HomeCopy = typeof id;
export const getHomeCopy = (locale: Locale): HomeCopy => pick<HomeCopy>({ id }, locale);
