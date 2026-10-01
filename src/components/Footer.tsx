import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getStorefront } from '@/data/storefront';
import { getFooter } from '@/data/footer';
import { getAppDownload, androidDirectDownload } from '@/data/cta';
import { localePath, type Locale } from '@/data/localized';
import { getUi } from '@/data/ui';

export default function Footer({ locale }: { locale: Locale }) {
  const copy = getStorefront(locale);
  const footer = getFooter(locale);
  const ui = getUi(locale);
  const links = footer.quickLinks.filter(link => ['/web-admin','/privacy-policy','/hapus-akun'].some(path => link.url === localePath(locale,path)));
  return <footer id="kreativita" className="shop-footer"><div className="shop-container"><div className="shop-footer-top"><div><Link href={localePath(locale)}><Image src="/images/logo.png" width={110} height={59} style={{height:'auto'}} alt="Loka Kasir"/></Link><p>{copy.footer}</p></div><div className="shop-footer-links">{links.map(link => <Link key={link.url} href={link.url}>{link.text}</Link>)}</div><div className="shop-footer-links"><a href={getAppDownload(locale).url} target="_blank" rel="noopener noreferrer">Android<ArrowUpRight size={13}/></a><Link href={localePath(locale,'/download/windows')}>Windows<ArrowUpRight size={13}/></Link>{androidDirectDownload && <Link href={localePath(locale,'/download/android')}>Android APK<ArrowUpRight size={13}/></Link>}</div><div className="shop-footer-links"><a href={`mailto:${footer.email}`}>{footer.email}</a><a href={footer.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram<ArrowUpRight size={13}/></a><a href={`https://maps.google.com/?q=${encodeURIComponent(footer.address)}`} target="_blank" rel="noopener noreferrer">Padang, Indonesia<ArrowUpRight size={13}/></a></div></div><div className="shop-footer-bottom"><span>© {new Date().getFullYear()} Loka Kasir</span><a href="https://www.kreativitasinergi.com" target="_blank" rel="noopener noreferrer" title={ui.parentServiceAlt}>Kreativita Sinergi ↗</a><a href="https://odhiahmad.github.io/" target="_blank" rel="noopener noreferrer">Odhi Ahmad Hidayat ↗</a></div></div></footer>;
}
