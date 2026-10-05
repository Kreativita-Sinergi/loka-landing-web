import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { getFaqs } from '@/data/faq';
import { getFaqPageCopy } from '@/data/site/faqPage';
import { siteLinks, SUPPORT_EMAIL } from '@/data/site/links';
import { alternatesFor } from '@/lib/hreflang';
import FaqBrowser from '@/components/site/faq/FaqBrowser';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getFaqPageCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/faq'),
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getFaqPageCopy(locale);
  const l = siteLinks(locale);
  const faqs = getFaqs(locale).map(f => ({ category: f.category ?? '', question: f.question, answer: f.answer }));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <FaqBrowser
        faqs={faqs}
        copy={c}
        crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.crumb }]}
        waHref={l.whatsapp(c.helpMessage)}
        email={SUPPORT_EMAIL}
      />
    </>
  );
}
