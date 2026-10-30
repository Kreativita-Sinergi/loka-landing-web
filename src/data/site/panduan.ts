import { findGuide } from '@/data/guides';
import { pick, type Locale } from '@/data/localized';

/**
 * Panduan Pengguna (/panduan dan /panduan/[slug]).
 *
 * Tidak ada isi yang dikarang di sini:
 * - Grup "Mulai di sini" adalah lima alur harian kasir. Langkahnya diambil dari
 *   rekaman aplikasi versi 1.34.0 di tablet, layar aplikasi asli (screenshot),
 *   dan jawaban FAQ tentang shift, PIN, transaksi, dan struk.
 * - Panduan dengan `faq` menampilkan jawaban FAQ asli (dicocokkan lewat teks
 *   pertanyaannya), jadi selalu sama dengan halaman FAQ.
 * - Panduan fitur lainnya (intro/steps/tip) disusun dari layar aplikasi
 *   1.50.0: label tombol dan jalur menu diambil dari teks aplikasi (app_id.arb)
 *   dan layar yang memakainya, bukan dari ingatan.
 */

export type GuideStep = { title: string; body: string };

export type Guide = {
  slug: string;
  group: string;
  title: string;
  desc: string;
  /** Screenshot aplikasi asli di /public/images/site. */
  image?: { src: string; alt: string };
  /**
   * ID video YouTube (bagian setelah `v=`). Video panduan di-host di YouTube,
   * bukan di server situs. Selama kosong, halaman menampilkan screenshot.
   */
  youtubeId?: string;
  youtubePhoneId?: string;
  intro?: string;
  steps?: GuideStep[];
  tip?: string;
  /** Pertanyaan FAQ (teks persis) yang jawabannya menjadi isi panduan. */
  faq?: string[];
  /** Tautan lanjutan ke halaman lain di situs. */
  more?: { label: string; to: 'webAdmin' | 'harga' | 'faq' | 'download' };
};

const START = 'Mulai di sini';
const SETUP = 'Pengaturan';
const OWNER = 'Untuk pemilik';
const ORDERS = 'Pesanan & pembayaran';
const STOCK = 'Produk & stok';
const STAFF = 'Pegawai & absensi';
const TROUBLE = 'Mengatasi masalah';

