import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { ArrowDown, ArrowRight, CircleCheck, HardDrive, Info, MapPin, MonitorSmartphone, RefreshCw, WifiOff, PlayCircle } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { getFaqs } from '@/data/faq';
import { guides as videoGuides } from '@/data/guides';
import { getHomeCopy } from '@/data/site/home';
import { getFeatureCategories } from '@/data/site/shared';
import { siteLinks } from '@/data/site/links';
import { fetchPublicStats, formatNumber } from '@/lib/publicStats';
import { ButtonLink, CheckItem, Container, IconTile, SectionHeading, TabletFrame, WhatsAppIcon } from '@/components/site/ui';
import { CtaBand, DownloadSection, FaqList, Testimonials, featureIcon } from '@/components/site/sections';
import PricingPlans from '@/components/site/PricingPlans';
import DemoKasir from '@/components/site/home/DemoKasir';

/** Statistik pemakaian diperbarui tiap 10 menit (lihat lib/publicStats). */
export const revalidate = 600;

/** 509 → "500+", 6.761 → "6.700+": dibulatkan ke bawah supaya tidak pernah melebih-lebihkan. */
function roughCount(value: number, locale: Locale) {
  if (value < 100) return formatNumber(value, locale);
  const step = value < 10000 ? 100 : 1000;
  return `${formatNumber(Math.floor(value / step) * step, locale)}+`;
}

