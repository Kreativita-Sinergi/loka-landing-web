import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Phone, Pointer, QrGlyph, SideText, rupiah, usePop } from './kit';

export const BALANCE_DURATION = 480;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const PHONE = { x: 930, y: 70, w: 280 };
const SCREEN = { x: PHONE.x + PHONE.w * 0.035, y: PHONE.y + PHONE.w * 0.035 };
const W = 260;
const H = 557;

const TOTAL = 68000;
const BALANCE = 120000;
const HALF = TOTAL / 2;

const T = {
  useBalance: 70,
  sheet: 76,
  half: 102,
  cash: 128,
  paid: 138,
  card: 186,
  scanCard: 206,
  checkPage: 232,
  receipt: 300,
  scanReceipt: 318,
  ratePage: 342,
  star: 362,
  send: 384,
};

// Posisi tombol di layar kasir (koordinat layar).
const INVITE = { top: 150, h: 64 };
const METHOD_TOP = 232;
const SHEET_TOP = H - 200;
const STARS_TOP = 190;

const at = (x: number, y: number) => ({ x: SCREEN.x + x, y: SCREEN.y + y });

function PayScreen() {
  const frame = useCurrentFrame();
  const usedBalance = frame >= T.half;
  const usedCash = frame >= T.cash;
  const remaining = TOTAL - (usedBalance ? HALF : 0) - (usedCash ? HALF : 0);
  const sheet = interpolate(frame, [T.sheet, T.sheet + 12, T.half + 2, T.half + 12], [0, 1, 1, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const paid = usePop(T.paid, { damping: 12 });
  const rowIn = (f: number) => interpolate(frame, [f, f + 10], [0, 1], clamp);
  const press = (f: number) => (frame >= f ? interpolate(frame, [f, f + 4, f + 10], [1, 0.92, 1], clamp) : 1);
  const method = (label: string, i: number) => (
    <div key={label} style={{ position: 'absolute', left: 12 + (i % 2) * 122, top: METHOD_TOP + Math.floor(i / 2) * 52, width: 114, height: 44, borderRadius: 11, border: `1.5px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: C.ink, transform: `scale(${i === 0 ? press(T.cash) : 1})` }}>{label}</div>
  );
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 96, background: C.brand, color: '#fff', padding: '42px 14px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8 }}>Sisa tagihan</div>
        <div style={{ fontSize: 24, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{rupiah(remaining)}</div>
      </div>
      <div style={{ position: 'absolute', left: 12, right: 12, top: 106, height: 36, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 30, height: 30, borderRadius: 15, background: C.accent, color: C.ink, fontWeight: 900, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: C.ink }}>Bu Sari</span>
        <span style={{ fontSize: 10.5, fontWeight: 800, padding: '2px 7px', borderRadius: 6, background: C.okSoft, color: C.ok }}>Member</span>
      </div>
      {!usedBalance && (
        <div style={{ position: 'absolute', left: 12, right: 12, top: INVITE.top, height: INVITE.h, borderRadius: 14, background: C.tint, border: `1.5px solid ${C.brand}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px 0 12px', boxSizing: 'border-box' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.brand }}>Saldo bisa dipakai</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: C.ink }}>{rupiah(BALANCE)}</div>
          </div>
          <div style={{ padding: '8px 10px', borderRadius: 10, background: C.brand, color: '#fff', fontSize: 12, fontWeight: 900, transform: `scale(${press(T.useBalance)})` }}>Pakai saldo</div>
        </div>
      )}
      {usedBalance && (
        <div style={{ position: 'absolute', left: 12, right: 12, top: INVITE.top, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { l: 'Saldo pelanggan', v: HALF, f: T.half },
            ...(usedCash ? [{ l: 'Tunai', v: HALF, f: T.cash }] : []),
          ].map(r => (
            <div key={r.l} style={{ height: 29, borderRadius: 9, background: '#fff', border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: 12.5, fontWeight: 800, color: C.ink, opacity: rowIn(r.f), transform: `translateY(${(1 - rowIn(r.f)) * 10}px)` }}>
              <span>{r.l}</span><span>{rupiah(r.v)}</span>
            </div>
          ))}
        </div>
      )}
      {['Tunai', 'QRIS', 'Transfer', 'Kartu'].map(method)}
      <div style={{ position: 'absolute', left: 12, right: 12, top: METHOD_TOP + 116, fontSize: 11.5, fontWeight: 700, color: C.mute }}>Saldo tidak pernah terpilih otomatis.</div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: SHEET_TOP, height: 200, background: '#fff', borderRadius: '18px 18px 0 0', boxShadow: '0 -20px 40px -20px rgba(0,0,0,0.3)', transform: `translateY(${(1 - sheet) * 220}px)`, padding: '16px 12px 0', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 14, fontWeight: 900, color: C.ink }}>Pakai saldo</div>
        {[['Semua', TOTAL], ['Setengah', HALF], ['Nominal lain', 0]].map(([l, v], i) => (
          <div key={l} style={{ position: 'absolute', left: 12, right: 12, top: 44 + i * 46, height: 38, borderRadius: 10, border: `1.5px solid ${i === 1 && frame >= T.half - 2 ? C.brand : C.line}`, background: i === 1 && frame >= T.half - 2 ? C.tint : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 13, fontWeight: 800, color: C.ink }}>
            <span>{l}</span>{v ? <span style={{ color: C.body }}>{rupiah(v as number)}</span> : null}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 14, height: 64, borderRadius: 14, background: C.ok, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${paid})`, opacity: Math.min(1, paid * 2) }}>
        <div style={{ fontSize: 16, fontWeight: 900 }}>✓ Lunas</div>
        <div style={{ fontSize: 11.5, fontWeight: 700, opacity: 0.9 }}>Sisa saldo Bu Sari {rupiah(BALANCE - HALF)}</div>
      </div>
    </AbsoluteFill>
  );
}

function BrowserBar({ path }: { path: string }) {
  return (
    <div style={{ position: 'absolute', left: 12, right: 12, top: 40, height: 28, borderRadius: 14, background: C.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.body }}>🔒 app.lokakasir.id/{path}</div>
  );
}

function CheckScreen() {
  const frame = useCurrentFrame();
  const amount = interpolate(frame, [T.checkPage + 8, T.checkPage + 34], [0, BALANCE - HALF], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <BrowserBar path="saldo" />
      <div style={{ position: 'absolute', left: 16, right: 16, top: 90 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.mute }}>Kedai Loka</div>
        <div style={{ fontSize: 19, fontWeight: 900, color: C.ink, marginTop: 2 }}>Halo, Sari 👋</div>
        <div style={{ marginTop: 16, borderRadius: 18, padding: '18px 16px', background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`, color: '#fff' }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>Saldo Anda</div>
          <div style={{ fontSize: 30, fontWeight: 900, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{rupiah(amount)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 12, fontWeight: 800 }}>
            <span>⭐ 240 poin</span><span style={{ opacity: 0.8 }}>Member</span>
          </div>
        </div>
        <div style={{ marginTop: 14, fontSize: 12, fontWeight: 800, color: C.ink }}>Riwayat</div>
        {[['Bayar nota #0187', '−Rp34.000'], ['Isi saldo tunai', '+Rp100.000']].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: C.body, padding: '9px 0', borderBottom: `1px solid ${C.line}` }}>
            <span>{l}</span><span style={{ color: v.startsWith('+') ? C.ok : C.ink }}>{v}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function RateScreen() {
  const frame = useCurrentFrame();
  const thanks = usePop(T.send + 6, { damping: 13 });
  const press = frame >= T.send ? interpolate(frame, [T.send, T.send + 4, T.send + 10], [1, 0.93, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <BrowserBar path="nilai" />
      <div style={{ position: 'absolute', left: 16, right: 16, top: 96, textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.mute }}>Kedai Loka · Nota #0187</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: C.ink, marginTop: 6 }}>Bagaimana kunjungan Anda?</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: STARS_TOP, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {[0, 1, 2, 3, 4].map(i => {
          const lit = interpolate(frame, [T.star + i * 2, T.star + i * 2 + 6], [0, 1], clamp);
          return <span key={i} style={{ fontSize: 36, lineHeight: 1, color: lit > 0.5 ? C.accent : '#d9dde5', transform: `scale(${1 + Math.sin(lit * Math.PI) * 0.35})` }}>★</span>;
        })}
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, top: STARS_TOP + 64, height: 76, borderRadius: 12, border: `1.5px solid ${C.line}`, padding: 10, boxSizing: 'border-box', fontSize: 12.5, fontWeight: 600, color: frame > T.star + 12 ? C.ink : C.mute }}>
        {frame > T.star + 12 ? 'Kopinya mantap, pelayanan cepat!'.slice(0, Math.max(0, Math.floor((frame - T.star - 12) * 1.6))) : 'Tulis kesan Anda (opsional)'}
      </div>
      <div style={{ position: 'absolute', left: 16, right: 16, top: STARS_TOP + 156, height: 42, borderRadius: 12, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, transform: `scale(${press})` }}>Kirim penilaian</div>
      <AbsoluteFill style={{ background: 'rgba(255,255,255,0.94)', alignItems: 'center', justifyContent: 'center', opacity: thanks }}>
        <div style={{ fontSize: 48, transform: `scale(${thanks})` }}>🙏</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: C.ink, marginTop: 10 }}>Terima kasih!</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.mute, marginTop: 4 }}>Penilaian Anda sampai ke pemilik</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function Screens() {
  const frame = useCurrentFrame();
  const screen = frame >= T.ratePage ? 2 : frame >= T.checkPage ? 1 : 0;
  const from = [0, T.checkPage, T.ratePage][screen];
  const swap = screen ? interpolate(frame, [from, from + 12], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ opacity: swap, transform: `translateY(${(1 - swap) * 24}px)` }}>
      {screen === 0 ? <PayScreen /> : screen === 1 ? <CheckScreen /> : <RateScreen />}
    </AbsoluteFill>
  );
}

