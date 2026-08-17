import {
    FiActivity,
    FiBell,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiGrid,
    FiLayers,
    FiPrinter,
    FiSettings,
    FiShield,
    FiShoppingCart,
    FiSmartphone,
    FiUsers,
    FiUserCheck,
    FiWifi,
} from "react-icons/fi";

import { IBenefit } from "@/types"
import { pick, type Locale } from "./localized";

/**
 * Ikon dan tangkapan layar dipisahkan dari teksnya.
 *
 * Keduanya sama persis di keempat bahasa, dan menyalinnya empat kali berarti
 * setiap penggantian gambar harus diingat di empat tempat — yang berarti cepat
 * atau lambat satu bahasa memakai gambar lama. Di sini bentuknya ditulis sekali,
 * teksnya empat kali, lalu keduanya disatukan berdasarkan urutan.
 */
const shape = [
    { imageSrc: "/images/tablet/Screenshot_1776574650.png", icons: [<FiGrid key="a" size={26} />, <FiShoppingCart key="b" size={26} />, <FiLayers key="c" size={26} />] },
    { imageSrc: "/images/tablet/Screenshot_1776574642.png", icons: [<FiSmartphone key="a" size={26} />, <FiShoppingCart key="b" size={26} />, <FiBell key="c" size={26} />, <FiCheckCircle key="d" size={26} />] },
    { imageSrc: "/images/tablet/Screenshot_1776574482.png", icons: [<FiActivity key="a" size={26} />, <FiUsers key="b" size={26} />, <FiUserCheck key="c" size={26} />, <FiShield key="d" size={26} />] },
    { imageSrc: "/images/tablet/Screenshot_1776574679.png", icons: [<FiFileText key="a" size={26} />, <FiClock key="b" size={26} />] },
    { imageSrc: "/images/tablet/Screenshot_1776574686.png", icons: [<FiPrinter key="a" size={26} />, <FiWifi key="b" size={26} />, <FiSettings key="c" size={26} />] },
];

type BenefitCopy = {
    title: string;
    description: string;
    bullets: { title: string; description: string }[];
};

