import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, rupiah, usePop } from './kit';

export const CONSIGNMENT_DURATION = 430;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 580, y: 112, w: 640 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const SELL = { from: 60, to: 200 }; // penjualan sepanjang hari
const SETTLE = 250;

const ITEMS = [
  { name: 'Lemper Ayam', titip: 20, sold: 14, price: 3000, hak: 2500 },
  { name: 'Risoles Mayo', titip: 15, sold: 12, price: 3500, hak: 3000 },
  { name: 'Kue Lumpur', titip: 10, sold: 10, price: 4000, hak: 3500 },
];

const GRID = '1.5fr 0.7fr 0.9fr 0.7fr 1.1fr';

function Screen() {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [SELL.from, SELL.to], [0, 1], clamp);
  const sold = ITEMS.map((it, i) => Math.round(interpolate(t, [i * 0.08, 0.84 + i * 0.08], [0, it.sold], clamp)));
  const omzet = sold.reduce((s, n, i) => s + n * ITEMS[i].price, 0);
  const setor = sold.reduce((s, n, i) => s + n * ITEMS[i].hak, 0);
  const hour = Math.floor(interpolate(t, [0, 1], [8, 17]));
  const modal = usePop(SETTLE + 6, { damping: 14 });
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ffe2c4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩🏻‍🍳</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>Bu Ani · Kue Basah</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.body }}>Penitip · titip harian</div>
        </div>
        <div style={{ padding: '6px 12px', borderRadius: 999, background: C.tint, color: C.brand, fontSize: 13, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>🕒 {String(hour).padStart(2, '0')}.00</div>
      </div>
      <div style={{ margin: 14, borderRadius: 16, background: '#fff', border: `1px solid ${C.line}`, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: GRID, padding: '10px 14px', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', color: C.mute, background: C.soft }}>
          <span>BARANG</span><span>TITIP</span><span>TERJUAL</span><span>SISA</span><span>HAK PENITIP</span>
        </div>
        {ITEMS.map((it, i) => {
          const bump = sold[i] > 0 && Math.round(interpolate(t, [i * 0.08, 0.84 + i * 0.08], [0, it.sold], clamp) * 10) % 10 === 0;
          return (
            <div key={it.name} style={{ display: 'grid', gridTemplateColumns: GRID, alignItems: 'center', padding: '12px 14px', borderTop: `1px solid ${C.line}`, fontSize: 14, fontWeight: 700, color: C.ink }}>
              <span>{it.name}</span>
              <span style={{ color: C.body }}>{it.titip}</span>
              <span style={{ color: C.brand, fontVariantNumeric: 'tabular-nums', transform: `scale(${bump ? 1.06 : 1})`, display: 'inline-block' }}>{sold[i]}</span>
              <span style={{ color: it.titip - sold[i] === 0 ? C.ok : C.body }}>{it.titip - sold[i] === 0 ? 'Habis' : it.titip - sold[i]}</span>
              <span style={{ fontSize: 12.5, color: C.body }}>{rupiah(it.hak)}/pcs</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', gap: 10, alignItems: 'stretch' }}>
        {[
          { l: 'Penjualan', v: omzet, c: C.ink },
          { l: 'Hak penitip', v: setor, c: C.brand },
          { l: 'Untung toko', v: omzet - setor, c: C.ok },
        ].map(b => (
          <div key={b.l} style={{ flex: 1, padding: '10px 12px', borderRadius: 14, background: '#fff', border: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: C.mute }}>{b.l}</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: b.c, marginTop: 2 }}>{rupiah(b.v)}</div>
          </div>
        ))}
        <div style={{ width: 150, borderRadius: 14, background: C.brand, color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.2, transform: `scale(${frame >= SETTLE && frame < SETTLE + 8 ? 0.95 : 1})` }}>Setor &<br />retur sisa</div>
      </div>
      {frame >= SETTLE + 6 && (
        <AbsoluteFill style={{ background: `rgba(16,17,20,${0.35 * Math.min(1, modal)})`, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 320, borderRadius: 20, background: '#fff', padding: 22, textAlign: 'center', transform: `scale(${0.85 + modal * 0.15})`, opacity: Math.min(1, modal * 1.5) }}>
            <div style={{ width: 60, height: 60, margin: '0 auto', borderRadius: '50%', background: C.okSoft, color: C.ok, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.ink, marginTop: 12 }}>Setoran tercatat</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: C.brand, marginTop: 6 }}>Rp106.000</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.body, marginTop: 6 }}>untuk Bu Ani · retur 9 pcs dikembalikan</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

export default function ConsignmentVideo() {
  const tabIn = usePop(24, { damping: 16, stiffness: 110 });
  return (
    <Backdrop>
      <SideText
        chip="🤝 Barang Titipan"
        title="Barang titipan tercatat, setoran ke penitip jelas."
        mark={['titipan']}
        bullets={[
          { f: 50, t: 'Catat penitip & hak per barang' },
          { f: SELL.from + 40, t: 'Yang terjual terhitung otomatis' },
          { f: SETTLE, t: 'Setoran & retur sisa sekali tekan' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateY(${(1 - tabIn) * -22}deg)` }}>
        <Screen />
      </Tablet>
      <Pointer
        path={[
          { f: SETTLE - 18, x: SCR.x + 608 - 14 - 75, y: SCR.y + 390 - 14 - 28 },
          { f: SETTLE, x: SCR.x + 608 - 14 - 75, y: SCR.y + 390 - 14 - 28, tap: true },
        ]}
      />
      <Caption
        items={[
          { f: 40, to: SELL.from + 20, text: 'Bu Ani menitip kue setiap pagi' },
          { f: SELL.from + 26, to: SETTLE - 4, text: 'Setiap yang terjual langsung terhitung hak penitipnya' },
          { f: SETTLE + 10, to: 364, text: 'Sore hari: setor & retur sisa, semua tercatat' },
        ]}
      />
      <Outro from={370} line="Titipan laris, hitungannya tetap rapi." />
    </Backdrop>
  );
}
