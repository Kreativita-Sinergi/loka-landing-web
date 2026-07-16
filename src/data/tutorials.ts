export interface TutorialVideo {
  /** Nama file tanpa ekstensi di /public/videos/tutorials/ */
  slug: string;
  title: string;
  desc: string;
  /** Durasi tayang, format m:ss */
  duration: string;
}

export const tutorialDetails: {
  title: string;
  description: string;
  videos: TutorialVideo[];
} = {
  title: "Lihat Cara Kerjanya",
  description:
    "Alur lengkap Loka Kasir dalam 5 video singkat — dari login sampai tutup shift, masing-masing di bawah 30 detik. Klik untuk memutar.",
  videos: [
    {
      slug: "tut_login_web",
      title: "Login ke Aplikasi",
      desc: "Masuk cukup dengan nomor HP atau email dan password — langsung sampai ke beranda kasir.",
      duration: "0:20",
    },
    {
      slug: "tut_buka_kasir_web",
      title: "Buka Kasir & Mulai Shift",
      desc: "Pilih outlet, terminal, dan kasir, lalu isi saldo kas awal untuk memulai shift.",
      duration: "0:28",
    },
    {
      slug: "tut_transaksi_web",
      title: "Melayani Transaksi",
      desc: "Pilih produk, tentukan dine-in atau take-away, lalu selesaikan pembayaran dalam hitungan detik.",
      duration: "0:20",
    },
    {
      slug: "tut_riwayat_web",
      title: "Riwayat & Struk",
      desc: "Buka kembali transaksi yang sudah selesai lengkap dengan detail struk, siap dikirim atau dicetak ulang.",
      duration: "0:22",
    },
    {
      slug: "tut_tutup_shift_web",
      title: "Tutup Shift",
      desc: "Cocokkan kas fisik dengan kas diharapkan — ringkasan penjualan tunai & QRIS terekap otomatis.",
      duration: "0:14",
    },
  ],
};
