import { pick, type Locale } from "./localized";

export interface IStat {
  value: string;
  label: string;
  description: string;
}

// Angka di bawah diambil dari data internal Loka Admin (portal super admin).
// Perbarui juga `statsNote` setiap kali angkanya di-refresh agar tetap jujur.
//
// ANGKANYA SAMA DI SEMUA BAHASA. Ia fakta tentang produk yang sama, dan
// menyesuaikannya per pasar — "28 bisnis" jadi kesan lebih besar di satu bahasa
// dan lebih kecil di bahasa lain — berarti berbohong dalam salah satunya.
// Formatnya saja yang mengikuti kebiasaan setempat: "28.280" (ID) vs "28,280".
const statsByLocale: Record<Locale, { stats: IStat[]; note: string }> = {
  id: {
    stats: [
      { value: "28", label: "Bisnis Aktif", description: "Warung makan, kafe, minimarket, konter, dan toko lain sudah jalan pakai Loka Kasir" },
      { value: "89%", label: "Dipakai Tiap Minggu", description: "25 dari 28 pengguna membuka Loka Kasir dalam 7 hari terakhir — bukan sekadar daftar lalu ditinggal" },
      { value: "120+ jam", label: "Jam Pakai / Minggu", description: "Rata-rata ±4 jam 49 menit per pengguna aktif — menemani sepanjang jam operasional toko" },
      { value: "28.280", label: "Sinkronisasi / Minggu", description: "Transaksi, stok, dan laporan tersinkron otomatis antara aplikasi kasir dan web admin" },
    ],
    note: "Data internal Loka Kasir per 3 Agustus 2026 — diperbarui berkala.",
  },
  en: {
    stats: [
      { value: "28", label: "Active Businesses", description: "Food stalls, cafés, minimarkets, phone counters, and retail shops running on Loka Kasir today" },
      { value: "89%", label: "Used Every Week", description: "25 of 28 businesses opened Loka Kasir in the last 7 days — not signed up and forgotten" },
      { value: "120+ hrs", label: "Hours Used / Week", description: "About 4 hours 49 minutes per active business — open for the whole trading day, not just at closing" },
      { value: "28,280", label: "Syncs / Week", description: "Sales, stock, and reports moving between the register app and the web dashboard automatically" },
    ],
    note: "Loka Kasir internal data as of 3 August 2026 — refreshed periodically.",
  },
  ms: {
    stats: [
      { value: "28", label: "Perniagaan Aktif", description: "Gerai makan, kafe, pasar mini, kaunter telefon, dan kedai runcit yang menggunakan Loka Kasir hari ini" },
      { value: "89%", label: "Digunakan Setiap Minggu", description: "25 daripada 28 perniagaan membuka Loka Kasir dalam 7 hari lepas — bukan sekadar daftar lalu ditinggalkan" },
      { value: "120+ jam", label: "Jam Guna / Minggu", description: "Lebih kurang 4 jam 49 minit bagi setiap perniagaan aktif — sepanjang waktu urus niaga, bukan hanya waktu tutup kedai" },
      { value: "28,280", label: "Penyegerakan / Minggu", description: "Jualan, stok, dan laporan bergerak automatik antara aplikasi kaunter dan papan pemuka web" },
    ],
    note: "Data dalaman Loka Kasir sehingga 3 Ogos 2026 — dikemas kini secara berkala.",
  },
  ja: {
    stats: [
      { value: "28", label: "稼働中の店舗", description: "食堂・カフェ・ミニマート・携帯ショップ・小売店などが、実際に Loka Kasir でレジを回しています" },
      { value: "89%", label: "毎週使われています", description: "28店舗のうち25店舗が直近7日以内に起動。登録したきり、にはなっていません" },
      { value: "120時間超", label: "週あたり稼働時間", description: "稼働店舗あたり約4時間49分。締め作業のときだけでなく、営業時間中ずっと開かれています" },
      { value: "28,280", label: "週あたり同期回数", description: "売上・在庫・レポートが、レジアプリと管理画面のあいだで自動的に行き来しています" },
    ],
    note: "Loka Kasir 社内データ（2026年8月3日時点）。定期的に更新しています。",
  },
};

export const getStats = (locale: Locale) => pick(statsByLocale, locale);

/** @deprecated Pakai [getStats]. */
export const stats: IStat[] = statsByLocale.id.stats;
/** @deprecated Pakai [getStats]. */
export const statsNote = statsByLocale.id.note;
