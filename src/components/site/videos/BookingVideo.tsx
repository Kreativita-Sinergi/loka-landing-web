import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Chip, FadeUp, Headline, Outro, Pointer, Tablet, usePop, Side } from './kit';

export const BOOKING_DURATION = 420;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 580, y: 100, w: 660 };
const SCR = { x: TAB.x + 16, y: TAB.y + 16 };
const COURTS = ['Padel A', 'Padel B', 'Futsal', 'Badminton'];
const OPEN = 16;
const HOURS = 6;
const LABEL_W = 56;
const COL_W = 140;
const ROW_H = 50;
const GRID_TOP = 92;

const colX = (c: number) => LABEL_W + c * COL_W + 6;
const rowY = (h: number) => GRID_TOP + (h - OPEN) * ROW_H;

const PEAK = 150; // jam sibuk disorot
const DRAG = { from: 186, to: 214 }; // kasir menarik slot baru
const SAVE = 268;
const CLASH = 304; // percobaan booking di jam yang sudah terisi

const BOOKINGS = [
  { c: 0, a: 16, b: 17.5, who: 'Dimas', f: 40 },
  { c: 0, a: 19, b: 20.5, who: 'Komunitas Padel', f: 52 },
  { c: 1, a: 17, b: 18, who: 'Sari', f: 64 },
  { c: 2, a: 18, b: 20, who: 'FC Kantor', f: 76 },
  { c: 3, a: 16, b: 18, who: 'Rina & tim', f: 88 },
  { c: 3, a: 20, b: 22, who: 'PB Loka', f: 100 },
];

function Block({ c, a, b, who, f, tone = 'brand', note }: { c: number; a: number; b: number; who: string; f: number; tone?: 'brand' | 'new'; note?: string }) {
  const p = usePop(f, { damping: 13 });
  const frame = useCurrentFrame();
  if (frame < f) return null;
  const isNew = tone === 'new';
  return (
    <div style={{ position: 'absolute', left: colX(c), top: rowY(a) + 3, width: COL_W - 12, height: (b - a) * ROW_H - 6, borderRadius: 10, padding: '7px 10px', background: isNew ? C.ok : C.brand, color: '#fff', transform: `scale(${0.6 + p * 0.4})`, opacity: Math.min(1, p * 1.6), transformOrigin: 'top center', boxShadow: '0 10px 20px -12px rgba(13,30,80,0.6)', overflow: 'hidden' }}>
      <div style={{ fontSize: 13, fontWeight: 800, whiteSpace: 'nowrap' }}>{who}</div>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.85 }}>{note ?? `${String(Math.floor(a)).padStart(2, '0')}.${a % 1 ? '30' : '00'}–${String(Math.floor(b)).padStart(2, '0')}.${b % 1 ? '30' : '00'}`}</div>
    </div>
  );
}

