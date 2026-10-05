import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CircleCheck, CircleX } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { siteLinks } from '@/data/site/links';
import { BUSINESS_SLUGS, getBusinessCommon, getBusinessPage, isBusinessSlug } from '@/data/site/usaha';
import { alternatesFor } from '@/lib/hreflang';
import { Breadcrumb, ButtonLink, Container, IconTile, ProBadge, SectionHeading, TabletFrame, WhatsAppIcon } from '@/components/site/ui';
import { CtaBand, FaqList } from '@/components/site/sections';
import BusinessFeatureIcon from '@/components/site/usaha/BusinessFeatureIcon';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap(locale => BUSINESS_SLUGS.map(slug => ({ locale, slug })));
}


async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale) || !isBusinessSlug(slug)) notFound();
  return { locale: locale as Locale, slug };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await resolve(params);
  const b = getBusinessPage(slug, locale);
  return {
    title: `${b.metaTitle} | ${siteDetails.siteName}`,
    description: b.metaDescription,
    alternates: alternatesFor(locale, `/usaha/${slug}`),
  };
}

export default async function BusinessPage({ params }: Params) {
  const { locale, slug } = await resolve(params);
  const b = getBusinessPage(slug, locale);
  const c = getBusinessCommon(locale);
  const l = siteLinks(locale);

  return (
    <>
      {/* Hero */}
      <section className="bg-soft">
        <Container className="grid gap-4 pt-7 pb-10 md:gap-6 md:pt-12 md:pb-20 lg:grid-cols-[minmax(0,560px)_minmax(0,560px)] lg:content-center lg:justify-between lg:gap-x-10 lg:gap-y-7">
          <div className="flex flex-col gap-4 md:gap-[22px] lg:self-end">
            <Breadcrumb items={[{ label: c.crumbHome, href: l.home }, { label: c.crumbSection, href: l.jenisUsaha }, { label: b.name }]} />
            <h1 className="text-[32px] leading-[1.18] font-bold tracking-[-0.02em] md:text-5xl">{b.h1}</h1>
            <p className="max-w-[540px] text-base leading-relaxed text-body md:text-lg">{b.sub}</p>
          </div>
          <Image src={b.image} alt={b.imageAlt} width={1120} height={840} priority sizes="(min-width: 1024px) 560px, 100vw" className="h-[240px] w-full rounded-[18px] object-cover md:h-[360px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[420px] lg:rounded-3xl" />
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:gap-3 lg:self-start lg:pt-0">
            <ButtonLink href={l.register} size="lg">{c.primary}</ButtonLink>
            <ButtonLink href={l.whatsapp(c.waMessage(b.name))} tone="secondary" size="lg" icon={<WhatsAppIcon />}>{c.whatsapp}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Masalah & solusi */}
      <section className="py-14 md:py-[88px]">
        <Container className="flex flex-col gap-6 md:gap-10">
          <SectionHeading eyebrow={c.painEyebrow} title={b.painTitle} titleClassName="md:max-w-[760px]" />
          <ul className="grid gap-3.5 md:grid-cols-3 md:gap-6">
            {b.pains.map(p => (
              <li key={p.before} className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 md:rounded-[18px] md:p-7">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-body md:text-[15px]"><CircleX size={20} className="mt-px shrink-0 text-[#C2410C]" aria-hidden />{p.before}</p>
                <span aria-hidden className="h-px bg-line" />
                <p className="flex items-start gap-2.5 text-sm leading-relaxed font-medium md:text-[15px]"><CircleCheck size={20} className="mt-px shrink-0 text-ok" aria-hidden />{p.after}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Fitur unggulan */}
      <section className="bg-soft py-14 md:py-[88px]">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6 md:gap-8 lg:w-[580px]">
            <SectionHeading eyebrow={c.featEyebrow} title={b.featTitle} />
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9">
              {b.feats.map(f => (
                <li key={f.title} className="flex items-start gap-3.5 sm:flex-col sm:gap-2.5">
                  <span className="flex items-center gap-2.5">
                    <IconTile size="sm"><BusinessFeatureIcon name={f.icon} /></IconTile>
                    {f.pro && <span className="hidden sm:inline"><ProBadge /></span>}
                  </span>
                  <span className="flex flex-col gap-1 sm:gap-2.5">
                    <span className="flex items-center gap-2 font-bold md:text-[17px]">{f.title}{f.pro && <span className="sm:hidden"><ProBadge /></span>}</span>
                    <span className="text-sm leading-relaxed text-body">{f.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <TabletFrame src={b.screenshot} alt={b.screenshotAlt} className="lg:w-[560px]" />
        </Container>
      </section>

      {/* Paket yang cocok */}
      <section className="py-10 md:py-[72px]">
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-brand p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:rounded-[20px] md:px-10 md:py-8">
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold tracking-[0.1em] text-brand uppercase md:text-[13px]">{c.planLabel}</p>
              <p className="text-xl font-bold md:text-2xl">{b.planTitle}</p>
              <p className="text-sm leading-relaxed text-body md:text-[15px]">{b.planNote}</p>
            </div>
            <ButtonLink href={l.harga} className="shrink-0">{c.planCta}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pt-4 pb-4 md:pb-10">
        <Container className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-[400px]">
            <SectionHeading eyebrow={c.faqEyebrow} title={`${c.faqTitle} ${b.short}`} />
            <Link href={l.faq} className="hidden text-sm font-semibold text-brand hover:underline lg:inline">{c.faqMore} →</Link>
          </div>
          <div className="lg:w-[720px]"><FaqList locale={locale} questions={b.faq} /></div>
          <Link href={l.faq} className="text-sm font-semibold text-brand lg:hidden">{c.faqMore} →</Link>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