function buildGuides(locale: Locale): Guide[] {
  void locale;
  const guides: Guide[] = [
    {
      slug: 'login',
      group: START,
      title: 'Login ke Aplikasi',
      desc: 'Masuk dengan email atau username dan password, pilih outlet, lalu sampai di beranda.',
      youtubeId: undefined,
      image: { src: '/images/site/app-beranda.webp', alt: 'Beranda aplikasi Loka Kasir setelah login' },
      intro:
        'Satu akun Loka dipakai di aplikasi kasir (Android dan Windows) maupun Web Admin. Akun dibuat sekali saat mendaftar, lewat browser atau dari dalam aplikasi.',
      steps: [
        { title: 'Buka aplikasi Loka Kasir', body: 'Pasang dari Google Play (Android) atau Microsoft Store (Windows), lalu buka aplikasinya di perangkat toko.' },
        { title: 'Masukkan email atau username dan password', body: 'Gunakan data akun yang Anda pakai saat mendaftar, lalu ketuk Masuk.' },
        { title: 'Pilih outlet', body: 'Kalau usaha Anda punya lebih dari satu cabang, pilih outlet tempat Anda bekerja hari ini.' },
        { title: 'Masuk ke beranda', body: 'Data toko tersinkron, lalu Anda sampai di beranda dan siap membuka kasir.' },
      ],
      tip: 'Kasir tidak perlu login email setiap hari. Setelah perangkat terikat ke terminal kasir, kasir cukup memasukkan PIN 4 digit untuk membuka sesi.',
    },
    {
      slug: 'buka-kasir',
      group: START,
      title: 'Buka Kasir & Mulai Shift',
      desc: 'Pilih kasir, isi modal awal di laci, lalu masukkan PIN untuk memulai shift.',
      youtubeId: undefined,
      image: { src: '/images/site/app-bukakasir.webp', alt: 'Jendela Persiapan Kasir: cabang, terminal, kasir, jadwal, dan modal awal' },
      intro:
        'Setiap kasir wajib membuka shift sebelum melayani pembeli. Shift mencatat semua transaksi selama jam kerja, sehingga uang di laci bisa dicocokkan saat tutup kasir.',
      steps: [
        { title: 'Ketuk Buka Kasir di beranda', body: 'Jendela Persiapan Kasir terbuka. Cabang dan terminal kasir sudah terisi sesuai perangkat ini.' },
        { title: 'Pilih kasir', body: 'Pilih nama karyawan yang bertugas. Jadwal kasir boleh dikosongkan.' },
        { title: 'Isi modal awal', body: 'Hitung uang tunai di laci sebelum mulai berjualan, ketik jumlahnya di keypad, lalu ketuk Pakai Nominal. Kosongkan bila laci memang kosong. Angka ini menjadi dasar perhitungan saat tutup shift.' },
        { title: 'Ketuk Buka Kasir dan masukkan PIN', body: 'Masukkan PIN 4 digit kasir. Shift berjalan dan halaman transaksi langsung siap dipakai.' },
      ],
      tip: 'Laporan harian bisa direkap per shift, jadi pemilik bisa membandingkan kasir A dan kasir B serta tahu kapan toko buka dan tutup.',
    },
    {
      slug: 'transaksi',
      group: START,
      title: 'Melayani Transaksi',
      desc: 'Pilih produk, tentukan makan di tempat atau bawa pulang, lalu selesaikan pembayaran.',
      youtubeId: undefined,
      image: { src: '/images/site/app-transaksi.webp', alt: 'Layar transaksi Loka Kasir' },
      intro: 'Satu transaksi biasanya selesai dalam 30 sampai 60 detik, dari memilih produk sampai struk tercetak.',
      steps: [
        { title: 'Pilih produk', body: 'Ketuk produk yang dibeli. Ketuk lagi untuk menambah jumlah, atau atur jumlah dan catatan di panel pesanan sebelah kanan.' },
        { title: 'Tentukan Makan di Tempat atau Bawa Pulang', body: 'Pilih jenis pesanan sesuai cara pembeli menikmati pesanannya, lalu ketuk Lanjutkan.' },
        { title: 'Pilih metode dan nominal bayar', body: 'Pilih Tunai, QRIS, atau Transfer Bank sesuai yang diaktifkan pemilik, lalu ketuk Bayar Pas atau nominal uang yang diterima.' },
        { title: 'Proses pembayaran', body: 'Kembalian dihitung otomatis. Struk bisa dicetak, dikirim ke email pembeli, atau dibagikan sebagai PDF.' },
      ],
      tip: 'Internet putus? Transaksi tetap bisa diproses dan tersimpan di perangkat, lalu tersinkron saat koneksi kembali. Pembayaran yang butuh verifikasi online (QRIS, kartu) tidak tersedia selama offline.',
    },
    {
      slug: 'riwayat-struk',
      group: START,
      title: 'Riwayat & Struk',
      desc: 'Buka kembali transaksi yang sudah selesai lengkap dengan struknya, siap dicetak ulang.',
      youtubeId: undefined,
      image: { src: '/images/site/app-riwayat.webp', alt: 'Layar riwayat penjualan Loka Kasir' },
      intro: 'Semua transaksi yang sudah selesai tersimpan di Riwayat Penjualan, lengkap dengan detail struknya.',
      steps: [
        { title: 'Buka Riwayat Penjualan', body: 'Pilih Riwayat Penjualan dari menu samping. Ringkasan omzet dan jumlah transaksi hari ini tampil di atas daftar.' },
        { title: 'Pilih transaksi', body: 'Ketuk transaksi yang ingin dilihat. Panel detail terbuka lengkap dengan struknya.' },
        { title: 'Cetak ulang struk', body: 'Ketuk Cetak Ulang Struk untuk mencetaknya lagi ke printer thermal.' },
      ],
      tip: 'Transaksi yang sudah lunas bisa di-refund: statusnya berubah menjadi refunded, stok dikembalikan, dan tercatat di laporan. Supaya refund wajib disetujui supervisor, nyalakan PIN Supervisor untuk Pembatalan di Pengaturan › Toko › Profil Toko.',
    },
    {
      slug: 'tutup-shift',
      group: START,
      title: 'Tutup Shift',
      desc: 'Hitung uang di laci, cocokkan dengan kas diharapkan, dan tutup shift.',
      youtubeId: undefined,
      image: { src: '/images/site/app-tutupkasir.webp', alt: 'Layar tutup kasir dengan ringkasan penjualan' },
      intro: 'Di akhir jam kerja, kasir menutup shift supaya uang di laci bisa dicocokkan dengan catatan sistem.',
      steps: [
        { title: 'Buka menu Shift', body: 'Ketuk tombol Shift di kanan atas, lalu pilih Tutup Kasir.' },
        { title: 'Masukkan uang di laci', body: 'Hitung semua uang tunai di laci, termasuk modal awal, lalu ketik jumlahnya. Penjualan tunai dan QRIS di sebelah kiri sudah terekap otomatis.' },
        { title: 'Periksa selisih', body: 'Sistem langsung menunjukkan apakah kas sesuai, kurang, atau lebih dari kas yang diharapkan.' },
        { title: 'Ketuk Tutup Kasir', body: 'Setelah dikonfirmasi, ringkasan shift tampil dan bisa dibagikan sebagai PDF, dicetak, atau disalin. Ringkasan ini juga masuk ke laporan pemilik di Web Admin.' },
      ],
    },
    {
      slug: 'tambah-produk',
      group: SETUP,
      title: 'Tambah Produk',
      desc: 'Cara menambah produk, kategori, dan variasi produk.',
      image: { src: '/images/site/app-produk.webp', alt: 'Layar daftar produk Loka Kasir' },
      faq: ['Bagaimana cara menambah produk ke dalam sistem?', 'Apa itu variasi produk dan bagaimana cara menggunakannya?', 'Bagaimana cara memantau stok yang hampir habis?'],
    },
    {
      slug: "barang-titipan",
      group: SETUP,
      title: "Tambah Barang Titipan",
      desc: "Pilih penitip, isi harga jual dan harga setor, lalu simpan barang titipan.",
      intro:
        'Barang titipan adalah barang milik orang lain yang Anda jualkan. Anda hanya membayar penitip untuk barang yang laku, sebesar harga setor.',
      steps: [
        { title: 'Daftarkan penitip', body: 'Buka Lainnya › Penitip Barang, pilih tab Penitip, lalu ketuk Tambah (di tablet: Tambah Penitip). Isi Nama penitip, Nomor telepon, dan Catatan bila perlu, lalu ketuk Simpan.' },
        { title: 'Buka form produk baru', body: 'Buka Lainnya › Produk, lalu ketuk + Produk. Isi Nama Produk dan Harga Jual (harga ke pembeli) di bagian Harga.' },
        { title: 'Nyalakan Barang titipan', body: 'Di bagian Lengkapi Produk (Opsional), nyalakan saklar Barang titipan, lalu pilih penitip di kolom Penitip barang. Untuk penitip baru, ketuk + Tambah di samping kolom itu.' },
        { title: 'Isi harga setor', body: 'Isi Harga setor ke penitip (per unit), yaitu nominal yang dibayar ke penitip setiap barang laku. Laba toko per unit langsung tampil di bawahnya.' },
        { title: 'Simpan', body: 'Isi jumlah stoknya, lalu ketuk Tambah Produk.' },
      ],
      tip: 'Kolom Harga Modal disembunyikan untuk barang titipan karena modalnya sama dengan harga setor. Menu Penitip Barang tersedia di paket Pro.',
    },
    {
      slug: "pesanan-berjalan",
      group: ORDERS,
      title: "Kelola Pesanan Berjalan",
      desc: "Simpan keranjang, lanjutkan pesanan, dan tagih pelanggan.",
      intro:
        'Pesanan Berjalan menyimpan pesanan yang sudah pasti tapi belum dibayar. Item masih bisa ditambah, dan tagihannya dibayar nanti saat pesanan diambil atau tamu pulang.',
      steps: [
        { title: 'Nyalakan menu Pesanan Berjalan', body: 'Buka Lainnya › Pengaturan › Toko › Tampilan Menu, lalu nyalakan Pesanan Berjalan. Di rumah makan, menu ini biasanya sudah menyala.' },
        { title: 'Simpan keranjang sebagai pesanan', body: 'Di tab Kasir, pilih produk, buka keranjang, lalu ketuk Simpan Pesanan. Isi Nama pemesan agar mudah dikenali, lalu ketuk Simpan Pesanan.' },
        { title: 'Buka daftar Pesanan Berjalan', body: 'Ketuk tab Pesanan di bilah bawah, atau buka Lainnya › Pesanan Berjalan. Cari pesanan lewat kolom "Cari nomor nota, nama, atau meja".' },
        { title: 'Tambah atau ubah isi pesanan', body: 'Ketuk Tambah Item untuk menambah menu ke pesanan itu, lalu ketuk Tambah di layar Kasir. Untuk mengurangi atau menghapus barang yang salah, ketuk ⋮ › Ubah.' },
        { title: 'Tagih pelanggan', body: 'Saat pelanggan siap membayar, ketuk Bayar di kartu pesanannya, lalu selesaikan pembayaran seperti biasa.' },
      ],
      tip: 'Tombol Tahan di keranjang hanya menahan keranjang di perangkat ini (dibuka lagi lewat tombol Ditahan). Pakai Simpan Pesanan bila pesanan perlu dilihat dan ditagih dari perangkat kasir lain.',
    },
    {
      slug: "pesanan-meja",
      group: ORDERS,
      title: "Pesanan Meja",
      desc: "Pilih meja, simpan pesanan, pantau pesanan meja, dan tagih pelanggan.",
      intro:
        'Untuk rumah makan atau kafe bermeja: catat pesanan ke meja tamu, pantau meja mana yang terisi, lalu tagih saat tamu selesai.',
      steps: [
        { title: 'Aktifkan meja dan daftarkan mejanya', body: 'Di Lainnya › Pengaturan › Toko › Profil Toko, nyalakan Manajemen Meja di bagian FITUR OUTLET, lalu simpan. Tambahkan meja lewat Lainnya › Daftar Meja › Tambah Meja.' },
        { title: 'Pilih Makan di Tempat, lalu pilih meja', body: 'Di tab Kasir, pilih produk, pilih Makan di Tempat, lalu ketuk Lanjutkan. Di layar Detail Pesanan, ketuk Pilih meja (opsional) dan pilih meja yang kosong.' },
        { title: 'Simpan pesanan meja', body: 'Ketuk Simpan Pesanan, isi Nama pemesan, lalu ketuk Simpan Pesanan. Kalau meja masih punya pesanan yang belum dibayar, pilih Lihat Pesanan untuk menambah ke tagihan lama, atau Buat Baru untuk tamu lain.' },
        { title: 'Pantau meja', body: 'Buka Lainnya › Daftar Meja. Status meja tampil sebagai Tersedia, Terisi, atau Dipesan. Ketuk meja yang Terisi untuk melihat nota dan isinya.' },
        { title: 'Tagih, lalu kosongkan meja', body: 'Di rincian meja, ketuk Bayar pada nota yang Belum lunas. Setelah semua lunas, ketuk Kosongkan meja agar meja kembali Tersedia.' },
      ],
      tip: 'Tamu pergi tapi belum membayar? Ketuk Lepas meja, tagihan tetap. Mejanya dikosongkan, sedangkan tagihannya tetap ada di Pesanan Berjalan dan bisa ditagih kapan saja.',
    },
    {
      slug: "pisah-struk",
      group: ORDERS,
      title: "Pisah Struk & Bayar Terpisah",
      desc: "Pisahkan item per tamu dan bayar bagian pesanan.",
      intro:
        'Satu meja ingin bayar sendiri-sendiri? Pisahkan item per tamu, tagih bagian tamu itu, dan sisanya tetap tercatat untuk dibayar berikutnya.',
      steps: [
        { title: 'Masukkan semua pesanan ke keranjang', body: 'Di tab Kasir, masukkan seluruh pesanan rombongan, buka keranjang, lalu ketuk Pisah (di sebelah Tahan).' },
        { title: 'Pilih bagian tamu pertama', body: 'Di jendela Pisah Tagihan, pilih item dan jumlah yang dibayar tamu ini, ketuk Pisahkan, lalu bayar seperti biasa.' },
        { title: 'Tagih sisanya', body: 'Setelah lunas, kartu "Sisa tagihan belum dibayar" muncul di layar Kasir. Ketuk Lanjutkan untuk menagih sisanya, atau Pisah lagi untuk tamu berikutnya.' },
        { title: 'Untuk pesanan yang sudah disimpan', body: 'Untuk pesanan di Pesanan Berjalan, ketuk ⋮ › Pisah di kartunya. Pilih item tamu ini di jendela Bayar Terpisah, lalu ketuk Pisahkan & Bayar.' },
      ],
      tip: 'Kalau keranjang sedang berisi pesanan lain, tombol di kartu sisa tagihan berubah jadi Gabungkan, yang menyatukan sisa tagihan dengan isi keranjang.',
    },
    {
      slug: 'printer-thermal',
      group: SETUP,
      title: 'Printer Thermal',
      desc: 'Mencetak struk lewat printer thermal Bluetooth atau USB.',
      faq: ['Apakah bisa mencetak struk ke printer thermal?', 'Di perangkat apa saja App Kasir bisa dijalankan?'],
      more: { label: 'Download aplikasi kasir', to: 'download' },
    },
    {
      slug: 'karyawan-pin',
      group: SETUP,
      title: 'Karyawan & PIN',
      desc: 'Menambah karyawan, memberi peran, dan memakai PIN supervisor.',
      faq: ['Bagaimana cara menambah karyawan baru?', 'Apa saja peran (role) yang tersedia dan apa bedanya?', 'Apa itu Supervisor Override dan kapan digunakan?'],
    },
    {
      slug: 'meja-layar-dapur',
      group: SETUP,
      title: 'Meja & Layar Dapur',
      desc: 'Alur pesanan resto dan kafe dari meja sampai dapur.',
      image: { src: '/images/site/app-dapur.webp', alt: 'Layar pesanan berjalan dengan status dapur' },
      faq: ['Bagaimana alur order untuk restoran dan kafe (FNB)?'],
    },
    {
      slug: 'web-admin',
      group: OWNER,
      title: 'Web Admin',
      desc: 'Bedanya aplikasi kasir dan Web Admin untuk pemilik.',
      faq: ['Apa bedanya App Kasir dan Web Admin Loka Kasir?', 'Bagaimana cara mengatur hak akses secara granular per karyawan?'],
      more: { label: 'Lihat halaman Web Admin', to: 'webAdmin' },
    },
    {
      slug: 'laporan-ekspor',
      group: OWNER,
      title: 'Laporan & Ekspor',
      desc: 'Laporan yang tersedia, filter per outlet, dan ekspor data.',
      image: { src: '/images/site/app-jamramai.webp', alt: 'Layar analisis jam ramai' },
      faq: ['Laporan apa saja yang tersedia di Loka Kasir?', 'Apakah laporan bisa difilter per outlet atau cabang?', 'Bisakah laporan diekspor ke Excel atau PDF?'],
    },
    {
      slug: 'paket-pembayaran',
      group: OWNER,
      title: 'Paket & Pembayaran',
      desc: 'Masa percobaan, batas outlet, dan biaya langganan.',
      faq: ['Apakah ada masa percobaan gratis?', 'Berapa banyak outlet dan pengguna yang bisa ditambahkan?', 'Apakah ada biaya tambahan di luar harga langganan?'],
      more: { label: 'Lihat halaman Harga', to: 'harga' },
    },
    {
      slug: 'bahan-baku-stok-masuk',
      group: STOCK,
      title: 'Bahan Baku & Stok Masuk',
      desc: 'Catat bahan baku dan stok yang masuk.',
      intro:
        'Catat bahan seperti gula, kopi, atau susu, lalu catat setiap pembelian lewat Stok masuk. Dari situ Loka menghitung HPP rata-rata, dan stok bahan berkurang sendiri saat produk yang memakai resepnya terjual.',
      steps: [
        { title: 'Buka Bahan Baku', body: 'Buka Lainnya › Pembelian & Stok, lalu di kelompok Harga & bahan ketuk Bahan Baku.' },
        { title: 'Tambah bahan', body: 'Ketuk Tambah (di tablet: Tambah Bahan). Isi Nama bahan, SKU, Satuan, dan Stok minimum, lalu ketuk Simpan.' },
        { title: 'Pilih Stok masuk', body: 'Ketuk baris bahan, lalu pilih Stok masuk. Di tablet tombol Stok masuk juga ada langsung di setiap baris.' },
        { title: 'Isi jumlah dan harga beli', body: 'Di jendela Stok Masuk, isi Jumlah masuk, Harga beli per satuan, dan Catatan bila perlu (misalnya "beli di pasar, nota #12"). Lalu ketuk Tambah Stok.' },
      ],
      tip: 'Satuan bahan tidak bisa diganti setelah disimpan, jadi pilih satuan yang paling sering Anda pakai saat membeli.',
    },
    {
      slug: 'paket-resep',
      group: STOCK,
      title: 'Paket Produk & Resep Bahan Baku',
      desc: 'Pasang resep bahan baku di produk, lalu gabungkan produk menjadi paket.',
      intro:
        'Resep bahan baku dipasang di setiap produk, sehingga bahan berkurang otomatis saat produk itu terjual. Paket menggabungkan beberapa produk dengan satu harga, dan stok setiap produk isinya ikut berkurang saat paket terjual.',
      steps: [
        { title: 'Siapkan bahan baku', body: 'Buka Lainnya › Pembelian & Stok › Bahan Baku, lalu ketuk Tambah (di tablet: Tambah Bahan).' },
        { title: 'Pasang resep di produk', body: 'Buka Lainnya › Produk, ketuk produknya, lalu pilih Edit. Di bagian Resep / Komposisi, ketuk Tambah bahan, isi jumlah per bahan, lalu ketuk Simpan resep. Resep hanya bisa diatur untuk produk yang sudah tersimpan dan tidak bervarian.' },
        { title: 'Buat paket', body: 'Buka Lainnya › Produk, pilih tab Paket, lalu ketuk Tambah Paket. Isi Nama paket, cari produk untuk dimasukkan, dan atur jumlahnya dengan − / +. Produk bervarian tampil per varian (misalnya Kaos · L). Dari Rapor Toko, Anda juga bisa mengetuk Buat paket pada saran "Jadikan paket" sehingga isinya sudah terisi.' },
        { title: 'Isi harga, lalu simpan', body: 'Isi Harga jual paket. Di bawahnya tampil harga kalau dibeli satuan, hemat pembeli, serta modal dan untungnya. Ketuk Simpan. Paket muncul di Kasir di kategori Paket.' },
      ],
      tip: 'Paket sendiri tidak punya resep. Kalau ingin bahan baku berkurang saat paket terjual, buat paket itu sebagai produk biasa dengan resep berisi semua bahannya.',
    },
    {
      slug: 'harga-modal',
      group: STOCK,
      title: 'Mengisi Harga Modal Produk',
      desc: 'Isi harga modal supaya laba terhitung.',
      intro:
        'Harga modal dipakai untuk menghitung laba. Selama produk belum punya harga modal, labanya belum terhitung di beranda dan laporan.',
      steps: [
        { title: 'Untuk satu produk', body: 'Buka Lainnya › Produk, ketuk produknya, lalu pilih Edit. Isi Harga Modal di bagian Harga, lalu ketuk Simpan Perubahan.' },
        { title: 'Untuk banyak produk sekaligus', body: 'Buka Lainnya › Pembelian & Stok › Harga Modal (khusus pemilik). Cara lain: ketuk tulisan "… produk belum punya harga modal" di kartu omzet Beranda.' },
        { title: 'Isi dan simpan', body: 'Daftar berisi produk yang belum punya harga modal. Ketik modalnya di samping harga jual, lalu ketuk Simpan [n] harga modal.' },
      ],
      tip: 'Isi dulu yang Anda tahu. Baris yang dibiarkan kosong tidak disimpan sebagai nol, jadi labanya tidak tercatat salah.',
    },
    {
      slug: 'stok-opname',
      group: STOCK,
      title: 'Menghitung dan Posting Stok Opname',
      desc: 'Hitung stok fisik lalu posting hasil stok opname.',
      intro:
        'Stok opname mencocokkan stok di sistem dengan barang yang benar-benar ada di rak. Hitung fisiknya, lalu posting selisihnya supaya stok di Loka kembali tepat.',
      steps: [
        { title: 'Buka Stok Opname', body: 'Buka Lainnya › Pembelian & Stok › Stok Opname.' },
        { title: 'Mulai sesi', body: 'Ketuk Mulai (di tablet: Mulai Opname). Pilih Seluruh barang, atau Satu kategori lalu pilih kategorinya.' },
        { title: 'Hitung setiap barang', body: 'Ketuk barang di tab Belum dihitung, isi Jumlah fisik, lalu ketuk Simpan. Anda juga bisa memakai Pindai barcode untuk mencari barang.' },
        { title: 'Simpan hitungan', body: 'Ketuk tombol "… hitungan belum tersimpan" di bawah sampai semua hitungan terkirim.' },
        { title: 'Posting selisih', body: 'Ketuk Posting Selisih, lalu konfirmasi dengan Posting Selisih. Stok langsung disesuaikan, dan langkah ini tidak bisa dibatalkan.' },
      ],
      tip: 'Tombol Posting Selisih baru aktif setelah semua hitungan tersimpan. Kalau ingin membuang sesi tanpa mengubah stok, pilih Batalkan sesi.',
    },
    {
      slug: 'impor-produk-csv',
      group: STOCK,
      title: 'Impor Banyak Produk dari CSV',
      desc: 'Masukkan banyak produk sekaligus dari file CSV.',
      intro:
        'Masukkan puluhan produk sekaligus dari file CSV, misalnya hasil ekspor spreadsheet. Setiap baris ditinjau dulu sebelum disimpan.',
      steps: [
        { title: 'Buka menu impor', body: 'Buka Lainnya › Produk, ketuk tombol ⋮ (Aksi lainnya), lalu pilih Impor Produk.' },
        { title: 'Siapkan file CSV', body: 'Ketuk Unduh Template CSV dan isi sesuai kolomnya. Kolom product_name dan base_price wajib ada.' },
        { title: 'Pilih file', body: 'Ketuk Pilih Berkas CSV dan pilih file berakhiran .csv. Aplikasi lalu memeriksa isinya.' },
        { title: 'Tinjau lalu impor', body: 'Di layar Tinjau Impor, perhatikan bagian Gagal, Duplikat di dalam berkas, Sudah ada di daftar produk, dan Siap diimpor. Lalu ketuk Impor [n] produk.' },
      ],
      tip: 'Di template, base_price adalah harga modal dan sell_price adalah harga jual. Impor juga bisa dilakukan dari Web Admin: Produk › Daftar Produk › Impor dari CSV.',
    },
    {
      slug: 'retur-titipan',
      group: STOCK,
      title: 'Retur Barang Titipan',
      desc: 'Kembalikan barang titipan kepada penitip.',
      intro:
        'Kembalikan barang titipan yang tidak laku atau rusak kepada penitipnya. Stoknya keluar dari outlet, dan Anda bisa langsung membagikan bukti retur.',
      steps: [
        { title: 'Buka tab Retur', body: 'Buka Lainnya › Penitip Barang › tab Retur, lalu ketuk Retur (di tablet: Buat Retur).' },
        { title: 'Pilih penitip', body: 'Di jendela Buat Retur ke Penitip, pilih nama di kolom Penitip barang. Yang muncul hanya barang titipannya yang masih ada stok di outlet ini.' },
        { title: 'Isi jumlah yang dikembalikan', body: 'Di bagian Barang yang dikembalikan, isi jumlah per barang atau ketuk Semua stok. Tambahkan Catatan bila perlu, misalnya alasan retur atau kondisi barang.' },
        { title: 'Simpan retur', body: 'Ketuk Retur [jumlah] barang. Setelah muncul Retur tersimpan, pilih Bagikan bukti untuk mengirim atau mencetak bukti retur, atau Nanti.' },
      ],
      tip: 'Retur juga bisa dimulai dari tab Penitip: ketuk nama penitip, lalu Retur barang.',
    },
    {
      slug: 'setoran-penitip',
      group: STOCK,
      title: 'Setoran Penjualan kepada Penitip',
      desc: 'Setorkan hasil penjualan barang titipan kepada penitip.',
      intro:
        'Serahkan hasil penjualan barang titipan kepada penitip dan simpan buktinya. Aplikasi menghitung berapa yang masih harus Anda bayar ke setiap penitip.',
      steps: [
        { title: 'Buka tab Settlement', body: 'Buka Lainnya › Penitip Barang › tab Settlement. Bagian Belum dibayar berisi penitip yang masih punya kewajiban beserta nominalnya.' },
        { title: 'Pilih penitip', body: 'Ketuk nama penitip. Panel Serahkan uang ke [nama] terbuka dan menampilkan kewajiban saat ini.' },
        { title: 'Isi nominal', body: 'Isi Nominal diserahkan, atau ketuk Semua / Setengah. Tulis caranya di Catatan, misalnya "tunai" atau "transfer BCA".' },
        { title: 'Serahkan dan bagikan struk', body: 'Ketuk Serahkan [nominal]. Setelah muncul Uang diserahkan, pilih Bagikan struk atau Nanti. Penyerahan sebelumnya bisa dilihat lewat tombol Riwayat.' },
      ],
      tip: 'Hak penitip dihitung dari nota lunas: jumlah terjual × harga setor. Nota yang batal dan direfund tidak ikut dihitung.',
    },
    {
      slug: 'kasbon',
      group: ORDERS,
      title: 'Mencatat dan Melunasi Kasbon',
      desc: 'Catat pembelian kasbon dan lunasi kemudian.',
      intro:
        'Kasbon mencatat belanja yang dibayar nanti, atau baru dibayar sebagian, atas nama pelanggan. Sisa utangnya bisa dilunasi kapan saja dan direkap per pelanggan.',
      steps: [
        { title: 'Izinkan kasbon', body: 'Buka Lainnya › Pengaturan › Penjualan › Transaksi & Pembayaran. Di bagian KASBON / BAYAR SEBAGIAN, nyalakan Izinkan Bayar Sebagian, lalu ketuk Simpan.' },
        { title: 'Catat transaksi sebagai kasbon', body: 'Di layar pembayaran, kalau pelanggan baru membayar sebagian atau belum membayar sama sekali, ketuk tombol Kasbon di sebelah tombol bayar.' },
        { title: 'Isi nama pelanggan dan konfirmasi', body: 'Kasbon harus atas nama pelanggan. Kalau pelanggan belum dipilih, isi datanya di jendela "Kasbon atas nama siapa?", lalu ketuk Lanjutkan kasbon. Periksa sisanya di "Catat sebagai kasbon?", lalu ketuk Konfirmasi Kasbon.' },
        { title: 'Lunasi per nota', body: 'Buka tab Riwayat, pilih tab Belum Lunas, ketuk ⋮ pada nota, lalu pilih Lunasi. Pilih metode bayar, isi jumlah yang diterima, lalu bayar.' },
        { title: 'Atau terima bayar sekaligus per pelanggan', body: 'Buka Lainnya › Pelanggan & Bon › Rekap Kasbon, ketuk nama pelanggan, lalu ketuk Terima bayar. Isi Nominal dibayar (atau ketuk Lunas semua) dan pilih Metode bayar.' },
      ],
      tip: 'Di menu ⋮ pada nota kasbon ada Ingatkan via WhatsApp. Di buku bon pelanggan ada Atur syarat bon untuk memasang batas bon dan tanggal tagih.',
    },
    {
      slug: 'pembatalan-refund',
      group: ORDERS,
      title: 'Pembatalan Transaksi dan Refund',
      desc: 'Batalkan transaksi atau kembalikan pembayaran pelanggan.',
      intro:
        'Nota yang belum lunas bisa dibatalkan, dan transaksi yang sudah lunas bisa dikembalikan dananya. Semuanya dilakukan dari Riwayat dan tercatat di tab Batal/Refund.',
      steps: [
        { title: 'Temukan transaksinya', body: 'Buka tab Riwayat. Cari lewat kolom Cari transaksi, atau ubah tanggal lewat ikon kalender.' },
        { title: 'Buka menu aksi nota', body: 'Ketuk ⋮ di baris transaksi, atau tekan lama barisnya. Menu yang sama juga ada di ⋮ pada layar detail transaksi.' },
        { title: 'Pilih Kembalikan Dana atau Batalkan Transaksi', body: 'Transaksi yang sudah lunas memakai Kembalikan Dana. Nota yang belum lunas atau kasbon memakai Batalkan Transaksi.' },
        { title: 'Isi alasan dan konfirmasi', body: 'Isi alasannya di Catatan (Opsional), lalu ketuk tombol merah Kembalikan Dana atau Batalkan Transaksi. Transaksinya pindah ke tab Batal/Refund.' },
      ],
      tip: 'Supaya kasir tidak bisa membatalkan sendiri, nyalakan PIN Supervisor untuk Pembatalan di Lainnya › Pengaturan › Toko › Profil Toko (bagian FITUR OUTLET).',
    },
    {
      slug: 'member-pelanggan',
      group: ORDERS,
      title: 'Menambahkan Member Pelanggan',
      desc: 'Daftarkan pelanggan sebagai member.',
      intro:
        'Pelanggan bertanda Member otomatis mendapat harga member dan diskon "Khusus member". Anda bisa mendaftarkannya dari daftar pelanggan atau langsung saat transaksi.',
      steps: [
        { title: 'Buka Daftar Pelanggan', body: 'Buka Lainnya › Pelanggan & Bon › Daftar Pelanggan.' },
        { title: 'Tambah pelanggan baru', body: 'Ketuk Tambah, lalu isi Nama dan Nomor HP. Nomor HP wajib diisi untuk pelanggan baru.' },
        { title: 'Nyalakan Member, lalu simpan', body: 'Di formulir yang sama, nyalakan Member, lalu ketuk Simpan. Untuk pelanggan yang sudah ada: ketuk namanya, ketuk Ubah, nyalakan Member, lalu ketuk Simpan.' },
        { title: 'Atau jadikan member saat transaksi', body: 'Di keranjang, ketuk Pelanggan › Pilih pelanggan terdaftar, lalu ketuk Jadikan member di bawah namanya. Harga member langsung berlaku di nota itu.' },
        { title: 'Berikan kartu member', body: 'Di detail pelanggan, ketuk Kartu member. Tunjukkan QR-nya ke pelanggan, atau simpan lalu bagikan gambarnya.' },
      ],
      tip: 'Kalau sakelar Member atau tombol Jadikan member tidak muncul untuk kasir, beri izin menandai member pada perannya di Lainnya › Tim › tab Karyawan › ikon Peran & Hak Akses (kanan atas).',
    },
    {
      slug: 'diskon',
      group: SETUP,
      title: 'Menambahkan Diskon',
      desc: 'Buat diskon untuk produk atau transaksi.',
      intro:
        'Buat promo potongan dalam persen atau rupiah, untuk seluruh nota atau untuk kategori, produk, maupun varian tertentu.',
      steps: [
        { title: 'Buka tab Diskon', body: 'Buka Lainnya › Produk, pilih tab Diskon, lalu ketuk + Diskon (di tablet: Tambah Diskon).' },
        { title: 'Isi nama dan besar potongan', body: 'Isi Nama diskon, misalnya "Promo Gajian". Pilih Persen (%) atau Rp, lalu isi Besar potongan.' },
        { title: 'Tentukan cakupan', body: 'Di Berlaku untuk, pilih Seluruh nota, Per kategori, Per produk, atau Per varian, lalu pilih targetnya. Bila perlu, isi Minimum belanja serta tanggal Mulai dan Selesai.' },
        { title: 'Atur aturan, lalu simpan', body: 'Di bagian Aturan, atur Dipotong otomatis, Bisa digabung diskon lain, Khusus member, dan Aktif. Lalu ketuk Simpan.' },
      ],
      tip: 'Matikan Dipotong otomatis bila Anda ingin kasir yang memilih diskonnya di layar bayar. Di Web Admin, diskon ada di Produk › Diskon.',
    },
    {
      slug: 'pajak',
      group: SETUP,
      title: 'Menambahkan Pajak',
      desc: 'Atur pajak yang dikenakan pada transaksi.',
      intro:
        'Atur PPN, PB1, atau pajak lain yang ditambahkan ke nota. Aktifkan hanya bila usaha Anda memang memungutnya.',
      steps: [
        { title: 'Buka menu Pajak', body: 'Buka Lainnya › Pengaturan › Penjualan › Pajak, lalu ketuk Tambah (di tablet: Tambah Pajak).' },
        { title: 'Isi nama dan besaran', body: 'Isi Nama pajak, misalnya "PB1" atau "PPN". Pilih Persen (%) atau Rp, lalu isi Besaran, misalnya 11.' },
        { title: 'Tentukan cakupan, lalu simpan', body: 'Biarkan Berlaku untuk semua produk menyala agar pajak dikenakan ke semua produk. Pastikan Aktif menyala, lalu ketuk Simpan.' },
        { title: 'Pajak untuk produk tertentu (opsional)', body: 'Matikan Berlaku untuk semua produk. Lalu buka produknya (Lainnya › Produk › ketuk produk › Edit) dan pilih pajaknya di kolom Pajak, bagian Pengaturan Lain.' },
      ],
      tip: 'Pajak bisa dibuat langsung dari form produk lewat + Tambah di samping kolom Pajak.',
    },
    {
      slug: 'cetak-otomatis-laci',
      group: SETUP,
      title: 'Mengatur Cetak Otomatis dan Laci Uang',
      desc: 'Atur struk tercetak otomatis dan laci uang terbuka.',
      intro:
        'Supaya kasir tidak perlu menekan Cetak setiap kali selesai bayar, struk bisa langsung tercetak dan laci uang langsung terbuka begitu pembayaran berhasil.',
      steps: [
        { title: 'Pastikan printer sudah dipilih', body: 'Buka Lainnya › Pengaturan › Struk & Dokumen › Printer Struk, lalu ketuk Pilih Printer dan Tes Cetak. Tanpa printer tersimpan, cetak otomatis tidak akan berjalan.' },
        { title: 'Nyalakan Cetak Struk Otomatis', body: 'Kembali ke Pengaturan › Struk & Dokumen, lalu nyalakan saklar Cetak Struk Otomatis ("Langsung cetak setelah pembayaran").' },
        { title: 'Atur Laci Uang', body: 'Di kelompok yang sama, nyalakan atau matikan saklar Laci Uang ("Buka otomatis saat pembayaran"). Laci dibuka lewat printer, jadi laci harus tersambung ke printer struk.' },
        { title: 'Coba satu transaksi', body: 'Selesaikan satu pembayaran di Kasir. Struk akan langsung tercetak dan laci terbuka setelah struk berhasil dicetak.' },
      ],
      tip: 'Kedua saklar ini tersimpan di masing-masing perangkat, jadi atur ulang di setiap HP atau tablet kasir. Di aplikasi Windows, laci dibuka oleh driver printer.',
    },
    {
      slug: 'profil-fitur-toko',
      group: SETUP,
      title: 'Mengatur Profil dan Fitur Toko',
      desc: 'Lengkapi profil toko dan pilih fitur yang dipakai.',
      intro:
        'Profil toko berisi nama, alamat, dan nomor telepon yang tercetak di struk. Di halaman yang sama, Anda juga memilih fitur outlet yang dipakai, seperti meja, layar dapur, dan pesanan dari HP pelanggan. Dilakukan oleh pemilik atau manajer.',
      steps: [
        { title: 'Buka Profil Toko', body: 'Buka Lainnya › Pengaturan › Toko › Profil Toko. Pengaturan di sini berlaku untuk semua perangkat dan kasir toko ini.' },
        { title: 'Lengkapi INFO OUTLET', body: 'Isi Nama Toko, Alamat, dan No. Telepon. Ketiganya tercetak di struk. Saklar Toko Aktif menandai outlet masih beroperasi.' },
        { title: 'Pilih fitur di FITUR OUTLET', body: 'Nyalakan yang dipakai: Manajemen Meja, Layar Dapur, PIN Supervisor untuk Pembatalan, Tutup kasir tanpa melihat nominal, dan Konfirmasi Terima Pesanan (F&B). Pilihan yang muncul menyesuaikan jenis usaha dan paket.' },
        { title: 'Simpan', body: 'Ketuk Simpan Perubahan di bagian bawah layar. Untuk paket Pro, bagian PESANAN DARI HP PELANGGAN juga tersedia, berisi Pesan via QR Meja dan Terima Pesan Online.' },
        { title: 'Atau atur dari Web Admin', body: 'Di app.lokakasir.id, buka Semua Pengaturan › Pengaturan Toko, ketuk Ubah pada outlet, lalu atur bagian Fitur Outlet di jendela Edit Outlet dan klik Simpan.' },
      ],
      tip: 'Logo toko tidak diatur di sini, tetapi di Pengaturan › Struk & Dokumen › Struk.',
    },
    {
      slug: 'pengaturan-transaksi',
      group: SETUP,
      title: 'Mengatur Transaksi dan Pembayaran',
      desc: 'Atur alur transaksi dan metode pembayaran.',
      intro:
        'Di sini Anda mengatur aturan uang di setiap transaksi: biaya layanan, pembulatan, kasbon, ongkir, nomor antrean, dan pembayaran QRIS. Dilakukan oleh pemilik atau manajer.',
      steps: [
        { title: 'Buka Transaksi & Pembayaran', body: 'Buka Lainnya › Pengaturan › Penjualan › Transaksi & Pembayaran.' },
        { title: 'Atur biaya dan pembulatan', body: 'Di BIAYA PELAYANAN, nyalakan Aktifkan Biaya Pelayanan lalu pilih Persen (%) atau Nominal Tetap. Di PEMBULATAN TUNAI, nyalakan Aktifkan Pembulatan dan pilih pecahan uang terkecil.' },
        { title: 'Atur kasbon, antar pesanan, dan antrean', body: 'Nyalakan Izinkan Bayar Sebagian (KASBON / BAYAR SEBAGIAN) dan Toko mengantar sendiri (ANTAR PESANAN) bila perlu. Untuk jenis usaha tertentu, tersedia juga Aktifkan Nomor Antrian.' },
        { title: 'Siapkan QRIS', body: 'Di bagian QRIS, nyalakan Terima Pembayaran QRIS, ketuk Unggah QRIS untuk memasang foto QRIS cetak Anda, lalu atur Tampilkan QRIS di Struk atau Konfirmasi Otomatis sesuai kebutuhan.' },
        { title: 'Simpan', body: 'Ketuk Simpan Perubahan. Pengaturan langsung berlaku untuk semua kasir di toko ini.' },
      ],
      tip: 'Persentase pajak (PPN, PB1) diatur terpisah di Pengaturan › Penjualan › Pajak.',
    },
    {
      slug: 'tampilan-struk',
      group: SETUP,
      title: 'Mengatur Tampilan Struk',
      desc: 'Sesuaikan isi dan tampilan struk.',
      intro:
        'Atur rupa struk yang keluar dari printer: ukuran kertas, logo, info media sosial, persentase pajak, serta teks di atas dan bawah struk.',
      steps: [
        { title: 'Buka pengaturan Struk', body: 'Buka Lainnya › Pengaturan › Struk & Dokumen › Struk. Di ponsel, pindah antara tab Pratinjau dan Pengaturan untuk melihat hasilnya.' },
        { title: 'Pilih ukuran kertas', body: 'Di UKURAN KERTAS, pilih 58 mm atau 80 mm sesuai printer Anda.' },
        { title: 'Atur logo dan sosial media', body: 'Di TAMPILAN, nyalakan Tampilkan Logo, ketuk Unggah Logo, lalu pilih Ukuran logo di struk (Kecil, Sedang, atau Besar). Nyalakan Tampilkan Info Sosial Media dan isi Instagram Handle bila perlu.' },
        { title: 'Isi pajak dan teks tambahan', body: 'Nyalakan Tampilkan Persentase Pajak bila perlu, lalu isi Teks Header (opsional) dan Teks Footer (opsional), misalnya ucapan terima kasih.' },
        { title: 'Tes Cetak lalu simpan', body: 'Ketuk Tes Cetak untuk melihat hasilnya di kertas (perubahan disimpan lebih dulu), atau ketuk Simpan.' },
      ],
      tip: 'Nama toko, alamat, dan telepon di struk diubah lewat Pengaturan › Toko › Profil Toko, bukan di halaman Struk.',
    },
    {
      slug: 'tampilkan-menu',
      group: SETUP,
      title: 'Menampilkan dan Menyembunyikan Menu',
      desc: 'Pilih menu yang tampil di aplikasi.',
      intro:
        'Sembunyikan menu yang jarang dipakai supaya navigasi kasir lebih ringkas. Fitur dan datanya tetap aman.',
      steps: [
        { title: 'Buka Tampilan Menu', body: 'Buka Lainnya › Pengaturan › Toko › Tampilan Menu. Baris ini hanya muncul untuk pemilik atau manajer yang boleh mengubah pengaturan.' },
        { title: 'Nyalakan atau matikan menu', body: 'Di jendela Tampilan Menu, geser saklar setiap menu. Beranda, Kasir, Riwayat, dan Pengaturan selalu tampil dan tidak ada di daftar.' },
        { title: 'Simpan', body: 'Ketuk Simpan. Susunan menu berlaku untuk semua perangkat di outlet ini.' },
        { title: 'Atur tab bawah di ponsel (opsional)', body: 'Di ponsel, buka Pengaturan › Tampilan › Tab Bawah untuk memilih layar kerja yang tampil di bilah bawah, lalu ketuk Simpan. Pilihan ini hanya berlaku di HP tersebut.' },
      ],
      tip: 'Menyembunyikan menu Dapur berarti dapur dimatikan: pesanan tidak lagi lewat antrean dapur.',
    },
    {
      slug: 'absensi',
      group: STAFF,
      title: 'Absensi Masuk & Pulang',
      desc: 'Pegawai mencatat absensi masuk dan pulang.',
      intro:
        'Karyawan absen masuk dan pulang dari perangkat kasir dengan PIN masing-masing, jadi tidak perlu aplikasi absensi terpisah. Jamnya tercatat otomatis dan menjadi dasar slip gaji.',
      steps: [
        { title: 'Buka Kehadiran', body: 'Di Beranda ketuk Kehadiran, atau buka Lainnya › Tim lalu pilih tab Kehadiran.' },
        { title: 'Pilih kartu karyawan', body: 'Cari nama Anda di papan, lalu ketuk Absen Masuk. Saat pulang, ketuk Absen Pulang di kartu yang sama.' },
        { title: 'Masukkan PIN', body: 'Ketik PIN 4 digit Anda. Setelah itu kamera depan terbuka untuk foto bukti.' },
        { title: 'Cek hasilnya', body: 'Kartu berubah menunjukkan jam masuk atau pulang. Untuk melihat catatan sebelumnya, ketuk Riwayat di pengalih Papan | Riwayat.' },
      ],
      tip: 'Karyawan baru muncul di papan setelah punya PIN. Foto absen hanya disimpan di HP tempat absen dilakukan, tidak dikirim ke server.',
    },
    {
      slug: 'lokasi-absensi',
      group: STAFF,
      title: 'Mengatur Lokasi Absensi',
      desc: 'Tentukan lokasi tempat pegawai boleh absen.',
      intro:
        'Dengan lokasi absensi aktif, karyawan hanya bisa absen bila berada dalam radius tertentu dari titik outlet. Titik ditandai dari ponsel saat Anda berdiri di toko, bukan dipilih dari peta.',
      steps: [
        { title: 'Buka Absensi & Jam Kerja', body: 'Buka Lainnya › Tim, pilih tab Kehadiran, lalu ketuk ikon setelan di kanan atas.' },
        { title: 'Tandai titik outlet', body: 'Berdirilah di dalam toko. Di bagian TITIK OUTLET, ketuk Tandai di Sini pada outlet tersebut. Pakai Tandai Ulang bila titiknya meleset.' },
        { title: 'Nyalakan wajib absen di dekat toko', body: 'Aktifkan sakelar Wajib absen di dekat toko.' },
        { title: 'Atur radius', body: 'Geser Radius absensi, lalu ketuk Simpan Perubahan.' },
      ],
      tip: 'Jangan pasang radius terlalu kecil. GPS ponsel bisa meleset belasan meter, sehingga karyawan yang sudah di dalam toko bisa ikut ditolak.',
    },
    {
      slug: 'jam-kerja-libur',
      group: STAFF,
      title: 'Mengatur Jam Kerja dan Hari Libur',
      desc: 'Atur jam kerja dan hari libur toko.',
      intro:
        'Jam masuk dan jam pulang toko menjadi patokan terlambat atau pulang cepat bagi karyawan yang belum punya jadwal shift sendiri. Hari libur mingguan tidak dihitung sebagai hari kerja maupun bolos di slip gaji.',
      steps: [
        { title: 'Buka Absensi & Jam Kerja', body: 'Buka Lainnya › Tim, pilih tab Kehadiran, lalu ketuk ikon setelan di kanan atas.' },
        { title: 'Atur Jam masuk', body: 'Ketuk Jam masuk, pilih jamnya, lalu pilih Toleransi (menit) bila perlu. Selama jam masuk kosong, tidak ada yang dihitung terlambat.' },
        { title: 'Atur Jam pulang', body: 'Ketuk Jam pulang toko dan pilih jamnya. Jam pulang yang lebih awal dari jam masuk dihitung keesokan harinya (shift malam).' },
        { title: 'Pilih Hari libur mingguan', body: 'Ketuk nama hari saat toko tutup. Perubahan langsung tersimpan.' },
      ],
      tip: 'Karyawan yang sudah punya jadwal shift dinilai dari jadwalnya sendiri. Jam masuk dan pulang toko hanya berlaku untuk yang belum punya jadwal.',
    },
    {
      slug: 'jadwal-shift',
      group: STAFF,
      title: 'Membuat Jadwal Shift Pegawai',
      desc: 'Susun jadwal shift untuk pegawai.',
      intro:
        'Jadwal shift menentukan jam kerja tiap karyawan, misalnya Kasir Pagi 07.00–15.00. Absensi memakai jadwal ini untuk menilai terlambat, dan kasir bisa memilihnya saat Buka Kasir. Di aplikasi namanya Jadwal Kasir.',
      steps: [
        { title: 'Buka Jadwal Kasir', body: 'Buka Lainnya › Tim › tab Tutup Kasir › ikon Jadwal Kasir (kanan atas).' },
        { title: 'Tambah jadwal', body: 'Ketuk Tambah Jadwal (di tablet: + Tambah). Isi Nama Jadwal, misalnya "Kasir Pagi", pilih Jam Mulai dan Jam Selesai, lalu ketuk Simpan.' },
        { title: 'Pasang jadwal ke karyawan', body: 'Buka Lainnya › Tim › tab Karyawan dan ketuk nama karyawan. Di bagian Informasi Tambahan (Opsional), pilih Jadwal Kasir, lalu ketuk Simpan Perubahan.' },
        { title: 'Atau lewat Web Admin', body: 'Di Web Admin buka Tim, pilih tab Shift Kasir, lalu klik Tambah Jadwal. Isi Nama Jadwal, Jam Mulai, Jam Selesai, centang Melewati Tengah Malam bila perlu, lalu klik Buat Jadwal.' },
      ],
      tip: 'Shift yang selesai lewat tengah malam (misalnya 22.00–06.00) tetap bisa dibuat. Aplikasi menandainya "Lewat tengah malam".',
    },
    {
      slug: 'gaji-absensi',
      group: STAFF,
      title: 'Gaji Pegawai Sesuai Absensi',
      desc: 'Periksa gaji dan slip berdasarkan absensi.',
      intro:
        'Loka menghitung gaji dari absensi: hari hadir, jam kerja, lembur, terlambat, dan tidak hadir. Anda tinggal memeriksa rekapnya, menambah bonus atau potongan, lalu menerbitkan slip.',
      steps: [
        { title: 'Atur dasar gaji karyawan', body: 'Buka Lainnya › Tim › tab Karyawan dan ketuk nama karyawan. Di bagian Gaji, pilih Dasar gaji (Harian, Bulanan, atau Per jam), isi nominalnya, lalu ketuk Simpan Perubahan.' },
        { title: 'Buka rekap gaji', body: 'Buka Lainnya › Tim › tab Gaji (di tablet: Gaji Karyawan), pilih tab Rekap, lalu pilih Periode.' },
        { title: 'Periksa dan lengkapi', body: 'Ketuk nama karyawan untuk melihat Rekap Absensi dan Rincian. Isi Bonus, Tunjangan / bonus, atau Potongan lain di Tambahan di luar absensi bila ada.' },
        { title: 'Terbitkan slip', body: 'Ketuk Terbitkan Slip Gaji. Slip tersimpan di tab Slip Terbit dan bisa dikirim dengan Bagikan Slip.' },
      ],
      tip: 'Angka slip dibekukan saat diterbitkan. Kalau absensinya dikoreksi kemudian, batalkan slip lalu terbitkan ulang agar memakai data terbaru.',
    },
    {
      slug: 'ringkasan-penjualan',
      group: OWNER,
      title: 'Ringkasan dan Filter Penjualan',
      desc: 'Lihat ringkasan penjualan dan saring datanya.',
      intro:
        'Tab Riwayat menampilkan ringkasan penjualan untuk periode yang Anda pilih: omzet lunas, jumlah transaksi, nota belum lunas, serta batal/refund. Datanya bisa disaring per tanggal, metode bayar, dan status.',
      steps: [
        { title: 'Buka tab Riwayat', body: 'Petak di atas daftar menampilkan Omzet lunas, Jumlah transaksi, Belum lunas, dan Batal / refund. Bawaannya menampilkan hari ini.' },
        { title: 'Pilih rentang tanggal', body: 'Ketuk ikon kalender di samping kolom Cari transaksi, lalu pilih tanggal awal dan akhir.' },
        { title: 'Saring metode bayar', body: 'Ketuk tombol metode bayar, lalu pilih Semua metode, Tunai, QRIS, Transfer, atau QRIS & Transfer.' },
        { title: 'Saring status', body: 'Pilih tab Semua, Belum Lunas, Lunas, atau Batal/Refund. Ketuk Reset untuk kembali ke hari ini.' },
        { title: 'Lihat rincian lebih lanjut', body: 'Ketuk Ekspor & lainnya › Produk Terjual untuk melihat jumlah dan nominal per produk, atau pilih Ekspor CSV. Untuk tren mingguan atau bulanan, buka Laporan › Laporan Penjualan.' },
      ],
      tip: 'Ketuk salah satu petak ringkasan untuk langsung membuka tab yang sesuai. Misalnya, petak Belum lunas membuka tab Belum Lunas.',
    },
    {
      slug: 'membership-loka',
      group: OWNER,
      title: 'Membership Aplikasi Loka',
      desc: 'Kelola membership aplikasi Loka.',
      intro:
        'Lihat paket langganan Loka Anda, perpanjang, atau naik ke paket Pro langsung dari aplikasi. Pembayaran lewat Duitku, dan paket aktif otomatis setelah pembayaran dikonfirmasi.',
      steps: [
        { title: 'Buka Langganan & Pembayaran', body: 'Masuk dengan akun pemilik, lalu buka Lainnya › Langganan & Pembayaran. Kartu Paket Anda menampilkan paket aktif dan masa berlakunya.' },
        { title: 'Pilih periode tagihan', body: 'Pilih Bulanan, Tahunan, atau 3 Tahun. Harga paket Pro menyesuaikan periode yang dipilih.' },
        { title: 'Pilih atau perpanjang paket', body: 'Ketuk Pilih Pro, atau Perpanjang Pro bila paket Anda sedang aktif. Bila masih ada sisa hari dari paket lama, potongannya ditampilkan di kartu paket.' },
        { title: 'Bayar', body: 'Periksa totalnya, lalu ketuk Bayar Sekarang. Halaman pembayaran Duitku terbuka di peramban. Selesaikan pembayaran, lalu kembali ke aplikasi.' },
        { title: 'Tunggu konfirmasi', body: 'Setelah pembayaran dikonfirmasi, muncul Pembayaran Berhasil. Ketuk Selesai. Halaman pembayaran yang tertutup bisa dibuka lagi lewat Buka Lagi.' },
      ],
      tip: 'Menutup halaman pembayaran tidak membatalkan tagihan. Paket tetap aktif dengan sendirinya setelah pembayaran masuk. Outlet tambahan diaktifkan di bagian Langganan Outlet pada halaman yang sama.',
    },
    {
      slug: 'lupa-kata-sandi',
      group: TROUBLE,
      title: 'Lupa Kata Sandi dan Pemulihan Akun',
      desc: 'Atur ulang kata sandi dan pulihkan akun.',
      intro:
        'Lupa password akun Loka? Anda bisa membuat password baru sendiri dari aplikasi Loka Kasir dengan kode OTP yang dikirim ke email. Web Admin mengarahkan ke aplikasi untuk langkah ini.',
      steps: [
        { title: 'Ketuk Lupa password? di layar Masuk', body: 'Buka aplikasi Loka Kasir, lalu ketuk Lupa password? di bawah kolom password.' },
        { title: 'Masukkan email akun', body: 'Ketik email yang Anda pakai saat mendaftar, lalu ketuk Kirim Kode (di tablet: Kirim).' },
        { title: 'Masukkan kode OTP', body: 'Ketik 6 digit kode OTP dari email, lalu ketuk Verifikasi (di tablet: Kirim). Bila kode belum masuk, tunggu hitungan mundur lalu ketuk Kirim ulang OTP.' },
        { title: 'Buat password baru', body: 'Isi Password Baru (minimal 6 karakter) dan Konfirmasi Password, lalu ketuk Simpan Password (di tablet: Kirim). Anda langsung masuk dan data toko tersinkron.' },
      ],
      tip: 'Kasir yang lupa PIN bisa mengetuk Lupa PIN? di layar PIN. PIN tidak bisa dilihat kembali, jadi pemilik harus menggantinya dengan yang baru.',
    },
    {
      slug: 'printer-tidak-mencetak',
      group: TROUBLE,
      title: 'Memeriksa Printer yang Tidak Mencetak',
      desc: 'Langkah memeriksa printer yang tidak mau mencetak.',
      intro:
        'Bila struk tidak keluar, periksa sambungan printer langkah demi langkah dari halaman Printer Struk.',
      steps: [
        { title: 'Buka Printer Struk', body: 'Buka Lainnya › Pengaturan › Struk & Dokumen › Printer Struk. Bila muncul peringatan izin atau Bluetooth, ketuk Beri Izin atau nyalakan Bluetooth terlebih dahulu.' },
        { title: 'Pilih ulang printer dan tes cetak', body: 'Nyalakan printer, pastikan kertasnya terpasang, lalu ketuk Pilih Printer (atau Ganti Printer) dan pilih nama printer Anda. Ketuk Tes Cetak.' },
        { title: 'Ikuti panduan Kalau belum berhasil', body: 'Ketuk Cara Menghubungkan Printer, lalu ikuti bagian Kalau belum berhasil. Pasangkan printer di Bluetooth HP (PIN biasanya 0000 atau 1234), izinkan "Perangkat di sekitar", dan pastikan printer tidak sedang tersambung ke HP lain.' },
        { title: 'Periksa kertas dan ukurannya', body: 'Kertas thermal hanya tercetak di satu sisi, jadi pastikan tidak terbalik. Bila tulisan terpotong, samakan ukuran kertas (58 mm atau 80 mm) di Pengaturan › Struk & Dokumen › Struk.' },
        { title: 'Masih gagal? Hubungi CS', body: 'Buka Lainnya › Bantuan & Panduan › Hubungi CS dan sebutkan merek printer Anda.' },
      ],
      tip: 'Kalau struk sering terpotong di tengah, nyalakan Mode printer lambat di halaman Printer Struk. Langkah Bluetooth ini untuk Android; di Windows, pastikan driver terpasang dan printer muncul di Settings › Printers & scanners.',
    },
    {
      slug: 'transaksi-belum-sinkron',
      group: TROUBLE,
      title: 'Memeriksa Transaksi yang Belum Tersinkron',
      desc: 'Temukan transaksi yang belum tersinkron dan kirim ulang.',
      intro:
        'Saat internet putus, transaksi tetap tersimpan di HP dan dikirim otomatis begitu online. Bila ada yang tertahan, Anda bisa melihat daftarnya dan mengirimnya ulang.',
      steps: [
        { title: 'Kenali tandanya', body: 'Bilah di atas layar menampilkan "Offline — … transaksi disimpan di HP, dikirim saat online". Di layar Kasir juga muncul ikon awan merah berangka.' },
        { title: 'Buka daftar transaksi tertunda', body: 'Ketuk ikon awan merah di layar Kasir. Daftar Transaksi Tertunda terbuka, dan setiap baris menunjukkan statusnya, misalnya Belum terkirim atau Ditolak server.' },
        { title: 'Kirim ulang', body: 'Pastikan internet tersambung, lalu ketuk Kirim Sekarang. Begitu semuanya terkirim, muncul tulisan "Semua transaksi sudah terkirim".' },
        { title: 'Atau lewat Kesehatan perangkat', body: 'Pemilik atau manajer bisa membuka Lainnya › Pengaturan › Akun & Aplikasi › Kesehatan perangkat. Pada baris Transaksi offline atau Perubahan belum terkirim, ketuk Sinkronkan.' },
        { title: 'Baris bertanda "sudah di server"', body: 'Jangan dikirim berulang, karena penjualannya sudah tercatat di server dan bisa tergandakan. Hubungi CS lewat Bantuan & Panduan › Hubungi CS.' },
      ],
      tip: 'Jangan keluar akun selama masih ada transaksi belum terkirim. Aplikasi akan memperingatkan Anda lebih dulu.',
    },
    {
      slug: 'absensi-ditolak-lokasi',
      group: TROUBLE,
      title: 'Mengatasi Absensi Ditolak karena Lokasi',
      desc: 'Atasi absensi yang ditolak karena di luar lokasi.',
      intro:
        'Bila lokasi absensi aktif, Loka menolak absen dari luar radius toko, dan juga GPS yang mati, palsu, kedaluwarsa, atau kurang akurat. Baca pesan yang muncul, lalu ikuti langkah sesuai penyebabnya.',
      steps: [
        { title: 'Nyalakan GPS dan izin lokasi', body: 'Bila muncul "GPS mati" atau "Izin lokasi diperlukan", nyalakan Lokasi di HP dan izinkan akses lokasi untuk Loka Kasir, lalu coba absen lagi.' },
        { title: 'Tunggu lokasi akurat', body: 'Bila muncul "Lokasi belum akurat" atau "Lokasi sudah kedaluwarsa", pindah ke tempat dengan sinyal GPS lebih baik atau keluar ruangan sebentar, lalu coba lagi. Matikan aplikasi GPS palsu bila terdeteksi.' },
        { title: 'Periksa titik outlet', body: 'Bila karyawan sudah di toko tetapi tetap ditolak, pemilik membuka Lainnya › Tim › tab Kehadiran › ikon setelan. Di TITIK OUTLET, ketuk Tandai Ulang sambil berdiri di toko, atau perbesar Radius absensi lalu ketuk Simpan Perubahan.' },
        { title: 'Catat absen manual bila mendesak', body: 'Pemilik bisa membuka tab Kehadiran › Riwayat › Tambah absen manual, mengisi Alasan absensi manual, lalu mengetuk Simpan absensi.' },
      ],
      tip: 'Tandai titik outlet dengan ponsel saat berdiri di dalam toko. Titik yang meleset puluhan meter bisa membuat semua karyawan ditolak keesokan paginya.',
    },
  ];
  return guides.map(guide => {
    const video = findGuide(guide.slug);
    return { ...guide, youtubeId: video?.tablet, youtubePhoneId: video?.phone, image: video && ['tambah-produk', 'barang-titipan', 'pesanan-berjalan', 'pesanan-meja', 'pisah-struk'].includes(guide.slug) ? { src: `/images/site/guides/${guide.slug}.jpg`, alt: `Panduan ${guide.title} di Loka Kasir` } : guide.image };
  });
}

