export interface TutorialVideo {
  /** Nama file tanpa ekstensi di /public/videos/tutorials/ */
  slug: string;
  title: string;
  desc: string;
}

export const tutorialDetails: {
  title: string;
  description: string;
  videos: TutorialVideo[];
} = {
  title: "Video Tutorial",
  description:
    "Panduan singkat penggunaan aplikasi Loka Kasir — dari login sampai tutup shift, masing-masing kurang dari 30 detik.",
  videos: [
    {
      slug: "tut_login_web",
      title: "Login ke Aplikasi",
      desc: "Cara masuk ke aplikasi dengan akun owner atau PIN karyawan.",
    },
    {
      slug: "tut_buka_kasir_web",
      title: "Buka Kasir & Mulai Shift",
      desc: "Memulai shift kerja dan mengatur kas awal sebelum menerima transaksi.",
    },
    {
      slug: "tut_transaksi_web",
      title: "Melayani Transaksi",
      desc: "Memilih produk, memproses pembayaran, dan mencetak struk untuk pelanggan.",
    },
    {
      slug: "tut_riwayat_web",
      title: "Melihat Riwayat Transaksi",
      desc: "Memantau daftar transaksi yang sudah selesai beserta detailnya.",
    },
    {
      slug: "tut_tutup_shift_web",
      title: "Tutup Shift",
      desc: "Mengakhiri shift dengan rekap kas dan ringkasan penjualan.",
    },
  ],
};
