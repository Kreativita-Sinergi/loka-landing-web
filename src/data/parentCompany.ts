// Loka Kasir adalah salah satu produk dari Kreativita Sinergi.
// Data perusahaan induk ditampilkan di section "ParentCompany".

import { pick, type Locale } from "./localized";

type ParentCompanyCopy = {
  tagline: string;
  eyebrow: string;
  description: string;
  services: string[];
  points: { title: string; desc: string }[];
};

const copyByLocale: Record<Locale, ParentCompanyCopy> = {
  id: {
    tagline: "Bersinergi Membangun Inovasi Digital",
    eyebrow: "Bagian dari Kreativita Sinergi",
    description:
      "Loka Kasir dikembangkan dan didukung penuh oleh Kreativita Sinergi — partner teknologi yang membantu UMKM hingga perusahaan membangun website, aplikasi mobile, dan solusi IT dengan harga terjangkau dan kualitas profesional.",
    services: [
      "Pengembangan Website & Web App",
      "Aplikasi Mobile (Android & iOS)",
      "Sistem Custom & Integrasi API",
      "UI/UX Design & Branding",
      "Maintenance & Dukungan Teknis",
    ],
    points: [
      { title: "Produk Teruji", desc: "Loka Kasir dipakai pelaku usaha sehari-hari — bukti kami paham kebutuhan bisnis nyata." },
      { title: "Harga Jujur", desc: "Transparan tanpa biaya tersembunyi, ramah untuk UMKM dan startup." },
      { title: "Pendampingan", desc: "Komunikasi jelas dari awal hingga selesai, plus dukungan setelah aplikasi jadi." },
    ],
  },
  en: {
    tagline: "Building Digital Work, Together",
    eyebrow: "Part of Kreativita Sinergi",
    description:
      "Loka Kasir is built and supported by Kreativita Sinergi — a software company that builds websites, mobile apps, and custom systems for businesses ranging from single shops to established companies.",
    services: [
      "Websites & Web Applications",
      "Mobile Apps (Android & iOS)",
      "Custom Systems & API Integration",
      "UI/UX Design & Branding",
      "Maintenance & Technical Support",
    ],
    points: [
      { title: "Proven in the Field", desc: "Loka Kasir is used by real shops every day — the clearest evidence that we build for how businesses actually work." },
      { title: "Honest Pricing", desc: "Quoted up front, with no hidden line items. Priced for small businesses, not just enterprises." },
      { title: "We Stay Involved", desc: "Clear communication from the first conversation to launch — and support after it goes live." },
    ],
  },
  ms: {
    tagline: "Bersama Membina Kerja Digital",
    eyebrow: "Sebahagian daripada Kreativita Sinergi",
    description:
      "Loka Kasir dibina dan disokong sepenuhnya oleh Kreativita Sinergi — syarikat perisian yang membina laman web, aplikasi mudah alih, dan sistem tersuai untuk perniagaan daripada kedai tunggal hingga syarikat mapan.",
    services: [
      "Laman Web & Aplikasi Web",
      "Aplikasi Mudah Alih (Android & iOS)",
      "Sistem Tersuai & Penyepaduan API",
      "Reka Bentuk UI/UX & Penjenamaan",
      "Penyelenggaraan & Sokongan Teknikal",
    ],
    points: [
      { title: "Terbukti di Lapangan", desc: "Loka Kasir digunakan kedai sebenar setiap hari — bukti paling jelas bahawa kami membina mengikut cara perniagaan sebenar berjalan." },
      { title: "Harga Jujur", desc: "Dinyatakan awal, tanpa kos tersembunyi. Berpatutan untuk perniagaan kecil, bukan hanya syarikat besar." },
      { title: "Kami Terus Bersama", desc: "Komunikasi jelas dari perbualan pertama hingga pelancaran — dan sokongan selepas ia beroperasi." },
    ],
  },
  ja: {
    tagline: "デジタルのものづくりを、ご一緒に",
    eyebrow: "Kreativita Sinergi のプロダクトです",
    description:
      "Loka Kasir は Kreativita Sinergi が開発・運用しています。個人商店から企業まで、ウェブサイト・モバイルアプリ・業務システムの開発を手がけているソフトウェア会社です。",
    services: [
      "ウェブサイト・ウェブアプリ開発",
      "モバイルアプリ開発（Android・iOS）",
      "業務システム開発・API連携",
      "UI/UXデザイン・ブランディング",
      "保守・技術サポート",
    ],
    points: [
      { title: "現場で使われている", desc: "Loka Kasir は実際のお店で毎日使われています。机上の設計ではないことの、いちばん確かな証拠です。" },
      { title: "正直な価格", desc: "最初にお見積りを提示し、あとから項目が増えることはありません。小規模な事業者でも無理のない価格です。" },
      { title: "納品して終わりにしない", desc: "最初のご相談から公開まで丁寧にやり取りし、公開後もサポートを続けます。" },
    ],
  },
};

export const getParentCompany = (locale: Locale) => ({
  name: "Kreativita Sinergi",
  website: "https://www.kreativitasinergi.com",
  websiteLabel: "kreativitasinergi.com",
  email: "halo@kreativitasinergi.com",
  whatsapp: "6283878960539", // format internasional tanpa "+" untuk wa.me
  whatsappMessage: pick(
    {
      id: "Halo Kreativita Sinergi, saya ingin konsultasi proyek IT/aplikasi.",
      en: "Hello Kreativita Sinergi, I'd like to discuss a software project.",
      ms: "Hai Kreativita Sinergi, saya ingin berbincang tentang satu projek perisian.",
      ja: "Kreativita Sinergi ご担当者さま。システム／アプリ開発についてご相談したいです。",
    } as Record<Locale, string>,
    locale,
  ),
  ...pick(copyByLocale, locale),
});

/** @deprecated Pakai [getParentCompany]. */
export const parentCompany = getParentCompany('id');
