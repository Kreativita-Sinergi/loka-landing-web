import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ExternalLink,
  Heart,
  Store,
  Tag,
  Users,
} from "lucide-react";

import {
  getPlanLabels,
  getWebAdmin,
  getWebAdminGroups,
  type Plan,
  type WebAdminGroup,
} from "@/data/webAdmin";
import WebAdminGallery from "./WebAdminGallery";
import type { Locale } from "@/data/localized";
import { getUi } from "@/data/ui";
import { getEcosystem } from "@/data/ecosystem";
import { localePath } from "@/data/localized";

const ICONS: Record<WebAdminGroup["icon"], React.ElementType> = {
  chart: BarChart3,
  box: Boxes,
  tag: Tag,
  users: Users,
  heart: Heart,
  store: Store,
};

// Badge paket hanya ditampilkan untuk fitur berbayar; menandai "Semua paket" di
// mayoritas baris justru bikin ramai dan mengaburkan yang berbayar.
const PlanBadge: React.FC<{ plan: Plan; locale: Locale }> = ({ plan, locale }) => {
  if (plan === "semua") return null;

  const tone =
    plan === "pro"
      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
      : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";

  return (
    <span
      className={`ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide ${tone}`}
    >
      {getPlanLabels(locale)[plan]}
    </span>
  );
};

// Ringkasan Web Admin di beranda. Sengaja hanya menampilkan tiga fitur teratas
// per grup — selebihnya ada di halaman /web-admin supaya beranda tidak menjadi
// daftar fitur sepanjang layar.
const WebAdmin: React.FC<{ locale: Locale }> = ({ locale }) => {
  const webAdminDetails = getWebAdmin(locale);
  const webAdminGroups = getWebAdminGroups(locale);
  return (
    <div>
      <WebAdminGallery className="mb-10" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {webAdminGroups.map((group) => {
          const Icon = ICONS[group.icon];

          return (
            <div
              key={group.title}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-surface-border dark:bg-surface dark:shadow-black/30"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {group.summary}
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-gray-100 pt-4 dark:border-surface-border">
                {group.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature.name}
                    className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    <span className="font-medium">
                      {feature.name}
                      <PlanBadge plan={feature.plan} locale={locale} />
                    </span>
                  </li>
                ))}
                {group.features.length > 3 && (
                  <li className="pl-5 text-xs text-gray-400 dark:text-gray-500">
                    {getUi(locale).webAdminMoreFeatures.replace("{count}", String(group.features.length - 3))}
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Penegasan bahwa Web Admin tidak dijual terpisah + dua jalur aksi */}
      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-400/20 dark:bg-blue-500/10">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {webAdminDetails.includedNote}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localePath(locale, "/web-admin")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {getUi(locale).webAdminSeeAll}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a
            href={webAdminDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-surface-border dark:bg-transparent dark:text-white dark:hover:bg-white/5"
          >
            {getEcosystem(locale).openWebAdmin}
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebAdmin;
