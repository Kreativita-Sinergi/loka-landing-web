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

  // Hero
  heroBadge: string;
  heroChips: string[];
  heroAlreadyHaveAccount: string;
  heroLoginLink: string;
  heroTabletAlt: string;

  // Demo video
  demoOpenLabel: string;
  demoDialogLabel: string;
  demoCloseLabel: string;

  // FAQ
  faqTitle: string;
  faqLeadBefore: string;
  faqFilterAll: string;

  // Ajakan penutup
  ctaSteps: { title: string; desc: string }[];

  // Harga
  pricingCountryLabel: string;
  pricingOrAnnual: string;
  pricingStartLead: string;
  pricingStartTail: string;
  pricingTaxNote: string;
  pricingContactLink: string;
  pricingDefaultCta: string;
  pricingPlayLink: string;
  pricingSignUpLink: string;
  pricingContactTail: string;
  footerMapsLink: string;

  // Web Admin (section beranda)
  webAdminMoreFeatures: string;
  webAdminSeeAll: string;

  // Lain-lain
  howToStartCta: string;
  partnershipOtherChannels: string;
  parentAlsoBuilds: string;
  parentServicesCta: string;
  parentConsultCta: string;
  parentVisit: string;
  parentServiceAlt: string;
  helpBubbleBody: string;
  helpAriaLabel: string;
  closeLabel: string;
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
    freePlanTransactions: "100 transaksi",
    freePlanPerMonth: " per bulan",
    freePlanIntro: "Cocok untuk usaha yang baru mulai. Tanpa biaya, tanpa masa berlaku — gunakan selama yang Anda mau. Sebelum turun ke paket ini, setiap akun baru lebih dulu menikmati {duration} pertama gratis dengan semua fitur Pro terbuka.",
    freePlanIncludedLabel: "Yang termasuk",
    freePlanExcludedLabel: "Belum termasuk (upgrade ke Pro)",
    freePlanIncluded: [
      "• Kasir / transaksi penjualan (POS)",
      "• 1 outlet",
      "• Kelola produk & kategori",
      "• Cetak struk & laporan transaksi dasar",
      "• Mode offline (kasir tetap jalan tanpa internet)",
    ],
    freePlanExcluded: [
      "• Database pelanggan, meja & KDS (Pro)",
      "• Karyawan multi-role & diskon/bundle (Pro)",
      "• Multi-outlet & inventori lanjutan (Pro)",
      "• HPP, Smart Pricing & Loyalty (Pro)",
      "• Pesan via QR / Scan-to-Order (Pro)",
    ],
    freePlanUpgradeHint: "Lewat batas 100 transaksi? Tinggal upgrade kapan saja — data Anda tetap aman.",
    benefitsEyebrow: "Fitur",
    heroBadge: "Kasir Digital untuk UMKM Indonesia",
    heroChips: ["Transaksi Kilat", "Laporan Real-time", "Cetak Struk Otomatis", "Sync Cloud"],
    heroAlreadyHaveAccount: "Sudah punya akun?",
    heroLoginLink: "Masuk ke Web Admin",
    heroTabletAlt: "Tampilan aplikasi kasir Loka Kasir di tablet",
    demoOpenLabel: "Lihat Demo Aplikasi",
    demoDialogLabel: "Demo aplikasi Loka Kasir",
    demoCloseLabel: "Tutup demo",
    faqTitle: "Pertanyaan yang Sering Diajukan",
    faqLeadBefore: "Panduan lengkap cara kerja Loka Kasir — dari setup awal hingga laporan harian. Masih ada pertanyaan? ",
    faqFilterAll: "Semua",
    ctaSteps: [
      { title: "Daftar Gratis", desc: "Buat akun langsung dari browser ini, atau dari dalam aplikasi. Keduanya sama-sama dapat 30 hari gratis." },
      { title: "Siapkan Toko", desc: "Isi produk, karyawan, dan metode pembayaran lewat Web Admin — bisa dari laptop." },
      { title: "Mulai Jualan", desc: "Pasang aplikasi kasirnya di Android atau Windows, login, dan langsung terima transaksi." },
    ],
    pricingCountryLabel: "Harga untuk",
    pricingOrAnnual: "atau",
    pricingStartLead: "Mulai sekarang: ",
    pricingStartTail: " atau langsung dari aplikasinya — {duration} pertama gratis. Pemilihan paket & pembayaran baru dilakukan setelah masa gratis berakhir.",
    pricingTaxNote: "Harga sudah termasuk PPN. Pembayaran melalui transfer bank atau dompet digital.",
    pricingContactLink: "Hubungi kami",
    pricingDefaultCta: "Mulai Sekarang",
    pricingPlayLink: "Download di Google Play →",
    pricingSignUpLink: "daftar gratis di app.lokakasir.id",
    pricingContactTail: " untuk pertanyaan seputar harga.",
    footerMapsLink: "Lihat di Google Maps →",
    webAdminMoreFeatures: "+{count} fitur lainnya",
    webAdminSeeAll: "Lihat semua fitur Web Admin",
    howToStartCta: "Mulai — ",
    partnershipOtherChannels: "Lebih nyaman lewat kanal lain? Boleh juga:",
    parentAlsoBuilds: "Selain Loka Kasir, Kreativita Sinergi juga mengerjakan:",
    parentServicesCta: "Jasa Website & Aplikasi",
    parentConsultCta: "Konsultasi Proyek",
    parentVisit: "Kunjungi",
    parentServiceAlt: "Jasa pembuatan website & aplikasi — Kreativita Sinergi",
    helpBubbleBody: "Aplikasinya bisa langsung di-download di Google Play. Ada kendala? Chat tim kami — dibalas cepat.",
    helpAriaLabel: "Hubungi tim Loka Kasir via WhatsApp",
    closeLabel: "Tutup",
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
    freePlanTransactions: "100 transactions",
    freePlanPerMonth: " per month",
    freePlanIntro: "Enough to get a new shop trading. No cost, no expiry, for as long as you want it. Before anyone lands here, every new account first gets {duration} with all the Pro features open.",
    freePlanIncludedLabel: "What's included",
    freePlanExcludedLabel: "Not included (move to Pro)",
    freePlanIncluded: [
      "• Selling at the register (POS)",
      "• 1 outlet",
      "• Products & categories",
      "• Receipt printing & basic sales reports",
      "• Offline mode (the register keeps working without internet)",
    ],
    freePlanExcluded: [
      "• Customer records, tables & kitchen display (Pro)",
      "• Staff roles & discounts/bundles (Pro)",
      "• Multiple outlets & deeper inventory (Pro)",
      "• Food cost, price suggestions & loyalty (Pro)",
      "• QR ordering / scan to order (Pro)",
    ],
    freePlanUpgradeHint: "Past 100 sales a month? Upgrade whenever — your data stays exactly where it is.",
    benefitsEyebrow: "Features",
    heroBadge: "Point of Sale for Small Shops",
    heroChips: ["Fast Checkout", "Live Reports", "Auto-printed Receipts", "Cloud Sync"],
    heroAlreadyHaveAccount: "Already have an account?",
    heroLoginLink: "Log in to Web Admin",
    heroTabletAlt: "The Loka Kasir register app running on a tablet",
    demoOpenLabel: "Watch the Demo",
    demoDialogLabel: "Loka Kasir app demo",
    demoCloseLabel: "Close the demo",
    faqTitle: "Common Questions",
    faqLeadBefore: "How Loka Kasir works, from first setup to the daily report. Still stuck? ",
    faqFilterAll: "All",
    ctaSteps: [
      { title: "Create an account", desc: "Sign up in this browser, or from inside the app. Either way you get the same 30 free days." },
      { title: "Set up your shop", desc: "Add products, staff, and payment methods in Web Admin — easiest on a laptop." },
      { title: "Start selling", desc: "Install the register app on Android or Windows, sign in, and take your first sale." },
    ],
    pricingCountryLabel: "Prices for",
    pricingOrAnnual: "or",
    pricingStartLead: "Start now: ",
    pricingStartTail: " or from inside the app — the first {duration} are free. You only choose a plan and pay once that ends.",
    pricingTaxNote: "Prices include tax. Payment by bank transfer or e-wallet.",
    pricingContactLink: "Talk to us",
    pricingDefaultCta: "Get Started",
    pricingPlayLink: "Get it on Google Play →",
    pricingSignUpLink: "sign up free at app.lokakasir.id",
    pricingContactTail: " with any question about pricing.",
    footerMapsLink: "Open in Google Maps →",
    webAdminMoreFeatures: "+{count} more",
    webAdminSeeAll: "See everything in Web Admin",
    howToStartCta: "Start — ",
    partnershipOtherChannels: "Prefer another channel? These work too:",
    parentAlsoBuilds: "Besides Loka Kasir, Kreativita Sinergi also builds:",
    parentServicesCta: "Web & App Development",
    parentConsultCta: "Discuss a Project",
    parentVisit: "Visit",
    parentServiceAlt: "Website and app development — Kreativita Sinergi",
    helpBubbleBody: "The app is on Google Play, ready to install. Stuck on something? Message us — we reply quickly.",
    helpAriaLabel: "Message the Loka Kasir team on WhatsApp",
    closeLabel: "Close",
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
    freePlanTransactions: "100 transaksi",
    freePlanPerMonth: " sebulan",
    freePlanIntro: "Cukup untuk kedai yang baru bermula. Tanpa kos, tanpa tarikh luput, selagi anda mahu. Sebelum sampai ke sini, setiap akaun baharu mendapat {duration} dengan semua ciri Pro terbuka.",
    freePlanIncludedLabel: "Yang termasuk",
    freePlanExcludedLabel: "Belum termasuk (naik ke Pro)",
    freePlanIncluded: [
      "• Jualan di kaunter (POS)",
      "• 1 cawangan",
      "• Produk & kategori",
      "• Cetak resit & laporan jualan asas",
      "• Mod luar talian (kaunter terus berjalan tanpa internet)",
    ],
    freePlanExcluded: [
      "• Rekod pelanggan, meja & paparan dapur (Pro)",
      "• Peranan pekerja & diskaun/pakej (Pro)",
      "• Berbilang cawangan & inventori lanjutan (Pro)",
      "• Kos makanan, cadangan harga & kesetiaan (Pro)",
      "• Pesanan QR / imbas untuk pesan (Pro)",
    ],
    freePlanUpgradeHint: "Melebihi 100 jualan sebulan? Naik taraf bila-bila masa — data anda kekal di tempatnya.",
    benefitsEyebrow: "Ciri",
    heroBadge: "Sistem POS untuk Perniagaan Kecil",
    heroChips: ["Bayaran Pantas", "Laporan Langsung", "Resit Auto-cetak", "Segerak Awan"],
    heroAlreadyHaveAccount: "Sudah ada akaun?",
    heroLoginLink: "Log masuk Web Admin",
    heroTabletAlt: "Aplikasi kaunter Loka Kasir pada tablet",
    demoOpenLabel: "Tonton Demo",
    demoDialogLabel: "Demo aplikasi Loka Kasir",
    demoCloseLabel: "Tutup demo",
    faqTitle: "Soalan Lazim",
    faqLeadBefore: "Cara Loka Kasir berfungsi, daripada pemasangan awal hingga laporan harian. Masih tersekat? ",
    faqFilterAll: "Semua",
    ctaSteps: [
      { title: "Buka akaun", desc: "Daftar dalam pelayar ini, atau dari dalam aplikasi. Kedua-duanya mendapat 30 hari percuma yang sama." },
      { title: "Sediakan kedai", desc: "Tambah produk, pekerja, dan kaedah bayaran di Web Admin — paling mudah pada komputer riba." },
      { title: "Mula berniaga", desc: "Pasang aplikasi kaunter pada Android atau Windows, log masuk, dan terus terima jualan." },
    ],
    pricingCountryLabel: "Harga untuk",
    pricingOrAnnual: "atau",
    pricingStartLead: "Mula sekarang: ",
    pricingStartTail: " atau terus dari dalam aplikasi — {duration} pertama percuma. Anda hanya memilih pelan dan membayar selepas tempoh itu tamat.",
    pricingTaxNote: "Harga termasuk cukai. Bayaran melalui pindahan bank atau dompet digital.",
    pricingContactLink: "Hubungi kami",
    pricingDefaultCta: "Mula Sekarang",
    pricingPlayLink: "Dapatkan di Google Play →",
    pricingSignUpLink: "daftar percuma di app.lokakasir.id",
    pricingContactTail: " untuk sebarang soalan tentang harga.",
    footerMapsLink: "Lihat dalam Google Maps →",
    webAdminMoreFeatures: "+{count} lagi",
    webAdminSeeAll: "Lihat semua dalam Web Admin",
    howToStartCta: "Mula — ",
    partnershipOtherChannels: "Lebih selesa dengan saluran lain? Boleh juga:",
    parentAlsoBuilds: "Selain Loka Kasir, Kreativita Sinergi turut membina:",
    parentServicesCta: "Pembinaan Web & Aplikasi",
    parentConsultCta: "Bincang Projek",
    parentVisit: "Lawati",
    parentServiceAlt: "Pembinaan laman web dan aplikasi — Kreativita Sinergi",
    helpBubbleBody: "Aplikasinya ada di Google Play, sedia dipasang. Ada masalah? Hantar mesej — kami balas cepat.",
    helpAriaLabel: "Hantar mesej kepada pasukan Loka Kasir di WhatsApp",
    closeLabel: "Tutup",
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
    freePlanTransactions: "会計100件",
    freePlanPerMonth: " / 月",
    freePlanIntro: "はじめたばかりのお店が営業するには十分な内容です。費用も期限もなく、必要な間ずっとお使いいただけます。なお、このプランに移る前に、どのアカウントもまず{duration}すべてのPro機能をお試しいただけます。",
    freePlanIncludedLabel: "含まれるもの",
    freePlanExcludedLabel: "含まれないもの（Pro で解放）",
    freePlanIncluded: [
      "• レジでの会計（POS）",
      "• 1店舗",
      "• 商品・カテゴリーの管理",
      "• レシート印刷と基本の売上レポート",
      "• オフラインモード（通信がなくてもレジは動きます）",
    ],
    freePlanExcluded: [
      "• 顧客情報・テーブル・キッチンディスプレイ（Pro）",
      "• スタッフの権限・割引・セット販売（Pro）",
      "• 多店舗と在庫管理の強化（Pro）",
      "• 原価計算・価格提案・リピート施策（Pro）",
      "• QRオーダー（Pro）",
    ],
    freePlanUpgradeHint: "月100件を超えそうですか？いつでも変更できます。データはそのまま残ります。",
    benefitsEyebrow: "機能",
    heroBadge: "個人店のためのPOSレジ",
    heroChips: ["すばやい会計", "リアルタイムの売上", "レシート自動印刷", "クラウド同期"],
    heroAlreadyHaveAccount: "すでにアカウントをお持ちですか？",
    heroLoginLink: "管理画面にログイン",
    heroTabletAlt: "タブレットで動く Loka Kasir のレジアプリ",
    demoOpenLabel: "デモを見る",
    demoDialogLabel: "Loka Kasir のデモ",
    demoCloseLabel: "デモを閉じる",
    faqTitle: "よくあるご質問",
    faqLeadBefore: "初期設定から日々のレポートまで、Loka Kasir の使い方をまとめました。それでも解決しない場合は ",
    faqFilterAll: "すべて",
    ctaSteps: [
      { title: "アカウントを作る", desc: "このブラウザからでも、アプリからでも登録できます。どちらでも同じ30日間の無料期間です。" },
      { title: "お店の設定をする", desc: "商品・スタッフ・支払い方法を管理画面で登録します。パソコンからがいちばん楽です。" },
      { title: "営業をはじめる", desc: "Android か Windows にレジアプリを入れ、ログインして、最初の会計をどうぞ。" },
    ],
    pricingCountryLabel: "料金の表示国",
    pricingOrAnnual: "または",
    pricingStartLead: "今すぐはじめる：",
    pricingStartTail: " から、またはアプリから登録できます。最初の{duration}は無料で、プランの選択とお支払いはその期間が終わってからです。",
    pricingTaxNote: "価格には税が含まれます。お支払いは銀行振込または電子マネーで承ります。",
    pricingContactLink: "お問い合わせ",
    pricingDefaultCta: "はじめる",
    pricingPlayLink: "Google Play で入手 →",
    pricingSignUpLink: "app.lokakasir.id で無料登録",
    pricingContactTail: " までお気軽にどうぞ。",
    footerMapsLink: "Google マップで見る →",
    webAdminMoreFeatures: "ほか{count}件",
    webAdminSeeAll: "管理画面のすべての機能を見る",
    howToStartCta: "はじめる — ",
    partnershipOtherChannels: "ほかの窓口のほうがよろしければ、こちらもどうぞ：",
    parentAlsoBuilds: "Kreativita Sinergi は Loka Kasir のほかに、こうしたものも作っています：",
    parentServicesCta: "ウェブ・アプリ開発",
    parentConsultCta: "プロジェクトの相談",
    parentVisit: "サイトを見る：",
    parentServiceAlt: "ウェブサイト・アプリ開発 — Kreativita Sinergi",
    helpBubbleBody: "アプリは Google Play からすぐに導入いただけます。お困りのことがあれば、メッセージをお送りください。すぐにお返事します。",
    helpAriaLabel: "WhatsApp で Loka Kasir のチームに連絡する",
    closeLabel: "閉じる",
  },
};

export const getUi = (locale: Locale): UiStrings => pick(ui, locale);
