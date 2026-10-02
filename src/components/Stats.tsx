import React from "react";
import { getStats } from "@/data/stats";
import {
  activeShare,
  fetchPublicStats,
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
  const { stats: fallbackStats, note: statsNote, liveNote } = getStats(locale);
  const live = await fetchPublicStats();

  // Angka cadangan dipakai hanya bila backend tidak terjangkau. Ia ditulis
  // tangan dan bisa basi — itulah alasan seluruh bagian ini dipindah ke data
  // langsung; menampilkan angka lama diam-diam lebih buruk daripada
  // menampilkan angka yang benar.
  // Label dan keterangannya diambil dari katalog bahasa yang sama dengan versi
  // cadangan; hanya ANGKANYA yang datang dari data langsung. Sebelumnya cabang
  // ini menulis ulang labelnya dalam bahasa Indonesia, sehingga di
  // halaman berbahasa lain seluruh blok ini tetap berbahasa Indonesia selama
  // backend-nya terjangkau — yaitu hampir selalu.
  const items: StatItem[] = live
    ? [
        formatNumber(live.total_users, locale),
        formatNumber(live.total_outlets, locale),
        formatNumber(live.active_7d, locale),
        formatNumber(live.total_transactions, locale),
        typeof live.pro_subscribers === "number" && Number.isFinite(live.pro_subscribers)
          ? formatNumber(live.pro_subscribers, locale)
          : "—",
      ].map((value, i) => ({ ...fallbackStats[i], value }))
    : fallbackStats;

  // Bagian pengguna aktif hanya bisa dihitung dari data langsung, jadi
  // keterangannya disisipkan di depan kalimat yang sudah diterjemahkan.
  if (live) {
    items[2] = {
      ...items[2],
      description: `${activeShare(live.active_7d, live.total_users)} — ${items[2].description}`,
    };
  }

  const note = live ? liveNote : statsNote;

  return (
    <section className="shop-stats">
      <div className="shop-stats-inner">
        <div className="shop-stats-grid">
          {items.map((stat, index) => (
            <div key={stat.label} title={stat.description} className="shop-stat">
              <span className="block text-3xl md:text-4xl font-bold leading-tight">
                {stat.value}
              </span>
              <span className="block mt-2 text-sm font-semibold">{stat.label}</span>
              {index === 4 && (
                <span className="block mt-2 text-xs leading-relaxed">{stat.description}</span>
              )}

            </div>
          ))}
        </div>

        <p className="shop-stats-note">{note}</p>
      </div>
    </section>
  );
};

export default Stats;
