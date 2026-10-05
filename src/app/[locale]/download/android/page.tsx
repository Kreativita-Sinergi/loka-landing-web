import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Download, RefreshCw, ShieldAlert } from 'lucide-react';
import { FaGooglePlay } from 'react-icons/fa';

import { siteDetails } from '@/data/siteDetails';
import { androidDirectDownload, getAppDownload, getRegisterHelp } from '@/data/cta';
import { getAndroidPage } from '@/data/androidPage';
import { getDownloadCopy } from '@/data/site/download';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, Container, PageHero, WhatsAppIcon } from '@/components/site/ui';
import { CtaBand } from '@/components/site/sections';
import { Card, StepList } from '@/components/site/download/StepList';
import TrackedDownload from '@/components/site/download/TrackedDownload';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getAndroidPage(locale as Locale);
  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/download/android'),
  };
}

export default async function AndroidDownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  // APK belum di-host → halamannya tidak ada, bukan tombol yang mati.
  if (!androidDirectDownload) notFound();
  const locale = raw as Locale;
  const apk = androidDirectDownload;

  const copy = getAndroidPage(locale);
  const play = getAppDownload(locale);
  const help = getRegisterHelp(locale);
  const d = getDownloadCopy(locale);
  const l = siteLinks(locale);

  const facts = [
    { label: d.android.version, value: `v${apk.version}` },
    { label: d.android.size, value: apk.size },
    { label: d.android.minAndroid, value: `Android ${apk.minAndroid}+` },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: d.crumbs.home, href: l.home }, { label: d.crumbs.download, href: l.download }, { label: d.crumbs.android }]}
        title={copy.title}
        desc={copy.intro}
      >
        <dl className="grid max-w-[560px] grid-cols-3 gap-2.5 pt-1 md:gap-3">
          {facts.map(f => (
            <div key={f.label} className="flex flex-col gap-0.5 rounded-xl border border-line bg-white px-3 py-3 md:px-4">
              <dd className="order-1 text-base font-bold md:text-xl">{f.value}</dd>
              <dt className="order-2 text-xs text-body md:text-[13px]">{f.label}</dt>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:gap-3">
          <TrackedDownload href={apk.url} platform="android-apk" source="download-page" icon={<Download size={18} aria-hidden />}>
            {copy.downloadLabel}
          </TrackedDownload>
        </div>
        <p className="text-[13px] text-body">{apk.fileLabel} · {copy.updateNote}</p>
      </PageHero>

      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
          <div className="flex flex-col gap-4 md:gap-6">
            <Card>
              <h2 className="text-[22px] font-bold md:text-[26px]">{copy.howToHeading}</h2>
              <StepList steps={copy.steps} />
            </Card>
            {/* Peringatan keamanan Huawei — penyebab paling sering batal pasang */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-[#f3dfa8] bg-warn-soft p-5 md:p-6">
              <ShieldAlert size={22} className="mt-0.5 shrink-0 text-[#b7791f]" aria-hidden />
              <div className="flex flex-col gap-1.5">
                <p className="font-bold text-[#6b4708]">{copy.warningTitle}</p>
                <p className="text-sm leading-relaxed text-[#7a5310]">{copy.warningBody}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <Card>
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="text-brand" aria-hidden />
                <h2 className="text-lg font-bold md:text-xl">{copy.updateHeading}</h2>
              </div>
              <p className="text-sm leading-relaxed text-body">{copy.updateBody}</p>
            </Card>

            <Card>
              <h2 className="text-lg font-bold md:text-xl">{copy.requirementsHeading}</h2>
              <ul className="flex flex-col gap-3 text-sm leading-relaxed">
                {copy.requirements.map(r => (
                  <li key={r} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden />{r}</li>
                ))}
              </ul>
              <div className="rounded-xl bg-soft p-4">
                <p className="text-xs font-semibold text-body">{copy.checksumLabel}</p>
                <p className="mt-1 font-mono text-xs leading-relaxed break-all text-ink">{apk.sha256}</p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold md:text-xl">{copy.helpTitle}</h2>
                <p className="text-sm leading-relaxed text-body">{copy.helpBody}</p>
              </div>
              <ButtonLink href={`https://wa.me/${help.whatsapp}?text=${encodeURIComponent(help.whatsappMessage)}`} tone="whatsapp" block icon={<WhatsAppIcon />}>
                {copy.helpCta}
              </ButtonLink>
            </Card>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-soft p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7 lg:col-span-2">
            <div className="flex items-start gap-3.5">
              <FaGooglePlay size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="font-bold">{copy.playTitle}</p>
                <p className="text-sm leading-relaxed text-body">{copy.playBody}</p>
              </div>
            </div>
            <TrackedDownload href={play.url} external platform="android" source="download-android-page" tone="secondary" className="shrink-0">
              {play.label}
            </TrackedDownload>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
