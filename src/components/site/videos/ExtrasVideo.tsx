import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Phone, Pointer, SideText, rupiah, usePop } from './kit';

export const EXTRAS_DURATION = 450;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const PHONE = { x: 930, y: 70, w: 280 };
const SCREEN = { x: PHONE.x + PHONE.w * 0.035, y: PHONE.y + PHONE.w * 0.035 };
const W = 260; // lebar layar ponsel

// Tata letak di dalam layar (koordinat layar).
const LEVEL_TOP = 118;
const LEVEL_W = (W - 24 - 18) / 4;
const ROW_TOP = 190;
const ROW_H = 40;
const ROW_GAP = 6;
const BTN_TOP = 505;

const LEVELS = ['Level 0', 'Level 1', 'Level 2', 'Level 3'];
const ISIAN = [
  { n: 'Snack', p: 1500 },
  { n: 'Kwetiau', p: 3500 },
  { n: 'Telur', p: 3000 },
  { n: 'Sosis', p: 2000 },
  { n: 'Bakso', p: 2000 },
  { n: 'Ceker', p: 3000 },
];

// Ketukan, berurutan.
const T = {
  snack: 70,
  plus1: 96,
  plus2: 116,
  kwetiau: 140,
  addEarly: 166, // grup Level belum dipilih
  level: 200,
  add: 232,
  receipt: 252,
};

const rowY = (i: number) => ROW_TOP + i * (ROW_H + ROW_GAP);
const at = (x: number, y: number) => ({ x: SCREEN.x + x, y: SCREEN.y + y });

function useQty() {
  const frame = useCurrentFrame();
  const snack = frame >= T.plus2 ? 3 : frame >= T.plus1 ? 2 : frame >= T.snack ? 1 : 0;
  const kwetiau = frame >= T.kwetiau ? 1 : 0;
  return [snack, kwetiau, 0, 0, 0, 0];
}

