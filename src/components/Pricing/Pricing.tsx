"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, Gift } from "lucide-react";
import PricingColumn from "./PricingColumn";
import { getTiers } from "@/data/pricing";
import { getAppDownload, getSignUp } from "@/data/cta";
import { getPromo } from "@/data/promo";
import { getUi } from "@/data/ui";
import {
  PRICING_COUNTRIES,
  fetchPrices,
  guessCountry,
  type PricingCountry,
  type SubscriptionPrice,
} from "@/lib/pricing";
import type { Locale } from "@/data/localized";

/** Nama plan di API untuk tiap kolom harga; kolom uji coba tidak punya harga. */
const PLAN_KEYS: Record<string, { monthly: string; yearly: string; threeYear: string }> = {
  Pro: { monthly: "pro", yearly: "pro-yearly", threeYear: "pro-3year" },
};

const Pricing: React.FC<{ locale: Locale }> = ({ locale }) => {
  const tiers = getTiers(locale);
  const signUpDetails = getSignUp(locale);
  const appDownloadDetails = getAppDownload(locale);
  const promoDetails = getPromo(locale);
  const ui = getUi(locale);
  // Negara ditebak dari bahasa peramban, lalu bisa diubah pengunjung. Tebakan
  // yang meleset cukup satu klik untuk dibetulkan — jauh lebih baik daripada
  // semua orang melihat rupiah lebih dulu.
  const [country, setCountry] = useState<PricingCountry>("ID");
  const [prices, setPrices] = useState<SubscriptionPrice[] | null>(null);

  useEffect(() => {
    // Tunggu setelah hydration supaya HTML server dan render pertama klien
    // sama-sama memakai ID; tebakan negara baru diterapkan sesudahnya.
    const timer = window.setTimeout(() => setCountry(guessCountry()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchPrices(country).then((result) => {
      if (!cancelled) setPrices(result);
    });
    return () => {
      cancelled = true;
    };
  }, [country]);

  const priceOf = (plan: string) => prices?.find((p) => p.plan === plan);

  /**
   * Harga lokal untuk sebuah kolom. Dikembalikan undefined bila API belum
   * menjawab ATAU bila negara itu memakai baris cadangan rupiah — dalam kedua
   * keadaan itu, angka rupiah dari `data/pricing.ts` sudah benar.
   */
  const localizedFor = (tierName: string) => {
    const keys = PLAN_KEYS[tierName];
    if (!keys) return undefined;
    const monthly = priceOf(keys.monthly);
    if (!monthly || !monthly.is_local_price) return undefined;
    return {
      currency: monthly.display_currency,
      country,
      monthly: monthly.display_amount,
      yearly: priceOf(keys.yearly)?.display_amount,
      threeYear: priceOf(keys.threeYear)?.display_amount,
    };
  };

  return (
    <div className="py-6">
      {/* Pemilih negara — menentukan mata uang yang ditampilkan seluruh kolom. */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        <label htmlFor="pricing-country" className="text-sm text-gray-600 dark:text-gray-300">
          {ui.pricingCountryLabel}
        </label>
        <select
          id="pricing-country"
          value={country}
          onChange={(e) => setCountry(e.target.value as PricingCountry)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-surface-border dark:bg-surface"
        >
          {PRICING_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label} ({c.currency})
            </option>
          ))}
        </select>
      </div>

      {/* Banner promo: gratis 30 hari pertama untuk setiap akun baru */}
      <div className="mb-8 flex flex-col items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-5 text-center dark:border-blue-500/30 dark:bg-blue-500/10">
        <p className="inline-flex items-center gap-2 text-base font-bold text-blue-800 dark:text-blue-300">
          <Gift size={18} aria-hidden="true" /> {promoDetails.heading}
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-blue-900/80 dark:text-blue-100/80">
          {promoDetails.description}
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {tiers.map((tier, index) => (
          <PricingColumn
            locale={locale}
            key={tier.name}
            tier={tier}
            highlight={index === 1}
            localized={localizedFor(tier.name)}
          />
        ))}
      </div>

      {/* Paket Gratis info — dijelaskan gamblang: apa yang termasuk, batasannya, dan yang tidak termasuk */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 dark:bg-surface dark:border-surface-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🆓</span>
          <h3 className="text-base font-bold text-gray-800 dark:text-white">
            {ui.freePlanHeading}
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {ui.freePlanIntro.replace("{duration}", promoDetails.duration)}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Yang termasuk */}
          <div>
            <p className="inline-flex items-center gap-1 text-xs font-bold text-green-600 uppercase tracking-wider mb-2 dark:text-green-400">
              <CheckCircle2 size={14} aria-hidden="true" /> {ui.freePlanIncludedLabel}
            </p>
            <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
              <li>{ui.freePlanIncluded[0]}</li>
              <li>• <span className="font-semibold text-gray-800 dark:text-white">{ui.freePlanTransactions}</span>{ui.freePlanPerMonth}</li>
              {ui.freePlanIncluded.slice(1).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Yang belum termasuk */}
          <div>
            <p className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 dark:text-gray-500">
              <XCircle size={14} aria-hidden="true" /> {ui.freePlanExcludedLabel}
            </p>
            <ul className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
              {ui.freePlanExcluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-surface-border flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Lightbulb size={14} className="shrink-0 text-amber-500" aria-hidden="true" /> {ui.freePlanUpgradeHint}
          </p>
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold text-sm"
          >
            {ui.pricingPlayLink}
          </a>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {ui.pricingStartLead}
          <a
            href={signUpDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 font-semibold"
          >
            {ui.pricingSignUpLink}
          </a>
          {ui.pricingStartTail.replace("{duration}", promoDetails.duration)}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {ui.pricingTaxNote}{" "}
          <a href="mailto:help@lokakasir.id" className="underline hover:text-gray-600">
            {ui.pricingContactLink}
          </a>
          {ui.pricingContactTail}
        </p>
      </div>
    </div>
  );
};

export default Pricing;