const copy = {
  id: {
    metaTitle: 'Panduan Pengguna Loka Kasir',
    metaDescription: 'Cara pakai Loka Kasir langkah demi langkah: login, buka kasir, melayani transaksi, riwayat & struk, tutup shift, sampai pengaturan dan laporan.',
    title: 'Panduan Pengguna',
    desc: 'Cara pakai Loka Kasir, langkah demi langkah.',
    crumb: 'Panduan',
    searchPlaceholder: 'Cari panduan, misalnya "printer"',
    searchLabel: 'Cari panduan',
    searchEmpty: 'Tidak ada panduan yang cocok.',
    navLabel: 'Daftar panduan',
    selectLabel: 'Pilih panduan',
    startTitle: 'Mulai dari lima langkah dasar',
    startDesc: 'Alur harian kasir dari login sampai tutup shift. Ikuti urutannya dari atas.',
    moreTitle: 'Pengaturan & untuk pemilik',
    moreDesc: 'Jawaban lengkap dari tim Loka untuk hal yang paling sering ditanyakan.',
    watch: 'Tonton videonya',
    stepOf: (n: number, total: number) => `Langkah ${n} dari ${total}`,
    stepsTitle: 'Langkah-langkahnya',
    tip: 'Tips:',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    read: 'Baca panduan',
    helpTitle: 'Masih butuh bantuan?',
    helpDesc: 'Tim kami siap membantu lewat WhatsApp, termasuk untuk setup.',
    helpCta: 'Tanya via WhatsApp',
    helpMessage: 'Halo tim Loka, saya butuh bantuan memakai Loka Kasir.',
    pdfTitle: 'Panduan lengkap dalam PDF',
    pdfDesc: 'Semua langkah dasar, pengaturan, dan panduan fitur dalam satu berkas — simpan di HP atau cetak untuk kasir baru.',
    pdfCta: 'Unduh PDF',
  },
};

export const getPanduanCopy = (locale: Locale) => pick(copy, locale);
export const getGuides = (locale: Locale) => buildGuides(locale);
export const getGuideGroups = (locale: Locale) => {
  const groups: { title: string; guides: Guide[] }[] = [];
  for (const g of getGuides(locale)) {
    const found = groups.find(x => x.title === g.group);
    if (found) found.guides.push(g);
    else groups.push({ title: g.group, guides: [g] });
  }
  return groups;
};
