import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Boxes, ChartColumn, Check, ExternalLink, FileText, Landmark, Receipt, ShieldCheck, Store, BookOpen, type LucideIcon } from 'lucide-react';

import { siteDetails } from '@/data/siteDetails';
import { getAccountingCopy } from '@/data/site/accounting';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, Container, IconTile, PageHero, SectionHeading } from '@/components/site/ui';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getAccountingCopy(locale as Locale);
  return {
    title: `${copy.metaTitle} | ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/accounting'),
  };
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  report: FileText,
  receipt: Receipt,
  bank: Landmark,
  box: Boxes,
  shield: ShieldCheck,
  chart: ChartColumn,
};
const FLOW_ICONS: LucideIcon[] = [Store, BookOpen, FileText];

export default async function AccountingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getAccountingCopy(locale);
  const l = siteLinks(locale);

  return (
    <>
      <PageHero
        decorated
        crumbs={[{ label: c.home, href: l.home }, { label: 'Accounting' }]}
        title={c.title}
        desc={c.desc}
      >
        <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:gap-3">
          <ButtonLink href={l.accounting} icon={<ExternalLink size={18} aria-hidden />}>{c.ctaPrimary}</ButtonLink>
          <ButtonLink href="#fitur-accounting" tone="secondary">{c.ctaSecondary}</ButtonLink>
        </div>
        <p className="max-w-[720px] text-[13px] leading-relaxed text-body md:text-sm">{c.heroNote}</p>
      </PageHero>

      {/* Alur kasir → jurnal → laporan */}
      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-10">
          <SectionHeading title={c.flowTitle} desc={c.flowDesc} />
          <ol className="grid gap-3 md:grid-cols-3 md:gap-6">
            {c.flow.map((step, i) => {
              const Icon = FLOW_ICONS[i];
              const last = i === c.flow.length - 1;
              return (
                <li key={step.title} className={last ? 'relative flex flex-col gap-4 rounded-2xl bg-ink p-6 text-white md:rounded-[20px] md:p-8' : 'relative flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 md:rounded-[20px] md:p-8'}>
                  <div className="flex items-center justify-between">
                    <IconTile tone={last ? 'dark' : 'brand'}><Icon size={22} /></IconTile>
                    <span className={last ? 'text-sm font-semibold text-accent' : 'text-sm font-semibold text-mute'}>0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold md:text-xl">{step.title}</h3>
                  <p className={last ? 'text-sm leading-relaxed text-[#b4b7bf]' : 'text-sm leading-relaxed text-body'}>{step.desc}</p>
                  {!last && <ArrowRight size={20} aria-hidden className="absolute top-1/2 -right-[22px] z-10 hidden -translate-y-1/2 text-brand md:block" />}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Fitur */}
      <section id="fitur-accounting" className="scroll-mt-28 bg-soft py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-10">
          <SectionHeading title={c.featuresTitle} desc={c.featuresDesc} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {c.features.map(f => {
              const Icon = FEATURE_ICONS[f.icon] ?? FileText;
              return (
                <div key={f.title} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-6 md:rounded-[18px] md:p-7">
                  <IconTile><Icon size={22} /></IconTile>
                  <h3 className="text-lg font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-body">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Harga + FAQ */}
      <section className="py-14 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="flex flex-col gap-5 rounded-2xl border-2 border-brand bg-white p-6 md:rounded-[20px] md:p-8">
            <h2 className="text-sm font-semibold tracking-wide text-brand uppercase">{c.pricingTitle}</h2>
            <p className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tracking-tight md:text-[44px]">{c.pricingAmount}</span>
              <span className="text-body">{c.pricingUnit}</span>
            </p>
            <ul className="flex flex-col gap-3 text-[15px]">
              {c.pricingPoints.map(p => (
                <li key={p} className="flex items-start gap-2.5"><Check size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden />{p}</li>
              ))}
            </ul>
            <ButtonLink href={l.accounting} block>{c.ctaPrimary}</ButtonLink>
            <p className="text-[13px] leading-relaxed text-body">{c.pricingNote}</p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold md:text-3xl">{c.faqTitle}</h2>
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {c.faqs.map(f => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold md:text-base">
                    {f.q}
                    <span aria-hidden className="text-xl text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pt-3 text-sm leading-relaxed text-body md:text-[15px]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
