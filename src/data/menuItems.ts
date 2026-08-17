import { IMenuItem } from "@/types";
import { pick, type Locale } from "./localized";

/**
 * Navigasi utama.
 *
 * Anchor (`#tutorial`, `#features`, …) sengaja TIDAK diterjemahkan: ia id
 * elemen di halaman, bukan teks yang dibaca siapa pun, dan menerjemahkannya
 * berarti setiap tautan dalam harus tahu sedang di bahasa apa. Yang berubah
 * hanya labelnya.
 */
const menuByLocale: Record<Locale, IMenuItem[]> = {
  id: [
    { text: "Tutorial", url: "#tutorial" },
    { text: "Fitur", url: "#features" },
    { text: "Web Admin", url: "#web-admin" },
    { text: "Cara Mulai", url: "#cara-mulai" },
    { text: "Setup Onsite", url: "#layanan-onsite" },
    { text: "Kerjasama", url: "#kerjasama" },
    { text: "Harga", url: "#pricing" },
    { text: "FAQ", url: "#faq" },
  ],
  en: [
    { text: "Videos", url: "#tutorial" },
    { text: "Features", url: "#features" },
    { text: "Web Admin", url: "#web-admin" },
    { text: "Getting Started", url: "#cara-mulai" },
    { text: "Partners", url: "#kerjasama" },
    { text: "Pricing", url: "#pricing" },
    { text: "FAQ", url: "#faq" },
  ],
  ms: [
    { text: "Video", url: "#tutorial" },
    { text: "Ciri", url: "#features" },
    { text: "Web Admin", url: "#web-admin" },
    { text: "Cara Mula", url: "#cara-mulai" },
    { text: "Kerjasama", url: "#kerjasama" },
    { text: "Harga", url: "#pricing" },
    { text: "Soal Lazim", url: "#faq" },
  ],
  ja: [
    { text: "動画", url: "#tutorial" },
    { text: "機能", url: "#features" },
    { text: "管理画面", url: "#web-admin" },
    { text: "はじめ方", url: "#cara-mulai" },
    { text: "提携", url: "#kerjasama" },
    { text: "料金", url: "#pricing" },
    { text: "よくある質問", url: "#faq" },
  ],
};

export const getMenuItems = (locale: Locale) => pick(menuByLocale, locale);

/** @deprecated Pakai [getMenuItems] — dipertahankan agar impor lama tidak putus. */
export const menuItems: IMenuItem[] = menuByLocale.id;
