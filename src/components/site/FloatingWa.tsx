'use client';

import { getAppRequest } from '@/data/cta';
import type { Locale } from '@/data/localized';
import { trackContactClick } from '@/utils/analytics';
import { WhatsAppIcon } from './ui';

/** Tombol WhatsApp bulat di pojok kanan bawah, tampil di semua halaman. */
export default function FloatingWa({ locale }: { locale: Locale }) {
  const req = getAppRequest(locale);
  const href = `https://wa.me/${req.whatsapp}?text=${encodeURIComponent(req.whatsappMessage)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp dengan tim Loka"
      onClick={() => trackContactClick('whatsapp', 'floating')}
      className="wa-float group fixed right-5 bottom-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:scale-110 hover:brightness-95 md:right-8 md:bottom-8 md:h-[60px] md:w-[60px]"
    >
      {/* Cincin denyut lembut supaya tombol bantuan mudah ditemukan. */}
      <span aria-hidden className="wa-pulse absolute inset-0 rounded-full bg-whatsapp" />
      <span className="relative transition-transform duration-500 group-hover:rotate-[-12deg]"><WhatsAppIcon size={30} /></span>
    </a>
  );
}
