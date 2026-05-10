import { IPricing } from "@/types";

const liteFeatures = [
  "1 outlet",
  "Transaksi tidak terbatas",
  "Manajemen karyawan multi-role (Kasir, Manager, Gudang, dll.)",
  "Manajemen & database pelanggan",
  "Manajemen meja & pesanan dine-in (FNB)",
  "Kitchen Display System / KDS (FNB)",
  "Inventori & stok varian lengkap",
  "Transfer stok antar outlet",
  "Bahan Baku & alert stok menipis",
  "Manajemen Supplier & Purchase Order",
  "Absensi karyawan — kiosk clock-in/out",
  "Analitik lanjutan & laporan keuangan",
  "Pengaturan hak akses (RBAC) per role",
  "Split payment & multi-metode bayar",
];

const proFeatures = [
  "Semua fitur Lite, plus:",
  "Multi-outlet tanpa batas (+Rp 49.000/outlet tambahan)",
  "HPP Moving Average & resep produk (BOM)",
  "Kalkulasi biaya overhead / OPEX",
  "Rekomendasi harga otomatis (Smart Pricing)",
  "Laporan Profitabilitas per produk (Revenue, COGS, Margin)",
  "Net Profit & Net Margin dashboard",
  "Program Loyalty Pelanggan — poin & reward",
  "Export Jurnal Akuntansi (CSV double-entry)",
  "Bantuan teknis prioritas via WhatsApp & email",
];

export const tiers: IPricing[] = [
  {
    name: "Coba Gratis 14 Hari",
    price: "Gratis",
    period: "14 hari",
    badge: "Mulai di Sini",
    description:
      "Akses penuh semua fitur Pro tanpa syarat. Tidak perlu kartu kredit.",
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
      "Multi-outlet + analisis HPP & loyalty. Outlet pertama sudah termasuk.",
    features: proFeatures,
    ctaLabel: "Pilih Pro",
    ctaUrl: "https://app.lokakasir.id",
  },
];
