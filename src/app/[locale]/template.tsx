'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Muat pertama tidak dianimasikan (hero punya animasinya sendiri dan teks harus
// langsung terlihat); animasi masuk hanya dipakai saat pindah halaman.
let navigated = false;

/** Template dipasang ulang setiap navigasi, jadi animasi CSS-nya ikut diputar ulang. */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => navigated);
  useEffect(() => { navigated = true; }, []);
  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
