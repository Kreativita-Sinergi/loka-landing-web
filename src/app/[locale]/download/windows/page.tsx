import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Download, Terminal } from 'lucide-react';
import { FaGooglePlay, FaWindows } from 'react-icons/fa';

import { siteDetails } from '@/data/siteDetails';
import { getAppDownload, getWindowsDownload, windowsDirectDownload } from '@/data/cta';
import { getWindowsPage, windowsFacts } from '@/data/windowsPage';
import { getDownloadCopy } from '@/data/site/download';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { Container, PageHero } from '@/components/site/ui';
import { CtaBand } from '@/components/site/sections';
import { Card, StepList } from '@/components/site/download/StepList';
import TrackedDownload from '@/components/site/download/TrackedDownload';
import CopyCommand from '@/components/site/download/CopyCommand';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getWindowsPage(locale as Locale);
  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/download/windows'),
  };
}

export default async function WindowsDownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  const copy = getWindowsPage(locale);
  const store = getWindowsDownload(locale);
  const play = getAppDownload(locale);
  const d = getDownloadCopy(locale);
  const l = siteLinks(locale);
  const exe = windowsDirectDownload;

  const stats = [
    { value: windowsFacts.size, label: copy.statSize },
    { value: windowsFacts.ram, label: copy.statRam },
    { value: copy.statMinRam, label: copy.statMinRamLabel },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: d.crumbs.home, href: l.home }, { label: d.crumbs.download, href: l.download }, { label: d.crumbs.windows }]}
        title={copy.title}
        desc={copy.intro}
      >
        <dl className="grid max-w-[560px] grid-cols-3 gap-2.5 pt-1 md:gap-3">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col gap-0.5 rounded-xl border border-line bg-white px-3 py-3 md:px-4">
              <dd className="order-1 text-base font-bold md:text-xl">{s.value}</dd>
              <dt className="order-2 text-xs text-body md:text-[13px]">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="text-sm leading-relaxed text-body md:text-[15px]">{copy.lightNote}</p>
        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:gap-3">
          <TrackedDownload href={store.url} external platform="windows" source="download-page" icon={<FaWindows size={18} aria-hidden />}>
            {store.label}
          </TrackedDownload>
          {exe && (
            <TrackedDownload href={exe.url} platform="windows" source="download-page-exe" tone="secondary" icon={<Download size={18} aria-hidden />}>
              {d.windows.directSecondary}
            </TrackedDownload>
          )}
        </div>
        <p className="text-[13px] text-body">{store.note} · {copy.freeNote}</p>
      </PageHero>

      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
          <Card>
            <h2 className="text-[22px] font-bold md:text-[26px]">{copy.howToHeading}</h2>
            <StepList steps={copy.steps} />
          </Card>

          <div className="flex flex-col gap-4 md:gap-6">
            <Card>
              <div className="flex items-center gap-3">
                <Terminal size={22} className="text-brand" aria-hidden />
                <h2 className="text-lg font-bold md:text-xl">{copy.wingetHeading}</h2>
              </div>
              <p className="text-sm leading-relaxed text-body">{copy.wingetBody}</p>
              <CopyCommand command={store.wingetCommand} />
            </Card>

            {exe && (
              <Card>
                <div className="flex items-center gap-3">
                  <Download size={22} className="text-brand" aria-hidden />
                  <h2 className="text-lg font-bold md:text-xl">{copy.directHeading}</h2>
                </div>
                <p className="text-sm leading-relaxed text-body">{copy.directBody}</p>
                <dl className="grid grid-cols-2 gap-3 rounded-xl bg-soft p-4 text-sm">
                  <div><dt className="text-body">{d.windows.version}</dt><dd className="font-semibold">v{exe.version}</dd></div>
                  <div><dt className="text-body">{d.windows.size}</dt><dd className="font-semibold">{exe.size}</dd></div>
                </dl>
                <TrackedDownload href={exe.url} platform="windows" source="download-page-exe" tone="secondary" block icon={<Download size={18} aria-hidden />}>
                  {exe.fileLabel}
                </TrackedDownload>
              </Card>
            )}

            <Card>
              <h2 className="text-lg font-bold md:text-xl">{copy.requirementsHeading}</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed">
                {copy.requirements.map(r => (
                  <li key={r} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden />{r}</li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-soft p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7 lg:col-span-2">
            <div className="flex items-start gap-3.5">
              <FaGooglePlay size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="font-bold">{copy.otherPlatformTitle}</p>
                <p className="text-sm leading-relaxed text-body">{copy.otherPlatformBody}</p>
              </div>
            </div>
            <TrackedDownload href={play.url} external platform="android" source="download-windows-page" tone="secondary" className="shrink-0">
              {play.label}
            </TrackedDownload>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
