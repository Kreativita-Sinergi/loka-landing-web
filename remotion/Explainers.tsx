import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import { C, FONT, FadeUp, Headline, Phone, Pointer, QrGlyph, rupiah, usePop } from '../src/components/site/videos/kit';
import { Bg, Cta, Sfx, TRACKS, type WhatsNewTrack } from './WhatsNewReel';

/**
 * Tiga konten penjelas untuk Reels & Threads: satu fitur per video, dibuat
 * untuk orang yang belum pernah memakai Loka. Alurnya selalu sama:
 * masalah sehari-hari → tiga langkah (satu kalimat sederhana, bagian yang
 * ditekan disorot) → hasilnya → ajakan. Iramanya sengaja lebih pelan dari
 * video rangkuman, dan tidak memakai istilah aplikasi ("grup ekstra",
 * "harga dari ekstra") — cukup bahasa kasir sehari-hari.
 */

export type ExplainerFormat = 'reel' | 'threads';
export type ExplainerId = 'RaporToko' | 'Topping' | 'Saldo';
export type ExplainerAudio = 'voice' | 'music';
/**
 * `voice`: narasi per adegan dari `public/audio/vo/<id>/<n>.wav` tanpa musik;
 * `voDur` (detik per adegan, termasuk ajakan) diisi `calculateMetadata` dari
 * `durations.json` dan menentukan panjang tiap adegan. `music`: versi musik.
 */
export type ExplainerProps = { id: ExplainerId; format: ExplainerFormat; audio?: ExplainerAudio; voDur?: number[] };

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const LAYOUT = {
  reel: { height: 1920, textTop: 250, phoneW: 500, phoneTop: 590, head: 66, sub: 36, badge: 28, paper: 1 },
  threads: { height: 1350, textTop: 80, phoneW: 360, phoneTop: 520, head: 54, sub: 30, badge: 24, paper: 0.74 },
} as const;

// Layar ponsel digambar di ukuran desain 300×642 lalu diperbesar.
const DW = 300;
const DH = 642;

type SceneProps = { format: ExplainerFormat };
type Scene = { len: number; C: ComponentType<SceneProps>; taps?: number[] };

/* ───────────────────────── perkakas bersama ───────────────────────── */

function Device({ format, children, enterAt }: { format: ExplainerFormat; children: ReactNode; enterAt?: number }) {
  const L = LAYOUT[format];
  const P = L.phoneW;
  const frame = useCurrentFrame();
  const pop = usePop(enterAt ?? -100, { damping: 16, stiffness: 110 });
  const scale = (P * 0.93) / DW;
  if (enterAt !== undefined && frame < enterAt) return null;
  return (
    <Phone width={P} style={{ left: (1080 - P) / 2, top: L.phoneTop + (1 - pop) * 700 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: DW, height: DH, transform: `scale(${scale})`, transformOrigin: '0 0', fontFamily: FONT, color: C.ink }}>{children}</div>
    </Phone>
  );
}

/** Bingkai kuning berdenyut di sekitar bagian yang perlu dilihat. */
function Ring({ x, y, w, h, from, to = 9999, r = 14 }: { x: number; y: number; w: number; h: number; from: number; to?: number; r?: number }) {
  const frame = useCurrentFrame();
  if (frame < from || frame > to) return null;
  const p = interpolate(frame, [from, from + 10], [0, 1], clamp);
  const pulse = 0.5 + 0.5 * Math.sin((frame - from) / 4);
  return <div style={{ position: 'absolute', left: x - 5, top: y - 5, width: w + 10, height: h + 10, borderRadius: r, border: `3px solid ${C.accent}`, boxShadow: `0 0 ${8 + pulse * 14}px ${C.accent}`, opacity: p, transform: `scale(${1.12 - 0.12 * p})`, zIndex: 30, pointerEvents: 'none' }} />;
}

const press = (frame: number, f: number) => (frame >= f ? interpolate(frame, [f, f + 4, f + 10], [1, 0.92, 1], clamp) : 1);

