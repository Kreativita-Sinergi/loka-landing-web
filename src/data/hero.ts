import { pick, type Locale } from "./localized";

type Hero = {
  /** Headline dipecah agar bagian penekanan ("highlight") bisa diberi warna gradien. */
  headingLead: string;
  headingHighlight: string;
  subheading: string;
  centerImageSrc: string;
};

/**
 * Headline, ditulis ulang per pasar — bukan diterjemahkan.
 *
 * "Naik Kelas Tanpa Ribet" bekerja di Indonesia karena ia menjawab keberatan
 * yang paling sering diucapkan pemilik warung: bukan "apakah ini bagus", tetapi
 * "apakah saya sanggup memakainya". Kalimat itu diterjemahkan harfiah ke bahasa
 * Jepang menghasilkan sesuatu yang benar secara tata bahasa dan tidak
 * menggerakkan siapa pun.
 *
 * Jadi tiap pasar menjawab keberatannya sendiri:
 *   - ID: takut ribet   → "Naik Kelas Tanpa Ribet"
 *   - EN: takut mahal & terkunci kontrak → "Sell more. Guess less."
 *   - MS: takut susah   → "Niaga Laju, Untung Jelas"
 *   - JA: takut merepotkan pelanggan & staf → 「かんたんなのに、ちゃんと売れる」
 */
const heroByLocale: Record<Locale, Hero> = {
  id: {
    headingLead: "Naik Kelas",
    headingHighlight: "Tanpa Ribet",
    subheading:
      "Jualan lebih cepat, untung lebih jelas. Aplikasi kasir all-in-one untuk warung, kafe, resto, dan toko — kelola transaksi, stok, shift, laporan, dan tim Anda dalam satu tempat. Gratis 30 hari pertama — semua fitur Pro terbuka, tanpa komitmen.",
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
