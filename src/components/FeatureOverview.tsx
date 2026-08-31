import {
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  ChefHat,
  HeartHandshake,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

import {
  getFeatureOverview,
  type FeatureIcon,
  type FeatureOverviewItem,
} from "@/data/featureOverview";
import type { Locale } from "@/data/localized";

const icons: Record<FeatureIcon, typeof ShoppingCart> = {
  pos: ShoppingCart,
  food: ChefHat,
  stock: Boxes,
  staff: UsersRound,
  customer: HeartHandshake,
  owner: BarChart3,
};

function FeatureRow({
  feature,
  proLabel,
}: {
  feature: FeatureOverviewItem;
  proLabel: string;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
      <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
      <span className="leading-snug">
        {feature.name}
        {feature.plan === "pro" && (
          <span className="ml-2 inline-block rounded-full bg-blue-50 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            {proLabel}
          </span>
        )}
      </span>
    </li>
  );
}

export default function FeatureOverview({ locale }: { locale: Locale }) {
  const copy = getFeatureOverview(locale);

  return (
    <div className="mb-20">
      <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/70 px-6 py-5 text-center dark:border-blue-400/15 dark:bg-blue-500/5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
          {copy.eyebrow}
        </p>
        <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {copy.intro}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-emerald-700 dark:border-emerald-400/20 dark:bg-transparent dark:text-emerald-300">
            {copy.allPlansLabel}
          </span>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-white">
            {copy.proLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {copy.categories.map((category) => {
          const Icon = icons[category.icon];
          return (
            <article
              key={category.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-surface-border dark:bg-surface dark:hover:border-blue-400/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {category.summary}
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-gray-100 pt-4 dark:border-surface-border">
                {category.features.slice(0, 3).map((feature) => (
                  <FeatureRow key={feature.name} feature={feature} proLabel={copy.proLabel} />
                ))}
              </ul>

              {category.features.length > 3 && (
                <details className="group/details mt-3 border-t border-gray-100 pt-3 dark:border-surface-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg py-1 text-xs font-semibold text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400 [&::-webkit-details-marker]:hidden">
                    <span>{copy.moreLabel.replace("{count}", String(category.features.length - 3))}</span>
                    <ChevronDown
                      size={15}
                      className="transition-transform group-open/details:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <ul className="mt-3 space-y-2.5">
                    {category.features.slice(3).map((feature) => (
                      <FeatureRow key={feature.name} feature={feature} proLabel={copy.proLabel} />
                    ))}
                  </ul>
                </details>
              )}
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {copy.note}
      </p>
    </div>
  );
}
