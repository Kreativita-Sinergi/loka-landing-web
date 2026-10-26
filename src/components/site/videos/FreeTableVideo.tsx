import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Phone, Pointer, SideText, Tablet, rupiah, usePop } from './kit';

export const FREE_TABLE_DURATION = 460;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 570, y: 104, w: 660 };
const SCREEN = { x: TAB.x + 16, y: TAB.y + 16 };
const SW = 628;

const T = {
  draw: 58, // ketuk "Acak meja gratis"
  land: 132, // undian berhenti
  phone: 176,
  payFirst: 306, // ketuk "Lunas" di meja bayar dulu
};
const WINNER = 2; // Meja 3
const PAY_FIRST = 4; // Meja 5

type Status = { kind: 'run'; min: number } | { kind: 'free' } | { kind: 'pay'; price: number };
const TABLES: Status[] = [
  { kind: 'run', min: 42 },
  { kind: 'free' },
  { kind: 'free' },
  { kind: 'run', min: 75 },
  { kind: 'pay', price: 40000 },
  { kind: 'free' },
  { kind: 'run', min: 12 },
  { kind: 'free' },
];

const CARD = { w: (SW - 24 - 30) / 4, h: 160, top: 56, gap: 10 };
const cardPos = (i: number) => ({ x: 12 + (i % 4) * (CARD.w + CARD.gap), y: CARD.top + Math.floor(i / 4) * (CARD.h + CARD.gap) });
const at = (x: number, y: number) => ({ x: SCREEN.x + x, y: SCREEN.y + y });

