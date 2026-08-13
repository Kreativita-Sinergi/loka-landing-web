// Helper kecil untuk mengirim event ke Google Analytics (GA4) lewat gtag.
// Aman dipanggil meski GA belum aktif — jika `window.gtag` tidak ada, no-op.
type GtagWindow = Window & {
  gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
};

export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.gtag?.("event", action, params);
}

// Event khusus: pengunjung mengklik tombol "Minta Aplikasi" / kontak.
// `source` menandai dari komponen mana klik berasal (hero, header, floating, dll).
export function trackContactClick(channel: "whatsapp" | "instagram", source: string) {
  trackEvent("contact_click", { channel, source });
}

// Event khusus: pengunjung mengklik tombol download aplikasi.
// `source` menandai dari komponen mana klik berasal (hero, header, cta, dll),
// `platform` menandai toko tujuannya (Play Store untuk Android, Microsoft Store
// untuk Windows). Default "android" agar pemanggilan lama tetap konsisten.
export function trackDownloadClick(
  source: string,
  platform: "android" | "windows" = "android"
) {
  trackEvent("app_download_click", { source, platform });
}
