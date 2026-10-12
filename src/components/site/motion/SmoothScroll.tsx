'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

import { setLenis } from '@/lib/smoothScroll';

/**
 * Scroll inersia yang halus untuk mouse/trackpad. Scroll sentuh di HP tetap
 * bawaan perangkat, dan dimatikan total bila pengguna memilih "kurangi gerakan".
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -90 }, autoRaf: true });
    setLenis(lenis);
    return () => { setLenis(null); lenis.destroy(); };
  }, []);
  return null;
}
