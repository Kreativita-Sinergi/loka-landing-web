'use client';

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/** Kecepatan scroll yang dihaluskan, dalam piksel per detik. */
function useSmoothVelocity() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  return useSpring(velocity, { damping: 50, stiffness: 400 });
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * Pita teks berjalan tanpa ujung. Larinya pelan saat diam; makin cepat pengguna
 * scroll, makin kencang (maks. ~4x) dan sedikit miring. Scroll ke atas membalik
 * arahnya. Berhenti saat tidak terlihat di layar.
 */
export function VelocityMarquee({ items, speed = 36, reverse, className, itemClassName }: { items: string[]; /** piksel per detik saat diam */ speed?: number; reverse?: boolean; className?: string; itemClassName?: string }) {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const smooth = useSmoothVelocity();
  const boost = useTransform(smooth, [-3000, 0, 3000], [-3, 0, 3], { clamp: true });
  const skewX = useTransform(smooth, [-3000, 0, 3000], [6, 0, -6], { clamp: true });
  const base = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);
  // Isi digandakan; posisi dibungkus dalam rentang lebar satu salinan supaya mulus.
  const x = useTransform(base, v => `${wrap(-(copy.current?.offsetWidth || 1), 0, v)}px`);

  useAnimationFrame((_, delta) => {
    if (reduce || !visible) return;
    const f = boost.get();
    if (f < -0.05) direction.current = reverse ? 1 : -1;
    else if (f > 0.05) direction.current = reverse ? -1 : 1;
    // delta dibatasi supaya tidak melompat setelah tab kembali aktif.
    const move = direction.current * speed * (Math.min(delta, 50) / 1000) * (1 + Math.abs(f));
    base.set(base.get() - move);
  });

  return (
    <div ref={root} className={`overflow-hidden ${className ?? ''}`} aria-hidden>
      <motion.div className="flex w-max flex-nowrap whitespace-nowrap will-change-transform" style={{ x, skewX: reduce ? 0 : skewX }}>
        {[0, 1, 2].map(n => (
          <div key={n} ref={n === 0 ? copy : undefined} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <span key={i} className={itemClassName}>
                {it}
                <span className="text-[0.5em] text-brand [-webkit-text-stroke:0]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Isi sedikit "melentur" (skew) mengikuti kecepatan scroll, lalu kembali tegak. */
export function VelocitySkew({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const smooth = useSmoothVelocity();
  const skewY = useTransform(smooth, [-3000, 0, 3000], [max, 0, -max], { clamp: true });
  const scaleY = useTransform(smooth, [-3000, 0, 3000], [1.03, 1, 1.03], { clamp: true });
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} style={{ skewY, scaleY, transformOrigin: 'center' }}>{children}</motion.div>;
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <motion.span className="inline-block" style={{ opacity, y }}>{children}</motion.span>{' '}
    </>
  );
}

/** Kalimat yang "menyala" kata per kata seiring scroll (gaya halaman produk Apple). */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  const words = text.split(' ');
  if (reduce) return <span ref={ref} className={className}>{text}</span>;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
        ))}
      </span>
    </span>
  );
}

/**
 * Blok yang "mengembang" saat discroll masuk: mulai sedikit kecil lalu penuh.
 * Hanya transform (tanpa animasi radius) supaya cukup digeser GPU. Cocok untuk band berwarna seperti Download dan CTA.
 */
export function ScrollExpand({ children, className, from = 0.86 }: { children: ReactNode; className?: string; from?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const scale = useTransform(p, [0, 1], [from, 1]);
  const y = useTransform(p, [0, 1], [60, 0]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, y }}>{children}</motion.div>
    </div>
  );
}

/** Garis yang tergambar sesuai posisi scroll, untuk menghubungkan langkah-langkah. */
export function ScrollLine({ className, vertical }: { className?: string; vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} aria-hidden className={`overflow-hidden rounded-full bg-line ${className ?? ''}`}>
      <motion.div
        className="h-full w-full rounded-full bg-gradient-to-r from-brand via-[#5b8cff] to-accent"
        style={vertical ? { scaleY: p, transformOrigin: 'top' } : { scaleX: p, transformOrigin: 'left' }}
      />
    </div>
  );
}

/** Lapisan latar yang bergerak lebih lambat dari konten (parallax). */
export function Parallax({ children, className, speed = 0.2 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  if (useReducedMotion()) return <div ref={ref} className={className}>{children}</div>;
  return <motion.div ref={ref} className={className} style={{ y }}>{children}</motion.div>;
}
