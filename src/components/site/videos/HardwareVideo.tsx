import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, rupiah, usePop } from './kit';

export const HARDWARE_DURATION = 450;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 570, y: 104, w: 660 };
const SCREEN = { x: TAB.x + 16, y: TAB.y + 16 };
const GRID_W = 360;

const PRODUCTS = [
  { n: 'Semen 50 kg', u: 'sak', p: 65000, c: '#cbd5e1' },
  { n: 'Pipa PVC 3"', u: 'batang', p: 55000, c: '#bfdbfe' },
  { n: 'Kabel NYM 2×2,5', u: 'meter', p: 9500, c: '#fde68a' },
  { n: 'Kaca 5 mm', u: 'm²', p: 185000, c: '#bae6fd' },
  { n: 'Cat Tembok 5 kg', u: 'pail', p: 98000, c: '#fecaca' },
  { n: 'Besi Beton 10', u: 'batang', p: 72000, c: '#d6d3d1' },
];

const T = {
  tapCable: 64,
  type: 78, // "1", "2", ",", "5"
  addCable: 128,
  delivery: 176, // tombol Surat Jalan
  doc: 196,
  pdf: 300,
};
const TYPED = ['1', '12', '12,', '12,5'];
const CABLE_M = 12.5;

const CARD = { w: 108, h: 92, gap: 8, top: 52 };
const cardPos = (i: number) => ({ x: 12 + (i % 3) * (CARD.w + CARD.gap), y: CARD.top + Math.floor(i / 3) * (CARD.h + CARD.gap) });
const at = (x: number, y: number) => ({ x: SCREEN.x + x, y: SCREEN.y + y });

