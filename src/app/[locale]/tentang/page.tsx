import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { ChevronRight, Clock, Mail, Map } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import type { ReactNode } from 'react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { INSTAGRAM_HANDLE, OFFICE_ADDRESS, SERVICE_HOURS, SUPPORT_EMAIL, WHATSAPP_DISPLAY, siteLinks } from '@/data/site/links';
import { getTentangCopy } from '@/data/site/tentang';
import { alternatesFor } from '@/lib/hreflang';
import { fetchPublicStats, formatNumber } from '@/lib/publicStats';
import { ButtonLink, Container, PageHero, SectionHeading } from '@/components/site/ui';
import { CtaBand } from '@/components/site/sections';

/** Angka pemakaian diperbarui tiap 10 menit, sama seperti beranda. */
export const revalidate = 600;

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getTentangCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/tentang'),
  };
}

/** Pembulatan yang sama dengan beranda: 509 → "500+", 6.761 → "6.700+". */
function roughCount(value: number, locale: Locale) {
  if (value < 100) return formatNumber(value, locale);
  const step = value < 10000 ? 100 : 1000;
  return `${formatNumber(Math.floor(value / step) * step, locale)}+`;
}

function ContactCard({ href, icon, iconClass, label, value, action }: { href: string; icon: ReactNode; iconClass: string; label: string; value: string; action: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3.5 rounded-2xl bg-white p-4 transition hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] md:flex-col md:items-start md:gap-3.5 md:rounded-[18px] md:p-7">
      <span className={clsx('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12', iconClass)}>{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-2">
        <span className="text-[13px] text-body md:text-[15px]">{label}</span>
        <span className="truncate text-[17px] font-bold md:text-xl">{value}</span>
        <span className="hidden text-[15px] font-semibold text-brand group-hover:underline md:inline">{action} →</span>
      </span>
      <ChevronRight size={18} className="shrink-0 text-mute md:hidden" aria-hidden />
    </a>
  );
}

export default async function TentangPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getTentangCopy(locale);
  const l = siteLinks(locale);
  const stats = await fetchPublicStats();

  const statItems = [
    { big: stats ? roughCount(stats.total_users, locale) : '500+', small: c.stats.users },
    { big: stats ? roughCount(stats.total_transactions, locale) : '6.700+', small: c.stats.transactions },
    { big: c.stats.setupTitle, small: c.stats.setup },
    { big: c.stats.platformsTitle, small: c.stats.platforms },
  ];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICE_ADDRESS)}&output=embed`;

  return (
    <>
      <PageHero crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.crumb }]} title={c.title} desc={c.desc} />

      {/* Cerita */}
      <section className="py-14 md:py-[88px]">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Image src="/images/site/foto-warung.webp" alt={c.story.imageAlt} width={1200} height={900} sizes="(min-width: 1024px) 560px, 100vw" className="h-[230px] w-full rounded-2xl object-cover md:h-[420px] md:rounded-3xl lg:w-[560px]" />
          <div className="flex flex-col gap-4 md:gap-5 lg:w-[560px]">
            <SectionHeading eyebrow={c.story.eyebrow} title={c.story.title} />
            {c.story.paragraphs.map(p => <p key={p} className="text-base leading-relaxed text-body md:text-[17px]">{p}</p>)}
          </div>
        </Container>
      </section>

      {/* Angka */}
      <section className="pb-14 md:pb-[88px]">
        <Container>
          <dl className="grid grid-cols-2 gap-5 rounded-2xl bg-soft p-5 md:rounded-[20px] md:px-10 md:py-8 lg:grid-cols-4 lg:gap-0">
            {statItems.map((s, i) => (
              <div key={s.small} className={clsx('flex flex-col gap-1', i > 0 && 'lg:border-l lg:border-line lg:pl-8')}>
                <dt className="order-2 text-[13px] leading-snug text-body md:text-sm">{s.small}</dt>
                <dd className="order-1 text-xl leading-tight font-bold md:text-[28px]">{s.big}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Kontak */}
      <section className="bg-soft py-14 md:py-[88px]">
        <Container className="flex flex-col gap-6 md:gap-10">
          <SectionHeading eyebrow={c.contact.eyebrow} title={c.contact.title} desc={c.contact.desc} />
          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            <ContactCard href={l.whatsapp(c.contact.whatsapp.message)} icon={<FaWhatsapp size={24} aria-hidden />} iconClass="bg-ok-soft text-ok" label={c.contact.whatsapp.label} value={WHATSAPP_DISPLAY} action={c.contact.whatsapp.action} />
            <ContactCard href={l.email} icon={<Mail size={22} aria-hidden />} iconClass="bg-tint text-brand" label={c.contact.email.label} value={SUPPORT_EMAIL} action={c.contact.email.action} />
            <ContactCard href={l.instagram} icon={<FaInstagram size={22} aria-hidden />} iconClass="bg-tint text-brand" label={c.contact.instagram.label} value={INSTAGRAM_HANDLE} action={c.contact.instagram.action} />
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl bg-white md:rounded-[20px] lg:flex-row">
            <div className="flex flex-col items-start gap-3.5 p-5 md:gap-4 md:p-10 lg:w-[520px] lg:shrink-0">
              <h3 className="text-[17px] font-bold md:text-xl">{c.office.title}</h3>
              <address className="text-sm leading-relaxed text-body not-italic md:text-base md:leading-[1.65]">{OFFICE_ADDRESS}</address>
              <p className="flex items-center gap-2.5 text-sm md:text-[15px]"><Clock size={18} className="shrink-0 text-body" aria-hidden />{SERVICE_HOURS}</p>
              <ButtonLink href={l.maps} tone="secondary" size="sm" icon={<Map size={18} aria-hidden />}>{c.office.maps}</ButtonLink>
            </div>
            <div className="px-5 pb-5 lg:flex-1 lg:p-0">
              <iframe
                src={mapSrc}
                title={c.office.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[220px] w-full rounded-[10px] border-0 bg-[#E8EDF5] md:h-[320px] lg:h-full lg:min-h-[360px] lg:rounded-none"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}

