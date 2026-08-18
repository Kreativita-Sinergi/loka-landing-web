import { pick, type Locale } from "./localized";

/**
 * Keterangan tangkapan layar aplikasi.
 *
 * Berkas gambarnya sama di semua bahasa — layarnya memang berbahasa Indonesia,
 * karena itulah aplikasi yang sudah dipakai hari ini. Yang diterjemahkan hanya
 * keterangan di bawahnya, dan itu memang cukup: pembaca di Osaka mengenali
 * layar login dari bentuknya, bukan dari tulisannya.
 */
export type Shot = { src: string; label: string; description?: string };

const MOBILE_SRC = [
  "/images/mobile/Screenshot_1776572485.png",
  "/images/mobile/Screenshot_1776572542.png",
  "/images/mobile/Screenshot_1776572549.png",
  "/images/mobile/Screenshot_1776572556.png",
  "/images/mobile/Screenshot_1776573487.png",
];

const TABLET_SRC = [
  "/images/tablet/Screenshot_1776574642.png",
  "/images/tablet/Screenshot_1776574650.png",
  "/images/tablet/Screenshot_1776574679.png",
  "/images/tablet/Screenshot_1776574482.png",
  "/images/tablet/Screenshot_1776574686.png",
];

type ScreenshotCopy = {
  demoLabel: string;
  tabMobile: string;
  tabTablet: string;
  mobile: string[];
  tablet: { label: string; description: string }[];
};

const copyByLocale: Record<Locale, ScreenshotCopy> = {
  id: {
    demoLabel: "Lihat Demo Aplikasi",
    tabMobile: "App Mobile",
    tabTablet: "Tablet",
    mobile: ["Login", "Beranda", "Kasir", "Pesanan", "Pembayaran"],
    tablet: [
      { label: "Layar Transaksi (Grid)", description: "Antarmuka kasir yang bersih dengan dukungan grid view untuk identifikasi produk cepat." },
      { label: "Layar Transaksi (List)", description: "Tampilan list untuk melihat SKU dan detail stok produk secara langsung saat transaksi." },
      { label: "Riwayat Transaksi", description: "Pantau semua transaksi harian, status pembayaran, dan kelola refund langsung dari perangkat." },
      { label: "Manajemen Shift", description: "Laporan ringkasan kas yang akurat di setiap akhir sesi untuk transparansi keuangan." },
      { label: "Pengaturan Perangkat", description: "Pusat konfigurasi printer thermal, laci uang, dan sinkronisasi data dari server." },
    ],
  },
  en: {
    demoLabel: "Watch the Demo",
    tabMobile: "Phone",
    tabTablet: "Tablet",
    mobile: ["Sign in", "Home", "Register", "Orders", "Payment"],
    tablet: [
      { label: "Register (grid)", description: "An uncluttered counter screen, with a picture grid for spotting items fast." },
      { label: "Register (list)", description: "The list view, for when SKUs and stock levels matter more than pictures." },
      { label: "Transaction history", description: "The day's sales, their payment status, and refunds — handled on the device." },
      { label: "Shift management", description: "An accurate cash summary at the end of every session, so the drawer always reconciles." },
      { label: "Device settings", description: "Where the thermal printer, cash drawer, and syncing are configured." },
    ],
  },
  ms: {
    demoLabel: "Tonton Demo",
    tabMobile: "Telefon",
    tabTablet: "Tablet",
    mobile: ["Log masuk", "Laman utama", "Kaunter", "Pesanan", "Bayaran"],
    tablet: [
      { label: "Kaunter (grid)", description: "Skrin kaunter yang kemas, dengan grid bergambar untuk mengenal pasti item dengan pantas." },
      { label: "Kaunter (senarai)", description: "Paparan senarai, untuk waktu SKU dan baki stok lebih penting daripada gambar." },
      { label: "Sejarah transaksi", description: "Jualan hari itu, status bayarannya, dan bayaran balik — diuruskan terus pada peranti." },
      { label: "Pengurusan syif", description: "Ringkasan wang tunai yang tepat pada hujung setiap sesi, supaya laci sentiasa sepadan." },
      { label: "Tetapan peranti", description: "Tempat pencetak terma, laci duit, dan penyegerakan ditetapkan." },
    ],
  },
  ja: {
    demoLabel: "デモを見る",
    tabMobile: "スマホ",
    tabTablet: "タブレット",
    mobile: ["ログイン", "ホーム", "レジ", "注文", "会計"],
    tablet: [
      { label: "レジ（グリッド表示）", description: "余計なもののないレジ画面。写真つきのグリッドで、商品を素早く見つけられます。" },
      { label: "レジ（一覧表示）", description: "写真よりSKUや在庫数のほうが大事なときのための一覧表示です。" },
      { label: "会計履歴", description: "その日の売上、支払い状況、返金まで、端末のうえで完結します。" },
      { label: "シフト管理", description: "各シフトの終わりに正確な現金の集計が出るので、レジの中身がいつも合います。" },
      { label: "端末の設定", description: "サーマルプリンター、キャッシュドロア、同期の設定はここで行います。" },
    ],
  },
};

export function getScreenshots(locale: Locale) {
  const copy = pick(copyByLocale, locale);
  return {
    demoLabel: copy.demoLabel,
    tabMobile: copy.tabMobile,
    tabTablet: copy.tabTablet,
    mobile: MOBILE_SRC.map((src, i) => ({ src, label: copy.mobile[i] })) as Shot[],
    tablet: TABLET_SRC.map((src, i) => ({ src, ...copy.tablet[i] })) as Shot[],
  };
}
