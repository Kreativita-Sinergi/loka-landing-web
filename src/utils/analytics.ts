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

// Event khusus: pengunjung mengklik tombol "Download Aplikasi (APK)".
// `source` menandai dari komponen mana klik berasal (hero, header, cta, dll).
export function trackDownloadClick(source: string) {
  trackEvent("app_download_click", { source });
}
