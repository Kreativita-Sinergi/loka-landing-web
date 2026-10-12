import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { AppBar, Backdrop, C, Caption, Chip, FadeUp, Headline, Outro, Phone, Pointer, QrGlyph, rupiah, usePop, useProgress, Side } from './kit';

export const QR_ORDER_DURATION = 450;

const MENU = [
  { name: 'Es Kopi Susu', price: 18000, tint: '#c8a27a' },
  { name: 'Nasi Goreng', price: 25000, tint: '#f2b24c' },
  { name: 'Mie Goreng', price: 22000, tint: '#e0874a' },
  { name: 'Teh Tarik', price: 15000, tint: '#d9b48f' },
];
// Ketukan pembeli: indeks menu dan frame-nya.
const TAPS = [
  { i: 0, f: 170 },
  { i: 1, f: 200 },
  { i: 0, f: 226 },
];

// Posisi ponsel & layarnya (koordinat komposisi 1280×720).
const PHONE = { x: 870, y: 70, w: 270 };
const SCREEN = { x: PHONE.x + PHONE.w * 0.035, y: PHONE.y + PHONE.w * 0.035 };
const ITEM_TOP = 150;
const ITEM_H = 84;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

function ScanScreen() {
  const frame = useCurrentFrame();
  const line = interpolate(frame % 40, [0, 40], [0, 1]);
  const found = usePop(112, { damping: 11 });
  return (
    <AbsoluteFill style={{ background: '#0c0d10', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 180, height: 180 }}>
        <div style={{ opacity: 0.85, filter: 'grayscale(1)' }}><QrGlyph size={180} seed={3} /></div>
        {[0, 1, 2, 3].map(k => (
          <div key={k} style={{ position: 'absolute', width: 40, height: 40, borderColor: '#fff', borderStyle: 'solid', borderWidth: 0, ...[{ left: -14, top: -14, borderLeftWidth: 5, borderTopWidth: 5, borderTopLeftRadius: 14 }, { right: -14, top: -14, borderRightWidth: 5, borderTopWidth: 5, borderTopRightRadius: 14 }, { left: -14, bottom: -14, borderLeftWidth: 5, borderBottomWidth: 5, borderBottomLeftRadius: 14 }, { right: -14, bottom: -14, borderRightWidth: 5, borderBottomWidth: 5, borderBottomRightRadius: 14 }][k] }} />
        ))}
        {found < 0.05 && <div style={{ position: 'absolute', left: -6, right: -6, top: `${line * 100}%`, height: 4, borderRadius: 4, background: C.accent, boxShadow: `0 0 18px ${C.accent}` }} />}
        <div style={{ position: 'absolute', inset: -14, borderRadius: 18, background: 'rgba(22,163,74,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', opacity: found, transform: `scale(${0.8 + found * 0.2})` }}>
          <div style={{ fontSize: 64, lineHeight: 1 }}>✓</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>Meja 07</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 48, color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 600 }}>Arahkan kamera ke QR meja</div>
    </AbsoluteFill>
  );
}

