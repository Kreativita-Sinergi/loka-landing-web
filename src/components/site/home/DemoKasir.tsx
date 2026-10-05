'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { CircleCheck, Minus, MousePointerClick, Plus } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');
const initials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase();

/**
 * Kasir mini yang bisa dicoba tanpa daftar: pilih menu → bayar → struk.
 * Semua data contoh, tidak ada yang dikirim ke server.
 */
export default function DemoKasir({ copy }: { copy: HomeCopy['demo'] }) {
  const [cart, setCart] = useState<Record<string, number>>({ 'Kopi susu': 2, 'Roti bakar': 1 });
  const [paid, setPaid] = useState(false);

  const lines = useMemo(() => copy.products.filter(p => cart[p.name]).map(p => ({ ...p, qty: cart[p.name] })), [cart, copy.products]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const step = paid ? 2 : count ? 1 : 0;

  const add = (name: string, delta: number) => {
    setPaid(false);
    setCart(c => {
      const next = { ...c, [name]: Math.max(0, (c[name] ?? 0) + delta) };
      if (!next[name]) delete next[name];
      return next;
    });
  };
  const reset = () => { setCart({}); setPaid(false); };

  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-5 lg:w-[400px]">
        <p className="text-[13px] font-bold tracking-[0.1em] text-brand uppercase">{copy.eyebrow}</p>
        <h2 className="text-[26px] leading-tight font-bold tracking-[-0.015em] md:text-[40px]">{copy.title}</h2>
        <p className="text-base leading-relaxed text-body md:text-[17px]">{copy.desc}</p>
        <ol className="flex gap-2 lg:flex-col lg:gap-3.5">
          {copy.steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2.5 lg:gap-3.5">
              <span className={clsx('inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold', i <= step ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body')}>{i + 1}</span>
              <span className={clsx('text-sm lg:text-base', i === step ? 'font-bold text-ink' : 'font-medium text-body')}>{s}</span>
            </li>
          ))}
        </ol>
        <p className="flex items-center gap-2 text-[13px] text-mute"><MousePointerClick size={16} />{copy.hint}</p>
      </div>

      <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_20px_50px_rgba(16,24,40,0.10)] md:flex-row lg:w-[720px]">
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
          <div className="flex items-center justify-between">
            <span className="font-bold">{copy.shop}</span>
            <span className="flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-xs font-semibold text-ok"><span className="h-1.5 w-1.5 rounded-full bg-ok" />{copy.open}</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {copy.products.map(p => {
              const q = cart[p.name] ?? 0;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => add(p.name, 1)}
                  aria-label={`Tambah ${p.name}`}
                  className={clsx('relative flex flex-col gap-2 rounded-xl border p-2.5 text-left transition-colors md:p-3', q ? 'border-2 border-brand' : 'border-line hover:border-[#cdd2dc]')}
                >
                  <span className={clsx('flex h-11 items-center justify-center rounded-lg text-sm font-bold md:h-16 md:text-lg', q ? 'bg-tint text-brand' : 'bg-soft text-mute')}>{initials(p.name)}</span>
                  <span className="text-xs font-semibold md:text-[13px]">{p.name}</span>
                  <span className="text-[11px] text-body md:text-xs">{rupiah(p.price)}</span>
                  {q > 0 && <span className="absolute top-1.5 right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">{q}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3.5 bg-soft p-4 md:w-[240px] md:p-5">
          {paid ? (
            <div className="flex flex-1 flex-col gap-3" aria-live="polite">
              <p className="flex items-center gap-2 font-bold text-ok"><CircleCheck size={18} />{copy.paid}</p>
              <div className="flex flex-col gap-1.5 rounded-lg border border-dashed border-[#cdd2dc] bg-white p-3 font-mono text-xs">
                <span className="text-center font-bold">{copy.shop.toUpperCase()}</span>
                {lines.map(l => <span key={l.name} className="flex justify-between"><span>{l.qty}x {l.name}</span><span>{(l.qty * l.price).toLocaleString('id-ID')}</span></span>)}
                <span className="mt-1 flex justify-between border-t border-dashed border-[#cdd2dc] pt-1.5 font-bold"><span>{copy.total}</span><span>{total.toLocaleString('id-ID')}</span></span>
                <span className="flex justify-between"><span>{copy.cash}</span><span>{total.toLocaleString('id-ID')}</span></span>
                <span className="pt-1 text-center text-mute">{copy.thanks}</span>
              </div>
              <button type="button" onClick={reset} className="mt-auto rounded-[10px] border-[1.5px] border-line bg-white py-3 text-sm font-semibold hover:bg-soft">{copy.again}</button>
            </div>
          ) : (
            <>
              <p className="font-bold">{copy.order} ({count})</p>
              {lines.length === 0 && <p className="text-sm text-body">{copy.empty}</p>}
              <ul className="flex flex-col gap-3">
                {lines.map(l => (
                  <li key={l.name} className="flex items-center justify-between gap-2 text-[13px]">
                    <span className="flex flex-col">
                      <span className="font-semibold">{l.name}</span>
                      <span className="text-xs text-body">{l.qty} x {l.price.toLocaleString('id-ID')}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <button type="button" aria-label={`Kurangi ${l.name}`} onClick={() => add(l.name, -1)} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white"><Minus size={12} /></button>
                      <button type="button" aria-label={`Tambah ${l.name}`} onClick={() => add(l.name, 1)} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"><Plus size={12} /></button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 border-t border-line pt-3">
                <p className="flex items-center justify-between"><span className="text-sm text-body">{copy.total}</span><span className="text-base font-bold">{rupiah(total)}</span></p>
                <button type="button" disabled={!count} onClick={() => setPaid(true)} className="rounded-[10px] bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:bg-[#c9d6f2]">{copy.pay}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
