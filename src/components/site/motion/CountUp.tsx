'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Menghitung naik angka di awal teks ("6.700+" → 0 … 6.700+) saat terlihat.
 * Pemisah ribuan diambil dari teks itu sendiri, jadi aman untuk semua bahasa.
 * Teks tanpa angka di depan ditampilkan apa adanya.
 */
export default function CountUp({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const match = /^(\d[\d.,\s]*\d|\d)(.*)$/.exec(text);
  const target = match ? Number(match[1].replace(/\D/g, '')) : 0;
  const sep = match?.[1].match(/[.,\s]/)?.[0] ?? '';
  const hasNumber = match !== null;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!hasNumber || !inView || reduce) return;
    const controls = animate(0, target, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: v => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, target, hasNumber]);

  if (!match) return <span className={className}>{text}</span>;
  const shown = reduce ? target : value;
  const formatted = String(shown).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="tabular-nums">{formatted}{match[2]}</span>
    </span>
  );
}
