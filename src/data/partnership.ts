// Data untuk section "Request Fitur & Kerjasama".
// Loka Kasir dikembangkan mengikuti kebutuhan nyata pengguna — siapa pun boleh
// mengusulkan fitur, dan bisnis apa pun (minimarket, supermarket, kafe, dll.)
// bisa mengajak kerjasama.

import { pick, type Locale } from "./localized";

export interface IPartnerType {
  icon: string;
  title: string;
  description: string;
}

type Partnership = {
  title: string;
  description: string;
  featureRequest: {
    heading: string;
    message: string;
    points: string[];
    ctaLabel: string;
    whatsappMessage: string;
  };
  partnership: {
    heading: string;
    message: string;
    ctaLabel: string;
    whatsappMessage: string;
  };
};

const partnershipByLocale: Record<Locale, Partnership> = {
  id: {
    title: "Request Fitur & Kerjasama",
    description:
      "Loka Kasir dibangun bersama penggunanya. Butuh fitur yang belum ada, atau ingin mengajak kami kerjasama? Siapa pun boleh mengajukan — dari warung satu meja sampai jaringan supermarket.",
    featureRequest: {
      heading: "Siapa Saja Bisa Request Fitur",
      message:
        "Tidak perlu jadi pelanggan berbayar. Kalau ada alur kerja di bisnis Anda yang belum terakomodasi — laporan tertentu, integrasi perangkat, format struk, atau apa pun — kirimkan saja. Setiap usulan kami tinjau, dan yang paling banyak dibutuhkan kami kerjakan lebih dulu, lalu dirilis sebagai update gratis untuk semua pengguna.",
      points: [
        "Gratis diajukan — pengguna baru, pengguna aktif, maupun yang belum pakai sama sekali",
        "Usulan ditinjau tim produk; kami kabari kalau masuk antrean pengembangan",
        "Fitur yang dirilis langsung tersedia lewat update aplikasi, tanpa biaya tambahan",
        "Butuh penyesuaian khusus untuk bisnis Anda? Bisa kami diskusikan terpisah",
      ],
      ctaLabel: "Ajukan Request Fitur",
      whatsappMessage:
        "Halo tim Loka Kasir, saya ingin mengajukan request fitur.\n\nNama bisnis: \nJenis bisnis: \nFitur yang dibutuhkan: \nKenapa dibutuhkan: ",
    },
    partnership: {
      heading: "Terbuka untuk Kerjasama",
      message:
        "Kami terbuka bekerja sama dengan berbagai skala dan jenis bisnis — mulai dari penyesuaian sistem sesuai alur operasional Anda, penerapan multi-outlet, sampai kemitraan reseller dan mitra pemasangan di daerah.",
      ctaLabel: "Ajak Kerjasama",
      whatsappMessage:
        "Halo tim Loka Kasir, saya tertarik mengajak kerjasama.\n\nNama bisnis: \nJenis bisnis: \nJumlah outlet: \nKota: \nBentuk kerjasama yang diinginkan: ",
    },
  },
  en: {
    title: "Request a Feature, or Work With Us",
    description:
      "Loka Kasir is built alongside the people using it. Missing something you need, or want to partner with us? Anyone can ask — from a single-table food stall to a supermarket chain.",
    featureRequest: {
      heading: "Anyone Can Request a Feature",
      message:
        "You don't have to be a paying customer. If something about how your business runs isn't covered — a report you need, a device you want connected, a receipt format, anything — send it over. We read every request, build the ones the most people need first, and ship them as a free update to everybody.",
      points: [
        "Free to ask — whether you're new, active, or haven't signed up at all",
        "Every request is reviewed by the product team; we'll tell you if it enters the queue",
        "Whatever ships arrives as an app update, at no extra cost",
        "Need something built specifically for your business? Let's talk about that separately",
      ],
      ctaLabel: "Send a Feature Request",
      whatsappMessage:
        "Hello Loka Kasir team, I'd like to request a feature.\n\nBusiness name: \nType of business: \nFeature needed: \nWhy it's needed: ",
    },
    partnership: {
      heading: "Open to Partnerships",
      message:
        "We work with businesses of every size — fitting the system to how you already operate, rolling it out across multiple outlets, and reseller or local installation partnerships.",
      ctaLabel: "Talk to Us",
      whatsappMessage:
        "Hello Loka Kasir team, I'm interested in a partnership.\n\nBusiness name: \nType of business: \nNumber of outlets: \nCity: \nWhat kind of partnership: ",
    },
  },
  ms: {
    title: "Minta Ciri Baharu, atau Berkerjasama",
    description:
      "Loka Kasir dibina bersama penggunanya. Ada ciri yang anda perlukan tetapi belum ada, atau ingin berkerjasama? Sesiapa sahaja boleh mengajukan — daripada gerai satu meja hingga rangkaian pasar raya.",
    featureRequest: {
      heading: "Sesiapa Sahaja Boleh Minta Ciri Baharu",
      message:
        "Anda tidak perlu menjadi pelanggan berbayar. Jika ada cara kerja perniagaan anda yang belum disokong — laporan tertentu, peranti yang mahu disambung, format resit, apa sahaja — hantarkan kepada kami. Setiap permintaan dibaca, yang paling ramai perlukan dibina dahulu, dan dikeluarkan sebagai kemas kini percuma untuk semua.",
      points: [
        "Percuma diajukan — pengguna baharu, pengguna aktif, mahupun yang belum mendaftar",
        "Setiap permintaan disemak pasukan produk; kami maklumkan jika ia masuk barisan pembangunan",
        "Apa yang dikeluarkan sampai melalui kemas kini aplikasi, tanpa kos tambahan",
        "Perlukan sesuatu khusus untuk perniagaan anda? Itu boleh kita bincang berasingan",
      ],
      ctaLabel: "Hantar Permintaan Ciri",
      whatsappMessage:
        "Hai pasukan Loka Kasir, saya ingin meminta satu ciri baharu.\n\nNama perniagaan: \nJenis perniagaan: \nCiri yang diperlukan: \nKenapa ia diperlukan: ",
    },
    partnership: {
      heading: "Terbuka untuk Kerjasama",
      message:
        "Kami bekerja dengan perniagaan pelbagai saiz — menyesuaikan sistem dengan cara anda beroperasi, melaksanakannya di banyak cawangan, serta kerjasama penjual semula dan rakan pemasangan tempatan.",
      ctaLabel: "Hubungi Kami",
      whatsappMessage:
        "Hai pasukan Loka Kasir, saya berminat untuk berkerjasama.\n\nNama perniagaan: \nJenis perniagaan: \nBilangan cawangan: \nBandar: \nBentuk kerjasama: ",
    },
  },
  ja: {
    title: "機能のご要望・業務提携について",
    description:
      "Loka Kasir は、使ってくださる方々と一緒に育ててきました。必要な機能が足りない、あるいは一緒に取り組みたい——どなたでもご相談いただけます。一人で営むお店から、チェーン展開の企業まで。",
    featureRequest: {
      heading: "ご要望は、どなたからでも",
      message:
        "有料のお客様である必要はありません。必要な帳票、つなぎたい機器、レシートの書式など、いまのお店のやり方に足りないものがあればお送りください。すべて目を通したうえで、必要としている方が多いものから開発し、全ユーザーへの無料アップデートとして提供します。",
      points: [
        "ご要望は無料です。ご利用中の方も、まだ使っていない方も同じです",
        "いただいた内容は製品チームが確認し、開発予定に入った場合はご連絡します",
        "実装された機能はアプリの更新として届きます。追加費用はいただきません",
        "お店専用の作り込みが必要な場合は、別途ご相談ください",
      ],
      ctaLabel: "機能を要望する",
      whatsappMessage:
        "Loka Kasir ご担当者さま。機能のご要望があります。\n\n店舗名: \n業種: \n必要な機能: \n必要な理由: ",
    },
    partnership: {
      heading: "業務提携をお考えの方へ",
      message:
        "規模を問わずご一緒しています。既存の運用に合わせた調整、多店舗への展開、販売代理や地域での導入支援まで、形は柔軟に相談できます。",
      ctaLabel: "相談する",
      whatsappMessage:
        "Loka Kasir ご担当者さま。業務提携について相談したいことがあります。\n\n会社・店舗名: \n業種: \n店舗数: \n地域: \nご希望の提携内容: ",
    },
  },
};

