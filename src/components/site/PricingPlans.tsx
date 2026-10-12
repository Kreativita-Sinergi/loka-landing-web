'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { plans } from '@/data/site/shared';
import { siteLinks } from '@/data/site/links';
import type { Locale } from '@/data/localized';
import { fetchPrices, formatPrice, type SubscriptionPrice } from '@/lib/pricing';
import { trackSignUpClick } from '@/utils/analytics';
import { ButtonLink, CheckItem } from './ui';
import { RevealGroup, RevealItem } from './motion/Reveal';

/** Angka yang bergeser naik/turun saat nilainya berganti. */
function SwapText({ value, className }: { value: string; className?: string }) {
  return (
    <span className={clsx('relative inline-flex overflow-hidden', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Dua kartu paket dengan pilihan Bulanan/Tahunan.
 *
 * Angkanya dibaca dari `/subscription-prices` (sumber yang sama dengan
 * aplikasi dan dasbor). Selama permintaan belum selesai atau gagal, yang tampil
 * adalah harga rupiah bawaan.
 */
export default function PricingPlans({ locale, showThreeYear }: { locale: Locale; showThreeYear?: boolean }) {
  const l = siteLinks(locale);
  const [annual, setAnnual] = useState(false);
  const [prices, setPrices] = useState<SubscriptionPrice[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPrices('ID').then(p => { if (!cancelled) setPrices(p); });
    return () => { cancelled = true; };
  }, []);

  const tidy = (s: string) => s.replace(/^Rp\s+/, 'Rp');
  const price = (plan: string, fallback: number) => {
    const found = prices?.find(p => p.plan === plan);
    return tidy(formatPrice(found ? found.charge_amount : fallback, 'IDR', 'ID'));
  };
  const monthly = price('pro', 59000);
  const yearly = price('pro-yearly', 590000);
  const threeYear = price('pro-3year', 1490000);

  return (
    <div className="flex w-full flex-col items-center gap-8 md:gap-10">
      <div role="group" aria-label="Periode pembayaran" className="flex w-full max-w-[350px] rounded-full border border-line bg-white p-1 md:w-auto">
        {[false, true].map(isAnnual => (
          <button
            key={String(isAnnual)}
            type="button"
            aria-pressed={annual === isAnnual}
            onClick={() => setAnnual(isAnnual)}
            className={clsx('relative flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:flex-none', annual === isAnnual ? 'text-white' : 'text-body hover:text-ink')}
          >
            {annual === isAnnual && <motion.span layoutId="plan-period-pill" className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
            <span className="relative">{isAnnual ? plans.yearly : plans.monthly}</span>
            {isAnnual && <span className={clsx('relative text-xs font-bold', annual ? 'text-[#86efac]' : 'text-ok')}>{plans.yearlySave}</span>}
          </button>
        ))}
      </div>

      <RevealGroup variant="flip" stagger={0.15} className="flex w-full flex-col-reverse gap-4 md:w-auto md:flex-row md:items-stretch md:gap-6">
        <RevealItem className="flex md:w-[440px]">
        <article className="spotlight lift flex w-full flex-col gap-6 rounded-[20px] border border-line bg-white p-6 hover:shadow-[0_30px_60px_-24px_rgba(16,24,40,0.2)] md:rounded-[22px] md:p-9">
          <h3 className="text-xl font-bold">{plans.free.name}</h3>
          <div className="flex flex-col gap-1.5">
            <p className="flex items-end gap-1.5"><span className="text-[34px] font-bold tracking-tight md:text-[40px]">Rp0</span><span className="pb-2 text-body">{plans.perMonth}</span></p>
            <p className="text-sm text-body">{plans.free.note}</p>
          </div>
          <ButtonLink href={l.register} tone="secondary" block onClick={() => trackSignUpClick('pricing-free')}>{plans.free.cta}</ButtonLink>
          <div className="h-px bg-line" />
          <ul className="flex flex-col gap-3 text-[15px]">{plans.free.items.map(i => <CheckItem key={i}>{i}</CheckItem>)}</ul>
        </article>
        </RevealItem>

        <RevealItem className="flex md:w-[440px]">
        {/* Bingkai berpendar yang berputar pelan menandai paket unggulan. */}
        <div className="glow-border lift relative flex w-full rounded-[22px] p-[2px] md:rounded-[24px]">
        <article className="spotlight flex w-full flex-col gap-6 rounded-[20px] bg-white p-6 md:rounded-[22px] md:p-9">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{plans.pro.name}</h3>
            <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold">{plans.pro.badge}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="flex items-end gap-1.5">
              <SwapText value={annual ? yearly : monthly} className="text-[34px] font-bold tracking-tight md:text-[40px]" />
              <SwapText value={annual ? plans.perYear : plans.perMonth} className="pb-2 text-body" />
            </p>
            <p className="text-sm text-body">
              {annual ? `Setara 10 bulan. ${plans.pro.note}` : `Atau ${yearly} per tahun. ${plans.pro.note}`}
              {showThreeYear && ` Paket 3 tahun ${threeYear}.`}
            </p>
          </div>
          <ButtonLink href={l.register} block onClick={() => trackSignUpClick('pricing-pro')}>{plans.pro.cta}</ButtonLink>
          <div className="h-px bg-line" />
          <ul className="flex flex-col gap-3 text-[15px]">{plans.pro.items.map(i => <CheckItem key={i}>{i}</CheckItem>)}</ul>
        </article>
        </div>
        </RevealItem>
      </RevealGroup>
      <p className="max-w-[760px] text-center text-sm text-body">{plans.fineprint}</p>
    </div>
  );
}
