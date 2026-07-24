import { ImageResponse } from "next/og";

// Gambar preview link (Open Graph) yang dibuat dinamis — muncul saat URL
// lokakasir.id dibagikan via WhatsApp, Instagram, Facebook, dll.
// File-based convention Next.js: otomatis dipasang sebagai <meta og:image>.

export const alt = "Loka Kasir — Solusi Kasir Digital Modern untuk UMKM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #050a14 0%, #0a1428 55%, #0b2a5e 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 30,
            fontWeight: 700,
            color: "#4d8dff",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#007BFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            🛒
          </div>
          Loka Kasir
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Kasir Digital Modern untuk UMKM Indonesia
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#cbd5e1",
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Kelola transaksi, stok, shift, dan laporan bisnis — ringan, cepat, dan
          tetap jalan saat offline.
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
          }}
        >
          {["Gratis 3 bulan pertama", "Android & Web", "Tanpa komitmen"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 24,
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
