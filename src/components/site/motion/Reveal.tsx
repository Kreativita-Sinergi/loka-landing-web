'use client';

import { motion, type Variants } from 'framer-motion';
import { createContext, useContext, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Gaya kemunculan. Tiap section boleh memilih gaya berbeda supaya scroll terasa hidup. */
export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'flip' | 'clip' | 'pop';

const hidden: Record<RevealVariant, Variants['hidden']> = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
  scale: { opacity: 0, scale: 0.86 },
  flip: { opacity: 0, rotateX: -55, y: 40, transformPerspective: 900 },
  clip: { opacity: 0, clipPath: 'inset(18% 6% 18% 6% round 28px)', scale: 0.96 },
  pop: { opacity: 0, scale: 0.4, rotate: -12 },
};

const shown: Record<RevealVariant, Variants['show']> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  flip: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 900 },
  clip: { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1 },
  pop: { opacity: 1, scale: 1, rotate: 0 },
};

function variantsFor(v: RevealVariant, delay = 0): Variants {
  const transition =
    v === 'pop'
      ? { type: 'spring' as const, stiffness: 320, damping: 16, delay }
      : { duration: v === 'clip' ? 1.1 : 0.85, ease: EASE, delay };
  return { hidden: hidden[v], show: { ...(shown[v] as object), transition } };
}

const VariantContext = createContext<RevealVariant>('up');

/** Muncul saat masuk layar (sekali). */
export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div' }: { children: ReactNode; className?: string; delay?: number; variant?: RevealVariant; as?: 'div' | 'li' | 'section' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={variantsFor(variant, delay)}
    >
      {children}
    </Tag>
  );
}

/** Wadah yang memunculkan anak-anak `RevealItem` satu per satu dengan gaya yang sama. */
export function RevealGroup({ children, className, stagger = 0.08, variant = 'up', as = 'div' }: { children: ReactNode; className?: string; stagger?: number; variant?: RevealVariant; as?: 'div' | 'ul' | 'ol' | 'dl' | 'tbody' }) {
  const Tag = motion[as];
  return (
    <VariantContext.Provider value={variant}>
      <Tag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      >
        {children}
      </Tag>
    </VariantContext.Provider>
  );
}

export function RevealItem({ children, className, variant, as = 'div' }: { children: ReactNode; className?: string; variant?: RevealVariant; as?: 'div' | 'li' | 'tr' | 'span' }) {
  const fromGroup = useContext(VariantContext);
  const Tag = motion[as];
  return <Tag className={className} variants={variantsFor(variant ?? fromGroup)}>{children}</Tag>;
}
