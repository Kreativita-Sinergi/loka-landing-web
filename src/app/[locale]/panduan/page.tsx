import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, PlayCircle } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { getGuideGroups, getPanduanCopy } from '@/data/site/panduan';
import { siteLinks } from '@/data/site/links';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, WhatsAppIcon } from '@/components/site/ui';
import PanduanShell, { guideHref } from '@/components/site/panduan/PanduanShell';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getPanduanCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/panduan'),
  };
}

export default async function PanduanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getPanduanCopy(locale);
  const l = siteLinks(locale);
  const [start, ...rest] = getGuideGroups(locale);

  return (
    <PanduanShell locale={locale}>
      <div className="flex flex-col gap-12 md:gap-14">
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-bold tracking-[0.1em] text-brand uppercase">{start.title}</p>
            <h2 className="text-2xl leading-tight font-bold md:text-[28px]">{c.startTitle}</h2>
            <p className="text-[15px] leading-relaxed text-body md:text-base">{c.startDesc}</p>
          </div>
          <ol className="flex flex-col gap-3">
            {start.guides.map((g, i) => (
              <li key={g.slug}>
                <Link href={guideHref(locale, g.slug)} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-3 transition hover:border-[#cdd2dc] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] md:gap-5 md:p-4">
                  {g.image && (
                    <span className="relative hidden h-[84px] w-[128px] shrink-0 overflow-hidden rounded-lg bg-soft sm:block">
                      <Image src={g.image.src} alt="" fill sizes="128px" className="object-cover object-left-top" />
                    </span>
                  )}
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white sm:hidden">{i + 1}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 text-[12px] font-semibold text-mute">
                      <span className="hidden sm:inline">{c.stepOf(i + 1, start.guides.length)}</span>
                      {g.youtubeId && <span className="inline-flex items-center gap-1"><span className="hidden sm:inline">·</span><PlayCircle size={13} aria-hidden />{c.watch}</span>}
                    </span>
                    <span className="text-base font-bold group-hover:text-brand md:text-[17px]">{g.title}</span>
                    <span className="text-[13px] leading-snug text-body md:text-sm">{g.desc}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden className="hidden shrink-0 text-mute group-hover:text-brand md:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl leading-tight font-bold md:text-[28px]">{c.moreTitle}</h2>
            <p className="text-[15px] leading-relaxed text-body md:text-base">{c.moreDesc}</p>
          </div>
          {rest.map(gr => (
            <div key={gr.title} className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.08em] text-mute uppercase">{gr.title}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {gr.guides.map(g => (
                  <Link key={g.slug} href={guideHref(locale, g.slug)} className="group flex flex-col gap-1.5 rounded-2xl border border-line bg-white p-4 transition hover:border-[#cdd2dc] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] md:p-5">
                    <span className="flex items-center justify-between gap-3 font-bold group-hover:text-brand">{g.title}<ArrowRight size={16} aria-hidden className="shrink-0 text-mute group-hover:text-brand" /></span>
                    <span className="text-[13px] leading-snug text-body md:text-sm">{g.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-soft p-5 md:flex-row md:items-center md:justify-between md:p-7">
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-bold md:text-lg">{c.helpTitle}</p>
            <p className="text-sm leading-relaxed text-body md:text-[15px]">{c.helpDesc}</p>
          </div>
          <ButtonLink href={l.whatsapp(c.helpMessage)} tone="whatsapp" icon={<WhatsAppIcon />} className="shrink-0">{c.helpCta}</ButtonLink>
        </div>
      </div>
    </PanduanShell>
  );
}
