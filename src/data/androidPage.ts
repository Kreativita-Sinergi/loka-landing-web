import { pick, type Locale } from "./localized";

/**
 * Teks halaman `/download/android` — APK langsung untuk perangkat Android yang
 * tidak punya Google Play, terutama tablet/HP Huawei (HarmonyOS/EMUI dengan
 * AppGallery). Langkah pasangnya ditulis mengikuti menu Huawei karena di sana
 * izin "sumber tidak dikenal" dan peringatan keamanannya paling sering membuat
 * pemilik toko berhenti di tengah jalan.
 */
type AndroidPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  downloadLabel: string;
  updateNote: string;
  howToHeading: string;
  steps: { title: string; detail: string }[];
  warningTitle: string;
  warningBody: string;
  updateHeading: string;
  updateBody: string;
  requirementsHeading: string;
  requirements: string[];
  checksumLabel: string;
  playTitle: string;
  playBody: string;
  helpTitle: string;
  helpBody: string;
  helpCta: string;
  backHome: string;
};

const copyByLocale: Record<Locale, AndroidPageCopy> = {
  id: {
    metaTitle: "Download APK Android (Huawei)",
    metaDescription:
      "Unduh APK Loka Kasir untuk tablet dan HP Android tanpa Google Play, seperti Huawei (HarmonyOS/EMUI). Lengkap dengan cara memasangnya. Gratis 30 hari pertama.",
    eyebrow: "Loka Kasir untuk Huawei & Android tanpa Play Store",
    title: "Download APK aplikasi kasir",
    intro:
      "Tablet atau HP Huawei tidak bisa memasang dari Google Play. Unduh file APK di bawah ini dan pasang langsung — aplikasinya sama persis dengan versi Play Store, dengan akun dan data yang sama.",
    downloadLabel: "Download APK",
    updateNote: "Gratis 30 hari pertama · Tidak diperbarui otomatis",
    howToHeading: "Cara memasang di tablet Huawei",
    steps: [
      {
        title: "Unduh file APK",
        detail:
          "Buka halaman ini di browser tablet (Huawei Browser atau Chrome), lalu tekan tombol Download APK. Tunggu sampai unduhan selesai — ukurannya sekitar 100 MB, sebaiknya pakai Wi-Fi.",
      },
      {
        title: "Buka file yang sudah diunduh",
        detail:
          "Ketuk notifikasi unduhan, atau buka aplikasi Files (Berkas) → Unduhan → LokaKasir-….apk.",
      },
      {
        title: "Izinkan pemasangan dari browser",
        detail:
          "Jika muncul pesan pemasangan diblokir, ketuk Pengaturan lalu aktifkan \"Izinkan dari sumber ini\" untuk browser yang Anda pakai. Di beberapa versi, menu ini ada di Pengaturan → Keamanan → Pemasangan aplikasi eksternal.",
      },
      {
        title: "Tekan Pasang, lalu login",
        detail:
          "Setelah terpasang, buka Loka Kasir dan login dengan akun Anda. Belum punya akun? Daftar gratis di dalam aplikasi atau lewat browser di app.lokakasir.id.",
      },
    ],
    warningTitle: "Muncul peringatan keamanan dari Huawei?",
    warningBody:
      "HarmonyOS/EMUI memindai setiap aplikasi yang tidak berasal dari AppGallery dan bisa menampilkan peringatan atau menawarkan \"Pasang aplikasi resmi\". Ini wajar untuk APK di luar AppGallery. Pilih Tetap pasang / Abaikan. Jika Mode Murni (Pure Mode) aktif, matikan dulu sementara di Pengaturan → Sistem & pembaruan → Mode Murni.",
    updateHeading: "Cara memperbarui",
    updateBody:
      "Versi APK tidak diperbarui otomatis. Saat ada versi baru, unduh lagi dari halaman ini lalu pasang di atas aplikasi yang lama — data dan login Anda tetap aman, tidak perlu menghapus aplikasi lebih dulu.",
    requirementsHeading: "Kebutuhan perangkat",
    requirements: [
      "Android 7.0 ke atas, termasuk HarmonyOS dan EMUI di tablet/HP Huawei",
      "Ruang kosong sekitar 300 MB",
      "Koneksi internet untuk login dan sinkronisasi (transaksi tetap jalan saat offline)",
    ],
    checksumLabel: "SHA-256",
    playTitle: "Perangkat Anda punya Google Play?",
    playBody: "Pasang saja dari Google Play — pembaruannya otomatis.",
    helpTitle: "Tersendat saat memasang?",
    helpBody: "Kirim pesan ke admin kami, kami bantu pasang sampai aplikasinya jalan.",
    helpCta: "Minta bantuan via WhatsApp",
    backHome: "← Kembali ke beranda",
  },
  en: {
    metaTitle: "Download the Android APK (Huawei)",
    metaDescription:
      "Download the Loka Kasir APK for Android tablets and phones without Google Play, such as Huawei devices (HarmonyOS/EMUI), with step-by-step install instructions. Free for the first 30 days.",
    eyebrow: "Loka Kasir for Huawei & Android without Play Store",
    title: "Download the register app APK",
    intro:
      "Huawei tablets and phones can't install from Google Play. Download the APK below and install it directly — it's the exact same app as the Play Store version, with the same account and data.",
    downloadLabel: "Download APK",
    updateNote: "Free for the first 30 days · Doesn't update itself",
    howToHeading: "Installing on a Huawei tablet",
    steps: [
      {
        title: "Download the APK",
        detail:
          "Open this page in the tablet's browser (Huawei Browser or Chrome) and press Download APK. It's about 100 MB, so Wi-Fi is a good idea.",
      },
      {
        title: "Open the downloaded file",
        detail:
          "Tap the download notification, or open the Files app → Downloads → LokaKasir-….apk.",
      },
      {
        title: "Allow installs from the browser",
        detail:
          "If the install is blocked, tap Settings and turn on \"Allow from this source\" for the browser you used. On some versions it lives under Settings → Security → External app installation.",
      },
      {
        title: "Press Install, then sign in",
        detail:
          "Once it's installed, open Loka Kasir and sign in. No account yet? Create one free inside the app, or in a browser at app.lokakasir.id.",
      },
    ],
    warningTitle: "Seeing a Huawei security warning?",
    warningBody:
      "HarmonyOS/EMUI scans every app that doesn't come from AppGallery and may show a warning or suggest an \"official\" app instead. That's expected for any APK installed outside AppGallery. Choose Install anyway / Ignore. If Pure Mode is on, switch it off for a moment under Settings → System & updates → Pure Mode.",
    updateHeading: "Updating",
    updateBody:
      "The APK doesn't update itself. When a new version comes out, download it again from this page and install it over the old one — your data and sign-in stay put, no need to uninstall first.",
    requirementsHeading: "Device requirements",
    requirements: [
      "Android 7.0 or newer, including HarmonyOS and EMUI on Huawei tablets and phones",
      "About 300 MB of free space",
      "An internet connection to sign in and sync (sales still work offline)",
    ],
    checksumLabel: "SHA-256",
    playTitle: "Does your device have Google Play?",
    playBody: "Install it from Google Play instead — updates arrive on their own.",
    helpTitle: "Stuck installing?",
    helpBody: "Message us and we'll walk you through it until the app is running.",
    helpCta: "Get help on WhatsApp",
    backHome: "← Back to home",
  },
  ms: {
    metaTitle: "Muat Turun APK Android (Huawei)",
    metaDescription:
      "Muat turun APK Loka Kasir untuk tablet dan telefon Android tanpa Google Play, seperti peranti Huawei (HarmonyOS/EMUI), berserta cara memasangnya. Percuma 30 hari pertama.",
    eyebrow: "Loka Kasir untuk Huawei & Android tanpa Play Store",
    title: "Muat turun APK aplikasi kaunter",
    intro:
      "Tablet dan telefon Huawei tidak boleh memasang daripada Google Play. Muat turun APK di bawah dan pasang terus — aplikasinya sama seperti versi Play Store, dengan akaun dan data yang sama.",
    downloadLabel: "Muat turun APK",
    updateNote: "Percuma 30 hari pertama · Tidak dikemas kini secara automatik",
    howToHeading: "Cara memasang pada tablet Huawei",
    steps: [
      {
        title: "Muat turun APK",
        detail:
          "Buka halaman ini dalam pelayar tablet (Huawei Browser atau Chrome) dan tekan Muat turun APK. Saiznya kira-kira 100 MB, jadi lebih baik guna Wi-Fi.",
      },
      {
        title: "Buka fail yang dimuat turun",
        detail:
          "Ketik pemberitahuan muat turun, atau buka aplikasi Files (Fail) → Muat Turun → LokaKasir-….apk.",
      },
      {
        title: "Benarkan pemasangan daripada pelayar",
        detail:
          "Jika pemasangan disekat, ketik Tetapan dan hidupkan \"Benarkan daripada sumber ini\" untuk pelayar yang digunakan. Pada sesetengah versi, ia berada di Tetapan → Keselamatan → Pemasangan aplikasi luaran.",
      },
      {
        title: "Tekan Pasang, kemudian log masuk",
        detail:
          "Selepas dipasang, buka Loka Kasir dan log masuk. Belum ada akaun? Buka secara percuma dalam aplikasi atau dalam pelayar di app.lokakasir.id.",
      },
    ],
    warningTitle: "Muncul amaran keselamatan Huawei?",
    warningBody:
      "HarmonyOS/EMUI mengimbas setiap aplikasi yang bukan daripada AppGallery dan mungkin memaparkan amaran. Ini biasa bagi APK di luar AppGallery. Pilih Pasang juga / Abaikan. Jika Mod Tulen (Pure Mode) aktif, matikannya seketika di Tetapan → Sistem & kemas kini → Mod Tulen.",
    updateHeading: "Cara mengemas kini",
    updateBody:
      "APK tidak mengemas kini sendiri. Apabila ada versi baharu, muat turun semula dari halaman ini dan pasang di atas aplikasi lama — data dan log masuk anda kekal, tidak perlu nyahpasang dahulu.",
    requirementsHeading: "Keperluan peranti",
    requirements: [
      "Android 7.0 ke atas, termasuk HarmonyOS dan EMUI pada tablet/telefon Huawei",
      "Ruang kosong kira-kira 300 MB",
      "Sambungan internet untuk log masuk dan penyegerakan (jualan tetap berjalan di luar talian)",
    ],
    checksumLabel: "SHA-256",
    playTitle: "Peranti anda ada Google Play?",
    playBody: "Pasang sahaja daripada Google Play — kemas kini sampai dengan sendirinya.",
    helpTitle: "Tersekat semasa memasang?",
    helpBody: "Hantar mesej kepada kami, kami bantu sehingga aplikasinya berjalan.",
    helpCta: "Dapatkan bantuan melalui WhatsApp",
    backHome: "← Kembali ke laman utama",
  },
  ja: {
    metaTitle: "Android版APKのダウンロード（Huawei）",
    metaDescription:
      "Google Play を使えない Android タブレット・スマホ（Huawei の HarmonyOS/EMUI など）向けに、Loka Kasir の APK をダウンロードできます。導入手順つき。最初の30日間は無料。",
    eyebrow: "Huawei など Play ストアのない端末向け",
    title: "レジアプリの APK をダウンロード",
    intro:
      "Huawei のタブレットやスマホは Google Play からアプリを入れられません。下の APK をダウンロードして直接インストールしてください。Play ストア版とまったく同じアプリで、アカウントもデータも共通です。",
    downloadLabel: "APK をダウンロード",
    updateNote: "最初の30日間は無料 · 自動更新はされません",
    howToHeading: "Huawei タブレットへの導入手順",
    steps: [
      {
        title: "APK をダウンロードする",
        detail:
          "タブレットのブラウザ（Huawei ブラウザまたは Chrome）でこのページを開き、「APK をダウンロード」を押します。約100MBあるため Wi-Fi をおすすめします。",
      },
      {
        title: "ダウンロードしたファイルを開く",
        detail:
          "ダウンロード完了の通知をタップするか、「ファイル」アプリ → ダウンロード → LokaKasir-….apk を開きます。",
      },
      {
        title: "ブラウザからのインストールを許可する",
        detail:
          "インストールがブロックされた場合は「設定」をタップし、使用したブラウザの「このソースを許可」をオンにします。機種によっては 設定 → セキュリティ → 外部アプリのインストール にあります。",
      },
      {
        title: "「インストール」を押してログイン",
        detail:
          "インストール後、Loka Kasir を開いてログインします。アカウントがまだの場合は、アプリ内またはブラウザ（app.lokakasir.id）で無料で作成できます。",
      },
    ],
    warningTitle: "Huawei のセキュリティ警告が出た場合",
    warningBody:
      "HarmonyOS/EMUI は AppGallery 以外から入れたアプリをスキャンし、警告を表示することがあります。AppGallery 外の APK では通常の動作です。「このままインストール」/「無視」を選んでください。ピュアモードがオンの場合は、設定 → システムとアップデート → ピュアモード で一時的にオフにしてください。",
    updateHeading: "更新するには",
    updateBody:
      "APK 版は自動更新されません。新しい版が出たら、このページから再度ダウンロードして上書きインストールしてください。データやログイン状態はそのまま残り、先にアンインストールする必要はありません。",
    requirementsHeading: "動作環境",
    requirements: [
      "Android 7.0 以降（Huawei の HarmonyOS・EMUI を含む）",
      "空き容量 約300MB",
      "ログインと同期のためのインターネット接続（会計はオフラインでも行えます）",
    ],
    checksumLabel: "SHA-256",
    playTitle: "Google Play が使える端末ですか？",
    playBody: "その場合は Google Play から入れてください。更新も自動で届きます。",
    helpTitle: "うまく入らない場合",
    helpBody: "メッセージをいただければ、アプリが動くまでサポートします。",
    helpCta: "WhatsApp でサポートを依頼",
    backHome: "← トップページへ戻る",
  },
};

export const getAndroidPage = (locale: Locale) => pick(copyByLocale, locale);
