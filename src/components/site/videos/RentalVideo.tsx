import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Chip, FadeUp, Headline, Outro, Phone, Pointer, Tablet, rupiah, usePop, Side } from './kit';

export const RENTAL_DURATION = 480;

// Jam di layar berjalan 40× lebih cepat supaya detiknya terlihat berdetak.
const SPEED = 40 / 30;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const START_PS4 = 118; // kasir menekan "Mulai" di PS 4
const REQUEST = 196; // tamu PS 3 menekan "Perpanjang" dari QR
const ACCEPT = 256; // kasir menerima
const PROMO = 318; // jam sepi dimulai

const TAB = { x: 590, y: 112, w: 640 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const PHONE = { x: 566, y: 236, w: 200 };

function hms(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map(v => String(v).padStart(2, '0')).join(':');
}

type Unit = { name: string; kind: 'PAKET' | 'ARGO' | 'KOSONG'; base: number; rate?: number };

function unitsAt(frame: number): (Unit & { time: number; bill?: number; low?: boolean; flash?: number })[] {
  const t = frame * SPEED;
  const promo = frame >= PROMO;
  const ps3Extra = frame >= ACCEPT ? 3600 : 0;
  const argo = (elapsed: number, rate: number) => Math.ceil(elapsed / 60) * (rate / 60);
  const psRate = promo ? 8000 : 12000;
  const ps4Elapsed = frame >= START_PS4 ? (frame - START_PS4) * SPEED * 6 : 0;
  return [
    { name: 'PS 1', kind: 'PAKET', base: 4360, time: 4360 - t },
    { name: 'PS 2', kind: 'ARGO', base: 2830, rate: psRate, time: 2830 + t * 6, bill: argo(2830 + t * 6, 12000) },
    { name: 'PS 3', kind: 'PAKET', base: 420, time: 420 - t + ps3Extra, low: 420 - t + ps3Extra < 300, flash: frame - ACCEPT },
    frame >= START_PS4
      ? { name: 'PS 4', kind: 'ARGO', base: 0, rate: psRate, time: ps4Elapsed, bill: argo(ps4Elapsed, psRate), flash: frame - START_PS4 }
      : { name: 'PS 4', kind: 'KOSONG', base: 0, time: 0 },
    { name: 'Biliar 1', kind: 'ARGO', base: 5400, rate: 30000, time: 5400 + t * 6, bill: argo(5400 + t * 6, 30000) },
    { name: 'Biliar 2', kind: 'PAKET', base: 2300, time: 2300 - t },
  ];
}

const CARD_W = 184;
const CARD_H = 146;
const cardPos = (i: number) => ({ left: 16 + (i % 3) * (CARD_W + 12), top: 76 + Math.floor(i / 3) * (CARD_H + 12) });

function RentalBoard() {
  const frame = useCurrentFrame();
  const units = unitsAt(frame);
  const promoIn = usePop(PROMO, { damping: 13 });
  const toastIn = usePop(REQUEST + 6, { damping: 14 });
  const toastOut = interpolate(frame, [ACCEPT + 4, ACCEPT + 14], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.ink }}>Meja Rental</div>
        {frame >= PROMO ? (
          <div style={{ transform: `scale(${promoIn})`, padding: '7px 14px', borderRadius: 999, background: C.accent, color: C.ink, fontSize: 13, fontWeight: 800 }}>⚡ Promo jam sepi · PS Rp8.000/jam</div>
        ) : (
          <div style={{ fontSize: 14, fontWeight: 700, color: C.body }}>5 dipakai · 1 kosong</div>
        )}
      </div>
      {units.map((u, i) => {
        const p = cardPos(i);
        const running = u.kind !== 'KOSONG';
        const flash = u.flash !== undefined && u.flash >= 0 ? interpolate(u.flash, [0, 6, 26], [0, 1, 0], clamp) : 0;
        const pulse = u.low ? 0.5 + 0.5 * Math.sin(frame / 3) : 0;
        const accent = u.low ? '#f59e0b' : u.kind === 'PAKET' ? C.brand : u.kind === 'ARGO' ? '#7c3aed' : C.mute;
        return (
          <div key={u.name} style={{ position: 'absolute', ...p, width: CARD_W, height: CARD_H, borderRadius: 16, background: '#fff', border: `2px solid ${u.low ? `rgba(245,158,11,${0.4 + pulse * 0.6})` : C.line}`, padding: 14, boxShadow: flash ? `0 0 0 ${flash * 8}px rgba(22,163,74,${flash * 0.35})` : '0 6px 16px -10px rgba(16,24,40,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{u.name}</div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', padding: '4px 8px', borderRadius: 999, background: `${accent}1f`, color: accent }}>{u.low ? 'HAMPIR HABIS' : u.kind}</div>
            </div>
            {running ? (
              <>
                <div style={{ fontSize: 30, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: u.low ? '#d97706' : C.ink, marginTop: 14, letterSpacing: '-0.02em' }}>{hms(u.time)}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: C.body, marginTop: 6 }}>
                  {u.kind === 'PAKET' ? 'sisa waktu paket' : `${rupiah(u.bill ?? 0)} · ${(u.rate ?? 0) / 1000}rb/jam`}
                </div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, height: 6, borderRadius: 6, background: C.soft, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 6, background: accent, width: `${u.kind === 'PAKET' ? Math.min(100, (u.time / 7200) * 100) : 100}%`, opacity: u.kind === 'ARGO' ? 0.35 + 0.25 * Math.sin(frame / 6) : 1 }} />
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.mute, marginTop: 16 }}>Kosong</div>
                <div style={{ position: 'absolute', left: 14, right: 14, bottom: 14, height: 40, borderRadius: 12, background: C.brand, color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶ Mulai</div>
              </>
            )}
          </div>
        );
      })}
      {frame >= REQUEST + 6 && frame < ACCEPT + 14 && (
        <div style={{ position: 'absolute', left: 230, top: 150, width: 360, borderRadius: 18, background: C.ink, color: '#fff', padding: 16, display: 'flex', alignItems: 'center', gap: 12, transform: `translateY(${(1 - toastIn) * -60}px) scale(${0.9 + toastIn * 0.1})`, opacity: toastIn * toastOut, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.55)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>Permintaan dari QR meja</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>PS 3 minta perpanjang 1 jam</div>
          </div>
          <div style={{ padding: '10px 16px', borderRadius: 12, background: C.ok, fontWeight: 800, fontSize: 14 }}>Terima</div>
        </div>
      )}
    </AbsoluteFill>
  );
}

