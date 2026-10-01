"use client";
import { ArrowUpRight, Store, Coffee, UtensilsCrossed } from 'lucide-react';
import DemoVideo from './DemoVideo';
import RegisterDemo from './RegisterDemo';
import { getStorefront } from '@/data/storefront';
import { getSignUp } from '@/data/cta';
import { trackSignUpClick } from '@/utils/analytics';
import type { Locale } from '@/data/localized';

export default function Hero({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const signup = getSignUp(locale);
  const icons = [Store, Coffee, UtensilsCrossed];
  return <section id="hero" className="shop-hero"><div className="shop-hero-inner"><div className="shop-hero-copy"><p className="shop-eyebrow"><span />{copy.eyebrow}</p><h1>{copy.lead}<br /><span>{copy.highlight}</span></h1><p className="shop-hero-intro">{copy.intro}</p><a className="shop-button" href={signup.url} target="_blank" rel="noopener noreferrer" onClick={() => trackSignUpClick('hero')}>{copy.start}<ArrowUpRight size={19} /></a><p className="shop-trial">{copy.trial}</p><DemoVideo locale={locale} label={copy.demo} className="shop-demo-button" /></div><div className="shop-register-stage"><div className="shop-demo-heading"><span>{copy.demoLabel}</span><span aria-hidden="true">↓</span></div><RegisterDemo locale={locale} /><div className="shop-register-base" aria-hidden="true"><span /></div></div></div><div className="shop-businesses">{copy.businesses.map((label, i) => { const Icon = icons[i]; return <span key={label}><Icon size={19} strokeWidth={1.5} />{label}</span>; })}</div></section>;
}
