'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

import ScrollProgress from './ScrollProgress';
import { SpotlightTracker } from './Interactive';
import SmoothScroll from './SmoothScroll';

/**
 * Lapisan motion global (dipasang sekali di layout): smooth scroll, garis
 * progres, cahaya kartu, dan menghormati "kurangi gerakan" dari sistem pengguna.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <ScrollProgress />
      <SpotlightTracker />
      {children}
    </MotionConfig>
  );
}
