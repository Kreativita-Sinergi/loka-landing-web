import { IPricing } from "@/types";

const liteFeatures = [
  "1 outlet",
  "Transaksi tidak terbatas",
  "Kelola produk & kategori",
  "Laporan penjualan 30 hari terakhir",
  "Mode offline otomatis",
  "Sinkronisasi cloud real-time",
  "Web Admin dashboard untuk pemilik",
  "Cetak struk printer thermal (Bluetooth / USB)",
  "Update fitur gratis selamanya",
];

const proFeatures = [
  "Semua fitur Lite",
  "Multi-outlet (kelola dari satu akun)",
  "Laporan penjualan tanpa batas waktu",
  "Inventori & varian produk",
  "Manajemen shift kasir & rekap kas",
  "E-receipt via WhatsApp",
  "Kitchen Display System (KDS)",
  "Multi-role karyawan (Owner, Manager, Admin, Kasir, Koki)",
  "Manajemen meja & pesanan dine-in",
  "Pembayaran split (tunai + non-tunai)",
  "Bantuan teknis prioritas via WhatsApp & email",
];

export const tiers: IPricing[] = [
  {
    name: "Coba Gratis",
    price: "Gratis",
    period: "30 hari",
    description:
      "Akses penuh semua fitur Pro tanpa syarat. Tidak perlu kartu kredit.",
    features: [
      ...proFeatures,
      "Aktif langsung setelah download",
    ],
    ctaLabel: "Mulai Gratis Sekarang",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
  {
    name: "Lite",
    price: 39000,
    period: "per bulan",
    description: "Untuk 1 outlet. Ideal untuk usaha kecil yang baru memulai.",
    features: liteFeatures,
    ctaLabel: "Pilih Lite",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
  {
    name: "Pro",
    price: 89000,
    period: "per outlet / bulan",
    badge: "Paling Populer",
    description:
      "Outlet pertama sudah termasuk. Outlet tambahan +Rp 49.000/outlet/bulan.",
    features: proFeatures,
    ctaLabel: "Pilih Pro",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
];
