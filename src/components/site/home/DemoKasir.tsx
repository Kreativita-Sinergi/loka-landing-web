'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { CircleCheck, Minus, MousePointerClick, Plus } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';

const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');
const initials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase();
const EASE = [0.22, 1, 0.36, 1] as const;

type Flyer = { id: number; label: string; from: { x: number; y: number }; to: { x: number; y: number } };

/** Angka rupiah yang bergulir halus ke nilai barunya. */
function RollingRupiah({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 140, damping: 22 });
  const text = useTransform(spring, v => rupiah(Math.round(v)));
  useEffect(() => { spring.set(value); }, [spring, value]);
  return <motion.span className={clsx('tabular-nums', className)}>{text}</motion.span>;
}

/**
 * Kasir mini yang bisa dicoba tanpa daftar: pilih menu → bayar → struk.
 * Semua data contoh, tidak ada yang dikirim ke server.
 */
export default function DemoKasir({ copy }: { copy: HomeCopy['demo'] }) {
  const reduce = useReducedMotion();
  const [cart, setCart] = useState<Record<string, number>>({ 'Kopi susu': 2, 'Roti bakar': 1 });
  const [paid, setPaid] = useState(false);
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const cartTarget = useRef<HTMLParagraphElement>(null);
  const flyerId = useRef(0);

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

  /** Tambah dari kartu menu: ada bulatan kecil yang terbang ke daftar pesanan. */
  const addFromMenu = (name: string, el: HTMLElement) => {
    add(name, 1);
    const target = cartTarget.current;
    if (reduce || !target) return;
    const a = el.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const id = ++flyerId.current;
    setFlyers(f => [...f, { id, label: initials(name), from: { x: a.left + a.width / 2, y: a.top + a.height / 3 }, to: { x: b.left + 40, y: b.top + b.height / 2 } }]);
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
              <span className="relative inline-flex h-8 w-8 items-center justify-center">
                {i === step && <motion.span layoutId="demo-step-ring" className="absolute -inset-1 rounded-full border-2 border-brand/30" transition={{ type: 'spring', stiffness: 380, damping: 28 }} />}
                <motion.span
                  animate={{ scale: i === step ? [1, 1.25, 1] : 1 }}
                  transition={{ duration: 0.45 }}
                  className={clsx('inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300', i <= step ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body')}
                >
                  {i + 1}
                </motion.span>
              </span>
              <span className={clsx('text-sm transition-colors lg:text-base', i === step ? 'font-bold text-ink' : 'font-medium text-body')}>{s}</span>
            </li>
          ))}
        </ol>
        <p className="flex items-center gap-2 text-[13px] text-mute"><MousePointerClick size={16} />{copy.hint}</p>
      </div>

      <div className="flex w-full flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-[0_30px_70px_-20px_rgba(16,24,40,0.18)] md:flex-row lg:w-[720px]">
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
          <div className="flex items-center justify-between">
            <span className="font-bold">{copy.shop}</span>
            <span className="flex items-center gap-1.5 rounded-full bg-ok-soft px-2.5 py-1 text-xs font-semibold text-ok">
              <span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" /><span className="relative h-1.5 w-1.5 rounded-full bg-ok" /></span>
              {copy.open}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {copy.products.map(p => {
              const q = cart[p.name] ?? 0;
              return (
                <motion.button
                  key={p.name}
                  type="button"
                  whileTap={{ scale: 0.93 }}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  onClick={e => addFromMenu(p.name, e.currentTarget)}
                  aria-label={`Tambah ${p.name}`}
                  className={clsx('relative flex flex-col gap-2 rounded-xl border p-2.5 text-left transition-colors md:p-3', q ? 'border-2 border-brand shadow-[0_10px_24px_-12px_rgba(13,93,243,0.5)]' : 'border-line hover:border-[#cdd2dc]')}
                >
                  <span className={clsx('flex h-11 items-center justify-center rounded-lg text-sm font-bold transition-colors md:h-16 md:text-lg', q ? 'bg-tint text-brand' : 'bg-soft text-mute')}>{initials(p.name)}</span>
                  <span className="text-xs font-semibold md:text-[13px]">{p.name}</span>
                  <span className="text-[11px] text-body md:text-xs">{rupiah(p.price)}</span>
                  <AnimatePresence>
                    {q > 0 && (
                      <motion.span
                        key={q}
                        initial={{ scale: 1.8, opacity: 0.4 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="absolute top-1.5 right-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white"
                      >
                        {q}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="relative flex flex-col gap-3.5 bg-soft p-4 md:w-[240px] md:p-5">
          <AnimatePresence mode="wait" initial={false}>
            {paid ? (
              <motion.div key="paid" className="flex flex-1 flex-col gap-3" aria-live="polite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.p className="flex items-center gap-2 font-bold text-ok" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.1, type: 'spring', stiffness: 400, damping: 14 }}><CircleCheck size={18} /></motion.span>
                  {copy.paid}
                </motion.p>
                {/* Struk keluar dari celah printer. */}
                <div className="relative">
                  <div aria-hidden className="relative z-10 h-2.5 rounded-full bg-ink shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />
                  <div className="-mt-1 overflow-hidden px-1.5">
                    <motion.div
                      initial={{ y: '-100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, ease: [0.45, 0, 0.2, 1] }}
                      className="receipt-edge flex flex-col gap-1.5 bg-white p-3 pb-4 font-mono text-xs shadow-[0_10px_20px_-10px_rgba(16,24,40,0.3)]"
                    >
                      <span className="text-center font-bold">{copy.shop.toUpperCase()}</span>
                      {lines.map(l => <span key={l.name} className="flex justify-between"><span>{l.qty}x {l.name}</span><span>{(l.qty * l.price).toLocaleString('id-ID')}</span></span>)}
                      <span className="mt-1 flex justify-between border-t border-dashed border-[#cdd2dc] pt-1.5 font-bold"><span>{copy.total}</span><span>{total.toLocaleString('id-ID')}</span></span>
                      <span className="flex justify-between"><span>{copy.cash}</span><span>{total.toLocaleString('id-ID')}</span></span>
                      <span className="pt-1 text-center text-mute">{copy.thanks}</span>
                    </motion.div>
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.96 }} type="button" onClick={reset} className="mt-auto rounded-[10px] border-[1.5px] border-line bg-white py-3 text-sm font-semibold hover:bg-soft">{copy.again}</motion.button>
              </motion.div>
            ) : (
              <motion.div key="order" className="flex flex-1 flex-col gap-3.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p ref={cartTarget} className="font-bold">
                  {copy.order}{' '}
                  <motion.span key={count} className="inline-block" initial={{ scale: 1.5, color: '#0d5df3' }} animate={{ scale: 1, color: '#231f20' }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>({count})</motion.span>
                </p>
                {lines.length === 0 && <p className="text-sm text-body">{copy.empty}</p>}
                <ul className="flex flex-col gap-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {lines.map(l => (
                      <motion.li
                        layout
                        key={l.name}
                        initial={{ opacity: 0, x: 24, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -24, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="flex items-center justify-between gap-2 text-[13px]"
                      >
                        <span className="flex flex-col">
                          <span className="font-semibold">{l.name}</span>
                          <span className="text-xs text-body">{l.qty} x {l.price.toLocaleString('id-ID')}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <motion.button whileTap={{ scale: 0.85 }} type="button" aria-label={`Kurangi ${l.name}`} onClick={() => add(l.name, -1)} className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white"><Minus size={12} /></motion.button>
                          <motion.button whileTap={{ scale: 0.85 }} type="button" aria-label={`Tambah ${l.name}`} onClick={() => add(l.name, 1)} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"><Plus size={12} /></motion.button>
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="mt-auto flex flex-col gap-3 border-t border-line pt-3">
                  <p className="flex items-center justify-between"><span className="text-sm text-body">{copy.total}</span><RollingRupiah value={total} className="text-base font-bold" /></p>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    disabled={!count}
                    onClick={() => setPaid(true)}
                    className="hero-cta relative overflow-hidden rounded-[10px] bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:bg-[#c9d6f2] disabled:after:hidden"
                  >
                    {copy.pay}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hanya dirender saat ada yang terbang, jadi tidak pernah ikut hidrasi. */}
      {flyers.length > 0 && createPortal(
        <AnimatePresence>
          {flyers.map(f => (
            <motion.span
              key={f.id}
              aria-hidden
              className="pointer-events-none fixed top-0 left-0 z-[70] inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-[0_10px_24px_rgba(13,93,243,0.45)]"
              initial={{ x: f.from.x - 20, y: f.from.y - 20, scale: 0.6, opacity: 0 }}
              animate={{
                x: [f.from.x - 20, (f.from.x + f.to.x) / 2 - 20, f.to.x - 20],
                y: [f.from.y - 20, Math.min(f.from.y, f.to.y) - 90, f.to.y - 20],
                scale: [0.6, 1.1, 0.4],
                opacity: [0, 1, 0.2],
              }}
              transition={{ duration: 0.75, ease: EASE, times: [0, 0.45, 1] }}
              onAnimationComplete={() => setFlyers(list => list.filter(x => x.id !== f.id))}
            >
              {f.label}
            </motion.span>
          ))}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
