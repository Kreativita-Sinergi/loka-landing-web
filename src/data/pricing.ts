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
const proFeaturesByLocale: Record<Locale, string[]> = {
  id: [
    "Server cloud, penyimpanan & backup data, sinkronisasi, keamanan, pemeliharaan, dan pembaruan fitur",
    "Transaksi tidak terbatas dan laporan keuangan",
    "Karyawan multi-role, pelanggan, meja, dan KDS",
    "Stok serta varian produk per outlet",
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
    "Cloud servers, data storage and backups, sync, security, maintenance, and feature updates",
    "Unlimited transactions and financial reports",
    "Staff roles, customer records, tables, and kitchen display",
    "Stock and product variants per outlet",
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
    "Pelayan awan, storan dan sandaran data, penyegerakan, keselamatan, penyelenggaraan serta kemas kini ciri",
    "Transaksi tanpa had dan laporan kewangan",
    "Peranan pekerja, rekod pelanggan, meja, dan paparan dapur",
    "Stok dan varian produk setiap cawangan",
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
    "クラウドサーバー、データ保存・バックアップ、同期、セキュリティ、保守、機能更新",
    "無制限の会計と財務レポート",
    "スタッフ権限・顧客情報・テーブル・キッチンディスプレイ",
    "店舗ごとの在庫と商品バリエーション",
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
    pro: { period: string; periodAnnual: string; periodThreeYear: string; annualNote: string; threeYearNote: string; badge: string; description: string; ctaLabel: string };
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
    pro: { period: "per bulan", periodAnnual: "per tahun", periodThreeYear: "3 tahun", annualNote: "Hemat Rp 118.000 / tahun (2 bulan gratis)", threeYearNote: "Paling hemat — setara sekitar Rp41.400/bulan", badge: "Satu Paket, Semua Fitur", description: "Semua fitur kasir dan pengelolaan bisnis. Outlet pertama sudah termasuk; cabang tambahan dibayar terpisah.", ctaLabel: "Pilih Pro" },
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
    pro: { period: "per month", periodAnnual: "per year", periodThreeYear: "3 years", annualNote: "Two months off when paid yearly", threeYearNote: "Best value for long-term use", badge: "One Plan, Every Feature", description: "Every POS and business-management feature. The first outlet is included; additional outlets are billed separately.", ctaLabel: "Choose Pro" },
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
    pro: { period: "sebulan", periodAnnual: "setahun", periodThreeYear: "3 tahun", annualNote: "Dua bulan percuma jika bayar tahunan", threeYearNote: "Paling jimat untuk penggunaan jangka panjang", badge: "Satu Pelan, Semua Ciri", description: "Semua ciri POS dan pengurusan perniagaan. Cawangan pertama disertakan; cawangan tambahan dicaj berasingan.", ctaLabel: "Pilih Pro" },
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
    pro: { period: "月額", periodAnnual: "年額", periodThreeYear: "3年間", annualNote: "年払いなら2か月分お得", threeYearNote: "長期利用でもっともお得", badge: "1つのプランで全機能", description: "POSと店舗管理の全機能。1店舗目は料金に含まれ、追加店舗は別料金です。", ctaLabel: "Pro を選ぶ" },
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
      name: "Pro",
      price: 59000,
      priceAnnual: 590000,
      priceThreeYear: 1490000,
      ...copy.pro,
      features: pick(proFeaturesByLocale, locale),
      ctaUrl: "https://app.lokakasir.id",
    },
  ];
}

/** @deprecated Pakai [getTiers]. */
export const tiers: IPricing[] = getTiers('id');
