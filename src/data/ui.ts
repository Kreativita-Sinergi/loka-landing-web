import { pick, type Locale } from "./localized";

/**
 * Teks antarmuka yang menempel di komponen, bukan di konten.
 *
 * Berbeda dari berkas lain di `src/data/`, isinya bukan copy pemasaran
 * melainkan label: "Tautan Cepat", "Login", judul section. Ia dikumpulkan di
 * sini karena tersebar di dua puluhan komponen, dan selama tersebar seperti itu
 * setiap bahasa baru berarti berburu string satu per satu — cara yang sudah
 * terbukti meninggalkan sisa bahasa Indonesia di halaman berbahasa Jepang.
 */
export type UiStrings = {
  // Header
  navSignUp: string;
  navSignUpTitle: string;
  navLogin: string;
  navLoginAdmin: string;
  navDownloadApp: string;
  navAndroidNote: string;
  navWindowsNote: string;
  navWindowsLink: string;
  navSignUpFree: string;
  navSignUpHint: string;
  navToggle: string;
  navLanguage: string;

  // Footer
  footerQuickLinks: string;
  footerContact: string;
  footerAddress: string;

  // Section headings di beranda
  sectionFeatures: string;
  sectionFeaturesDesc: string;
  sectionEcosystem: string;
  sectionEcosystemDesc: string;
  sectionScreenshots: string;
  sectionScreenshotsDesc: string;
  sectionTestimonials: string;
  sectionTestimonialsDesc: string;
  sectionPricing: string;
  sectionPricingDesc: string;

  // Lain-lain
  faqHeading: string;
  ecosystemRegisterApp: string;
  ecosystemDownloadOn: string;
  helpBubble: string;
  parentCompanyPrompt: string;
  freePlanHeading: string;
  freePlanIntro: string;
  freePlanIncludedLabel: string;
  freePlanExcludedLabel: string;
  freePlanTransactions: string;
  freePlanPerMonth: string;
  freePlanIncluded: string[];
  freePlanExcluded: string[];
  freePlanUpgradeHint: string;
  benefitsEyebrow: string;
};

