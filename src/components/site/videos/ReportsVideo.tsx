import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

import { Backdrop, C, Caption, Outro, SideText, Tablet, usePop } from './kit';

export const REPORTS_DURATION = 420;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TAB = { x: 570, y: 104, w: 660 };
const KPI = 36;
const CHART = 70;
const HEAT = 196; // tab Jam ramai
const PROFIT = 276; // tab Laba per produk

const short = (n: number) => (n >= 1e6 ? `Rp${(n / 1e6).toFixed(1).replace('.', ',')} jt` : `Rp${Math.round(n).toLocaleString('id-ID')}`);

const TREND = [11.2, 13.8, 12.1, 15.4, 14.2, 19.6, 18.4];
const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const TOP = [
  { n: 'Es Kopi Susu', v: 412 },
  { n: 'Nasi Goreng', v: 288 },
  { n: 'Teh Tarik', v: 205 },
  { n: 'Mie Goreng', v: 174 },
];
const MARGIN = [
  { n: 'Es Kopi Susu', price: 18000, hpp: 6200 },
  { n: 'Nasi Goreng', price: 25000, hpp: 11800 },
  { n: 'Teh Tarik', price: 15000, hpp: 4100 },
  { n: 'Mie Goreng', price: 22000, hpp: 10900 },
];

function Panel({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 16, background: '#fff', border: `1px solid ${C.line}`, padding: 14, ...style }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: C.ink, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Overview() {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [CHART, CHART + 50], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const W = 300;
  const H = 120;
  const max = 21;
  const pts = TREND.map((v, i) => [(i / (TREND.length - 1)) * W, H - (v / max) * H] as const);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  return (
    <div style={{ display: 'flex', gap: 12, height: '100%' }}>
      <Panel title="Tren omzet 7 hari" style={{ flex: 1.15 }}>
        <svg width={W} height={H + 22} viewBox={`0 -4 ${W} ${H + 26}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={C.brand} stopOpacity={0.25} />
              <stop offset="1" stopColor={C.brand} stopOpacity={0} />
            </linearGradient>
            <clipPath id="reveal"><rect x={0} y={-10} width={W * draw} height={H + 40} /></clipPath>
          </defs>
          <g clipPath="url(#reveal)">
            <path d={`${line} L${W},${H} L0,${H} Z`} fill="url(#area)" />
            <path d={line} fill="none" stroke={C.brand} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === 5 ? 6 : 3.5} fill={i === 5 ? C.accent : C.brand} stroke="#fff" strokeWidth={2} />)}
          </g>
          {DAYS.map((d, i) => <text key={d} x={(i / 6) * W} y={H + 20} fontSize={11} fontWeight={700} fill={C.mute} textAnchor="middle">{d}</text>)}
        </svg>
      </Panel>
      <Panel title="Produk terlaris" style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {TOP.map((t, i) => {
            const g = interpolate(frame, [CHART + 30 + i * 8, CHART + 70 + i * 8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
            return (
              <div key={t.n}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: C.body }}><span>{t.n}</span><span style={{ color: C.ink }}>{Math.round(t.v * g)}</span></div>
                <div style={{ height: 8, borderRadius: 8, background: C.soft, marginTop: 4 }}>
                  <div style={{ height: '100%', width: `${(t.v / 412) * 100 * g}%`, borderRadius: 8, background: i === 0 ? C.accent : C.brand }} />
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function Heatmap() {
  const frame = useCurrentFrame();
  const hours = Array.from({ length: 12 }, (_, i) => 10 + i);
  const val = (d: number, h: number) => {
    const lunch = Math.exp(-((h - 12.5) ** 2) / 2.5);
    const dinner = Math.exp(-((h - 19) ** 2) / 3);
    const weekend = d >= 5 ? 1.35 : 1;
    return Math.min(1, (lunch * 0.8 + dinner + 0.08) * weekend * (0.85 + ((d * 7 + h) % 5) * 0.04));
  };
  return (
    <Panel title="Jam ramai · rata-rata 4 minggu" style={{ height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `34px repeat(12, 1fr)`, gap: 4 }}>
        {DAYS.map((d, di) => [
          <div key={d} style={{ fontSize: 11, fontWeight: 700, color: C.mute, alignSelf: 'center' }}>{d}</div>,
          ...hours.map((h, hi) => {
            const p = interpolate(frame, [HEAT + 4 + (di + hi) * 1.6, HEAT + 14 + (di + hi) * 1.6], [0, 1], clamp);
            const v = val(di, h);
            return <div key={`${d}${h}`} style={{ height: 22, borderRadius: 5, background: `rgba(13,93,243,${0.08 + v * 0.85 * p})`, outline: di === 5 && h === 19 && p > 0.9 ? `2px solid ${C.accent}` : 'none' }} />;
          }),
        ])}
        <div />
        {hours.map(h => <div key={h} style={{ fontSize: 10, fontWeight: 700, color: C.mute, textAlign: 'center' }}>{h}</div>)}
      </div>
    </Panel>
  );
}

function Profit() {
  const frame = useCurrentFrame();
  return (
    <Panel title="Laba per produk (harga jual − HPP)" style={{ height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MARGIN.map((m, i) => {
          const g = interpolate(frame, [PROFIT + 6 + i * 6, PROFIT + 36 + i * 6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
          const pct = (m.price - m.hpp) / m.price;
          return (
            <div key={m.n} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 64px', alignItems: 'center', gap: 10, fontSize: 12.5, fontWeight: 700, color: C.ink }}>
              <span>{m.n}</span>
              <div style={{ height: 18, borderRadius: 6, background: C.soft, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${(m.hpp / m.price) * 100 * g}%`, background: '#cbd5e1' }} />
                <div style={{ width: `${pct * 100 * g}%`, background: C.ok }} />
              </div>
              <span style={{ color: C.ok, textAlign: 'right' }}>{Math.round(pct * 100 * g)}%</span>
            </div>
          );
        })}
        <div style={{ display: 'flex', gap: 14, fontSize: 11.5, fontWeight: 700, color: C.mute, marginTop: 2 }}>
          <span>▮ <span style={{ color: '#94a3b8' }}>HPP</span></span>
          <span>▮ <span style={{ color: C.ok }}>Laba kotor</span></span>
        </div>
      </div>
    </Panel>
  );
}

