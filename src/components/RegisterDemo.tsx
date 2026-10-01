"use client";

import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft, Check, RotateCcw, ChevronDown, Banknote } from 'lucide-react';
import { getStorefront } from '@/data/storefront';
import type { Locale } from '@/data/localized';
import ProductArt from './ProductArt';

const prices = [18000, 5000, 18000, 25000, 12000, 5000];
const categories = [2, 2, 1, 1, 1, 2];
const money = (value: number) => `Rp${value.toLocaleString('id-ID')}`;
const paymentCopy = {
  id: { cash: 'Tunai', received: 'Uang diterima', change: 'Kembalian', exact: 'Uang pas', finish: 'Selesaikan', back: 'Kembali ke pesanan', short: 'Uang kurang', items: 'item', view: 'Lihat pesanan', steps: ['Pilih menu', 'Bayar', 'Struk'] },
  en: { cash: 'Cash', received: 'Cash received', change: 'Change', exact: 'Exact amount', finish: 'Complete sale', back: 'Back to order', short: 'Amount short', items: 'items', view: 'View order', steps: ['Choose', 'Pay', 'Receipt'] },
  ms: { cash: 'Tunai', received: 'Wang diterima', change: 'Baki', exact: 'Wang cukup', finish: 'Selesaikan', back: 'Kembali ke pesanan', short: 'Wang kurang', items: 'item', view: 'Lihat pesanan', steps: ['Pilih menu', 'Bayar', 'Resit'] },
  ja: { cash: '現金', received: 'お預かり金額', change: 'お釣り', exact: 'ちょうど', finish: '会計を完了', back: '注文に戻る', short: '不足額', items: '点', view: '注文を見る', steps: ['商品', '支払い', 'レシート'] },
};

type Step = 'order' | 'payment' | 'receipt';

