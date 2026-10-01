"use client";
import { useEffect, useState } from 'react';
import { Check, ChevronDown, ArrowUpRight } from 'lucide-react';
import { getStorefront } from '@/data/storefront';
import { getTiers } from '@/data/pricing';
import { getSignUp } from '@/data/cta';
import { getUi } from '@/data/ui';
import { PRICING_COUNTRIES, fetchPrices, formatPrice, guessCountry, type PricingCountry, type SubscriptionPrice } from '@/lib/pricing';
import { trackSignUpClick } from '@/utils/analytics';
import type { Locale } from '@/data/localized';

export default function Pricing({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const ui = getUi(locale);
  const tiers = getTiers(locale);
  const [annual, setAnnual] = useState(false);
  const billing = { id: ['Bulanan', 'Tahunan', '/ tahun', '12 bulan'], en: ['Monthly', 'Yearly', '/ year', '12 months'], ms: ['Bulanan', 'Tahunan', '/ tahun', '12 bulan'], ja: ['月払い', '年払い', '/ 年', '12か月'] }[locale];
  const [country, setCountry] = useState<PricingCountry>(locale === 'ms' ? 'MY' : locale === 'ja' ? 'JP' : 'ID');
  const [result, setResult] = useState<{ country: PricingCountry; prices: SubscriptionPrice[] | null } | null>(null);
  useEffect(() => { if (locale !== 'en') return; const timer = window.setTimeout(() => setCountry(guessCountry()), 0); return () => window.clearTimeout(timer); }, [locale]);
  useEffect(() => { let cancelled = false; fetchPrices(country).then(prices => { if (!cancelled) setResult({ country, prices }); }); return () => { cancelled = true; }; }, [country]);
  const price = (plan: string, fallback: number, zero = false) => { const found = result?.country === country ? result.prices?.find(item => item.plan === plan) : null; return found?.is_local_price ? formatPrice(zero ? 0 : found.display_amount, found.display_currency, country) : formatPrice(fallback, 'IDR', 'ID'); };
  return <div><div className="shop-pricing-controls"><div className="pricing-billing" role="group" aria-label={copy.pricing}>{[false, true].map((value, i) => <button type="button" key={i} aria-pressed={annual === value} className={annual === value ? "active" : ""} onClick={() => setAnnual(value)}>{billing[i]}{value && <span>{billing[3]}</span>}</button>)}</div><div className="shop-pricing-country"><label htmlFor="pricing-country">{ui.pricingCountryLabel}</label><select id="pricing-country" value={country} onChange={event => setCountry(event.target.value as PricingCountry)}>{PRICING_COUNTRIES.map(item => <option key={item.code} value={item.code}>{item.label} ({item.currency})</option>)}</select></div></div><div className="shop-price-grid">{[0,1].map(i => <article className={`shop-price-card ${i === 1 ? 'pro' : ''}`} key={i}><div className="price-card-top"><span>LOKA / {i === 0 ? 'FREE' : 'PRO'}</span><span>0{i+1}</span></div><h3>{i === 0 ? copy.free : 'Pro'}</h3><p>{i === 0 ? copy.freeNote : copy.proNote}</p><div className="shop-price"><strong>{i === 0 ? price('pro',0,true) : annual ? price('pro-yearly',590000) : price('pro',59000)}</strong><span>{i === 1 && annual ? billing[2] : copy.month}</span></div><ul>{(i === 0 ? copy.freeFeatures : copy.proFeatures).map(feature => <li key={feature}><Check size={15}/>{feature}</li>)}</ul><a href={getSignUp(locale).url} target="_blank" rel="noopener noreferrer" onClick={() => trackSignUpClick(`pricing-${i === 0 ? 'free' : 'pro'}`)}>{copy.start}<ArrowUpRight size={17}/></a>{i === 1 && <p className="price-outlet-note">{copy.extraOutlet}</p>}</article>)}</div><details className="shop-price-details"><summary>{copy.details}<ChevronDown size={17}/></summary><div className="price-detail-content"><div><h3>Pro</h3><p>{tiers[1].description}</p><div className="price-duration"><strong>{price('pro-yearly',590000)}</strong><span>{tiers[1].periodAnnual}</span></div><div className="price-duration"><strong>{price('pro-3year',1490000)}</strong><span>{tiers[1].periodThreeYear}</span></div><p>{ui.pricingTaxNote}</p></div><div><h3>{tiers[0].name}</h3><ul>{tiers[0].features.map(feature => <li key={feature}>{feature}</li>)}</ul></div><div className="price-detail-features"><h3>{copy.featureMore} / Pro</h3><ul>{tiers[1].features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></div></details></div>;
}
