import { IPricing } from "@/types";
import { pick, type Locale } from "./localized";

/**
 * Daftar paket.
 *
 * ANGKA harganya tidak ada di sini melainkan di `lib/pricing.ts`, yang sudah
 * memilih mata uang per negara. Yang dilokalkan di berkas ini adalah NAMA
 * FITUR — dan itu bukan pekerjaan menerjemahkan kata: "HPP Moving Average"
 * punya nama baku sendiri di tiap pasar (移動平均法による原価), dan istilah yang
 * salah membuat pemilik toko menyimpulkan fiturnya tidak ada.
 */
const liteFeaturesByLocale: Record<Locale, string[]> = {
  id: [
    "1 outlet",
    "Transaksi tidak terbatas",
    "Manajemen karyawan multi-role (Kasir, Manager, Gudang, dll.)",
    "Manajemen & database pelanggan",
    "Manajemen meja & pesanan dine-in (FNB)",
    "Kitchen Display System / KDS (FNB)",
    "Stok & varian produk per outlet",
    "Pengaturan hak akses (RBAC) per role",
    "Metode pembayaran sesuai konfigurasi bisnis",
    "Laporan keuangan shift & export CSV",
  ],
  en: [
    "1 outlet",
    "Unlimited transactions",
    "Staff accounts with roles (cashier, manager, stockroom, and more)",
    "Customer records",
    "Table management and dine-in orders (food & drink)",
    "Kitchen display system (food & drink)",
    "Stock and product variants per outlet",
    "Per-role permissions",
    "Payment methods you configure yourself",
    "Shift financial reports and CSV export",
  ],
  ms: [
    "1 cawangan",
    "Transaksi tanpa had",
    "Akaun pekerja mengikut peranan (juruwang, pengurus, stor, dan lain-lain)",
    "Rekod pelanggan",
    "Pengurusan meja dan pesanan makan di sini (makanan & minuman)",
    "Paparan dapur (makanan & minuman)",
    "Stok dan varian produk setiap cawangan",
    "Kebenaran akses mengikut peranan",
    "Kaedah pembayaran yang anda tetapkan sendiri",
    "Laporan kewangan syif dan eksport CSV",
  ],
  ja: [
    "1店舗",
    "会計件数は無制限",
    "権限別のスタッフアカウント（レジ担当・店長・在庫担当など）",
    "顧客情報の管理",
    "テーブル管理と店内注文（飲食店向け）",
    "キッチンディスプレイ（飲食店向け）",
    "店舗ごとの在庫・商品バリエーション",
    "役割ごとのアクセス権限設定",
    "支払い方法は店舗側で自由に設定",
    "シフト単位の売上レポートとCSV書き出し",
  ],
};