const HOME_FAQ = [
  'Apakah ada masa percobaan gratis?',
  'Bagaimana jika koneksi internet terputus saat transaksi?',
  'Jenis bisnis apa saja yang cocok menggunakan Loka Kasir?',
  'Apa bedanya App Kasir dan Web Admin Loka Kasir?',
  'Apakah bisa mencetak struk ke printer thermal?',
  'Apakah ada biaya tambahan di luar harga langganan?',
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getHomeCopy(locale);
  const l = siteLinks(locale);
  const stats = await fetchPublicStats();
  const categories = getFeatureCategories(locale);
  const featuredGuides = ['buka-kasir', 'transaksi', 'tutup-shift']
    .map(slug => videoGuides.find(guide => guide.slug === slug))
    .filter(guide => guide !== undefined);
  const waAsk = l.whatsapp('Halo tim Loka, saya mau tanya tentang Loka Kasir.');

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getFaqs(locale).map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  const statItems = [
    { big: stats ? roughCount(stats.total_users, locale) : '500+', small: c.stats.users },
    { big: stats ? roughCount(stats.total_transactions, locale) : '6.700+', small: c.stats.transactions },
    { big: c.stats.devicesTitle, small: c.stats.devices },
    { big: c.stats.onsiteTitle, small: c.stats.onsite },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="pt-8 pb-10 md:pt-[72px] md:pb-[88px]">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-5 md:gap-7 lg:w-[580px]">
            <h1 className="text-[38px] leading-[1.15] font-bold tracking-[-0.02em] md:text-[56px]">
              {c.hero.titleA} <span className="text-brand">{c.hero.titleB}</span>
            </h1>
            <p className="max-w-[540px] text-base leading-relaxed text-body md:text-lg">{c.hero.desc}</p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <ButtonLink href={l.register} size="lg">{c.hero.primary}</ButtonLink>
              <ButtonLink href={l.harga} tone="secondary" size="lg">{c.hero.secondary}</ButtonLink>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-body md:text-[15px]">
              {c.hero.points.map(p => <li key={p} className="flex items-center gap-2"><CircleCheck size={18} className="text-ok" />{p}</li>)}
            </ul>
            <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-body md:text-sm"><MonitorSmartphone size={18} className="mt-px shrink-0" />{c.hero.caption}</p>
          </div>
          <Image src="/images/site/hero-perangkat.webp" alt={c.hero.imageAlt} width={1400} height={1344} priority sizes="(min-width: 1024px) 600px, 100vw" className="h-auto w-full lg:w-[600px]" />
        </Container>
      </section>

      {/* Angka */}
      <section className="pb-14 md:pb-[88px]">
        <Container>
          <dl className="grid grid-cols-2 gap-5 rounded-2xl bg-soft p-5 md:gap-0 md:rounded-[20px] md:px-10 md:py-8 lg:grid-cols-4">
            {statItems.map((s, i) => (
              <div key={s.small} className={clsx('flex flex-col gap-1', i > 0 && 'lg:border-l lg:border-line lg:pl-8')}>
                <dt className="order-2 text-[13px] leading-snug text-body md:text-sm">{s.small}</dt>
                <dd className="order-1 text-xl font-bold md:text-[28px]">{s.big}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Demo */}
      <section className="bg-soft py-14 md:py-24">
        <Container><DemoKasir copy={c.demo} /></Container>
      </section>

      {/* Jenis usaha */}
      <section id="jenis-usaha" className="scroll-mt-28 py-14 md:py-24">
        <Container className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={c.business.eyebrow} title={c.business.title} titleClassName="md:max-w-[640px]" />
            <p className="max-w-[420px] text-base leading-relaxed text-body">{c.business.desc}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {c.business.items.map(b => (
              <Link key={b.slug} href={l.usaha(b.slug)} className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-2.5 transition hover:border-[#cdd2dc] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-[18px] lg:p-0">
                <Image src={b.image} alt={b.title} width={564} height={380} className="h-[88px] w-[88px] shrink-0 rounded-[10px] object-cover lg:h-[190px] lg:w-full lg:rounded-none" sizes="(min-width: 1024px) 282px, 88px" />
                <span className="flex flex-col gap-1.5 lg:gap-2.5 lg:p-[22px]">
                  <span className="font-bold group-hover:text-brand lg:text-lg">{b.title}</span>
                  <span className="text-[13px] leading-snug text-body lg:text-sm lg:leading-relaxed">{b.desc}</span>
                  <span className="hidden text-sm font-semibold text-brand lg:inline">{c.business.more} →</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Fitur utama */}
      <section>
        <Container className="flex flex-col items-center pt-4 text-center md:pt-10">
          <SectionHeading eyebrow={c.features.eyebrow} title={c.features.title} desc={c.features.desc} align="center" titleClassName="md:max-w-[900px]" />
        </Container>
        {c.features.rows.map((row, i) => (
          <div key={row.title} className={clsx('py-14 md:py-[88px]', i % 2 && 'bg-soft')}>
            <Container className={clsx('flex flex-col gap-8 lg:items-center lg:justify-between', i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row')}>
              <div className="flex flex-col gap-4 lg:w-[480px]">
                <SectionHeading eyebrow={row.eyebrow} title={row.title} desc={row.desc} />
                <ul className="flex flex-col gap-3 pt-1 text-[15px] text-ink">{row.bullets.map(b => <CheckItem key={b}>{b}</CheckItem>)}</ul>
              </div>
              <TabletFrame src={row.image} alt={row.alt} className="lg:w-[650px]" />
            </Container>
          </div>
        ))}
      </section>

      {/* Offline */}
      <section className="py-14 md:py-24">
        <Container className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={c.offline.eyebrow} title={c.offline.title} />
            <p className="max-w-[440px] text-base leading-relaxed text-body">{c.offline.desc}</p>
          </div>
          <ol className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch lg:gap-0">
            {c.offline.steps.map((s, i) => {
              const icon = [<WifiOff key="a" size={26} />, <HardDrive key="b" size={26} />, <RefreshCw key="c" size={26} />][i];
              const tone = (['danger', 'brand', 'ok'] as const)[i];
              return (
                <li key={s.title} className="contents">
                  {i > 0 && <span aria-hidden className="flex items-center justify-center text-mute lg:w-[70px]"><ArrowDown size={22} className="lg:hidden" /><ArrowRight size={28} className="hidden lg:block" /></span>}
                  <div className="flex items-center gap-3.5 rounded-2xl border border-line p-4 lg:flex-1 lg:flex-col lg:items-start lg:p-7">
                    <IconTile size="lg" tone={tone}>{icon}</IconTile>
                    <div className="flex flex-col gap-1 lg:gap-3">
                      <h3 className="font-bold lg:text-lg">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-body lg:text-[15px]">{s.desc}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="flex items-start gap-2.5 text-[13px] text-body md:text-sm"><Info size={18} className="shrink-0" />{c.offline.note}</p>
        </Container>
      </section>

      {/* Semua fitur */}
      <section className="bg-soft py-14 md:py-24 lg:bg-white">
        <Container className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={c.allFeatures.eyebrow} title={c.allFeatures.title} />
            <ButtonLink href={l.fitur} tone="secondary" className="hidden md:inline-flex">{c.allFeatures.more}</ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6">
            {categories.map(cat => (
              <Link key={cat.key} href={`${l.fitur}#${cat.key}`} className="flex flex-col gap-3 rounded-[14px] border border-line bg-white p-4 transition hover:border-[#cdd2dc] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] lg:gap-4 lg:rounded-[18px] lg:p-7">
                <IconTile size="sm">{featureIcon(cat.icon, 20)}</IconTile>
                <span className="text-sm leading-snug font-bold lg:text-lg">{cat.title}</span>
                <ul className="hidden flex-col gap-2.5 text-sm text-body lg:flex">
                  {cat.items.slice(0, 4).map(it => <li key={it.label} className="flex items-center gap-2.5"><span className="h-[5px] w-[5px] rounded-full bg-mute" />{it.label}</li>)}
                </ul>
              </Link>
            ))}
          </div>
          <ButtonLink href={l.fitur} tone="secondary" block className="md:hidden">{c.allFeatures.more}</ButtonLink>
        </Container>
      </section>

      <DownloadSection locale={locale} copy={c.download} />
      <Testimonials />

      {/* Cara mulai */}
      <section className="py-14 md:py-24">
        <Container className="flex flex-col gap-8 md:gap-12">
          <SectionHeading eyebrow={c.start.eyebrow} title={c.start.title} align="center" className="items-start text-left md:items-center md:text-center" />
          <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
            {c.start.steps.map((s, i) => (
              <li key={s.title} className="flex gap-3.5 md:flex-col md:rounded-[18px] md:border md:border-line md:p-7">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white md:h-10 md:w-10 md:text-base">{i + 1}</span>
                <span className="flex flex-col gap-1 md:gap-3.5">
                  <span className="text-[17px] font-bold md:text-xl">{s.title}</span>
                  <span className="text-sm leading-relaxed text-body md:text-[15px]">{s.desc}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4 rounded-2xl bg-tint p-5 md:flex-row md:items-center md:justify-between md:rounded-[18px] md:px-9 md:py-7">
            <div className="flex items-center gap-4">
              <span className="hidden h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-white text-brand md:inline-flex"><MapPin size={24} /></span>
              <div className="flex flex-col gap-1">
                <p className="text-[17px] font-bold md:text-lg">{c.start.helpTitle}</p>
                <p className="text-sm leading-relaxed text-body md:text-[15px]">{c.start.helpDesc}</p>
              </div>
            </div>
            <ButtonLink href={l.whatsapp(c.start.helpMessage)} tone="whatsapp" icon={<WhatsAppIcon />}>{c.start.helpCta}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* Harga */}
      <section id="harga" className="bg-soft py-14 md:py-24">
        <Container className="flex flex-col items-center gap-8 md:gap-10">
          <SectionHeading eyebrow={c.pricing.eyebrow} title={c.pricing.title} desc={c.pricing.desc} align="center" className="items-start self-stretch text-left md:items-center md:text-center" />
          <PricingPlans locale={locale} />
        </Container>
      </section>

      {/* Video panduan */}
      <section id="tutorial" aria-labelledby="tutorial-title" className="scroll-mt-28 pt-12 md:pt-16">
        <Container>
          <div className="rounded-3xl border border-brand/10 bg-gradient-to-br from-tint via-[#f4f7ff] to-white p-5 sm:p-7 md:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="max-w-[600px]">
                <p className="mb-2 text-xs font-bold tracking-[0.1em] text-brand uppercase">Video panduan</p>
                <h2 id="tutorial-title" className="text-[26px] leading-tight font-bold tracking-[-0.015em] md:text-[32px]">Dari buka kasir sampai tutup shift</h2>
                <p className="mt-3 text-sm leading-relaxed text-body md:text-[15px]">Ikuti tiga langkah utama lewat video berbahasa Indonesia, di tablet atau ponsel.</p>
              </div>
              <ButtonLink href={l.panduan} tone="secondary" size="sm" className="self-start shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:self-auto">
                Lihat semua video panduan <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </div>
            <ol className="mt-6 grid gap-3 md:mt-7 md:grid-cols-3">
              {featuredGuides.map((guide, i) => (
                <li key={guide.slug}>
                  <Link href={`${l.panduan}/${guide.slug}`} className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition duration-200 hover:border-brand/30 hover:shadow-[0_6px_20px_rgba(25,95,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:p-5">
                    <div className="flex items-center gap-2.5">
                      <span aria-hidden className="text-xs font-semibold tabular-nums text-mute">0{i + 1}</span>
                      <h3 className="flex-1 text-base leading-snug font-bold transition-colors group-hover:text-brand">{guide.title}</h3>
                      <PlayCircle size={20} className="shrink-0 text-brand" aria-hidden />
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-body">{guide.description}</p>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-brand">Tonton panduan <ArrowRight size={15} className="transition-transform motion-safe:group-hover:translate-x-1" aria-hidden /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-24">
        <Container className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:w-[400px]">
            <SectionHeading eyebrow={c.faq.eyebrow} title={c.faq.title} desc={c.faq.desc} />
            <div className="hidden flex-col items-start gap-3 lg:flex">
              <ButtonLink href={waAsk} tone="whatsapp" icon={<WhatsAppIcon />}>{c.faq.cta}</ButtonLink>
              <Link href={l.faq} className="text-sm font-semibold text-brand hover:underline">{c.faq.more} →</Link>
            </div>
          </div>
          <div className="lg:w-[720px]"><FaqList locale={locale} questions={HOME_FAQ} /></div>
          <div className="flex flex-col gap-3 lg:hidden">
            <ButtonLink href={waAsk} tone="whatsapp" block icon={<WhatsAppIcon />}>{c.faq.cta}</ButtonLink>
            <Link href={l.faq} className="text-center text-sm font-semibold text-brand">{c.faq.more} →</Link>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} photo />
    </>
  );
}
