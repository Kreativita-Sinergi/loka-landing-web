import Image from 'next/image';
import { Fragment } from 'react';
import { ArrowRight, Check, CircleCheck, MonitorSmartphone, Printer, Receipt, Sparkles, WifiOff } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';
import { ButtonLink, Container } from '@/components/site/ui';

const chipIcons = [WifiOff, Printer, Sparkles];
// Posisi kartu kecil di sekitar foto.
const chipPlaces = [
  'left-[-2%] top-[8%] md:left-[-8%]',
  'right-[-2%] top-[42%] md:right-[-6%]',
  'left-[-2%] top-[58%] md:left-[-8%]',
];

// Sengaja statis: animasi dan scene 3D sebelumnya terlalu berat untuk hero.
export default function Hero({ copy, register, harga }: { copy: HomeCopy['hero']; register: string; harga: string }) {
  return (
    <section className="relative isolate overflow-hidden pt-8 pb-12 md:pt-[72px] md:pb-[104px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex flex-col gap-5 md:gap-7 lg:w-[580px]">
          {/* Pengumuman rilis terbaru, menuju section "Yang baru". */}
          <a href="#yang-baru" className="group -mb-1 inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-white py-1 pr-3.5 pl-1 text-[13px] font-medium text-ink shadow-[0_8px_24px_-12px_rgba(13,93,243,0.35)] transition-colors hover:border-brand/30 md:text-sm">
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold">{copy.news.tag}</span>
            {copy.news.text}
            <ArrowRight size={14} aria-hidden className="text-brand transition-transform group-hover:translate-x-0.5" />
          </a>
          <h1 className="text-[38px] leading-[1.12] font-bold tracking-[-0.03em] md:text-[60px]">
            {copy.titleA}{' '}
            <span className="relative inline-block text-brand">
              {copy.titleB}
              <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.32em] w-full text-accent">
                <path d="M3 15 C 80 4, 200 2, 297 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="max-w-[540px] text-base leading-relaxed text-body md:text-lg">{copy.desc}</p>

          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <ButtonLink href={register} size="lg" className="w-full shadow-[0_12px_30px_-8px_rgba(13,93,243,0.55)] sm:w-auto">{copy.primary}</ButtonLink>
            <ButtonLink href={harga} tone="secondary" size="lg" className="w-full sm:w-auto">{copy.secondary}</ButtonLink>
          </div>
          {/* Jawab "setelah 14 hari bagaimana?" tepat di bawah tombolnya, sebelum ditanyakan ke CS. */}
          <p className="-mt-2 text-[13px] text-body md:text-sm">{copy.trialNote}</p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-body md:text-[15px]">
            {copy.points.map(p => <li key={p} className="flex items-center gap-2"><CircleCheck size={18} className="text-ok" />{p}</li>)}
          </ul>
          <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-body md:text-sm">
            <MonitorSmartphone size={18} className="mt-px shrink-0" />{copy.caption}
          </p>
        </div>

        <div className="relative lg:w-[600px]">
          <div aria-hidden className="absolute -inset-[6%] -z-10 bg-[radial-gradient(closest-side,rgba(13,93,243,0.28),transparent)]" />
              {/* Kartu gelap: foto pemilik usaha di depan cincin brand, ala kartu produk. */}
              <div className="relative overflow-hidden rounded-[24px] bg-[#0B1B3F] shadow-[0_40px_80px_-24px_rgba(13,40,110,0.45)] ring-1 ring-black/5 md:rounded-[32px]">
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="relative flex items-center justify-between px-5 pt-5 font-mono text-[11px] tracking-[0.18em] text-white/70 uppercase md:px-7 md:pt-6">
                  <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{copy.cardLabel}</span>
                  <span className="text-white/40">01 / 03</span>
                </div>

                <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
                  <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-x-[4%] top-[6%] w-[92%]">
                    <circle cx="200" cy="200" r="170" fill="none" stroke="#0D5DF3" strokeWidth="22" strokeLinecap="round" pathLength={1} strokeDasharray="0.62 1" transform="rotate(-200 200 200)" />
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#FFC93C" strokeWidth="10" strokeLinecap="round" pathLength={1} strokeDasharray="0.22 1" transform="rotate(60 200 200)" />
                  </svg>
                  <Image src="/images/site/hero-kasir-hijab.png" alt={copy.imageAlt} fill priority sizes="(min-width: 1024px) 460px, 100vw" className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_80%,transparent)]" />

                  <div
                    className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1B3F]/90 px-4 py-3 text-white md:inset-x-6 md:px-5 md:py-4"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/30 text-accent"><Receipt size={18} /></span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold md:text-base">{copy.cardTitle}</span>
                      <span className="block text-xs text-white/60 md:text-sm">{copy.cardDesc}</span>
                    </span>
                    <Check size={18} className="text-ok" />
                  </div>
                </div>

                <div className="relative flex items-center justify-center gap-3 border-t border-white/10 py-4 font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase">
                  {copy.flow.map((f, i) => (
                    <Fragment key={f}>
                      {i > 0 && <ArrowRight size={12} className="text-accent" />}
                      {f}
                    </Fragment>
                  ))}
                </div>
              </div>

          {copy.points.map((p, i) => {
            const Icon = chipIcons[i] ?? Sparkles;
            return (
              <div key={p} aria-hidden className={`absolute ${chipPlaces[i]} flex items-center gap-2 rounded-2xl border border-white bg-white/95 px-3 py-2 text-xs font-semibold text-ink shadow-[0_16px_40px_-12px_rgba(16,24,40,0.28)] md:px-4 md:py-2.5 md:text-sm`}>
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${i === 1 ? 'bg-accent/25 text-[#9a6b00]' : i === 0 ? 'bg-ok-soft text-ok' : 'bg-tint text-brand'}`}>
                  <Icon size={15} />
                </span>
                {p}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