function StepText({ format, step, title, sub, mark = [] }: { format: ExplainerFormat; step: number; title: string; sub: string; mark?: string[] }) {
  const L = LAYOUT[format];
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame, fps, config: { damping: 12 } });
  return (
    <div style={{ position: 'absolute', left: 70, right: 70, top: L.textTop, fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${badge})`, transformOrigin: 'left center' }}>
        <span style={{ fontSize: L.badge, fontWeight: 900, letterSpacing: '0.06em', background: C.accent, color: C.ink, padding: '8px 20px', borderRadius: 999 }}>LANGKAH {step}</span>
        <span style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3].map(i => <span key={i} style={{ width: i === step ? 34 : 12, height: 12, borderRadius: 6, background: i <= step ? C.accent : 'rgba(255,255,255,0.25)' }} />)}
        </span>
      </div>
      <Headline text={title} from={4} size={L.head} color="#fff" stagger={2} mark={mark} markColor={C.accent} style={{ marginTop: 22 }} />
      <FadeUp from={18}><div style={{ marginTop: 16, fontSize: L.sub, fontWeight: 600, lineHeight: 1.3, color: 'rgba(255,255,255,0.82)' }}>{sub}</div></FadeUp>
    </div>
  );
}

function Problem({ format, title, sub, children }: { format: ExplainerFormat; title: string; sub: string; children: ReactNode }) {
  const L = LAYOUT[format];
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <div style={{ position: 'absolute', left: 70, right: 70, top: L.textTop }}>
        <Headline text={title} from={2} size={L.head + 8} color="#fff" stagger={2} />
        <FadeUp from={22}><div style={{ marginTop: 18, fontSize: L.sub, fontWeight: 600, lineHeight: 1.3, color: 'rgba(255,255,255,0.82)' }}>{sub}</div></FadeUp>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: L.phoneTop + (format === 'reel' ? 60 : 0), display: 'flex', justifyContent: 'center' }}>{children}</div>
    </AbsoluteFill>
  );
}

function Result({ format, items, note }: { format: ExplainerFormat; items: string[]; note?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const big = format === 'reel';
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: '#fff', justifyContent: 'center', padding: '0 80px' }}>
      <Headline text="Hasilnya:" from={0} size={big ? 92 : 76} color={C.accent} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: big ? 30 : 22, marginTop: big ? 50 : 34 }}>
        {items.map((t, i) => {
          const p = spring({ frame: frame - 14 - i * 12, fps, config: { damping: 13 } });
          return (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: big ? 50 : 42, fontWeight: 800, lineHeight: 1.2, opacity: Math.min(1, p * 2), transform: `translateX(${(1 - p) * 80}px)` }}>
              <span style={{ width: big ? 64 : 54, height: big ? 64 : 54, flexShrink: 0, borderRadius: '50%', background: C.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: big ? 38 : 32 }}>✓</span>
              {t}
            </div>
          );
        })}
      </div>
      {note && <FadeUp from={60}><div style={{ marginTop: big ? 50 : 34, fontSize: big ? 32 : 28, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{note}</div></FadeUp>}
    </AbsoluteFill>
  );
}

function Toast({ from, top, children }: { from: number; top: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const p = usePop(from, { damping: 13 });
  if (frame < from) return null;
  return (
    <div style={{ position: 'absolute', left: 14, right: 14, top, padding: '11px 14px', borderRadius: 14, background: C.night, color: '#fff', fontSize: 13.5, fontWeight: 800, textAlign: 'center', transform: `translateY(${(1 - p) * 30}px)`, opacity: Math.min(1, p * 1.5), zIndex: 20 }}>{children}</div>
  );
}

const card: CSSProperties = { position: 'absolute', left: 14, right: 14, borderRadius: 16, background: '#fff', border: `1.5px solid ${C.line}`, boxSizing: 'border-box' };

/* ───────────────────────── Konten 1: Rapor Toko ───────────────────────── */

function A0({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const chips = ['Omzet naik?', 'Untung?', 'Stok aman?'];
  return (
    <Problem format={format} title="Jualan tiap hari, tapi toko lagi untung atau nggak?" sub="Banyak pemilik baru sadar di akhir bulan — saat sudah terlambat.">
      <div style={{ position: 'relative', width: 700, height: 600 }}>
        <div style={{ position: 'absolute', left: 230, top: 120, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 150, transform: `scale(${usePop(6, { damping: 10 })})` }}>🤔</div>
        {chips.map((c, i) => {
          const p = spring({ frame: frame - 26 - i * 10, fps: 30, config: { damping: 11 } });
          const pos = [{ l: 20, t: 60 }, { l: 470, t: 20 }, { l: 420, t: 400 }][i];
          return <div key={c} style={{ position: 'absolute', left: pos.l, top: pos.t, whiteSpace: 'nowrap', fontSize: 42, fontWeight: 800, padding: '16px 28px', borderRadius: 999, background: i === 1 ? C.accent : '#fff', color: C.ink, transform: `scale(${p}) rotate(${(i - 1) * 5}deg)` }}>{c}</div>;
        })}
      </div>
    </Problem>
  );
}

function A1({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const slide = usePop(16, { damping: 14 });
  return (
    <AbsoluteFill>
      <StepText format={format} step={1} title="Tiap Senin pagi, Loka kirim rapor toko." mark={['rapor']} sub="Nilainya A sampai E, seperti rapor sekolah." />
      <Device format={format} enterAt={0}>
        <AbsoluteFill style={{ background: 'linear-gradient(170deg, #1b2a5c, #0d5df3)', color: '#fff', alignItems: 'center' }}>
          <div style={{ marginTop: 70, fontSize: 64, fontWeight: 300 }}>08.00</div>
          <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.85 }}>Senin, 26 Oktober</div>
        </AbsoluteFill>
        <div style={{ position: 'absolute', left: 14, right: 14, top: 200, padding: 13, borderRadius: 18, background: 'rgba(255,255,255,0.95)', transform: `translateY(${(1 - slide) * -160}px) scale(${press(frame, 95)})`, opacity: slide }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: C.mute }}>
            <span style={{ width: 22, height: 22, borderRadius: 6, background: C.brand, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>L</span>
            LOKA KASIR · sekarang
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, marginTop: 8 }}>📊 Rapor minggu ini: B</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.body, marginTop: 4 }}>Naik dari C. Ada 3 saran untuk toko Anda.</div>
        </div>
        <Ring x={14} y={200} w={272} h={100} from={56} to={100} r={20} />
        <Pointer path={[{ f: 70, x: 220, y: 420 }, { f: 95, x: 150, y: 260, tap: true }]} />
      </Device>
    </AbsoluteFill>
  );
}

const PILLARS = [
  { n: 'Penjualan', d: 'Omzet naik dari minggu lalu', v: 82 },
  { n: 'Untung', d: 'Selisih harga & modal sehat', v: 74 },
  { n: 'Menu', d: 'Ada yang laris, ada yang mandek', v: 80 },
  { n: 'Pelanggan', d: 'Yang datang lagi masih sedikit', v: 69 },
  { n: 'Kontrol', d: 'Batal & refund masih wajar', v: 85 },
];

function A2({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [8, 50], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const letter = usePop(48, { damping: 9, stiffness: 200 });
  const r = 56;
  const len = 2 * Math.PI * r;
  return (
    <AbsoluteFill>
      <StepText format={format} step={2} title="Nilainya dihitung dari 5 hal penting." sub="Yang kuning artinya perlu diperhatikan." />
      <Device format={format}>
        <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 20, fontWeight: 900 }}>Rapor Toko</div>
        <div style={{ position: 'absolute', left: 16, top: 70, fontSize: 12, fontWeight: 600, color: C.mute }}>19–25 Oktober</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 136, height: 136 }}>
            <svg width={136} height={136} viewBox="0 0 136 136">
              <circle cx={68} cy={68} r={r} fill="none" stroke={C.soft} strokeWidth={14} />
              <circle cx={68} cy={68} r={r} fill="none" stroke={C.brand} strokeWidth={14} strokeLinecap="round" strokeDasharray={`${len * 0.78 * fill} ${len}`} transform="rotate(-90 68 68)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1, color: C.brand, transform: `scale(${letter})` }}>B</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.body }}>{Math.round(78 * fill)} / 100</div>
            </div>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: C.ok, background: C.okSoft, padding: '6px 10px', borderRadius: 10, opacity: letter }}>▲ Naik dari C</div>
        </div>
        {PILLARS.map((p, i) => {
          const show = interpolate(frame, [30 + i * 8, 44 + i * 8], [0, 1], clamp);
          const weak = p.v < 70;
          return (
            <div key={p.n} style={{ ...card, top: 250 + i * 76, height: 68, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: show, transform: `translateY(${(1 - show) * 20}px)`, background: weak && frame > 100 ? '#fff8e1' : '#fff' }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900 }}>{p.n}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.body, marginTop: 2 }}>{p.d}</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: weak ? C.accent : C.tint, color: weak ? C.ink : C.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900 }}>{p.v}</div>
            </div>
          );
        })}
        <Ring x={14} y={250 + 3 * 76} w={272} h={68} from={100} r={18} />
      </Device>
    </AbsoluteFill>
  );
}

const TIPS = [
  { tag: 'TAMBAH', bg: C.okSoft, fg: C.ok, t: 'Es teh habis sejak Kamis', d: 'Pembeli yang cari jadi pulang. ±Rp240rb/hari hilang.', a: 'Isi stok' },
  { tag: 'PELUANG', bg: C.tint, fg: C.brand, t: 'Teh + Mie Goreng sering dibeli bareng', d: 'Jadikan paket hemat biar makin laku.', a: 'Jadikan paket' },
  { tag: 'BENAHI', bg: '#fff4d6', fg: '#a16207', t: 'Diskon sudah 11% dari omzet', d: 'Terlalu besar. Sehatnya di bawah 8%.' },
];

function A3({ format }: SceneProps) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StepText format={format} step={3} title="Lalu Loka kasih saran yang bisa langsung dikerjakan." mark={['saran']} sub="Diurutkan dari yang paling berpengaruh ke uang." />
      <Device format={format}>
        <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 20, fontWeight: 900 }}>Saran minggu ini</div>
        {TIPS.map((t, i) => {
          const show = interpolate(frame, [10 + i * 16, 26 + i * 16], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 1, 0.36, 1) });
          const top = 84 + i * 166;
          return (
            <div key={t.t} style={{ ...card, top, height: 154, padding: 14, opacity: show, transform: `translateX(${(1 - show) * 80}px)` }}>
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.06em', padding: '4px 9px', borderRadius: 7, background: t.bg, color: t.fg }}>{t.tag}</span>
              <div style={{ fontSize: 16, fontWeight: 900, marginTop: 10, lineHeight: 1.25 }}>{t.t}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: C.body, marginTop: 5, lineHeight: 1.35 }}>{t.d}</div>
              {t.a && <div style={{ position: 'absolute', right: 12, bottom: 12, padding: '8px 14px', borderRadius: 10, fontSize: 13, fontWeight: 900, background: i === 1 ? C.brand : C.soft, color: i === 1 ? '#fff' : C.ink, transform: `scale(${i === 1 ? press(frame, 130) : 1})` }}>{t.a}</div>}
            </div>
          );
        })}
        <Ring x={170} y={84 + 166 + 154 - 12 - 36} w={118} h={36} from={96} to={134} r={12} />
        <Pointer path={[{ f: 108, x: 250, y: 560 }, { f: 130, x: 228, y: 386, tap: true }]} />
        <Toast from={136} top={588}>✓ Paket “Teh + Mie Goreng” dibuat</Toast>
      </Device>
    </AbsoluteFill>
  );
}

/* ───────────────────── Konten 2: Pesanan dengan topping ───────────────────── */

function B0({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const msg = 'Seblak 1 ya kak 🌶️ Level 3, kerupuknya 3, telurnya 1 🙏';
  const chars = Math.floor(interpolate(frame, [8, 58], [0, msg.length], clamp));
  const pop = usePop(4, { damping: 13 });
  const reply = usePop(66, { damping: 12 });
  return (
    <Problem format={format} title="Pesanan kayak gini sering bikin kasir bingung." sub="Level kelupaan, topping lupa ditagih, totalnya salah.">
      <div style={{ width: 760, transform: `scale(${pop})`, transformOrigin: 'left top' }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>🧑 Pembeli</div>
        <div style={{ padding: '30px 36px', borderRadius: '8px 40px 40px 40px', background: '#fff', color: C.ink, fontSize: 52, fontWeight: 800, lineHeight: 1.3, minHeight: 140 }}>{[...msg].slice(0, chars).join('')}</div>
        {frame >= 66 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 40, transform: `scale(${reply})`, transformOrigin: 'right top' }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>Kasir 😵</div>
            <div style={{ padding: '26px 34px', borderRadius: '40px 8px 40px 40px', background: C.accent, color: C.ink, fontSize: 48, fontWeight: 800, lineHeight: 1.3 }}>Eh… totalnya jadi berapa ya?</div>
          </div>
        )}
      </div>
    </Problem>
  );
}

const LEVEL_W = (DW - 28 - 16) / 3;

function B1({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const chosen = frame >= 80;
  const warn = frame >= 20 && !chosen;
  const blink = warn ? 0.5 + 0.5 * Math.sin(frame / 4) : 0;
  return (
    <AbsoluteFill>
      <StepText format={format} step={1} title="Pilih menunya, lalu pilih level pedas." mark={['level']} sub="Selama level belum dipilih, pesanan belum bisa ditambahkan." />
      <Device format={format} enterAt={0}>
        <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 24, fontWeight: 900 }}>Seblak</div>
        <div style={{ position: 'absolute', left: 16, top: 76, fontSize: 15, fontWeight: 800, color: C.brand }}>Rp10.000</div>
        <div style={{ position: 'absolute', left: 14, right: 14, top: 116, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 900 }}>Level pedas</span>
          <span style={{ fontSize: 11.5, fontWeight: 900, padding: '4px 9px', borderRadius: 7, background: chosen ? C.okSoft : '#fde8e8', color: chosen ? C.ok : C.danger }}>{chosen ? '✓ Sudah dipilih' : 'Wajib pilih 1'}</span>
        </div>
        <div style={{ position: 'absolute', left: 8, top: 142, width: DW - 16, height: 132, borderRadius: 14, border: `2.5px solid rgba(229,72,77,${blink})` }} />
        {[0, 1, 2, 3, 4, 5].map(i => {
          const on = chosen && i === 3;
          return (
            <div key={i} style={{ position: 'absolute', left: 14 + (i % 3) * (LEVEL_W + 8), top: 150 + Math.floor(i / 3) * 62, width: LEVEL_W, height: 54, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900, background: on ? C.brand : C.soft, color: on ? '#fff' : C.body, transform: `scale(${i === 3 ? press(frame, 80) : 1})` }}>Level {i}</div>
          );
        })}
        <div style={{ position: 'absolute', left: 14, right: 14, top: 300, opacity: 0.35 }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>Topping</div>
          {['Kerupuk', 'Telur', 'Sosis'].map((n, i) => <div key={n} style={{ ...card, left: 0, right: 0, top: 30 + i * 62, height: 54 }} />)}
        </div>
        <div style={{ position: 'absolute', left: 14, right: 14, top: 570, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#fff', background: chosen ? C.brand : '#c9d6f2' }}>{chosen ? 'Tambah · Rp10.000' : 'Pilih level dulu'}</div>
        <Pointer path={[{ f: 54, x: 200, y: 420 }, { f: 80, x: 14 + LEVEL_W / 2, y: 150 + 62 + 27, tap: true }]} />
      </Device>
    </AbsoluteFill>
  );
}

const TOPPINGS = [
  { n: 'Kerupuk', p: 1000 },
  { n: 'Telur', p: 3000 },
  { n: 'Sosis', p: 2000 },
  { n: 'Bakso', p: 2000 },
];
const T_ROW = (i: number) => 112 + i * 74;
const B2T = { kerupuk: 35, plus1: 75, plus2: 105, telur: 145 };

function B2({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const krp = frame >= B2T.plus2 ? 3 : frame >= B2T.plus1 ? 2 : frame >= B2T.kerupuk ? 1 : 0;
  const tlr = frame >= B2T.telur ? 1 : 0;
  const qty = [krp, tlr, 0, 0];
  const total = 10000 + krp * 1000 + tlr * 3000;
  const three = usePop(B2T.plus2 + 4, { damping: 10 });
  return (
    <AbsoluteFill>
      <StepText format={format} step={2} title="Tambah topping. Kerupuk 3? Tekan + sampai angka 3." mark={['+', '3']} sub="Telur cukup 1 kali tekan. Totalnya ikut berubah." />
      <Device format={format}>
        <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 18, fontWeight: 900 }}>Seblak · Level 3</div>
        <div style={{ position: 'absolute', left: 14, right: 14, top: 80, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 900 }}>Topping</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: C.body }}>Boleh lebih dari satu</span>
        </div>
        {TOPPINGS.map((t, i) => {
          const q = qty[i];
          const on = q > 0;
          return (
            <div key={t.n} style={{ ...card, top: T_ROW(i), height: 64, padding: '0 12px 0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: on ? C.tint : '#fff', border: `2px solid ${on ? C.brand : C.line}`, transform: `scale(${i === 0 ? press(frame, B2T.kerupuk) : i === 1 ? press(frame, B2T.telur) : 1})` }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 900 }}>{t.n}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.mute }}>+{rupiah(t.p)} per buah</div>
              </div>
              {on ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 15, border: `2px solid ${C.brand}`, color: C.brand, background: '#fff', fontSize: 20, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</span>
                  <span style={{ width: 24, textAlign: 'center', fontSize: 20, fontWeight: 900 }}>{q}</span>
                  <span style={{ width: 30, height: 30, borderRadius: 15, background: C.brand, color: '#fff', fontSize: 20, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${i === 0 ? Math.min(press(frame, B2T.plus1), press(frame, B2T.plus2)) : 1})` }}>+</span>
                </div>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 800, color: C.brand }}>Pilih</span>
              )}
            </div>
          );
        })}
        {frame >= B2T.plus2 && (
          <div style={{ position: 'absolute', left: 116, top: T_ROW(0) - 30, whiteSpace: 'nowrap', padding: '5px 12px', borderRadius: 999, background: C.accent, fontSize: 14, fontWeight: 900, transform: `scale(${three}) rotate(-4deg)`, zIndex: 25 }}>3 kerupuk = {rupiah(3000)} ✓</div>
        )}
        <div style={{ position: 'absolute', left: 14, right: 14, top: 420, padding: '10px 12px', borderRadius: 12, background: C.soft, fontSize: 12.5, fontWeight: 700, color: C.body, lineHeight: 1.6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Seblak</span><span>{rupiah(10000)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: krp ? 1 : 0.3 }}><span>Kerupuk {krp} × 1.000</span><span>{rupiah(krp * 1000)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: tlr ? 1 : 0.3 }}><span>Telur {tlr} × 3.000</span><span>{rupiah(tlr * 3000)}</span></div>
        </div>
        <div style={{ position: 'absolute', left: 14, right: 14, top: 570, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#fff', background: C.brand }}>Tambah · {rupiah(total)}</div>
        <Pointer
          path={[
            { f: B2T.kerupuk - 18, x: 120, y: 330 },
            { f: B2T.kerupuk, x: 90, y: T_ROW(0) + 32, tap: true },
            { f: B2T.plus1, x: 259, y: T_ROW(0) + 32, tap: true },
            { f: B2T.plus2, x: 259, y: T_ROW(0) + 32, tap: true },
            { f: B2T.telur, x: 90, y: T_ROW(1) + 32, tap: true },
          ]}
        />
      </Device>
    </AbsoluteFill>
  );
}

