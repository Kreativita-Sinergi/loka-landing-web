// Isi bagian "Web Admin" — dipakai oleh komponen WebAdmin (section di beranda)
// dan halaman /web-admin.
//
// Daftar fitur di sini dipetakan langsung dari route yang benar-benar ada di
// loka-kasir-web (src/App.tsx), termasuk gerbang paketnya (PlanGate). Kalau ada
// route baru ditambahkan/dihapus di sana, perbarui juga daftar ini supaya
// halaman pemasaran tidak menjanjikan fitur yang tidak ada.

import { pick, type Locale } from "./localized";

export type Plan = "semua" | "pro";

export type WebAdminFeature = {
  name: string;
  desc: string;
  plan: Plan;
};

export type WebAdminGroup = {
  /** Nama ikon lucide-react, dipetakan di komponen. */
  icon: "chart" | "box" | "tag" | "users" | "heart" | "store";
  title: string;
  /** Masalah pemilik yang diselesaikan grup ini, bukan daftar fitur. */
  summary: string;
  features: WebAdminFeature[];
};

const detailsByLocale: Record<Locale, { eyebrow: string; title: string; description: string; includedNote: string }> = {
  id: {
    eyebrow: "Web Admin",
    title: "Pusat kendali pemilik, bukan sekadar tempat lihat laporan",
    description:
      "Kasir memakai aplikasi di toko. Anda sebagai pemilik memegang Web Admin di browser — dari laptop, PC, maupun tablet, tanpa perlu pasang apa pun. Semua yang diatur di sini langsung berlaku di semua terminal kasir Anda.",
    // Ditegaskan karena banyak calon pengguna mengira Web Admin dijual terpisah.
    includedNote:
      "Web Admin sudah termasuk di semua paket, termasuk masa gratis 30 hari. Akunnya sama dengan yang dipakai di aplikasi.",
  },
  en: {
    eyebrow: "Web Admin",
    title: "Where you run the business, not just where you read reports",
    description:
      "Your staff work the app at the counter. You keep Web Admin in a browser — laptop, desktop, or tablet, with nothing to install. Anything you change here reaches every register you own straight away.",
    includedNote:
      "Web Admin is included in every plan, the free 30 days included. It's the same account you use in the app.",
  },
  ms: {
    eyebrow: "Web Admin",
    title: "Tempat anda menguruskan perniagaan, bukan sekadar membaca laporan",
    description:
      "Pekerja anda menggunakan aplikasi di kaunter. Anda memegang Web Admin dalam pelayar — komputer riba, PC, atau tablet, tanpa perlu memasang apa-apa. Apa sahaja yang anda ubah di sini sampai ke setiap kaunter dengan serta-merta.",
    includedNote:
      "Web Admin disertakan dalam semua pelan, termasuk tempoh percuma 30 hari. Ia menggunakan akaun yang sama seperti dalam aplikasi.",
  },
  ja: {
    eyebrow: "管理画面",
    title: "レポートを見る場所ではなく、お店を動かす場所です",
    description:
      "スタッフは店頭でアプリを使い、オーナーはブラウザで管理画面を使います。ノートPCでもデスクトップでもタブレットでも、インストールは不要です。ここでの変更は、すべてのレジ端末にすぐ反映されます。",
    includedNote:
      "管理画面はすべてのプランに含まれています（30日間の無料期間中も同様）。アプリと同じアカウントでご利用いただけます。",
  },
};

export const getWebAdmin = (locale: Locale) => ({
  ...pick(detailsByLocale, locale),
  url: "https://app.lokakasir.id",
});

/** @deprecated Pakai [getWebAdmin]. */
export const webAdminDetails = getWebAdmin('id');

// Tangkapan layar Web Admin. Selama array ini kosong, galerinya tidak dirender
// sama sekali — jadi halaman tidak pernah menampilkan bingkai gambar kosong.
//
// Cara menambah: simpan file ke `public/images/web-admin/`, lalu daftarkan di
// sini. Pakai lebar 1600px, dan pastikan datanya data contoh — bukan data
// pelanggan asli.
export const webAdminScreenshots: {
  src: string;
  alt: string;
  caption: string;
}[] = [];

