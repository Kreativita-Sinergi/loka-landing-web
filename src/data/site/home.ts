import { pick, type Locale } from '@/data/localized';

/**
 * Copy beranda desain 2026.
 *
 * Baru tersedia dalam bahasa Indonesia. Bahasa lain jatuh ke versi ini lewat
 * `pick`, sampai copy aslinya ditulis untuk tiap pasar.
 */
const id = {
  hero: {
    eyebrow: 'Loka Kasir / Android & Windows',
    titleA: 'Aplikasi kasir untuk',
    titleB: 'jualan sehari-hari.',
    desc: 'Layani pembeli dan cetak struk dari HP, tablet, atau PC yang sudah Anda punya. Pantau penjualan tiap outlet lewat Web Admin.',
    primary: 'Coba Gratis 14 Hari',
    secondary: 'Coba demo kasir',
    trialNote: 'Setelah masa coba, lanjutkan dengan paket berlangganan.',
    pricing: 'Lihat harga',
    productsLabel: 'Juga dari Loka Kasir',
    imageAlt: 'Layar transaksi Loka Kasir pada terminal kasir, mesin kasir genggam, dan tablet, dengan printer struk di sampingnya',
    benefits: [
      { title: 'Jualan saat offline', desc: 'Transaksi tunai tetap tersimpan. Data tersinkron saat internet kembali.' },
      { title: 'Stok ikut terpotong', desc: 'Setiap penjualan mengurangi stok di outlet tempat barang terjual.' },
      { title: 'Cocokkan kas per shift', desc: 'Bandingkan uang di laci dengan catatan kasir untuk melihat selisihnya.' },
    ],
  },
  whatsNew: {
    eyebrow: 'Baru di versi 1.46',
    title: 'Bukan cuma mencatat. Loka sekarang memberi tahu apa yang perlu dibenahi.',
    desc: 'Wawasan Pemilik membaca transaksi toko Anda, lalu memberi nilai, saran, dan peringatan setiap minggu. Tanpa perlu membaca laporan satu per satu.',
    video: 'Tonton videonya',
    report: {
      label: 'Rapor Toko',
      title: 'Nilai A–E tiap Senin, plus saran yang diurutkan dari rupiah terbesar',
      grade: 'B',
      score: '78 / 100',
      trend: 'Naik dari C minggu lalu',
      pillars: [
        { name: 'Penjualan', value: 82 },
        { name: 'Untung', value: 74 },
        { name: 'Menu', value: 80 },
        { name: 'Pelanggan', value: 69 },
        { name: 'Kontrol', value: 85 },
      ],
      tips: [
        { tag: 'Tambah', text: 'Es Teh Manis habis sejak Kamis, ±Rp240rb/hari hilang' },
        { tag: 'Peluang', text: 'Teh + Mie Goreng sering dibeli bersama, jadikan paket' },
        { tag: 'Benahi', text: 'Potongan harga 11% dari omzet, sehatnya di bawah 8%' },
      ],
      note: 'Contoh tampilan dengan data toko demo',
    },
    insights: [
      { icon: 'radar', title: 'Radar Kebocoran', desc: 'Batal nota, refund, diskon manual, dan kas kurang dibandingkan antar kasir. Yang janggal langsung kelihatan, lengkap dengan Rapor Kasir.' },
      { icon: 'lab', title: 'Lab Harga', desc: 'Setelah harga naik, omzet ikut naik atau pembeli malah berkurang? Dihitung dari penjualan sebelum dan sesudahnya.' },
      { icon: 'star', title: 'Panggil Balik & QR penilaian', desc: 'Daftar pelanggan yang mulai jarang datang, siap disapa lewat WhatsApp. QR di struk mengumpulkan bintang dari pembeli.' },
      { icon: 'tax', title: 'Pojok Pajak', desc: 'PPh Final 0,5% dihitung dari omzet, lengkap dengan pengingat setor tiap tanggal 10. Alat bantu hitung, bukan nasihat pajak.' },
    ],
    moreTitle: 'Juga baru sejak versi 1.40',
    more: [
      { icon: 'flame', version: '1.44', title: 'Grup ekstra & jumlah per ekstra', desc: 'Level, topping, panas/dingin. Snack ×3 dalam satu porsi, struk merinci harganya.' },
      { icon: 'wallet', version: '1.45', title: 'Saldo pelanggan & kartu member', desc: 'Bayar pakai saldo sebagian, cek saldo & poin lewat QR kartu member.', pro: true },
      { icon: 'package', version: '1.46', title: 'Paket produk, bisa per varian', desc: 'Buat paket langsung dari aplikasi dan web. Stok tiap varian ikut terpotong.', pro: true },
      { icon: 'ruler', version: '1.43', title: 'Toko bangunan', desc: 'Jual per sak, batang, meter, dan m². Surat jalan tanpa harga, cetak atau PDF.' },
      { icon: 'notebook', version: '1.40', title: 'Buku Bon', desc: 'Rekap utang per pelanggan, bayar sekaligus, batas bon, dan pengingat WhatsApp.', pro: true },
      { icon: 'dices', version: '1.42', title: 'Sewa biliar & PS', desc: 'Bayar dulu baru main, meja gratis hari ini, satu QR untuk banyak paket.' },
      { icon: 'scissors', version: '1.40', title: 'Salon & barbershop', desc: 'Staf per layanan, komisi, paket sesi, dan jadwal stylist.' },
      { icon: 'bike', version: '1.40', title: 'Harga ojol & booking online', desc: 'Harga GoFood/Grab/GoMart untuk semua usaha, link booking lapangan & booking rutin.' },
    ],
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
    title: 'Pilih kasir sesuai jenis usaha Anda',
    more: 'Lihat semua fitur kasir',
    items: [
      { slug: 'kafe', title: 'Kafe & Kedai Kopi', desc: 'Atur ukuran minuman, tambahan topping, dan pesanan QR dari meja.', image: '/images/site/foto-kafe.webp' },
      { slug: 'resto', title: 'Rumah Makan & Resto', desc: 'Lihat meja yang terisi dan teruskan pesanan ke layar dapur.', image: '/images/site/foto-resto.webp' },
      { slug: 'toko', title: 'Toko & Kelontong', desc: 'Stok berkurang otomatis dan ada peringatan saat stok menipis.', image: '/images/site/foto-toko.webp' },
      { slug: 'warung', title: 'Warung & Usaha Kecil', desc: 'Catat belanja dan bon pelanggan dari HP Android.', image: '/images/site/foto-warung.webp' },
    ],
  },
};

export type HomeCopy = typeof id;
export const getHomeCopy = (locale: Locale): HomeCopy => pick<HomeCopy>({ id }, locale);
