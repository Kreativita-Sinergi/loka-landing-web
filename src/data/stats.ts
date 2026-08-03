export interface IStat {
  value: string;
  label: string;
  description: string;
}

// Angka di bawah diambil dari data internal Loka Admin (portal super admin).
// Perbarui juga `statsNote` setiap kali angkanya di-refresh agar tetap jujur.
export const stats: IStat[] = [
  {
    value: "28",
    label: "Bisnis Aktif",
    description:
      "Warung makan, kafe, minimarket, konter, dan toko lain sudah jalan pakai Loka Kasir",
  },
  {
    value: "89%",
    label: "Dipakai Tiap Minggu",
    description:
      "25 dari 28 pengguna membuka Loka Kasir dalam 7 hari terakhir — bukan sekadar daftar lalu ditinggal",
  },
  {
    value: "120+ jam",
    label: "Jam Pakai / Minggu",
    description:
      "Rata-rata ±4 jam 49 menit per pengguna aktif — menemani sepanjang jam operasional toko",
  },
  {
    value: "28.280",
    label: "Sinkronisasi / Minggu",
    description:
      "Transaksi, stok, dan laporan tersinkron otomatis antara aplikasi kasir dan web admin",
  },
];

// Catatan kecil di bawah deretan angka, supaya jelas sumber dan tanggalnya.
export const statsNote =
  "Data internal Loka Kasir per 3 Agustus 2026 — diperbarui berkala.";
