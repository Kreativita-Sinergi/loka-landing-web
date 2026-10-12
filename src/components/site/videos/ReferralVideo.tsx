import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Chip, FadeUp, Headline, Outro, Phone, Pointer, rupiah, useCount, usePop, Side } from './kit';

export const REFERRAL_DURATION = 440;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const SHARE = 96; // pemilik menekan "Bagikan"
const CHAT = 116; // pesan sampai di HP teman
const APPLY = 176; // teman memakai kode saat berlangganan
const REWARD = 250; // saldo pengajak bertambah
const TABLE = 318; // ringkasan program

const A = { x: 610, y: 74, w: 262 };
const B = { x: 960, y: 74, w: 262 };
const CODE = 'LOKA7Q';

function OwnerScreen() {
  const frame = useCurrentFrame();
  const bal = useCount(0, 15000, REWARD, REWARD + 34);
  const pop = usePop(REWARD, { damping: 9 });
  const press = frame >= SHARE && frame < SHARE + 8 ? 0.95 : 1;
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ background: C.brand, color: '#fff', padding: '58px 20px 22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.8 }}>Saldo referal</div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4, transform: `scale(${frame >= REWARD ? 0.9 + pop * 0.1 : 1})`, transformOrigin: 'left center' }}>{rupiah(bal)}</div>
        {frame >= REWARD && <div style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', borderRadius: 999, background: C.accent, color: C.ink, fontSize: 12, fontWeight: 800, transform: `scale(${pop})` }}>+Rp15.000 dari Toko Sinar</div>}
      </div>
      <div style={{ margin: 16, padding: 18, borderRadius: 18, background: '#fff', border: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.body }}>Kode referal Anda</div>
        <div style={{ marginTop: 10, padding: '14px 0', borderRadius: 14, border: `2px dashed ${C.brand}`, background: C.tint, textAlign: 'center', fontSize: 30, fontWeight: 900, letterSpacing: '0.16em', color: C.brand }}>{CODE}</div>
        <div style={{ marginTop: 14, height: 46, borderRadius: 14, background: '#25d366', color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${press})` }}>Bagikan ke teman</div>
      </div>
      <div style={{ margin: '0 16px', fontSize: 12, lineHeight: 1.45, color: C.mute }}>Saldo tersedia 7 hari setelah pembayaran teman terverifikasi, dan otomatis memotong tagihan langganan Anda.</div>
    </AbsoluteFill>
  );
}

function FriendScreen() {
  const frame = useCurrentFrame();
  const bubble = usePop(CHAT, { damping: 13 });
  const checkout = interpolate(frame, [APPLY - 24, APPLY - 12], [0, 1], clamp);
  const applied = frame >= APPLY;
  const price = useCount(59000, 49000, APPLY, APPLY + 24);
  const tag = usePop(APPLY + 4, { damping: 10 });
  return (
    <AbsoluteFill style={{ background: '#efeae2' }}>
      {/* Obrolan */}
      <AbsoluteFill style={{ opacity: 1 - checkout }}>
        <div style={{ background: '#075e54', color: '#fff', padding: '52px 16px 12px', fontSize: 15, fontWeight: 700 }}>Budi · Pemilik Kedai</div>
        {frame >= CHAT && (
          <div style={{ margin: 14, marginRight: 40, padding: '10px 12px', borderRadius: '4px 14px 14px 14px', background: '#fff', fontSize: 13.5, lineHeight: 1.4, color: C.ink, transform: `scale(${bubble})`, transformOrigin: 'top left', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
            Coba Loka Kasir deh. Pakai kode <b style={{ color: C.brand }}>{CODE}</b> waktu langganan Pro, hemat Rp10.000 👍
          </div>
        )}
      </AbsoluteFill>
      {/* Langganan dengan kode */}
      {checkout > 0 && (
        <AbsoluteFill style={{ background: '#fff', opacity: checkout, padding: '58px 18px 0' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>Langganan Loka Pro</div>
          <div style={{ fontSize: 12.5, color: C.body, fontWeight: 600, marginTop: 2 }}>Toko Sinar · bulanan</div>
          <div style={{ marginTop: 18, padding: 12, borderRadius: 12, border: `1.5px solid ${applied ? C.ok : C.line}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: '0.1em', color: C.ink }}>{CODE}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: applied ? C.ok : C.brand }}>{applied ? '✓ Diterapkan' : 'Pakai'}</span>
          </div>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, fontWeight: 600, color: C.body }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Pro bulanan</span><span>Rp59.000</span></div>
            {applied && <div style={{ display: 'flex', justifyContent: 'space-between', color: C.ok, transform: `scale(${tag})`, transformOrigin: 'right center' }}><span>Diskon referal</span><span>−Rp10.000</span></div>}
          </div>
          <div style={{ height: 1, background: C.line, margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>Bayar</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: C.ink }}>{rupiah(price)}</span>
          </div>
          <div style={{ marginTop: 18, height: 46, borderRadius: 14, background: C.brand, color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Bayar sekarang</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}

function Terms() {
  const frame = useCurrentFrame();
  const p = usePop(TABLE, { damping: 15 });
  if (frame < TABLE) return null;
  const rows = [
    { plan: 'Pro bulanan', friend: 10000, you: 15000 },
    { plan: 'Pro tahunan', friend: 50000, you: 59000 },
  ];
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', background: `rgba(247,249,255,${0.75 * Math.min(1, p)})` }}>
      <div style={{ width: 760, marginLeft: 380, borderRadius: 28, background: '#fff', padding: '28px 32px', boxShadow: '0 50px 100px -40px rgba(13,30,80,0.5)', border: `1px solid ${C.line}`, transform: `translateY(${(1 - p) * 80}px) scale(${0.92 + p * 0.08})`, opacity: Math.min(1, p * 1.5) }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', fontSize: 15, fontWeight: 800, color: C.mute, letterSpacing: '0.04em', paddingBottom: 12, borderBottom: `1px solid ${C.line}` }}>
          <span>PAKET TEMAN</span><span>TEMAN HEMAT</span><span>ANDA DAPAT</span>
        </div>
        {rows.map((r, i) => (
          <FadeUp key={r.plan} from={TABLE + 8 + i * 8} distance={16}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr', alignItems: 'center', padding: '16px 0', borderBottom: i === 0 ? `1px solid ${C.line}` : 'none' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.ink }}>{r.plan}</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: C.ok }}>{rupiah(r.friend)}</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: C.brand }}>{rupiah(r.you)}</span>
            </div>
          </FadeUp>
        ))}
        <FadeUp from={TABLE + 26} distance={10}>
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 600, color: C.body }}>Saldo tidak hangus dan memotong tagihan langganan berikutnya hingga 50%.</div>
        </FadeUp>
      </div>
    </AbsoluteFill>
  );
}