function Picker() {
  const frame = useCurrentFrame();
  const qty = useQty();
  const level = frame >= T.level ? 3 : -1;
  const total = qty.reduce((s, q, i) => s + q * ISIAN[i].p, 0);
  // Grup wajib yang kosong: bingkai merah + goyang saat "Tambahkan" ditekan terlalu awal.
  const warn = frame >= T.addEarly && level < 0;
  const shake = warn ? Math.sin((frame - T.addEarly) * 1.6) * interpolate(frame, [T.addEarly, T.addEarly + 16], [6, 0], clamp) : 0;
  const ready = level >= 0;
  const press = (f: number) => (frame >= f ? interpolate(frame, [f, f + 4, f + 10], [1, 0.93, 1], clamp) : 1);
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <div style={{ position: 'absolute', left: 14, right: 14, top: 44 }}>
        <div style={{ fontSize: 17, fontWeight: 900, color: C.ink }}>Seblak Prasmanan</div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: C.mute, marginTop: 2 }}>Harga dari ekstra</div>
      </div>

      <div style={{ position: 'absolute', left: 12, right: 12, top: LEVEL_TOP - 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: warn ? C.danger : C.ink }}>
        <span>Level</span>
        <span style={{ fontSize: 10.5, padding: '2px 7px', borderRadius: 6, background: warn ? '#fde8e8' : C.soft, color: warn ? C.danger : C.body }}>Wajib pilih 1</span>
      </div>
      <div style={{ position: 'absolute', left: 6, top: LEVEL_TOP - 6, width: W - 12, height: 46, borderRadius: 12, border: `2px solid ${warn ? C.danger : 'transparent'}`, transform: `translateX(${shake}px)` }} />
      {LEVELS.map((l, i) => {
        const on = level === i;
        return (
          <div key={l} style={{ position: 'absolute', left: 12 + i * (LEVEL_W + 6), top: LEVEL_TOP, width: LEVEL_W, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 800, background: on ? C.brand : C.soft, color: on ? '#fff' : C.body, transform: `translateX(${shake}px) scale(${i === 3 ? press(T.level) : 1})` }}>{l}</div>
        );
      })}

      <div style={{ position: 'absolute', left: 12, right: 12, top: ROW_TOP - 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 800, color: C.ink }}>
        <span>Isian</span>
        <span style={{ fontSize: 10.5, padding: '2px 7px', borderRadius: 6, background: C.soft, color: C.body }}>Boleh lebih dari satu</span>
      </div>
      {ISIAN.map((it, i) => {
        const q = qty[i];
        const on = q > 0;
        const tapF = i === 0 ? T.snack : T.kwetiau;
        return (
          <div key={it.n} style={{ position: 'absolute', left: 12, top: rowY(i), width: W - 24, height: ROW_H, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 12px', boxSizing: 'border-box', background: on ? C.tint : '#fff', border: `1.5px solid ${on ? C.brand : C.line}`, transform: `scale(${i < 2 ? press(tapF) : 1})` }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.ink }}>{it.n}</span>
            {on ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.brand }}>{rupiah(it.p * q)}</span>
                <span style={{ width: 22, height: 22, borderRadius: 11, background: '#fff', border: `1.5px solid ${C.brand}`, color: C.brand, fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</span>
                <span style={{ width: 12, textAlign: 'center', fontSize: 14, fontWeight: 900, color: C.ink }}>{q}</span>
                <span style={{ width: 22, height: 22, borderRadius: 11, background: C.brand, color: '#fff', fontSize: 15, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${i === 0 ? Math.min(press(T.plus1), press(T.plus2)) : 1})` }}>+</span>
              </span>
            ) : (
              <span style={{ fontSize: 12, fontWeight: 700, color: C.mute }}>+{rupiah(it.p)}</span>
            )}
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: 14, right: 14, top: BTN_TOP - 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, fontWeight: 800, color: C.body }}>
        <span>Jumlah porsi</span>
        <span style={{ display: 'flex', gap: 10, alignItems: 'center', color: C.ink }}><span style={{ color: C.mute }}>−</span>1<span style={{ color: C.mute }}>+</span></span>
      </div>
      <div style={{ position: 'absolute', left: 12, right: 12, top: BTN_TOP, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13.5, fontWeight: 900, background: ready ? C.brand : '#c9d6f2', color: '#fff', transform: `scale(${Math.min(press(T.addEarly), press(T.add))})` }}>
        {ready ? `Tambahkan · ${rupiah(total)}` : warn ? 'Pilih Level dulu' : `Tambahkan · ${rupiah(total)}`}
      </div>
    </AbsoluteFill>
  );
}

function Receipt() {
  const frame = useCurrentFrame();
  const p = usePop(T.receipt, { damping: 15, stiffness: 120 });
  const lines: [string, string][] = [
    ['Seblak Prasmanan', ''],
    ['  + Snack ×3', '4.500'],
    ['  + Kwetiau ×1', '3.500'],
    ['  + Level 3', ''],
  ];
  return (
    <div style={{ position: 'absolute', left: 590, top: 150, width: 300, padding: '22px 22px 26px', background: '#fff', borderRadius: 6, boxShadow: '0 40px 80px -30px rgba(13,30,80,0.5)', fontFamily: 'ui-monospace, Menlo, monospace', color: C.ink, transform: `translateY(${(1 - p) * 120}px) rotate(${(1 - p) * -8 - 2}deg)`, opacity: Math.min(1, p * 1.6), zIndex: 5 }}>
      <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 800 }}>SEBLAK LOKA</div>
      <div style={{ textAlign: 'center', fontSize: 11, color: C.mute, marginTop: 4 }}>Nota #0142 · Meja 3</div>
      <div style={{ borderTop: '2px dashed #cfd3dc', margin: '14px 0' }} />
      {lines.map(([l, r], i) => {
        const show = interpolate(frame, [T.receipt + 10 + i * 6, T.receipt + 18 + i * 6], [0, 1], clamp);
        return (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: i ? 500 : 800, color: i ? C.body : C.ink, marginTop: i ? 6 : 0, opacity: show, whiteSpace: 'pre' }}>
            <span>{l}</span><span>{r}</span>
          </div>
        );
      })}
      <div style={{ borderTop: '2px dashed #cfd3dc', margin: '14px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 900 }}><span>TOTAL</span><span>Rp8.000</span></div>
    </div>
  );
}

export default function ExtrasVideo() {
  const frame = useCurrentFrame();
  const phoneIn = usePop(10, { damping: 16, stiffness: 110 });
  // Setelah ditambahkan, ponsel bergeser sedikit memberi ruang untuk struk.
  const shift = interpolate(frame, [T.add + 8, T.add + 30], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const snackRow = at(110, rowY(0) + ROW_H / 2);
  const plus = at(W - 12 - 10 - 11, rowY(0) + ROW_H / 2);
  const kw = at(110, rowY(1) + ROW_H / 2);
  const btn = at(W / 2, BTN_TOP + 20);
  const lvl = at(12 + 3 * (LEVEL_W + 6) + LEVEL_W / 2, LEVEL_TOP + 17);
  return (
    <Backdrop>
      <SideText
        chip="🌶️ Grup Ekstra"
        title="Level, isian, dan jumlahnya tercatat rapi."
        mark={['rapi.']}
        width={470}
        bullets={[
          { f: T.snack, t: 'Satu grup ekstra untuk banyak produk' },
          { f: T.plus1, t: 'Tiap ekstra punya tombol −/+ sendiri' },
          { f: T.addEarly, t: 'Grup wajib ditandai sampai dipilih' },
          { f: T.receipt, t: 'Struk merinci ekstra beserta harganya' },
        ]}
      />
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(${shift * 6}px) rotate(${shift * 2}deg)`, transformOrigin: '1070px 360px' }}>
        <Phone width={PHONE.w} style={{ left: PHONE.x, top: PHONE.y + (1 - phoneIn) * 600 }}>
          <Picker />
        </Phone>
      </div>
      <Receipt />
      <Pointer
        path={[
          { f: T.snack - 20, x: snackRow.x + 40, y: snackRow.y + 90 },
          { f: T.snack, ...snackRow, tap: true },
          { f: T.plus1, ...plus, tap: true },
          { f: T.plus2, ...plus, tap: true },
          { f: T.kwetiau, ...kw, tap: true },
          { f: T.addEarly, ...btn, tap: true },
          { f: T.level, ...lvl, tap: true },
          { f: T.add, ...btn, tap: true },
        ]}
      />
      <Caption
        items={[
          { f: 40, to: T.addEarly - 2, text: 'Snack ×3 + Kwetiau dalam satu porsi' },
          { f: T.addEarly + 2, to: T.add, text: 'Lupa pilih level? Diingatkan' },
          { f: T.receipt, to: 384, text: 'Struk merinci tiap ekstra & harganya' },
        ]}
      />
      <Outro from={390} line="Pesanan ramai, ekstra tetap tepat." />
    </Backdrop>
  );
}
