import { IMenuItem, ISocials } from "@/types";
import { localePath, pick, type Locale } from "./localized";

type Footer = {
  tagline: string;
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  address: string;
  socials: ISocials;
};

/**
 * Alamat, telepon, dan Instagram TIDAK dilokalkan: ketiganya fakta, bukan copy.
 * Kantornya memang di Padang, dan menuliskannya dalam bahasa Jepang tidak
 * memindahkannya ke Osaka.
 *
 * Tautan cepat yang mengarah ke HALAMAN (bukan anchor) harus memakai
 * [localePath] supaya pengunjung berbahasa Jepang tidak terlempar kembali ke
 * versi Indonesia hanya karena menekan "Kebijakan Privasi".
 */
const contact = {
  email: 'help@lokakasir.id',
  telephone: '+62 853-9373-7313',
  address: 'Jl. Air Camar No. 24, RT 5/RW 007, Kel. Parak Gadang Timur, Kec. Padang Timur, Kota Padang, Sumatera Barat, Indonesia',
  socials: {
    instagram: 'https://www.instagram.com/lokakasir.id',
  },
};

const copyByLocale: Record<Locale, { tagline: string; subheading: string; links: [string, string][] }> = {
  id: {
    tagline: "Naik Kelas Tanpa Ribet",
    subheading: "Memberdayakan pelaku UMKM dengan teknologi kasir modern yang efisien, andal, dan terjangkau.",
    links: [
      ["Fitur", "#features"],
      ["Ekosistem", "#ecosystem"],
      ["Web Admin", "/web-admin"],
      ["Cara Mulai", "#cara-mulai"],
      ["Setup Onsite", "#layanan-onsite"],
      ["Harga", "#pricing"],
      ["Testimoni", "#testimonials"],
      ["FAQ", "#faq"],
      ["Kreativita Sinergi", "#kreativita"],
      ["Kebijakan Privasi", "/privacy-policy"],
      ["Hapus Akun", "/hapus-akun"],
    ],
  },
  en: {
    tagline: "Sell more. Guess less.",
    subheading: "Modern point-of-sale built for small shops — quick to learn, dependable through a busy day, and priced so a single counter can afford it.",
    links: [
      ["Features", "#features"],
      ["Ecosystem", "#ecosystem"],
      ["Web Admin", "/web-admin"],
      ["Getting Started", "#cara-mulai"],
      ["Pricing", "#pricing"],
      ["Who It's For", "#testimonials"],
      ["FAQ", "#faq"],
      ["Kreativita Sinergi", "#kreativita"],
      ["Privacy Policy", "/privacy-policy"],
      ["Delete Account", "/hapus-akun"],
    ],
  },
  ms: {
    tagline: "Niaga Laju, Untung Jelas",
    subheading: "Sistem POS moden untuk perniagaan kecil — cepat dipelajari, boleh diharap sepanjang hari sibuk, dan berpatutan untuk satu kaunter sekalipun.",
    links: [
      ["Ciri", "#features"],
      ["Ekosistem", "#ecosystem"],
      ["Web Admin", "/web-admin"],
      ["Cara Mula", "#cara-mulai"],
      ["Harga", "#pricing"],
      ["Untuk Siapa", "#testimonials"],
      ["Soal Lazim", "#faq"],
      ["Kreativita Sinergi", "#kreativita"],
      ["Dasar Privasi", "/privacy-policy"],
      ["Padam Akaun", "/hapus-akun"],
    ],
  },
  ja: {
    tagline: "かんたんなのに、ちゃんと残る",
    subheading: "個人店のためのPOSレジ。すぐに覚えられて、忙しい一日を通して落ちず、一台のレジでも無理なく続けられる価格です。",
    links: [
      ["機能", "#features"],
      ["連携のしくみ", "#ecosystem"],
      ["管理画面", "/web-admin"],
      ["はじめ方", "#cara-mulai"],
      ["料金", "#pricing"],
      ["こんなお店に", "#testimonials"],
      ["よくある質問", "#faq"],
      ["Kreativita Sinergi", "#kreativita"],
      ["プライバシーポリシー", "/privacy-policy"],
      ["アカウント削除", "/hapus-akun"],
    ],
  },
};

export function getFooter(locale: Locale): Footer {
  const copy = pick(copyByLocale, locale);
  return {
    tagline: copy.tagline,
    subheading: copy.subheading,
    quickLinks: copy.links.map(([text, url]) => ({
      text,
      url: url.startsWith('#') ? url : localePath(locale, url),
    })),
    ...contact,
  };
}

/** @deprecated Pakai [getFooter]. */
export const footerDetails: Footer = getFooter('id');
