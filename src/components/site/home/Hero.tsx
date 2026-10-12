'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import { CircleCheck, MonitorSmartphone, Printer, Sparkles, WifiOff } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';
import { ButtonLink, Container } from '@/components/site/ui';
import { Magnetic } from '@/components/site/motion/Interactive';

// three.js cukup berat; dimuat terpisah setelah halaman tampil dan tidak ikut SSR.
const HeroScene = dynamic(() => import('@/components/site/motion/HeroScene'), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;
const chipIcons = [WifiOff, Printer, Sparkles];
// Posisi kartu kecil yang melayang di sekitar gambar perangkat.
const chipPlaces = [
  'left-[-2%] top-[8%] md:left-[-8%]',
  'right-[-2%] top-[42%] md:right-[-6%]',
  'left-[6%] bottom-[2%] md:left-[2%]',
];

/** Judul dipecah per kata; animasinya CSS supaya teks langsung terlihat tanpa menunggu JavaScript. */
function SplitWords({ text, start, className }: { text: string; start: number; className?: string }) {
  return text.split(' ').map((w, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <span className={`hero-word inline-block ${className ?? ''}`} style={{ '--d': `${start + i * 70}ms` } as CSSProperties}>{w}</span>
      </span>
    </Fragment>
  ));
}

export default function Hero({ copy, register, harga }: { copy: HomeCopy['hero']; register: string; harga: string }) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(false);

  // Kemiringan gambar mengikuti kursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });

  // Saat discroll, isi hero mundur pelan (parallax).
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Scene 3D hanya dinyalakan bila pengguna tidak meminta gerak minimal dan WebGL tersedia.
  useEffect(() => {
    if (reduce) return;
    const ok = (() => {
      try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
    })();
    if (!ok) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const id = idle(() => setScene(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, [reduce]);

  const titleAWords = copy.titleA.split(' ').length;

  return (
    <section
      ref={section}
      className="relative isolate overflow-hidden pt-8 pb-12 md:pt-[72px] md:pb-[104px]"
      onPointerMove={e => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* Latar: aurora lembut + grid tipis + scene 3D */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-aurora absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(13,93,243,0.22),transparent_65%)] blur-2xl" />
        <div className="hero-aurora absolute top-[30%] left-[-15%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.22),transparent_65%)] blur-2xl [animation-delay:-6s]" />
        <div className="hero-grid absolute inset-0" />
        {/* Di layar kecil scene hanya di belakang gambar, supaya teks tetap bersih. */}
        {scene && <div className="absolute inset-x-0 top-[52%] bottom-0 lg:top-0"><HeroScene /></div>}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="relative flex flex-col gap-5 md:gap-7 lg:w-[580px]">
          <h1 className="text-[38px] leading-[1.12] font-bold tracking-[-0.03em] md:text-[60px]">
            <SplitWords text={copy.titleA} start={80} />{' '}
            <span className="relative inline-block">
              <SplitWords text={copy.titleB} start={80 + titleAWords * 70} className="hero-gradient-text" />
              <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.32em] w-full text-accent">
                <path d="M3 15 C 80 4, 200 2, 297 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="hero-underline" pathLength={1} />
              </svg>
            </span>
          </h1>

          <p className="hero-fade max-w-[540px] text-base leading-relaxed text-body md:text-lg" style={{ '--d': '520ms' } as CSSProperties}>{copy.desc}</p>

          <div className="hero-fade flex flex-col gap-2.5 sm:flex-row sm:gap-3" style={{ '--d': '640ms' } as CSSProperties}>
            <Magnetic>
              <ButtonLink href={register} size="lg" className="hero-cta relative w-full overflow-hidden shadow-[0_12px_30px_-8px_rgba(13,93,243,0.55)] sm:w-auto">
                {copy.primary}
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.18}>
              <ButtonLink href={harga} tone="secondary" size="lg" className="w-full bg-white/70 backdrop-blur sm:w-auto">{copy.secondary}</ButtonLink>
            </Magnetic>
          </div>

          <ul className="hero-fade flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-body md:text-[15px]" style={{ '--d': '760ms' } as CSSProperties}>
            {copy.points.map(p => <li key={p} className="flex items-center gap-2"><CircleCheck size={18} className="text-ok" />{p}</li>)}
          </ul>
          <p className="hero-fade flex items-start gap-2.5 text-[13px] leading-relaxed text-body md:text-sm" style={{ '--d': '860ms' } as CSSProperties}>
            <MonitorSmartphone size={18} className="mt-px shrink-0" />{copy.caption}
          </p>
        </motion.div>

        <motion.div style={reduce ? undefined : { y: imgY }} className="relative lg:w-[600px]">
          <div style={{ perspective: 1200 }}>
            <motion.div style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }} className="hero-device relative">
              <div aria-hidden className="absolute inset-[12%] -z-10 rounded-full bg-brand/25 blur-3xl" />
              <Image src="/images/site/hero-perangkat.webp" alt={copy.imageAlt} width={1400} height={1344} priority sizes="(min-width: 1024px) 600px, 100vw" className="h-auto w-full rounded-[24px] shadow-[0_40px_80px_-24px_rgba(13,40,110,0.35)] ring-1 ring-black/5 md:rounded-[32px]" />

              {copy.points.map((p, i) => {
                const Icon = chipIcons[i] ?? Sparkles;
                return (
                  <motion.div
                    key={p}
                    aria-hidden
                    className={`absolute ${chipPlaces[i]} flex items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-3 py-2 text-xs font-semibold text-ink shadow-[0_16px_40px_-12px_rgba(16,24,40,0.28)] backdrop-blur-md md:px-4 md:py-2.5 md:text-sm`}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{
                      opacity: { delay: 1 + i * 0.18, duration: 0.6, ease: EASE },
                      scale: { delay: 1 + i * 0.18, type: 'spring', stiffness: 260, damping: 18 },
                      y: { delay: 1.6 + i * 0.4, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${i === 1 ? 'bg-accent/25 text-[#9a6b00]' : i === 0 ? 'bg-ok-soft text-ok' : 'bg-tint text-brand'}`}>
                      <Icon size={15} />
                    </span>
                    {p}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
