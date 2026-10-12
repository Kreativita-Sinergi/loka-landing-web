import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import { Backdrop, C, Headline, Outro } from './kit';

export const VERTICALS_DURATION = 390;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const BUSINESSES = [
  { icon: '☕', name: 'Kafe & Resto', a: 'QR order dari meja', b: 'Papan dapur (KDS)', tone: '#0d5df3' },
  { icon: '🎮', name: 'Rental PS & Biliar', a: 'Timer paket & argo', b: 'Perpanjang lewat QR', tone: '#7c3aed' },
  { icon: '🏸', name: 'Lapangan Olahraga', a: 'Booking per jam', b: 'Tarif jam sibuk', tone: '#16a34a' },
  { icon: '🔧', name: 'Bengkel', a: 'Plat nomor & kilometer', b: 'Status servis', tone: '#ea580c' },
  { icon: '📱', name: 'Konter & Servis HP', a: 'IMEI & keluhan', b: 'Pulsa & kuota', tone: '#0891b2' },
  { icon: '💊', name: 'Apotek', a: 'Golongan obat', b: 'Obat keras wajib resep', tone: '#dc2626' },
  { icon: '👕', name: 'Laundry', a: 'Berat & jumlah potong', b: 'Estimasi selesai', tone: '#2563eb' },
  { icon: '🛒', name: 'Toko & Retail', a: 'Barang titipan', b: 'Stok opname', tone: '#ca8a04' },
];

const EXTRAS = [
  'Kasbon pelanggan', 'Member & poin', 'Absensi GPS', 'Gaji dari absensi',
  'Cek pesanan via QR', 'Pisah struk', 'Struk thermal', 'Mode offline',
  'Multi outlet', 'HPP & bahan baku', 'Refund izin owner', 'Laporan per shift',
];

const STRIP = { from: 56, to: 250 };
const CARD_W = 330;
const GAP = 28;
const EXTRA_AT = 246;

function Strip() {
  const frame = useCurrentFrame();
  const total = BUSINESSES.length * (CARD_W + GAP);
  // Pita bergerak cepat di awal lalu melambat: kemiringan mengikuti kecepatannya.
  const ease = Easing.bezier(0.3, 0.1, 0.25, 1);
  const x = interpolate(frame, [STRIP.from, STRIP.to], [1280, 1280 - total - 120], { ...clamp, easing: ease });
  const prev = interpolate(frame - 1, [STRIP.from, STRIP.to], [1280, 1280 - total - 120], { ...clamp, easing: ease });
  const v = x - prev;
  const skew = Math.max(-14, Math.min(14, v * 0.5));
  const fade = interpolate(frame, [STRIP.to - 14, STRIP.to], [1, 0], clamp);
  if (frame < STRIP.from - 2 || fade <= 0) return null;
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <div style={{ position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center', fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Pilih jenis usaha, Loka menyesuaikan istilah & isian kasirnya</div>
      <div style={{ position: 'absolute', top: 170, left: x, display: 'flex', gap: GAP, transform: `skewX(${skew}deg)` }}>
        {BUSINESSES.map(b => (
          <div key={b.name} style={{ width: CARD_W, height: 400, borderRadius: 30, background: '#fff', color: C.ink, padding: 30, display: 'flex', flexDirection: 'column', boxShadow: '0 40px 80px -30px rgba(0,0,0,0.6)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${b.tone}33, transparent 70%)` }} />
            <div style={{ width: 86, height: 86, borderRadius: 24, background: `${b.tone}18`, fontSize: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b.icon}</div>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 30, lineHeight: 1.1 }}>{b.name}</div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[b.a, b.b].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 19, fontWeight: 700, color: C.body }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: b.tone }} />{t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function Extras() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < EXTRA_AT) return null;
  const out = interpolate(frame, [326, 336], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: out }}>
      <Headline text="Plus fitur yang bikin usaha makin rapi" from={EXTRA_AT} size={50} color="#fff" mark={['rapi']} markColor={C.accent} style={{ justifyContent: 'center', maxWidth: 1000, marginBottom: 40 }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, maxWidth: 1060 }}>
        {EXTRAS.map((t, i) => {
          const p = spring({ frame: frame - EXTRA_AT - 10 - i * 2.5, fps, config: { damping: 11, stiffness: 170 } });
          const ang = (i / EXTRAS.length) * Math.PI * 2;
          return (
            <div key={t} style={{ padding: '14px 24px', borderRadius: 999, fontSize: 23, fontWeight: 700, background: i % 4 === 0 ? C.accent : 'rgba(255,255,255,0.1)', color: i % 4 === 0 ? C.ink : '#fff', border: '1px solid rgba(255,255,255,0.16)', opacity: Math.min(1, p * 1.4), transform: `translate(${Math.cos(ang) * (1 - p) * 500}px, ${Math.sin(ang) * (1 - p) * 300}px) scale(${0.5 + p * 0.5})` }}>{t}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export default function VerticalsVideo() {
  const frame = useCurrentFrame();
  const introOut = interpolate(frame, [48, 60], [1, 0], clamp);
  const zoom = interpolate(frame, [0, 60], [1.06, 1], clamp);
  return (
    <Backdrop tone="dark">
      {introOut > 0 && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: introOut, transform: `scale(${zoom})` }}>
          <Headline text="Satu aplikasi." from={2} size={120} color="#fff" style={{ justifyContent: 'center' }} />
          <Headline text="Banyak jenis usaha." from={16} size={120} color={C.accent} style={{ justifyContent: 'center' }} />
        </AbsoluteFill>
      )}
      <Strip />
      <Extras />
      <Outro from={330} line="Apa pun usahanya, Loka siap." />
    </Backdrop>
  );
}
