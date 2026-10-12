'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import clsx from 'clsx';

import type { HomeCopy } from '@/data/site/home';
import { CheckItem, Container, TabletFrame } from '@/components/site/ui';
import { scrollToY } from '@/lib/smoothScroll';

type Row = HomeCopy['features']['rows'][number];

const EASE = [0.22, 1, 0.36, 1] as const;
// Warna cahaya di belakang tablet berganti per fitur.
const GLOWS = ['rgba(13,93,243,0.28)', 'rgba(255,201,60,0.32)', 'rgba(22,163,74,0.22)', 'rgba(91,140,255,0.3)'];

function Segment({ progress, index, count, label, active, onClick }: { progress: MotionValue<number>; index: number; count: number; label: string; active: boolean; onClick: () => void }) {
  const fill = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);
  return (
    <button type="button" onClick={onClick} className="group flex flex-1 flex-col gap-2.5 text-left" aria-current={active ? 'step' : undefined}>
      <span className={clsx('text-[13px] font-bold tracking-[0.08em] uppercase transition-colors', active ? 'text-brand' : 'text-mute group-hover:text-ink')}>{label}</span>
      <span className="h-1 overflow-hidden rounded-full bg-line">
        <motion.span className="block h-full origin-left rounded-full bg-gradient-to-r from-brand to-[#5b8cff]" style={{ scaleX: fill }} />
      </span>
    </button>
  );
}

/**
 * Fitur utama versi desktop: section "menempel" selama beberapa layar, tablet
 * tetap di tengah dan isinya berganti mengikuti scroll. Di layar kecil
 * komponen ini disembunyikan dan halaman memakai susunan bertumpuk biasa.
 */
export default function PinnedFeatures({ rows }: { rows: Row[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = rows.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', v => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  // Tablet berputar pelan sepanjang section, memberi kesan benda nyata.
  const drift = useTransform(progress, [0, 1], [-6, 6]);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const run = el.offsetHeight - window.innerHeight;
    scrollToY(top + run * ((i + 0.5) / n));
  };

  const row = rows[active];
  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 90 + 10}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16">
        <Container className="flex items-center justify-between gap-12">
          <div className="flex w-[470px] shrink-0 flex-col gap-10">
            <div className="flex gap-3">
              {rows.map((r, i) => <Segment key={r.title} progress={progress} index={i} count={n} label={r.eyebrow} active={i === active} onClick={() => jump(i)} />)}
            </div>
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }}
                  exit={{ opacity: 0, y: -40, transition: { duration: 0.35, ease: EASE } }}
                  className="flex flex-col gap-4"
                >
                  <p className="text-[13px] font-bold tracking-[0.1em] text-brand uppercase tabular-nums">
                    {String(active + 1).padStart(2, '0')} <span className="text-mute">/ {String(n).padStart(2, '0')}</span> · {row.eyebrow}
                  </p>
                  <h3 className="text-[40px] leading-[1.15] font-bold tracking-[-0.025em]">{row.title}</h3>
                  <p className="text-lg leading-relaxed text-body">{row.desc}</p>
                  <ul className="flex flex-col gap-3 pt-2 text-[15px] text-ink">
                    {row.bullets.map((b, j) => (
                      <motion.li key={b} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE, delay: 0.2 + j * 0.06 }}>
                        <CheckItem as="div">{b}</CheckItem>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative w-[650px] shrink-0" style={{ perspective: 1600 }}>
            {GLOWS.map((g, i) => (
              <motion.div
                key={g}
                aria-hidden
                className="absolute -inset-[4%] -z-10"
                style={{ background: `radial-gradient(closest-side, ${g}, transparent)` }}
                animate={{ opacity: active % GLOWS.length === i ? 1 : 0 }}
                transition={{ duration: 0.8 }}
              />
            ))}
            <motion.div style={{ rotateY: drift, transformStyle: 'preserve-3d' }} className="relative">
              {rows.map((r, i) => {
                const offset = i - active;
                return (
                  <motion.div
                    key={r.image}
                    className={i === 0 ? 'relative' : 'absolute inset-0'}
                    initial={false}
                    animate={{
                      opacity: offset === 0 ? 1 : 0,
                      scale: offset === 0 ? 1 : 0.9,
                      x: offset === 0 ? 0 : offset < 0 ? -80 : 80,
                      rotateY: offset === 0 ? 0 : offset < 0 ? 22 : -22,
                    }}
                    transition={{ duration: 0.8, ease: EASE }}
                    aria-hidden={offset !== 0}
                  >
                    <TabletFrame src={r.image} alt={r.alt} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </div>
    </div>
  );
}
