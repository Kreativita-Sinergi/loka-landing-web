import { pick, type Locale } from '@/data/localized';
import { getTutorials } from '@/data/tutorials';

/**
 * Panduan Pengguna (/panduan dan /panduan/[slug]).
 *
 * Tidak ada isi yang dikarang di sini:
 * - Grup "Mulai di sini" adalah lima video tutorial di `data/tutorials.ts`.
 *   Langkahnya diturunkan dari deskripsi video, layar aplikasi asli
 *   (screenshot), dan jawaban FAQ tentang shift, PIN, transaksi, dan struk.
 * - Grup lain menampilkan jawaban FAQ asli (dicocokkan lewat teks
 *   pertanyaannya), jadi selalu sama dengan halaman FAQ.
 */

export type GuideStep = { title: string; body: string };

export type Guide = {
  slug: string;
  group: string;
  title: string;
  desc: string;
  /** Screenshot aplikasi asli di /public/images/site. */
  image?: { src: string; alt: string };
  /** Slug video di /public/videos/tutorials (tanpa ekstensi). */
  video?: string;
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

function buildGuides(locale: Locale): Guide[] {
  const videos = Object.fromEntries(getTutorials('id').videos.map(v => [v.slug, v]));
  void locale;
  return [
    {
      slug: 'login',
      group: START,
      title: 'Login ke Aplikasi',
      desc: videos.tut_login_tablet.desc,
      video: 'tut_login_tablet',
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
      desc: videos.tut_buka_kasir_tablet.desc,
      video: 'tut_buka_kasir_tablet',
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
      desc: videos.tut_transaksi_tablet.desc,
      video: 'tut_transaksi_tablet',
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
      desc: videos.tut_riwayat_tablet.desc,
      video: 'tut_riwayat_tablet',
      image: { src: '/images/site/app-riwayat.webp', alt: 'Layar riwayat penjualan Loka Kasir' },
      intro: 'Semua transaksi yang sudah selesai tersimpan di Riwayat Penjualan, lengkap dengan detail struknya.',
      steps: [
        { title: 'Buka Riwayat Penjualan', body: 'Pilih Riwayat Penjualan dari menu samping. Ringkasan omzet dan jumlah transaksi hari ini tampil di atas daftar.' },
        { title: 'Pilih transaksi', body: 'Ketuk transaksi yang ingin dilihat. Panel detail terbuka lengkap dengan struknya.' },
        { title: 'Cetak ulang struk', body: 'Ketuk Cetak Ulang Struk untuk mencetaknya lagi ke printer thermal.' },
      ],
      tip: 'Transaksi yang sudah lunas bisa di-refund: statusnya berubah menjadi refunded, stok dikembalikan, dan tercatat di laporan. Secara bawaan refund butuh otorisasi Manager.',
    },
    {
      slug: 'tutup-shift',
      group: START,
      title: 'Tutup Shift',
      desc: videos.tut_tutup_shift_tablet.desc,
      video: 'tut_tutup_shift_tablet',
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
  ];
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
    startDesc: 'Alur harian kasir dari login sampai tutup shift. Setiap langkah dilengkapi video singkat di bawah 30 detik.',
    moreTitle: 'Pengaturan & untuk pemilik',
    moreDesc: 'Jawaban lengkap dari tim Loka untuk hal yang paling sering ditanyakan.',
    watch: 'Tonton videonya',
    videoNote: 'Rekaman layar aplikasi',
    stepOf: (n: number, total: number) => `Langkah ${n} dari ${total}`,
    videoLabel: 'video',
    stepsTitle: 'Langkah-langkahnya',
    tip: 'Tips:',
    prev: 'Sebelumnya',
    next: 'Berikutnya',
    read: 'Baca panduan',
    helpTitle: 'Masih butuh bantuan?',
    helpDesc: 'Tim kami siap membantu lewat WhatsApp, termasuk untuk setup.',
    helpCta: 'Tanya via WhatsApp',
    helpMessage: 'Halo tim Loka, saya butuh bantuan memakai Loka Kasir.',
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
export const getVideoDuration = (slug: string) => getTutorials('id').videos.find(v => v.slug === slug)?.duration;
