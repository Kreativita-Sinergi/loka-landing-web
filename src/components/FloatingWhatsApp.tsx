"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";
import { appRequestDetails } from "@/data/cta";
import { trackContactClick } from "@/utils/analytics";

const waLink = `https://wa.me/${appRequestDetails.whatsapp}?text=${encodeURIComponent(
  appRequestDetails.whatsappMessage
)}`;

const DISMISS_KEY = "floating_wa_bubble_dismissed";

/**
 * Tombol WhatsApp mengambang — selalu menempel di pojok kanan-bawah agar
 * pengunjung bisa menghubungi tim Loka Kasir satu-tap dari posisi scroll mana pun.
 * Muncul setelah pengunjung sedikit menggulir, dengan bubble ajakan yang bisa ditutup.
 */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    const t = setTimeout(() => setShowBubble(true), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  const dismissBubble = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShowBubble(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {showBubble && (
        <div className="relative max-w-[230px] rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-xl ring-1 ring-black/5 dark:bg-surface dark:text-gray-200 dark:ring-white/10">
          <button
            onClick={dismissBubble}
            aria-label="Tutup"
            className="absolute -right-2 -top-2 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 dark:bg-surface-border dark:text-gray-300"
          >
            <HiOutlineXMark className="h-3.5 w-3.5" />
          </button>
          <p className="font-semibold text-gray-900 dark:text-white">Mau coba Loka Kasir?</p>
          <p className="mt-0.5 leading-relaxed">
            Chat tim kami untuk minta aplikasinya — gratis, dibalas cepat.
          </p>
        </div>
      )}

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContactClick("whatsapp", "floating")}
        aria-label="Hubungi tim Loka Kasir via WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 hover:bg-[#1ebe57]"
      >
        <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-[#25D366] opacity-20" />
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