const proFeaturesByLocale: Record<Locale, string[]> = {
  id: [
    "Semua fitur Lite, plus:",
    "Pesan via QR (Scan-to-Order) — pelanggan scan QR meja, lihat menu & pesan sendiri",
    "Multi-outlet tanpa batas (+Rp 49.000/outlet per bulan, atau Rp 490.000/tahun)",
    "Transfer stok antar outlet & riwayat pergerakan stok",
    "Bahan Baku & alert stok menipis",
    "Manajemen Supplier & Purchase Order",
    "Absensi karyawan — kiosk clock-in/out",
    "Analitik lanjutan: tren, produk terlaris, peak hours",
    "HPP Moving Average & resep produk (BOM)",
    "Kalkulasi biaya overhead / OPEX",
    "Rekomendasi harga otomatis (Smart Pricing)",
    "Laporan Profitabilitas per produk (Revenue, COGS, Margin)",
    "Net Profit & Net Margin dashboard",
    "Program Loyalty Pelanggan — poin & reward",
    "Bantuan teknis prioritas via email",
  ],
  en: [
    "Everything in Lite, plus:",
    "QR ordering — guests scan the code on the table, browse the menu, and order themselves",
    "Unlimited outlets (additional outlets billed per outlet)",
    "Stock transfers between outlets, with full movement history",
    "Raw materials and low-stock alerts",
    "Suppliers and purchase orders",
    "Staff attendance — kiosk clock-in and clock-out",
    "Deeper analytics: trends, best sellers, peak hours",
    "Moving-average cost of goods and product recipes (BOM)",
    "Overhead / operating cost tracking",
    "Automatic price suggestions",
    "Per-product profitability (revenue, cost, margin)",
    "Net profit and net margin dashboard",
    "Customer loyalty — points and rewards",
    "Priority support by email",
  ],
  ms: [
    "Semua dalam Lite, dan:",
    "Pesanan melalui QR — pelanggan imbas kod di meja, lihat menu, dan pesan sendiri",
    "Cawangan tanpa had (cawangan tambahan dikenakan bayaran setiap cawangan)",
    "Pemindahan stok antara cawangan, dengan sejarah pergerakan penuh",
    "Bahan mentah dan amaran stok hampir habis",
    "Pembekal dan pesanan belian",
    "Kehadiran pekerja — daftar masuk dan keluar di kiosk",
    "Analitik lebih mendalam: aliran jualan, produk paling laris, waktu puncak",
    "Kos barang kaedah purata bergerak dan resipi produk (BOM)",
    "Penjejakan kos overhed / operasi",
    "Cadangan harga automatik",
    "Keuntungan setiap produk (hasil, kos, margin)",
    "Papan pemuka untung bersih dan margin bersih",
    "Program kesetiaan pelanggan — mata dan ganjaran",
    "Sokongan keutamaan melalui e-mel",
  ],
  ja: [
    "Lite のすべての機能に加えて：",
    "QRオーダー — お客様がテーブルのQRを読み取り、メニューを見てご自身で注文",
    "店舗数は無制限（追加店舗は1店舗ごとの課金）",
    "店舗間の在庫移動と、移動履歴の記録",
    "原材料の管理と在庫僅少アラート",
    "仕入先の管理と発注書",
    "スタッフの勤怠 — 端末での出退勤打刻",
    "詳細な分析：売上の推移、売れ筋商品、混雑する時間帯",
    "移動平均法による原価と、商品ごとのレシピ（BOM）",
    "間接費・固定費の把握",
    "販売価格の自動提案",
    "商品別の収益性（売上・原価・粗利）",
    "営業利益と利益率のダッシュボード",
    "ポイントと特典による顧客リピート施策",
    "メールでの優先サポート",
  ],
};

const tierCopyByLocale: Record<
  Locale,
  {
    trial: { name: string; price: string; period: string; badge: string; description: string; features: string[]; ctaLabel: string };
    lite: { period: string; periodAnnual: string; annualNote: string; description: string; ctaLabel: string };
    pro: { period: string; periodAnnual: string; annualNote: string; badge: string; description: string; ctaLabel: string };
  }
