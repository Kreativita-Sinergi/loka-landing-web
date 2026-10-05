import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { Check, MonitorSmartphone } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { getFeatureCategories } from '@/data/site/shared';
import { getFiturCopy } from '@/data/site/fitur';
import { siteLinks } from '@/data/site/links';
import { alternatesFor } from '@/lib/hreflang';
import { Container, IconTile, PageHero, ProBadge, TabletFrame } from '@/components/site/ui';
import { CtaBand, featureIcon } from '@/components/site/sections';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getFiturCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/fitur'),
  };
}

export default async function FiturPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getFiturCopy(locale);
  const l = siteLinks(locale);
  const categories = getFeatureCategories(locale);

  return (
    <>
      <PageHero crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.crumb }]} title={c.title} desc={c.desc}>
        <nav aria-label={c.jumpLabel} className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pt-1 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 md:pt-2 [&::-webkit-scrollbar]:hidden">
          {categories.map((cat, i) => (
            <Link
              key={cat.key}
              href={`#${cat.key}`}
              className={clsx(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors md:px-4 md:py-[9px] md:text-sm',
                i === 0 ? 'border-ink bg-ink text-white hover:bg-[#2c2e33]' : 'border-line bg-white text-ink hover:border-[#cdd2dc]',
              )}
            >
              {featureIcon(cat.icon, 16)}
              {cat.title}
            </Link>
          ))}
        </nav>
      </PageHero>

      {categories.map((cat, i) => (
        <section key={cat.key} id={cat.key} className={clsx('scroll-mt-24 py-12 md:scroll-mt-28 md:py-20', i % 2 && 'bg-soft')}>
          <Container className={clsx('flex flex-col gap-8 lg:items-center lg:justify-between lg:gap-12', i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row')}>
            <div className="flex flex-col gap-4 md:gap-5 lg:w-[540px] lg:shrink-0">
              <IconTile size="lg">{featureIcon(cat.icon, 26)}</IconTile>
              <h2 className="text-[26px] leading-[1.25] font-bold tracking-[-0.015em] md:text-[40px]">{cat.title}</h2>
              <p className="max-w-[500px] text-base leading-relaxed text-body md:text-[17px]">{cat.desc}</p>
              <ul className="grid gap-x-4 gap-y-2.5 pt-1 text-[15px] sm:grid-cols-2 md:gap-y-3.5 lg:text-[14.5px]">
                {cat.items.map(it => (
                  <li key={it.label} className="flex items-start gap-2.5 leading-snug">
                    <Check size={16} aria-hidden className="mt-[2px] shrink-0 text-ok" />
                    <span>
                      {it.label}
                      {it.pro && <span className="ml-2 inline-block align-[1px]"><ProBadge /></span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <TabletFrame src={cat.image} alt={cat.imageAlt} className="lg:w-[580px]" />
          </Container>
        </section>
      ))}

      <section className="pt-12 md:pt-16">
        <Container>
          <div className="flex flex-col gap-3 rounded-2xl border border-line px-5 py-5 md:flex-row md:items-center md:gap-4 md:px-8 md:py-6">
            <MonitorSmartphone size={24} aria-hidden className="shrink-0 text-brand" />
            <p className="flex-1 text-[15px] leading-relaxed md:text-base">{c.platformNote}</p>
            <Link href={l.webAdmin} className="text-sm font-semibold whitespace-nowrap text-brand hover:underline">{c.platformLink} →</Link>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
