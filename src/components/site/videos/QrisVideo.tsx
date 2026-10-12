import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Chip, FadeUp, Headline, Outro, Phone, QrGlyph, Tablet, rupiah, usePop, Side } from './kit';

export const QRIS_DURATION = 360;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const NOTIF = 132; // notifikasi dana masuk di HP pemilik
const MATCH = 162; // dicocokkan dengan tagihan
const PAID = 190; // nota lunas
const TAB = { x: 556, y: 132, w: 520 };
const PHONE = { x: 1052, y: 196, w: 196 };

const ITEMS = [
  ['2× Es Kopi Susu', 36000],
  ['1× Nasi Goreng', 25000],
  ['1× Roti Bakar', 22000],
  ['Pajak 10%', 4500],
] as const;
const TOTAL = 87500;

function Checkout() {
  const frame = useCurrentFrame();
  const paid = frame >= PAID;
  const stamp = usePop(PAID, { damping: 9, stiffness: 180 });
  const dots = '•••'.slice(0, 1 + (Math.floor(frame / 8) % 3));
  return (
    <AbsoluteFill style={{ background: '#fff', flexDirection: 'row' }}>
      <div style={{ width: '50%', padding: '20px 18px', borderRight: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>Tagihan #B-0412</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 2 }}>Meja 03 · Dine in</div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ITEMS.map(([n, p]) => (
            <div key={n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 600, color: C.body }}>
              <span>{n}</span>
              <span style={{ color: C.ink }}>{rupiah(p)}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: C.line, margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, color: C.ink }}>
          <span>Total</span>
          <span>{rupiah(TOTAL)}</span>
        </div>
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', color: C.brand }}>QRIS</div>
        <div style={{ opacity: paid ? 0.15 : 1 }}><QrGlyph size={150} seed={9} /></div>
        <div style={{ fontSize: 13, fontWeight: 700, color: paid ? C.ok : C.body }}>{paid ? 'Pembayaran diterima' : `Menunggu pembayaran ${dots}`}</div>
        {paid && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%, -60%) rotate(-12deg) scale(${stamp})`, border: `5px solid ${C.ok}`, color: C.ok, borderRadius: 16, padding: '6px 20px', fontSize: 40, fontWeight: 900, letterSpacing: '0.08em', background: 'rgba(255,255,255,0.9)' }}>LUNAS</div>
        )}
      </div>
    </AbsoluteFill>
  );
}

function OwnerPhone() {
  const frame = useCurrentFrame();
  const drop = usePop(NOTIF, { damping: 14 });
  const matched = frame >= MATCH;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(160deg, #1d2a55, #0b1020)', color: '#fff', alignItems: 'center' }}>
      <div style={{ marginTop: 64, fontSize: 52, fontWeight: 300, letterSpacing: '-0.02em' }}>14.27</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Sabtu, 18 Oktober</div>
      {frame >= NOTIF && (
        <div style={{ position: 'absolute', left: 10, right: 10, top: 160, borderRadius: 16, background: 'rgba(255,255,255,0.94)', color: C.ink, padding: 11, transform: `translateY(${(1 - drop) * -120}px)`, opacity: Math.min(1, drop * 2) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 700, color: C.body }}>
            <span style={{ width: 16, height: 16, borderRadius: 5, background: '#0a66c2' }} />BANK · sekarang
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, marginTop: 5 }}>Dana masuk {rupiah(TOTAL)}</div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: C.body, marginTop: 2 }}>QRIS · Kedai Loka</div>
        </div>
      )}
      {matched && (
        <div style={{ position: 'absolute', left: 10, right: 10, top: 252, borderRadius: 14, background: C.ok, padding: '9px 11px', fontSize: 11.5, fontWeight: 800, opacity: interpolate(frame, [MATCH, MATCH + 8], [0, 1], clamp) }}>✓ Cocok dengan tagihan #B-0412</div>
      )}
    </AbsoluteFill>
  );
}

/** Struk keluar dari bawah tablet setelah lunas. */
function Receipt() {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [PAID + 20, PAID + 70], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (out <= 0) return null;
  const h = 210 * out;
  return (
    <div style={{ position: 'absolute', left: TAB.x + 150, top: TAB.y + TAB.w * 0.66 - 6, width: 210, height: h, overflow: 'hidden', zIndex: -1 }}>
      <div style={{ position: 'absolute', bottom: 0, width: 210, height: 210, background: '#fff', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.35)', padding: '14px 16px', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11, color: C.ink, clipPath: 'polygon(0 0,100% 0,100% 96%,95% 100%,90% 96%,85% 100%,80% 96%,75% 100%,70% 96%,65% 100%,60% 96%,55% 100%,50% 96%,45% 100%,40% 96%,35% 100%,30% 96%,25% 100%,20% 96%,15% 100%,10% 96%,5% 100%,0 96%)' }}>
        <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 13 }}>KEDAI LOKA</div>
        <div style={{ textAlign: 'center', opacity: 0.6, marginBottom: 8 }}>#B-0412 · 14.27</div>
        {ITEMS.slice(0, 3).map(([n, p]) => (
          <div key={n} style={{ display: 'flex', justifyContent: 'space-between' }}><span>{n}</span><span>{(p / 1000).toFixed(1)}k</span></div>
        ))}
        <div style={{ borderTop: '1px dashed #999', margin: '6px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}><span>TOTAL</span><span>{rupiah(TOTAL)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>QRIS</span><span>LUNAS</span></div>
        <div style={{ textAlign: 'center', marginTop: 8, opacity: 0.6 }}>Terima kasih!</div>
      </div>
    </div>
  );
}

export default function QrisVideo() {
  const frame = useCurrentFrame();
  const tabIn = usePop(20, { damping: 16, stiffness: 110 });
  const phoneIn = usePop(104, { damping: 15 });
  const beam = interpolate(frame, [MATCH - 6, PAID], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const burst = frame >= PAID ? interpolate(frame, [PAID, PAID + 26], [0, 1], clamp) : 0;
  const center = { x: TAB.x + TAB.w * 0.75, y: TAB.y + 170 };
  return (
    <Backdrop>
      <Side style={{ left: 72, top: 124, width: 450 }}>
        <Chip from={2}>⚡ QRIS Otomatis</Chip>
        <Headline text="Pembeli scan QRIS, nota lunas sendiri." from={8} size={56} mark={['lunas', 'sendiri.']} style={{ marginTop: 24 }} />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            { f: 60, t: 'Pakai QRIS statis milik toko sendiri' },
            { f: NOTIF, t: 'Notifikasi bank dicocokkan otomatis' },
            { f: PAID + 10, t: 'Kasir tak perlu cek mutasi lagi' },
          ].map(b => (
            <FadeUp key={b.t} from={b.f}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 600, color: C.body }}>
                <span style={{ width: 28, height: 28, borderRadius: 9, background: C.brand, color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                {b.t}
              </div>
            </FadeUp>
          ))}
        </div>
      </Side>

      <AbsoluteFill style={{ isolation: 'isolate' }}>
        <Receipt />
        <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600 }}>
          <Checkout />
        </Tablet>
      </AbsoluteFill>

      {/* Sinar pencocokan dari HP pemilik ke tagihan */}
      {beam > 0 && beam < 1 && (
        <div style={{ position: 'absolute', left: interpolate(beam, [0, 1], [PHONE.x + 40, center.x]), top: interpolate(beam, [0, 1], [PHONE.y + 200, center.y]) - Math.sin(beam * Math.PI) * 60, width: 22, height: 22, borderRadius: '50%', background: C.ok, boxShadow: '0 0 0 10px rgba(22,163,74,0.25), 0 0 30px rgba(22,163,74,0.8)' }} />
      )}
      {burst > 0 && burst < 1 &&
        Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const r = 40 + burst * 150;
          return <div key={i} style={{ position: 'absolute', left: center.x + Math.cos(a) * r, top: center.y + Math.sin(a) * r, width: 12, height: 12, borderRadius: i % 2 ? 3 : '50%', background: i % 3 === 0 ? C.accent : i % 3 === 1 ? C.ok : C.brand, opacity: 1 - burst, transform: `rotate(${burst * 300}deg)` }} />;
        })}

      <Phone width={PHONE.w} style={{ left: PHONE.x, top: PHONE.y + (1 - phoneIn) * 520, transform: `rotate(${(1 - phoneIn) * 14 + 4}deg)` }}>
        <OwnerPhone />
      </Phone>

      <Caption
        items={[
          { f: 50, to: 128, text: 'Pembeli scan QRIS toko seperti biasa' },
          { f: NOTIF + 4, to: PAID, text: 'Notifikasi dana masuk di HP pemilik dibaca Loka' },
          { f: PAID + 6, to: 292, text: 'Nominal cocok → nota lunas, struk langsung tercetak' },
        ]}
      />
      <Outro from={300} line="Kasir fokus melayani, bukan cek mutasi." />
    </Backdrop>
  );
}
