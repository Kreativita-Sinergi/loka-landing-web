export interface IStat {
  value: string;
  label: string;
  description: string;
}

export const stats: IStat[] = [
  {
    value: "10+",
    label: "Tipe Bisnis",
    description: "Warung makan, kafe, minimarket, salon, laundry, restoran, dan lainnya",
  },
  {
    value: "50+",
    label: "Fitur Siap Pakai",
    description: "POS, KDS, absensi, inventori, laporan, multi-outlet — semua dalam satu app",
  },
  {
    value: "< 2 dtk",
    label: "Proses Transaksi",
    description: "Dari pilih produk hingga struk tercetak, tanpa hambatan jaringan",
  },
  {
    value: "Android",
    label: "Platform Kasir",
    description: "Berjalan di tablet atau HP Android biasa — tanpa perangkat kasir khusus",
  },
];