function Register() {
  const frame = useCurrentFrame();
  const typedIdx = Math.min(TYPED.length - 1, Math.floor((frame - T.type) / 9));
  const typed = frame >= T.type ? TYPED[typedIdx] : '';
  const dialog = interpolate(frame, [T.tapCable + 2, T.tapCable + 12, T.addCable + 2, T.addCable + 10], [0, 1, 1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const cableIn = interpolate(frame, [T.addCable + 4, T.addCable + 16], [0, 1], clamp);
  const press = (f: number) => (frame >= f ? interpolate(frame, [f, f + 4, f + 10], [1, 0.92, 1], clamp) : 1);
  const lines = [
    { n: 'Semen 50 kg', q: '10 sak', v: 650000 },
    { n: 'Pipa PVC 3"', q: '4 batang', v: 220000 },
    { n: 'Kaca 5 mm', q: '0,96 m²', v: 177600 },
    ...(frame >= T.addCable + 4 ? [{ n: 'Kabel NYM 2×2,5', q: '12,5 m', v: CABLE_M * 9500 }] : []),
  ];
  const total = lines.reduce((s, l) => s + l.v * (l.n.startsWith('Kabel') ? cableIn : 1), 0);
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: GRID_W, height: '100%' }}>
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 16, fontWeight: 800, color: C.ink, background: '#fff', borderBottom: `1px solid ${C.line}` }}>Toko Bangunan Sumber Jaya</div>
        {PRODUCTS.map((p, i) => {
          const pos = cardPos(i);
          return (
            <div key={p.n} style={{ position: 'absolute', left: pos.x, top: pos.y, width: CARD.w, height: CARD.h, borderRadius: 12, background: '#fff', border: `1px solid ${C.line}`, overflow: 'hidden', transform: `scale(${i === 2 ? press(T.tapCable) : 1})` }}>
              <div style={{ height: 34, background: p.c }} />
              <div style={{ padding: '6px 8px' }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: C.ink, whiteSpace: 'nowrap' }}>{p.n}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.brand, marginTop: 2 }}>{rupiah(p.p)}<span style={{ color: C.mute }}>/{p.u}</span></div>
              </div>
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, padding: '9px 12px', borderRadius: 12, background: '#fff', border: `1px dashed ${C.line}`, fontSize: 11.5, fontWeight: 700, color: C.body, lineHeight: 1.45 }}>
          <div>📍 Alamat kirim: Jl. Melati 12, Sleman</div>
          <div>🏗️ Proyek: Renovasi Rumah Pak Budi</div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: GRID_W, top: 0, right: 0, bottom: 0, background: '#fff', borderLeft: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 14, fontWeight: 800, color: C.ink, borderBottom: `1px solid ${C.line}` }}>Pesanan · Pak Budi</div>
        <div style={{ flex: 1, padding: '6px 14px' }}>
          {lines.map(l => {
            const isNew = l.n.startsWith('Kabel');
            return (
              <div key={l.n} style={{ padding: '7px 0', borderBottom: `1px solid ${C.line}`, opacity: isNew ? cableIn : 1, transform: `translateX(${isNew ? (1 - cableIn) * 30 : 0}px)`, background: isNew && cableIn < 1 ? C.tint : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 800, color: C.ink }}><span>{l.n}</span><span>{rupiah(l.v)}</span></div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.mute, marginTop: 1 }}>{l.q}</div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: '8px 14px 12px', borderTop: `1px solid ${C.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 900, color: C.ink }}><span>Total</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{rupiah(total)}</span></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <div style={{ flex: 1, height: 36, borderRadius: 10, border: `1.5px solid ${C.brand}`, color: C.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, transform: `scale(${press(T.delivery)})` }}>Surat Jalan</div>
            <div style={{ flex: 1, height: 36, borderRadius: 10, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900 }}>Bayar</div>
          </div>
        </div>
      </div>

      {/* Dialog jumlah meter */}
      <AbsoluteFill style={{ background: `rgba(16,17,20,${0.35 * dialog})`, opacity: dialog > 0.01 ? 1 : 0 }}>
        <div style={{ position: 'absolute', left: 60, top: 40, width: 260, borderRadius: 16, background: '#fff', padding: 14, transform: `translateY(${(1 - dialog) * 40}px) scale(${0.94 + dialog * 0.06})`, opacity: dialog }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: C.ink }}>Kabel NYM 2×2,5</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: C.mute, marginTop: 2 }}>Rp9.500 per meter</div>
          <div style={{ marginTop: 10, height: 44, borderRadius: 11, border: `2px solid ${C.brand}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 22, fontWeight: 900, color: C.ink }}>
            <span>{typed || '0'}<span style={{ opacity: frame % 20 < 10 ? 1 : 0, color: C.brand }}>|</span></span>
            <span style={{ fontSize: 14, color: C.mute }}>meter</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 13, fontWeight: 800, color: C.body }}>
            <span>Subtotal</span><span style={{ color: C.ink }}>{rupiah((parseFloat(typed.replace(',', '.')) || 0) * 9500)}</span>
          </div>
          <div style={{ marginTop: 10, height: 38, borderRadius: 11, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, transform: `scale(${press(T.addCable)})` }}>Tambahkan</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function DeliveryNote() {
  const frame = useCurrentFrame();
  const p = usePop(T.doc, { damping: 15, stiffness: 110 });
  const sent = usePop(T.pdf + 6, { damping: 13 });
  if (frame < T.doc - 2) return null;
  const rows: [string, string][] = [
    ['Semen 50 kg', '10 sak'],
    ['Pipa PVC 3"', '4 batang'],
    ['Kaca 5 mm', '0,96 m²'],
    ['Kabel NYM 2×2,5', '12,5 m'],
  ];
  return (
    <>
      <div style={{ position: 'absolute', left: 600, top: 70, width: 340, padding: '20px 22px 22px', background: '#fff', borderRadius: 8, boxShadow: '0 50px 100px -30px rgba(13,30,80,0.55)', color: C.ink, transform: `translateY(${(1 - p) * 160}px) rotate(${(1 - p) * -10 - 3}deg)`, opacity: Math.min(1, p * 1.6), zIndex: 5 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '0.06em' }}>SURAT JALAN</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.mute }}>SJ-0412</div>
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: C.body, marginTop: 8, lineHeight: 1.5 }}>
          <div>Kepada: <b style={{ color: C.ink }}>Pak Budi</b></div>
          <div>Proyek: Renovasi Rumah Pak Budi</div>
          <div>Alamat: Jl. Melati 12, Sleman</div>
        </div>
        <div style={{ marginTop: 12, borderRadius: 8, border: `1px solid ${C.line}`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: C.soft, fontSize: 11, fontWeight: 800, color: C.mute }}><span>BARANG</span><span>JUMLAH</span></div>
          {rows.map(([n, q], i) => {
            const show = interpolate(frame, [T.doc + 12 + i * 5, T.doc + 20 + i * 5], [0, 1], clamp);
            return <div key={n} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', fontSize: 12.5, fontWeight: 700, borderTop: `1px solid ${C.line}`, opacity: show }}><span>{n}</span><span>{q}</span></div>;
          })}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, fontWeight: 800, color: C.ok }}>✓ Tanpa harga — aman dibawa sopir</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 10.5, fontWeight: 700, color: C.mute }}>
          {['Pengirim', 'Sopir', 'Penerima'].map(s => <div key={s} style={{ width: 86, textAlign: 'center', borderTop: `1px solid ${C.line}`, paddingTop: 30 }}>{s}</div>)}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 620, top: 462, display: 'flex', gap: 10, zIndex: 6, opacity: Math.min(1, p * 1.6) }}>
        <div style={{ padding: '12px 18px', borderRadius: 999, background: '#fff', color: C.ink, fontSize: 16, fontWeight: 900, boxShadow: '0 16px 30px -12px rgba(0,0,0,0.3)' }}>🖨️ Cetak</div>
        <div style={{ padding: '12px 18px', borderRadius: 999, background: C.ok, color: '#fff', fontSize: 16, fontWeight: 900, boxShadow: '0 16px 30px -12px rgba(0,0,0,0.3)', transform: `scale(${frame >= T.pdf ? interpolate(frame, [T.pdf, T.pdf + 4, T.pdf + 10], [1, 0.92, 1], clamp) : 1})` }}>PDF</div>
      </div>
      <div style={{ position: 'absolute', left: 620, top: 528, zIndex: 7, padding: '11px 18px', borderRadius: 14, background: C.night, color: '#fff', fontSize: 15, fontWeight: 700, transform: `translateY(${(1 - sent) * 30}px)`, opacity: Math.min(1, sent * 1.5) }}>
        <span style={{ color: C.accent }}>✓</span> PDF surat jalan terkirim ke WhatsApp
      </div>
    </>
  );
}

