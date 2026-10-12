'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, ChartColumn, Gift, Handshake, Package, QrCode, Scale, Store, Timer, Truck, Zap, type LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { FEATURE_VIDEO_META, type FeatureVideoId, type FeatureVideoMeta } from './meta';

const ICONS: Record<FeatureVideoMeta['icon'], LucideIcon> = { qr: QrCode, timer: Timer, calendar: CalendarDays, zap: Zap, package: Package, scale: Scale, handshake: Handshake, truck: Truck, chart: ChartColumn, gift: Gift, store: Store };

/** Kerangka selama Remotion Player dimuat, ukurannya sama dengan videonya. */
function StageSkeleton() {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[#f7f9ff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(13,93,243,0.16),transparent_45%),radial-gradient(circle_at_20%_85%,rgba(255,201,60,0.22),transparent_40%)]" />
      <span className="relative h-10 w-10 animate-spin rounded-full border-4 border-brand/20 border-t-brand" aria-hidden />
    </div>
  );
}

const VideoStage = dynamic(() => import('./VideoStage'), { ssr: false, loading: StageSkeleton });

/** Muat Player hanya saat section mendekati layar, supaya tidak memperberat muatan awal. */
function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  return [ref, near] as const;
}

function StageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[22px] border border-line bg-white p-1.5 shadow-[0_40px_90px_-40px_rgba(13,93,243,0.45)] md:rounded-[30px] md:p-2.5">
      <div className="overflow-hidden rounded-2xl md:rounded-[22px]">{children}</div>
    </div>
  );
}

/**
 * Etalase video fitur unggulan: tab di kiri, video di kanan. Video berikutnya
 * diputar otomatis saat yang sekarang selesai.
 */
export default function FeatureVideos({ ids }: { ids?: FeatureVideoId[] }) {
  const items = ids ? FEATURE_VIDEO_META.filter(m => ids.includes(m.id)) : FEATURE_VIDEO_META;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const tabsRow = useRef<HTMLDivElement>(null);
  const cur = items[active];

  const select = (i: number) => {
    bars.current.forEach(b => b && (b.style.transform = 'scaleX(0)'));
    setActive(i);
  };

  // Di ponsel, tab aktif digeser supaya selalu terlihat di baris yang bisa discroll.
  useEffect(() => {
    const row = tabsRow.current;
    const btn = row?.children[active] as HTMLElement | undefined;
    if (row && btn && row.scrollWidth > row.clientWidth) row.scrollTo({ left: btn.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  return (
    <div ref={ref} className="flex flex-col gap-5 lg:grid lg:grid-cols-[360px_1fr] lg:items-start lg:gap-10">
      {/* Tab: daftar vertikal di desktop, baris geser di ponsel */}
      <div ref={tabsRow} role="tablist" aria-label="Video fitur" className="order-2 -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:order-1 lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0">
        {items.map((m, i) => {
          const Icon = ICONS[m.icon];
          const on = i === active;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => select(i)}
              className={clsx('relative shrink-0 snap-start overflow-hidden rounded-full border text-left transition-colors lg:rounded-2xl', on ? 'border-brand/30' : 'border-line bg-white hover:border-[#cdd2dc]')}
            >
              {on && <motion.span layoutId="video-tab-bg" className="absolute inset-0 bg-tint" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
              <span className="relative flex items-center gap-2.5 px-4 py-2.5 lg:gap-3.5 lg:px-4 lg:py-3">
                <span className={clsx('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors lg:h-10 lg:w-10 lg:rounded-xl', on ? 'bg-brand text-white' : 'bg-soft text-brand')}>
                  <Icon size={18} aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className={clsx('text-sm font-bold whitespace-nowrap lg:text-base', on ? 'text-ink' : 'text-body')}>{m.tab}</span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden overflow-hidden text-sm leading-relaxed text-body lg:block"
                      >
                        <span className="block pt-1.5">{m.desc}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </span>
              {/* Progres video aktif */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent">
                <span ref={el => { bars.current[i] = el; }} className="block h-full origin-left bg-brand" style={{ transform: 'scaleX(0)' }} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="order-1 flex flex-col gap-4 lg:sticky lg:top-28 lg:order-2">
        <StageFrame>
          {near ? (
            <VideoStage
              id={cur.id}
              label={cur.title}
              autoPlay={!reduce}
              onEnded={items.length > 1 ? () => select((active + 1) % items.length) : undefined}
              onProgress={r => {
                const b = bars.current[active];
                if (b) b.style.transform = `scaleX(${r})`;
              }}
            />
          ) : (
            <StageSkeleton />
          )}
        </StageFrame>
        {/* Judul & penjelasan untuk ponsel (di desktop ada di tab) */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={cur.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="lg:hidden">
            <h3 className="text-lg font-bold">{cur.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-body">{cur.desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Satu video fitur, diulang terus selama terlihat. */
export function SingleFeatureVideo({ id }: { id: FeatureVideoId }) {
  const reduce = useReducedMotion();
  const [ref, near] = useNearViewport<HTMLDivElement>();
  const meta = FEATURE_VIDEO_META.find(m => m.id === id);
  return (
    <div ref={ref}>
      <StageFrame>{near ? <VideoStage id={id} label={meta?.title ?? id} autoPlay={!reduce} /> : <StageSkeleton />}</StageFrame>
    </div>
  );
}
