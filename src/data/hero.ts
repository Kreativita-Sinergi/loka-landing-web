import { pick, type Locale } from "./localized";

type Hero = {
  /** Headline dipecah agar bagian penekanan ("highlight") bisa diberi warna aksen. */
  headingLead: string;
  headingHighlight: string;
  subheading: string;
  centerImageSrc: string;
};

// Copy follows the daily work at the counter in each market.
const heroByLocale: Record<Locale, Hero> = {
  id: {
    headingLead: "Toko ramai.",
    headingHighlight: "Kasir tetap rapi.",
    subheading:
      "Catat pesanan, terima pembayaran, dan cetak struk dari HP atau tablet. Stok ikut tercatat, laporan siap dilihat. Buat warung, kafe, resto, dan toko Anda.",
    centerImageSrc: "/images/tablet/Screenshot_1776574650.png",
  },
  en: {
    headingLead: "Sell more.",
    headingHighlight: "Guess less.",
    subheading:
      "One app for the whole counter — sales, stock, shifts, staff, and the reports that tell you what actually made money. Runs on the phone or tablet you already own. Free for the first 30 days, every Pro feature open, no card and no contract.",
    centerImageSrc: "/images/tablet/Screenshot_1776574650.png",
  },
  ms: {
    headingLead: "Niaga Laju,",
    headingHighlight: "Untung Jelas",
    subheading:
      "Satu aplikasi untuk seluruh kaunter — jualan, stok, syif, pekerja, dan laporan yang menunjukkan mana yang betul-betul untung. Guna telefon atau tablet yang anda sedia ada. Percuma 30 hari pertama, semua ciri Pro terbuka, tanpa kad kredit.",
    centerImageSrc: "/images/tablet/Screenshot_1776574650.png",
  },
  ja: {
    headingLead: "かんたんなのに、",
    headingHighlight: "ちゃんと残る",
    subheading:
      "お手持ちのスマホやタブレットが、そのままレジになります。会計・在庫・シフト・スタッフ管理、そして「どれが本当に儲かっているか」が分かる売上レポートまで、これひとつ。初回30日間は全機能無料、カード登録も契約期間の縛りもありません。",
    centerImageSrc: "/images/tablet/Screenshot_1776574650.png",
  },
};

export const getHero = (locale: Locale) => pick(heroByLocale, locale);

/** @deprecated Pakai [getHero]. */
export const heroDetails = heroByLocale.id;
