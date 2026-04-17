import { IPricing } from "@/types";

const liteFeatures = [
  "Maksimal 1 outlet",
  "Transaksi tidak terbatas",
  "Fitur Kasir (POS) Standar",
  "Kelola produk & kategori",
  "Laporan transaksi 30 hari terakhir",
  "Mode offline otomatis",
  "Sinkronisasi cloud real-time",
  "Web Admin dashboard untuk pemilik",
  "Cetak struk printer thermal (Bluetooth / USB)",
  "Update fitur gratis selamanya",
];

const proFeatures = [
  "Manajemen multi-outlet (harga × jumlah outlet)",
  "Fitur Kasir (POS) Lengkap",
  "Laporan keuangan lengkap (tanpa batas waktu)",
  "Manajemen inventori & stok varian",
  "Sistem shift kasir & rekap kas",
  "Gratis e-receipt & notifikasi via WhatsApp",
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
    period: "14 hari",
    description:
      "Akses penuh semua fitur Pro tanpa syarat. Tidak perlu kartu kredit.",
    features: [
      ...proFeatures,
      "Aktif langsung setelah daftar",
    ],
    ctaLabel: "Mulai Gratis Sekarang",
    ctaUrl: "https://app.lokakasir.id",
  },
  {
    name: "Lite",
    price: 39000,
    period: "per bulan",
    description: "Untuk 1 outlet. Ideal untuk usaha kecil yang baru memulai.",
    features: liteFeatures,
    ctaLabel: "Pilih Lite",
    ctaUrl: "https://app.lokakasir.id",
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
    ctaUrl: "https://app.lokakasir.id",
  },
];