function Dashboard() {
  const frame = useCurrentFrame();
  const tab = frame >= PROFIT ? 2 : frame >= HEAT ? 1 : 0;
  const swapAt = [0, HEAT, PROFIT][tab];
  const swap = tab ? interpolate(frame, [swapAt, swapAt + 12], [0, 1], clamp) : 1;
  const k = (to: number, d = 0) => interpolate(frame, [KPI + d, KPI + d + 40], [0, to], { ...clamp, easing: Easing.out(Easing.cubic) });
  const kpis = [
    { l: 'Omzet', v: short(k(18_400_000)), c: C.ink },
    { l: 'Laba kotor', v: short(k(7_200_000, 6)), c: C.ok },
    { l: 'Transaksi', v: Math.round(k(1284, 12)).toLocaleString('id-ID'), c: C.ink },
    { l: 'Rata-rata nota', v: short(k(14_300, 18)), c: C.brand },
  ];
  return (
    <AbsoluteFill style={{ background: C.soft }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#fff', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>Laporan · Oktober</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Ringkasan', 'Jam ramai', 'Laba produk'].map((t, i) => (
            <div key={t} style={{ padding: '6px 11px', borderRadius: 999, fontSize: 12, fontWeight: 800, background: i === tab ? C.ink : C.soft, color: i === tab ? '#fff' : C.body }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, padding: '12px 14px 0' }}>
        {kpis.map(c => (
          <div key={c.l} style={{ padding: '10px 12px', borderRadius: 14, background: '#fff', border: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: C.mute }}>{c.l}</div>
            <div style={{ fontSize: 19, fontWeight: 900, color: c.c, marginTop: 3, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{c.v}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 14, right: 14, top: 140, bottom: 14, opacity: swap, transform: `translateY(${(1 - swap) * 16}px)` }}>
        {tab === 0 ? <Overview /> : tab === 1 ? <Heatmap /> : <Profit />}
      </div>
    </AbsoluteFill>
  );
}

export default function ReportsVideo() {
  const tabIn = usePop(20, { damping: 16, stiffness: 110 });
  return (
    <Backdrop>
      <SideText
        chip="📊 Laporan Lengkap"
        title="Laporan lengkap, untung-rugi kelihatan."
        mark={['untung-rugi']}
        width={470}
        bullets={[
          { f: KPI, t: 'Omzet, laba kotor & rata-rata nota' },
          { f: HEAT, t: 'Jam ramai & produk terlaris' },
          { f: PROFIT, t: 'Laba per produk dari HPP' },
        ]}
      />
      <Tablet width={TAB.w} style={{ left: TAB.x, top: TAB.y + (1 - tabIn) * 600, transform: `perspective(1600px) rotateX(${(1 - tabIn) * 28}deg)` }}>
        <Dashboard />
      </Tablet>
      <Caption
        items={[
          { f: 40, to: HEAT - 4, text: 'Pantau penjualan dari HP, kapan saja' },
          { f: HEAT + 4, to: PROFIT - 4, text: 'Tahu jam paling ramai untuk atur shift' },
          { f: PROFIT + 4, to: 354, text: 'Lihat produk mana yang paling untung' },
        ]}
      />
      <Outro from={360} line="Keputusan pakai data, bukan tebakan." />
    </Backdrop>
  );
}