function GuestPhone() {
  const frame = useCurrentFrame();
  const remain = 420 - frame * SPEED + (frame >= ACCEPT ? 3600 : 0);
  const waiting = frame >= REQUEST && frame < ACCEPT;
  const done = frame >= ACCEPT;
  const ring = Math.min(1, remain / 3900);
  const okPop = usePop(ACCEPT, { damping: 11 });
  return (
    <AbsoluteFill style={{ background: '#fff', alignItems: 'center', paddingTop: 50 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.body }}>Rental Loka · PS 3</div>
      <div style={{ position: 'relative', width: 140, height: 140, marginTop: 14 }}>
        <svg width={140} height={140} viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={70} cy={70} r={60} stroke={C.soft} strokeWidth={12} fill="none" />
          <circle cx={70} cy={70} r={60} stroke={done ? C.ok : '#f59e0b'} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={377} strokeDashoffset={377 * (1 - ring)} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.mute }}>SISA WAKTU</div>
          <div style={{ fontSize: 21, fontWeight: 800, fontVariantNumeric: 'tabular-nums', color: C.ink }}>{hms(remain)}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 14, right: 14, top: 250, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, background: done ? C.okSoft : waiting ? C.soft : C.brand, color: done ? C.ok : waiting ? C.body : '#fff', transform: `scale(${done ? 0.9 + okPop * 0.1 : 1})` }}>
        {done ? '✓ Diperpanjang 1 jam' : waiting ? 'Menunggu kasir…' : '+ Perpanjang 1 jam · Rp15.000'}
      </div>
      <div style={{ position: 'absolute', bottom: 26, left: 0, right: 0, textAlign: 'center', fontSize: 11.5, color: C.mute, padding: '0 16px' }}>Dibuka dari QR yang tertempel di meja</div>
    </AbsoluteFill>
  );
}

export default function RentalVideo() {
  const frame = useCurrentFrame();
  const tabIn = usePop(26, { damping: 16, stiffness: 110 });
  const phoneIn = usePop(150, { damping: 15 });
  const phoneOut = interpolate(frame, [296, 316], [0, 1], clamp);
  const ps4 = cardPos(3);
  return (
    <Backdrop>
      <Side style={{ left: 72, top: 116, width: 480 }}>
        <Chip from={2}>⏱ Rental PS & Biliar</Chip>
        <Headline text="Waktu sewa jalan sendiri, tagihan ikut terhitung." from={8} size={54} mark={['sendiri,']} style={{ marginTop: 24 }} />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            { f: 70, t: 'Paket hitung mundur atau argo per jam' },
            { f: 180, t: 'Tamu cek sisa waktu & perpanjang via QR' },
            { f: PROMO, t: 'Harga promo jam sepi otomatis berlaku' },
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

      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateY(${(1 - tabIn) * -25}deg)` }}>
        <RentalBoard />
      </Tablet>

      {frame >= 140 && phoneOut < 1 && (
        <Phone width={PHONE.w} style={{ left: PHONE.x, top: PHONE.y + (1 - phoneIn) * 500 + phoneOut * 520, transform: `rotate(${(1 - phoneIn) * 12 + phoneOut * 10}deg)` }}>
          <GuestPhone />
        </Phone>
      )}

      <Pointer
        path={[
          { f: 96, x: SCR.x + ps4.left + 92, y: SCR.y + ps4.top + 112 },
          { f: START_PS4, x: SCR.x + ps4.left + 92, y: SCR.y + ps4.top + 112, tap: true },
          { f: 178, x: PHONE.x + 100, y: PHONE.y + 284 },
          { f: REQUEST, x: PHONE.x + 100, y: PHONE.y + 284, tap: true },
          { f: 236, x: SCR.x + 529, y: SCR.y + 188 },
          { f: ACCEPT, x: SCR.x + 529, y: SCR.y + 188, tap: true },
        ]}
      />

      <Caption
        items={[
          { f: 60, to: 140, text: 'Semua meja terpantau: paket mundur, argo maju' },
          { f: 160, to: 290, text: 'Tamu scan QR meja → lihat sisa waktu → minta perpanjang' },
          { f: PROMO + 8, to: 410, text: 'Promo jam sepi berlaku sendiri sesuai jadwal' },
        ]}
      />
      <Outro from={420} line="Tak ada menit yang lupa ditagih." />
    </Backdrop>
  );
}