/**
 * Ikon dan gerbang paket dipisahkan dari teksnya: keduanya keputusan produk,
 * bukan copy, dan harus sama persis di semua bahasa. Kalau "Untung per produk"
 * berlabel Pro di halaman Indonesia tetapi tidak di halaman Jepang, salah
 * satunya berbohong tentang apa yang dibeli pelanggan.
 */
const groupShape: { icon: WebAdminGroup["icon"]; plans: Plan[] }[] = [
  { icon: "chart", plans: ["semua", "pro", "pro", "pro", "pro"] },
  { icon: "box", plans: ["semua", "pro", "pro", "pro", "pro"] },
  { icon: "tag", plans: ["semua", "semua", "semua", "semua", "pro"] },
  { icon: "users", plans: ["semua", "semua", "semua", "semua", "pro"] },
  { icon: "heart", plans: ["pro", "semua", "pro"] },
  { icon: "store", plans: ["semua", "semua", "pro", "semua", "semua"] },
];

type GroupCopy = { title: string; summary: string; features: [string, string][] };

const groupsByLocale: Record<Locale, GroupCopy[]> = {
  id: [
    {
      title: "Laporan & Keuangan",
      summary: "Tahu untung-rugi yang sebenarnya, bukan sekadar total penjualan harian.",
      features: [
        ["Dashboard ringkasan", "Penjualan hari ini, transaksi berjalan, dan tren terbaru dalam satu layar."],
        ["Laporan keuangan", "Pemasukan, pengeluaran, dan arus kas per outlet maupun gabungan."],
        ["Laporan penjualan", "Bedah penjualan per periode, produk, kategori, kasir, dan metode bayar."],
        ["Untung per produk", "Margin tiap produk dihitung dari HPP — ketahuan mana yang laris tapi tipis untungnya."],
        ["Saran harga", "Usulan penyesuaian harga jual berdasarkan biaya dan margin yang Anda targetkan."],
      ],
    },
    {
      title: "Stok & Pembelian",
      summary: "Stok tidak lagi ditebak-tebak, dan belanja ke supplier ada jejaknya.",
      features: [
        ["Stok saat ini", "Posisi stok tiap produk per outlet, lengkap dengan peringatan stok menipis."],
        ["Keluar-masuk stok", "Riwayat setiap pergerakan stok beserta siapa yang mengubahnya."],
        ["Transfer stok antar outlet", "Pindahkan barang antar cabang dengan catatan yang rapi di kedua sisi."],
        ["Bahan baku & resep", "Stok bahan berkurang otomatis mengikuti resep tiap menu yang terjual."],
        ["Supplier & pesanan pembelian", "Data supplier dan PO — dari pesan, terima barang, sampai stok bertambah."],
      ],
    },
    {
      title: "Produk & Katalog",
      summary: "Ubah harga sekali di sini, semua terminal kasir langsung ikut berubah.",
      features: [
        ["Produk, varian & add-on", "Kelola katalog lengkap dengan foto, SKU, harga, dan pilihan tambahan."],
        ["Kategori, brand, satuan", "Rapikan struktur katalog supaya laporan ikut rapi."],
        ["Diskon & promo", "Atur potongan harga yang otomatis muncul di kasir."],
        ["Pajak & biaya layanan", "Konfigurasi PPN atau service charge sesuai aturan toko Anda."],
        ["Menu publik QR", "Menu digital yang dibuka pelanggan lewat QR di meja — isinya ikut katalog ini."],
      ],
    },
    {
      title: "Karyawan & Hak Akses",
      summary: "Beri akses seperlunya, dan tetap tahu siapa mengubah apa saat Anda tidak di toko.",
      features: [
        ["Karyawan & peran", "Tambah kasir, supervisor, atau admin dengan hak akses berbeda."],
        ["Pengaturan izin (RBAC)", "Tentukan detail siapa boleh refund, ubah harga, atau lihat laporan."],
        ["Audit log", "Catatan perubahan penting — jejaknya tidak bisa dihapus karyawan."],
        ["Kasbon karyawan", "Catat pinjaman karyawan dan potongannya tanpa buku tulis terpisah."],
        ["Absensi", "Rekap clock-in/clock-out karyawan dari aplikasi kasir."],
      ],
    },
    {
      title: "Pelanggan & Loyalitas",
      summary: "Pelanggan lama kembali lagi, tanpa perlu aplikasi member terpisah.",
      features: [
        ["Data pelanggan", "Riwayat belanja tiap pelanggan, tersimpan otomatis dari transaksi kasir."],
        ["Membership", "Kelompokkan pelanggan menjadi member dengan perlakuan khusus."],
        ["Poin loyalitas", "Atur perolehan dan penukaran poin — perhitungannya jalan sendiri di kasir."],
      ],
    },
    {
      title: "Outlet, Perangkat & Transaksi",
      summary: "Pegang beberapa cabang dari satu akun, dan awasi kas tiap shift dari jauh.",
      features: [
        ["Multi-outlet", "Tambah cabang baru dan bandingkan performanya berdampingan."],
        ["Terminal kasir", "Daftarkan dan pantau perangkat kasir mana saja yang aktif."],
        ["Meja & denah ruangan", "Susun tata meja resto yang dipakai kasir dan menu QR."],
        ["Shift & rekap kas", "Lihat pembukaan, penutupan, dan selisih kas tiap shift dari mana saja."],
        ["Transaksi & refund", "Telusuri seluruh riwayat transaksi dan proses refund dengan jejak lengkap."],
      ],
    },
  ],
  en: [
    {
      title: "Reports & Finances",
      summary: "See what you actually made, not just what came through the till.",
      features: [
        ["Summary dashboard", "Today's sales, sales in progress, and the recent trend on one screen."],
        ["Financial reports", "Money in, money out, and cash flow per outlet or all together."],
        ["Sales reports", "Break sales down by period, product, category, cashier, and payment method."],
        ["Profit per product", "Margins worked out from cost — so you can spot the item that sells constantly and earns almost nothing."],
        ["Price suggestions", "Proposed prices based on your costs and the margin you're aiming for."],
      ],
    },
    {
      title: "Stock & Purchasing",
      summary: "Stock stops being guesswork, and what you buy from suppliers leaves a trail.",
      features: [
        ["Current stock", "Where every product stands per outlet, with a warning before you run out."],
        ["Stock movements", "Every increase and decrease, and who made it."],
        ["Transfers between outlets", "Move goods between branches with matching records on both sides."],
        ["Raw materials & recipes", "Ingredients come down automatically as the dishes that use them sell."],
        ["Suppliers & purchase orders", "Supplier records and POs — ordering, receiving, and stock going up."],
      ],
    },
    {
      title: "Products & Catalogue",
      summary: "Change a price once here, and every register has it.",
      features: [
        ["Products, variants & add-ons", "The full catalogue with photos, SKUs, prices, and options."],
        ["Categories, brands, units", "Keep the structure tidy, and the reports come out tidy too."],
        ["Discounts & promotions", "Set them here; they appear at the register on their own."],
        ["Tax & service charge", "Configure tax or service charge the way your shop actually charges it."],
        ["Public QR menu", "The menu guests open from the table code — it reads from this same catalogue."],
      ],
    },
    {
      title: "Staff & Permissions",
      summary: "Give people only what they need, and still know who changed what while you were out.",
      features: [
        ["Staff & roles", "Add cashiers, supervisors, or admins with different levels of access."],
        ["Permission settings", "Decide precisely who can refund, change a price, or open the reports."],
        ["Audit log", "A record of the changes that matter — one staff can't erase."],
        ["Staff advances", "Record loans to staff and their repayments without a separate notebook."],
        ["Attendance", "Clock-in and clock-out records collected from the register app."],
      ],
    },
    {
      title: "Customers & Loyalty",
      summary: "Regulars come back, without asking them to install a membership app.",
      features: [
        ["Customer records", "Each customer's purchase history, saved from ordinary sales as they happen."],
        ["Membership", "Group customers into tiers that get treated differently at the counter."],
        ["Loyalty points", "Set how points are earned and spent — the register does the arithmetic."],
      ],
    },
    {
      title: "Outlets, Devices & Transactions",
      summary: "Hold several branches under one account, and watch each shift's cash from anywhere.",
      features: [
        ["Multiple outlets", "Add a branch and compare it against the others side by side."],
        ["Register terminals", "Register devices and see which ones are currently active."],
        ["Tables & floor plan", "Lay out the room once; the register and the QR menu both use it."],
        ["Shifts & cash counts", "Opening, closing, and any discrepancy for every shift, from wherever you are."],
        ["Transactions & refunds", "Search the whole history and process refunds with a full record."],
      ],
    },
  ],
  ms: [
    {
      title: "Laporan & Kewangan",
      summary: "Lihat berapa yang anda betul-betul untung, bukan sekadar jumlah masuk laci.",
      features: [
        ["Papan pemuka ringkasan", "Jualan hari ini, jualan yang sedang berjalan, dan aliran terkini dalam satu skrin."],
        ["Laporan kewangan", "Wang masuk, wang keluar, dan aliran tunai bagi setiap cawangan atau kesemuanya."],
        ["Laporan jualan", "Pecahkan jualan mengikut tempoh, produk, kategori, juruwang, dan kaedah bayaran."],
        ["Untung setiap produk", "Margin dikira daripada kos — jadi anda nampak barang yang laris tetapi hampir tiada untung."],
        ["Cadangan harga", "Harga yang dicadangkan berdasarkan kos anda dan margin yang anda sasarkan."],
      ],
    },
    {
      title: "Stok & Pembelian",
      summary: "Stok bukan lagi tekaan, dan pembelian daripada pembekal meninggalkan rekod.",
      features: [
        ["Stok semasa", "Kedudukan setiap produk bagi setiap cawangan, dengan amaran sebelum kehabisan."],
        ["Pergerakan stok", "Setiap tambah dan tolak, berserta siapa yang melakukannya."],
        ["Pemindahan antara cawangan", "Pindahkan barang antara cawangan dengan rekod yang sepadan di kedua-dua belah."],
        ["Bahan mentah & resipi", "Bahan berkurang secara automatik apabila hidangan yang menggunakannya terjual."],
        ["Pembekal & pesanan belian", "Rekod pembekal dan PO — daripada memesan, menerima, hinggalah stok bertambah."],
      ],
    },
    {
      title: "Produk & Katalog",
      summary: "Ubah harga sekali di sini, semua kaunter terus mengikutinya.",
      features: [
        ["Produk, varian & tambahan", "Katalog penuh berserta gambar, SKU, harga, dan pilihan tambahan."],
        ["Kategori, jenama, unit", "Kemaskan strukturnya, laporan pun keluar kemas."],
        ["Diskaun & promosi", "Tetapkan di sini; ia muncul di kaunter dengan sendirinya."],
        ["Cukai & caj perkhidmatan", "Tetapkan cukai atau caj perkhidmatan mengikut cara kedai anda mengenakannya."],
        ["Menu QR awam", "Menu yang dibuka pelanggan daripada kod di meja — ia membaca katalog yang sama."],
      ],
    },
    {
      title: "Pekerja & Kebenaran",
      summary: "Beri akses seperlunya, dan tetap tahu siapa mengubah apa semasa anda tiada.",
      features: [
        ["Pekerja & peranan", "Tambah juruwang, penyelia, atau pentadbir dengan tahap akses berbeza."],
        ["Tetapan kebenaran", "Tentukan dengan tepat siapa boleh membuat bayaran balik, menukar harga, atau membuka laporan."],
        ["Log audit", "Rekod perubahan penting — yang tidak boleh dipadam pekerja."],
        ["Pendahuluan pekerja", "Rekod pinjaman pekerja dan potongannya tanpa buku berasingan."],
        ["Kehadiran", "Rekod daftar masuk dan keluar yang dikumpul daripada aplikasi kaunter."],
      ],
    },
    {
      title: "Pelanggan & Kesetiaan",
      summary: "Pelanggan tetap kembali, tanpa perlu memasang aplikasi keahlian berasingan.",
      features: [
        ["Rekod pelanggan", "Sejarah pembelian setiap pelanggan, disimpan daripada jualan biasa."],
        ["Keahlian", "Kumpulkan pelanggan mengikut peringkat yang dilayan berbeza di kaunter."],
        ["Mata kesetiaan", "Tetapkan cara mata dikumpul dan ditebus — kiraannya dibuat di kaunter."],
      ],
    },
    {
      title: "Cawangan, Peranti & Transaksi",
      summary: "Pegang beberapa cawangan dalam satu akaun, dan pantau wang setiap syif dari mana-mana.",
      features: [
        ["Berbilang cawangan", "Tambah cawangan dan bandingkannya bersebelahan."],
        ["Terminal kaunter", "Daftarkan peranti dan lihat yang mana sedang aktif."],
        ["Meja & pelan lantai", "Susun ruang sekali; kaunter dan menu QR kedua-duanya menggunakannya."],
        ["Syif & kiraan tunai", "Pembukaan, penutupan, dan sebarang perbezaan bagi setiap syif, dari mana-mana."],
        ["Transaksi & bayaran balik", "Cari seluruh sejarah dan proses bayaran balik dengan rekod penuh."],
      ],
    },
  ],
  ja: [
    {
      title: "レポートと会計",
      summary: "レジを通った金額ではなく、実際にいくら残ったのかが分かります。",
      features: [
        ["サマリーダッシュボード", "本日の売上、進行中の会計、直近の推移をひと画面で。"],
        ["収支レポート", "入金・出金・資金の流れを、店舗ごとにも全体でも。"],
        ["売上レポート", "期間・商品・カテゴリー・担当者・支払い方法で売上を分解できます。"],
        ["商品別の利益", "原価から粗利を算出。よく売れているのにほとんど利益が残らない商品も見えてきます。"],
        ["価格の提案", "原価と目標としている利益率をもとに、販売価格を提案します。"],
      ],
    },
    {
      title: "在庫と仕入れ",
      summary: "在庫が勘に頼るものでなくなり、仕入れにも記録が残ります。",
      features: [
        ["現在の在庫", "店舗ごとの各商品の在庫数。切らす前にお知らせします。"],
        ["在庫の増減履歴", "増えたぶんも減ったぶんも、誰が動かしたかまで残ります。"],
        ["店舗間の在庫移動", "店舗のあいだで商品を移動し、双方に記録を残します。"],
        ["原材料とレシピ", "レシピに沿って、商品が売れたぶんだけ材料が自動的に減ります。"],
        ["仕入先と発注書", "仕入先の管理と発注書。発注から入荷、在庫の反映まで。"],
      ],
    },
    {
      title: "商品とカタログ",
      summary: "価格をここで一度直せば、すべてのレジに反映されます。",
      features: [
        ["商品・バリエーション・トッピング", "写真、SKU、価格、オプションを含む商品情報の管理。"],
        ["カテゴリー・ブランド・単位", "分類を整えておくと、レポートも整った形で出てきます。"],
        ["割引と販促", "ここで設定すれば、レジ側には自動的に表示されます。"],
        ["税と サービス料", "実際のお店の請求方法に合わせて設定できます。"],
        ["QR公開メニュー", "テーブルのQRからお客様が開くメニュー。同じ商品情報を読んでいます。"],
      ],
    },
    {
      title: "スタッフと権限",
      summary: "必要な範囲だけを渡し、席を外していても誰が何を変えたか分かります。",
      features: [
        ["スタッフと役割", "レジ担当・責任者・管理者を、それぞれ異なる権限で追加できます。"],
        ["権限の詳細設定", "返金できる人、価格を変えられる人、レポートを開ける人を個別に指定。"],
        ["操作ログ", "重要な変更の記録。スタッフの側からは消せません。"],
        ["スタッフへの立替・貸付", "貸付と返済を、別のノートを用意せずに記録できます。"],
        ["勤怠", "レジアプリで打刻した出退勤の記録をまとめて確認できます。"],
      ],
    },
    {
      title: "顧客とリピート施策",
      summary: "会員アプリを入れてもらわなくても、常連のお客様が戻ってきます。",
      features: [
        ["顧客情報", "普段の会計から、お客様ごとの購入履歴が自動的に貯まります。"],
        ["会員区分", "お客様をランク分けし、レジでの扱いを変えられます。"],
        ["ポイント", "付与と利用のルールを決めれば、計算はレジ側で行われます。"],
      ],
    },
    {
      title: "店舗・端末・会計履歴",
      summary: "複数店舗をひとつのアカウントで持ち、各シフトの現金を離れた場所から確認できます。",
      features: [
        ["多店舗管理", "店舗を追加し、ほかの店舗と並べて比較できます。"],
        ["レジ端末", "端末を登録し、いまどれが稼働しているかを確認できます。"],
        ["テーブルとフロア図", "一度並べておけば、レジもQRメニューも同じ配置を使います。"],
        ["シフトと現金の締め", "各シフトの開始・終了・差異を、どこからでも確認できます。"],
        ["会計履歴と返金", "履歴全体を検索でき、返金も記録を残したまま処理できます。"],
      ],
    },
  ],
};

