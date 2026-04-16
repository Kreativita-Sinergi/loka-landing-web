import { IPricing } from "@/types";

const allFeatures = [
  "Transaksi tidak terbatas",
  "Manajemen shift & rekap kas otomatis",
  "Multi-role karyawan (Owner, Manager, Admin, Kasir, Koki)",
  "Kelola produk, kategori & harga",
  "Laporan penjualan harian & bulanan",
  "Riwayat transaksi, refund & pembatalan",
  "Pembayaran split (tunai + non-tunai sekaligus)",
  "Cetak struk printer thermal (Bluetooth / USB)",
  "Manajemen meja & pesanan dine-in",
  "Kitchen Display System (KDS)",
  "Mode offline otomatis — transaksi tetap jalan",
  "Sinkronisasi cloud real-time",
  "Web Admin dashboard untuk pemilik usaha",
  "Update fitur gratis selamanya",
  "Bantuan teknis via WhatsApp & email",
];

export const tiers: IPricing[] = [
  {
    name: "Coba Gratis",
    price: "Gratis",
    period: "30 hari",
    description:
      "Akses penuh semua fitur tanpa syarat. Tidak perlu kartu kredit.",
    features: [
      ...allFeatures,
      "Tidak perlu kartu kredit",
      "Aktif langsung setelah download",
    ],
    ctaLabel: "Mulai Gratis Sekarang",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
  {
    name: "Bulanan",
    price: 100000,
    period: "per bulan",
    description: "Fleksibel untuk bisnis yang masih berkembang.",
    features: allFeatures,
    ctaLabel: "Langganan Bulanan",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
  {
    name: "Tahunan",
    price: 800000,
    period: "per tahun",
    badge: "Hemat 33%",
    description:
      "Bayar setahun, hemat Rp 400.000. Paling populer di kalangan pemilik bisnis.",
    features: [
      ...allFeatures,
      "Hemat Rp 400.000 dibanding paket bulanan",
      "Prioritas layanan dukungan teknis",
    ],
    ctaLabel: "Langganan Tahunan",
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.lokakasir.app",
  },
];
