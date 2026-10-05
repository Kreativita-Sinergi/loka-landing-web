import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { Lightbulb, PlayCircle } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { getFaqs } from '@/data/faq';
import { getGuides, getPanduanCopy, getVideoDuration } from '@/data/site/panduan';
import { siteLinks } from '@/data/site/links';
import { alternatesFor } from '@/lib/hreflang';
import { Breadcrumb, ButtonLink, WhatsAppIcon } from '@/components/site/ui';
import PanduanShell, { guideHref } from '@/components/site/panduan/PanduanShell';

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap(locale => getGuides(locale).map(g => ({ locale, slug: g.slug })));
}

function resolve(rawLocale: string, slug: string) {
  if (!(LOCALES as readonly string[]).includes(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const guides = getGuides(locale);
  const index = guides.findIndex(g => g.slug === slug);
  if (index < 0) notFound();
  return { locale, guides, index, guide: guides[index] };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const { locale, guide } = resolve(raw, slug);
  const c = getPanduanCopy(locale);
  return {
    title: `${guide.title} · ${c.title} | ${siteDetails.siteName}`,
    description: guide.intro ?? guide.desc,
    alternates: alternatesFor(locale, `/panduan/${guide.slug}`),
  };
}

export default async function GuidePage({ params }: Params) {
  const { locale: raw, slug } = await params;
  const { locale, guides, index, guide } = resolve(raw, slug);
  const c = getPanduanCopy(locale);
  const l = siteLinks(locale);
  const sameGroup = guides.filter(g => g.group === guide.group);
  const prev = guides[index - 1];
  const next = guides[index + 1];
  const allFaqs = getFaqs(locale);
  const faqs = (guide.faq ?? []).map(q => allFaqs.find(f => f.question === q)).filter((f): f is (typeof allFaqs)[number] => Boolean(f));
  const duration = guide.video ? getVideoDuration(guide.video) : undefined;
  const moreHref = guide.more ? l[guide.more.to] : undefined;

  const meta = [guide.video ? c.stepOf(sameGroup.indexOf(guide) + 1, sameGroup.length) : null, duration ? `${c.videoLabel} ${duration}` : null].filter(Boolean).join(' · ');

  return (
    <PanduanShell locale={locale} active={guide.slug}>
      <article className="flex flex-col gap-6 md:gap-7">
        <Breadcrumb items={[{ label: c.crumb, href: l.panduan }, { label: guide.group }, { label: guide.title }]} />

        <header className="flex flex-col gap-2.5 md:gap-3">
          <h1 className="text-[30px] leading-[1.2] font-bold tracking-[-0.02em] md:text-[40px]">{guide.title}</h1>
          {meta && <p className="text-[13px] text-mute md:text-sm">{meta}</p>}
        </header>

        <p className="text-base leading-[1.7] text-body md:text-[17px]">{guide.intro ?? guide.desc}</p>

        {guide.image && (
          <div className="rounded-xl bg-soft p-2 md:rounded-2xl md:p-3">
            <Image src={guide.image.src} alt={guide.image.alt} width={1600} height={1051} className="h-auto w-full rounded-lg md:rounded-[10px]" sizes="(min-width: 1024px) 736px, 100vw" />
          </div>
        )}

        {guide.steps && (
          <div className={clsx('flex flex-col gap-6', guide.video && 'md:flex-row md:items-start md:gap-10')}>
            <ol className="flex flex-1 flex-col gap-5 md:gap-6">
              {guide.steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3.5 md:gap-4">
                  <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white md:h-8 md:w-8 md:text-sm">{i + 1}</span>
                  <span className="flex flex-col gap-1 md:gap-1.5">
                    <span className="text-[17px] font-bold md:text-lg">{s.title}</span>
                    <span className="text-[15px] leading-[1.6] text-body md:text-base md:leading-[1.65]">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            {guide.video && (
              <figure className="mx-auto flex w-[220px] shrink-0 flex-col gap-2.5 md:mx-0">
                <div className="rounded-[26px] bg-[#1c1c1e] p-[5px] shadow-[0_16px_32px_rgba(16,24,40,0.16)]">
                  <video
                    src={`/videos/tutorials/${guide.video}.mp4`}
                    poster={`/videos/tutorials/${guide.video}_poster.jpg`}
                    preload="none"
                    controls
                    playsInline
                    className="aspect-[360/800] w-full rounded-[22px] bg-black object-cover"
                    aria-label={`${c.watch}: ${guide.title}`}
                  />
                </div>
                <figcaption className="flex items-center justify-center gap-1.5 text-[13px] text-body">
                  <PlayCircle size={14} aria-hidden />
                  {c.watch}{duration ? ` (${duration})` : ''}
                </figcaption>
              </figure>
            )}
          </div>
        )}

        {guide.tip && (
          <div className="flex items-start gap-3 rounded-xl bg-warn-soft p-4 md:gap-3.5 md:p-5">
            <Lightbulb size={20} aria-hidden className="mt-0.5 shrink-0 text-[#b7791f]" />
            <p className="text-sm leading-[1.6] md:text-[15px]"><b>{c.tip}</b> {guide.tip}</p>
          </div>
        )}

        {faqs.map(f => (
          <section key={f.question} className="flex flex-col gap-2.5">
            <h2 className="text-xl leading-snug font-bold md:text-[22px]">{f.question}</h2>
            <p className="text-[15px] leading-[1.7] whitespace-pre-line text-body md:text-base">{f.answer}</p>
          </section>
        ))}

        {guide.more && moreHref && (
          <div>
            <ButtonLink href={moreHref} tone="secondary">{guide.more.label} →</ButtonLink>
          </div>
        )}

        <div className="h-px bg-line" />

        <nav aria-label={`${c.prev} / ${c.next}`} className="grid grid-cols-2 gap-2.5 md:gap-4">
          {prev ? (
            <Link href={guideHref(locale, prev.slug)} className="flex flex-col gap-1 rounded-xl border border-line p-3.5 transition hover:border-[#cdd2dc] md:p-5">
              <span className="text-xs text-mute md:text-[13px]">← {c.prev}</span>
              <span className="text-sm font-semibold md:text-base">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={guideHref(locale, next.slug)} className="flex flex-col items-end gap-1 rounded-xl border border-line p-3.5 text-right transition hover:border-[#cdd2dc] md:p-5">
              <span className="text-xs text-mute md:text-[13px]">{c.next} →</span>
              <span className="text-sm font-semibold text-brand md:text-base">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>

        <div className="flex flex-col gap-4 rounded-2xl bg-soft p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-bold">{c.helpTitle}</p>
            <p className="text-sm leading-relaxed text-body">{c.helpDesc}</p>
          </div>
          <ButtonLink href={l.whatsapp(c.helpMessage)} tone="whatsapp" icon={<WhatsAppIcon />} className="shrink-0">{c.helpCta}</ButtonLink>
        </div>
      </article>
    </PanduanShell>
  );
}
