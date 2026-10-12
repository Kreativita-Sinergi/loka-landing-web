import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, rupiah, useCount, usePop } from './kit';

export const WEIGHT_DURATION = 400;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 580, y: 112, w: 640 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const UNIT_ONS = 60; // tampilan harga diganti ke per ons
const OPEN = 100; // buka kopi
const TYPE = [128, 142, 156]; // ketik "2", ",", "5"
const TO_GRAM = 190;
const ADD = 230;
const SECOND = 274; // daging ditimbang

const PRODUCTS = [
  { name: 'Beras Pandan Wangi', kg: 14000, tint: '#efe6da' },
  { name: 'Kopi Arabika Gayo', kg: 180000, tint: '#6f4a33' },
  { name: 'Daging Sapi', kg: 140000, tint: '#c2524a' },
  { name: 'Cabai Rawit', kg: 60000, tint: '#e0453a' },
];

const DLG = { left: 124, top: 26, w: 360, h: 338 };

function Seg({ items, active, small }: { items: string[]; active: number; small?: boolean }) {
  return (
    <div style={{ display: 'flex', padding: 3, borderRadius: 12, background: C.soft, border: `1px solid ${C.line}` }}>
      {items.map((u, i) => (
        <div key={u} style={{ flex: 1, minWidth: small ? 50 : 0, textAlign: 'center', padding: small ? '5px 8px' : '8px 0', borderRadius: 9, fontSize: small ? 12 : 14, fontWeight: 800, background: i === active ? C.brand : 'transparent', color: i === active ? '#fff' : C.body }}>{u}</div>
      ))}
    </div>
  );
}

