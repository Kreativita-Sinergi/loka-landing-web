import { pick, type Locale } from "./localized";

export type HowToIcon =
  | "whatsapp"
  | "download"
  | "install"
  | "register"
  | "setup"
  | "sell";

export interface HowToStep {
  icon: HowToIcon;
  title: string;
  desc: string;
}

type HowToStart = { title: string; description: string; steps: HowToStep[] };

// Urutannya sengaja dimulai dari mendaftar, bukan mengunduh: sejak Web Admin
// punya halaman pendaftaran sendiri, pemilik bisa membuat akun dan menyiapkan
// toko dari laptop tanpa memegang HP dulu.
const howToByLocale: Record<Locale, HowToStart> = {
  id: {
    title: "Cara Daftar & Mulai Pakai",
    description:
      "Lima langkah sederhana — dari belum punya akun sampai siap menerima transaksi pertama. Gratis 30 hari pertama, tanpa komitmen.",
    steps: [
      { icon: "register", title: "1. Daftar Akun Gratis", desc: "Daftar langsung dari browser di app.lokakasir.id, atau dari dalam aplikasi — sama saja. Isi data bisnis, pilih jenis usaha (FNB, Retail, atau Jasa), dan buat outlet pertama." },
      { icon: "setup", title: "2. Siapkan Toko", desc: "Tambahkan produk & kategori, atur karyawan beserta PIN-nya, lalu tentukan metode pembayaran. Paling nyaman dikerjakan di Web Admin lewat laptop." },
      { icon: "download", title: "3. Download Aplikasi Kasir", desc: "Ambil aplikasinya di Google Play Store (Android) atau Microsoft Store (Windows) untuk perangkat yang dipakai melayani pembeli." },
      { icon: "install", title: "4. Pasang & Login", desc: "Tekan Install, buka aplikasinya, lalu login memakai akun yang sama. Produk dan pengaturan yang tadi Anda buat langsung muncul." },
      { icon: "sell", title: "5. Mulai Transaksi", desc: "Buka shift, layani penjualan, dan cetak struk. Pantau laporan & kelola bisnis lebih lanjut lewat Web Admin." },
    ],
  },
  en: {
    title: "How to Get Started",
    description:
      "Five steps, from no account at all to taking your first sale. The first 30 days are free and there is nothing to cancel.",
    steps: [
      { icon: "register", title: "1. Create a free account", desc: "Sign up in your browser at app.lokakasir.id, or from inside the app — same account either way. Enter your business details, pick your type (food, retail, or services), and create your first outlet." },
      { icon: "setup", title: "2. Set up your shop", desc: "Add products and categories, add staff with their PINs, and choose which payment methods you accept. Easiest done on a laptop in Web Admin." },
      { icon: "download", title: "3. Download the register app", desc: "Get it from Google Play (Android) or the Microsoft Store (Windows), on whichever device you serve customers with." },
      { icon: "install", title: "4. Install and sign in", desc: "Install, open it, and sign in with the same account. Everything you set up a moment ago is already there." },
      { icon: "sell", title: "5. Start selling", desc: "Open a shift, ring up sales, print receipts. Watch the numbers and run the rest of the business from Web Admin." },
    ],
  },
  ms: {
    title: "Cara Mula Menggunakannya",
    description:
      "Lima langkah, daripada tiada akaun langsung sehingga sedia menerima jualan pertama. 30 hari pertama percuma dan tiada apa-apa yang perlu dibatalkan.",
    steps: [
      { icon: "register", title: "1. Buka akaun percuma", desc: "Daftar dalam pelayar di app.lokakasir.id, atau dari dalam aplikasi — akaunnya sama. Isi maklumat perniagaan, pilih jenisnya (makanan, runcit, atau perkhidmatan), dan buat cawangan pertama." },
      { icon: "setup", title: "2. Sediakan kedai", desc: "Tambah produk dan kategori, tambah pekerja berserta PIN mereka, dan pilih kaedah pembayaran yang anda terima. Paling mudah dibuat di Web Admin menggunakan komputer riba." },
      { icon: "download", title: "3. Muat turun aplikasi kaunter", desc: "Dapatkan daripada Google Play (Android) atau Microsoft Store (Windows), pada peranti yang anda guna untuk melayan pelanggan." },
      { icon: "install", title: "4. Pasang dan log masuk", desc: "Pasang, buka, dan log masuk dengan akaun yang sama. Semua yang anda sediakan tadi sudah pun ada di dalamnya." },
      { icon: "sell", title: "5. Mula berniaga", desc: "Buka syif, layan jualan, cetak resit. Pantau angkanya dan uruskan selebihnya melalui Web Admin." },
    ],
  },
  ja: {
    title: "はじめ方",
    description:
      "アカウントがない状態から、最初の会計まで5ステップ。最初の30日間は無料で、解約の手続きも必要ありません。",
    steps: [
      { icon: "register", title: "1. 無料アカウントを作る", desc: "ブラウザ（app.lokakasir.id）からでも、アプリからでも登録できます。店舗情報を入力し、業種（飲食・小売・サービス）を選んで、最初の店舗を作成します。" },
      { icon: "setup", title: "2. お店の初期設定", desc: "商品とカテゴリー、スタッフとそのPIN、受け付ける支払い方法を登録します。パソコンの管理画面から行うのがいちばん楽です。" },
      { icon: "download", title: "3. レジアプリを入れる", desc: "接客に使う端末に、Google Play（Android）または Microsoft Store（Windows）から入れてください。" },
      { icon: "install", title: "4. インストールしてログイン", desc: "インストールして開き、同じアカウントでログインします。先ほど設定した内容は、そのまま入っています。" },
      { icon: "sell", title: "5. 営業をはじめる", desc: "シフトを開けて、会計して、レシートを出す。売上の確認やその他の管理は管理画面から行えます。" },
    ],
  },
};

export const getHowToStart = (locale: Locale) => pick(howToByLocale, locale);

/** @deprecated Pakai [getHowToStart]. */
export const howToStartDetails: HowToStart = howToByLocale.id;
