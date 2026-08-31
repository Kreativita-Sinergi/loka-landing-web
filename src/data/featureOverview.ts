import { pick, type Locale } from "./localized";

export type FeatureIcon = "pos" | "food" | "stock" | "staff" | "customer" | "owner";
export type FeaturePlan = "all" | "pro";

export type FeatureOverviewItem = {
  name: string;
  plan: FeaturePlan;
};

export type FeatureOverviewCategory = {
  icon: FeatureIcon;
  title: string;
  summary: string;
  features: FeatureOverviewItem[];
};

type FeatureOverviewCopy = {
  eyebrow: string;
  intro: string;
  note: string;
  allPlansLabel: string;
  proLabel: string;
  moreLabel: string;
  categories: { title: string; summary: string; features: string[] }[];
};

const icons: FeatureIcon[] = ["pos", "food", "stock", "staff", "customer", "owner"];

// Hanya fitur yang secara eksplisit berada di paket berbayar yang diberi badge
// Pro. Baris tanpa badge tersedia di semua paket, termasuk Gratis.
const plans: FeaturePlan[][] = [
  ["all", "all", "all", "pro", "all"],
  ["pro", "pro", "pro", "pro", "all"],
  ["all", "pro", "pro", "pro", "pro"],
  ["all", "all", "pro", "all", "pro"],
  ["pro", "all", "pro", "pro", "pro"],
  ["all", "pro", "pro", "pro", "all"],
];

