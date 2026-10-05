import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

import { siteLinks, SUPPORT_EMAIL, WHATSAPP_DISPLAY, INSTAGRAM_HANDLE } from '@/data/site/links';
import type { Locale } from '@/data/localized';
import { Container, WhatsAppIcon } from './ui';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const l = siteLinks(locale);
  const columns: { title: string; items: { label: string; href: string }[] }[] = [
    { title: 'Produk', items: [{ label: 'Fitur', href: l.fitur }, { label: 'Harga', href: l.harga }, { label: 'Panduan Pengguna', href: l.panduan }, { label: 'Web Admin', href: l.webAdmin }] },
    { title: 'Download', items: [{ label: 'Android (Google Play)', href: l.playStore }, { label: 'Windows', href: l.downloadWindows }, { label: 'Android APK', href: l.downloadAndroid }] },
    { title: 'Bantuan', items: [{ label: 'FAQ', href: l.faq }, { label: SUPPORT_EMAIL, href: l.email }, { label: `WA ${WHATSAPP_DISPLAY}`, href: l.whatsapp() }, { label: INSTAGRAM_HANDLE, href: l.instagram }] },
    { title: 'Lainnya', items: [{ label: 'Tentang Kami', href: l.tentang }, { label: 'Blog', href: l.blog }, { label: 'Syarat & Ketentuan', href: l.syarat }, { label: 'Kebijakan Privasi', href: l.privasi }, { label: 'Hapus Akun', href: l.hapusAkun }] },
  ];
  const linkEl = (item: { label: string; href: string }) =>
    /^(https?:|mailto:)/.test(item.href) ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{item.label}</a>
    ) : (
      <Link href={item.href} className="hover:text-white">{item.label}</Link>
    );
  const social = [
    { label: 'Instagram', href: l.instagram, icon: <FaInstagram size={16} /> },
    { label: 'Email', href: l.email, icon: <Mail size={16} /> },
    { label: 'WhatsApp', href: l.whatsapp(), icon: <WhatsAppIcon size={16} /> },
  ];

  return (
    <footer className="bg-night text-[#b4b7bf]">
      <Container className="flex flex-col gap-8 pt-12 pb-8 md:gap-12 md:pt-[72px] md:pb-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex max-w-[320px] flex-col gap-4">
            <Image src="/images/site/logo-white.svg" alt="Loka Kasir" width={124} height={37} className="h-[30px] w-auto self-start md:h-[37px]" />
            <p className="text-sm leading-relaxed md:text-[15px]">
              Teman di meja kasir. Loka Kasir membantu warung, kafe, resto, dan toko mencatat penjualan, mengatur stok, dan menutup kas dengan rapi setiap hari, tetap jalan walau internet sedang putus.
            </p>
            <div className="flex gap-2.5">
              {social.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3a3c44] text-white hover:bg-white/10">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-6">
            {columns.map(col => (
              <div key={col.title} className="flex flex-col gap-3 text-sm md:w-[180px]">
                <p className="font-bold text-white">{col.title}</p>
                <ul className="flex flex-col gap-3">{col.items.map(item => <li key={item.label}>{linkEl(item)}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-[#2a2c33]" />
        <div className="flex justify-between text-[13px] text-mute">
          <span>© {new Date().getFullYear()} Loka Kasir</span>
          <span>Dibuat dengan cinta</span>
        </div>
      </Container>
    </footer>
  );
}
