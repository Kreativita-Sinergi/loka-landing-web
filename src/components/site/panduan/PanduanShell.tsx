import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import type { Locale } from '@/data/localized';
import { getGuideGroups, getPanduanCopy, type Guide } from '@/data/site/panduan';
import { siteLinks } from '@/data/site/links';
import { Container } from '../ui';
import PanduanSearch, { type SearchItem } from './PanduanSearch';

export const guideHref = (locale: Locale, slug: string) => `${siteLinks(locale).panduan}/${slug}`;

const keywords = (g: Guide) => [g.intro, g.tip, ...(g.steps ?? []).map(s => `${s.title} ${s.body}`), ...(g.faq ?? [])].filter(Boolean).join(' ');

/** Kerangka halaman panduan: kepala dengan kotak cari, sidebar grup, dan isi. */
export default function PanduanShell({ locale, active, children }: { locale: Locale; active?: string; children: ReactNode }) {
  const c = getPanduanCopy(locale);
  const l = siteLinks(locale);
  const groups = getGuideGroups(locale);
  const items: SearchItem[] = groups.flatMap(gr => gr.guides.map(g => ({ title: g.title, desc: g.desc, group: gr.title, href: guideHref(locale, g.slug), keywords: keywords(g) })));
  const activeGuide = groups.flatMap(g => g.guides).find(g => g.slug === active);

  const link = (g: Guide, mobile?: boolean) => {
    const on = g.slug === active;
    return (
      <li key={g.slug}>
        <Link
          href={guideHref(locale, g.slug)}
          aria-current={on ? 'page' : undefined}
          className={clsx('block rounded-lg px-3 py-[9px] text-[15px] transition-colors', on ? 'bg-tint font-semibold text-brand' : 'text-ink hover:bg-soft', mobile && 'py-2.5')}
        >
          {g.title}
        </Link>
      </li>
    );
  };

  const nav = (mobile?: boolean) => (
    <div className="flex flex-col gap-6 md:gap-7">
      {groups.map(gr => (
        <div key={gr.title} className="flex flex-col gap-1.5">
          <p className="px-3 text-xs font-bold tracking-[0.08em] text-mute uppercase">{gr.title}</p>
          <ul className="flex flex-col gap-0.5">{gr.guides.map(g => link(g, mobile))}</ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-soft">
        <Container className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between md:py-10">
          <div className="flex flex-col gap-1.5">
            {active ? (
              <Link href={l.panduan} className="text-[28px] leading-tight font-bold hover:text-brand md:text-[32px]">{c.title}</Link>
            ) : (
              <h1 className="text-[28px] leading-tight font-bold md:text-[32px]">{c.title}</h1>
            )}
            <p className="text-[15px] text-body md:text-base">{c.desc}</p>
          </div>
          <PanduanSearch items={items} placeholder={c.searchPlaceholder} label={c.searchLabel} empty={c.searchEmpty} />
        </Container>
      </section>

      <section className="py-7 md:py-14">
        <Container className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-20">
          <nav aria-label={c.navLabel} className="hidden w-[260px] shrink-0 lg:sticky lg:top-32 lg:block">{nav()}</nav>

          <details className="group rounded-[10px] border border-line bg-white lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex flex-col gap-0.5">
                <span className="text-xs text-mute">{activeGuide ? activeGuide.group : c.selectLabel}</span>
                <span className="text-[15px] font-semibold">{activeGuide ? activeGuide.title : c.navLabel}</span>
              </span>
              <ChevronDown size={18} aria-hidden className="transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-line px-1 py-4">{nav(true)}</div>
          </details>

          <div className="min-w-0 flex-1 lg:max-w-[760px]">{children}</div>
        </Container>
      </section>
    </>
  );
}
