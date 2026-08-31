import { pick, type Locale } from "./localized";

export interface IStat {
  value: string;
  label: string;
  description: string;
}

// Angka di bawah menjadi cadangan ketika endpoint statistik production tidak
// dapat dijangkau. Perbarui juga tanggal `note` setiap kali angkanya di-refresh.
//
// ANGKANYA SAMA DI SEMUA BAHASA karena semuanya menggambarkan produk yang sama.
// Format pemisah ribuan saja yang mengikuti kebiasaan bahasa setempat.
const statsByLocale: Record<Locale, { stats: IStat[]; note: string; liveNote: string }> = {
  id: {
    stats: [
      { value: "183", label: "Pengguna Terdaftar", description: "Pemilik dan tim usaha yang telah bergabung dengan Loka Kasir" },
      { value: "181", label: "Outlet Aktif", description: "Outlet aktif dari beragam jenis usaha yang dikelola melalui Loka Kasir" },
      { value: "86", label: "Aktif dalam 7 Hari", description: "Pengguna yang membuka Loka Kasir dalam tujuh hari terakhir" },
      { value: "1.214", label: "Transaksi Tercatat", description: "Total transaksi penjualan yang telah dicatat oleh sistem" },
    ],
    note: "Data cadangan Loka Kasir per 31 Agustus 2026.",
    liveNote: "Data penggunaan agregat dari sistem Loka Kasir — diperbarui otomatis setiap 10 menit.",
  },
  en: {
    stats: [
      { value: "183", label: "Registered Users", description: "Business owners and team members who have joined Loka Kasir" },
      { value: "181", label: "Active Outlets", description: "Active outlets across different business types managed with Loka Kasir" },
      { value: "86", label: "Active in 7 Days", description: "Users who opened Loka Kasir during the last seven days" },
      { value: "1,214", label: "Recorded Transactions", description: "Total sales transactions recorded by the system" },
    ],
    note: "Fallback Loka Kasir data as of 31 August 2026.",
    liveNote: "Aggregated usage data from Loka Kasir — refreshed automatically every 10 minutes.",
  },
  ms: {
    stats: [
      { value: "183", label: "Pengguna Berdaftar", description: "Pemilik perniagaan dan ahli pasukan yang telah menyertai Loka Kasir" },
      { value: "181", label: "Cawangan Aktif", description: "Cawangan aktif daripada pelbagai jenis perniagaan yang diurus dengan Loka Kasir" },
      { value: "86", label: "Aktif dalam 7 Hari", description: "Pengguna yang membuka Loka Kasir dalam tempoh tujuh hari terakhir" },
      { value: "1,214", label: "Transaksi Direkodkan", description: "Jumlah transaksi jualan yang telah direkodkan oleh sistem" },
    ],
    note: "Data sandaran Loka Kasir sehingga 31 Ogos 2026.",
    liveNote: "Data penggunaan agregat daripada sistem Loka Kasir — dikemas kini secara automatik setiap 10 minit.",
  },
  ja: {
    stats: [
      { value: "183", label: "登録ユーザー", description: "Loka Kasir に参加した事業者とスタッフの数です" },
      { value: "181", label: "稼働中の店舗", description: "Loka Kasir で管理されている、さまざまな業種の稼働店舗です" },
      { value: "86", label: "直近7日間の利用者", description: "直近7日以内に Loka Kasir を開いたユーザーです" },
      { value: "1,214", label: "記録済み取引", description: "システムに記録された売上取引の累計です" },
    ],
    note: "Loka Kasir の予備データ（2026年8月31日時点）。",
    liveNote: "Loka Kasir 本番システムの集計利用データです。10分ごとに自動更新されます。",
  },
};

export const getStats = (locale: Locale) => pick(statsByLocale, locale);

/** @deprecated Pakai [getStats]. */
export const stats: IStat[] = statsByLocale.id.stats;
/** @deprecated Pakai [getStats]. */
export const statsNote = statsByLocale.id.note;