function Calendar() {
  const frame = useCurrentFrame();
  const peak = interpolate(frame, [PEAK, PEAK + 22], [0, 1], clamp);
  const peakTag = usePop(PEAK + 8, { damping: 13 });
  const drag = interpolate(frame, [DRAG.from, DRAG.to], [0, 1], clamp);
  const sheetIn = usePop(DRAG.to + 8, { damping: 15 });
  const sheetOut = interpolate(frame, [SAVE + 4, SAVE + 14], [1, 0], clamp);
  const clash = frame >= CLASH ? interpolate(frame, [CLASH, CLASH + 6, CLASH + 30, CLASH + 40], [0, 1, 1, 0], clamp) : 0;
  const shake = clash > 0 ? Math.sin((frame - CLASH) * 1.6) * 6 * clash : 0;
  return (
    <AbsoluteFill style={{ background: '#fff' }}>
      <div style={{ height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', borderBottom: `1px solid ${C.line}` }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, color: C.ink }}>Jadwal Lapangan</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.body }}>Sabtu, 18 Oktober</div>
        </div>
        <div style={{ transform: `scale(${peakTag})`, padding: '7px 13px', borderRadius: 999, background: '#fff4d6', color: '#a36b00', fontSize: 12.5, fontWeight: 800 }}>Jam sibuk 18–21 · Rp350rb/jam</div>
      </div>
      {COURTS.map((name, c) => (
        <div key={name} style={{ position: 'absolute', left: colX(c), top: 62, width: COL_W - 12, textAlign: 'center', fontSize: 13, fontWeight: 800, color: C.ink }}>{name}</div>
      ))}
      {/* Pita jam sibuk */}
      <div style={{ position: 'absolute', left: LABEL_W, top: rowY(18), width: (628 - LABEL_W - 8) * peak, height: ROW_H * 3, background: 'repeating-linear-gradient(135deg, rgba(255,201,60,0.22) 0 10px, rgba(255,201,60,0.1) 10px 20px)', borderRadius: 8 }} />
      {Array.from({ length: HOURS + 1 }, (_, i) => (
        <div key={i} style={{ position: 'absolute', left: 0, right: 8, top: rowY(OPEN + i), display: 'flex', alignItems: 'center' }}>
          <div style={{ width: LABEL_W, textAlign: 'center', fontSize: 12, fontWeight: 700, color: C.mute, transform: 'translateY(-50%)' }}>{OPEN + i}.00</div>
          <div style={{ flex: 1, height: 1, background: C.line }} />
        </div>
      ))}
      {BOOKINGS.map(b => (
        <div key={`${b.c}-${b.a}`} style={{ position: 'absolute', inset: 0, transform: b.c === 2 && b.a === 18 ? `translateX(${shake}px)` : undefined }}>
          <Block {...b} />
        </div>
      ))}
      {/* Slot baru yang sedang ditarik */}
      {frame >= DRAG.from && frame < SAVE + 2 && (
        <div style={{ position: 'absolute', left: colX(1), top: rowY(19) + 3, width: COL_W - 12, height: Math.max(8, drag * 2 * ROW_H - 6), borderRadius: 10, border: `2.5px dashed ${C.ok}`, background: 'rgba(22,163,74,0.1)' }} />
      )}
      <Block c={1} a={19} b={21} who="Andi" f={SAVE} tone="new" note="DP Rp200rb ✓" />
      {clash > 0 && (
        <div style={{ position: 'absolute', left: colX(2) - 30, top: rowY(19) - 46, padding: '8px 12px', borderRadius: 10, background: C.danger, color: '#fff', fontSize: 12.5, fontWeight: 800, opacity: clash, whiteSpace: 'nowrap' }}>Sudah dibooking FC Kantor</div>
      )}
      {frame >= DRAG.to + 8 && sheetOut > 0 && (
        <div style={{ position: 'absolute', right: 14, top: 120, width: 260, borderRadius: 18, background: '#fff', border: `1px solid ${C.line}`, boxShadow: '0 30px 60px -20px rgba(13,30,80,0.45)', padding: 16, transform: `translateY(${(1 - sheetIn) * 40}px)`, opacity: Math.min(sheetIn, sheetOut) }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>Booking baru</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.body, marginTop: 2 }}>Padel B · 19.00–21.00 · Andi</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: C.body, fontWeight: 600 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>2 jam × tarif sibuk</span><span style={{ color: C.ink }}>Rp700.000</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DP dibayar</span><span style={{ color: C.ok }}>Rp200.000</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: C.ink }}><span>Sisa saat main</span><span>Rp500.000</span></div>
          </div>
          <div style={{ marginTop: 14, height: 40, borderRadius: 12, background: C.brand, color: '#fff', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Simpan booking</div>
        </div>
      )}
    </AbsoluteFill>
  );
}

export default function BookingVideo() {
  const tabIn = usePop(24, { damping: 16, stiffness: 110 });
  return (
    <Backdrop>
      <Side style={{ left: 72, top: 120, width: 470 }}>
        <Chip from={2}>📅 Booking Lapangan</Chip>
        <Headline text="Booking lapangan tanpa bentrok jadwal." from={8} size={56} mark={['bentrok']} style={{ marginTop: 24 }} />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            { f: 60, t: 'Padel, futsal, mini soccer, badminton' },
            { f: PEAK, t: 'Tarif jam sibuk berlaku otomatis' },
            { f: SAVE, t: 'DP tercatat, sisanya ditagih saat main' },
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

      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 30}deg)` }}>
        <Calendar />
      </Tablet>

      <Pointer
        path={[
          { f: DRAG.from - 16, x: SCR.x + colX(1) + 64, y: SCR.y + rowY(19) + 10 },
          { f: DRAG.from, x: SCR.x + colX(1) + 64, y: SCR.y + rowY(19) + 10, tap: true },
          { f: DRAG.to, x: SCR.x + colX(1) + 64, y: SCR.y + rowY(21) - 10 },
          { f: SAVE - 16, x: SCR.x + 628 - 14 - 130, y: SCR.y + 120 + 168 },
          { f: SAVE, x: SCR.x + 628 - 14 - 130, y: SCR.y + 120 + 168, tap: true },
          { f: CLASH - 14, x: SCR.x + colX(2) + 64, y: SCR.y + rowY(19) + 10 },
          { f: CLASH, x: SCR.x + colX(2) + 64, y: SCR.y + rowY(19) + 10, tap: true },
        ]}
      />

      <Caption
        items={[
          { f: 50, to: 140, text: 'Semua lapangan dalam satu kalender' },
          { f: PEAK + 4, to: 260, text: 'Tarik slot kosong, tarif & DP terhitung sendiri' },
          { f: CLASH - 6, to: 352, text: 'Jam yang sudah terisi tidak bisa dobel booking' },
        ]}
      />
      <Outro from={360} line="Lapangan penuh, jadwal tetap rapi." />
    </Backdrop>
  );
}
