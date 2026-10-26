import { AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import { C, FONT, Headline, StageMode } from '../src/components/site/videos/kit';
import type { FeatureVideoId } from '../src/components/site/videos/meta';
import { FEATURE_VIDEOS } from '../src/components/site/videos/registry';

/**
 * Rangkuman update app 1.40–1.46 untuk Instagram Reels, TikTok, dan Threads.
 *
 * Alurnya: hook "kasir cuma buat nyatat?" → hitung versi 1.40→1.46 → lima
 * cuplikan fitur (dipotong dari video fitur situs) → deretan fitur lain → ajakan.
 * Format `reel` 1080×1920 (9:16) dan `threads` 1080×1350 (4:5, ukuran terbesar
 * di feed Threads & Instagram). Teks penting dijaga di antara y 250–1600 pada
 * format reel supaya tidak tertutup tombol aplikasi.
 */

const HOOK = 78;
const VERSIONS = 48;
const MORE = 126;
const CTA = 126;

const SEGMENTS: { id: FeatureVideoId; from: number; len: number; tag: string; title: string; sub: string }[] = [
  { id: 'RaporToko', from: 112, len: 156, tag: 'Rapor Toko', title: 'Tiap Senin, toko dapat rapor A–E', sub: 'Plus saran: stok habis, paket, menu turun' },
  { id: 'GrupEkstra', from: 140, len: 132, tag: 'Grup Ekstra', title: 'Snack ×3, level 3, tetap rapi', sub: 'Tiap ekstra punya −/+ sendiri, struk merinci harganya' },
  { id: 'SaldoMember', from: 58, len: 142, tag: 'Saldo & Member', title: 'Pelanggan punya saldo & kartu member', sub: 'Bayar pakai saldo, cek saldo lewat QR' },
  { id: 'TokoBangunan', from: 54, len: 150, tag: 'Toko Bangunan', title: 'Jual kabel per meter, kaca per m²', sub: 'Surat jalan tanpa harga, cetak atau PDF' },
  { id: 'MejaGratis', from: 48, len: 140, tag: 'Biliar & PS', title: 'Meja gratis hari ini, diundi!', sub: 'Sewa “bayar dulu”: timer jalan setelah lunas' },
];

const MORE_ITEMS = ['Radar Kebocoran', 'Pojok Pajak 0,5%', 'Lab Harga', 'QR penilaian di struk', 'Panggil Balik', 'Paket per varian', 'Buku Bon', 'Komisi salon', 'Booking lapangan online', 'Harga GoFood/Grab', 'Lancar saat sinyal lemah', 'Alarm pesanan QR'];

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Bagian video 1280×720 yang dipotong: area perangkat di sisi kanan.
const CROP = { x: 540, size: 720 };

export type WhatsNewFormat = 'reel' | 'threads';
export type WhatsNewTrack = keyof typeof TRACKS;
export type WhatsNewProps = { format: WhatsNewFormat; only?: FeatureVideoId; track?: WhatsNewTrack };

/**
 * Musik dari Mixkit (Stock Music Free License), diunduh lewat
 * `remotion/fetch-audio.sh`. `drop` = detik ketika lagu "pecah"; di video
 * rangkuman titik itu jatuh tepat saat angka versi muncul, jadi hook diisi
 * bagian build-up lagunya.
 */
export const TRACKS = {
  golden: { file: 'audio/mixkit/golden-storm.mp3', drop: 45.35, volume: 0.62 },
  karma: { file: 'audio/mixkit/karma.mp3', drop: 15.0, volume: 0.95 },
  trap: { file: 'audio/mixkit/trap-electro.mp3', drop: 12.1, volume: 0.68 },
} as const;
const DEFAULT_TRACK: WhatsNewTrack = 'golden';

const LAYOUT = {
  reel: { height: 1920, progressTop: 200, headTop: 270, headSize: 84, card: { x: 70, y: 640, size: 940 }, subSize: 40, hookSize: 104, grade: 380 },
  threads: { height: 1350, progressTop: 56, headTop: 104, headSize: 66, card: { x: 170, y: 372, size: 740 }, subSize: 34, hookSize: 84, grade: 280 },
} as const;

const SEGMENTS_START = HOOK + VERSIONS;
const SEGMENTS_LEN = SEGMENTS.reduce((s, x) => s + x.len, 0);
const segStart = (i: number) => SEGMENTS_START + SEGMENTS.slice(0, i).reduce((s, x) => s + x.len, 0);
const singleLength = (id: FeatureVideoId) => FEATURE_VIDEOS[id].duration - 60;

export function whatsNewMeta({ format, only }: WhatsNewProps) {
  const duration = only ? singleLength(only) + CTA : SEGMENTS_START + SEGMENTS_LEN + MORE + CTA;
  return { width: 1080, height: LAYOUT[format].height, durationInFrames: duration };
}

export const WHATS_NEW_FEATURES = SEGMENTS.map(s => s.id);

export function Bg() {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(170deg, #0b1020 0%, #0a1a4a 55%, #0d5df3 130%)' }}>
      <div style={{ position: 'absolute', left: -300, top: -200, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,93,243,0.55), transparent 62%)', transform: `translate(${Math.sin(t * 0.5) * 120}px, ${Math.cos(t * 0.4) * 80}px)` }} />
      <div style={{ position: 'absolute', right: -360, bottom: -260, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,201,60,0.28), transparent 60%)', transform: `translate(${Math.cos(t * 0.6) * 90}px, ${Math.sin(t * 0.5) * 70}px)` }} />
      <AbsoluteFill style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '90px 90px', maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 70%)' }} />
    </AbsoluteFill>
  );
}

