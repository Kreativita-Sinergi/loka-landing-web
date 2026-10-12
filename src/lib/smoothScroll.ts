import type Lenis from 'lenis';

/**
 * Instance Lenis (smooth scroll) yang sedang aktif, bila ada. Dipakai komponen
 * lain untuk scroll terprogram dan untuk menghentikan scroll saat menu terbuka.
 * Bernilai null saat pengguna memilih "kurangi gerakan" atau sebelum dipasang.
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => { instance = l; };

/** Scroll halus ke posisi Y; jatuh ke scroll bawaan browser bila Lenis tidak aktif. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y, behavior: 'smooth' });
}

/** Hentikan/lanjutkan scroll (mis. saat menu mobile terbuka). */
export function setScrollLocked(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}