export default function RegisterDemo({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const labels = paymentCopy[locale];
  const [filter, setFilter] = useState(0);
  const [cart, setCart] = useState([1, 0, 0, 0, 1, 0]);
  const [step, setStep] = useState<Step>('order');
  const [expanded, setExpanded] = useState(false);
  const [cash, setCash] = useState('50000');
  const orderPanel = useRef<HTMLDivElement>(null);
  const cashInput = useRef<HTMLInputElement>(null);
  const receiptButton = useRef<HTMLButtonElement>(null);
  const payButton = useRef<HTMLButtonElement>(null);
  const total = cart.reduce((sum, quantity, i) => sum + quantity * prices[i], 0);
  const count = cart.reduce((sum, quantity) => sum + quantity, 0);
  const received = Number(cash) || 0;
  const difference = received - total;
  const activeStep = ['order', 'payment', 'receipt'].indexOf(step);

  useEffect(() => {
    if (step === 'payment') cashInput.current?.focus({ preventScroll: true });
    if (step === 'receipt') receiptButton.current?.focus({ preventScroll: true });
    if (step !== 'order' && window.matchMedia('(max-width: 760px)').matches) {
      orderPanel.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }, [step]);

  function change(i: number, delta: number) {
    setStep('order');
    setCart(previous => previous.map((quantity, index) => index === i
      ? Math.max(0, Math.min(99, (step === 'receipt' ? 0 : quantity) + delta))
      : step === 'receipt' ? 0 : quantity));
  }

  function beginPayment() {
    setCash(String(Math.max(50000, Math.ceil(total / 50000) * 50000)));
    setExpanded(true);
    setStep('payment');
  }

  return (
    <div className={`register-demo register-step-${step} ${expanded ? 'order-expanded' : ''}`}>
      <div className="register-top">
        <div className="register-brand"><ShoppingBag size={20} /><strong>{copy.shop}</strong></div>
        <span><i />{copy.open}</span>
      </div>
      <ol className="register-steps" aria-label={copy.demoLabel}>
        {labels.steps.map((label, i) => <li key={label} className={i === activeStep ? 'current' : i < activeStep ? 'done' : ''} aria-current={i === activeStep ? 'step' : undefined}>
          <span>{i < activeStep ? <Check size={12} /> : i + 1}</span>{label}
        </li>)}
      </ol>
      <div className="register-body">
        <div className="register-menu">
          <div className="register-filters" aria-label={copy.demoLabel}>
            {[copy.all, copy.food, copy.drink].map((label, i) => <button key={label} type="button" aria-pressed={filter === i} className={filter === i ? 'selected' : ''} onClick={() => setFilter(i)}>{label}</button>)}
          </div>
          <div className="register-products">
            {copy.products.map((name, i) => (filter === 0 || categories[i] === filter) && <button type="button" className={`register-product product-${i} ${cart[i] > 0 ? 'in-cart' : ''}`} key={name} onClick={() => change(i, 1)} aria-label={`${copy.add} ${name}, ${money(prices[i])}`}>
              <span className="product-picture"><ProductArt item={i} />{cart[i] > 0 && <span className="product-count">{cart[i]}</span>}</span>
              <strong>{name}</strong><span className="product-price">{money(prices[i])}<Plus size={14} /></span>
            </button>)}
          </div>
          <p className="register-tap">↳ {copy.tap}</p>
        </div>
        <div className="register-order" ref={orderPanel}>
          {step === 'receipt' ? <div className="demo-receipt">
            <span className="receipt-check"><Check size={22} /></span><h3 role="status">{copy.paid}</h3>
            <p className="demo-receipt-shop">KEDAI LOKA</p><span className="demo-receipt-caption">{copy.receipt} #001</span>
            <div className="demo-receipt-lines">{cart.map((quantity, i) => quantity > 0 && <div key={copy.products[i]}><span>{quantity} × {copy.products[i]}</span><span>{(quantity * prices[i]).toLocaleString('id-ID')}</span></div>)}</div>
            <div className="demo-receipt-total"><span>{copy.total}</span><strong>{money(total)}</strong></div>
            <div className="receipt-payment-line"><span>{labels.cash}</span><span>{money(received)}</span></div>
            <div className="receipt-payment-line"><span>{labels.change}</span><span>{money(difference)}</span></div>
            <div className="receipt-barcode" aria-hidden="true" /><p className="demo-thanks">{copy.thanks}</p>
            <button ref={receiptButton} type="button" className="register-new" onClick={() => { setCart([0, 0, 0, 0, 0, 0]); setStep('order'); setExpanded(false); }}><RotateCcw size={15} />{copy.again}</button>
          </div> : step === 'payment' ? <form className="register-payment" onSubmit={event => { event.preventDefault(); if (difference >= 0 && count > 0) setStep('receipt'); }}>
            <button className="payment-back" type="button" onClick={() => { setStep('order'); requestAnimationFrame(() => payButton.current?.focus({ preventScroll: true })); }} aria-label={labels.back}><ArrowLeft size={16} />{copy.order}</button>
            <div className="payment-due"><span>{copy.total}</span><strong>{money(total)}</strong><span><Banknote size={16} />{labels.cash}</span></div>
            <label htmlFor="demo-cash">{labels.received}</label>
            <div className="cash-input"><span>Rp</span><input ref={cashInput} id="demo-cash" inputMode="numeric" pattern="[0-9]*" autoComplete="off" value={cash} onChange={event => setCash(event.target.value.replace(/\D/g, '').slice(0, 9))} aria-describedby="demo-change" /></div>
            <div className="cash-shortcuts">{[total, ...[50000, 100000].filter(amount => amount > total)].map((amount, i) => <button type="button" key={amount} onClick={() => setCash(String(amount))}>{i === 0 ? labels.exact : money(amount)}</button>)}</div>
            <div id="demo-change" className={`payment-change ${difference < 0 ? 'short' : ''}`} aria-live="polite"><span>{difference < 0 ? labels.short : labels.change}</span><strong>{money(Math.abs(difference))}</strong></div>
            <button className="payment-finish" type="submit" disabled={difference < 0 || count === 0}>{labels.finish}<Check size={18} /></button>
          </form> : <>
            <button type="button" className="register-mobile-order" aria-expanded={expanded} aria-controls="demo-order-items" onClick={() => setExpanded(!expanded)}><ShoppingBag size={18} /><span>{labels.view} · {count} {labels.items}</span><ChevronDown size={17} /></button>
            <div className="register-order-heading"><strong>{copy.order}</strong><span>{count} {labels.items}</span></div>
            <div id="demo-order-items" className="register-cart">
              {count === 0 && <p className="register-empty"><ShoppingBag size={28} />{copy.empty}</p>}
              {cart.map((quantity, i) => quantity > 0 && <div className="register-cart-item" key={copy.products[i]}>
                <div><strong>{copy.products[i]}</strong><span>{money(prices[i] * quantity)}</span></div>
                <div className="register-quantity"><button type="button" aria-label={`${copy.remove} ${copy.products[i]}`} onClick={() => change(i, -1)}><Minus size={13} /></button><span aria-label={copy.quantity}>{quantity}</span><button type="button" aria-label={`${copy.add} ${copy.products[i]}`} onClick={() => change(i, 1)}><Plus size={13} /></button></div>
              </div>)}
            </div>
            <div className="register-checkout"><div aria-live="polite"><span>{copy.total}</span><strong>{money(total)}</strong></div><button ref={payButton} type="button" disabled={count === 0} onClick={beginPayment}>{copy.pay}<ArrowRight size={18} /></button></div>
          </>}
        </div>
      </div>
      <div className="register-foot"><span>{copy.example}</span><span>LOKA / POS</span></div>
    </div>
  );
}