const copyByLocale: Record<Locale, FeatureOverviewCopy> = {
  id: {
    eyebrow: "Lebih dari sekadar aplikasi kasir",
    intro: "Dari pelanggan memesan sampai pemilik membaca laba, seluruh operasional toko tersambung dalam satu akun.",
    note: "Tersedia di Android dan Windows untuk kasir, serta Web Admin untuk pemilik. Ketersediaan fitur mengikuti paket yang dipilih.",
    allPlansLabel: "Tanpa badge = Semua paket",
    proLabel: "Pro",
    moreLabel: "Lihat {count} fitur lainnya",
    categories: [
      {
        title: "Penjualan & POS",
        summary: "Layani transaksi dengan cepat, tanpa membuat kasir menghafal alur yang rumit.",
        features: ["Grid atau daftar produk", "Dine-in, takeaway & delivery", "Tunai, QRIS, kartu & transfer", "Diskon, refund & void", "Struk thermal Bluetooth / USB"],
      },
      {
        title: "Resto, Kafe & QR Order",
        summary: "Meja, dapur, dan kasir menerima informasi pesanan yang sama tanpa tulis ulang.",
        features: ["QR menu per meja", "Pelanggan pesan dari HP", "Denah & status meja", "Kitchen Display System", "Varian, add-on, pajak & service"],
      },
      {
        title: "Stok, HPP & Pembelian",
        summary: "Tahu barang yang menipis, bahan yang terpakai, dan margin yang benar-benar tersisa.",
        features: ["Stok per outlet & peringatan menipis", "Transfer & riwayat stok", "Bahan baku, resep & waste", "Supplier & purchase order", "HPP, profit produk & saran harga"],
      },
      {
        title: "Karyawan & Operasional",
        summary: "Setiap shift, uang kas, kehadiran, dan tindakan sensitif punya penanggung jawab.",
        features: ["Buka/tutup shift & selisih kas", "PIN kasir & supervisor", "Absensi clock-in / clock-out", "Role, izin & audit log", "Kasbon karyawan"],
      },
      {
        title: "Pelanggan & Loyalitas",
        summary: "Kenali pelanggan tetap dan beri alasan untuk kembali tanpa aplikasi member terpisah.",
        features: ["Database & riwayat belanja", "Membership pelanggan", "Poin loyalitas", "Kasbon / piutang pelanggan", "Promo yang konsisten di kasir"],
      },
      {
        title: "Laporan & Kendali Pemilik",
        summary: "Pantau usaha dari browser, termasuk saat Anda tidak berada di toko.",
        features: ["Dashboard penjualan real-time", "Laporan penjualan & keuangan", "Analisis produk & jam ramai", "Multi-outlet & terminal", "Offline di kasir, sinkron saat online"],
      },
    ],
  },
  en: {
    eyebrow: "More than a point-of-sale app",
    intro: "From the moment a customer orders to the moment you read the profit report, the whole operation stays connected under one account.",
    note: "Android and Windows for the register, plus Web Admin for owners. Feature availability follows your chosen plan.",
    allPlansLabel: "No badge = All plans",
    proLabel: "Pro",
    moreLabel: "See {count} more features",
    categories: [
      { title: "Sales & POS", summary: "Move the queue quickly without making staff learn a complicated workflow.", features: ["Product grid or list", "Dine-in, takeaway & delivery", "Cash, QR, card & transfer", "Discounts, refunds & voids", "Bluetooth / USB thermal receipts"] },
      { title: "Food Service & QR Ordering", summary: "Tables, kitchen, and register all receive the same order without anyone copying it out.", features: ["A QR menu per table", "Guests order from their phone", "Floor plan & table status", "Kitchen Display System", "Variants, add-ons, tax & service"] },
      { title: "Stock, Cost & Purchasing", summary: "Know what is running low, what ingredients were used, and what margin is actually left.", features: ["Stock per outlet & low-stock alerts", "Transfers & movement history", "Ingredients, recipes & waste", "Suppliers & purchase orders", "Cost, product profit & price suggestions"] },
      { title: "Staff & Operations", summary: "Every shift, cash count, attendance record, and sensitive action has an owner.", features: ["Shift open/close & cash variance", "Cashier & supervisor PINs", "Clock-in / clock-out", "Roles, permissions & audit log", "Staff advances"] },
      { title: "Customers & Loyalty", summary: "Recognise regulars and give them a reason to return without a separate member app.", features: ["Customer records & purchase history", "Membership", "Loyalty points", "Customer tabs / receivables", "Consistent promotions at checkout"] },
      { title: "Reports & Owner Control", summary: "Run the business from a browser, including when you are nowhere near the shop.", features: ["Live sales dashboard", "Sales & financial reports", "Product & peak-hour analysis", "Multiple outlets & terminals", "Offline selling, automatic sync"] },
    ],
  },
  ms: {
    eyebrow: "Lebih daripada aplikasi kaunter",
    intro: "Daripada pelanggan membuat pesanan hingga pemilik membaca laporan untung, seluruh operasi kekal bersambung dalam satu akaun.",
    note: "Android dan Windows untuk kaunter, serta Web Admin untuk pemilik. Ketersediaan ciri mengikut pelan pilihan anda.",
    allPlansLabel: "Tanpa lencana = Semua pelan",
    proLabel: "Pro",
    moreLabel: "Lihat {count} ciri lagi",
    categories: [
      { title: "Jualan & POS", summary: "Layan urus niaga dengan pantas tanpa aliran kerja yang rumit.", features: ["Grid atau senarai produk", "Makan di sini, bungkus & penghantaran", "Tunai, QR, kad & pindahan", "Diskaun, bayaran balik & batal", "Resit thermal Bluetooth / USB"] },
      { title: "F&B & Pesanan QR", summary: "Meja, dapur, dan kaunter menerima pesanan yang sama tanpa menyalinnya semula.", features: ["Menu QR setiap meja", "Pelanggan pesan dari telefon", "Pelan lantai & status meja", "Kitchen Display System", "Varian, tambahan, cukai & servis"] },
      { title: "Stok, Kos & Pembelian", summary: "Tahu barang yang menipis, bahan yang digunakan, dan margin sebenar.", features: ["Stok setiap cawangan & amaran", "Pemindahan & sejarah stok", "Bahan, resipi & pembaziran", "Pembekal & pesanan belian", "Kos, untung produk & cadangan harga"] },
      { title: "Pekerja & Operasi", summary: "Setiap syif, kiraan tunai, kehadiran, dan tindakan sensitif ada pemiliknya.", features: ["Buka/tutup syif & perbezaan tunai", "PIN juruwang & penyelia", "Daftar masuk / keluar", "Peranan, kebenaran & log audit", "Pendahuluan pekerja"] },
      { title: "Pelanggan & Kesetiaan", summary: "Kenali pelanggan tetap dan beri sebab untuk kembali tanpa aplikasi ahli berasingan.", features: ["Rekod & sejarah belian", "Keahlian pelanggan", "Mata kesetiaan", "Hutang / akaun pelanggan", "Promosi konsisten di kaunter"] },
      { title: "Laporan & Kawalan Pemilik", summary: "Pantau perniagaan dari pelayar walaupun anda tiada di kedai.", features: ["Papan pemuka jualan langsung", "Laporan jualan & kewangan", "Analisis produk & waktu puncak", "Berbilang cawangan & terminal", "Jualan luar talian, sync automatik"] },
    ],
  },
  ja: {
    eyebrow: "レジだけではありません",
    intro: "お客様の注文からオーナーが利益を確認するまで、お店の運営すべてがひとつのアカウントでつながります。",
    note: "レジは Android・Windows、オーナーはブラウザの管理画面を利用できます。機能はご利用プランにより異なります。",
    allPlansLabel: "バッジなし = 全プラン",
    proLabel: "Pro",
    moreLabel: "ほか{count}機能を見る",
    categories: [
      { title: "販売・レジ", summary: "複雑な操作を覚えなくても、混雑時の会計をすばやく進められます。", features: ["商品グリッド・一覧表示", "店内・持ち帰り・デリバリー", "現金・QR・カード・振込", "割引・返金・取消", "Bluetooth / USB レシート印刷"] },
      { title: "飲食店・QR注文", summary: "テーブル、厨房、レジに同じ注文が届き、転記の手間をなくします。", features: ["テーブルごとのQRメニュー", "お客様のスマホから注文", "フロア図・テーブル状況", "キッチンディスプレイ", "バリエーション・追加・税・サービス料"] },
      { title: "在庫・原価・仕入れ", summary: "不足しそうな商品、使った材料、実際に残る利益が分かります。", features: ["店舗別在庫・不足アラート", "店舗間移動・増減履歴", "原材料・レシピ・廃棄", "仕入先・発注書", "原価・商品利益・価格提案"] },
      { title: "スタッフ・店舗運営", summary: "シフト、現金、勤怠、重要操作の担当者が記録に残ります。", features: ["シフト開始・締め・現金差異", "担当者・責任者PIN", "出勤・退勤打刻", "権限・ロール・監査ログ", "従業員立替・貸付"] },
      { title: "顧客・ロイヤルティ", summary: "別の会員アプリを入れてもらわずに、常連客との関係を育てられます。", features: ["顧客情報・購入履歴", "会員管理", "ポイント", "掛売り・売掛金", "レジと連動した販促"] },
      { title: "レポート・オーナー管理", summary: "店舗にいないときも、ブラウザから状況を確認して運営できます。", features: ["リアルタイム売上ダッシュボード", "売上・収支レポート", "商品・ピーク時間分析", "複数店舗・レジ端末", "オフライン会計・復旧後自動同期"] },
    ],
  },
};

export const getFeatureOverview = (locale: Locale) => {
  const copy = pick(copyByLocale, locale);
  return {
    ...copy,
    categories: copy.categories.map((category, categoryIndex) => ({
      ...category,
      icon: icons[categoryIndex],
      features: category.features.map((name, featureIndex) => ({
        name,
        plan: plans[categoryIndex][featureIndex],
      })),
    })),
  };
};