/** Hook: pertanyaan, lalu nilai rapor "B" dibanting ke tengah layar. */
function Hook({ format }: { format: WhatsNewFormat }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = LAYOUT[format];
  const out = interpolate(frame, [HOOK - 10, HOOK], [1, 0], clamp);
  const slam = spring({ frame: frame - 22, fps, config: { damping: 9, stiffness: 220 } });
  const ring = interpolate(frame, [22, 52], [0, 0.78], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shake = frame >= 24 && frame < 34 ? Math.sin(frame * 3) * (34 - frame) * 1.2 : 0;
  const size = L.grade;
  const r = size / 2 - 22;
  const len = 2 * Math.PI * r;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: format === 'reel' ? 70 : 40, padding: 80, opacity: out, transform: `translateX(${shake}px)` }}>
      <Headline text="Kasir cuma buat nyatat?" from={2} size={L.hookSize} color="#fff" style={{ justifyContent: 'center', textAlign: 'center' }} />
      <div style={{ position: 'relative', width: size, height: size, transform: `scale(${slam * 1.0})`, opacity: Math.min(1, slam * 2) }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth={30} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.accent} strokeWidth={30} strokeLinecap="round" strokeDasharray={`${len * ring} ${len}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: size * 0.48, fontWeight: 900, lineHeight: 1, color: '#fff' }}>B</div>
          <div style={{ fontSize: size * 0.08, fontWeight: 800, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>RAPOR TOKO</div>
        </div>
      </div>
      <Headline text="Sekarang Loka kasih rapor." from={36} size={L.hookSize} color={C.accent} style={{ justifyContent: 'center', textAlign: 'center' }} />
    </AbsoluteFill>
  );
}

/** Versi aplikasi berhitung 1.40 → 1.46. */
function Versions() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = Math.min(6, Math.floor(interpolate(frame, [0, 26], [0, 6.99], { ...clamp, easing: Easing.in(Easing.quad) })));
  const done = spring({ frame: frame - 28, fps, config: { damping: 10 } });
  const out = interpolate(frame, [VERSIONS - 8, VERSIONS], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', fontFamily: FONT, color: '#fff', opacity: out }}>
      <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '0.12em', color: '#cfe0ff' }}>UPDATE LOKA KASIR</div>
      <div style={{ fontSize: 230, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.05, fontVariantNumeric: 'tabular-nums', color: step === 6 ? C.accent : '#fff', transform: `scale(${1 + done * 0.06})` }}>1.4{step}</div>
      <div style={{ fontSize: 46, fontWeight: 800, padding: '16px 34px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', transform: `scale(${done})`, opacity: Math.min(1, done * 2) }}>7 update dalam 10 hari</div>
    </AbsoluteFill>
  );
}

function Segment({ index, format, single }: { index: number; format: WhatsNewFormat; single?: boolean }) {
  const s = SEGMENTS[index];
  const v = FEATURE_VIDEOS[s.id];
  const len = single ? singleLength(s.id) : s.len;
  const L = LAYOUT[format];
  const CARD = L.card;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 140 } });
  const exit = interpolate(frame, [len - 9, len], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const tag = spring({ frame: frame - 2, fps, config: { damping: 12 } });
  const scale = CARD.size / CROP.size;
  const Comp = v.component;
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: '#fff', transform: `translateX(${-exit * 1080}px)`, opacity: 1 - exit * 0.4 }}>
      <div style={{ position: 'absolute', left: 80, right: 80, top: L.headTop }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${tag})`, transformOrigin: 'left center' }}>
          <span style={{ fontSize: 30, fontWeight: 800, color: C.ink, background: C.accent, padding: '10px 20px', borderRadius: 999 }}>{single ? 'BARU' : String(index + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: '0.04em', color: '#cfe0ff' }}>{s.tag.toUpperCase()}</span>
        </div>
        <Headline text={s.title} from={4} size={L.headSize} color="#fff" stagger={2} style={{ marginTop: 22 }} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: CARD.x,
          top: CARD.y,
          width: CARD.size,
          height: CARD.size,
          borderRadius: 56,
          overflow: 'hidden',
          boxShadow: '0 60px 120px -40px rgba(0,0,0,0.7), 0 0 0 3px rgba(255,255,255,0.12)',
          transform: `translateY(${(1 - enter) * 160}px) scale(${0.9 + enter * 0.1}) rotate(${(1 - enter) * 4}deg)`,
          opacity: Math.min(1, enter * 1.4),
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1280, height: 720, transformOrigin: '0 0', transform: `scale(${scale}) translateX(${-CROP.x}px)` }}>
          <StageMode.Provider value>
            <Sequence from={single ? 0 : -s.from} layout="none">
              <div style={{ position: 'relative', width: 1280, height: 720 }}><Comp /></div>
            </Sequence>
          </StageMode.Provider>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: CARD.y + CARD.size + 34, fontSize: L.subSize, textAlign: format === 'threads' ? 'center' : undefined, fontWeight: 700, color: 'rgba(255,255,255,0.88)', opacity: interpolate(frame, [10, 22], [0, 1], clamp), transform: `translateY(${interpolate(frame, [10, 22], [20, 0], clamp)}px)` }}>{s.sub}</div>
    </AbsoluteFill>
  );
}

