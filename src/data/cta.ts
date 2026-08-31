import { pick, type Locale } from "./localized";

const ctaByLocale: Record<Locale, { heading: string; subheading: string }> = {
  id: {
    heading: "Gratis 30 Hari Pertama — Tanpa Risiko",
    subheading:
      "Daftar gratis langsung dari browser ini, atau dari aplikasinya — akunnya sama. Pakai semua fitur Pro selama 30 hari pertama tanpa kartu kredit dan tanpa komitmen. Setelah itu, lanjutkan Pro Rp 59.000/bulan.",
  },
  en: {
    heading: "Your First 30 Days Are Free",
    subheading:
      "Create your account right here in the browser, or from inside the app — it's the same account either way. Every Pro feature is open for the first 30 days. No card, no contract, and nothing to cancel if you walk away.",
  },
  ms: {
    heading: "30 Hari Pertama Percuma",
    subheading:
      "Daftar terus dari pelayar ini, atau dari dalam aplikasi — akaunnya sama. Semua ciri Pro terbuka untuk 30 hari pertama. Tanpa kad kredit, tanpa kontrak, dan tiada apa-apa yang perlu dibatalkan jika anda berhenti.",
  },
  ja: {
    heading: "最初の30日間は無料です",
    subheading:
      "このブラウザからでも、アプリからでも登録できます（アカウントは同じです）。30日間はすべてのPro機能をお使いいただけます。クレジットカードの登録も、契約期間の縛りもありません。",
  },
};

export const getCta = (locale: Locale) => ({
  ...pick(ctaByLocale, locale),
  dashboardUrl: "https://app.lokakasir.id",
});

/** @deprecated Pakai [getCta]. */
export const ctaDetails = { ...ctaByLocale.id, dashboardUrl: "https://app.lokakasir.id" };

// Pendaftaran akun Owner. Sejak Web Admin punya halaman /register sendiri,
// mendaftar TIDAK lagi harus lewat aplikasi — pemilik yang menemukan situs ini
// dari laptop bisa langsung membuat akun tanpa menyentuh HP.
//
// Semua ajakan "Daftar" di situs ini harus memakai URL ini, bukan link toko
// aplikasi seperti sebelumnya.
const signUpByLocale: Record<Locale, { label: string; note: string }> = {
  id: {
    label: "Daftar Gratis",
    note: "Gratis 30 hari pertama · Tanpa kartu kredit · Bisa daftar dari browser atau aplikasi",
  },
  en: {
    label: "Start Free",
    note: "30 days free · No credit card · Sign up from your browser or the app",
  },
  ms: {
    label: "Mula Percuma",
    note: "30 hari percuma · Tanpa kad kredit · Daftar dari pelayar atau aplikasi",
  },
  ja: {
    label: "無料ではじめる",
    note: "30日間無料 · カード登録不要 · ブラウザからでもアプリからでも登録できます",
  },
};

export const getSignUp = (locale: Locale) => ({
  url: "https://app.lokakasir.id/register",
  ...pick(signUpByLocale, locale),
});

/** @deprecated Pakai [getSignUp]. */
export const signUpDetails = {
  url: "https://app.lokakasir.id/register",
  ...signUpByLocale.id,
};

const supportByLocale: Record<Locale, { heading: string; message: string; whatsappMessage: string }> = {
  id: {
    heading: "Ada kendala atau masukan?",
    message:
      "Jangan sungkan menghubungi admin kami. Setiap pertanyaan, kendala, maupun saran perbaikan sangat kami hargai — Loka Kasir terus kami kembangkan bersama Anda.",
    whatsappMessage:
      "Halo Admin Loka Kasir, saya ingin bertanya/menyampaikan masukan terkait aplikasi.",
  },
  en: {
    heading: "Stuck on something, or have an idea?",
    message:
      "Write to us — a real person reads every message. Questions, bugs, and feature requests all land in the same place, and a good number of the things in Loka Kasir today started as a message from a shop owner.",
    whatsappMessage:
      "Hello Loka Kasir team, I have a question / some feedback about the app.",
  },
  ms: {
    heading: "Ada masalah atau cadangan?",
    message:
      "Hubungi kami — setiap mesej dibaca oleh orang sebenar. Soalan, pepijat, dan cadangan ciri baharu semuanya sampai ke tempat yang sama, dan banyak ciri dalam Loka Kasir hari ini bermula daripada mesej seorang peniaga.",
    whatsappMessage:
      "Hai pasukan Loka Kasir, saya ada soalan / cadangan tentang aplikasi ini.",
  },
  ja: {
    heading: "お困りごとや、ご要望はありませんか",
    message:
      "お気軽にご連絡ください。いただいたメッセージにはすべて担当者が目を通します。ご質問も不具合のご報告も、機能のご要望も同じ窓口です。今ある機能の多くは、実際に店舗を営むお客様からのひと言がきっかけで生まれました。",
    whatsappMessage:
      "Loka Kasir サポートご担当者さま。アプリについて質問／ご要望があります。",
  },
};

