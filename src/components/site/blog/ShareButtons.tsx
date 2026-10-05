'use client';

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const btn = 'inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-[#cdd2dc] hover:bg-soft';

export default function ShareButtons({ url, title, copy }: { url: string; title: string; copy: { share: string; shareWa: string; copyLink: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard bisa ditolak browser; tidak ada yang perlu dilakukan.
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm text-body">{copy.share}</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label={copy.shareWa} className={btn}>
        <FaWhatsapp size={16} aria-hidden />
      </a>
      <button type="button" onClick={copyLink} aria-label={copied ? copy.copied : copy.copyLink} title={copied ? copy.copied : copy.copyLink} className={btn}>
        {copied ? <Check size={16} className="text-ok" aria-hidden /> : <LinkIcon size={16} aria-hidden />}
      </button>
      <span role="status" className="text-[13px] text-ok">{copied ? copy.copied : ''}</span>
    </div>
  );
}