const clock = (sec: number) => {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/** Indeks meja yang sedang disorot undian: cepat di awal, melambat, lalu berhenti di pemenang. */
function useDraw() {
  const frame = useCurrentFrame();
  if (frame < T.draw + 4) return -1;
  if (frame >= T.land) return WINNER;
  const p = interpolate(frame, [T.draw + 4, T.land], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const steps = 8 * 3 + WINNER; // tiga putaran penuh, berakhir di meja 3
  return Math.floor(p * steps) % 8;
}

function Felt({ dim }: { dim?: boolean }) {
  return (
    <div style={{ position: 'relative', height: 62, borderRadius: 10, background: dim ? '#5c8f74' : '#1f7a4d', border: '5px solid #7a4a28', boxSizing: 'border-box', opacity: dim ? 0.7 : 1 }}>
      {[[18, 18, '#f5f5f4'], [52, 30, C.danger], [60, 14, C.accent], [88, 24, '#1d4ed8']].map(([x, y, c], i) => (
        <div key={i} style={{ position: 'absolute', left: x as number, top: y as number, width: 9, height: 9, borderRadius: 5, background: c as string }} />
      ))}
    </div>
  );
}

function Floor() {
  const frame = useCurrentFrame();
  const lit = useDraw();
  const landed = usePop(T.land, { damping: 8, stiffness: 180 });
  const paid = frame >= T.payFirst;
  const press = (f: number) => (frame >= f ? interpolate(frame, [f, f + 4, f + 10], [1, 0.92, 1], clamp) : 1);
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 46, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px 0 14px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>Meja Biliar · Hari ini</div>
        <div style={{ padding: '7px 12px', borderRadius: 10, background: C.accent, color: C.ink, fontSize: 12.5, fontWeight: 900, transform: `scale(${press(T.draw)})` }}>🎲 Acak meja gratis</div>
      </div>
      {TABLES.map((s, i) => {
        const pos = cardPos(i);
        const isWinner = i === WINNER && frame >= T.land;
        const hot = lit === i && frame < T.land;
        const run = s.kind === 'run' || (s.kind === 'pay' && paid);
        const elapsed = s.kind === 'run' ? s.min * 60 + frame / 30 : 0;
        const left = 2 * 3600 - Math.max(0, (frame - T.payFirst - 6) / 30) * 60; // dipercepat supaya terlihat berjalan
        return (
          <div key={i} style={{ position: 'absolute', left: pos.x, top: pos.y, width: CARD.w, height: CARD.h, borderRadius: 14, background: '#fff', border: `2px solid ${isWinner ? C.accent : hot ? C.brand : C.line}`, boxShadow: hot ? `0 0 0 4px ${C.tint}` : isWinner ? `0 0 0 ${4 * landed}px rgba(255,201,60,0.45)` : undefined, padding: 8, boxSizing: 'border-box', transform: `scale(${isWinner ? 0.94 + landed * 0.06 : 1})` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 900, color: C.ink, marginBottom: 6 }}>
              <span>Meja {i + 1}</span>
              {run && <span style={{ width: 8, height: 8, borderRadius: 4, background: C.ok, marginTop: 4 }} />}
            </div>
            <Felt dim={!run} />
            <div style={{ marginTop: 8 }}>
              {isWinner ? (
                <div style={{ padding: '6px 0', borderRadius: 8, background: C.accent, color: C.ink, fontSize: 11.5, fontWeight: 900, textAlign: 'center', transform: `scale(${landed})` }}>GRATIS hari ini</div>
              ) : s.kind === 'run' ? (
                <div style={{ fontSize: 12, fontWeight: 800, color: C.ok, fontVariantNumeric: 'tabular-nums' }}>▶ {clock(elapsed)}</div>
              ) : s.kind === 'pay' ? (
                paid ? (
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.brand, fontVariantNumeric: 'tabular-nums' }}>⏳ sisa {clock(left)}</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 800, color: '#a16207' }}>Bayar dulu · 2 jam</div>
                    <div style={{ padding: '5px 0', borderRadius: 8, background: C.brand, color: '#fff', fontSize: 11, fontWeight: 900, textAlign: 'center', transform: `scale(${press(T.payFirst)})` }}>Lunas {rupiah(s.price)}</div>
                  </div>
                )
              ) : (
                <div style={{ fontSize: 12, fontWeight: 700, color: C.mute }}>Kosong</div>
              )}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function QrPage() {
  const frame = useCurrentFrame();
  const badge = usePop(T.phone + 16, { damping: 9 });
  const pkg = (f: number) => interpolate(frame, [f, f + 10], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <div style={{ position: 'absolute', left: 10, right: 10, top: 34, height: 24, borderRadius: 12, background: C.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9.5, fontWeight: 700, color: C.body }}>🔒 app.lokakasir.id/meja</div>
      <div style={{ position: 'absolute', left: 14, right: 14, top: 72, textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.mute }}>Biliar Loka</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>Meja 3</div>
        <div style={{ margin: '10px auto 0', display: 'inline-block', padding: '8px 14px', borderRadius: 12, background: C.accent, color: C.ink, fontSize: 15, fontWeight: 900, transform: `scale(${badge}) rotate(${(1 - badge) * -12}deg)` }}>🎉 GRATIS hari ini</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.body, marginTop: 8 }}>Sesi pertama di meja ini gratis</div>
      </div>
      <div style={{ position: 'absolute', left: 12, right: 12, top: 222, fontSize: 11.5, fontWeight: 900, color: C.ink }}>Pilih paket</div>
      {[['1 jam', 'Rp20.000'], ['2 jam', 'Rp40.000'], ['Suka-suka', 'per jam']].map(([n, p], i) => (
        <div key={n} style={{ position: 'absolute', left: 12, right: 12, top: 244 + i * 42, height: 36, borderRadius: 10, border: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: 12, fontWeight: 800, color: C.ink, opacity: pkg(T.phone + 26 + i * 5) }}>
          <span>{n}</span><span style={{ color: C.mute, fontSize: 11 }}>{p}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 18, height: 38, borderRadius: 11, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>Minta mulai main</div>
    </AbsoluteFill>
  );
}

export default function FreeTableVideo() {
  const frame = useCurrentFrame();
  const tabIn = usePop(10, { damping: 16, stiffness: 110 });
  const phone = usePop(T.phone, { damping: 15, stiffness: 120 });
  const phoneOut = interpolate(frame, [T.payFirst - 30, T.payFirst - 16], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const drawBtn = at(SW - 12 - 62, 23);
  const pay = cardPos(PAY_FIRST);
  const payBtn = at(pay.x + CARD.w / 2, pay.y + 8 + 19 + 62 + 8 + 16 + 4 + 12);
  return (
    <Backdrop>
      <SideText
        chip="🎱 Rental Biliar & PS"
        title="Meja gratis hari ini, diundi di depan tamu."
        mark={['gratis']}
        width={470}
        bullets={[
          { f: T.draw, t: 'Pilih atau acak meja yang gratis' },
          { f: T.phone, t: 'QR meja menampilkan “GRATIS hari ini”' },
          { f: T.payFirst, t: '“Bayar dulu”: timer jalan setelah lunas' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 28}deg)` }}>
        <Floor />
      </Tablet>
      {frame >= T.phone - 2 && phoneOut < 1 && (
        <Phone width={220} style={{ left: 600, top: 150 + (1 - phone) * 500 + phoneOut * 500, transform: `rotate(${-6 + (1 - phone) * -8}deg)` }}>
          <QrPage />
        </Phone>
      )}
      <Pointer path={[{ f: T.draw - 22, x: drawBtn.x - 80, y: drawBtn.y + 140 }, { f: T.draw, ...drawBtn, tap: true }]} />
      <Pointer path={[{ f: T.payFirst - 18, x: payBtn.x + 50, y: payBtn.y + 100 }, { f: T.payFirst, ...payBtn, tap: true }]} />
      <Caption
        items={[
          { f: 36, to: T.phone - 4, text: 'Promo meja gratis, diundi otomatis' },
          { f: T.phone + 4, to: T.payFirst - 8, text: 'Tamu scan QR, langsung tahu mejanya gratis' },
          { f: T.payFirst - 4, to: 394, text: 'Bayar dulu, baru timer berjalan' },
        ]}
      />
      <Outro from={400} line="Tempat main makin ramai, kasir tetap tenang." />
    </Backdrop>
  );
}
