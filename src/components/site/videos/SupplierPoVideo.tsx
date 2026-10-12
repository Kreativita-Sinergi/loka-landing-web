import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, rupiah, usePop } from './kit';

export const SUPPLIER_PO_DURATION = 440;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 580, y: 112, w: 640 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const PICK = 80; // pilih supplier → buat PO
const SEND = 136;
const PARTIAL = 204;
const FULL = 284;

const SUPPLIERS = [
  { name: 'CV Sumber Kopi', who: 'Andi · 0812-xxxx-2210', tag: 'Biji kopi, susu, gula' },
  { name: 'UD Plastik Jaya', who: 'Wati · 0857-xxxx-8812', tag: 'Cup, sedotan, kantong' },
  { name: 'Toko Roti Ibu', who: 'Lina · 0813-xxxx-0941', tag: 'Roti & kue' },
];

const ITEMS = [
  { name: 'Biji Kopi Arabika', unit: 'kg', qty: 10, partial: 10, price: 150000 },
  { name: 'Susu UHT 1 L', unit: 'L', qty: 24, partial: 12, price: 18000 },
  { name: 'Gula Aren', unit: 'kg', qty: 5, partial: 5, price: 32000 },
];
const TOTAL = ITEMS.reduce((s, i) => s + i.qty * i.price, 0);
const STEPS = ['Draft', 'Dipesan', 'Diterima sebagian', 'Diterima'];
const GRID = '1.6fr 0.8fr 0.9fr 1fr';

