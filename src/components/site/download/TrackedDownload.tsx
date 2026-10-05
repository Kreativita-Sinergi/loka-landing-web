'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { trackDownloadClick } from '@/utils/analytics';

const tones = {
  primary: 'bg-brand text-white hover:bg-brand-dark active:bg-brand-darker',
  secondary: 'border-[1.5px] border-line bg-white text-ink hover:border-[#cdd2dc] hover:bg-soft',
};

/**
 * Tombol unduh bergaya ButtonLink yang juga mengirim event analytics
 * (`app_download_click`). Client component hanya demi onClick itu.
 */
export default function TrackedDownload({
  href,
  platform,
  source,
  tone = 'primary',
  icon,
  external,
  block,
  className,
  children,
}: {
  href: string;
  platform: 'android' | 'android-apk' | 'windows';
  source: string;
  tone?: keyof typeof tones;
  icon?: ReactNode;
  external?: boolean;
  block?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={() => trackDownloadClick(source, platform)}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-semibold whitespace-nowrap transition-colors',
        block && 'w-full',
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </a>
  );
}
