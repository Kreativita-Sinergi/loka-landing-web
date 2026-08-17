import React from "react";
import { getStats } from "@/data/stats";
import {
  activeShare,
  fetchPublicStats,
  formatHours,
  formatNumber,
  PUBLIC_STATS_REVALIDATE,
} from "@/lib/publicStats";
import type { Locale } from "@/data/localized";

// Server Component: angkanya diambil saat render, bukan di browser pengunjung.
// Dengan begitu tidak ada permintaan tambahan dari sisi pembaca, dan halaman
// tetap bisa di-cache Next sebagai statis yang disegarkan berkala.
export const revalidate = PUBLIC_STATS_REVALIDATE;

interface StatItem {
  value: string;
  label: string;
  description: string;
}

const Stats = async ({ locale }: { locale: Locale }) => {
  const { stats: fallbackStats, note: statsNote } = getStats(locale);
  const live = await fetchPublicStats();

  // Angka cadangan dipakai hanya bila backend tidak terjangkau. Ia ditulis
  // tangan dan bisa basi — itulah alasan seluruh bagian ini dipindah ke data
  // langsung; menampilkan angka lama diam-diam lebih buruk daripada
  // menampilkan angka yang benar.
  const items: StatItem[] = live
    ? [
        {
          value: formatNumber(live.active_24h),
          label: "Aktif 24 Jam",
          description:
            "Pemilik dan kasir yang membuka Loka Kasir dalam sehari terakhir",
        },
        {
          value: formatNumber(live.active_7d),
          label: "Aktif 7 Hari",
          description: `${activeShare(
            live.active_7d,
            live.total_users,
          )} dari total pengguna — dipakai rutin, bukan sekadar didaftarkan`,
        },
        {
          value: formatHours(live.hours_7d),
          label: "Jam Pakai / Minggu",
          description:
            "Total jam aplikasi & web kasir menemani jam operasional toko",
        },
        {
          value: formatNumber(live.total_transactions),
          label: "Transaksi Diproses",
          description:
            "Penjualan yang tercatat, tersinkron otomatis antara kasir dan web admin",
        },
      ]
    : fallbackStats;

  const note = live
    ? "Angka langsung dari sistem Loka Kasir — disegarkan otomatis tiap 10 menit."
    : statsNote;

  return (
    <section className="bg-secondary py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {items.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                {stat.value}
              </span>
              <span className="mt-1 text-base font-semibold">{stat.label}</span>
              <span className="mt-1 text-sm text-blue-200 leading-snug">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-blue-200/80">{note}</p>
      </div>
    </section>
  );
};

export default Stats;