function SupplierList() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}`, fontSize: 18, fontWeight: 800, color: C.ink }}>Supplier</div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SUPPLIERS.map((s, i) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, background: '#fff', border: `1.5px solid ${i === 0 && frame >= PICK - 4 ? C.brand : C.line}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: C.tint, color: C.brand, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.name.split(' ')[1][0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{s.name}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 2 }}>{s.who} · {s.tag}</div>
            </div>
            {i === 0 && <div style={{ padding: '9px 14px', borderRadius: 12, background: C.brand, color: '#fff', fontSize: 13, fontWeight: 800 }}>+ Buat PO</div>}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function PoDoc() {
  const frame = useCurrentFrame();
  const step = frame >= FULL ? 3 : frame >= PARTIAL ? 2 : frame >= SEND ? 1 : 0;
  const recv = (i: number) => (frame >= FULL ? ITEMS[i].qty : frame >= PARTIAL ? ITEMS[i].partial : 0);
  const stepPop = usePop([SEND, PARTIAL, FULL][step - 1] ?? 0, { damping: 11 });
  const action = step === 0 ? 'Kirim PO' : step === 3 ? 'Selesai ✓' : 'Terima barang';
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>PO-2026-0142</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.body }}>CV Sumber Kopi · tiba 20 Okt</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: C.ink }}>{rupiah(TOTAL)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px' }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: i < 3 ? 1 : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', borderRadius: 999, fontSize: 11.5, fontWeight: 800, whiteSpace: 'nowrap', background: i <= step ? (i === 3 ? C.ok : C.brand) : '#fff', color: i <= step ? '#fff' : C.mute, border: `1px solid ${i <= step ? 'transparent' : C.line}`, transform: `scale(${i === step && step > 0 ? 0.85 + stepPop * 0.15 : 1})` }}>{s}</div>
            {i < 3 && <div style={{ flex: 1, height: 2, background: i < step ? C.brand : C.line }} />}
          </div>
        ))}
      </div>
      <div style={{ margin: '0 14px', borderRadius: 16, background: '#fff', border: `1px solid ${C.line}`, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: GRID, padding: '9px 14px', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em', color: C.mute, background: C.soft }}>
          <span>BARANG</span><span>DIPESAN</span><span>DITERIMA</span><span>HARGA</span>
        </div>
        {ITEMS.map((it, i) => {
          const r = recv(i);
          const full = r === it.qty;
          return (
            <div key={it.name} style={{ display: 'grid', gridTemplateColumns: GRID, alignItems: 'center', padding: '11px 14px', borderTop: `1px solid ${C.line}`, fontSize: 13.5, fontWeight: 700, color: C.ink }}>
              <span>{it.name}</span>
              <span style={{ color: C.body }}>{it.qty} {it.unit}</span>
              <span style={{ color: r === 0 ? C.mute : full ? C.ok : '#d97706' }}>{r}/{it.qty}{full ? ' ✓' : ''}</span>
              <span style={{ color: C.body }}>{rupiah(it.price)}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, fontSize: 12.5, fontWeight: 700, color: step >= 2 ? C.ok : C.mute }}>{step >= 2 ? '✓ Stok & HPP bahan baku diperbarui' : 'Stok bertambah saat barang diterima'}</div>
        <div style={{ width: 160, height: 44, borderRadius: 13, background: step === 3 ? C.ok : C.brand, color: '#fff', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{action}</div>
      </div>
    </AbsoluteFill>
  );
}

/** Label stok yang melayang naik dari baris PO saat barang diterima. */
function StockFly({ at, text, x, y }: { at: number; text: string; x: number; y: number }) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [at, at + 40], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (t <= 0 || t >= 1) return null;
  return <div style={{ position: 'absolute', left: x, top: y - t * 120, padding: '7px 12px', borderRadius: 999, background: C.ok, color: '#fff', fontSize: 15, fontWeight: 800, opacity: 1 - Math.max(0, t - 0.7) / 0.3, whiteSpace: 'nowrap', boxShadow: '0 12px 24px -10px rgba(22,163,74,0.7)' }}>{text}</div>;
}

export default function SupplierPoVideo() {
  const frame = useCurrentFrame();
  const tabIn = usePop(24, { damping: 16, stiffness: 110 });
  const swap = interpolate(frame, [PICK + 8, PICK + 20], [0, 1], clamp);
  const btn = { x: SCR.x + 608 - 14 - 80, y: SCR.y + 390 - 14 - 22 };
  return (
    <Backdrop>
      <SideText
        chip="🚚 Supplier & PO"
        title="Belanja stok ke supplier lewat Purchase Order."
        mark={['Purchase', 'Order.']}
        bullets={[
          { f: 50, t: 'Simpan daftar supplier & kontaknya' },
          { f: SEND, t: 'Kirim PO, terima sebagian atau penuh' },
          { f: PARTIAL, t: 'Stok & HPP bahan baku ikut ter-update' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateY(${(1 - tabIn) * -22}deg)` }}>
        {swap < 1 && <AbsoluteFill style={{ opacity: 1 - swap }}><SupplierList /></AbsoluteFill>}
        {swap > 0 && <AbsoluteFill style={{ opacity: swap, transform: `scale(${0.96 + swap * 0.04})` }}><PoDoc /></AbsoluteFill>}
      </Tablet>
      <StockFly at={PARTIAL + 4} text="+10 kg Biji Kopi" x={SCR.x + 30} y={SCR.y + 150} />
      <StockFly at={PARTIAL + 10} text="+12 L Susu UHT" x={SCR.x + 210} y={SCR.y + 190} />
      <StockFly at={PARTIAL + 16} text="+5 kg Gula Aren" x={SCR.x + 390} y={SCR.y + 230} />
      <StockFly at={FULL + 4} text="+12 L Susu UHT" x={SCR.x + 210} y={SCR.y + 190} />
      <Pointer
        path={[
          { f: PICK - 18, x: SCR.x + 540, y: SCR.y + 56 + 14 + 36 },
          { f: PICK, x: SCR.x + 540, y: SCR.y + 56 + 14 + 36, tap: true },
          { f: SEND - 16, x: btn.x, y: btn.y },
          { f: SEND, x: btn.x, y: btn.y, tap: true },
          { f: PARTIAL, x: btn.x, y: btn.y, tap: true },
          { f: FULL, x: btn.x, y: btn.y, tap: true },
        ]}
      />
      <Caption
        items={[
          { f: 40, to: PICK + 20, text: 'Semua supplier tersimpan rapi' },
          { f: PICK + 26, to: PARTIAL, text: 'Buat PO lalu kirim ke supplier' },
          { f: PARTIAL + 6, to: FULL - 4, text: 'Barang datang sebagian? Terima sebagian dulu' },
          { f: FULL + 4, to: 374, text: 'Lengkap → PO selesai, stok bertambah otomatis' },
        ]}
      />
      <Outro from={380} line="Stok aman, belanja ke supplier tercatat." />
    </Backdrop>
  );
}