export function getWebAdminGroups(locale: Locale): WebAdminGroup[] {
  return pick(groupsByLocale, locale).map((group, index) => ({
    icon: groupShape[index].icon,
    title: group.title,
    summary: group.summary,
    features: group.features.map(([name, desc], featureIndex) => ({
      name,
      desc,
      plan: groupShape[index].plans[featureIndex],
    })),
  }));
}

/** @deprecated Pakai [getWebAdminGroups]. */
export const webAdminGroups: WebAdminGroup[] = getWebAdminGroups('id');

// Label paket yang ditampilkan sebagai badge. "semua" sengaja tidak diberi
// badge di UI supaya yang menonjol hanya fitur berbayar.
const planLabelsByLocale: Record<Locale, Record<Plan, string>> = {
  id: { semua: "Semua paket", pro: "Pro" },
  en: { semua: "All plans", pro: "Pro" },
  ms: { semua: "Semua pelan", pro: "Pro" },
  ja: { semua: "全プラン", pro: "Pro" },
};

export const getPlanLabels = (locale: Locale) => pick(planLabelsByLocale, locale);

/** @deprecated Pakai [getPlanLabels]. */
export const planLabels: Record<Plan, string> = planLabelsByLocale.id;

/**
 * Teks halaman `/web-admin`.
 *
 * Sebelumnya seluruhnya menempel di JSX halaman itu, yang berarti halaman
 * tersebut tidak bisa berbahasa apa pun selain Indonesia tanpa menyalin
 * markup-nya empat kali. Diangkat ke sini supaya nasibnya sama dengan konten
 * lain: satu bentuk, empat isi.
 */
