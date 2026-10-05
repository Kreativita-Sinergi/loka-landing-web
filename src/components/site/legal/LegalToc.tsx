'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

type Item = { id: string; label: string };

/**
 * Daftar isi halaman hukum. Desktop: kolom lengket dengan penanda bagian aktif.
 * Mobile: kotak bergaya select yang membuka daftar tautan.
 */
export default function LegalToc({ items, title }: { items: Item[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map(i => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px' },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const activeLabel = items.find(i => i.id === active)?.label ?? items[0]?.label;

  return (
    <>
      {/* Mobile */}
      <div className="relative lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left"
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-xs text-mute">{title}</span>
            <span className="truncate text-[15px] font-semibold text-ink">{activeLabel}</span>
          </span>
          <ChevronDown size={20} className={clsx('shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />
        </button>
        {open && (
          <ul className="absolute inset-x-0 top-full z-20 mt-2 flex flex-col rounded-xl border border-line bg-white py-2 shadow-[0_12px_28px_rgba(16,24,40,0.12)]">
            {items.map(i => (
              <li key={i.id}>
                <a href={`#${i.id}`} onClick={() => setOpen(false)} className={clsx('block px-4 py-2.5 text-[15px]', i.id === active ? 'font-semibold text-brand' : 'text-body')}>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop */}
      <nav aria-label={title} className="sticky top-28 hidden flex-col gap-1 lg:flex">
        <p className="mb-2 text-xs font-bold tracking-[0.08em] text-mute uppercase">{title}</p>
        {items.map(i => (
          <a key={i.id} href={`#${i.id}`} className={clsx('flex items-center gap-2.5 py-2 pl-3.5 text-sm leading-snug', i.id === active ? 'font-semibold text-brand' : 'text-body hover:text-ink')}>
            <span aria-hidden className={clsx('h-5 w-[3px] shrink-0 rounded-sm', i.id === active ? 'bg-brand' : 'bg-line')} />
            {i.label}
          </a>
        ))}
      </nav>
    </>
  );
}
