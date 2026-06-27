"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface Props {
  /** Teks tombol pemicu. */
  label?: string;
  /** Override kelas tombol pemicu (mis. gaya ghost di Hero vs solid di section). */
  className?: string;
}

/**
 * Tombol "Lihat Demo" + modal pemutar video rekaman aplikasi.
 * Video portrait (rekaman HP) dimuat hanya saat modal dibuka.
 */
export default function DemoVideo({ label = "Lihat Demo", className }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("demo_view");
        }}
        className={
          className ??
          "inline-flex items-center gap-2 px-5 h-12 rounded-full font-semibold text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
        }
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <Play size={12} className="ml-0.5 fill-current" aria-hidden="true" />
        </span>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Demo aplikasi Loka Kasir"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup demo"
              className="absolute -right-2 -top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <video
              src="/videos/demo.mp4"
              poster="/videos/demo-poster.jpg"
              controls
              autoPlay
              playsInline
              className="max-h-[85vh] w-auto rounded-2xl bg-black shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