export const getSupport = (locale: Locale) => ({
  email: "help@lokakasir.id",
  // Nomor WhatsApp admin (format internasional tanpa "+").
  whatsapp: "6283878960539",
  // Username Instagram admin (untuk deep-link DM via ig.me/m/).
  instagram: "lokakasir.id",
  ...pick(supportByLocale, locale),
});

/** @deprecated Pakai [getSupport]. */
export const supportDetails = {
  email: "help@lokakasir.id",
  whatsapp: "6283878960539",
  instagram: "lokakasir.id",
  ...supportByLocale.id,
};

// Link unduh aplikasi. Aplikasi sudah rilis di Google Play Store — pengguna
// memasang langsung dari Play Store, tidak perlu lagi unduh APK manual.
const appDownloadByLocale: Record<Locale, { label: string; note: string }> = {
  id: {
    label: "Download di Google Play",
    note: "Android & Windows · Gratis 30 hari pertama · Login dengan akun yang sama",
  },
  en: {
    label: "Get it on Google Play",
    note: "Android & Windows · 30 days free · Same account on every device",
  },
  ms: {
    label: "Dapatkan di Google Play",
    note: "Android & Windows · 30 hari percuma · Akaun sama pada semua peranti",
  },
  ja: {
    label: "Google Play で入手",
    note: "Android・Windows対応 · 30日間無料 · どの端末でも同じアカウント",
  },
};

export const getAppDownload = (locale: Locale) => ({
  url: "https://play.google.com/store/apps/details?id=id.lokakasir.app",
  ...pick(appDownloadByLocale, locale),
});

/** @deprecated Pakai [getAppDownload]. */
export const appDownloadDetails = {
  url: "https://play.google.com/store/apps/details?id=id.lokakasir.app",
  ...appDownloadByLocale.id,
};

// Versi desktop Loka Kasir untuk PC/laptop Windows, dirilis lewat Microsoft
// Store sehingga pemasangan dan pembaruannya ditangani Store (tanpa installer
// manual). Dipakai berdampingan dengan appDownloadDetails (Android).
const windowsByLocale: Record<Locale, { label: string; shortLabel: string; note: string }> = {
  id: {
    label: "Download di Microsoft Store",
    shortLabel: "Pakai PC/laptop Windows? Download di Microsoft Store",
    note: "Windows 10/11 · Unduhan ±30 MB · Dipasang otomatis lewat Microsoft Store",
  },
  en: {
    label: "Get it on Microsoft Store",
    shortLabel: "On a Windows PC or laptop? Get it on Microsoft Store",
    note: "Windows 10/11 · ~30 MB download · Installs and updates through the Store",
  },
  ms: {
    label: "Dapatkan di Microsoft Store",
    shortLabel: "Guna PC atau komputer riba Windows? Dapatkan di Microsoft Store",
    note: "Windows 10/11 · Muat turun ±30 MB · Dipasang dan dikemas kini melalui Store",
  },
  ja: {
    label: "Microsoft Store で入手",
    shortLabel: "WindowsのPC・ノートPCをお使いですか？Microsoft Store で入手できます",
    note: "Windows 10/11 対応 · 約30MB · インストールも更新も Microsoft Store 経由",
  },
};

