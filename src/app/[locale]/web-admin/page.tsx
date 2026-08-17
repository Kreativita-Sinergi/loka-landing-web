import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ExternalLink,
  Heart,
  Monitor,
  Store,
  Tag,
  Users,
} from "lucide-react";

import { notFound } from "next/navigation";

import { siteDetails } from "@/data/siteDetails";
import { getAppDownload, getSignUp } from "@/data/cta";
import {
  getPlanLabels,
  getWebAdmin,
  getWebAdminGroups,
  getWebAdminPage,
  type Plan,
  type WebAdminGroup,
} from "@/data/webAdmin";
import { LOCALES, localePath, type Locale } from "@/data/localized";
import { alternatesFor } from "@/lib/hreflang";
import WebAdminGallery from "@/components/WebAdminGallery";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getWebAdminPage(locale as Locale);

  return {
    title: `${copy.metaTitle} | ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, "/web-admin"),
  };
}

const ICONS: Record<WebAdminGroup["icon"], React.ElementType> = {
  chart: BarChart3,
  box: Boxes,
  tag: Tag,
  users: Users,
  heart: Heart,
  store: Store,
};

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

// Pembagian peran ditaruh di atas daftar fitur: kebingungan paling sering
// muncul bukan soal "fitur apa saja", tapi "ini bedanya apa dengan aplikasi".
// Isinya sekarang di `getWebAdminPage`, bukan di berkas ini.

export default async function WebAdminPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  const copy = getWebAdminPage(locale);
  const webAdminDetails = getWebAdmin(locale);
  const webAdminGroups = getWebAdminGroups(locale);
  const signUpDetails = getSignUp(locale);
  const appDownloadDetails = getAppDownload(locale);
  const roles = copy.roles;

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            {webAdminDetails.eyebrow}
          </p>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            {webAdminDetails.title}
          </h1>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {webAdminDetails.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={webAdminDetails.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {copy.openButton}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <a
              href={signUpDetails.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-surface-border dark:text-white dark:hover:bg-white/5"
            >
              {copy.noAccountPrefix} {signUpDetails.label}
            </a>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {copy.signUpNote}
          </p>
        </div>

        {/* Pembagian peran aplikasi vs web */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className={`rounded-2xl border p-6 ${
                index === 1
                  ? "border-blue-200 bg-blue-50 dark:border-blue-400/20 dark:bg-blue-500/10"
                  : "border-gray-100 dark:border-surface-border"
              }`}
            >
              <p className="font-bold text-gray-900 dark:text-white">
                {role.title}
              </p>
              <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {role.who}
              </p>
              <ul className="mt-4 space-y-2">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tanpa instalasi */}
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <Monitor
            size={22}
            aria-hidden="true"
            className="mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {copy.noInstallTitle}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {copy.noInstallBody}
            </p>
          </div>
        </div>

        {/* Tangkapan layar — otomatis tersembunyi selama belum ada filenya */}
        <WebAdminGallery className="mt-10" />

        {/* Daftar fitur lengkap per grup */}
        <h2 className="mt-14 mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          {copy.featuresHeading}
        </h2>
        <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          {copy.featuresNoteLead}
          <span className="font-semibold">Lite</span> / <span className="font-semibold">Pro</span>
          {copy.featuresNoteTail}
        </p>

        <div className="space-y-10">
          {webAdminGroups.map((group) => {
            const Icon = ICONS[group.icon];

            return (
              <section key={group.title}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {group.summary}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 dark:divide-surface-border dark:border-surface-border">
                  {group.features.map((feature) => (
                    <li key={feature.name} className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                        <PlanBadge plan={feature.plan} locale={locale} />
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {/* Silang ke aplikasi kasir — Web Admin bukan pengganti aplikasinya */}
        <div className="mt-12 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <p className="font-semibold text-gray-900 dark:text-white">
            {copy.crossSellTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.crossSellBody}
          </p>
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {appDownloadDetails.label} →
          </a>
        </div>

        {/* Penutup */}
        <div className="mt-14 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-400/20 dark:bg-blue-500/10">
          <p className="font-semibold text-gray-900 dark:text-white">
            {copy.includedTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {webAdminDetails.includedNote}
          </p>
          <Link
            href={`${localePath(locale)}#pricing`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {copy.seePricing}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10">
          <Link
            href={localePath(locale)}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {copy.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
