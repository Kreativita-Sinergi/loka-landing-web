'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import { Play, Copy, Check, ArrowUpRight, Monitor, Smartphone } from 'lucide-react';
import { ButtonLink } from '@/components/site/ui';

type Props = {
  title: string;
  tablet: string;
  phone: string;
  poster?: { src: string; alt: string };
};

export default function GuideVideo({ title, tablet, phone, poster }: Props) {
  const [device, setDevice] = useState<'tablet' | 'phone'>('tablet');
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const videoId = device === 'tablet' ? tablet : phone;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setCopyFailed(false);
    } catch { setCopyFailed(true); }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-3 md:gap-5 md:rounded-[20px] md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] font-bold">Tonton panduan</p>
        <div className="inline-flex gap-1 rounded-[10px] bg-soft p-1" aria-label="Pilih perangkat">
          {(['tablet', 'phone'] as const).map(value => {
            const Icon = value === 'tablet' ? Monitor : Smartphone;
            return <button key={value} type="button" aria-pressed={device === value}
              onClick={() => { setDevice(value); setPlaying(false); }}
              className={clsx('inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors md:px-4', device === value ? 'bg-white text-brand shadow-sm' : 'text-body hover:text-ink')}>
              <Icon size={16} aria-hidden />{value === 'tablet' ? 'Tablet' : 'Ponsel'}
            </button>;
          })}
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-xl bg-soft">
        {playing ? <iframe key={videoId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={`${title} — ${device === 'tablet' ? 'Tablet' : 'Ponsel'}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
          className="h-full w-full border-0" /> :
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Putar panduan ${device === 'tablet' ? 'tablet' : 'ponsel'}: ${title}`}
            className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden">
            {poster && <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-contain" />}
            <span className="absolute inset-0 bg-ink/15 transition-colors group-hover:bg-ink/25" aria-hidden />
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-colors group-hover:bg-brand-dark md:h-16 md:w-16">
              <Play size={26} fill="currentColor" aria-hidden className="ml-1" />
            </span>
          </button>}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <ButtonLink href={`https://www.youtube.com/watch?v=${videoId}`} tone="primary" size="sm" icon={<ArrowUpRight size={16} aria-hidden />}>Tonton di YouTube</ButtonLink>
        <button type="button" onClick={copyLink}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-[#cdd2dc] hover:bg-soft">
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}{copied ? 'Link tersalin' : 'Salin link panduan'}
        </button>
      </div>
      <p className="text-[13px] leading-relaxed text-body" role="status">
        {copyFailed ? 'Salin alamat halaman ini dari bilah alamat browser untuk membagikan panduan.' : copied ? 'Link tersalin. Bagikan panduan ini kepada pengguna.' : 'Pilih tampilan perangkat yang Anda gunakan, lalu putar videonya.'}
      </p>
    </div>
  );
}
