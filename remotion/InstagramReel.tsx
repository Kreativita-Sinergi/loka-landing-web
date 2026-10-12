import { AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

import { C, FONT, Headline, StageMode } from '../src/components/site/videos/kit';
import type { FeatureVideoId } from '../src/components/site/videos/meta';
import { FEATURE_VIDEOS } from '../src/components/site/videos/registry';

/**
 * Reels Instagram 1080×1920 (9:16): pembuka, sepuluh cuplikan fitur yang
 * dipotong dari video fitur situs, montase jenis usaha, lalu ajakan.
 * Teks penting dijaga di antara y 250–1600 supaya tidak tertutup UI Instagram.
 */

const HOOK = 72;
const SEG = 90;
const MONTAGE = 72;
const CTA = 120;

const SEGMENTS: { id: FeatureVideoId; from: number; tag: string; title: string; sub: string }[] = [
  { id: 'QrOrder', from: 210, tag: 'QR Order', title: 'Tamu pesan sendiri dari meja', sub: 'Scan QR → pesan → langsung masuk dapur' },
  { id: 'RentalTimer', from: 180, tag: 'Rental PS & Biliar', title: 'Timer sewa jalan sendiri', sub: 'Paket & argo, perpanjang lewat QR' },
  { id: 'BookingLapangan', from: 190, tag: 'Booking Lapangan', title: 'Jadwal lapangan anti bentrok', sub: 'Tarif jam sibuk & DP otomatis' },
  { id: 'QrisOtomatis', from: 130, tag: 'QRIS Otomatis', title: 'QRIS lunas tanpa cek mutasi', sub: 'Notifikasi bank dicocokkan otomatis' },
  { id: 'ProdukPO', from: 148, tag: 'Produk PO', title: 'Jual PO walau stok belum ada', sub: 'DP dulu, lunas saat diambil' },
  { id: 'SatuanBerat', from: 120, tag: 'Satuan Berat', title: 'Jual per kg, ons, atau gram', sub: 'Ketik berat, harga langsung jadi' },
  { id: 'BarangTitipan', from: 176, tag: 'Barang Titipan', title: 'Titipan & setoran beres', sub: 'Hak penitip terhitung otomatis' },
  { id: 'SupplierPO', from: 190, tag: 'Supplier & PO', title: 'Belanja stok lewat PO', sub: 'Barang masuk, stok & HPP ikut update' },
  { id: 'Laporan', from: 56, tag: 'Laporan Lengkap', title: 'Untung-rugi kelihatan', sub: 'Omzet, jam ramai, laba per produk' },
  { id: 'Referal', from: 96, tag: 'Program Referal', title: 'Ajak teman, dapat saldo', sub: 'Teman hemat, saldo bertambah s.d. Rp59rb' },
];


const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Bagian video 1280×720 yang dipotong: area perangkat di sisi kanan.
const CROP = { x: 540, size: 720 };

export type ReelFormat = 'reel' | 'feed';
export type ReelProps = { format: ReelFormat; only?: FeatureVideoId };

/** Tata letak per format: Reels 1080×1920 dan feed 1080×1350 (4:5). */
const LAYOUT = {
  reel: { height: 1920, progressTop: 200, headTop: 270, headSize: 86, card: { x: 70, y: 640, size: 940 }, subSize: 40, hookSize: 118 },
  feed: { height: 1350, progressTop: 56, headTop: 104, headSize: 68, card: { x: 170, y: 372, size: 740 }, subSize: 34, hookSize: 104 },
} as const;

const singleLength = (id: FeatureVideoId) => FEATURE_VIDEOS[id].duration - 60;

export function reelMeta({ format, only }: ReelProps) {
  const duration = only ? singleLength(only) + CTA : HOOK + SEGMENTS.length * SEG + MONTAGE + CTA;
  return { width: 1080, height: LAYOUT[format].height, durationInFrames: duration };
}

export const REEL_FEATURES = SEGMENTS.map(s => s.id);

function Bg() {
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

function Hook({ size }: { size: number }) {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [HOOK - 10, HOOK], [1, 0], clamp);
  const zoom = interpolate(frame, [0, HOOK], [1.08, 1], clamp);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: 80, opacity: out, transform: `scale(${zoom})` }}>
      <Headline text="Usaha makin ramai?" from={2} size={size} color="#fff" style={{ justifyContent: 'center', textAlign: 'center' }} />
      <Headline text="Kasirnya jangan bikin ribet." from={20} size={size} color={C.accent} style={{ justifyContent: 'center', textAlign: 'center', marginTop: 24 }} />
    </AbsoluteFill>
  );
}