const ui: Record<Locale, UiStrings> = {
  id: {
    navSignUp: "Daftar",
    navSignUpTitle: "Buat akun gratis langsung dari browser",
    navLogin: "Login",
    navLoginAdmin: "Login Admin",
    navDownloadApp: "Download Aplikasi",
    navAndroidNote: "HP & tablet · Google Play",
    navWindowsNote: "PC & laptop · Store atau file",
    navWindowsLink: "Download versi Windows",
    navSignUpFree: "Daftar Gratis",
    navSignUpHint: "Buat akun langsung di browser — aplikasinya dipasang belakangan.",
    navToggle: "Buka menu navigasi",
    navLanguage: "Bahasa",
    footerQuickLinks: "Tautan Cepat",
    footerContact: "Hubungi Kami",
    footerAddress: "Alamat Kami",
    sectionFeatures: "Fitur Unggulan",
    sectionFeaturesDesc: "Semua yang Anda butuhkan untuk mengelola kasir, shift, dan laporan bisnis — dalam satu aplikasi yang ringan dan mudah dipakai.",
    sectionEcosystem: "Satu Sistem untuk Kasir & Pemilik",
    sectionEcosystemDesc: "Aplikasi Kasir dipakai tim di toko, Web Admin dipegang pemilik. Keduanya langsung terhubung, jadi datanya selalu sinkron.",
    sectionScreenshots: "Lihat Langsung Tampilannya",
    sectionScreenshotsDesc: "Antarmuka yang intuitif, cepat, dan nyaman — dari smartphone kasir hingga tablet di meja.",
    sectionTestimonials: "Cocok untuk Bisnis Anda",
    sectionTestimonialsDesc: "Loka Kasir dirancang fleksibel — dari warung kecil hingga bisnis multi-outlet, semua bisa langsung pakai tanpa setup rumit.",
    sectionPricing: "Harga Transparan, Tanpa Kejutan",
    sectionPricingDesc: "Mulai gratis 30 hari pertama dengan akses penuh ke semua fitur Pro. Lanjutkan dengan paket yang paling sesuai — tidak ada biaya tersembunyi, tidak ada biaya per transaksi.",
    faqHeading: "Pertanyaan Umum",
    ecosystemRegisterApp: "Aplikasi Kasir",
    ecosystemDownloadOn: "Download di",
    helpBubble: "Butuh bantuan?",
    parentCompanyPrompt: "Butuh solusi digital lain?",
    freePlanHeading: "Paket Gratis — Selamanya",
    freePlanTransactions: "500 transaksi",
    freePlanPerMonth: " per bulan",
    freePlanIntro: "Cocok untuk usaha yang baru mulai. Tanpa biaya, tanpa masa berlaku — gunakan selama yang Anda mau. Sebelum turun ke paket ini, setiap akun baru lebih dulu menikmati {duration} pertama gratis dengan semua fitur Pro terbuka.",
    freePlanIncludedLabel: "Yang termasuk",
    freePlanExcludedLabel: "Belum termasuk (upgrade ke Lite / Pro)",
    freePlanIncluded: [
      "• Kasir / transaksi penjualan (POS)",
      "• 1 outlet",
      "• Kelola produk & kategori",
      "• Cetak struk & laporan transaksi dasar",
      "• Mode offline (kasir tetap jalan tanpa internet)",
    ],
    freePlanExcluded: [
      "• Database pelanggan, meja & KDS (Lite)",
      "• Karyawan multi-role & diskon/bundle (Lite)",
      "• Multi-outlet & inventori lanjutan (Pro)",
      "• HPP, Smart Pricing & Loyalty (Pro)",
      "• Pesan via QR / Scan-to-Order (Pro)",
    ],
    freePlanUpgradeHint: "Lewat batas 500 transaksi? Tinggal upgrade kapan saja — data Anda tetap aman.",
    benefitsEyebrow: "Fitur",
  },
  en: {
    navSignUp: "Sign up",
    navSignUpTitle: "Create a free account right in your browser",
    navLogin: "Log in",
    navLoginAdmin: "Log in to Web Admin",
    navDownloadApp: "Download the App",
    navAndroidNote: "Phone & tablet · Google Play",
    navWindowsNote: "PC & laptop · Store or file",
    navWindowsLink: "Download the Windows version",
    navSignUpFree: "Start Free",
    navSignUpHint: "Create the account in your browser — install the app whenever you're ready.",
    navToggle: "Open navigation menu",
    navLanguage: "Language",
    footerQuickLinks: "Quick Links",
    footerContact: "Contact Us",
    footerAddress: "Our Address",
    sectionFeatures: "What You Get",
    sectionFeaturesDesc: "Everything the counter needs — sales, shifts, stock, and the reports that explain them — in one app light enough to run on the tablet you already have.",
    sectionEcosystem: "One System, Two Screens",
    sectionEcosystemDesc: "Your team works the register app in the shop; you keep Web Admin. They're the same system, so what happens at the counter shows up in your reports without anyone sending anything.",
    sectionScreenshots: "See It for Yourself",
    sectionScreenshotsDesc: "Quick, uncluttered screens — from a phone at a small counter to a tablet on the table.",
    sectionTestimonials: "Built for Shops Like Yours",
    sectionTestimonialsDesc: "From a single stall to a chain of outlets, the setup bends to how you already work rather than the other way round.",
    sectionPricing: "Clear Pricing, No Surprises",
    sectionPricingDesc: "Start with 30 free days and every Pro feature open, then pick the plan that fits. No hidden fees, and never a cut of your transactions.",
    faqHeading: "Common Questions",
    ecosystemRegisterApp: "Register App",
    ecosystemDownloadOn: "Get it on",
    helpBubble: "Need a hand?",
    parentCompanyPrompt: "Need something else built?",
    freePlanHeading: "Free Plan — Forever",
    freePlanTransactions: "500 transactions",
    freePlanPerMonth: " per month",
    freePlanIntro: "Enough to get a new shop trading. No cost, no expiry, for as long as you want it. Before anyone lands here, every new account first gets {duration} with all the Pro features open.",
    freePlanIncludedLabel: "What's included",
    freePlanExcludedLabel: "Not included (move to Lite or Pro)",
    freePlanIncluded: [
      "• Selling at the register (POS)",
      "• 1 outlet",
      "• Products & categories",
      "• Receipt printing & basic sales reports",
      "• Offline mode (the register keeps working without internet)",
    ],
    freePlanExcluded: [
      "• Customer records, tables & kitchen display (Lite)",
      "• Staff roles & discounts/bundles (Lite)",
      "• Multiple outlets & deeper inventory (Pro)",
      "• Food cost, price suggestions & loyalty (Pro)",
      "• QR ordering / scan to order (Pro)",
    ],
    freePlanUpgradeHint: "Past 500 sales a month? Upgrade whenever — your data stays exactly where it is.",
    benefitsEyebrow: "Features",
  },
  ms: {
    navSignUp: "Daftar",
    navSignUpTitle: "Buka akaun percuma terus dalam pelayar",
    navLogin: "Log masuk",
    navLoginAdmin: "Log masuk Web Admin",
    navDownloadApp: "Muat Turun Aplikasi",
    navAndroidNote: "Telefon & tablet · Google Play",
    navWindowsNote: "PC & komputer riba · Store atau fail",
    navWindowsLink: "Muat turun versi Windows",
    navSignUpFree: "Mula Percuma",
    navSignUpHint: "Buka akaun dalam pelayar — pasang aplikasinya bila anda sudah bersedia.",
    navToggle: "Buka menu navigasi",
    navLanguage: "Bahasa",
    footerQuickLinks: "Pautan Pantas",
    footerContact: "Hubungi Kami",
    footerAddress: "Alamat Kami",
    sectionFeatures: "Apa Yang Anda Dapat",
    sectionFeaturesDesc: "Semua yang diperlukan kaunter — jualan, syif, stok, dan laporan yang menerangkannya — dalam satu aplikasi yang cukup ringan untuk tablet sedia ada anda.",
    sectionEcosystem: "Satu Sistem, Dua Skrin",
    sectionEcosystemDesc: "Pekerja anda menggunakan aplikasi kaunter di kedai; anda memegang Web Admin. Ia sistem yang sama, jadi apa yang berlaku di kaunter muncul dalam laporan anda tanpa sesiapa perlu menghantar apa-apa.",
    sectionScreenshots: "Lihat Sendiri",
    sectionScreenshotsDesc: "Skrin yang pantas dan kemas — daripada telefon di kaunter kecil hingga tablet di atas meja.",
    sectionTestimonials: "Dibina untuk Kedai Seperti Anda",
    sectionTestimonialsDesc: "Daripada satu gerai hingga rangkaian cawangan, sistemnya menyesuaikan diri dengan cara anda bekerja, bukan sebaliknya.",
    sectionPricing: "Harga Jelas, Tanpa Kejutan",
    sectionPricingDesc: "Mula dengan 30 hari percuma dan semua ciri Pro terbuka, kemudian pilih pelan yang sesuai. Tiada kos tersembunyi, dan kami tidak pernah mengambil peratusan daripada jualan anda.",
    faqHeading: "Soalan Lazim",
    ecosystemRegisterApp: "Aplikasi Kaunter",
    ecosystemDownloadOn: "Dapatkan di",
    helpBubble: "Perlukan bantuan?",
    parentCompanyPrompt: "Perlukan sesuatu yang lain dibina?",
    freePlanHeading: "Pelan Percuma — Selamanya",
    freePlanTransactions: "500 transaksi",
    freePlanPerMonth: " sebulan",
    freePlanIntro: "Cukup untuk kedai yang baru bermula. Tanpa kos, tanpa tarikh luput, selagi anda mahu. Sebelum sampai ke sini, setiap akaun baharu mendapat {duration} dengan semua ciri Pro terbuka.",
    freePlanIncludedLabel: "Yang termasuk",
    freePlanExcludedLabel: "Belum termasuk (naik ke Lite atau Pro)",
    freePlanIncluded: [
      "• Jualan di kaunter (POS)",
      "• 1 cawangan",
      "• Produk & kategori",
      "• Cetak resit & laporan jualan asas",
      "• Mod luar talian (kaunter terus berjalan tanpa internet)",
    ],
    freePlanExcluded: [
      "• Rekod pelanggan, meja & paparan dapur (Lite)",
      "• Peranan pekerja & diskaun/pakej (Lite)",
      "• Berbilang cawangan & inventori lanjutan (Pro)",
      "• Kos makanan, cadangan harga & kesetiaan (Pro)",
      "• Pesanan QR / imbas untuk pesan (Pro)",
    ],
    freePlanUpgradeHint: "Melebihi 500 jualan sebulan? Naik taraf bila-bila masa — data anda kekal di tempatnya.",
    benefitsEyebrow: "Ciri",
  },
  ja: {
    navSignUp: "新規登録",
    navSignUpTitle: "ブラウザから無料でアカウントを作成できます",
    navLogin: "ログイン",
    navLoginAdmin: "管理画面にログイン",
    navDownloadApp: "アプリを入手",
    navAndroidNote: "スマホ・タブレット · Google Play",
    navWindowsNote: "PC・ノートPC · Store またはファイル",
    navWindowsLink: "Windows版をダウンロード",
    navSignUpFree: "無料ではじめる",
    navSignUpHint: "アカウントはブラウザで作成できます。アプリの導入は、ご都合のよいときで大丈夫です。",
    navToggle: "メニューを開く",
    navLanguage: "言語",
    footerQuickLinks: "リンク",
    footerContact: "お問い合わせ",
    footerAddress: "所在地",
    sectionFeatures: "できること",
    sectionFeaturesDesc: "会計・シフト・在庫、そしてそれらを読み解くレポートまで。いまお使いのタブレットでも動く軽さで、ひとつにまとまっています。",
    sectionEcosystem: "ひとつのシステムを、2つの画面で",
    sectionEcosystemDesc: "店舗のスタッフはレジアプリを、オーナーは管理画面を使います。同じシステムなので、カウンターでの出来事は誰かが送信しなくてもレポートに表れます。",
    sectionScreenshots: "画面をご覧ください",
    sectionScreenshotsDesc: "小さなカウンターのスマホから、テーブルの上のタブレットまで。速く、余計なもののない画面です。",
    sectionTestimonials: "こんなお店で使われています",
    sectionTestimonialsDesc: "一人で営むお店から多店舗まで。お店のやり方に合わせるのはシステムのほうで、逆ではありません。",
    sectionPricing: "分かりやすい料金、あとからの追加なし",
    sectionPricingDesc: "まずは30日間、すべてのPro機能を無料で。そのうえで合うプランをお選びください。隠れた費用はなく、売上から手数料をいただくこともありません。",
    faqHeading: "よくあるご質問",
    ecosystemRegisterApp: "レジアプリ",
    ecosystemDownloadOn: "入手先：",
    helpBubble: "お困りですか？",
    parentCompanyPrompt: "ほかにも作りたいものがありますか？",
    freePlanHeading: "無料プラン — 期限なし",
    freePlanTransactions: "会計500件",
    freePlanPerMonth: " / 月",
    freePlanIntro: "はじめたばかりのお店が営業するには十分な内容です。費用も期限もなく、必要な間ずっとお使いいただけます。なお、このプランに移る前に、どのアカウントもまず{duration}すべてのPro機能をお試しいただけます。",
    freePlanIncludedLabel: "含まれるもの",
    freePlanExcludedLabel: "含まれないもの（Lite / Pro で解放）",
    freePlanIncluded: [
      "• レジでの会計（POS）",
      "• 1店舗",
      "• 商品・カテゴリーの管理",
      "• レシート印刷と基本の売上レポート",
      "• オフラインモード（通信がなくてもレジは動きます）",
    ],
    freePlanExcluded: [
      "• 顧客情報・テーブル・キッチンディスプレイ（Lite）",
      "• スタッフの権限・割引・セット販売（Lite）",
      "• 多店舗と在庫管理の強化（Pro）",
      "• 原価計算・価格提案・リピート施策（Pro）",
      "• QRオーダー（Pro）",
    ],
    freePlanUpgradeHint: "月500件を超えそうですか？いつでも変更できます。データはそのまま残ります。",
    benefitsEyebrow: "機能",
  },
};

export const getUi = (locale: Locale): UiStrings => pick(ui, locale);
