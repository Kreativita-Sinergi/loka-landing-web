'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { FaAndroid, FaGooglePlay, FaWindows } from 'react-icons/fa';

import { siteLinks } from '@/data/site/links';
import type { Locale } from '@/data/localized';
import { trackDownloadClick, trackSignUpClick } from '@/utils/analytics';
import { setScrollLocked } from '@/lib/smoothScroll';
import { ButtonLink } from './ui';

export default function SiteHeader({ locale }: { locale: Locale }) {
  const links = siteLinks(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dlOpen, setDlOpen] = useState(false);
  const dlRef = useRef<HTMLLIElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  // Tinggi banner promo: header menempel dengan `top` negatif sebesar ini, jadi
  // banner ikut tergulir pergi dan hanya bar navigasi yang tetap di atas.
  const [bannerH, setBannerH] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(96);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', y => setScrolled(y > bannerH + 8));
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBannerH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Jeda kecil sebelum menutup, supaya dropdown tidak hilang saat kursor melewati celah.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nav = [
    { label: 'Fitur', href: links.fitur },
    { label: 'Jenis Usaha', href: links.jenisUsaha },
    { label: 'Harga', href: links.harga },
    { label: 'FAQ', href: links.faq },
  ];
  const downloads = [
    { icon: <FaGooglePlay size={20} />, title: 'Google Play', sub: 'HP & tablet Android', href: links.playStore, platform: 'android' as const },
    { icon: <FaWindows size={20} />, title: 'Windows', sub: 'PC & laptop kasir', href: links.downloadWindows, platform: 'windows' as const },
    { icon: <FaAndroid size={20} />, title: 'File APK', sub: 'Perangkat POS tanpa Play Store', href: links.downloadAndroid, platform: 'android-apk' as const },
  ];

  const isActive = (href: string) => !href.includes('#') && href !== links.home && pathname?.startsWith(href);

  // Tutup menu saat berpindah halaman (disesuaikan saat render, bukan di effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDlOpen(false);
  }
  // Tutup dropdown saat klik di luar atau menekan Escape.
  useEffect(() => {
    if (!dlOpen) return;
    const onClick = (e: MouseEvent) => { if (!dlRef.current?.contains(e.target as Node)) setDlOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDlOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [dlOpen]);
  // Kunci scroll di <html>, bukan <body>: overflow di body menjadikannya
  // kontainer scroll sendiri sehingga header `sticky` ikut hilang dari layar.
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = menuOpen ? 'hidden' : '';
    setScrollLocked(menuOpen);
    return () => { root.style.overflow = ''; setScrollLocked(false); };
  }, [menuOpen]);

  const downloadLink = (d: (typeof downloads)[number], compact = false) => {
    const external = d.href.startsWith('http');
    const inner = (
      <>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-tint text-brand">{d.icon}</span>
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold text-ink">{d.title}</span>
          <span className="text-[13px] text-body">{d.sub}</span>
        </span>
      </>
    );
    const cls = clsx('flex items-center gap-3.5 rounded-[10px] p-3 transition-colors', compact ? 'bg-soft' : 'hover:bg-soft');
    const onClick = () => trackDownloadClick('header', d.platform);
    return external ? (
      <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>{inner}</a>
    ) : (
      <Link key={d.title} href={d.href} className={cls} onClick={onClick}>{inner}</Link>
    );
  };

  return (
    <header ref={headerRef} className="sticky z-40" style={{ top: -bannerH }}>
      <div ref={bannerRef} className="bg-ink px-5 py-2.5 text-center text-xs text-white md:text-[13px]">
        Gratis 30 hari semua fitur Pro, dihitung sejak transaksi pertama.{' '}
        <a href={links.register} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline" onClick={() => trackSignUpClick('announcement')}>
          Daftar sekarang →
        </a>
      </div>

      <div
        className={clsx(
          'border-b transition-[background-color,box-shadow,border-color] duration-500',
          scrolled ? 'border-white/60 bg-white/95 shadow-[0_10px_30px_-14px_rgba(16,24,40,0.22)]' : 'border-line bg-white',
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between px-5 md:h-[76px]">
          <Link href={links.home} aria-label="Loka Kasir, beranda" className="shrink-0">
            <Image src="/images/site/logo.svg" alt="Loka Kasir" width={124} height={37} priority className={clsx('h-[30px] w-auto origin-left transition-transform duration-500 md:h-[37px]', scrolled && 'scale-[0.88]')} />
          </Link>

          <nav aria-label="Menu utama" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[15px] font-medium">
              {nav.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className={clsx('transition-colors hover:text-brand', isActive(item.href) ? 'font-bold text-brand' : 'text-ink')}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li
                ref={dlRef}
                className="relative"
                onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setDlOpen(true); }}
                onMouseLeave={() => { closeTimer.current = setTimeout(() => setDlOpen(false), 150); }}
              >
                <button
                  type="button"
                  aria-expanded={dlOpen}
                  aria-haspopup="true"
                  onClick={() => setDlOpen(v => !v)}
                  className={clsx('flex items-center gap-1 transition-colors hover:text-brand', (dlOpen || pathname?.includes('/download')) && 'text-brand')}
                >
                  Download <ChevronDown size={16} className={clsx('transition-transform', dlOpen && 'rotate-180')} />
                </button>
                {dlOpen && (
                  <div className="absolute top-full right-0 w-[360px] pt-4">
                  <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_16px_40px_rgba(16,24,40,0.14)]">
                    {downloads.map(d => downloadLink(d))}
                    <div className="my-1 h-px bg-line" />
                    <Link href={links.webAdmin} className="flex items-center justify-between px-3 pt-3 pb-1.5 text-sm">
                      <span className="text-body">Web Admin untuk pemilik</span>
                      <span className="font-semibold text-brand">Buka →</span>
                    </Link>
                  </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ButtonLink href={links.login} tone="secondary" size="sm" className="hidden lg:inline-flex">Masuk</ButtonLink>
            <ButtonLink href={links.register} size="sm" onClick={() => trackSignUpClick('header')}>Coba Gratis</ButtonLink>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line lg:hidden"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={menuOpen}
              onClick={() => {
                // Menu dibuka tepat di bawah header, berapa pun posisi banner saat itu.
                setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 96);
                setMenuOpen(v => !v);
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div style={{ top: menuTop }} className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Menu mobile" className="px-5 py-3">
            {nav.map(item => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between border-b border-line py-4 text-lg font-semibold">
                {item.label} <ChevronRight size={18} className="text-mute" />
              </Link>
            ))}
            <button type="button" onClick={() => setDlOpen(v => !v)} aria-expanded={dlOpen} className={clsx('flex w-full items-center justify-between py-4 text-lg font-semibold', dlOpen && 'text-brand')}>
              Download <ChevronDown size={18} className={clsx('transition-transform', dlOpen && 'rotate-180')} />
            </button>
            {dlOpen && <div className="flex flex-col gap-1 pb-3">{downloads.map(d => downloadLink(d, true))}</div>}
            <div className="border-b border-line" />
          </nav>
          <div className="mt-auto flex flex-col gap-2.5 px-5 pb-8">
            <ButtonLink href={links.register} block onClick={() => trackSignUpClick('mobile-menu')}>Coba Gratis 30 Hari</ButtonLink>
            <ButtonLink href={links.login} tone="secondary" block>Masuk</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
