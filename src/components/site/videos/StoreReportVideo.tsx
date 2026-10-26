import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, Pointer, SideText, Tablet, usePop } from './kit';

export const STORE_REPORT_DURATION = 480;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 570, y: 104, w: 660 };
const SCREEN = { x: TAB.x + 16, y: TAB.y + 16 };
const GRADE = 34;
const TIPS = 190; // layar saran
const PACK_TAP = 292; // ketuk "Jadikan paket"
const GUARD = 336; // Radar & Pojok Pajak

// Bobot pilar sama dengan Rapor Toko di aplikasi: 82·25% + 74·25% + 80·20% + 69·15% + 85·15% = 78 (B).
const PILLARS = [
  { n: 'Penjualan', v: 82 },
  { n: 'Untung', v: 74 },
  { n: 'Menu', v: 80 },
  { n: 'Pelanggan', v: 69 },
  { n: 'Kontrol', v: 85 },
];
const SCORE = 78;

const TONES = {
  Tambah: { bg: C.okSoft, fg: C.ok },
  Peluang: { bg: C.tint, fg: C.brand },
  Benahi: { bg: '#fff4d6', fg: '#a16207' },
  Kurangi: { bg: '#fde8e8', fg: C.danger },
} as const;

const SUGGESTIONS: { tag: keyof typeof TONES; title: string; note: string; action?: string }[] = [
  { tag: 'Tambah', title: 'Es Teh Manis habis sejak Kamis', note: '±Rp240rb/hari penjualan hilang', action: 'Isi stok' },
  { tag: 'Peluang', title: 'Teh · Besar + Mie Goreng sering dibeli bersama', note: 'Pembeli bayar rata-rata Rp18.000', action: 'Jadikan paket' },
  { tag: 'Benahi', title: 'Potongan harga 11% dari omzet', note: 'Sehatnya di bawah 8%' },
  { tag: 'Kurangi', title: 'Roti Bakar Keju terjual 3, turun dari 21', note: 'Pertimbangkan ganti menu' },
];

