'use client';

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Satu listener untuk semua elemen `.spotlight`: posisi kursor ditulis ke
 * --mx/--my supaya cahaya lembut di CSS mengikuti kursor di atas kartu.
 */
export function SpotlightTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('.spotlight');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}

/** Tombol yang sedikit "tertarik" ke arah kursor. */
export function Magnetic({ children, className, strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={e => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Kartu yang miring 3D mengikuti kursor, dengan kilau cahaya di atasnya.
 * `label` diteruskan ke kursor kustom (mis. "Lihat fitur").
 */
export function TiltCard({ children, className, max = 9, label }: { children: ReactNode; className?: string; max?: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.38), transparent 45%)`;
  return (
    <motion.div
      ref={ref}
      data-cursor-label={label}
      className={`group/tilt relative ${className ?? ''}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={e => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100" style={{ background: glare }} />
    </motion.div>
  );
}

/**
 * Screenshot "berdiri" dari posisi miring saat discroll masuk, lalu sedikit
 * melayang. Memberi kesan perangkat nyata, bukan gambar datar.
 */
export function ScrollTilt({ children, className, side = 'right' }: { children: ReactNode; className?: string; side?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(p, [0, 1], [22, 0]);
  const rotateY = useTransform(p, [0, 1], [side === 'right' ? -14 : 14, 0]);
  const scale = useTransform(p, [0, 1], [0.88, 1]);
  const opacity = useTransform(p, [0, 0.5], [0.2, 1]);
  if (useReducedMotion()) return <div ref={ref} className={className}>{children}</div>;
  return (
    <div ref={ref} className={className} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, rotateY, scale, opacity, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  );
}
