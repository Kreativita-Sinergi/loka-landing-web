'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { plans } from '@/data/site/shared';
import { siteLinks } from '@/data/site/links';
import type { Locale } from '@/data/localized';
import { fetchPrices, formatPrice, type SubscriptionPrice } from '@/lib/pricing';
import { trackSignUpClick } from '@/utils/analytics';
import { ButtonLink, CheckItem } from './ui';

/**
 * Kartu paket Pro dengan pilihan Bulanan/Tahunan. Tidak ada lagi paket Gratis:
 * akun baru mendapat trial 14 hari, setelah itu wajib berlangganan.
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
            className={clsx('flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold md:flex-none', annual === isAnnual ? 'bg-ink text-white' : 'text-body hover:text-ink')}
          >
            <span className="relative">{isAnnual ? plans.yearly : plans.monthly}</span>
            {isAnnual && <span className={clsx('relative text-xs font-bold', annual ? 'text-[#86efac]' : 'text-ok')}>{plans.yearlySave}</span>}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-stretch md:gap-6">
        {/* Bingkai gradasi (statis) menandai paket unggulan. */}
        <div className="flex w-full rounded-[22px] bg-gradient-to-br from-brand via-[#5b8cff] to-accent p-[2px] shadow-[0_30px_70px_-34px_rgba(13,93,243,0.55)] md:w-[440px] md:rounded-[24px]">
        <article className="flex w-full flex-col gap-6 rounded-[20px] bg-white p-6 md:rounded-[22px] md:p-9">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{plans.pro.name}</h3>
            <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold">{plans.pro.badge}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="flex items-end gap-1.5">
              <span className="text-[34px] font-bold tracking-tight tabular-nums md:text-[40px]">{annual ? yearly : monthly}</span>
              <span className="pb-2 text-body">{annual ? plans.perYear : plans.perMonth}</span>
            </p>
            <p className="text-sm text-body">
              {annual ? `Setara 10 bulan. ${plans.pro.note}` : `Atau ${yearly} per tahun. ${plans.pro.note}`}
              {showThreeYear && ` Paket 3 tahun ${threeYear}.`}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <ButtonLink href={l.register} block onClick={() => trackSignUpClick('pricing-pro')}>{plans.pro.cta}</ButtonLink>
            <p className="text-center text-[13px] text-body">{plans.trialNote}</p>
          </div>
          <div className="h-px bg-line" />
          <ul className="flex flex-col gap-3 text-[15px]">{plans.pro.items.map(i => <CheckItem key={i}>{i}</CheckItem>)}</ul>
        </article>
        </div>
      </div>
      <p className="max-w-[760px] text-center text-sm text-body">{plans.fineprint}</p>
    </div>
  );
}
