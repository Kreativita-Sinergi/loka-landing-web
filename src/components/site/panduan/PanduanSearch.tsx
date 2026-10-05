'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export type SearchItem = { title: string; desc: string; group: string; href: string; keywords: string };

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

/** Kotak cari panduan: hasilnya muncul sebagai daftar di bawah kotak. */
export default function PanduanSearch({ items, placeholder, label, empty }: { items: SearchItem[]; placeholder: string; label: string; empty: string }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const listId = useId();
  const terms = norm(query.trim()).split(/\s+/).filter(Boolean);
  const results = terms.length ? items.filter(i => { const hay = norm(`${i.title} ${i.desc} ${i.group} ${i.keywords}`); return terms.every(t => hay.includes(t)); }) : [];
  const show = open && terms.length > 0;

  return (
    <div role="search" className="relative w-full md:w-[420px]" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <Search size={18} aria-hidden className="pointer-events-none absolute top-[25px] left-4 -translate-y-1/2 text-mute" />
      <input
        type="search"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}
        placeholder={placeholder}
        aria-label={label}
        aria-controls={listId}
        className="w-full rounded-[10px] border border-line bg-white py-3 pr-4 pl-11 text-[15px] text-ink placeholder:text-mute focus:border-brand focus:outline-none"
      />
      {show && (
        <div id={listId} className="absolute inset-x-0 top-full z-30 mt-2 max-h-[360px] overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_16px_40px_rgba(16,24,40,0.14)]">
          {results.length ? (
            <ul>
              {results.map(r => (
                <li key={r.href}>
                  <Link href={r.href} onClick={() => setOpen(false)} className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-soft focus:bg-soft focus:outline-none">
                    <span className="text-[11px] font-bold tracking-[0.08em] text-mute uppercase">{r.group}</span>
                    <span className="text-[15px] font-semibold">{r.title}</span>
                    <span className="text-[13px] leading-snug text-body">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm text-body">{empty}</p>
          )}
        </div>
      )}
    </div>
  );
}
