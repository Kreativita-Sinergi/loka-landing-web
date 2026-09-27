import type { Metadata } from "next";
import Link from "next/link";

import { notFound } from "next/navigation";

import { siteDetails } from "@/data/siteDetails";
import { androidDirectDownload, getAppDownload, getRegisterHelp } from "@/data/cta";
import { getAndroidPage } from "@/data/androidPage";
import { LOCALES, localePath, type Locale } from "@/data/localized";
import { alternatesFor } from "@/lib/hreflang";
import ApkDownloadButton from "@/components/ApkDownloadButton";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getAndroidPage(locale as Locale);

  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, "/download/android"),
  };
}

export default async function AndroidDownloadPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  // APK belum di-host → halamannya tidak ada, bukan tombol yang mati.
  if (!androidDirectDownload) notFound();
  const locale = raw as Locale;
  const apk = androidDirectDownload;

  const copy = getAndroidPage(locale);
  const { requirements, steps } = copy;
  const appDownloadDetails = getAppDownload(locale);
  const help = getRegisterHelp(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-600 mb-2 dark:text-blue-400">
            {copy.eyebrow}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">
            {copy.title}
          </h1>
          <p className="text-gray-600 leading-relaxed dark:text-gray-400">
            {copy.intro}
          </p>
        </div>

        {/* Tombol utama: unduh APK */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-surface-border dark:bg-surface">
          <ApkDownloadButton url={apk.url} label={copy.downloadLabel} source="download-page" />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {apk.fileLabel} · v{apk.version} · {apk.size} · Android {apk.minAndroid}+ · {copy.updateNote}
          </p>
        </div>

        {/* Cara pasang */}
        <h2 className="mt-12 mb-5 text-xl font-bold text-gray-900 dark:text-white">
          {copy.howToHeading}
        </h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Peringatan keamanan Huawei — penyebab paling sering batal pasang */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            {copy.warningTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-amber-800 dark:text-amber-100/80">
            {copy.warningBody}
          </p>
        </div>

        {/* Pembaruan */}
        <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {copy.updateHeading}
        </h2>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {copy.updateBody}
        </p>

        {/* Kebutuhan perangkat */}
        <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {copy.requirementsHeading}
        </h2>
        <ul className="space-y-2">
          {requirements.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 break-all font-mono text-xs text-gray-500 dark:text-gray-400">
          {copy.checksumLabel}: {apk.sha256}
        </p>

        {/* Bantuan pemasangan */}
        <div className="mt-12 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <p className="font-semibold text-gray-900 dark:text-white">{copy.helpTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.helpBody}
          </p>
          <a
            href={`https://wa.me/${help.whatsapp}?text=${encodeURIComponent(help.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {copy.helpCta} →
          </a>
        </div>

        {/* Punya Google Play */}
        <div className="mt-4 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <p className="font-semibold text-gray-900 dark:text-white">{copy.playTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.playBody}
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
