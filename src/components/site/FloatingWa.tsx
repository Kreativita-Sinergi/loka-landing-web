'use client';

import { trackContactClick } from '@/utils/analytics';
import { WhatsAppIcon } from './ui';

export default function FloatingWa({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => trackContactClick('whatsapp', 'floating')}
      className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] ring-4 ring-whatsapp/15 hover:brightness-95 md:size-[60px]"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
