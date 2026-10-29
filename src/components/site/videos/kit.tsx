import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

/**
 * Perkakas bersama untuk video fitur (Remotion). Semua gerak diturunkan dari
 * nomor frame, jadi video yang sama bisa diputar di halaman lewat Player
 * maupun dirender jadi MP4 lewat `npm run video:render`.
 */

export const C = {
  brand: '#0d5df3',
  brandDark: '#0a47c0',
  tint: '#eaf1ff',
  accent: '#ffc93c',
  ink: '#231f20',
  body: '#5a5f6b',
  mute: '#8a8f99',
  line: '#e6e8ee',
  soft: '#f6f8fc',
  ok: '#16a34a',
  okSoft: '#dcfce7',
  danger: '#e5484d',
  night: '#101114',
};

export const FONT = 'var(--font-jakarta, "Plus Jakarta Sans"), "Plus Jakarta Sans", system-ui, sans-serif';
export const FPS = 30;

/**
 * Mode "panggung": hanya bagian perangkat yang tampil (teks samping, caption,
 * dan penutup disembunyikan). Dipakai Reels vertikal yang memotong video ini.
 */
export const StageMode = createContext(false);

/** Kolom teks di sisi kiri video; hilang dalam mode panggung. */
export function Side({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  if (useContext(StageMode)) return null;
  return <div style={{ position: 'absolute', ...style }}>{children}</div>;
}

export const rupiah = (n: number) => `Rp${Math.round(n).toLocaleString('id-ID')}`;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Nilai 0→1 dari frame `from` selama `dur` frame, dengan ease keluar yang halus. */
export function useProgress(from: number, dur = 18, ease: (t: number) => number = Easing.bezier(0.22, 1, 0.36, 1)) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, from + dur], [0, 1], { ...clamp, easing: ease });
}

/** Pegas 0→1 yang mulai di frame `from`. */
export function usePop(from: number, config: { damping?: number; stiffness?: number; mass?: number } = {}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - from, fps, config: { damping: 14, stiffness: 160, ...config } });
}

/** Hitung maju sebuah angka dari `a` ke `b` antara frame `from`..`to`. */
export function useCount(a: number, b: number, from: number, to: number) {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [a, b], { ...clamp, easing: Easing.out(Easing.cubic) });
}

/** Latar terang dengan cahaya merek yang bergerak pelan dan grid tipis. */
export function Backdrop({ tone = 'light', children }: { tone?: 'light' | 'dark' | 'brand'; children?: ReactNode }) {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const bg = tone === 'dark' ? C.night : tone === 'brand' ? C.brand : '#f7f9ff';
  const blobA = tone === 'light' ? 'rgba(13,93,243,0.20)' : 'rgba(91,140,255,0.45)';
  const blobB = tone === 'light' ? 'rgba(255,201,60,0.26)' : 'rgba(255,201,60,0.30)';
  const grid = tone === 'light' ? 'rgba(13,93,243,0.07)' : 'rgba(255,255,255,0.06)';
  // Cahaya & grid hanya digeser lewat transform supaya di halaman tidak
  // memaksa browser melukis ulang seluruh latar setiap frame.
  const blob = (color: string, x: number, y: number, size: number, dx: number, dy: number) => (
    <div style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle, ${color}, transparent 62%)`, transform: `translate(${dx}px, ${dy}px)`, willChange: 'transform' }} />
  );
  return (
    <AbsoluteFill style={{ background: bg, fontFamily: FONT, color: tone === 'light' ? C.ink : '#fff', overflow: 'hidden' }}>
      {blob(blobA, 900, 160, 1100, Math.sin(t * 0.6) * 100, Math.cos(t * 0.5) * 60)}
      {blob(blobB, 230, 620, 900, Math.cos(t * 0.4) * 80, Math.sin(t * 0.7) * 45)}
      <AbsoluteFill style={{ maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -64,
            bottom: 0,
            backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            transform: `translateY(${(frame * 0.4) % 64}px)`,
            willChange: 'transform',
          }}
        />
      </AbsoluteFill>
      {children}
    </AbsoluteFill>
  );
}

/** Judul kinetik: tiap kata naik dari balik garis, berurutan. `mark` diberi warna merek. */
export function Headline({ text, from = 0, size = 64, color, mark = [], markColor = C.brand, stagger = 3, style }: { text: string; from?: number; size?: number; color?: string; mark?: string[]; markColor?: string; stagger?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');
  return (
    <div style={{ fontSize: size, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.035em', color, display: 'flex', flexWrap: 'wrap', columnGap: size * 0.26, ...style }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - from - i * stagger, fps, config: { damping: 18, stiffness: 140 } });
        const marked = mark.includes(w.replace(/[.,!?]/g, ''));
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: size * 0.08, marginBottom: -size * 0.08 }}>
            <span style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 110}%) rotate(${(1 - p) * 6}deg)`, color: marked ? markColor : undefined }}>{w}</span>
          </span>
        );
      })}
    </div>
  );
}

