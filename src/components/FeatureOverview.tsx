import {
  BarChart3,
  Boxes,
  Check,
  ChefHat,
  HeartHandshake,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

import { getFeatureOverview, type FeatureIcon } from "@/data/featureOverview";
import type { Locale } from "@/data/localized";

const icons: Record<FeatureIcon, typeof ShoppingCart> = {
  pos: ShoppingCart,
  food: ChefHat,
  stock: Boxes,
  staff: UsersRound,
  customer: HeartHandshake,
  owner: BarChart3,
};

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
              <ul className="mt-4 space-y-2.5">
                {category.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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