function B3({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const L = LAYOUT[format];
  const p = usePop(4, { damping: 15, stiffness: 120 });
  const sum = usePop(96, { damping: 11 });
  const lines: { l: string; r: string; sub?: string; strong?: boolean }[] = [
    { l: 'Seblak', r: '10.000', strong: true },
    { l: '  + Level 3', r: 'gratis' },
    { l: '  + Kerupuk ×3', r: '3.000', sub: '    (3 × 1.000)' },
    { l: '  + Telur ×1', r: '3.000' },
  ];
  return (
    <AbsoluteFill>
      <StepText format={format} step={3} title="Totalnya langsung benar, struknya jelas." mark={['benar']} sub="Pembeli bisa cocokkan sendiri. Dapur juga terima pesanan yang sama." />
      <div style={{ position: 'absolute', left: (1080 - 720) / 2, top: L.phoneTop + 10, width: 720, transform: `scale(${L.paper}) translateY(${(1 - p) * 300}px)`, transformOrigin: 'top center', opacity: Math.min(1, p * 1.5) }}>
        <div style={{ padding: '44px 50px 50px', background: '#fff', borderRadius: 10, boxShadow: '0 60px 120px -40px rgba(0,0,0,0.6)', fontFamily: 'ui-monospace, Menlo, monospace', color: C.ink, rotate: '-1.5deg' }}>
          <div style={{ textAlign: 'center', fontSize: 40, fontWeight: 900 }}>SEBLAK LOKA</div>
          <div style={{ borderTop: '4px dashed #cfd3dc', margin: '26px 0' }} />
          {lines.map((ln, i) => {
            const s = interpolate(frame, [14 + i * 12, 24 + i * 12], [0, 1], clamp);
            return (
              <div key={ln.l} style={{ opacity: s, marginTop: i ? 14 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 36, fontWeight: ln.strong ? 900 : 600, whiteSpace: 'pre' }}><span>{ln.l}</span><span>{ln.r}</span></div>
                {ln.sub && <div style={{ fontSize: 28, color: C.mute, whiteSpace: 'pre' }}>{ln.sub}</div>}
              </div>
            );
          })}
          <div style={{ borderTop: '4px dashed #cfd3dc', margin: '26px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 46, fontWeight: 900, opacity: interpolate(frame, [70, 80], [0, 1], clamp) }}><span>TOTAL</span><span>Rp16.000</span></div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '20px 34px', borderRadius: 999, background: C.accent, color: C.ink, fontFamily: FONT, fontSize: 34, fontWeight: 900, whiteSpace: 'nowrap', transform: `scale(${sum})` }}>10.000 + 3.000 + 3.000 = 16.000 ✓</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ───────────────────────── Konten 3: Saldo pelanggan ───────────────────────── */

function C0({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const p = usePop(6, { damping: 13 });
  const stamp = spring({ frame: frame - 58, fps: 30, config: { damping: 9, stiffness: 200 } });
  return (
    <Problem format={format} title="Pelanggan langganan mau titip uang dulu?" sub="Biasanya dicatat di buku… lalu lupa sisanya berapa.">
      <div style={{ position: 'relative', width: 620, padding: '40px 46px', borderRadius: 24, background: '#fdf6e3', color: '#5b4a2a', transform: `rotate(-3deg) scale(${p})`, fontFamily: 'ui-rounded, "Comic Sans MS", cursive', fontSize: 44, lineHeight: 1.6, boxShadow: '0 50px 100px -40px rgba(0,0,0,0.6)' }}>
        <div>📒 Bu Sari titip 100rb</div>
        <div>- beli kopi 18rb</div>
        <div>- beli roti 12rb</div>
        <div>sisa … <span style={{ color: C.danger, fontWeight: 900 }}>??</span></div>
        {frame >= 58 && <div style={{ position: 'absolute', right: -30, bottom: -40, padding: '10px 26px', border: `8px solid ${C.danger}`, borderRadius: 18, color: C.danger, fontFamily: FONT, fontSize: 56, fontWeight: 900, letterSpacing: '0.06em', transform: `rotate(-12deg) scale(${2 - stamp})`, opacity: Math.min(1, stamp * 2), background: 'rgba(253,246,227,0.9)' }}>RIBET!</div>}
      </div>
    </Problem>
  );
}

function C1({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const picked = frame >= 45;
  const done = frame >= 92;
  const amount = interpolate(frame, [96, 120], [0, 100000], { ...clamp, easing: Easing.out(Easing.cubic) });
  const amountW = (DW - 28 - 16) / 3;
  return (
    <AbsoluteFill>
      <StepText format={format} step={1} title="Isi saldo pelanggan." mark={['saldo']} sub="Pelanggan bayar Rp100.000 tunai, uangnya langsung tercatat di laci kasir." />
      <Device format={format} enterAt={0}>
        <div style={{ position: 'absolute', left: 16, top: 44, fontSize: 22, fontWeight: 900 }}>Bu Sari</div>
        <div style={{ position: 'absolute', left: 16, top: 74, fontSize: 12.5, fontWeight: 700, color: C.mute }}>0812 •••• 7890 · Member</div>
        <div style={{ ...card, top: 104, height: 92, border: 'none', background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`, color: '#fff', padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Saldo</div>
          <div style={{ fontSize: 32, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{rupiah(done ? amount : 0)}</div>
        </div>
        <div style={{ position: 'absolute', left: 16, top: 216, fontSize: 16, fontWeight: 900 }}>Isi saldo</div>
        {[50000, 100000, 200000].map((v, i) => {
          const on = picked && i === 1;
          return <div key={v} style={{ position: 'absolute', left: 14 + i * (amountW + 8), top: 246, width: amountW, height: 52, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, background: on ? C.brand : C.soft, color: on ? '#fff' : C.ink, transform: `scale(${i === 1 ? press(frame, 45) : 1})` }}>{rupiah(v)}</div>;
        })}
        <div style={{ position: 'absolute', left: 16, top: 322, fontSize: 14, fontWeight: 900 }}>Dibayar pakai</div>
        {['Tunai', 'Transfer', 'QRIS'].map((m, i) => (
          <div key={m} style={{ position: 'absolute', left: 14 + i * (amountW + 8), top: 348, width: amountW, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13.5, fontWeight: 800, border: `2px solid ${i === 0 ? C.brand : C.line}`, color: i === 0 ? C.brand : C.body }}>{m}</div>
        ))}
        <div style={{ position: 'absolute', left: 14, right: 14, top: 570, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#fff', background: picked ? C.brand : '#c9d6f2', transform: `scale(${press(frame, 92)})` }}>{picked ? 'Isi saldo Rp100.000' : 'Isi saldo'}</div>
        <Toast from={100} top={500}>✓ Rp100.000 tunai masuk laci kasir</Toast>
        <Pointer path={[{ f: 26, x: 220, y: 460 }, { f: 45, x: 150, y: 272, tap: true }, { f: 92, x: 150, y: 596, tap: true }]} />
      </Device>
    </AbsoluteFill>
  );
}

function C2({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const paid = frame >= 64;
  const left = interpolate(frame, [70, 100], [100000, 65000], { ...clamp, easing: Easing.out(Easing.cubic) });
  const ok = usePop(64, { damping: 12 });
  return (
    <AbsoluteFill>
      <StepText format={format} step={2} title="Waktu belanja, tinggal tekan Pakai saldo." mark={['Pakai', 'saldo']} sub="Saldo langsung terpotong. Sisanya tercetak di struk." />
      <Device format={format}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 118, background: C.brand, color: '#fff', padding: '44px 16px 0', boxSizing: 'border-box' }}>
          <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Total belanja</div>
          <div style={{ fontSize: 32, fontWeight: 900 }}>Rp35.000</div>
        </div>
        <div style={{ position: 'absolute', left: 14, top: 132, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 34, height: 34, borderRadius: 17, background: C.accent, fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>S</span>
          <span style={{ fontSize: 16, fontWeight: 900 }}>Bu Sari</span>
          <span style={{ fontSize: 11.5, fontWeight: 900, padding: '3px 8px', borderRadius: 7, background: C.okSoft, color: C.ok }}>Member</span>
        </div>
        {!paid ? (
          <div style={{ ...card, top: 184, height: 96, background: C.tint, border: `2px solid ${C.brand}`, padding: '0 12px 0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: C.brand }}>Saldo bisa dipakai</div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>Rp100.000</div>
            </div>
            <div style={{ padding: '11px 14px', borderRadius: 12, background: C.brand, color: '#fff', fontSize: 14, fontWeight: 900, transform: `scale(${press(frame, 60)})` }}>Pakai saldo</div>
          </div>
        ) : (
          <div style={{ ...card, top: 184, height: 150, border: 'none', background: C.ok, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${ok})` }}>
            <div style={{ fontSize: 28, fontWeight: 900 }}>✓ Lunas</div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9, marginTop: 2 }}>Rp35.000 dibayar pakai saldo</div>
            <div style={{ marginTop: 10, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.2)', fontSize: 15, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>Sisa saldo {rupiah(left)}</div>
          </div>
        )}
        <div style={{ position: 'absolute', left: 14, right: 14, top: 360, opacity: paid ? 0.3 : 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.mute, marginBottom: 8 }}>Atau bayar pakai</div>
          {['Tunai', 'QRIS', 'Transfer', 'Kartu'].map((m, i) => <div key={m} style={{ position: 'absolute', left: (i % 2) * 140, top: 26 + Math.floor(i / 2) * 58, width: 132, height: 50, borderRadius: 12, border: `1.5px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }}>{m}</div>)}
        </div>
        <Ring x={170} y={184 + 48 - 20} w={110} h={40} from={30} to={62} r={14} />
        <Pointer path={[{ f: 40, x: 240, y: 420 }, { f: 60, x: 224, y: 232, tap: true }]} />
      </Device>
    </AbsoluteFill>
  );
}

function C3({ format }: SceneProps) {
  const frame = useCurrentFrame();
  const L = LAYOUT[format];
  const cardIn = usePop(2, { damping: 14 });
  const cardOut = interpolate(frame, [62, 76], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const scan = interpolate(frame, [26, 54], [0, 1], clamp);
  const amount = interpolate(frame, [92, 120], [0, 65000], { ...clamp, easing: Easing.out(Easing.cubic) });
  const s = L.paper;
  return (
    <AbsoluteFill>
      <StepText format={format} step={3} title="Pelanggan cek sisa saldonya sendiri." mark={['sendiri']} sub="Cukup scan QR di kartu member — tidak perlu tanya kasir." />
      {cardOut < 1 && (
        <div style={{ position: 'absolute', left: (1080 - 560) / 2, top: L.phoneTop + 20, width: 560, padding: '40px 40px 44px', borderRadius: 40, background: '#fff', textAlign: 'center', fontFamily: FONT, color: C.ink, transform: `scale(${s * cardIn * (1 - cardOut * 0.3)}) rotate(${-3 + cardOut * -10}deg)`, transformOrigin: 'top center', opacity: 1 - cardOut, boxShadow: '0 60px 120px -40px rgba(0,0,0,0.6)' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.mute }}>Kedai Loka</div>
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: '0.12em' }}>KARTU MEMBER</div>
          <div style={{ position: 'relative', width: 300, margin: '28px auto 0' }}>
            <QrGlyph size={300} seed={11} />
            {scan > 0 && scan < 1 && <div style={{ position: 'absolute', left: -14, right: -14, top: scan * 300, height: 8, borderRadius: 4, background: C.accent, boxShadow: `0 0 30px ${C.accent}` }} />}
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, marginTop: 24 }}>Sari Wulandari</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.brand, marginTop: 10 }}>Scan untuk cek saldo & poin</div>
        </div>
      )}
      <Device format={format} enterAt={70}>
        <div style={{ position: 'absolute', left: 12, right: 12, top: 40, height: 30, borderRadius: 15, background: C.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, color: C.body }}>🔒 app.lokakasir.id/saldo</div>
        <div style={{ position: 'absolute', left: 16, top: 90, fontSize: 13, fontWeight: 700, color: C.mute }}>Kedai Loka</div>
        <div style={{ position: 'absolute', left: 16, top: 110, fontSize: 22, fontWeight: 900 }}>Halo, Sari 👋</div>
        <div style={{ ...card, top: 156, height: 130, border: 'none', background: `linear-gradient(135deg, ${C.brand}, ${C.brandDark})`, color: '#fff', padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.85 }}>Sisa saldo Anda</div>
          <div style={{ fontSize: 36, fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>{rupiah(amount)}</div>
          <div style={{ fontSize: 13, fontWeight: 800, marginTop: 8 }}>⭐ 240 poin</div>
        </div>
        <div style={{ position: 'absolute', left: 16, top: 306, fontSize: 14, fontWeight: 900 }}>Riwayat</div>
        {[['Belanja 26 Okt', '−Rp35.000'], ['Isi saldo tunai', '+Rp100.000']].map(([l, v], i) => (
          <div key={l} style={{ position: 'absolute', left: 16, right: 16, top: 334 + i * 46, height: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, fontWeight: 700, color: C.body, borderBottom: `1px solid ${C.line}` }}>
            <span>{l}</span><span style={{ color: v.startsWith('+') ? C.ok : C.ink, fontWeight: 900 }}>{v}</span>
          </div>
        ))}
      </Device>
    </AbsoluteFill>
  );
}

/* ───────────────────────── rangkaian ───────────────────────── */

const CTA_LEN = 126;

function resultScene(items: string[], note?: string): ComponentType<SceneProps> {
  const R = ({ format }: SceneProps) => <Result format={format} items={items} note={note} />;
  return R;
}

const EXPLAINERS: Record<ExplainerId, { track: WhatsNewTrack; scenes: Scene[] }> = {
  RaporToko: {
    track: 'golden',
    scenes: [
      { len: 110, C: A0 },
      { len: 140, C: A1, taps: [95] },
      { len: 170, C: A2 },
      { len: 190, C: A3, taps: [130] },
      { len: 120, C: resultScene(['Tahu toko sedang sehat atau tidak', 'Tahu apa yang harus dibenahi', 'Tanpa membaca laporan panjang'], 'Fitur Pro · bisa dicoba gratis 30 hari') },
    ],
  },
  Topping: {
    track: 'trap',
    scenes: [
      { len: 125, C: B0 },
      { len: 150, C: B1, taps: [80] },
      { len: 200, C: B2, taps: [B2T.kerupuk, B2T.plus1, B2T.plus2, B2T.telur] },
      { len: 170, C: B3 },
      { len: 120, C: resultScene(['Pesanan tidak salah lagi', 'Topping tidak lupa ditagih', 'Pembeli bisa cek struknya sendiri']) },
    ],
  },
  Saldo: {
    track: 'karma',
    scenes: [
      { len: 110, C: C0 },
      { len: 165, C: C1, taps: [45, 92] },
      { len: 165, C: C2, taps: [60] },
      { len: 170, C: C3 },
      { len: 120, C: resultScene(['Tidak perlu buku catatan', 'Sisa saldo selalu jelas', 'Pelanggan makin sering kembali'], 'Fitur Pro · bisa dicoba gratis 30 hari') },
    ],
  },
};

export const EXPLAINER_IDS = Object.keys(EXPLAINERS) as ExplainerId[];

// Narasi mulai sedikit setelah adegan muncul, dan adegan ditahan sebentar setelah kalimat selesai.
const VO_LEAD = 8;
const VO_TAIL = 12;

/** Panjang tiap adegan + ajakan; dengan narasi, adegan dipanjangkan sampai kalimatnya selesai. */
function sceneLengths(id: ExplainerId, voDur?: number[]) {
  const base = [...EXPLAINERS[id].scenes.map(sc => sc.len), CTA_LEN];
  if (!voDur) return base;
  return base.map((len, i) => Math.max(len, voDur[i] === undefined ? 0 : Math.ceil(voDur[i] * 30) + VO_LEAD + VO_TAIL));
}
const startOf = (lens: number[], i: number) => lens.slice(0, i).reduce((a, b) => a + b, 0);

export function explainerMeta({ id, format, voDur }: ExplainerProps) {
  const lens = sceneLengths(id, voDur);
  return { width: 1080, height: LAYOUT[format].height, durationInFrames: startOf(lens, lens.length) };
}

/** Membaca durasi narasi saat studio/render; tanpa berkasnya jatuh ke panjang bawaan. */
export async function explainerCalculateMetadata({ props }: { props: ExplainerProps }) {
  let voDur: number[] | undefined;
  if ((props.audio ?? 'voice') === 'voice') {
    try {
      const res = await fetch(staticFile('audio/vo/durations.json'));
      if (res.ok) voDur = ((await res.json()) as Record<string, number[]>)[props.id];
    } catch {
      voDur = undefined;
    }
  }
  const next = { ...props, voDur };
  return { durationInFrames: explainerMeta(next).durationInFrames, props: next };
}

function SceneWrap({ len, children }: { len: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [len - 8, len], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return <AbsoluteFill style={{ opacity: 1 - out, transform: `translateY(${-out * 60}px)` }}>{children}</AbsoluteFill>;
}

export default function Explainer({ id, format, audio = 'voice', voDur }: ExplainerProps) {
  const { durationInFrames } = useVideoConfig();
  const { scenes, track } = EXPLAINERS[id];
  const music = TRACKS[track];
  const voice = audio === 'voice' && voDur !== undefined;
  const lens = sceneLengths(id, voice ? voDur : undefined);
  const ctaAt = startOf(lens, scenes.length);
  // Versi musik: lagu "pecah" tepat saat Langkah 1 dimulai.
  const musicStart = music.drop - lens[0] / 30;
  return (
    <AbsoluteFill style={{ fontFamily: FONT, background: '#0b1020' }}>
      <Bg />
      {scenes.map((sc, i) => (
        <Sequence key={i} from={startOf(lens, i)} durationInFrames={lens[i]}>
          <SceneWrap len={lens[i]}><sc.C format={format} /></SceneWrap>
        </Sequence>
      ))}
      <Sequence from={ctaAt}><Cta /></Sequence>

      {voice ? (
        voDur.map((_, i) => (
          <Sequence key={`vo${i}`} from={startOf(lens, i) + VO_LEAD} layout="none">
            <Audio src={staticFile(`audio/vo/${id}/${i}.wav`)} volume={1} />
          </Sequence>
        ))
      ) : (
        <Audio
          src={staticFile(music.file)}
          trimBefore={Math.round(musicStart * 30)}
          volume={f => interpolate(f, [0, 12, durationInFrames - 36, durationInFrames - 1], [0, music.volume * 0.8, music.volume * 0.8, 0], clamp)}
        />
      )}
      {scenes.slice(1).map((_, i) => <Sfx key={`w${i}`} at={startOf(lens, i + 1) - 22} file="whoosh.mp3" volume={voice ? 0.2 : 0.45} />)}
      {scenes.flatMap((sc, i) => (sc.taps ?? []).map(t => <Sfx key={`t${i}-${t}`} at={startOf(lens, i) + t} file="pop.mp3" volume={voice ? 0.22 : 0.35} />))}
      <Sfx at={ctaAt - 30} file="whoosh-big.mp3" volume={voice ? 0.25 : 0.55} />
      {!voice && <Sfx at={ctaAt + 4} file="logo-hit.mp3" volume={0.5} trimBefore={48} />}
    </AbsoluteFill>
  );
}