/** Label kecil berbentuk pil di atas judul. */
export function Chip({ children, from = 0, tone = 'brand', style }: { children: ReactNode; from?: number; tone?: 'brand' | 'accent' | 'white' | 'ok'; style?: CSSProperties }) {
  const p = usePop(from, { damping: 12 });
  const palette = {
    brand: { background: C.tint, color: C.brand },
    accent: { background: C.accent, color: C.ink },
    white: { background: 'rgba(255,255,255,0.14)', color: '#fff' },
    ok: { background: C.okSoft, color: C.ok },
  }[tone];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, fontSize: 22, fontWeight: 700, letterSpacing: '0.02em', transform: `scale(${p})`, opacity: Math.min(1, p * 2), transformOrigin: 'left center', ...palette, ...style }}>
      {children}
    </div>
  );
}

/** Teks kecil yang muncul dari bawah. */
export function FadeUp({ from = 0, children, style, distance = 24 }: { from?: number; children: ReactNode; style?: CSSProperties; distance?: number }) {
  const p = useProgress(from, 20);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * distance}px)`, ...style }}>{children}</div>;
}

/** Bingkai ponsel. Ukuran dasar 300×620, isi layar diberikan lewat children. */
export function Phone({ children, style, screen = '#fff', width = 300 }: { children: ReactNode; style?: CSSProperties; screen?: string; width?: number }) {
  const h = width * 2.06;
  return (
    <div style={{ position: 'absolute', width, height: h, borderRadius: width * 0.15, background: '#16171b', padding: width * 0.035, boxShadow: '0 50px 90px -30px rgba(13,30,80,0.55), inset 0 0 0 2px #2b2d33', ...style }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: width * 0.12, background: screen, overflow: 'hidden' }}>
        {children}
        <div style={{ position: 'absolute', top: 10, left: '50%', width: width * 0.3, height: 24, marginLeft: -width * 0.15, borderRadius: 20, background: '#16171b' }} />
      </div>
    </div>
  );
}

/** Bingkai tablet mendatar. */
export function Tablet({ children, style, width = 760, screen = '#fff' }: { children: ReactNode; style?: CSSProperties; width?: number; screen?: string }) {
  return (
    <div style={{ position: 'absolute', width, height: width * 0.66, borderRadius: 34, background: '#16171b', padding: 16, boxShadow: '0 60px 110px -40px rgba(13,30,80,0.55), inset 0 0 0 2px #2b2d33', ...style }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 20, background: screen, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

/** Bar judul aplikasi di dalam layar. */
export function AppBar({ title, sub, tone = 'brand', right }: { title: string; sub?: string; tone?: 'brand' | 'white'; right?: ReactNode }) {
  const dark = tone === 'brand';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', background: dark ? C.brand : '#fff', color: dark ? '#fff' : C.ink, borderBottom: dark ? 'none' : `1px solid ${C.line}` }}>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>{title}</div>
        {sub && <div style={{ fontSize: 13, opacity: 0.75, marginTop: 2 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/** Jari/penunjuk yang bergerak antar titik lalu "mengetuk". */
export function Pointer({ path }: { path: { f: number; x: number; y: number; tap?: boolean }[] }) {
  const frame = useCurrentFrame();
  if (path.length === 0 || frame < path[0].f - 8) return null;
  const fs = path.map(p => p.f);
  const ease = Easing.inOut(Easing.cubic);
  const x = interpolate(frame, fs, path.map(p => p.x), { ...clamp, easing: ease });
  const y = interpolate(frame, fs, path.map(p => p.y), { ...clamp, easing: ease });
  const appear = interpolate(frame, [path[0].f - 8, path[0].f], [0, 1], clamp);
  const last = path[path.length - 1].f;
  const vanish = interpolate(frame, [last + 10, last + 20], [1, 0], clamp);
  let press = 0;
  let ring = 0;
  let ringOpacity = 0;
  for (const p of path) {
    if (!p.tap) continue;
    const d = frame - p.f;
    if (d >= -4 && d <= 4) press = Math.max(press, 1 - Math.abs(d) / 4);
    if (d >= 0 && d <= 16) {
      ring = d / 16;
      ringOpacity = 1 - ring;
    }
  }
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 0, height: 0, zIndex: 50, opacity: appear * vanish, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: -34, top: -34, width: 68, height: 68, borderRadius: '50%', border: `4px solid ${C.brand}`, transform: `scale(${0.4 + ring * 1.1})`, opacity: ringOpacity }} />
      <div style={{ position: 'absolute', left: -20, top: -20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: '3px solid rgba(35,31,32,0.85)', boxShadow: '0 10px 24px rgba(0,0,0,0.25)', transform: `scale(${1 - press * 0.25})` }} />
    </div>
  );
}

/** Kode QR dekoratif (pola tetap, bukan kode sungguhan). */
export function QrGlyph({ size = 180, color = C.ink, seed = 7 }: { size?: number; color?: string; seed?: number }) {
  const n = 21;
  const cells: ReactNode[] = [];
  const finder = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (finder(r, c)) continue;
      const v = Math.sin((r + 1) * 12.9898 * seed + (c + 1) * 78.233) * 43758.5453;
      if (v - Math.floor(v) > 0.52) cells.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} />);
    }
  }
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} rx={1.6} fill={color} />
      <rect x={x + 1} y={y + 1} width={5} height={5} rx={1} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.6} fill={color} />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} style={{ background: '#fff', borderRadius: size * 0.08, display: 'block' }}>
      <g fill={color}>{cells}</g>
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}
    </svg>
  );
}

/** Penutup semua video: logo, kalimat manfaat, dan alamat situs. */
export function Outro({ from, line, sub = 'Coba gratis 14 hari · lokakasir.id' }: { from: number; line: string; sub?: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stage = useContext(StageMode);
  if (frame < from || stage) return null;
  const wipe = interpolate(frame, [from, from + 16], [0, 1], { ...clamp, easing: Easing.bezier(0.7, 0, 0.2, 1) });
  const logo = spring({ frame: frame - from - 10, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill style={{ clipPath: `circle(${wipe * 150}% at 50% 50%)`, background: C.brand, alignItems: 'center', justifyContent: 'center', fontFamily: FONT, color: '#fff' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.22), transparent 45%), radial-gradient(circle at 80% 90%, rgba(120,170,255,0.45), transparent 40%)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>
        <div style={{ transform: `scale(${logo})`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Img src={staticFile('images/site/logo-white.svg')} style={{ height: 64 }} />
        </div>
        <Headline text={line} from={from + 16} size={58} style={{ justifyContent: 'center', maxWidth: 1000 }} mark={[]} />
        <FadeUp from={from + 30}>
          <div style={{ fontSize: 26, fontWeight: 600, padding: '14px 30px', borderRadius: 999, background: C.accent, color: C.ink }}>{sub}</div>
        </FadeUp>
      </div>
    </AbsoluteFill>
  );
}

/** Teks penjelas di bagian bawah layar, berganti per bagian video. */
export function Caption({ items }: { items: { f: number; to: number; text: string }[] }) {
  const frame = useCurrentFrame();
  const stage = useContext(StageMode);
  const cur = items.find(i => frame >= i.f && frame < i.to);
  if (!cur || stage) return null;
  const inP = interpolate(frame, [cur.f, cur.f + 10], [0, 1], clamp);
  const outP = interpolate(frame, [cur.to - 8, cur.to], [1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'center', zIndex: 40 }}>
      <div style={{ padding: '14px 28px', borderRadius: 999, background: 'rgba(16,17,20,0.88)', color: '#fff', fontSize: 26, fontWeight: 600, opacity: inP * outP, transform: `translateY(${(1 - inP) * 20}px)` }}>{cur.text}</div>
    </div>
  );
}

/** Kolom kiri standar: chip, judul kinetik, dan poin-poin yang muncul bergiliran. */
export function SideText({ chip, chipTone = 'brand', title, mark = [], bullets, size = 54, top = 118, width = 480 }: { chip: ReactNode; chipTone?: 'brand' | 'accent' | 'ok'; title: string; mark?: string[]; bullets: { f: number; t: string }[]; size?: number; top?: number; width?: number }) {
  return (
    <Side style={{ left: 72, top, width }}>
      <Chip from={2} tone={chipTone}>{chip}</Chip>
      <Headline text={title} from={8} size={size} mark={mark} style={{ marginTop: 24 }} />
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 15 }}>
        {bullets.map(b => (
          <FadeUp key={b.t} from={b.f}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 600, color: C.body }}>
              <span style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 9, background: C.brand, color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
              {b.t}
            </div>
          </FadeUp>
        ))}
      </div>
    </Side>
  );
}
