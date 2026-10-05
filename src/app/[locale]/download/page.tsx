import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Globe } from 'lucide-react';
import { FaAndroid, FaWindows } from 'react-icons/fa';

import { siteDetails } from '@/data/siteDetails';
import { getDownloadCopy } from '@/data/site/download';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { Container, PageHero, SectionHeading } from '@/components/site/ui';
import { CtaBand, DownloadCards } from '@/components/site/sections';
import { Card, StepList } from '@/components/site/download/StepList';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getDownloadCopy(locale as Locale).hub;
  return {
    title: `${c.metaTitle} — ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/download'),
  };
}

export default async function DownloadPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const copy = getDownloadCopy(locale);
  const c = copy.hub;
  const l = siteLinks(locale);
  const more = { windows: l.downloadWindows, apk: l.downloadAndroid };

  return (
    <>
      <PageHero crumbs={[{ label: copy.crumbs.home, href: l.home }, { label: copy.crumbs.download }]} title={c.title} desc={c.desc} />

      <section className="pt-8 pb-14 md:pt-16 md:pb-20">
        <Container className="flex flex-col gap-6">
          <DownloadCards locale={locale} bordered />
          <p className="flex flex-wrap items-center gap-2 text-sm text-body md:text-[15px]">
            <Globe size={18} className="text-brand" aria-hidden />
            {c.webAdminLead}
            <Link href={l.webAdmin} className="font-semibold text-brand hover:underline">{c.webAdminLink}</Link>
          </p>
        </Container>
      </section>

      <section className="pb-4 md:pb-8">
        <Container className="flex flex-col gap-6 md:gap-7">
          <SectionHeading title={c.howToTitle} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {c.install.map(card => (
              <Card key={card.key}>
                <div className="flex items-center gap-3 text-brand">
                  {card.key === 'windows' ? <FaWindows size={24} aria-hidden /> : <FaAndroid size={26} aria-hidden />}
                  <h3 className="text-xl font-bold text-ink">{card.title}</h3>
                </div>
                <StepList steps={card.steps.map(detail => ({ detail }))} />
                <Link href={more[card.key]} className="mt-auto inline-flex items-center gap-2 pt-1 text-[15px] font-semibold text-brand hover:underline">
                  {card.more} <ArrowRight size={16} aria-hidden />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