function Bar({ title }: { title: string }) {
  return (
    <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{title}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['7 hari', '30 hari'].map((t, i) => (
          <div key={t} style={{ padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 800, background: i === 0 ? C.ink : C.soft, color: i === 0 ? '#fff' : C.body }}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function GradeScreen() {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [GRADE, GRADE + 56], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const score = Math.round(SCORE * fill);
  const letter = usePop(GRADE + 56, { damping: 9, stiffness: 200 });
  const r = 74;
  const len = 2 * Math.PI * r;
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <Bar title="Rapor Toko · Kedai Loka" />
      <div style={{ display: 'flex', gap: 14, padding: 14 }}>
        <div style={{ width: 236, borderRadius: 18, background: '#fff', border: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 12px' }}>
          <div style={{ position: 'relative', width: 180, height: 180 }}>
            <svg width={180} height={180} viewBox="0 0 180 180">
              <circle cx={90} cy={90} r={r} fill="none" stroke={C.soft} strokeWidth={16} />
              <circle cx={90} cy={90} r={r} fill="none" stroke={C.brand} strokeWidth={16} strokeLinecap="round" strokeDasharray={`${len * (SCORE / 100) * fill} ${len}`} transform="rotate(-90 90 90)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, color: C.brand, transform: `scale(${letter})` }}>B</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.body, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{score} / 100</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: '6px 12px', borderRadius: 999, background: C.okSoft, color: C.ok, fontSize: 12.5, fontWeight: 800, opacity: letter }}>▲ Naik dari C minggu lalu</div>
        </div>
        <div style={{ flex: 1, borderRadius: 18, background: '#fff', border: `1px solid ${C.line}`, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginBottom: 14 }}>Lima pilar usaha</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {PILLARS.map((p, i) => {
              const g = interpolate(frame, [GRADE + 10 + i * 7, GRADE + 50 + i * 7], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
              const weak = p.v < 70;
              return (
                <div key={p.n}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: C.body }}>
                    <span>{p.n}</span>
                    <span style={{ color: weak ? '#a16207' : C.ink, fontVariantNumeric: 'tabular-nums' }}>{Math.round(p.v * g)}</span>
                  </div>
                  <div style={{ height: 9, borderRadius: 9, background: C.soft, marginTop: 5 }}>
                    <div style={{ height: '100%', width: `${p.v * g}%`, borderRadius: 9, background: weak ? C.accent : C.brand }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ margin: '0 14px', padding: '10px 14px', borderRadius: 14, background: '#fff', border: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 700, color: C.body, opacity: letter }}>
        <span>📬 Rapor baru tiap Senin 08.00</span>
        <span style={{ color: C.ink }}>412 nota dinilai</span>
      </div>
    </AbsoluteFill>
  );
}

function TipsScreen() {
  const frame = useCurrentFrame();
  const press = frame >= PACK_TAP ? interpolate(frame, [PACK_TAP, PACK_TAP + 4, PACK_TAP + 10], [1, 0.92, 1], clamp) : 1;
  const toast = usePop(PACK_TAP + 8, { damping: 13 });
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <Bar title="Saran minggu ini" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 14px' }}>
        {SUGGESTIONS.map((s, i) => {
          const p = interpolate(frame, [TIPS + 6 + i * 9, TIPS + 24 + i * 9], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });
          const tone = TONES[s.tag];
          const isPack = s.action === 'Jadikan paket';
          return (
            <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 14, background: '#fff', border: `1px solid ${C.line}`, opacity: p, transform: `translateX(${(1 - p) * 60}px)` }}>
              <div style={{ width: 70, flexShrink: 0, textAlign: 'center', padding: '5px 0', borderRadius: 8, fontSize: 11, fontWeight: 900, letterSpacing: '0.06em', background: tone.bg, color: tone.fg }}>{s.tag.toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.mute, marginTop: 2 }}>{s.note}</div>
              </div>
              {s.action && (
                <div style={{ flexShrink: 0, padding: '7px 12px', borderRadius: 10, fontSize: 12, fontWeight: 800, background: isPack ? C.brand : C.soft, color: isPack ? '#fff' : C.ink, transform: `scale(${isPack ? press : 1})` }}>{s.action}</div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: '50%', bottom: 16, transform: `translate(-50%, ${(1 - toast) * 40}px)`, opacity: Math.min(1, toast * 1.5), display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 14, background: C.night, color: '#fff', fontSize: 13.5, fontWeight: 700, whiteSpace: 'nowrap' }}>
        <span style={{ color: C.accent }}>✓</span> Paket “Teh · Besar + Mie Goreng” Rp18.000 dibuat
      </div>
    </AbsoluteFill>
  );
}

function GuardScreen() {
  const frame = useCurrentFrame();
  const a = usePop(GUARD + 8, { damping: 15 });
  const b = usePop(GUARD + 22, { damping: 15 });
  const tax = interpolate(frame, [GUARD + 24, GUARD + 60], [0, 96000], { ...clamp, easing: Easing.out(Easing.cubic) });
  const card = { flex: 1, borderRadius: 18, background: '#fff', border: `1px solid ${C.line}`, padding: '16px 16px' } as const;
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <Bar title="Jaga uang toko" />
      <div style={{ display: 'flex', gap: 12, padding: 14, height: 'calc(100% - 50px)' }}>
        <div style={{ ...card, transform: `translateY(${(1 - a) * 50}px)`, opacity: a }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.06em', color: C.danger }}>RADAR KEBOCORAN</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: C.ink, marginTop: 8, lineHeight: 1.25 }}>Refund kasir Dedi 3× lebih banyak dari rekannya</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 14 }}>
            {[['Batal nota', '2', false], ['Refund', '4', true], ['Diskon manual', '1', false], ['Kas kurang', 'Rp20.000', false]].map(([l, v, hot]) => (
              <div key={l as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: C.body, padding: '6px 10px', borderRadius: 9, background: hot ? '#fde8e8' : C.soft }}>
                <span>{l}</span><span style={{ color: hot ? C.danger : C.ink }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ ...card, transform: `translateY(${(1 - b) * 50}px)`, opacity: b }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.06em', color: C.brand }}>POJOK PAJAK</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.body, marginTop: 8 }}>PPh Final 0,5% · Oktober</div>
          <div style={{ fontSize: 34, fontWeight: 900, color: C.ink, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>Rp{Math.round(tax).toLocaleString('id-ID')}</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: C.mute, marginTop: 2 }}>dari omzet Rp19,2 jt</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px', borderRadius: 11, background: '#fff4d6', color: '#a16207', fontSize: 13, fontWeight: 800 }}>🔔 Setor paling lambat 16 Nov</div>
          <div style={{ marginTop: 8, fontSize: 11.5, fontWeight: 600, color: C.mute }}>Pengingat tiap tanggal 10</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Screens() {
  const frame = useCurrentFrame();
  const screen = frame >= GUARD ? 2 : frame >= TIPS ? 1 : 0;
  const at = [0, TIPS, GUARD][screen];
  const swap = screen ? interpolate(frame, [at, at + 12], [0, 1], clamp) : 1;
  return (
    <AbsoluteFill style={{ opacity: swap, transform: `translateX(${(1 - swap) * 30}px)` }}>
      {screen === 0 ? <GradeScreen /> : screen === 1 ? <TipsScreen /> : <GuardScreen />}
    </AbsoluteFill>
  );
}

export default function StoreReportVideo() {
  const tabIn = usePop(14, { damping: 16, stiffness: 110 });
  // Tombol "Jadikan paket" ada di kartu saran kedua.
  const pack = { x: SCREEN.x + 628 - 14 - 12 - 52, y: SCREEN.y + 155 };
  return (
    <Backdrop>
      <SideText
        chip="🏅 Baru · Rapor Toko"
        chipTone="accent"
        title="Kasir yang memberi tahu apa yang harus dibenahi."
        mark={['dibenahi']}
        width={470}
        bullets={[
          { f: GRADE, t: 'Nilai A–E dari lima pilar usaha' },
          { f: TIPS, t: 'Saran: stok habis, paket, menu turun' },
          { f: GUARD, t: 'Radar kebocoran & Pojok Pajak' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 28}deg)` }}>
        <Screens />
      </Tablet>
      <Pointer path={[{ f: PACK_TAP - 26, x: pack.x + 60, y: pack.y + 90 }, { f: PACK_TAP, x: pack.x, y: pack.y, tap: true }]} />
      <Caption
        items={[
          { f: 44, to: TIPS - 4, text: 'Tiap Senin, toko Anda dapat rapor' },
          { f: TIPS + 4, to: GUARD - 4, text: 'Saran diurutkan dari rupiah terbesar' },
          { f: GUARD + 4, to: 414, text: 'Kebocoran kas & pajak ikut dijaga' },
        ]}
      />
      <Outro from={420} line="Bukan cuma mencatat. Memberi tahu." />
    </Backdrop>
  );
}