type WebAdminPageCopy = {
  metaTitle: string;
  metaDescription: string;
  openButton: string;
  noAccountPrefix: string;
  signUpNote: string;
  roles: { title: string; who: string; points: string[] }[];
  noInstallTitle: string;
  noInstallBody: string;
  featuresHeading: string;
  featuresNoteLead: string;
  featuresNoteTail: string;
  crossSellTitle: string;
  crossSellBody: string;
  includedTitle: string;
  seePricing: string;
  backHome: string;
};

const pageCopyByLocale: Record<Locale, WebAdminPageCopy> = {
  id: {
    metaTitle: "Web Admin — Kelola Kasir, Stok & Laporan dari Browser",
    metaDescription:
      "Web Admin Loka Kasir: laporan keuangan, untung per produk, stok & pembelian, karyawan dan hak akses, pelanggan, sampai multi-outlet — dibuka dari browser tanpa instalasi. Sudah termasuk di semua paket.",
    openButton: "Buka Web Admin",
    noAccountPrefix: "Belum punya akun?",
    signUpNote:
      "Pendaftaran bisa dilakukan langsung di sini lewat browser, atau dari aplikasi kasirnya — akunnya sama, tinggal login di mana pun.",
    roles: [
      {
        title: "Aplikasi Kasir",
        who: "Dipakai kasir & pelayan di toko",
        points: [
          "Login cepat pakai PIN 4 angka",
          "Proses order, bayar, dan cetak struk",
          "Buka/tutup shift dan hitung kas laci",
          "Tetap jalan saat internet mati",
        ],
      },
      {
        title: "Web Admin",
        who: "Dipegang pemilik & supervisor",
        points: [
          "Lihat laporan dan untung-rugi kapan saja",
          "Atur produk, harga, stok, dan promo",
          "Kelola karyawan beserta hak aksesnya",
          "Pantau semua outlet dari satu layar",
        ],
      },
    ],
    noInstallTitle: "Tidak perlu dipasang",
    noInstallBody:
      "Web Admin dibuka lewat browser apa pun — Chrome, Edge, Safari, atau Firefox — di laptop, PC, maupun tablet. Tidak ada aplikasi tambahan, tidak ada pembaruan yang perlu Anda urus.",
    featuresHeading: "Semua yang bisa Anda kerjakan di Web Admin",
    featuresNoteLead: "Fitur tanpa label tersedia di semua paket. Label ",
    featuresNoteTail:
      " menandai fitur yang mengikuti paket berlangganan — semuanya bisa dicoba gratis selama 30 hari pertama.",
    crossSellTitle: "Untuk melayani pembeli, pakai aplikasi kasirnya",
    crossSellBody:
      "Web Admin mengurus sisi pengelolaan. Transaksi di depan pembeli dikerjakan lewat aplikasi kasir di HP/tablet Android atau PC/laptop Windows — akunnya sama dengan yang ini.",
    includedTitle: "Sudah termasuk, tidak dijual terpisah",
    seePricing: "Lihat paket & harga",
    backHome: "← Kembali ke beranda",
  },
  en: {
    metaTitle: "Web Admin — Run Your Shop From the Browser",
    metaDescription:
      "Loka Kasir Web Admin: financial reports, profit per product, stock and purchasing, staff and permissions, customers, and multiple outlets — in any browser, with nothing to install. Included in every plan.",
    openButton: "Open Web Admin",
    noAccountPrefix: "No account yet?",
    signUpNote:
      "You can sign up right here in the browser, or from inside the register app — it's the same account, and you can log in from either.",
    roles: [
      {
        title: "Register App",
        who: "Used by staff at the counter",
        points: [
          "Sign in with a 4-digit PIN",
          "Take orders, accept payment, print receipts",
          "Open and close shifts, count the drawer",
          "Keeps working when the internet doesn't",
        ],
      },
      {
        title: "Web Admin",
        who: "Kept by the owner and supervisors",
        points: [
          "Read reports and profit whenever you want",
          "Set products, prices, stock, and promotions",
          "Manage staff and what each of them can do",
          "Watch every outlet from one screen",
        ],
      },
    ],
    noInstallTitle: "Nothing to install",
    noInstallBody:
      "Web Admin opens in any browser — Chrome, Edge, Safari, Firefox — on a laptop, desktop, or tablet. No extra app, and no updates for you to keep track of.",
    featuresHeading: "Everything you can do in Web Admin",
    featuresNoteLead: "Features without a label are on every plan. A ",
    featuresNoteTail:
      " label means the feature follows your subscription — and all of them are open during the free 30 days.",
    crossSellTitle: "Serving customers happens in the register app",
    crossSellBody:
      "Web Admin is the management side. The counter itself runs on the register app — Android phone or tablet, or a Windows PC — using this same account.",
    includedTitle: "Included, never sold separately",
    seePricing: "See plans & pricing",
    backHome: "← Back to home",
  },
  ms: {
    metaTitle: "Web Admin — Uruskan Kedai Anda dari Pelayar",
    metaDescription:
      "Web Admin Loka Kasir: laporan kewangan, untung setiap produk, stok dan pembelian, pekerja dan kebenaran, pelanggan, serta berbilang cawangan — dalam mana-mana pelayar, tanpa perlu memasang apa-apa. Disertakan dalam semua pelan.",
    openButton: "Buka Web Admin",
    noAccountPrefix: "Belum ada akaun?",
    signUpNote:
      "Anda boleh mendaftar terus di sini dalam pelayar, atau dari dalam aplikasi kaunter — akaunnya sama, dan anda boleh log masuk daripada mana-mana.",
    roles: [
      {
        title: "Aplikasi Kaunter",
        who: "Digunakan pekerja di kedai",
        points: [
          "Log masuk dengan PIN 4 angka",
          "Ambil pesanan, terima bayaran, cetak resit",
          "Buka dan tutup syif, kira wang di laci",
          "Terus berjalan walaupun internet tiada",
        ],
      },
      {
        title: "Web Admin",
        who: "Dipegang pemilik dan penyelia",
        points: [
          "Baca laporan dan untung bila-bila masa",
          "Tetapkan produk, harga, stok, dan promosi",
          "Urus pekerja dan apa yang boleh mereka buat",
          "Pantau setiap cawangan dari satu skrin",
        ],
      },
    ],
    noInstallTitle: "Tiada apa-apa untuk dipasang",
    noInstallBody:
      "Web Admin dibuka dalam mana-mana pelayar — Chrome, Edge, Safari, Firefox — pada komputer riba, PC, atau tablet. Tiada aplikasi tambahan, dan tiada kemas kini yang perlu anda uruskan.",
    featuresHeading: "Semua yang boleh anda lakukan di Web Admin",
    featuresNoteLead: "Ciri tanpa label ada pada semua pelan. Label ",
    featuresNoteTail:
      " bermakna ciri itu mengikut langganan anda — dan kesemuanya terbuka sepanjang 30 hari percuma.",
    crossSellTitle: "Melayan pelanggan dilakukan dalam aplikasi kaunter",
    crossSellBody:
      "Web Admin ialah bahagian pengurusan. Kaunternya sendiri berjalan pada aplikasi kaunter — telefon atau tablet Android, atau PC Windows — menggunakan akaun yang sama.",
    includedTitle: "Disertakan, bukan dijual berasingan",
    seePricing: "Lihat pelan & harga",
    backHome: "← Kembali ke laman utama",
  },
  ja: {
    metaTitle: "管理画面 — ブラウザからお店を動かす",
    metaDescription:
      "Loka Kasir の管理画面：収支レポート、商品別の利益、在庫と仕入れ、スタッフと権限、顧客、多店舗管理まで。ブラウザだけで使え、インストールは不要です。すべてのプランに含まれます。",
    openButton: "管理画面を開く",
    noAccountPrefix: "アカウントをお持ちでないですか？",
    signUpNote:
      "このブラウザからでも、レジアプリからでも登録できます。アカウントは同じなので、どちらからでもログインできます。",
    roles: [
      {
        title: "レジアプリ",
        who: "店頭のスタッフが使います",
        points: [
          "4桁のPINでログイン",
          "注文、会計、レシートの印刷",
          "シフトの開始と締め、現金の確認",
          "通信が切れても動き続けます",
        ],
      },
      {
        title: "管理画面",
        who: "オーナーと責任者が使います",
        points: [
          "レポートと利益をいつでも確認",
          "商品・価格・在庫・販促の設定",
          "スタッフと、その権限の管理",
          "すべての店舗をひと画面で把握",
        ],
      },
    ],
    noInstallTitle: "インストールは不要です",
    noInstallBody:
      "管理画面は Chrome、Edge、Safari、Firefox など、どのブラウザからでも開けます。ノートPCでもデスクトップでもタブレットでも。追加のアプリはなく、更新作業もお客様側では発生しません。",
    featuresHeading: "管理画面でできること",
    featuresNoteLead: "ラベルのない機能はすべてのプランでお使いいただけます。",
    featuresNoteTail:
      " のラベルが付いた機能はご契約プランに応じたものですが、30日間の無料期間中はいずれもお試しいただけます。",
    crossSellTitle: "接客と会計は、レジアプリで",
    crossSellBody:
      "管理画面は運営側の道具です。お客様の前での会計は、Androidのスマホ・タブレット、またはWindows PCのレジアプリで行います。アカウントはこちらと同じです。",
    includedTitle: "料金に含まれています。別売りではありません",
    seePricing: "プランと料金を見る",
    backHome: "← トップページへ戻る",
  },
};

export const getWebAdminPage = (locale: Locale) => pick(pageCopyByLocale, locale);
