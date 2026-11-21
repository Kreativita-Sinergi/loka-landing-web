import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';

import { LOCALES, OG_LOCALE, localePath, type Locale } from '@/data/localized';
import { getHomeCopy } from '@/data/site/home';
import { getHomeShareMetadata, siteDetails } from '@/data/siteDetails';
import { siteLinks } from '@/data/site/links';
import { Container, SectionHeading } from '@/components/site/ui';
import { CtaBand, Testimonials } from '@/components/site/sections';
import DemoKasir from '@/components/site/home/DemoKasir';
import Hero from '@/components/site/home/Hero';
import ProBusinesses from '@/components/site/home/ProBusinesses';

export const revalidate = 600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const { title, description, image } = getHomeShareMetadata(locale);

  return {
    openGraph: {
      title,
      description,
      url: new URL(localePath(locale), siteDetails.siteUrl),
      siteName: siteDetails.siteName,
      locale: OG_LOCALE[locale],
      type: 'website',
      images: [{ ...image, type: 'image/jpeg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getHomeCopy(locale);
  const l = siteLinks(locale);
  return (
    <>
      <Hero copy={c.hero} register={l.register} harga={l.harga} />

      <Suspense fallback={null}>
        <ProBusinesses locale={locale} />
      </Suspense>

      <section id="demo-kasir" className="py-12 md:py-16">
        <Container><DemoKasir copy={c.demo} /></Container>
      </section>

      <section id="jenis-usaha" className="bg-soft py-12 md:py-16">
        <Container className="flex flex-col gap-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={c.business.eyebrow} title={c.business.title} titleClassName="md:max-w-[640px]" />
            <Link href={l.fitur} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-brand hover:underline md:self-end">{c.business.more}<ArrowRight size={16} aria-hidden /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {c.business.items.map(b => (
              <Link key={b.slug} href={l.usaha(b.slug)} className="card group flex h-full items-center gap-3.5 rounded-2xl p-2.5 lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-[18px] lg:p-0">
                <span className="shrink-0 overflow-hidden rounded-[10px] lg:rounded-none">
                  <Image src={b.image} alt="" width={564} height={380} className="h-[88px] w-[88px] object-cover lg:h-[150px] lg:w-full" sizes="(min-width: 1024px) 282px, 88px" />
                </span>
                <span className="flex flex-1 flex-col gap-1.5 lg:gap-2.5 lg:p-[22px]">
                  <span className="flex items-center justify-between gap-2 font-bold group-hover:text-brand lg:text-lg">{b.title}<ArrowRight size={15} aria-hidden className="shrink-0 text-brand" /></span>
                  <span className="text-[13px] leading-snug text-body lg:text-sm lg:leading-relaxed">{b.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />
      <CtaBand locale={locale} photo />
    </>
  );
}