/** Garis pindai yang lewat di atas QR. */
function ScanLine({ from, size }: { from: number; size: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame > from + 22) return null;
  const y = interpolate(frame, [from, from + 22], [0, size]);
  return <div style={{ position: 'absolute', left: -8, right: -8, top: y, height: 4, borderRadius: 4, background: C.accent, boxShadow: `0 0 18px ${C.accent}` }} />;
}

function MemberCard() {
  const frame = useCurrentFrame();
  const p = usePop(T.card, { damping: 14, stiffness: 120 });
  const out = interpolate(frame, [T.receipt - 12, T.receipt], [0, 1], clamp);
  if (frame < T.card - 2 || out >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: 600, top: 150, width: 290, padding: '20px 20px 22px', borderRadius: 22, background: '#fff', boxShadow: '0 40px 80px -30px rgba(13,30,80,0.5)', color: C.ink, textAlign: 'center', transform: `translateY(${(1 - p) * 120 - out * 40}px) rotate(${(1 - p) * -10 - 3}deg)`, opacity: Math.min(1, p * 1.6) * (1 - out) }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: C.mute }}>Kedai Loka</div>
      <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '0.12em', marginTop: 2 }}>KARTU MEMBER</div>
      <div style={{ position: 'relative', width: 150, margin: '14px auto 0' }}>
        <QrGlyph size={150} seed={11} />
        <ScanLine from={T.scanCard} size={150} />
      </div>
      <div style={{ fontSize: 17, fontWeight: 900, marginTop: 12 }}>Sari Wulandari</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.body, marginTop: 2 }}>•••• 7890</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.brand, marginTop: 8 }}>Scan untuk cek saldo & poin</div>
    </div>
  );
}