export default function ReferralVideo() {
  const frame = useCurrentFrame();
  const aIn = usePop(26, { damping: 16, stiffness: 120 });
  const bIn = usePop(60, { damping: 16, stiffness: 120 });
  const fly = interpolate(frame, [SHARE + 2, CHAT], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const coins = frame >= APPLY + 30 ? interpolate(frame, [APPLY + 30, REWARD], [0, 1], clamp) : 0;
  return (
    <Backdrop>
      <Side style={{ left: 72, top: 118, width: 500 }}>
        <Chip from={2} tone="accent">🎁 Program Referal</Chip>
        <Headline text="Ajak teman pakai Loka, saldo Anda bertambah." from={8} size={56} mark={['saldo']} style={{ marginTop: 24 }} />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 15 }}>
          {[
            { f: 60, t: 'Bagikan kode referal unik Anda' },
            { f: APPLY, t: 'Teman langsung hemat di bayaran pertama' },
            { f: REWARD, t: 'Anda dapat saldo hingga Rp59.000' },
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

      <Phone width={A.w} style={{ left: A.x, top: A.y + (1 - aIn) * 640, transform: `rotate(${(1 - aIn) * -10 - 3}deg)` }}>
        <OwnerScreen />
      </Phone>
      <Phone width={B.w} style={{ left: B.x, top: B.y + 30 + (1 - bIn) * 640, transform: `rotate(${(1 - bIn) * 10 + 3}deg)` }}>
        <FriendScreen />
      </Phone>

      {/* Pesan terbang dari HP pemilik ke HP teman */}
      {fly > 0 && fly < 1 && (
        <div style={{ position: 'absolute', left: interpolate(fly, [0, 1], [A.x + 130, B.x + 80]), top: 300 - Math.sin(fly * Math.PI) * 170, padding: '8px 14px', borderRadius: 14, background: '#25d366', color: '#fff', fontWeight: 900, fontSize: 18, letterSpacing: '0.1em', transform: `rotate(${(fly - 0.5) * 30}deg) scale(${0.8 + Math.sin(fly * Math.PI) * 0.4})`, boxShadow: '0 16px 30px -10px rgba(37,211,102,0.7)' }}>{CODE}</div>
      )}
      {/* Koin saldo kembali ke pengajak */}
      {coins > 0 && coins < 1 &&
        [0, 1, 2, 3, 4].map(i => {
          const t = Math.min(1, Math.max(0, coins * 1.6 - i * 0.15));
          if (t <= 0 || t >= 1) return null;
          return <div key={i} style={{ position: 'absolute', left: interpolate(t, [0, 1], [B.x + 120, A.x + 80]), top: 250 - Math.sin(t * Math.PI) * (140 + i * 20), width: 34, height: 34, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff3c4, ${C.accent} 55%, #d99a00)`, border: '2px solid #e0a800', color: '#7a5200', fontWeight: 900, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Rp</div>;
        })}

      <Pointer
        path={[
          { f: SHARE - 18, x: A.x + A.w / 2, y: A.y + 303 },
          { f: SHARE, x: A.x + A.w / 2, y: A.y + 303, tap: true },
          { f: APPLY - 16, x: B.x + 200, y: B.y + 30 + 148 },
          { f: APPLY, x: B.x + 200, y: B.y + 30 + 148, tap: true },
        ]}
      />
      <Terms />

      <Caption
        items={[
          { f: 50, to: CHAT + 40, text: 'Bagikan kode Anda lewat WhatsApp' },
          { f: CHAT + 46, to: REWARD - 4, text: 'Teman pakai kodenya, langganan Pro jadi lebih murah' },
          { f: REWARD, to: TABLE - 2, text: 'Setelah teman bayar, saldo Anda ikut bertambah' },
        ]}
      />
      <Outro from={382} line="Makin banyak teman, makin hemat langganan." sub="Program referal Loka Pro · lokakasir.id" />
    </Backdrop>
  );
}
