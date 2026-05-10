import { IPricing } from "@/types";

const freeFeatures = [
  "1 outlet",
  "Transaksi tidak terbatas",
  "Manajemen produk & kategori dasar",
  "Shift kasir & rekap penjualan harian",
  "Laporan transaksi 30 hari terakhir",
  "Mode offline otomatis",
  "Sinkronisasi cloud real-time",
  "Cetak struk printer thermal (Bluetooth / USB)",
];

const liteFeatures = [
  "Semua fitur Gratis, plus:",
  "Manajemen karyawan multi-role (Kasir, Manager, Gudang, dll.)",
  "Manajemen & database pelanggan",
  "Manajemen meja & pesanan dine-in (FNB)",
  "Kitchen Display System / KDS (FNB)",
  "Inventori & stok varian lengkap",
  "Transfer stok antar outlet",
  "Bahan Baku & alert stok menipis",
  "Manajemen Supplier",
  "Purchase Order ke supplier",
  "Absensi karyawan — kiosk clock-in/out",
  "Analitik lanjutan (peak hours, performa produk, perbandingan outlet)",
  "Laporan keuangan & rekap shift lengkap",
  "Pengaturan hak akses (RBAC) per role",
  "Split payment & multi-metode bayar",
  "Update fitur gratis selamanya",
];

const proFeatures = [
  "Semua fitur Lite, plus:",
  "Multi-outlet tanpa batas (harga × jumlah outlet)",
  "HPP Moving Average & resep produk (BOM)",
  "Kalkulasi biaya overhead / OPEX",
  "Rekomendasi harga otomatis (Smart Pricing)",
  "Laporan Profitabilitas per produk (Revenue, COGS, Margin)",
  "Net Profit & Net Margin dashboard",
  "Program Loyalty Pelanggan — poin & reward",
  "Export Jurnal Akuntansi (CSV format double-entry)",
  "Bantuan teknis prioritas via WhatsApp & email",
];

export const tiers: IPricing[] = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "selamanya",
    description:
      "Untuk usaha yang baru mulai. Fitur POS inti tanpa batas transaksi.",
    features: freeFeatures,
    ctaLabel: "Mulai Gratis",
    ctaUrl: "https://app.lokakasir.id",
  },
  {
    name: "Coba Gratis 14 Hari",
    price: "Gratis",
    period: "14 hari",
    badge: "Mulai di Sini",
    description:
      "Akses penuh semua fitur Pro selama 14 hari. Tidak perlu kartu kredit.",
    features: [
      "Akses semua fitur Pro tanpa syarat",
      "Aktif langsung setelah daftar",
      "Tidak perlu kartu kredit",
      "Setelah 14 hari pilih paket yang sesuai",
    ],
    ctaLabel: "Coba Sekarang",
    ctaUrl: "https://app.lokakasir.id",
  },
  {
    name: "Lite",
    price: 39000,
    period: "per bulan",
    description: "Untuk 1 outlet. Operasional lengkap dengan inventori & karyawan.",
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
      "Multi-outlet + analisis biaya HPP & loyalty. Outlet pertama sudah termasuk, outlet tambahan +Rp 49.000/outlet/bulan.",
    features: proFeatures,
    ctaLabel: "Pilih Pro",
    ctaUrl: "https://app.lokakasir.id",
  },
];
