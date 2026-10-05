'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';

import type { FaqPageCopy } from '@/data/site/faqPage';
import { ButtonLink, Container, PageHero, WhatsAppIcon } from '../ui';

type Faq = { category: string; question: string; answer: string };

const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'dan').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/**
 * Isi halaman FAQ: kotak cari di hero, daftar kategori (sidebar di desktop,
 * chip geser di mobile), dan akordion per kategori. Pencarian dan filter
 * kategori berjalan di browser; semua jawaban tetap ada di HTML awal.
 */
export default function FaqBrowser({ faqs, copy, crumbs, waHref, email }: { faqs: Faq[]; copy: FaqPageCopy; crumbs: { label: string; href?: string }[]; waHref: string; email: string }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);

  const categories = useMemo(() => {
    const list: { name: string; count: number }[] = [];
    for (const f of faqs) {
      const c = list.find(x => x.name === f.category);
      if (c) c.count++;
      else list.push({ name: f.category, count: 1 });
    }
    return list;
  }, [faqs]);

  const q = norm(query.trim());
  const terms = q.split(/\s+/).filter(Boolean);
  const matches = (f: Faq) => {
    if (!terms.length) return true;
    const hay = norm(`${f.question} ${f.answer}`);
    return terms.every(t => hay.includes(t));
  };
  const visible = faqs.filter(f => (!active || f.category === active) && matches(f));
  const groups = categories.map(c => ({ ...c, items: visible.filter(f => f.category === c.name) })).filter(g => g.items.length);

  const pick = (name: string | null) => {
    setActive(name);
    if (typeof window !== 'undefined') {
      document.getElementById('faq-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const chip = (name: string | null, label: string, count: number) => {
    const on = active === name;
    return (
      <button
        key={label}
        type="button"
        aria-pressed={on}
        onClick={() => pick(name)}
        className={clsx('shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors', on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-[#cdd2dc]')}
      >
        {label} <span className={on ? 'text-white/70' : 'text-mute'}>{count}</span>
      </button>
    );
  };

  return (
    <>
      <PageHero crumbs={crumbs} title={copy.title} desc={copy.desc}>
        <div role="search" className="relative w-full max-w-[560px]">
          <Search size={18} aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mute" />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchLabel}
            className="w-full rounded-xl border border-line bg-white py-3.5 pr-11 pl-11 text-[15px] text-ink placeholder:text-mute focus:border-brand focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label={copy.clear} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-mute hover:text-ink">
              <X size={18} />
            </button>
          )}
        </div>
      </PageHero>

      <section className="py-6 md:py-14">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-20">
          {/* Kategori: sidebar di desktop */}
          <nav aria-label={copy.categoriesLabel} className="hidden w-[280px] shrink-0 flex-col gap-1 lg:sticky lg:top-32 lg:flex">
            {[{ name: null as string | null, label: copy.all, count: faqs.length }, ...categories.map(c => ({ name: c.name as string | null, label: c.name, count: c.count }))].map(c => {
              const on = active === c.name;
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(c.name)}
                  className={clsx('flex items-center justify-between rounded-[10px] px-3.5 py-[11px] text-left text-[15px] transition-colors', on ? 'bg-tint font-semibold text-brand' : 'text-ink hover:bg-soft')}
                >
                  {c.label}
                  <span className={clsx('text-[13px]', on ? 'text-brand' : 'text-mute')}>{c.count}</span>
                </button>
              );
            })}
          </nav>

          {/* Kategori: chip geser di mobile */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
            {chip(null, copy.all, faqs.length)}
            {categories.map(c => chip(c.name, c.name, c.count))}
          </div>

          <div id="faq-list" className="flex min-w-0 flex-1 scroll-mt-32 flex-col gap-10 lg:max-w-[720px]">
            {terms.length > 0 && (
              <p className="text-sm text-body" aria-live="polite">
                {visible.length} {copy.resultSuffix}
              </p>
            )}
            {groups.map(g => (
              <div key={g.name} id={slugify(g.name)} className="flex scroll-mt-32 flex-col gap-3">
                <h2 className="text-[22px] font-bold md:text-2xl">{g.name}</h2>
                <div className="border-t border-line">
                  {g.items.map(f => (
                    <details key={f.question} className="group border-b border-line" open={terms.length > 0 && visible.length <= 3 ? true : undefined}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-[18px] text-base font-semibold hover:text-brand md:py-5 md:text-[17px] [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <span aria-hidden className="mt-0.5 text-xl leading-none text-ink group-open:hidden">+</span>
                        <span aria-hidden className="mt-0.5 hidden text-xl leading-none text-ink group-open:inline">−</span>
                      </summary>
                      <div className="pb-5 text-[15px] leading-[1.7] whitespace-pre-line text-body">{f.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-line p-6">
                <p className="text-[15px] text-body">{copy.empty}</p>
                <button type="button" onClick={() => { setQuery(''); setActive(null); }} className="text-sm font-semibold text-brand hover:underline">{copy.clear}</button>
              </div>
            )}

            <div className="flex flex-col gap-4 rounded-2xl bg-soft p-5 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex flex-col gap-1">
                <p className="text-[17px] font-bold md:text-lg">{copy.helpTitle}</p>
                <p className="text-sm leading-relaxed text-body md:text-[15px]">
                  {copy.helpDesc}{' '}
                  <a href={`mailto:${email}`} className="font-medium text-ink hover:text-brand">{email}</a>.
                </p>
              </div>
              <ButtonLink href={waHref} tone="whatsapp" icon={<WhatsAppIcon />} className="shrink-0">{copy.helpCta}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