export const getPartnership = (locale: Locale) => ({
  ...pick(partnershipByLocale, locale),
  // Kanal kontak untuk kedua jalur di atas.
  contact: {
    whatsapp: "6283878960539",
    instagram: "lokakasir.id",
    email: "help@lokakasir.id",
  },
});

/** @deprecated Pakai [getPartnership]. */
export const partnershipDetails = getPartnership('id');

const partnerTypesByLocale: Record<Locale, IPartnerType[]> = {
  id: [
    { icon: "🏪", title: "Minimarket & Supermarket", description: "Barcode, stok multi-rak, banyak kasir dalam satu outlet, dan laporan per cabang." },
    { icon: "☕", title: "Kafe & Restoran", description: "Manajemen meja, KDS dapur, resep/HPP, dan alur dine-in, take away, maupun delivery." },
    { icon: "🛍️", title: "Retail & Grosir", description: "Variasi produk, harga bertingkat, supplier, dan Purchase Order untuk pembelian rutin." },
    { icon: "🤝", title: "Reseller & Mitra Daerah", description: "Ingin memasarkan dan mendampingi pemasangan Loka Kasir di kota Anda? Mari bicara." },
  ],
  en: [
    { icon: "🏪", title: "Minimarkets & Supermarkets", description: "Barcodes, stock across multiple shelves, several tills in one outlet, and per-branch reporting." },
    { icon: "☕", title: "Cafés & Restaurants", description: "Table management, a kitchen display, recipes and food cost, plus dine-in, takeaway, and delivery flows." },
    { icon: "🛍️", title: "Retail & Wholesale", description: "Product variants, tiered pricing, suppliers, and purchase orders for regular restocking." },
    { icon: "🤝", title: "Resellers & Local Partners", description: "Want to sell and support Loka Kasir in your city? Let's talk." },
  ],
  ms: [
    { icon: "🏪", title: "Pasar Mini & Pasar Raya", description: "Kod bar, stok merentas banyak rak, beberapa kaunter dalam satu cawangan, dan laporan setiap cawangan." },
    { icon: "☕", title: "Kafe & Restoran", description: "Pengurusan meja, paparan dapur, resipi dan kos makanan, serta aliran makan di sini, bungkus, dan penghantaran." },
    { icon: "🛍️", title: "Runcit & Borong", description: "Varian produk, harga berperingkat, pembekal, dan pesanan belian untuk stok berulang." },
    { icon: "🤝", title: "Penjual Semula & Rakan Tempatan", description: "Mahu memasarkan dan menyokong Loka Kasir di bandar anda? Mari berbincang." },
  ],
  ja: [
    { icon: "🏪", title: "ミニマート・スーパー", description: "バーコード、複数棚の在庫、1店舗に複数レジ、店舗別のレポートに対応します。" },
    { icon: "☕", title: "カフェ・飲食店", description: "テーブル管理、キッチンディスプレイ、レシピと原価、店内・お持ち帰り・デリバリーの各動線。" },
    { icon: "🛍️", title: "小売・卸", description: "商品バリエーション、段階価格、仕入先、定期発注のための発注書に対応します。" },
    { icon: "🤝", title: "販売代理・地域パートナー", description: "お住まいの地域で Loka Kasir を販売・サポートしませんか。ぜひご相談ください。" },
  ],
};

export const getPartnerTypes = (locale: Locale) => pick(partnerTypesByLocale, locale);

/** @deprecated Pakai [getPartnerTypes]. */
export const partnerTypes: IPartnerType[] = partnerTypesByLocale.id;