function MenuScreen() {
  const frame = useCurrentFrame();
  const counts = MENU.map((_, i) => TAPS.filter(t => t.i === i && frame >= t.f).length);
  const items = counts.reduce((a, b) => a + b, 0);
  const total = counts.reduce((s, c, i) => s + c * MENU[i].price, 0);
  const lastTap = [...TAPS].reverse().find(t => frame >= t.f);
  const bump = lastTap ? interpolate(frame - lastTap.f, [0, 5, 14], [1, 1.08, 1], clamp) : 1;
  const bar = usePop(170, { damping: 15 });
  const send = frame >= 262 ? interpolate(frame, [262, 268], [1, 0.94], clamp) : 1;
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 44 }} />
      <AppBar title="Kedai Loka" sub="Meja 07 · Dine in" tone="white" />
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px' }}>
        {['Semua', 'Kopi', 'Makanan'].map((p, i) => (
          <div key={p} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, background: i === 0 ? C.brand : '#fff', color: i === 0 ? '#fff' : C.body, border: `1px solid ${i === 0 ? C.brand : C.line}` }}>{p}</div>
        ))}
      </div>
      {MENU.map((m, i) => {
        const n = counts[i];
        const hit = TAPS.find(t => t.i === i && frame >= t.f && frame < t.f + 12);
        return (
          <div key={m.name} style={{ position: 'absolute', left: 14, right: 14, top: ITEM_TOP - 34 + i * ITEM_H, height: ITEM_H - 10, display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px', background: '#fff', borderRadius: 16, border: `1.5px solid ${n ? C.brand : C.line}`, transform: `scale(${hit ? 0.98 : 1})` }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `radial-gradient(circle at 35% 30%, #fff8, transparent 50%), ${m.tint}` }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{m.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.body, marginTop: 2 }}>{rupiah(m.price)}</div>
            </div>
            <div style={{ minWidth: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: n ? 16 : 22, background: n ? C.brand : C.tint, color: n ? '#fff' : C.brand }}>{n || '+'}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 22, height: 58, borderRadius: 18, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', transform: `translateY(${(1 - bar) * 100}px) scale(${bump * send})`, boxShadow: '0 16px 30px -10px rgba(13,93,243,0.6)' }}>
        <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9 }}>{items} item · {rupiah(total)}</div>
        <div style={{ fontSize: 15, fontWeight: 800 }}>Pesan →</div>
      </div>
    </AbsoluteFill>
  );
}

function StatusScreen() {
  const frame = useCurrentFrame();
  const steps = [
    { label: 'Pesanan diterima kasir', f: 292 },
    { label: 'Sedang dimasak', f: 318 },
    { label: 'Siap diantar ke meja', f: 352 },
  ];
  const head = usePop(276, { damping: 13 });
  return (
    <AbsoluteFill style={{ background: '#fff', padding: '70px 22px 0' }}>
      <div style={{ transform: `scale(${head})`, width: 72, height: 72, borderRadius: '50%', background: C.okSoft, color: C.ok, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>✓</div>
      <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, marginTop: 14, color: C.ink }}>Pesanan terkirim</div>
      <div style={{ textAlign: 'center', fontSize: 14, color: C.body, marginTop: 4 }}>#A-0217 · Meja 07</div>
      <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {steps.map((s, i) => {
          const on = frame >= s.f;
          const p = interpolate(frame, [s.f, s.f + 10], [0, 1], clamp);
          return (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: on ? C.ok : C.line, color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${on ? 0.8 + p * 0.2 : 1})` }}>{on ? '✓' : i + 1}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: on ? C.ink : C.mute }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

/** Tiket pesanan yang muncul di kasir & papan dapur. */
function KitchenTicket() {
  const frame = useCurrentFrame();
  const enter = usePop(290, { damping: 14 });
  const cooking = frame >= 318;
  const ready = frame >= 352;
  const statusPop = interpolate(frame, [ready ? 352 : 318, (ready ? 352 : 318) + 8], [1.2, 1], clamp);
  if (frame < 284) return null;
  return (
    <div style={{ position: 'absolute', left: 940, top: 150, width: 300, transform: `translateX(${(1 - enter) * 160}px) rotate(${(1 - enter) * 8}deg)`, opacity: Math.min(1, enter * 1.5) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 16, background: C.ink, color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14, boxShadow: '0 20px 40px -18px rgba(0,0,0,0.5)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.accent }} />Pesanan baru dari QR · Meja 07
      </div>
      <div style={{ background: '#fff', borderRadius: 22, padding: 22, boxShadow: '0 40px 80px -30px rgba(13,30,80,0.45)', border: `1px solid ${C.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.ink }}>Papan Dapur</div>
          <div style={{ fontSize: 13, fontWeight: 800, padding: '6px 12px', borderRadius: 999, transform: `scale(${statusPop})`, background: ready ? C.okSoft : cooking ? '#fff4d6' : C.tint, color: ready ? C.ok : cooking ? '#a36b00' : C.brand }}>{ready ? 'SIAP' : cooking ? 'DIMASAK' : 'BARU'}</div>
        </div>
        <div style={{ height: 1, background: C.line, margin: '14px 0' }} />
        {[['2×', 'Es Kopi Susu'], ['1×', 'Nasi Goreng']].map(([q, n]) => (
          <div key={n} style={{ display: 'flex', gap: 12, fontSize: 18, fontWeight: 700, color: C.ink, padding: '6px 0' }}>
            <span style={{ color: C.brand, width: 30 }}>{q}</span>{n}
          </div>
        ))}
        <div style={{ height: 8, borderRadius: 8, background: C.soft, marginTop: 16, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${interpolate(frame, [300, 352], [8, 100], clamp)}%`, background: ready ? C.ok : C.brand, borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

export default function QrOrderVideo() {
  const frame = useCurrentFrame();
  const phoneIn = usePop(40, { damping: 16, stiffness: 120 });
  const standIn = usePop(18, { damping: 13 });
  // Setelah pesanan dikirim, ponsel bergeser memberi tempat untuk tiket dapur.
  const shift = useProgress(276, 22);
  const scan = interpolate(frame, [124, 134], [1, 0], clamp);
  const status = interpolate(frame, [270, 280], [0, 1], clamp);
  const flyT = interpolate(frame, [270, 292], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const phoneX = PHONE.x - shift * 230;
  const tapPath = [
    { f: 150, x: SCREEN.x + 208, y: SCREEN.y + ITEM_TOP + 3 },
    ...TAPS.map(t => ({ f: t.f, x: SCREEN.x + 208, y: SCREEN.y + ITEM_TOP + 3 + t.i * ITEM_H, tap: true })),
    { f: 262, x: SCREEN.x + 200, y: SCREEN.y + 486, tap: true },
  ];

  return (
    <Backdrop>
      <Side style={{ left: 80, top: 120, width: 520 }}>
        <Chip from={2}>▣ QR Order</Chip>
        <Headline text="Pelanggan pesan sendiri dari meja." from={8} size={62} mark={['sendiri']} style={{ marginTop: 26 }} />
        <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { f: 60, t: 'Scan QR di meja, menu langsung terbuka' },
            { f: 150, t: 'Pilih menu, bisa bayar QRIS di muka' },
            { f: 290, t: 'Masuk ke kasir & papan dapur seketika' },
          ].map(b => (
            <FadeUp key={b.t} from={b.f}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 600, color: C.body }}>
                <span style={{ width: 30, height: 30, borderRadius: 10, background: C.brand, color: '#fff', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                {b.t}
              </div>
            </FadeUp>
          ))}
        </div>
      </Side>

      {/* Papan QR di meja */}
      <div style={{ position: 'absolute', left: 660, top: 230, transform: `scale(${standIn}) translateX(${-shift * 400}px)`, opacity: 1 - shift, transformOrigin: 'bottom center' }}>
        <div style={{ background: '#fff', borderRadius: 26, padding: 18, boxShadow: '0 40px 70px -30px rgba(13,30,80,0.45)', border: `1px solid ${C.line}`, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.brand, letterSpacing: '0.1em' }}>SCAN UNTUK PESAN</div>
          <div style={{ margin: '12px 0' }}><QrGlyph size={150} seed={3} /></div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.ink }}>Meja 07</div>
        </div>
        <div style={{ width: 120, height: 18, margin: '0 auto', background: '#d9dde6', borderRadius: '0 0 12px 12px' }} />
      </div>

      <Phone width={PHONE.w} style={{ left: phoneX, top: PHONE.y + (1 - phoneIn) * 700, transform: `rotate(${(1 - phoneIn) * -10}deg)` }}>
        <AbsoluteFill style={{ opacity: scan }}><ScanScreen /></AbsoluteFill>
        {frame >= 124 && frame < 282 && <AbsoluteFill style={{ opacity: 1 - scan }}><MenuScreen /></AbsoluteFill>}
        {frame >= 270 && <AbsoluteFill style={{ opacity: status }}><StatusScreen /></AbsoluteFill>}
      </Phone>

      {/* Pesanan "terbang" dari ponsel ke dapur */}
      {flyT > 0 && flyT < 1 && (
        <div style={{ position: 'absolute', left: interpolate(flyT, [0, 1], [phoneX + 140, 1000]), top: 520 - Math.sin(flyT * Math.PI) * 300, width: 26, height: 26, borderRadius: 8, background: C.accent, boxShadow: `0 0 0 8px rgba(255,201,60,0.3)`, transform: `rotate(${flyT * 360}deg)` }} />
      )}
      <KitchenTicket />
      <Pointer path={tapPath} />

      <Caption
        items={[
          { f: 70, to: 140, text: 'Tamu scan QR yang ada di mejanya' },
          { f: 150, to: 270, text: 'Menu terbuka di HP, tanpa unduh aplikasi' },
          { f: 290, to: 380, text: 'Pesanan masuk kasir & dapur, tamu bisa pantau statusnya' },
        ]}
      />
      <Outro from={392} line="Tanpa antre. Tanpa salah catat." />
    </Backdrop>
  );
}
