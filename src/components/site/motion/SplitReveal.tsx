'use client';

import { motion, type Variants } from 'framer-motion';
import { Fragment } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;
const word: Variants = {
  hidden: { y: '110%', rotate: 4 },
  show: { y: 0, rotate: 0, transition: { duration: 0.85, ease: EASE } },
};

/** Judul yang naik kata per kata dari balik garis saat masuk layar. */
export function SplitReveal({ text }: { text: string }) {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(' ').map((w, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block origin-bottom-left" variants={word}>{w}</motion.span>
            </span>
          </Fragment>
        ))}
      </span>
    </motion.span>
  );
}

/** Garis pendek di depan label kecil yang tumbuh saat terlihat. */
export function GrowLine({ light }: { light?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block h-[2px] rounded-full ${light ? 'bg-accent' : 'bg-brand'}`}
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 22, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
    />
  );
}
