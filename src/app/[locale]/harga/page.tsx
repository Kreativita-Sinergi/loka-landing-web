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
import { Reveal, RevealGroup, RevealItem } from '@/components/site/motion/Reveal';
import { ScrollExpand } from '@/components/site/motion/Velocity';
import { SingleFeatureVideo } from '@/components/site/videos/FeatureVideos';

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
      <PageHero animated crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.crumb }]} title={c.title} desc={c.desc} />

      <section className="py-10 md:py-[72px]">
        <Container className="flex flex-col items-center">
          <PricingPlans locale={locale} showThreeYear />
        </Container>
      </section>

      <section className="pb-12 md:pb-[72px]">
        <Container className="flex flex-col gap-4 md:gap-6">
          <Reveal variant="left"><h2 className="text-[26px] leading-[1.25] font-bold tracking-[-0.015em] md:text-[40px]">{c.compareTitle}</h2></Reveal>
          <Reveal variant="clip" className="overflow-hidden rounded-[14px] border border-line md:rounded-[18px]">
            <table className="w-full table-fixed border-collapse text-left">
              <colgroup>
                <col />
                <col className="w-[66px] md:w-[268px]" />
                <col className="w-[66px] md:w-[268px]" />
              </colgroup>
              <thead className="bg-soft">
                <tr>
                  <th scope="col" className="px-3.5 py-3.5 text-[13px] font-bold md:px-6 md:py-5 md:text-[15px]">{c.colFeature}</th>
                  <th scope="col" className="py-3.5 text-center text-[13px] font-bold md:py-5 md:text-[15px]">{c.colTrial}</th>
                  <th scope="col" className="py-3.5 pr-1 text-center text-[13px] font-bold text-brand md:py-5 md:pr-0 md:text-[15px]">{c.colPro}</th>
                </tr>
              </thead>
              {c.groups.map(g => (
                <RevealGroup as="tbody" key={g.title} variant="left" stagger={0.04}>
                  <RevealItem as="tr">
                    <th scope="colgroup" colSpan={3} className="px-3.5 pt-[18px] pb-2 text-[11px] font-bold tracking-[0.08em] text-mute uppercase md:px-6 md:pt-7 md:pb-3 md:text-xs">{g.title}</th>
                  </RevealItem>
                  {g.rows.map(r => (
                    <RevealItem as="tr" key={r.label} className="border-b border-line transition-colors last:border-b-0 hover:bg-soft/70">
                      <th scope="row" className="px-3.5 py-3 text-[13px] leading-snug font-normal md:px-6 md:py-4 md:text-[15px]">{r.label}</th>
                      <td className="py-3 md:py-4"><span className="flex justify-center">{cell(r.trial, r.trialShort)}</span></td>
                      <td className="py-3 md:py-4"><span className="flex justify-center">{cell(r.pro, r.proShort)}</span></td>
                    </RevealItem>
                  ))}
                </RevealGroup>
              ))}
            </table>
          </Reveal>
        </Container>
      </section>

      <section className="pb-12 md:pb-[88px]">
        <Container className="grid gap-3.5 md:grid-cols-2 md:gap-6">
          {[{ box: c.trial, cls: 'bg-tint' }, { box: c.costs, cls: 'border border-line' }].map(({ box, cls }, n) => (
            <Reveal key={box.title} variant={n ? 'right' : 'left'} className={`spotlight flex flex-col gap-3.5 rounded-2xl p-5 md:rounded-[18px] md:p-8 ${cls}`}>
              <h3 className="text-lg font-bold md:text-xl">{box.title}</h3>
              <RevealGroup as="ul" variant="up" stagger={0.08} className="flex flex-col gap-3 text-[15px]">{box.items.map(i => <RevealItem as="li" key={i}><CheckItem as="div">{i}</CheckItem></RevealItem>)}</RevealGroup>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Program referal */}
      <section id="referal" className="scroll-mt-28 pb-12 md:pb-[88px]">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex flex-col gap-6 lg:w-[440px] lg:shrink-0">
            <Reveal variant="left"><SectionHeading eyebrow={c.referral.eyebrow} title={c.referral.title} desc={c.referral.desc} /></Reveal>
            <Reveal variant="left" delay={0.1} className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full border-collapse text-left text-sm md:text-[15px]">
                <thead className="bg-soft text-xs font-bold tracking-[0.06em] text-mute uppercase">
                  <tr>
                    <th scope="col" className="px-4 py-3">{c.referral.colPlan}</th>
                    <th scope="col" className="px-4 py-3">{c.referral.colFriend}</th>
                    <th scope="col" className="px-4 py-3">{c.referral.colYou}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.referral.rows.map(r => (
                    <tr key={r.plan} className="border-t border-line">
                      <th scope="row" className="px-4 py-3.5 font-bold">{r.plan}</th>
                      <td className="px-4 py-3.5 font-bold text-ok">{r.friend}</td>
                      <td className="px-4 py-3.5 text-base font-extrabold text-brand md:text-lg">{r.you}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            <Reveal variant="up" delay={0.15}><p className="text-[13px] leading-relaxed text-body">{c.referral.note}</p></Reveal>
          </div>
          <Reveal variant="clip" className="min-w-0 flex-1"><SingleFeatureVideo id="Referal" /></Reveal>
        </Container>
      </section>

      <section className="bg-soft py-12 md:py-20">
        <Container className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-3 lg:w-[400px]">
            <Reveal variant="left"><SectionHeading eyebrow="FAQ" title={c.faqTitle} /></Reveal>
            <Link href={l.faq} className="hidden text-sm font-semibold text-brand hover:underline lg:inline">{c.faqMore} →</Link>
          </div>
          <Reveal variant="right" delay={0.1} className="lg:w-[720px]"><FaqList locale={locale} questions={c.faq} /></Reveal>
          <Link href={l.faq} className="text-sm font-semibold text-brand lg:hidden">{c.faqMore} →</Link>
        </Container>
      </section>

      <ScrollExpand from={0.9}><CtaBand locale={locale} /></ScrollExpand>
    </>
  );
}