function RatingReceipt() {
  const frame = useCurrentFrame();
  const p = usePop(T.receipt, { damping: 15, stiffness: 120 });
  if (frame < T.receipt - 2) return null;
  return (
    <div style={{ position: 'absolute', left: 600, top: 120, width: 290, padding: '20px 20px 22px', background: '#fff', borderRadius: 6, boxShadow: '0 40px 80px -30px rgba(13,30,80,0.5)', fontFamily: 'ui-monospace, Menlo, monospace', color: C.ink, transform: `translateY(${(1 - p) * 120}px) rotate(${(1 - p) * 8 + 2}deg)`, opacity: Math.min(1, p * 1.6) }}>
      <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800 }}>KEDAI LOKA</div>
      <div style={{ borderTop: '2px dashed #cfd3dc', margin: '12px 0' }} />
      {[['TOTAL', 'Rp68.000'], ['Saldo pelanggan', '34.000'], ['Tunai', '34.000'], ['Sisa saldo', 'Rp86.000']].map(([l, v], i) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: i ? 13 : 15, fontWeight: i ? 500 : 900, marginTop: i ? 5 : 0, color: i === 3 ? C.brand : undefined }}><span>{l}</span><span>{v}</span></div>
      ))}
      <div style={{ borderTop: '2px dashed #cfd3dc', margin: '12px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative' }}>
          <QrGlyph size={86} seed={5} />
          <ScanLine from={T.scanReceipt} size={86} />
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.35 }}>Nilai kunjungan Anda<br /><span style={{ color: C.mute, fontWeight: 500 }}>Scan, cuma 10 detik</span></div>
      </div>
    </div>
  );
}

