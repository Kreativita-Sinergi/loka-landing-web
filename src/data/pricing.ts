import { IPricing } from "@/types";

export const tiers: IPricing[] = [
  {
    name: 'Bulanan',
    price: 100000,
    features: [
      'Semua fitur kasir tersedia',
      'Laporan penjualan lengkap',
      'Akses penuh ke update & fitur baru',
      'Bantuan teknis via chat & email',
    ],
  },
  {
    name: 'Tahunan',
    price: 800000,
    features: [
      'Hemat hingga 33% dibanding paket bulanan',
      'Semua fitur kasir tersedia',
      'Laporan penjualan lengkap',
      'Akses penuh ke update & fitur baru',
      'Bantuan teknis via chat & email',
    ],
  },
];
