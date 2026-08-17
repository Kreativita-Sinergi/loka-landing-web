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
    "Lima langkah sederhana — dari belum punya akun sampai siap menerima transaksi pertama. Gratis 30 hari pertama, tanpa komitmen.",
  // Urutannya sengaja dimulai dari mendaftar, bukan mengunduh: sejak Web Admin
  // punya halaman pendaftaran sendiri, pemilik bisa membuat akun dan menyiapkan
  // toko dari laptop tanpa memegang HP dulu.
  steps: [
    {
      icon: "register",
      title: "1. Daftar Akun Gratis",
      desc: "Daftar langsung dari browser di app.lokakasir.id, atau dari dalam aplikasi — sama saja. Isi data bisnis, pilih jenis usaha (FNB, Retail, atau Jasa), dan buat outlet pertama.",
    },
    {
      icon: "setup",
      title: "2. Siapkan Toko",
      desc: "Tambahkan produk & kategori, atur karyawan beserta PIN-nya, lalu tentukan metode pembayaran. Paling nyaman dikerjakan di Web Admin lewat laptop.",
    },
    {
      icon: "download",
      title: "3. Download Aplikasi Kasir",
      desc: "Ambil aplikasinya di Google Play Store (Android) atau Microsoft Store (Windows) untuk perangkat yang dipakai melayani pembeli.",
    },
    {
      icon: "install",
      title: "4. Pasang & Login",
      desc: "Tekan Install, buka aplikasinya, lalu login memakai akun yang sama. Produk dan pengaturan yang tadi Anda buat langsung muncul.",
    },
    {
      icon: "sell",
      title: "5. Mulai Transaksi",
      desc: "Buka shift, layani penjualan, dan cetak struk. Pantau laporan & kelola bisnis lebih lanjut lewat Web Admin.",
    },
  ],
};
