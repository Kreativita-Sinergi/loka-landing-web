"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

// Kotak perintah winget dengan tombol salin. Client component karena perlu
// clipboard + state "tersalin"; halaman /download/windows sendiri tetap statis.
const WingetCommand: React.FC<{ command: string }> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard diblokir (mis. konteks non-HTTPS) — perintahnya tetap terlihat
      // dan bisa disalin manual, jadi tidak perlu menampilkan error.
    }
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 px-4 py-3 dark:border-surface-border">
      <code className="flex-1 whitespace-nowrap font-mono text-sm text-gray-100">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Salin perintah winget"
        className="flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
      >
        {copied ? (
          <>
            <Check size={13} aria-hidden="true" /> Tersalin
          </>
        ) : (
          <>
            <Copy size={13} aria-hidden="true" /> Salin
          </>
        )}
      </button>
    </div>
  );
};

export default WingetCommand;
