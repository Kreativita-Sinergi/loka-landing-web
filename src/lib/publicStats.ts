// Angka pemakaian langsung dari backend Loka Kasir (`GET /public/stats`).
//
// Diambil di server saat halaman di-render dan disimpan Next selama 10 menit
// (ISR), jadi kunjungan ramai tidak berarti kueri agregat berulang ke database
// yang sama dengan yang melayani kasir sedang berjualan. Backend juga menyimpan
// hasilnya di Redis selama 10 menit — dua lapis, karena keduanya bisa dingin
// pada waktu yang berbeda.

export interface PublicStats {
  active_24h: number;
  active_7d: number;
  total_users: number;
  hours_7d: number;
  api_calls_7d: number;
  total_transactions: number;
  total_outlets: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.lokakasir.id";

/** Revalidasi ISR, dalam detik. */
export const PUBLIC_STATS_REVALIDATE = 600;

/**
 * Mengambil statistik publik. Mengembalikan null bila gagal — halaman TIDAK
 * boleh ikut gagal hanya karena angkanya tidak bisa diambil; pemanggilnya
 * jatuh ke angka cadangan.
 */
export async function fetchPublicStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/stats`, {
      next: { revalidate: PUBLIC_STATS_REVALIDATE },
    });
    if (!res.ok) return null;

    const body = (await res.json()) as { status?: boolean; data?: PublicStats };
    if (!body?.status || !body.data) return null;
    return body.data;
  } catch {
    return null;
  }
}

/** "25j 4m" — sama dengan format di portal admin. */
export function formatHours(hours: number): string {
  const total = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}j ${m}m` : `${m}m`;
}

export function formatNumber(value: number, locale = "id"): string {
  const locales: Record<string, string> = {
    id: "id-ID",
    en: "en-US",
    ms: "ms-MY",
    ja: "ja-JP",
  };
  return new Intl.NumberFormat(locales[locale] ?? locales.id).format(
    Math.max(0, Math.round(value)),
  );
}

/** Persentase user aktif 7 hari terhadap total, dibulatkan. */
export function activeShare(active: number, total: number): string {
  if (total <= 0) return "—";
  return `${Math.round((active / total) * 100)}%`;
}
