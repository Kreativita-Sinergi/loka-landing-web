import type { Metadata } from "next";
import Link from "next/link";

import { notFound } from "next/navigation";

import { siteDetails } from "@/data/siteDetails";
import { getAppDownload, getWindowsDownload, windowsDirectDownload } from "@/data/cta";
import { getWindowsPage, windowsFacts } from "@/data/windowsPage";
import { LOCALES, localePath, type Locale } from "@/data/localized";
import { alternatesFor } from "@/lib/hreflang";
import WindowsDownloadLink from "@/components/WindowsDownloadLink";
import WingetCommand from "@/components/WingetCommand";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getWindowsPage(locale as Locale);

  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, "/download/windows"),
  };
}

export default async function WindowsDownloadPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  const copy = getWindowsPage(locale);
  const { requirements, steps } = copy;
  const windowsDownloadDetails = getWindowsDownload(locale);
  const appDownloadDetails = getAppDownload(locale);

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

          {/* Angka ringan ditonjolkan — banyak PC kasir masih spek lama */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { value: windowsFacts.size, label: copy.statSize },
              { value: windowsFacts.ram, label: copy.statRam },
              { value: copy.statMinRam, label: copy.statMinRamLabel },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-100 px-3 py-3 text-center dark:border-surface-border"
              >
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.lightNote}
          </p>
        </div>

        {/* Tombol utama: Microsoft Store */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-surface-border dark:bg-surface">
          <WindowsDownloadLink
            locale={locale}
            source="download-page"
            variant="button"
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
          />
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            {windowsDownloadDetails.note} · {copy.freeNote}
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

        {/* winget — jalur tanpa membuka Store, praktis untuk banyak PC */}
        <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
          {copy.wingetHeading}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {copy.wingetBody}
        </p>
        <WingetCommand command={windowsDownloadDetails.wingetCommand} />

        {/* Unduhan file langsung — hanya tampil bila filenya sudah di-host */}
        {windowsDirectDownload && (
          <>
            <h2 className="mt-12 mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {copy.directHeading}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {copy.directBody}
            </p>
            <a
              href={windowsDirectDownload.url}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-surface-border dark:text-white dark:hover:bg-white/5"
            >
              {windowsDirectDownload.fileLabel} · v{windowsDirectDownload.version} ·{" "}
              {windowsDirectDownload.size}
            </a>
          </>
        )}

        {/* Kebutuhan sistem */}
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

        {/* Platform lain */}
        <div className="mt-12 rounded-2xl border border-gray-100 p-6 dark:border-surface-border">
          <p className="font-semibold text-gray-900 dark:text-white">
            {copy.otherPlatformTitle}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {copy.otherPlatformBody}
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
