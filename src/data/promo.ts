// Masa gratis: 30 hari pertama untuk setiap akun baru — akses penuh ke semua
// fitur Pro. Riwayatnya: 14 hari → 3 bulan (promo Juli 2026) → 30 hari.
//
// PENTING: 30 hari itu dihitung sejak TRANSAKSI PERTAMA, bukan sejak
// pendaftaran — lihat anchorTrialToFirstSale di loka-kasir-service. Jadi
// pemilik yang mendaftar dari browser lalu baru memasang aplikasinya seminggu
// kemudian tidak kehilangan apa pun, dan janji di halaman ini tetap benar.
//
// Ubah durasi di sini bila promo berubah; seluruh halaman mengambil datanya
// dari file ini. Backend: konstanta TrialDays di
// loka-kasir-service/service/registration_service.go harus ikut disesuaikan.

import { pick, type Locale } from "./localized";

type Promo = { heading: string; short: string; duration: string; description: string };

const promoByLocale: Record<Locale, Promo> = {
  id: {
    heading: "Gratis 30 Hari Pertama",
    // Kalimat pendek untuk badge/keterangan di bawah tombol.
    short: "Gratis 30 hari pertama",
    duration: "30 hari",
    description:
      "Setiap akun baru mendapat 30 hari pertama gratis dengan akses penuh ke semua fitur Pro — termasuk multi-outlet sampai 5 cabang, tanpa kartu kredit, tanpa komitmen. Setelah masa itu, lanjutkan dengan paket mulai Rp 39.000/bulan.",
  },
  en: {
    heading: "First 30 Days Free",
    short: "30 days free",
    duration: "30 days",
    description:
      "Every new account gets 30 days with every Pro feature open — including up to 5 outlets — with no credit card and no commitment. The clock starts at your first sale, not at sign-up, so there's no rush to set everything up in one sitting.",
  },
  ms: {
    heading: "30 Hari Pertama Percuma",
    short: "30 hari percuma",
    duration: "30 hari",
    description:
      "Setiap akaun baharu mendapat 30 hari dengan semua ciri Pro terbuka — termasuk sehingga 5 cawangan — tanpa kad kredit dan tanpa komitmen. Kiraannya bermula pada jualan pertama anda, bukan semasa mendaftar, jadi tiada tergesa-gesa untuk menyiapkan semuanya sekali gus.",
  },
  ja: {
    heading: "最初の30日間は無料",
    short: "30日間無料",
    duration: "30日間",
    description:
      "新規アカウントはすべて、30日間すべてのPro機能をご利用いただけます（最大5店舗まで）。カード登録も契約期間の縛りもありません。しかもこの30日は登録日ではなく最初の会計から数えはじめるので、初期設定を一度に終わらせようと急ぐ必要はありません。",
  },
};

export const getPromo = (locale: Locale) => pick(promoByLocale, locale);

/** @deprecated Pakai [getPromo]. */
export const promoDetails: Promo = promoByLocale.id;