export const getWindowsDownload = (locale: Locale) => ({
  url: "https://apps.microsoft.com/detail/9mxbj5l6rdp8",
  // Perintah winget — alternatif tanpa membuka Store, berguna untuk pemasangan
  // massal di banyak PC toko. Store ID sama dengan yang ada di `url`.
  // `--source msstore` + `--id` dipakai eksplisit: tanpa itu winget
  // memperlakukan argumen sebagai kata kunci pencarian dan bisa tidak menemukan
  // paketnya. Perlu dicoba sekali di mesin Windows sebelum dipromosikan luas.
  wingetCommand: "winget install --id 9MXBJ5L6RDP8 --source msstore",
  ...pick(windowsByLocale, locale),
});

/** @deprecated Pakai [getWindowsDownload]. */
export const windowsDownloadDetails = {
  url: "https://apps.microsoft.com/detail/9mxbj5l6rdp8",
  wingetCommand: "winget install --id 9MXBJ5L6RDP8 --source msstore",
  ...windowsByLocale.id,
};

// Unduhan file langsung (di luar Microsoft Store) untuk PC yang Store-nya
// diblokir/dimatikan admin. Biarkan `null` selama filenya belum di-host —
// halaman /download/windows otomatis menyembunyikan bagian ini saat null.
//
// Saat sudah siap, isi seperti:
//   { url: "https://dl.lokakasir.id/windows/LokaKasir-Setup-1.5.0.exe",
//     fileLabel: "Installer (.exe)", size: "58 MB", version: "1.5.0" }
export const windowsDirectDownload: {
  url: string;
  fileLabel: string;
  size: string;
  version: string;
} | null = {
  url: "https://github.com/Kreativita-Sinergi/loka-landing-web/releases/download/windows-v1.18.2/LokaKasir-Setup-1.18.2-x64.exe",
  fileLabel: "Installer Windows (.exe)",
  size: "17.4 MB",
  version: "1.18.2",
};

// Detail untuk menghubungi tim Loka Kasir (bantuan pemasangan, pertanyaan, dll).
// Bukan lagi jalur utama untuk mendapatkan aplikasi — pakai appDownloadDetails.
const helpMessageByLocale: Record<Locale, { app: string; register: string }> = {
  id: {
    app: "Halo tim Loka Kasir, saya butuh bantuan terkait aplikasi Loka Kasir.",
    register: "Halo tim Loka Kasir, saya butuh bantuan untuk pendaftaran akun / pemasangan aplikasi.",
  },
  en: {
    app: "Hello Loka Kasir team, I need help with the app.",
    register: "Hello Loka Kasir team, I need help signing up / installing the app.",
  },
  ms: {
    app: "Hai pasukan Loka Kasir, saya perlukan bantuan berkaitan aplikasi ini.",
    register: "Hai pasukan Loka Kasir, saya perlukan bantuan untuk mendaftar / memasang aplikasi.",
  },
  ja: {
    app: "Loka Kasir サポートご担当者さま。アプリについて助けが必要です。",
    register: "Loka Kasir サポートご担当者さま。アカウント登録／アプリの導入について助けが必要です。",
  },
};

export const getAppRequest = (locale: Locale) => ({
  whatsapp: "6283878960539",
  instagram: "lokakasir.id",
  whatsappMessage: pick(helpMessageByLocale, locale).app,
});

// WhatsApp bantuan bila pengguna tersendat saat mendaftar atau memasang
// aplikasi. Bukan jalur pendaftaran — daftar sendiri lewat signUpDetails.
export const getRegisterHelp = (locale: Locale) => ({
  whatsapp: "6283878960539",
  whatsappMessage: pick(helpMessageByLocale, locale).register,
});

/** @deprecated Pakai [getAppRequest]. */
export const appRequestDetails = {
  whatsapp: "6283878960539",
  instagram: "lokakasir.id",
  whatsappMessage: helpMessageByLocale.id.app,
};

/** @deprecated Pakai [getRegisterHelp]. */
export const registerDetails = {
  whatsapp: "6283878960539",
  whatsappMessage: helpMessageByLocale.id.register,
};
