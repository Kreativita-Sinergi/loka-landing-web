'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Kotak perintah (winget) dengan tombol salin, gaya desain 2026. */
export default function CopyCommand({ command, copyLabel = 'Salin', copiedLabel = 'Tersalin' }: { command: string; copyLabel?: string; copiedLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard diblokir: perintahnya tetap terlihat dan bisa disalin manual.
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl bg-night py-2.5 pr-2.5 pl-4">
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] whitespace-nowrap text-[#e6e8ee] md:text-sm">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label="Salin perintah"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
      >
        {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
