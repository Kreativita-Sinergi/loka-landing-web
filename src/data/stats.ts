export interface IStat {
  value: string;
  label: string;
  description: string;
}

export const stats: IStat[] = [
  {
    value: "1.000+",
    label: "Transaksi / Hari",
    description: "Diproses setiap hari di seluruh outlet pengguna Loka Kasir",
  },
  {
    value: "100+",
    label: "Outlet Aktif",
    description: "Dari warung hingga restoran di berbagai kota di Indonesia",
  },
  {
    value: "10+",
    label: "Jenis Bisnis",
    description: "Warung makan, kafe, minimarket, fashion, salon, dan lainnya",
  },
  {
    value: "< 1 dtk",
    label: "Proses Transaksi",
    description: "Kecepatan rata-rata kasir memproses satu item pesanan",
  },
];
