export type HowToIcon =
  | "whatsapp"
  | "download"
  | "install"
  | "register"
  | "setup"
  | "sell";

export interface HowToStep {
  icon: HowToIcon;
  title: string;
  desc: string;
}

export const howToStartDetails: {
  title: string;
  description: string;
  steps: HowToStep[];
} = {
  title: "Cara Daftar & Mulai Pakai",
  description:
    "Lima langkah sederhana — dari belum punya aplikasi sampai siap menerima transaksi pertama. Gratis 3 bulan pertama, tanpa komitmen.",
  steps: [
    {
      icon: "download",
      title: "1. Download Aplikasi",
      desc: "Klik tombol download di halaman ini untuk mengunduh file aplikasi (APK) Android-nya. Tidak perlu minta ke admin — langsung unduh sendiri.",
    },
    {
      icon: "install",
      title: "2. Pasang Aplikasi",
      desc: "Buka file APK yang terunduh dan install di HP atau tablet Android Anda. Izinkan pemasangan dari sumber ini bila diminta.",
    },
    {
      icon: "register",
      title: "3. Daftar Akun Owner",
      desc: "Buka aplikasi lalu daftar gratis: isi data bisnis, pilih jenis usaha (FNB, Retail, atau Jasa), dan buat outlet pertama.",
    },
    {
      icon: "setup",
      title: "4. Siapkan Toko",
      desc: "Tambahkan produk & kategori, atur karyawan beserta PIN-nya, lalu konfigurasikan terminal kasir dan metode pembayaran.",
    },
    {
      icon: "sell",
      title: "5. Mulai Transaksi",
      desc: "Buka shift, layani penjualan, dan cetak struk. Pantau laporan & kelola bisnis lebih lanjut lewat Web Admin dengan akun yang sama.",
    },
  ],
};