function Segment({ index, format, len = SEG, single }: { index: number; format: ReelFormat; len?: number; single?: boolean }) {
  const s = SEGMENTS[index];
  const v = FEATURE_VIDEOS[s.id];
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
          <span style={{ fontSize: 30, fontWeight: 800, color: C.ink, background: C.accent, padding: '10px 20px', borderRadius: 999 }}>{single ? 'Loka Kasir' : String(index + 1).padStart(2, '0')}</span>
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
      <div style={{ position: 'absolute', left: 80, right: 80, top: CARD.y + CARD.size + 34, fontSize: L.subSize, textAlign: format === 'feed' ? 'center' : undefined, fontWeight: 700, color: 'rgba(255,255,255,0.88)', opacity: interpolate(frame, [10, 22], [0, 1], clamp), transform: `translateY(${interpolate(frame, [10, 22], [20, 0], clamp)}px)` }}>{s.sub}</div>
    </AbsoluteFill>
  );
}

/** Garis progres di atas: berapa fitur sudah lewat. */
function Progress({ top }: { top: number }) {
  const frame = useCurrentFrame();
  const start = HOOK;
  const end = HOOK + SEGMENTS.length * SEG;
  if (frame < start - 6 || frame > end + 6) return null;
  const op = interpolate(frame, [start - 6, start, end, end + 6], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: 'absolute', left: 80, right: 80, top, display: 'flex', gap: 8, opacity: op }}>
      {SEGMENTS.map((s, i) => {
        const p = interpolate(frame, [start + i * SEG, start + (i + 1) * SEG], [0, 1], clamp);
        return (
          <div key={s.id} style={{ flex: 1, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${p * 100}%`, background: C.accent }} />
          </div>
        );
      })}
    </div>
  );
}

const TYPES = ['Kafe', 'Resto', 'Rental PS', 'Biliar', 'Lapangan', 'Bengkel', 'Konter HP', 'Apotek', 'Laundry', 'Toko'];

function Montage() {
  const frame = useCurrentFrame();
  const per = (MONTAGE - 14) / TYPES.length;
  const i = Math.min(TYPES.length - 1, Math.floor(Math.max(0, frame - 10) / per));
  const local = (Math.max(0, frame - 10) % per) / per;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <Headline text="Cocok untuk" from={0} size={84} color="#cfe0ff" style={{ justifyContent: 'center' }} />
      <div style={{ height: 220, width: '100%', marginTop: 10, overflow: 'hidden', textAlign: 'center' }}>
        {frame >= 10 && (
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: '-0.04em', color: i % 2 ? C.accent : '#fff', transform: `translateY(${(1 - Math.min(1, local * 3)) * 90}px) scale(${1 + local * 0.06})` }}>{TYPES[i]}</div>
        )}
      </div>
      <div style={{ marginTop: 20, fontSize: 40, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>& banyak jenis usaha lainnya</div>
    </AbsoluteFill>
  );
}

function Cta() {
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
        <Headline text="Semua itu dalam satu aplikasi kasir." from={12} size={84} color="#fff" style={{ justifyContent: 'center' }} />
        <div style={{ fontSize: 48, fontWeight: 900, padding: '26px 54px', borderRadius: 999, background: C.accent, color: C.ink, transform: `scale(${pill * pulse})`, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.45)' }}>Coba gratis 30 hari</div>
        <div style={{ opacity: url, transform: `translateY(${(1 - url) * 30}px)`, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 58, fontWeight: 900, letterSpacing: '-0.02em' }}>lokakasir.id</div>
          <div style={{ fontSize: 34, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Android · Windows · Web · link di bio</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default function InstagramReel({ format, only }: ReelProps) {
  const { durationInFrames } = useVideoConfig();
  const L = LAYOUT[format];
  const single = only ? SEGMENTS.findIndex(s => s.id === only) : -1;
  return (
    <AbsoluteFill style={{ fontFamily: FONT, background: '#0b1020' }}>
      <Bg />
      {single >= 0 ? (
        <>
          <Sequence durationInFrames={singleLength(SEGMENTS[single].id)}><Segment index={single} format={format} len={singleLength(SEGMENTS[single].id)} single /></Sequence>
          <Sequence from={singleLength(SEGMENTS[single].id)}><Cta /></Sequence>
        </>
      ) : (
        <>
          <Sequence durationInFrames={HOOK}><Hook size={L.hookSize} /></Sequence>
          {SEGMENTS.map((s, i) => (
            <Sequence key={s.id} from={HOOK + i * SEG} durationInFrames={SEG}><Segment index={i} format={format} /></Sequence>
          ))}
          <Progress top={L.progressTop} />
          <Sequence from={HOOK + SEGMENTS.length * SEG} durationInFrames={MONTAGE}><Montage /></Sequence>
          <Sequence from={HOOK + SEGMENTS.length * SEG + MONTAGE}><Cta /></Sequence>
        </>
      )}
      <Audio
        src={staticFile('audio/loka-beat.m4a')}
        loop
        volume={f => interpolate(f, [0, 12, durationInFrames - 36, durationInFrames - 1], [0, 0.9, 0.9, 0], clamp)}
      />
    </AbsoluteFill>
  );
}
