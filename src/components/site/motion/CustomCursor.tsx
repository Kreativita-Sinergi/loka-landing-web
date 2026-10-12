'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';

const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

type Mode = 'default' | 'link' | 'text' | 'label';

/**
 * Titik + cincin biru yang mengikuti kursor di desktop. Kursor asli tetap ada
 * (tidak disembunyikan) supaya presisi klik dan aksesibilitas tidak berubah.
 * Elemen dengan `data-cursor-label` membuat cincin membesar berisi label.
 */
export default function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  return enabled ? <Cursor /> : null;
}

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const labelled = t?.closest?.<HTMLElement>('[data-cursor-label]');
      if (labelled) { setMode('label'); setLabel(labelled.dataset.cursorLabel ?? ''); return; }
      if (t?.closest?.('input, textarea, select, [contenteditable="true"]')) { setMode('text'); return; }
      if (t?.closest?.('a, button, summary, label, [role="button"]')) { setMode('link'); return; }
      setMode('default');
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [x, y]);

  const ring = {
    default: { size: 36, backgroundColor: 'rgba(13,93,243,0)', borderColor: 'rgba(13,93,243,0.45)' },
    link: { size: 60, backgroundColor: 'rgba(13,93,243,0.10)', borderColor: 'rgba(13,93,243,0)' },
    text: { size: 14, backgroundColor: 'rgba(13,93,243,0)', borderColor: 'rgba(13,93,243,0)' },
    label: { size: 92, backgroundColor: 'rgba(13,93,243,0.92)', borderColor: 'rgba(13,93,243,0)' },
  }[mode];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ opacity: visible ? 1 : 0, transition: 'opacity .2s' }}>
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px]"
          animate={{ width: ring.size, height: ring.size, backgroundColor: ring.backgroundColor, borderColor: ring.borderColor, scale: down ? 0.82 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {mode === 'label' && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="text-[13px] font-bold whitespace-nowrap text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-brand"
        style={{ x, y }}
        animate={{ scale: mode === 'default' ? 1 : 0 }}
      />
    </div>
  );
}
