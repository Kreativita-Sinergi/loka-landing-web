"use client";

import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, price, period, badge, description, features, ctaLabel, ctaUrl } = tier;
  const isFreeTrial = typeof price === "string";

  const displayPrice = isFreeTrial
    ? price
    : `Rp ${(price as number).toLocaleString("id-ID")}`;

  return (
    <div
      className={clsx(
        "relative w-full max-w-sm mx-auto bg-white rounded-2xl border text-center flex flex-col",
        highlight
          ? "border-secondary shadow-2xl shadow-secondary/20 scale-[1.02]"
          : "border-gray-200 shadow-md"
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
      <div className="p-6 pb-4 border-b border-gray-100 rounded-t-2xl">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        {description && (
          <p className="text-sm text-gray-500 mb-4">{description}</p>
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
            <span className="block text-sm font-normal text-gray-500 mt-0.5">
              {period}
            </span>
          )}
          {!isFreeTrial && (
            <span className="block text-xs text-gray-400 mt-1">
              ≈ Rp {Math.round((price as number) / (period?.includes("tahun") ? 12 : 1)).toLocaleString("id-ID")} / bulan
            </span>
          )}
        </div>
        <a
          href={ctaUrl ?? "https://play.google.com/store/apps/details?id=com.lokakasir.app"}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            "block w-full py-3 px-4 rounded-full font-semibold text-sm transition-all",
            {
              "bg-secondary text-white hover:bg-blue-700 shadow-lg shadow-secondary/30":
                highlight,
              "bg-primary text-gray-900 hover:bg-primary-accent":
                isFreeTrial,
              "bg-gray-100 text-gray-800 hover:bg-gray-200": !highlight && !isFreeTrial,
            }
          )}
        >
          {ctaLabel ?? "Mulai Sekarang"}
        </a>
      </div>

      {/* Features */}
      <div className="p-6 flex-1 text-left">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
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
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingColumn;