const copyByLocale: Record<Locale, BenefitCopy[]> = {
    id: [
        {
            title: "Tampilan POS yang Modern & Cepat",
            description: "Dirancang untuk kecepatan transaksi harian. Kasir bisa melayani lebih banyak pelanggan tanpa antrian panjang.",
            bullets: [
                { title: "Grid & List View Produk", description: "Tampilkan produk dalam Grid bergambar untuk visual yang menarik, atau List untuk detail SKU dan stok yang lebih lengkap." },
                { title: "Tipe Order: Dine-in, Take Away & Delivery", description: "Satu aplikasi untuk semua jenis layanan. Pisahkan pesanan meja, bawa pulang, dan delivery tanpa ribet." },
                { title: "Metode Pembayaran Fleksibel", description: "Terima pembayaran tunai atau non-tunai sesuai metode yang dikonfigurasi oleh pemilik bisnis — tunai, QRIS, kartu, maupun transfer." },
            ],
        },
        {
            title: "Pesan via QR — Scan-to-Order (Pro)",
            description: "Tempel QR di tiap meja. Pelanggan scan, lihat menu lengkap dengan foto & harga, lalu pesan sendiri dari ponsel — tanpa unduh aplikasi. Pesanan langsung masuk ke kasir untuk dikonfirmasi. Fitur eksklusif paket Pro.",
            bullets: [
                { title: "Menu Digital per Meja", description: "Setiap meja punya QR unik. Pelanggan memindai untuk membuka menu real-time — harga, foto, varian, dan add-on selalu sesuai katalog terbaru Anda." },
                { title: "Pesan Sendiri, Antrian Berkurang", description: "Pelanggan menyusun pesanan dari ponsel tanpa menunggu pelayan. Mengurangi antrian dan salah catat pesanan saat jam ramai." },
                { title: "Notifikasi & Konfirmasi Kasir", description: "Pesanan masuk sebagai 'menunggu konfirmasi' dengan badge & notifikasi di kasir (web & aplikasi). Kasir tinggal tekan 'Terima'; pembayaran tetap di kasir." },
                { title: "Cetak QR Sekali, Pakai Selamanya", description: "Generate & cetak QR tiap meja dari Web Admin. Bisa dibuat ulang kapan saja bila perlu diganti — QR lama otomatis nonaktif." },
            ],
        },
        {
            title: "Manajemen Shift, Kas & Absensi Karyawan",
            description: "Tidak ada lagi selisih kas yang membingungkan. Setiap rupiah tercatat otomatis dari buka hingga tutup toko — dan kehadiran karyawan terpantau langsung.",
            bullets: [
                { title: "Rekap Kas Otomatis per Shift", description: "Total penjualan, refund, kas masuk, dan kas keluar dihitung otomatis. Bandingkan dengan uang fisik di laci untuk laporan yang akurat." },
                { title: "Multi-Kasir, Satu Akun", description: "Tetapkan PIN unik untuk setiap kasir. Lacak performa dan aktivitas setiap karyawan secara terpisah." },
                { title: "Absensi Karyawan (Clock-in / Clock-out)", description: "Tablet kasir berfungsi ganda sebagai kiosk absensi. Karyawan cukup memilih nama dan memasukkan PIN untuk mencatat kehadiran — tanpa aplikasi tambahan." },
                { title: "Verifikasi PIN Supervisor", description: "Tindakan sensitif seperti void transaksi membutuhkan persetujuan supervisor — keamanan berlapis tanpa birokrasi." },
            ],
        },
        {
            title: "Riwayat Transaksi Lengkap & Kelola Refund",
            description: "Temukan transaksi mana pun dalam hitungan detik. Proses refund dan pembatalan dengan prosedur yang tercatat rapi.",
            bullets: [
                { title: "Cari & Filter Transaksi Instan", description: "Cari berdasarkan nomor bill, nama pelanggan, atau status pembayaran. Semua riwayat tersimpan dan bisa difilter kapan saja." },
                { title: "Proses Refund & Void Terpandu", description: "Tangani pengembalian uang dan pembatalan pesanan dengan alur yang jelas, disertai catatan alasan untuk audit." },
            ],
        },
        {
            title: "Hardware Siap & Cloud Selalu Terkini",
            description: "Hubungkan perangkat pendukung dalam menit. Data tersinkronisasi otomatis sehingga Web Admin selalu menampilkan kondisi terkini.",
            bullets: [
                { title: "Printer Thermal Bluetooth / USB", description: "Cetak struk otomatis setelah transaksi selesai. Mendukung berbagai merek dan ukuran kertas printer thermal populer." },
                { title: "Sinkronisasi Real-time & Offline Mode", description: "Internet terputus? Kasir tetap jalan. Data tersinkronisasi otomatis ke server begitu koneksi kembali." },
                { title: "Pengaturan Terpusat dari Web Admin", description: "Atur menu, harga, promo, dan karyawan langsung dari browser — perubahan langsung tampil di semua perangkat kasir." },
            ],
        },
    ],
    en: [
        {
            title: "A Register Screen Built for Speed",
            description: "Designed around the rhythm of a busy counter, so the queue keeps moving instead of waiting on the software.",
            bullets: [
                { title: "Grid or list view", description: "Show products as a picture grid when staff recognise items by sight, or as a list when SKUs and stock levels matter more." },
                { title: "Dine-in, takeaway, and delivery", description: "One app for all three. Orders stay separated without anyone having to remember which is which." },
                { title: "Whatever payment methods you take", description: "Cash or cashless, set up the way your shop actually works — cash, QR, card, or bank transfer." },
            ],
        },
        {
            title: "QR Ordering — Scan to Order (Pro)",
            description: "Put a code on each table. Guests scan it, see the full menu with photos and prices, and order from their own phone — no app to download. The order arrives at the register for the cashier to confirm. Pro plan only.",
            bullets: [
                { title: "A digital menu per table", description: "Each table has its own code. Prices, photos, variants, and add-ons always match your current catalogue, because they come from it." },
                { title: "Guests order themselves", description: "No waiting to catch a server's eye. Fewer people queueing, and fewer orders lost in translation during the rush." },
                { title: "Nothing charges without you", description: "Orders arrive marked 'awaiting confirmation', with a badge and a notification on the register. The cashier taps Accept; payment still happens at the counter." },
                { title: "Print the code once", description: "Generate and print a code per table from Web Admin. Regenerate any time you need to — the old code stops working on its own." },
            ],
        },
        {
            title: "Shifts, Cash, and Staff Attendance",
            description: "The drawer stops being a mystery. Everything from opening float to closing count is recorded as it happens, and you can see who was on when.",
            bullets: [
                { title: "The shift totals itself", description: "Sales, refunds, cash in, and cash out are added up as you go. At closing you count the drawer and compare — that's the whole procedure." },
                { title: "Several cashiers, one account", description: "Give each person their own PIN. Their sales and actions are tracked separately without paying for extra accounts." },
                { title: "Clock in and out on the same tablet", description: "The register doubles as an attendance kiosk. Staff pick their name and enter a PIN — nothing extra to install." },
                { title: "Supervisor PIN on sensitive actions", description: "Voiding a sale asks for a supervisor's approval. A second pair of eyes where it matters, and nowhere it doesn't." },
            ],
        },
        {
            title: "Every Sale, Findable — and Refundable",
            description: "Pull up any transaction in seconds, and handle refunds and cancellations through a path that leaves a record.",
            bullets: [
                { title: "Search and filter instantly", description: "By bill number, customer name, or payment status. Nothing is archived out of reach." },
                { title: "Guided refunds and voids", description: "A clear flow for returning money or cancelling an order, with a reason recorded against it for later." },
            ],
        },
        {
            title: "Works With Your Hardware, and Without Wi-Fi",
            description: "Connect the equipment you already have in minutes, and keep selling when the connection drops.",
            bullets: [
                { title: "Bluetooth or USB thermal printers", description: "Receipts print themselves once the sale is settled. Works with the common thermal printer brands and paper sizes." },
                { title: "Offline mode, then automatic sync", description: "Internet down? The register keeps working. Everything uploads on its own the moment the connection returns." },
                { title: "Change it once, everywhere", description: "Set menus, prices, promotions, and staff from your browser — every register picks up the change." },
            ],
        },
    ],
    ms: [
        {
            title: "Skrin Kaunter yang Dibina untuk Kelajuan",
            description: "Direka mengikut rentak kaunter yang sibuk, supaya barisan terus bergerak dan bukan menunggu perisian.",
            bullets: [
                { title: "Paparan grid atau senarai", description: "Tunjukkan produk sebagai grid bergambar apabila pekerja mengenalinya secara pandang, atau senarai apabila SKU dan baki stok lebih penting." },
                { title: "Makan di sini, bungkus, dan penghantaran", description: "Satu aplikasi untuk ketiga-tiganya. Pesanan kekal berasingan tanpa sesiapa perlu mengingatnya." },
                { title: "Kaedah bayaran yang anda terima", description: "Tunai atau tanpa tunai, ditetapkan mengikut cara kedai anda sebenarnya berjalan — tunai, QR, kad, atau pindahan bank." },
            ],
        },
        {
            title: "Pesanan QR — Imbas untuk Pesan (Pro)",
            description: "Letakkan kod di setiap meja. Pelanggan mengimbasnya, melihat menu penuh berserta gambar dan harga, dan memesan dari telefon sendiri — tanpa memuat turun apa-apa. Pesanan sampai ke kaunter untuk disahkan. Hanya pada pelan Pro.",
            bullets: [
                { title: "Menu digital setiap meja", description: "Setiap meja ada kodnya sendiri. Harga, gambar, varian, dan tambahan sentiasa sepadan dengan katalog semasa anda." },
                { title: "Pelanggan pesan sendiri", description: "Tidak perlu menunggu pekerja lalu. Kurang orang beratur, dan kurang pesanan tersalah catat waktu sibuk." },
                { title: "Tiada apa-apa dicaj tanpa anda", description: "Pesanan masuk sebagai 'menunggu pengesahan' dengan pemberitahuan di kaunter. Juruwang menekan Terima; bayaran tetap di kaunter." },
                { title: "Cetak kod sekali sahaja", description: "Jana dan cetak kod setiap meja dari Web Admin. Boleh dijana semula bila-bila masa — kod lama berhenti berfungsi dengan sendirinya." },
            ],
        },
        {
            title: "Syif, Wang Tunai, dan Kehadiran Pekerja",
            description: "Laci duit tidak lagi menjadi teka-teki. Daripada wang permulaan hingga kiraan akhir, semuanya direkod sambil berjalan.",
            bullets: [
                { title: "Syif menjumlahkan dirinya sendiri", description: "Jualan, bayaran balik, wang masuk, dan wang keluar dijumlahkan sepanjang syif. Waktu tutup, anda kira laci dan bandingkan — itu sahaja prosedurnya." },
                { title: "Beberapa juruwang, satu akaun", description: "Beri setiap orang PIN masing-masing. Jualan dan tindakan mereka direkod berasingan tanpa bayaran akaun tambahan." },
                { title: "Daftar masuk dan keluar pada tablet sama", description: "Kaunter turut berfungsi sebagai kiosk kehadiran. Pekerja pilih nama dan masukkan PIN — tiada aplikasi tambahan." },
                { title: "PIN penyelia untuk tindakan sensitif", description: "Membatalkan jualan memerlukan kelulusan penyelia. Semakan kedua di tempat yang perlu sahaja." },
            ],
        },
        {
            title: "Setiap Jualan Boleh Dicari — dan Dikembalikan",
            description: "Cari mana-mana transaksi dalam beberapa saat, dan uruskan bayaran balik serta pembatalan melalui aliran yang meninggalkan rekod.",
            bullets: [
                { title: "Cari dan tapis serta-merta", description: "Mengikut nombor bil, nama pelanggan, atau status bayaran. Tiada apa-apa yang tersimpan di luar jangkauan." },
                { title: "Bayaran balik dan pembatalan berpandu", description: "Aliran yang jelas untuk memulangkan wang atau membatalkan pesanan, berserta sebab yang direkod untuk rujukan kemudian." },
            ],
        },
        {
            title: "Serasi Dengan Peranti Anda, dan Tanpa Wi-Fi",
            description: "Sambungkan peralatan sedia ada dalam beberapa minit, dan teruskan berniaga apabila talian terputus.",
            bullets: [
                { title: "Pencetak terma Bluetooth atau USB", description: "Resit dicetak sendiri sebaik jualan selesai. Serasi dengan jenama dan saiz kertas terma yang biasa digunakan." },
                { title: "Mod luar talian, kemudian segerak automatik", description: "Internet putus? Kaunter tetap berjalan. Semuanya dimuat naik sendiri sebaik talian kembali." },
                { title: "Ubah sekali, berubah di semua tempat", description: "Tetapkan menu, harga, promosi, dan pekerja dari pelayar — setiap kaunter menerima perubahannya." },
            ],
        },
    ],
    ja: [
        {
            title: "速さのために作られたレジ画面",
            description: "忙しいカウンターのテンポに合わせて設計しています。行列が止まる理由が、ソフトの待ち時間であってはいけません。",
            bullets: [
                { title: "グリッド表示とリスト表示", description: "見た目で商品を覚えているお店にはグリッド、SKUや在庫数が大事なお店にはリスト。切り替えるだけです。" },
                { title: "店内・お持ち帰り・デリバリー", description: "3つとも同じアプリで。誰かが覚えておかなくても、注文は自動的に区別されます。" },
                { title: "お店で使う支払い方法のまま", description: "現金でもキャッシュレスでも、いま実際に受け付けている方法をそのまま設定できます（現金・QR・カード・振込）。" },
            ],
        },
        {
            title: "QRオーダー — 読み取って注文（Pro）",
            description: "各テーブルにQRコードを置くだけ。お客様はそれを読み取り、写真と価格の付いたメニューを見て、ご自身のスマホから注文できます。アプリのインストールは不要です。注文はレジに届き、スタッフが承認します。Proプラン限定の機能です。",
            bullets: [
                { title: "テーブルごとのデジタルメニュー", description: "テーブルごとに固有のコード。価格・写真・バリエーション・トッピングは、いまの商品登録がそのまま反映されます。" },
                { title: "お客様ご自身で注文", description: "店員と目が合うのを待つ必要がありません。行列が減り、混雑時の聞き間違いも減ります。" },
                { title: "承認なしに会計は進みません", description: "注文は「承認待ち」としてレジに表示され、通知が届きます。スタッフが承認を押すだけ。お支払いは従来どおりレジで承ります。" },
                { title: "コードの印刷は一度きり", description: "管理画面からテーブルごとに生成・印刷できます。作り直せばいつでも差し替え可能で、古いコードは自動的に無効になります。" },
            ],
        },
        {
            title: "シフト・現金・勤怠",
            description: "レジの中身が「よく分からないもの」でなくなります。釣銭準備金から締めの現金確認まで、その場で記録されていきます。",
            bullets: [
                { title: "シフトは自動で集計されます", description: "売上・返金・入金・出金は営業中に積み上がっていきます。締めのときは現金を数えて突き合わせるだけ。それが手順のすべてです。" },
                { title: "スタッフ複数名、アカウントは1つ", description: "一人ひとりにPINを設定できます。追加のアカウント料金なしで、担当者ごとの売上と操作が記録されます。" },
                { title: "同じタブレットで出退勤", description: "レジがそのまま勤怠打刻機になります。名前を選んでPINを入力するだけ。別のアプリは要りません。" },
                { title: "重要な操作には責任者のPIN", description: "会計の取り消しには責任者の承認を求めます。必要なところにだけ、もうひとつの目を。" },
            ],
        },
        {
            title: "どの会計も、すぐ探せて、返金もできる",
            description: "過去の会計を数秒で呼び出せます。返金や取り消しも、記録が残る手順で行えます。",
            bullets: [
                { title: "その場で検索・絞り込み", description: "伝票番号、お客様名、支払い状況から。手の届かないところに追いやられる記録はありません。" },
                { title: "返金・取り消しのガイド付き手順", description: "返金や注文の取り消しを分かりやすい流れで。理由も一緒に記録され、あとから確認できます。" },
            ],
        },
        {
            title: "お手持ちの機器に対応、Wi-Fiが切れても止まりません",
            description: "すでにある機器を数分でつなげます。通信が切れても営業は続けられます。",
            bullets: [
                { title: "Bluetooth・USBのサーマルプリンター", description: "会計が終わればレシートは自動で印刷されます。一般的なサーマルプリンターの主要メーカー・用紙サイズに対応。" },
                { title: "オフラインでも動き、あとで自動同期", description: "通信が切れてもレジは動き続けます。回線が戻った瞬間に、こちらが何もしなくても送信されます。" },
                { title: "一度直せば、全台に反映", description: "メニュー・価格・販促・スタッフの設定はブラウザから。変更はすべてのレジ端末に届きます。" },
            ],
        },
    ],
};

export function getBenefits(locale: Locale): IBenefit[] {
    return pick(copyByLocale, locale).map((benefit, index) => ({
        title: benefit.title,
        description: benefit.description,
        imageSrc: shape[index].imageSrc,
        bullets: benefit.bullets.map((bullet, bulletIndex) => ({
            ...bullet,
            icon: shape[index].icons[bulletIndex],
        })),
    }));
}

/** @deprecated Pakai [getBenefits]. */
export const benefits: IBenefit[] = getBenefits('id');