function Screen() {
  const frame = useCurrentFrame();
  const perOns = frame >= UNIT_ONS;
  const dlg = usePop(OPEN + 4, { damping: 15 });
  const dlgOut = interpolate(frame, [ADD + 2, ADD + 12], [1, 0], clamp);
  const typed = ['2', '2,', '2,5'][TYPE.filter(t => frame >= t).length - 1] ?? '';
  const gram = frame >= TO_GRAM;
  const total = useCount(0, 45000, TYPE[2], TYPE[2] + 14);
  const cart1 = usePop(ADD + 6, { damping: 14 });
  const cart2 = usePop(SECOND + 30, { damping: 14 });
  const sum = frame >= SECOND + 30 ? countAt(frame, 45000, 150000, SECOND + 30, SECOND + 50) : frame >= ADD + 6 ? 45000 : 0;
  const scaleG = Math.round(interpolate(frame, [SECOND, SECOND + 26], [0, 750], clamp));
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>Toko Sumber Rejeki</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: C.mute }}>
          Harga per <Seg items={['kg', 'ons', 'gram']} active={perOns ? 1 : 0} small />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16 }}>
        {PRODUCTS.map((p, i) => {
          const flip = interpolate(frame, [UNIT_ONS, UNIT_ONS + 10], [0, 1], clamp);
          return (
            <div key={p.name} style={{ height: 112, borderRadius: 16, background: '#fff', border: `1.5px solid ${i === 1 && frame >= OPEN ? C.brand : C.line}`, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 70, height: 70, borderRadius: 14, background: `radial-gradient(circle at 35% 30%, #fff8, transparent 55%), ${p.tint}` }} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{p.name}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.brand, marginTop: 6, transform: `rotateX(${Math.sin(flip * Math.PI) * 80}deg)` }}>
                  {perOns && flip > 0.5 ? `${rupiah(p.kg / 10)}/ons` : `${rupiah(p.kg)}/kg`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Keranjang */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
        {frame >= ADD + 6 && <div style={{ transform: `scale(${cart1})`, padding: '9px 12px', borderRadius: 12, background: '#fff', border: `1px solid ${C.line}`, fontSize: 12.5, fontWeight: 700, color: C.ink }}>Kopi Arabika · 250 g · Rp45.000</div>}
        {frame >= SECOND + 30 && <div style={{ transform: `scale(${cart2})`, padding: '9px 12px', borderRadius: 12, background: '#fff', border: `1px solid ${C.line}`, fontSize: 12.5, fontWeight: 700, color: C.ink }}>Daging · 750 g · Rp105.000</div>}
        <div style={{ marginLeft: 'auto', padding: '10px 14px', borderRadius: 12, background: C.brand, color: '#fff', fontSize: 14, fontWeight: 800 }}>{rupiah(sum)}</div>
      </div>
      {/* Timbangan untuk barang kedua */}
      {frame >= SECOND - 6 && frame < SECOND + 40 && (
        <div style={{ position: 'absolute', left: 190, top: 120, width: 230, padding: 16, borderRadius: 18, background: C.night, color: '#fff', textAlign: 'center', opacity: interpolate(frame, [SECOND - 6, SECOND, SECOND + 32, SECOND + 40], [0, 1, 1, 0], clamp), boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.7 }}>Timbangan · Daging Sapi</div>
          <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 40, fontWeight: 800, color: '#7CFFB2', marginTop: 6 }}>{scaleG} g</div>
        </div>
      )}
      {/* Dialog berat */}
      {frame >= OPEN + 4 && dlgOut > 0 && (
        <AbsoluteFill style={{ background: `rgba(16,17,20,${0.35 * dlgOut})` }}>
          <div style={{ position: 'absolute', left: DLG.left, top: DLG.top, width: DLG.w, height: DLG.h, borderRadius: 20, background: '#fff', padding: 18, transform: `translateY(${(1 - dlg) * 50}px) scale(${0.94 + dlg * 0.06})`, opacity: Math.min(dlg, dlgOut) }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>Kopi Arabika Gayo</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.body, marginTop: 2 }}>Rp18.000/ons · Rp180.000/kg</div>
            <div style={{ marginTop: 14 }}><Seg items={['kg', 'ons', 'gram']} active={gram ? 2 : 1} /></div>
            <div style={{ marginTop: 14, height: 76, borderRadius: 14, background: C.night, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 18px', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 38, fontWeight: 800, color: '#7CFFB2' }}>
              {gram ? '250' : typed}
              {!gram && frame % 20 < 10 && <span style={{ opacity: 0.8 }}>|</span>}
              <span style={{ fontSize: 18, marginLeft: 10, opacity: 0.8 }}>{gram ? 'gram' : 'ons'}</span>
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.body }}>Subtotal</span>
              <span style={{ fontSize: 26, fontWeight: 900, color: C.ink }}>{rupiah(total)}</span>
            </div>
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, height: 44, borderRadius: 13, background: C.brand, color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Tambah ke pesanan</div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

/** Seperti useCount, tetapi fungsi biasa sehingga boleh dipanggil bersyarat. */
function countAt(frame: number, a: number, b: number, from: number, to: number) {
  return interpolate(frame, [from, to], [a, b], clamp);
}

export default function WeightVideo() {
  const tabIn = usePop(24, { damping: 16, stiffness: 110 });
  return (
    <Backdrop>
      <SideText
        chip="⚖️ Satuan Berat"
        title="Jual per kilo, ons, atau gram."
        mark={['kilo,', 'ons,', 'gram.']}
        bullets={[
          { f: UNIT_ONS, t: 'Harga tampil sesuai satuan pilihan' },
          { f: TYPE[0], t: 'Ketik berat, subtotal langsung terhitung' },
          { f: SECOND, t: 'Cocok untuk kopi, sayur, daging, curah' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 28}deg)` }}>
        <Screen />
      </Tablet>
      <Pointer
        path={[
          { f: UNIT_ONS - 18, x: SCR.x + 507, y: SCR.y + 28 },
          { f: UNIT_ONS, x: SCR.x + 507, y: SCR.y + 28, tap: true },
          { f: OPEN - 4, x: SCR.x + 452, y: SCR.y + 128, tap: true },
          { f: TO_GRAM - 18, x: SCR.x + DLG.left + 18 + 54 + 216, y: SCR.y + DLG.top + 92 },
          { f: TO_GRAM, x: SCR.x + DLG.left + 18 + 54 + 216, y: SCR.y + DLG.top + 92, tap: true },
          { f: ADD, x: SCR.x + DLG.left + DLG.w / 2, y: SCR.y + DLG.top + DLG.h - 38, tap: true },
        ]}
      />
      <Caption
        items={[
          { f: 50, to: OPEN, text: 'Pilih harga tampil per kg, ons, atau gram' },
          { f: OPEN + 10, to: ADD, text: 'Masukkan beratnya, ganti satuan kapan saja' },
          { f: ADD + 10, to: 334, text: 'Struk mencatat berat & harga dengan tepat' },
        ]}
      />
      <Outro from={340} line="Timbang, ketik, beres. Tanpa kalkulator." />
    </Backdrop>
  );
}
