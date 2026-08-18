"use client";

import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";
import { formatPrice } from "@/lib/pricing";
import type { Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

interface Props {
  locale: Locale;
  tier: IPricing;
  highlight?: boolean;
  /**
   * Harga yang benar-benar berlaku untuk negara yang dipilih pengunjung, dalam
   * satuan terkecil mata uangnya. Kosong = pakai angka rupiah dari `tier`, yang
   * merupakan perilaku sebelum harga per negara ada.
   */
  localized?: {
    currency: string;
    country: string;
    monthly?: number;
    yearly?: number;
  };
}

const PricingColumn: React.FC<Props> = ({ tier, highlight, localized, locale }: Props) => {
  const { name, price, period, priceAnnual, periodAnnual, annualNote, badge, description, features, ctaLabel, ctaUrl } = tier;
  const isFreeTrial = typeof price === "string";

  // Harga lokal diutamakan; rupiah dari `tier` jadi cadangan bila API belum
  // menjawab atau negaranya belum punya harga sendiri.
  const monthlyMinor = localized?.monthly;
  const yearlyMinor = localized?.yearly;

  const displayPrice = isFreeTrial
    ? price
    : monthlyMinor !== undefined && localized
      ? formatPrice(monthlyMinor, localized.currency, localized.country)
      : `Rp ${(price as number).toLocaleString("id-ID")}`;

  const displayAnnual =
    yearlyMinor !== undefined && localized
      ? formatPrice(yearlyMinor, localized.currency, localized.country)
      : priceAnnual !== undefined
        ? `Rp ${priceAnnual.toLocaleString("id-ID")}`
        : undefined;

  return (
    <div
      className={clsx(
        "relative w-full max-w-sm mx-auto bg-white rounded-2xl border text-center flex flex-col dark:bg-surface",
        highlight
          ? "border-secondary shadow-2xl shadow-secondary/20 scale-[1.02]"
          : "border-gray-200 shadow-md dark:border-surface-border dark:shadow-black/30"
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-secondary text-white text-xs font-bold px-4 py-1 rounded-full shadow">
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-100 rounded-t-2xl dark:border-surface-border">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">{description}</p>
        )}
        <div className="mb-5">
          <span
            className={clsx("text-4xl md:text-5xl font-extrabold", {
              "text-secondary": highlight,
              "text-primary-accent": isFreeTrial,
            })}
          >
            {displayPrice}
          </span>
          {period && (
            <span className="block text-sm font-normal text-gray-500 mt-0.5 dark:text-gray-400">
              {period}
            </span>
          )}
          {priceAnnual && (
            <div className="mt-3 inline-flex flex-col items-center gap-0.5 rounded-xl bg-gray-50 px-3 py-2 dark:bg-white/5">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {getUi(locale).pricingOrAnnual} {displayAnnual}
                <span className="font-normal text-gray-500 dark:text-gray-400">
                  {" "}/ {periodAnnual?.replace(/^per\s*/, "") ?? "tahun"}
                </span>
              </span>
              {annualNote && (
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  💸 {annualNote}
                </span>
              )}
            </div>
          )}
        </div>
        <a
          href={ctaUrl ?? "https://app.lokakasir.id"}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "block w-full py-3 px-4 rounded-full font-semibold text-sm transition-all",
            {
              "bg-secondary text-white hover:bg-blue-700 shadow-lg shadow-secondary/30":
                highlight,
              "bg-primary text-gray-900 hover:bg-primary-accent":
                isFreeTrial,
              "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-100 dark:hover:bg-white/15": !highlight && !isFreeTrial,
            }
          )}
        >
          {ctaLabel ?? getUi(locale).pricingDefaultCta}
        </a>
      </div>

      {/* Features */}
      <div className="p-6 flex-1 text-left">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 dark:text-gray-500">
          Yang Anda dapatkan
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <BsFillCheckCircleFill
                className={clsx("mt-0.5 h-4 w-4 flex-shrink-0", {
                  "text-secondary": highlight,
                  "text-green-500": !highlight,
                })}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
