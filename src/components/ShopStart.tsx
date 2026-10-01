"use client";
import { ArrowUpRight, UserRoundPlus, PackagePlus, ShoppingBag, MessageCircle } from 'lucide-react';
import { getStorefront } from '@/data/storefront';
import { getSignUp, getRegisterHelp } from '@/data/cta';
import { trackSignUpClick, trackContactClick } from '@/utils/analytics';
import type { Locale } from '@/data/localized';
export default function ShopStart({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const help = getRegisterHelp(locale);
  const icons = [UserRoundPlus, PackagePlus, ShoppingBag];
  return <section id="cara-mulai" className="shop-section shop-start"><div className="shop-start-top"><div><p className="shop-eyebrow">04 / LOKA</p><h2>{copy.gettingStarted}</h2></div><a href={getSignUp(locale).url} target="_blank" rel="noopener noreferrer" className="shop-button" onClick={() => trackSignUpClick('how-to-start')}>{copy.start}<ArrowUpRight size={19} /></a></div><ol className="shop-start-steps">{copy.steps.map((label,i) => {const Icon=icons[i];return <li key={label}><span>0{i+1}</span><Icon size={24} strokeWidth={1.5}/><strong>{label}</strong></li>;})}</ol><div id="layanan-onsite" className="shop-setup"><div><strong>{copy.help}</strong>{copy.onsite && <p>{copy.onsite}</p>}</div><a href={`https://wa.me/${help.whatsapp}?text=${encodeURIComponent(help.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick('whatsapp','setup')}><MessageCircle size={17}/>{copy.helpLink}<ArrowUpRight size={15}/></a></div></section>;
}
