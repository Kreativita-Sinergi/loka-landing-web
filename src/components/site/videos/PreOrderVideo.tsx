import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, rupiah, useCount, usePop } from './kit';

export const PRE_ORDER_DURATION = 440;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 580, y: 112, w: 640 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const TAPS = [70, 86, 102]; // tiga toples nastar
const PAY = 150;
const BOARD = 186; // pindah ke daftar pre-order
const READY = 238;
const DONE = 304;

const PRODUCTS = [
  { name: 'Nastar Premium', price: 85000, po: true, tint: '#f2b24c' },
  { name: 'Kastengel', price: 90000, po: true, tint: '#e9c46a' },
  { name: 'Brownies Sekat', price: 65000, po: false, tint: '#7a4a2e' },
  { name: 'Putri Salju', price: 80000, po: true, tint: '#efe6da' },
];

function Kasir() {
  const frame = useCurrentFrame();
  const qty = TAPS.filter(t => frame >= t).length;
  const total = qty * 85000;
  const dp = useCount(0, total / 2, PAY - 30, PAY - 10);
  const toast = usePop(PAY + 4, { damping: 13 });
  return (
    <AbsoluteFill style={{ background: C.soft, flexDirection: 'row' }}>
      <div style={{ width: 370, padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignContent: 'start' }}>
        {PRODUCTS.map((p, i) => {
          const hit = i === 0 && TAPS.some(t => frame >= t && frame < t + 8);
          return (
            <div key={p.name} style={{ height: 172, borderRadius: 16, background: '#fff', border: `1.5px solid ${i === 0 && qty ? C.brand : C.line}`, padding: 10, position: 'relative', transform: `scale(${hit ? 0.96 : 1})` }}>
              <div style={{ height: 84, borderRadius: 12, background: `radial-gradient(circle at 35% 30%, #fff9, transparent 55%), ${p.tint}` }} />
              {p.po && <div style={{ position: 'absolute', top: 16, left: 16, padding: '3px 8px', borderRadius: 999, background: C.ink, color: C.accent, fontSize: 10.5, fontWeight: 800 }}>PO · 7 hari</div>}
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink, marginTop: 8 }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: C.body, marginTop: 3 }}>
                <span>{rupiah(p.price)}</span>
                <span style={{ color: p.po ? C.danger : C.ok }}>Stok {p.po ? 0 : 12}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, background: '#fff', borderLeft: `1px solid ${C.line}`, padding: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>Pesanan · Rina</div>
        {qty > 0 && (
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 700, color: C.ink }}>
            <span>{qty}× Nastar Premium</span>
            <span>{rupiah(total)}</span>
          </div>
        )}
        <div style={{ marginTop: 14, padding: 10, borderRadius: 12, background: '#fff7e0', fontSize: 12.5, fontWeight: 700, color: '#8a5a00', opacity: qty ? 1 : 0.4 }}>📦 Pre-order · ambil Sabtu, 25 Okt</div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: C.body }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total</span><span style={{ color: C.ink }}>{rupiah(total)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DP 50%</span><span style={{ color: C.brand, fontWeight: 800 }}>{rupiah(dp)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Dilunasi saat ambil</span><span>{rupiah(total - dp)}</span></div>
        </div>
        <div style={{ marginTop: 12, height: 46, borderRadius: 14, background: C.brand, color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${frame >= PAY && frame < PAY + 8 ? 0.95 : 1})` }}>Bayar DP</div>
      </div>
      {frame >= PAY + 4 && (
        <div style={{ position: 'absolute', left: '50%', top: 150, transform: `translateX(-50%) scale(${toast})`, padding: '14px 22px', borderRadius: 16, background: C.ink, color: '#fff', fontSize: 15, fontWeight: 800, whiteSpace: 'nowrap', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)' }}>✓ Nota PO #P-021 tersimpan</div>
      )}
    </AbsoluteFill>
  );
}

const COLS = ['Menunggu', 'Siap diambil', 'Selesai'];
const COL_W = 184;
const colX = (c: number) => 16 + c * (COL_W + 12);

function OrderCard({ who, item, note, tone }: { who: string; item: string; note: string; tone?: 'brand' | 'ok' }) {
  return (
    <div style={{ width: COL_W, borderRadius: 14, background: '#fff', border: `1.5px solid ${tone === 'ok' ? C.ok : tone === 'brand' ? C.brand : C.line}`, padding: 12, boxShadow: '0 8px 18px -12px rgba(16,24,40,0.3)' }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>{who}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 3 }}>{item}</div>
      <div style={{ fontSize: 11.5, fontWeight: 800, color: tone === 'ok' ? C.ok : C.brand, marginTop: 7 }}>{note}</div>
    </div>
  );
}

function Board() {
  const frame = useCurrentFrame();
  const move = (at: number) => interpolate(frame, [at, at + 18], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const col = move(READY) + move(DONE);
  const lift = -Math.sin((col % 1) * Math.PI) * 30;
  const wa = usePop(READY + 16, { damping: 13 });
  const waOut = interpolate(frame, [DONE - 8, DONE], [1, 0], clamp);
  const ready = frame >= READY + 9;
  const done = frame >= DONE + 9;
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: C.ink }}>Daftar Pre-Order</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.body }}>Okt 2026</div>
      </div>
      {COLS.map((c, i) => (
        <div key={c} style={{ position: 'absolute', left: colX(i), top: 68, width: COL_W, bottom: 12, borderRadius: 16, background: 'rgba(13,93,243,0.04)', border: `1px dashed ${C.line}` }}>
          <div style={{ padding: '10px 12px', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.04em', color: C.mute }}>{c.toUpperCase()}</div>
        </div>
      ))}
      <div style={{ position: 'absolute', left: colX(0), top: 210 }}><OrderCard who="Dimas" item="2× Kastengel" note="DP Rp90.000" /></div>
      <div style={{ position: 'absolute', left: colX(0), top: 310 }}><OrderCard who="Sari" item="1× Putri Salju" note="DP Rp40.000" /></div>
      <div style={{ position: 'absolute', left: colX(1), top: 210 }}><OrderCard who="Bagas" item="4× Nastar Premium" note="Siap sejak kemarin" tone="brand" /></div>
      {/* Pesanan Rina berpindah kolom */}
      <div style={{ position: 'absolute', left: interpolate(col, [0, 1, 2], [colX(0), colX(1), colX(2)]), top: 108 + lift, transform: `rotate(${(col % 1) * 4}deg)` }}>
        <OrderCard who="Rina" item="3× Nastar Premium" note={done ? 'Lunas ✓ · stok −3' : ready ? 'Siap · sisa Rp127.500' : 'DP Rp127.500'} tone={done ? 'ok' : ready ? 'brand' : undefined} />
      </div>
      {frame >= READY + 16 && waOut > 0 && (
        <div style={{ position: 'absolute', right: 16, bottom: 18, width: 250, padding: 12, borderRadius: 14, background: '#dcf8c6', color: C.ink, fontSize: 12.5, fontWeight: 600, lineHeight: 1.4, transform: `scale(${wa})`, transformOrigin: 'bottom right', opacity: waOut, boxShadow: '0 20px 40px -18px rgba(0,0,0,0.4)' }}>
          <b style={{ color: '#075e54' }}>WhatsApp ke Rina</b><br />Pesanan PO Anda sudah siap diambil 🎉
        </div>
      )}
    </AbsoluteFill>
  );
}

export default function PreOrderVideo() {
  const frame = useCurrentFrame();
  const tabIn = usePop(24, { damping: 16, stiffness: 110 });
  const swap = interpolate(frame, [BOARD - 6, BOARD + 8], [0, 1], clamp);
  return (
    <Backdrop>
      <SideText
        chip="📦 Produk PO"
        title="Jual produk PO walau stoknya belum ada."
        mark={['PO']}
        bullets={[
          { f: 60, t: 'Tandai produk pre-order & lama siapnya' },
          { f: PAY, t: 'Terima DP, pelunasan saat diambil' },
          { f: READY, t: 'Stok baru dipotong saat diserahkan' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateY(${(1 - tabIn) * -22}deg)` }}>
        {swap < 1 && <AbsoluteFill style={{ opacity: 1 - swap }}><Kasir /></AbsoluteFill>}
        {swap > 0 && <AbsoluteFill style={{ opacity: swap, transform: `translateX(${(1 - swap) * 40}px)` }}><Board /></AbsoluteFill>}
      </Tablet>
      <Pointer
        path={[
          { f: 52, x: SCR.x + 94, y: SCR.y + 90 },
          ...TAPS.map(f => ({ f, x: SCR.x + 94, y: SCR.y + 90, tap: true })),
          { f: PAY - 18, x: SCR.x + 490, y: SCR.y + 351 },
          { f: PAY, x: SCR.x + 490, y: SCR.y + 351, tap: true },
        ]}
      />
      <Caption
        items={[
          { f: 50, to: BOARD - 4, text: 'Stok kosong pun tetap bisa dijual sebagai PO' },
          { f: BOARD + 10, to: DONE - 6, text: 'Pantau semua PO, kabari pembeli saat siap' },
          { f: DONE, to: 378, text: 'Diambil → lunas, stok terpotong otomatis' },
        ]}
      />
      <Outro from={382} line="Pre-order rapi, DP tak ada yang terlewat." />
    </Backdrop>
  );
}