/** Garis progres di atas: berapa fitur sudah lewat. */
function Progress({ top }: { top: number }) {
  const frame = useCurrentFrame();
  const end = SEGMENTS_START + SEGMENTS_LEN;
  if (frame < SEGMENTS_START - 6 || frame > end + 6) return null;
  const op = interpolate(frame, [SEGMENTS_START - 6, SEGMENTS_START, end, end + 6], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 80, right: 80, top, display: 'flex', gap: 8, opacity: op }}>
      {SEGMENTS.map((s, i) => {
        const p = interpolate(frame, [segStart(i), segStart(i) + s.len], [0, 1], clamp);
        return (
          <div key={s.id} style={{ flex: 1, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${p * 100}%`, background: C.accent }} />
          </div>
        );
      })}
    </div>
  );
}

/** Deretan fitur lain yang ikut rilis, muncul bergiliran seperti tumpukan stiker. */
function More({ format }: { format: WhatsNewFormat }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(frame, [MORE - 8, MORE], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', fontFamily: FONT, padding: '0 70px', opacity: out }}>
      <Headline text="Dan masih banyak lagi" from={0} size={format === 'reel' ? 88 : 72} color="#fff" style={{ justifyContent: 'center' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: format === 'reel' ? 20 : 16, marginTop: format === 'reel' ? 60 : 40 }}>
        {MORE_ITEMS.map((t, i) => {
          const p = spring({ frame: frame - 12 - i * 5, fps, config: { damping: 11, stiffness: 180 } });
          const tilt = ((i * 37) % 9) - 4;
          return (
            <div key={t} style={{ fontSize: format === 'reel' ? 40 : 34, fontWeight: 800, padding: format === 'reel' ? '18px 30px' : '14px 24px', borderRadius: 999, background: i % 3 === 0 ? C.accent : 'rgba(255,255,255,0.12)', color: i % 3 === 0 ? C.ink : '#fff', border: i % 3 === 0 ? 'none' : '2px solid rgba(255,255,255,0.2)', transform: `scale(${p}) rotate(${tilt * (1 - p) * 3 + tilt * 0.4}deg)`, opacity: Math.min(1, p * 2) }}>{t}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export function Cta() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 4, fps, config: { damping: 12 } });
  const pill = spring({ frame: frame - 30, fps, config: { damping: 11 } });
  const url = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const wipe = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: Easing.bezier(0.7, 0, 0.2, 1) });
  const pulse = 1 + Math.sin(frame / 5) * 0.025;
  return (
    <AbsoluteFill style={{ clipPath: `circle(${wipe * 160}% at 50% 50%)`, background: C.brand, fontFamily: FONT, color: '#fff', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 80% 90%, rgba(120,170,255,0.5), transparent 45%)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46, padding: '0 80px' }}>
        <Img src={staticFile('images/site/logo-white.svg')} style={{ height: 120, transform: `scale(${logo})` }} />
        <Headline text="Update gratis, langsung dari Play Store." from={12} size={80} color="#fff" style={{ justifyContent: 'center' }} />
        <div style={{ fontSize: 48, fontWeight: 900, padding: '26px 54px', borderRadius: 999, background: C.accent, color: C.ink, transform: `scale(${pill * pulse})`, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45)' }}>Coba gratis 30 hari</div>
        <div style={{ opacity: url, transform: `translateY(${(1 - url) * 30}px)`, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 58, fontWeight: 900, letterSpacing: '-0.02em' }}>lokakasir.id</div>
          <div style={{ fontSize: 34, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Android · Windows · Web · link di bio</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/** Efek suara pendek yang diputar mulai frame `at` (sudah dikurangi jeda awal berkasnya). */
export function Sfx({ at, file, volume = 0.6, trimBefore }: { at: number; file: string; volume?: number; trimBefore?: number }) {
  return (
    <Sequence from={Math.max(0, at)} layout="none">
      <Audio src={staticFile(`audio/mixkit/${file}`)} volume={volume} trimBefore={trimBefore} />
    </Sequence>
  );
}

// Frame saat angka versi berganti (mengikuti easing di <Versions>).
const VERSION_TICKS = Array.from({ length: 27 }, (_, f) => f).filter(
  f => f > 0 && Math.floor(interpolate(f, [0, 26], [0, 6.99], { ...clamp, easing: Easing.in(Easing.quad) })) !== Math.floor(interpolate(f - 1, [0, 26], [0, 6.99], { ...clamp, easing: Easing.in(Easing.quad) })),
);

// Puncak whoosh.mp3 ada di 0,72 dtk (±22 frame), whoosh-big di ±32 frame,
// dan pukulan impact.mp3 mulai di ±5 frame.
function SummarySfx() {
  const ctaAt = SEGMENTS_START + SEGMENTS_LEN + MORE;
  return (
    <>
      <Sfx at={24 - 5} file="impact.mp3" volume={0.7} />
      {VERSION_TICKS.map(f => <Sfx key={f} at={HOOK + f} file="tick.mp3" volume={0.5} />)}
      <Sfx at={HOOK + 28} file="ding.mp3" volume={0.6} />
      {SEGMENTS.map((s, i) => <Sfx key={s.id} at={segStart(i) - 22} file="whoosh.mp3" volume={0.55} />)}
      <Sfx at={SEGMENTS_START + SEGMENTS_LEN - 22} file="whoosh.mp3" volume={0.5} />
      {MORE_ITEMS.map((t, i) => <Sfx key={t} at={SEGMENTS_START + SEGMENTS_LEN + 12 + i * 5} file="pop.mp3" volume={0.28} />)}
      <Sfx at={ctaAt - 30} file="whoosh-big.mp3" volume={0.6} />
      <Sfx at={ctaAt + 4} file="logo-hit.mp3" volume={0.55} trimBefore={48} />
    </>
  );
}

export default function WhatsNewReel({ format, only, track = DEFAULT_TRACK }: WhatsNewProps) {
  const { durationInFrames } = useVideoConfig();
  const L = LAYOUT[format];
  const single = only ? SEGMENTS.findIndex(s => s.id === only) : -1;
  const music = TRACKS[track];
  // Rangkuman: drop jatuh di awal hitung versi. Satu fitur: langsung dari drop.
  const musicStart = single >= 0 ? music.drop - 0.2 : music.drop - HOOK / 30;
  return (
    <AbsoluteFill style={{ fontFamily: FONT, background: '#0b1020' }}>
      <Bg />
      {single >= 0 ? (
        <>
          <Sequence durationInFrames={singleLength(SEGMENTS[single].id)}><Segment index={single} format={format} single /></Sequence>
          <Sequence from={singleLength(SEGMENTS[single].id)}><Cta /></Sequence>
        </>
      ) : (
        <>
          <Sequence durationInFrames={HOOK}><Hook format={format} /></Sequence>
          <Sequence from={HOOK} durationInFrames={VERSIONS}><Versions /></Sequence>
          {SEGMENTS.map((s, i) => (
            <Sequence key={s.id} from={segStart(i)} durationInFrames={s.len}><Segment index={i} format={format} /></Sequence>
          ))}
          <Progress top={L.progressTop} />
          <Sequence from={SEGMENTS_START + SEGMENTS_LEN} durationInFrames={MORE}><More format={format} /></Sequence>
          <Sequence from={SEGMENTS_START + SEGMENTS_LEN + MORE}><Cta /></Sequence>
        </>
      )}
      <Audio
        src={staticFile(music.file)}
        trimBefore={Math.round(musicStart * 30)}
        volume={f => interpolate(f, [0, 12, durationInFrames - 36, durationInFrames - 1], [0, music.volume, music.volume, 0], clamp)}
      />
      {single >= 0 ? <Sfx at={singleLength(SEGMENTS[single].id) - 30} file="whoosh-big.mp3" volume={0.6} /> : <SummarySfx />}
    </AbsoluteFill>
  );
}
