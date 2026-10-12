'use client';

import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Letter({ char, i, count, progress }: { char: string; i: number; count: number; progress: MotionValue<number> }) {
  const start = (i / count) * 0.5;
  const y = useTransform(progress, [start, start + 0.5], ['105%', '0%']);
  const rotate = useTransform(progress, [start, start + 0.5], [8, 0]);
  return <motion.span className="footer-wordmark inline-block origin-bottom-left" style={{ y, rotate }}>{char}</motion.span>;
}

/** Tulisan "LOKA" raksasa di dasar footer; hurufnya naik satu per satu seiring scroll. */
export default function FooterWordmark({ text = 'LOKA' }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const chars = text.split('');
  return (
    <div ref={ref} aria-hidden className="pointer-events-none -mb-[0.2em] overflow-hidden text-center leading-[0.8] select-none">
      <span className="inline-block text-[30vw] font-extrabold tracking-[-0.06em] lg:text-[22vw] xl:text-[300px]">
        {chars.map((c, i) => <Letter key={i} char={c} i={i} count={chars.length} progress={progress} />)}
      </span>
    </div>
  );
}