export default function HardwareVideo() {
  const tabIn = usePop(12, { damping: 16, stiffness: 110 });
  const cable = cardPos(2);
  const cableAt = at(cable.x + CARD.w / 2, cable.y + CARD.h / 2);
  const addAt = at(60 + 130, 40 + 14 + 18 + 16 + 10 + 44 + 10 + 18 + 10 + 19);
  const sjAt = at(GRID_W + 14 + 61, 404 - 12 - 18);
  return (
    <Backdrop>
      <SideText
        chip="🧱 Toko Bangunan"
        title="Jual per sak, batang, meter, sampai m²."
        mark={['meter,', 'm².']}
        width={470}
        bullets={[
          { f: T.tapCable, t: 'Ketik panjangnya, subtotal langsung jadi' },
          { f: T.addCable, t: 'Alamat kirim & nama proyek per pesanan' },
          { f: T.doc, t: 'Surat jalan tanpa harga: cetak atau PDF' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 28}deg)` }}>
        <Register />
      </Tablet>
      <DeliveryNote />
      <Pointer
        path={[
          { f: T.tapCable - 20, x: cableAt.x + 60, y: cableAt.y + 120 },
          { f: T.tapCable, ...cableAt, tap: true },
          { f: T.addCable, ...addAt, tap: true },
          { f: T.delivery, ...sjAt, tap: true },
        ]}
      />
      <Pointer path={[{ f: T.pdf - 20, x: 840, y: 600 }, { f: T.pdf, x: 765, y: 484, tap: true }]} />
      <Caption
        items={[
          { f: 40, to: T.doc - 4, text: 'Kabel 12,5 meter? Ketik saja, harga langsung terhitung' },
          { f: T.doc + 4, to: 384, text: 'Sopir bawa surat jalan, harga tetap rahasia' },
        ]}
      />
      <Outro from={390} line="Toko bangunan pun bisa rapi." />
    </Backdrop>
  );
}
