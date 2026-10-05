import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Minus } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { getHargaCopy, type CompareValue } from '@/data/site/harga';
import { siteLinks } from '@/data/site/links';
import { alternatesFor } from '@/lib/hreflang';
import { CheckItem, Container, PageHero, SectionHeading } from '@/components/site/ui';
import { CtaBand, FaqList } from '@/components/site/sections';
import PricingPlans from '@/components/site/PricingPlans';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getHargaCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/harga'),
  };
}

export default async function HargaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getHargaCopy(locale);
  const l = siteLinks(locale);

  const cell = (v: CompareValue, short?: string) => {
    if (v === true) return <Check size={20} className="text-ok" role="img" aria-label={c.yes} />;
    if (v === false) return <Minus size={20} className="text-mute" role="img" aria-label={c.no} />;
    return (
      <span className="text-[13px] font-medium md:text-[15px]">
        {short ? <><span className="md:hidden" aria-hidden>{short}</span><span className="sr-only md:not-sr-only">{v}</span></> : v}
      </span>
    );
  };

  return (
    <>
      <PageHero crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.crumb }]} title={c.title} desc={c.desc} />

      <section className="py-10 md:py-[72px]">
        <Container className="flex flex-col items-center">
          <PricingPlans locale={locale} showThreeYear />
        </Container>
      </section>

      <section className="pb-12 md:pb-[72px]">
        <Container className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-[26px] leading-[1.25] font-bold tracking-[-0.015em] md:text-[40px]">{c.compareTitle}</h2>
          <div className="overflow-hidden rounded-[14px] border border-line md:rounded-[18px]">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col />
                <col className="w-[66px] md:w-[268px]" />
                <col className="w-[66px] md:w-[268px]" />
              </colgroup>
              <thead className="bg-soft">
                <tr>
                  <th scope="col" className="px-3.5 py-3.5 text-[13px] font-bold md:px-6 md:py-5 md:text-[15px]">{c.colFeature}</th>
                  <th scope="col" className="py-3.5 text-center text-[13px] font-bold md:py-5 md:text-[15px]">{c.colFree}</th>
                  <th scope="col" className="py-3.5 pr-1 text-center text-[13px] font-bold text-brand md:py-5 md:pr-0 md:text-[15px]">{c.colPro}</th>
                </tr>
              </thead>
              {c.groups.map(g => (
                <tbody key={g.title}>
                  <tr>
                    <th scope="colgroup" colSpan={3} className="px-3.5 pt-[18px] pb-2 text-[11px] font-bold tracking-[0.08em] text-mute uppercase md:px-6 md:pt-7 md:pb-3 md:text-xs">{g.title}</th>
                  </tr>
                  {g.rows.map(r => (
                    <tr key={r.label} className="border-b border-line last:border-b-0">
                      <th scope="row" className="px-3.5 py-3 text-[13px] leading-snug font-normal md:px-6 md:py-4 md:text-[15px]">{r.label}</th>
                      <td className="py-3 md:py-4"><span className="flex justify-center">{cell(r.free)}</span></td>
                      <td className="py-3 md:py-4"><span className="flex justify-center">{cell(r.pro, r.proShort)}</span></td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </Container>
      </section>

      <section className="pb-12 md:pb-[88px]">
        <Container className="grid gap-3.5 md:grid-cols-2 md:gap-6">
          {[{ box: c.trial, cls: 'bg-tint' }, { box: c.costs, cls: 'border border-line' }].map(({ box, cls }) => (
            <div key={box.title} className={`flex flex-col gap-3.5 rounded-2xl p-5 md:rounded-[18px] md:p-8 ${cls}`}>
              <h3 className="text-lg font-bold md:text-xl">{box.title}</h3>
              <ul className="flex flex-col gap-3 text-[15px]">{box.items.map(i => <CheckItem key={i}>{i}</CheckItem>)}</ul>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-soft py-12 md:py-20">
        <Container className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-3 lg:w-[400px]">
            <SectionHeading eyebrow="FAQ" title={c.faqTitle} />
            <Link href={l.faq} className="hidden text-sm font-semibold text-brand hover:underline lg:inline">{c.faqMore} →</Link>
          </div>
          <div className="lg:w-[720px]"><FaqList locale={locale} questions={c.faq} /></div>
          <Link href={l.faq} className="text-sm font-semibold text-brand lg:hidden">{c.faqMore} →</Link>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
