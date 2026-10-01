"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Play, X } from "lucide-react";
import { trackEvent } from "@/utils/analytics";
import type { Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

interface Props {
  /** Teks tombol pemicu. */
  label?: string;
  /** Override kelas tombol pemicu (mis. gaya ghost di Hero vs solid di section). */
  className?: string;
  locale: Locale;
}

/**
 * Tombol "Lihat Demo" + modal pemutar video rekaman aplikasi.
 * Video portrait (rekaman HP) dimuat hanya saat modal dibuka.
 */
export default function DemoVideo({ label, className, locale }: Props) {
  const ui = getUi(locale);
  const [open, setOpen] = useState(false);


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
        {label ?? ui.demoOpenLabel}
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-[70]">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative">
            <DialogTitle className="sr-only">{ui.demoDialogLabel}</DialogTitle>
            <button type="button" onClick={() => setOpen(false)} aria-label={ui.demoCloseLabel} className="absolute -right-2 -top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100"><X size={20} aria-hidden="true" /></button>
            {open && <video src="/videos/demo.mp4" poster="/videos/demo-poster.jpg" controls autoPlay playsInline className="max-h-[85dvh] w-auto rounded-xl bg-black shadow-2xl" />}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
