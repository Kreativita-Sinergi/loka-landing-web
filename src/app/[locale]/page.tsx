import { notFound } from 'next/navigation';
import Hero from '@/components/Hero';
import ShopFeatures from '@/components/ShopFeatures';
import ShopScreens from '@/components/ShopScreens';
import ShopStart from '@/components/ShopStart';
import Pricing from '@/components/Pricing/Pricing';
import FAQ from '@/components/FAQ';
import Stats from '@/components/Stats';
import { LOCALES, type Locale } from '@/data/localized';
import { getFaqs } from '@/data/faq';
import { getStorefront } from '@/data/storefront';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const copy = getStorefront(locale);
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: getFaqs(locale).map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g,'\\u003c') }}/><Hero locale={locale}/><div className="shop-container"><ShopFeatures locale={locale}/><ShopScreens locale={locale}/><Stats locale={locale}/><section id="pricing" className="shop-section shop-pricing"><p className="shop-eyebrow">03 / LOKA</p><h2>{copy.pricing}</h2><p className="shop-section-note">{copy.pricingNote}</p><Pricing locale={locale}/></section><ShopStart locale={locale}/><FAQ locale={locale}/></div></>;
}
