"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getAppRequest } from "@/data/cta";
import { getUi } from "@/data/ui";
import { trackContactClick } from "@/utils/analytics";
import type { Locale } from "@/data/localized";

const waLinkFor = (locale: Locale) => {
  const details = getAppRequest(locale);
  return `https://wa.me/${details.whatsapp}?text=${encodeURIComponent(
    details.whatsappMessage,
  )}`;
};

/**
 * Tombol WhatsApp mengambang — selalu menempel di pojok kanan-bawah agar
 * pengunjung bisa menghubungi tim Loka Kasir satu-tap dari posisi scroll mana pun.
 * Muncul setelah menggulir; tidak membuka ajakan yang menutupi konten.
 */
export default function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const waLink = waLinkFor(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("whatsapp", "floating")}
        aria-label={getUi(locale).helpAriaLabel}
        title={getUi(locale).helpBubble}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#228453] text-white shadow-md transition-transform hover:scale-105 hover:bg-[#196a41]"
      >
        <FaWhatsapp className="h-6 w-6" />
      </a>
    </div>
  );
}
