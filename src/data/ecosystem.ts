import { pick, type Locale } from "./localized";

/**
 * Isi dua kartu di bagian "Ekosistem": aplikasi kasir dan Web Admin.
 *
 * Sebelumnya seluruhnya menempel di dalam `Ecosystem.tsx`, dan itulah sebabnya
 * bagian ini tetap berbahasa Indonesia di halaman berbahasa Jepang meskipun
 * judul section-nya sudah diterjemahkan — teks yang tidak pernah melewati
 * `src/data/` tidak punya cara untuk berganti bahasa.
 *
 * Daftar butirnya sengaja berbeda dari daftar di halaman `/web-admin`: yang di
 * sini menjawab "apa bedanya dua benda ini", yang di sana menjawab "apa saja
 * yang bisa saya kerjakan". Keduanya tidak boleh disatukan hanya karena
 * sama-sama berupa daftar.
 */
type Card = {
  title: string;
  description: string;
  bullets: string[];
  note: string;
};

type Ecosystem = {
  app: Card;
  web: Card;
  openWebAdmin: string;
  seeFeatures: string;
};

const ecosystemByLocale: Record<Locale, Ecosystem> = {
  id: {
    app: {
      title: "Aplikasi Kasir",
      description:
        "Teman kerja kasir setiap hari. Transaksinya cepat, struk langsung tercetak, dan tutup shift jadi gampang.",
      bullets: [
        "Kasir cukup login pakai PIN 4 angka",
        "Tampilan kasir simpel, bisa mode grid atau daftar",
        "Melayani dine-in, take away, sampai delivery",
        "Pilihan pembayaran menyesuaikan toko Anda",
        "Cetak struk lewat printer Bluetooth atau USB",
        "Buka-tutup shift dan rekap kas otomatis",
        "Layar dapur (KDS) untuk memantau pesanan masuk",
        "Absen karyawan cukup clock-in dan clock-out",
        "Tetap jalan walau offline, sinkron sendiri saat online",
      ],
      note: "Tersedia untuk HP/tablet Android dan PC/laptop Windows. Pasang dari toko aplikasinya, lalu login dengan akun yang sama.",
    },
    web: {
      title: "Web Admin",
      description:
        "Tempat Anda memantau dan mengatur bisnis dari mana saja. Lihat laporan terbaru, urus stok, dan kelola karyawan.",
      bullets: [
        "Laporan keuangan yang selalu terbarui",
        "Lihat tren penjualan lengkap dengan grafiknya",
        "Atur produk, kategori, dan variannya",
        "Kelola stok, bisa sekaligus banyak item",
        "Pegang banyak outlet dari satu akun",
        "Atur karyawan beserta hak aksesnya",
        "Tata meja dan denah ruangan resto",
        "Lihat riwayat transaksi dan proses refund",
        "Atur outlet dan langganan Anda",
      ],
      note: "Dibuka lewat browser, tanpa instalasi. Sudah termasuk di semua paket dengan akun yang sama.",
    },
    openWebAdmin: "Buka Web Admin",
    seeFeatures: "Lihat fiturnya",
  },
  en: {
    app: {
      title: "Register App",
      description:
        "What your staff work with all day. Sales go through quickly, receipts print themselves, and closing the till stops being a chore.",
      bullets: [
        "Sign in with a 4-digit PIN",
        "A plain register screen — grid or list, whichever suits",
        "Dine-in, takeaway, and delivery in one place",
        "Only the payment methods your shop actually takes",
        "Receipts over Bluetooth or USB thermal printers",
        "Shifts open and close with the cash totalled for you",
        "Kitchen display for orders as they come in",
        "Staff clock in and out on the same device",
        "Keeps selling offline, syncs itself once back online",
      ],
      note: "Available for Android phones and tablets and for Windows PCs. Install from the store, then sign in with the same account.",
    },
    web: {
      title: "Web Admin",
      description:
        "Where you watch and run the business from anywhere. Read the latest reports, handle stock, and manage your staff.",
      bullets: [
        "Financial reports that are always current",
        "Sales trends, with the charts to read them",
        "Products, categories, and variants",
        "Stock — including many items at once",
        "Several outlets under one account",
        "Staff, and what each of them can reach",
        "Table layouts and the floor plan",
        "Transaction history and refunds",
        "Your outlets and your subscription",
      ],
      note: "Opens in a browser, nothing to install. Included in every plan, on the same account.",
    },
    openWebAdmin: "Open Web Admin",
    seeFeatures: "See what it does",
  },
  ms: {
    app: {
      title: "Aplikasi Kaunter",
      description:
        "Yang digunakan pekerja anda sepanjang hari. Jualan cepat, resit tercetak sendiri, dan tutup kaunter tidak lagi menyusahkan.",
      bullets: [
        "Log masuk dengan PIN 4 angka",
        "Skrin kaunter yang ringkas — grid atau senarai, ikut selesa",
        "Makan di sini, bungkus, dan penghantaran dalam satu tempat",
        "Hanya kaedah bayaran yang kedai anda benar-benar terima",
        "Resit melalui pencetak terma Bluetooth atau USB",
        "Syif dibuka dan ditutup dengan wang tunai dijumlahkan untuk anda",
        "Paparan dapur untuk pesanan yang masuk",
        "Pekerja daftar masuk dan keluar pada peranti yang sama",
        "Terus berjualan di luar talian, menyegerak sendiri apabila kembali",
      ],
      note: "Tersedia untuk telefon dan tablet Android serta PC Windows. Pasang daripada gedung aplikasi, kemudian log masuk dengan akaun yang sama.",
    },
    web: {
      title: "Web Admin",
      description:
        "Tempat anda memantau dan menguruskan perniagaan dari mana-mana. Baca laporan terkini, urus stok, dan kelola pekerja.",
      bullets: [
        "Laporan kewangan yang sentiasa terkini",
        "Aliran jualan, berserta carta untuk membacanya",
        "Produk, kategori, dan varian",
        "Stok — termasuk banyak item sekali gus",
        "Beberapa cawangan dalam satu akaun",
        "Pekerja, dan apa yang boleh dicapai setiap seorang",
        "Susun atur meja dan pelan lantai",
        "Sejarah transaksi dan bayaran balik",
        "Cawangan dan langganan anda",
      ],
      note: "Dibuka dalam pelayar, tiada apa-apa untuk dipasang. Disertakan dalam semua pelan, pada akaun yang sama.",
    },
    openWebAdmin: "Buka Web Admin",
    seeFeatures: "Lihat kegunaannya",
  },
  ja: {
    app: {
      title: "レジアプリ",
      description:
        "スタッフが一日じゅう触れるものです。会計は速く、レシートは自動で出て、締め作業も面倒でなくなります。",
      bullets: [
        "4桁のPINでログイン",
        "シンプルなレジ画面。グリッド表示でも一覧表示でも",
        "店内・お持ち帰り・デリバリーをひとつの画面で",
        "お店で実際に受け付けている支払い方法だけを表示",
        "Bluetooth・USBのサーマルプリンターでレシート印刷",
        "シフトの開始と締め。現金は自動で集計されます",
        "入った注文をそのまま映すキッチンディスプレイ",
        "同じ端末でスタッフの出退勤も打刻",
        "オフラインでも会計でき、復旧すると自動で同期",
      ],
      note: "Androidのスマホ・タブレット、およびWindows PCに対応。ストアから入れて、同じアカウントでログインしてください。",
    },
    web: {
      title: "管理画面（Web Admin）",
      description:
        "どこからでもお店を見て、動かせる場所です。最新のレポートを読み、在庫を整え、スタッフを管理できます。",
      bullets: [
        "つねに最新の収支レポート",
        "売上の推移と、それを読むためのグラフ",
        "商品・カテゴリー・バリエーション",
        "在庫。まとめての更新にも対応",
        "ひとつのアカウントで複数店舗",
        "スタッフと、それぞれが触れられる範囲",
        "テーブル配置とフロア図",
        "会計履歴と返金",
        "店舗とご契約プラン",
      ],
      note: "ブラウザで開くだけ、インストールは不要です。すべてのプランに含まれ、アカウントも同じです。",
    },
    openWebAdmin: "管理画面を開く",
    seeFeatures: "できることを見る",
  },
};

export const getEcosystem = (locale: Locale) => pick(ecosystemByLocale, locale);
