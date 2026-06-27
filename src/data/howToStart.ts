export type HowToIcon =
  | "whatsapp"
  | "download"
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
    "Lima langkah sederhana — dari belum punya aplikasi sampai siap menerima transaksi pertama. Gratis 14 hari, tanpa kartu kredit.",
  steps: [
    {
      icon: "whatsapp",
      title: "1. Minta Aplikasi",
      desc: "Hubungi tim Loka Kasir via WhatsApp atau Instagram. Kami kirimkan aplikasi Android-nya langsung ke Anda.",
    },
    {
      icon: "download",
      title: "2. Pasang Aplikasi",
      desc: "Install aplikasi di HP atau tablet Android Anda. Cukup sekali pasang untuk mulai dipakai.",
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