> = {
  id: {
    trial: {
      name: "Gratis 30 Hari Pertama",
      price: "Gratis",
      period: "30 hari pertama",
      badge: "Mulai di Sini",
      description: "Akses penuh semua fitur Pro tanpa syarat. Tidak ada komitmen.",
      features: [
        "Akses semua fitur Pro tanpa syarat",
        "Transaksi tanpa batas",
        "Multi-outlet — sampai 5 cabang",
        "Dihitung sejak transaksi pertama, bukan sejak daftar",
        "Tanpa kartu kredit, tanpa komitmen",
        "Setelah 30 hari pilih paket yang sesuai",
      ],
      ctaLabel: "Coba Sekarang",
    },
    lite: { period: "per bulan", periodAnnual: "per tahun", annualNote: "Hemat Rp 69.000 / tahun", description: "Untuk 1 outlet. Operasional kasir lengkap dengan manajemen produk & pelanggan.", ctaLabel: "Pilih Lite" },
    pro: { period: "per outlet / bulan", periodAnnual: "per outlet / tahun", annualNote: "Hemat Rp 178.000 / tahun (2 bulan gratis)", badge: "Paling Populer", description: "Multi-outlet + inventori lanjutan, HPP & loyalty, plus Pesan via QR. Outlet pertama sudah termasuk.", ctaLabel: "Pilih Pro" },
  },
  en: {
    trial: {
      name: "First 30 Days Free",
      price: "Free",
      period: "first 30 days",
      badge: "Start Here",
      description: "Every Pro feature, no conditions attached and nothing to cancel.",
      features: [
        "Every Pro feature unlocked",
        "Unlimited transactions",
        "Up to 5 outlets",
        "Counted from your first sale, not from sign-up",
        "No credit card, no commitment",
        "Pick a plan when the 30 days are up",
      ],
      ctaLabel: "Try It Now",
    },
    lite: { period: "per month", periodAnnual: "per year", annualNote: "Two months off when paid yearly", description: "For a single outlet. The full counter, plus product and customer management.", ctaLabel: "Choose Lite" },
    pro: { period: "per outlet / month", periodAnnual: "per outlet / year", annualNote: "Two months off when paid yearly", badge: "Most Popular", description: "Multiple outlets, deeper inventory, food cost and loyalty, plus QR ordering. The first outlet is included.", ctaLabel: "Choose Pro" },
  },
  ms: {
    trial: {
      name: "30 Hari Pertama Percuma",
      price: "Percuma",
      period: "30 hari pertama",
      badge: "Mula Di Sini",
      description: "Semua ciri Pro, tanpa syarat dan tiada apa-apa yang perlu dibatalkan.",
      features: [
        "Semua ciri Pro terbuka",
        "Transaksi tanpa had",
        "Sehingga 5 cawangan",
        "Dikira dari jualan pertama, bukan dari pendaftaran",
        "Tanpa kad kredit, tanpa komitmen",
        "Pilih pelan selepas 30 hari tamat",
      ],
      ctaLabel: "Cuba Sekarang",
    },
    lite: { period: "sebulan", periodAnnual: "setahun", annualNote: "Dua bulan percuma jika bayar tahunan", description: "Untuk satu cawangan. Kaunter lengkap, berserta pengurusan produk dan pelanggan.", ctaLabel: "Pilih Lite" },
    pro: { period: "setiap cawangan / bulan", periodAnnual: "setiap cawangan / tahun", annualNote: "Dua bulan percuma jika bayar tahunan", badge: "Paling Popular", description: "Berbilang cawangan, inventori lebih mendalam, kos makanan dan kesetiaan pelanggan, serta pesanan QR. Cawangan pertama sudah termasuk.", ctaLabel: "Pilih Pro" },
  },
  ja: {
    trial: {
      name: "最初の30日間無料",
      price: "無料",
      period: "最初の30日間",
      badge: "まずはこちら",
      description: "Proのすべての機能を、条件なしで。解約の手続きもありません。",
      features: [
        "Proの全機能が使えます",
        "会計件数は無制限",
        "最大5店舗まで",
        "登録日ではなく、最初の会計から30日",
        "カード登録不要・契約期間の縛りなし",
        "30日を過ぎてから、プランをお選びいただけます",
      ],
      ctaLabel: "無料で試す",
    },
    lite: { period: "月額", periodAnnual: "年額", annualNote: "年払いなら2か月分お得", description: "1店舗向け。レジ業務ひと通りに、商品管理と顧客管理まで。", ctaLabel: "Lite を選ぶ" },
    pro: { period: "1店舗あたり / 月", periodAnnual: "1店舗あたり / 年", annualNote: "年払いなら2か月分お得", badge: "いちばん選ばれています", description: "多店舗対応、在庫管理の強化、原価計算とリピート施策、そしてQRオーダー。1店舗目は料金に含まれます。", ctaLabel: "Pro を選ぶ" },
  },
};

export function getTiers(locale: Locale): IPricing[] {
  const copy = pick(tierCopyByLocale, locale);
  return [
    {
      name: copy.trial.name,
      price: copy.trial.price,
      period: copy.trial.period,
      badge: copy.trial.badge,
      description: copy.trial.description,
      features: copy.trial.features,
      ctaLabel: copy.trial.ctaLabel,
      ctaUrl: "https://app.lokakasir.id",
    },
    {
      name: "Lite",
      price: 39000,
      priceAnnual: 399000,
      ...copy.lite,
      features: pick(liteFeaturesByLocale, locale),
      ctaUrl: "https://app.lokakasir.id",
    },
    {
      name: "Pro",
      price: 89000,
      priceAnnual: 890000,
      ...copy.pro,
      features: pick(proFeaturesByLocale, locale),
      ctaUrl: "https://app.lokakasir.id",
    },
  ];
}

/** @deprecated Pakai [getTiers]. */
export const tiers: IPricing[] = getTiers('id');