/** Label kecil di atas ponsel: layar siapa yang sedang tampil. */
function Who() {
  const frame = useCurrentFrame();
  const buyer = frame >= T.checkPage;
  return (
    <div style={{ position: 'absolute', left: PHONE.x, width: PHONE.w, top: PHONE.y - 46, display: 'flex', justifyContent: 'center' }}>
      <div style={{ padding: '7px 14px', borderRadius: 999, fontSize: 15, fontWeight: 800, background: buyer ? C.accent : C.ink, color: buyer ? C.ink : '#fff' }}>{buyer ? 'HP pembeli' : 'Layar kasir'}</div>
    </div>
  );
}

export default function BalanceVideo() {
  const phoneIn = usePop(10, { damping: 16, stiffness: 110 });
  const useBtn = at(W - 10 - 38, INVITE.top + INVITE.h / 2);
  const half = at(W / 2, SHEET_TOP + 44 + 46 + 19);
  const cash = at(12 + 57, METHOD_TOP + 22);
  const star = at(W / 2 + 2 * 42, STARS_TOP + 18);
  const send = at(W / 2, STARS_TOP + 156 + 21);
  return (
    <Backdrop>
      <SideText
        chip="💳 Saldo & Member"
        title="Pelanggan setia, punya saldo dan kartu sendiri."
        mark={['saldo']}
        width={470}
        bullets={[
          { f: T.useBalance, t: 'Bayar pakai saldo, sisanya tunai' },
          { f: T.card, t: 'Kartu member ber-QR cek saldo & poin' },
          { f: T.receipt, t: 'QR penilaian tercetak di struk' },
        ]}
      />
      <Who />
      <Phone width={PHONE.w} style={{ left: PHONE.x, top: PHONE.y + (1 - phoneIn) * 600 }}>
        <Screens />
      </Phone>
      <MemberCard />
      <RatingReceipt />
      <Pointer
        path={[
          { f: T.useBalance - 22, x: useBtn.x - 40, y: useBtn.y + 120 },
          { f: T.useBalance, ...useBtn, tap: true },
          { f: T.half, ...half, tap: true },
          { f: T.cash, ...cash, tap: true },
        ]}
      />
      {/* Penunjuk kedua untuk halaman penilaian di HP pembeli. */}
      <Pointer path={[{ f: T.star - 20, x: star.x + 30, y: star.y + 100 }, { f: T.star + 8, ...star, tap: true }, { f: T.send, ...send, tap: true }]} />
      <Caption
        items={[
          { f: 36, to: T.card - 4, text: 'Saldo dipakai sebagian, sisanya tunai' },
          { f: T.card + 4, to: T.receipt - 4, text: 'Pelanggan cek saldo sendiri dari kartunya' },
          { f: T.receipt + 4, to: 414, text: 'Bintang rendah? Pemilik langsung tahu' },
        ]}
      />
      <Outro from={420} line="Pelanggan senang, pelanggan kembali." />
    </Backdrop>
  );
}
