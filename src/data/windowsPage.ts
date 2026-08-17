import { pick, type Locale } from "./localized";

/**
 * Teks halaman `/download/windows`.
 *
 * Angka-angkanya (±30 MB unduhan, ±200 MB RAM, cukup dengan RAM 2 GB) diambil
 * dari pemakaian nyata build rilis Windows dan SENGAJA tidak dibesar-besarkan:
 * PC kasir di toko sering berspesifikasi lama, dan angka yang terdengar berat
 * membuat pemiliknya mengurungkan niat sebelum mencoba. Karena itu angkanya
 * sama persis di semua bahasa — hanya labelnya yang berubah.
 */
type WindowsPageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  statSize: string;
  statRam: string;
  statMinRam: string;
  statMinRamLabel: string;
  lightNote: string;
  freeNote: string;
  howToHeading: string;
  steps: { title: string; detail: string }[];
  wingetHeading: string;
  wingetBody: string;
  directHeading: string;
  directBody: string;
  requirementsHeading: string;
  requirements: string[];
  otherPlatformTitle: string;
  otherPlatformBody: string;
  backHome: string;
};

const copyByLocale: Record<Locale, WindowsPageCopy> = {
  id: {
    metaTitle: "Download untuk Windows",
    metaDescription:
      "Cara memasang aplikasi kasir Loka Kasir di PC atau laptop Windows 10/11 — lewat Microsoft Store atau perintah winget. Ringan, unduhan hanya ±30 MB. Gratis 30 hari pertama.",
    eyebrow: "Loka Kasir untuk Windows",
    title: "Download aplikasi kasir untuk PC & laptop",
    intro:
      "Aplikasi kasir yang sama seperti versi Android, dijalankan di layar besar PC atau laptop Windows. Data dan akunnya sama — kasir bisa pindah perangkat tanpa setup ulang.",
    statSize: "Ukuran unduhan",
    statRam: "Pemakaian RAM",
    statMinRam: "RAM 2 GB",
    statMinRamLabel: "Sudah cukup",
    lightNote: "Ringan, jadi tetap lancar di PC atau laptop lama yang biasa dipakai di toko.",
    freeNote: "Gratis 30 hari pertama",
    howToHeading: "Cara memasang",
    steps: [
      {
        title: "Buka halaman Loka Kasir di Microsoft Store",
        detail:
          "Klik tombol di atas. Browser akan menawarkan untuk membuka aplikasi Microsoft Store — pilih Buka.",
      },
      {
        title: "Tekan Get / Install",
        detail:
          "Microsoft Store mengunduh dan memasang aplikasinya sendiri. Anda tidak perlu hak akses administrator.",
      },
      {
        title: "Login, atau daftar bila belum punya akun",
        detail:
          "Buka Loka Kasir dari Start Menu lalu login. Belum punya akun? Anda bisa mendaftar gratis di dalam aplikasi maupun lewat browser di app.lokakasir.id — 30 hari pertama gratis dengan akses penuh.",
      },
    ],
    wingetHeading: "Pasang lewat winget",
    wingetBody:
      "Kalau Anda memasang di banyak PC sekaligus, jalankan perintah ini di PowerShell atau Command Prompt. Aplikasinya terpasang dari sumber yang sama dengan Microsoft Store, jadi pembaruannya tetap otomatis.",
    directHeading: "Download file langsung",
    directBody:
      "Untuk PC yang Microsoft Store-nya dimatikan oleh admin. Versi ini tidak mendapat pembaruan otomatis — Anda perlu mengunduh ulang saat ada versi baru.",
    requirementsHeading: "Kebutuhan sistem",
    requirements: [
      "Windows 10 versi 1809 (Oktober 2018) ke atas, atau Windows 11",
      "Prosesor 64-bit (x64) — RAM 2 GB sudah cukup",
      "Ruang kosong sekitar 150 MB (file unduhannya hanya ±30 MB)",
      "Koneksi internet untuk sinkronisasi (transaksi tetap jalan saat offline)",
    ],
    otherPlatformTitle: "Pakai HP atau tablet?",
    otherPlatformBody: "Versi Android tersedia gratis di Google Play, dengan akun yang sama.",
    backHome: "← Kembali ke beranda",
  },
  en: {
    metaTitle: "Download for Windows",
    metaDescription:
      "How to install Loka Kasir on a Windows 10 or 11 PC or laptop — through the Microsoft Store or a winget command. Light: about a 30 MB download. Free for the first 30 days.",
    eyebrow: "Loka Kasir for Windows",
    title: "The register app for a PC or laptop",
    intro:
      "The same register app as the Android version, on the larger screen of a Windows PC. Same account and same data, so staff can move between devices without setting anything up again.",
    statSize: "Download size",
    statRam: "Memory in use",
    statMinRam: "2 GB RAM",
    statMinRamLabel: "Is enough",
    lightNote: "Light enough to stay responsive on the older PCs that shops tend to already own.",
    freeNote: "Free for the first 30 days",
    howToHeading: "How to install it",
    steps: [
      {
        title: "Open the Loka Kasir page in Microsoft Store",
        detail:
          "Use the button above. Your browser will offer to open the Microsoft Store app — choose Open.",
      },
      {
        title: "Press Get / Install",
        detail:
          "The Store downloads and installs it for you. You don't need administrator rights.",
      },
      {
        title: "Sign in, or create an account",
        detail:
          "Open Loka Kasir from the Start menu and sign in. No account yet? You can create one free inside the app, or in a browser at app.lokakasir.id — the first 30 days come with everything unlocked.",
      },
    ],
    wingetHeading: "Install with winget",
    wingetBody:
      "If you're setting up several PCs, run this in PowerShell or Command Prompt. It installs from the same source as the Microsoft Store, so updates still arrive on their own.",
    directHeading: "Direct file download",
    directBody:
      "For PCs where an administrator has disabled the Microsoft Store. This version doesn't update itself — you'll need to download it again when a new one is released.",
    requirementsHeading: "System requirements",
    requirements: [
      "Windows 10 version 1809 (October 2018) or newer, or Windows 11",
      "A 64-bit (x64) processor — 2 GB of RAM is enough",
      "About 150 MB of free space (the download itself is only ~30 MB)",
      "An internet connection for syncing (sales still work offline)",
    ],
    otherPlatformTitle: "On a phone or tablet?",
    otherPlatformBody: "The Android version is free on Google Play, using the same account.",
    backHome: "← Back to home",
  },
  ms: {
    metaTitle: "Muat Turun untuk Windows",
    metaDescription:
      "Cara memasang Loka Kasir pada PC atau komputer riba Windows 10 atau 11 — melalui Microsoft Store atau arahan winget. Ringan: muat turun kira-kira 30 MB. Percuma 30 hari pertama.",
    eyebrow: "Loka Kasir untuk Windows",
    title: "Aplikasi kaunter untuk PC & komputer riba",
    intro:
      "Aplikasi kaunter yang sama seperti versi Android, pada skrin besar PC Windows. Akaun dan datanya sama, jadi pekerja boleh bertukar peranti tanpa menyediakan semula apa-apa.",
    statSize: "Saiz muat turun",
    statRam: "Penggunaan memori",
    statMinRam: "RAM 2 GB",
    statMinRamLabel: "Sudah memadai",
    lightNote: "Cukup ringan untuk kekal lancar pada PC lama yang biasanya sudah ada di kedai.",
    freeNote: "Percuma 30 hari pertama",
    howToHeading: "Cara memasangnya",
    steps: [
      {
        title: "Buka halaman Loka Kasir di Microsoft Store",
        detail:
          "Gunakan butang di atas. Pelayar akan menawarkan untuk membuka aplikasi Microsoft Store — pilih Buka.",
      },
      {
        title: "Tekan Get / Install",
        detail:
          "Store memuat turun dan memasangnya untuk anda. Anda tidak memerlukan hak pentadbir.",
      },
      {
        title: "Log masuk, atau buka akaun",
        detail:
          "Buka Loka Kasir daripada menu Start dan log masuk. Belum ada akaun? Anda boleh membukanya secara percuma dalam aplikasi, atau dalam pelayar di app.lokakasir.id — 30 hari pertama dengan semua ciri terbuka.",
      },
    ],
    wingetHeading: "Pasang dengan winget",
    wingetBody:
      "Jika anda menyediakan beberapa PC sekali gus, jalankan arahan ini dalam PowerShell atau Command Prompt. Ia memasang daripada sumber yang sama dengan Microsoft Store, jadi kemas kini tetap sampai dengan sendirinya.",
    directHeading: "Muat turun fail terus",
    directBody:
      "Untuk PC yang Microsoft Store-nya dimatikan pentadbir. Versi ini tidak mengemas kini sendiri — anda perlu memuat turunnya semula apabila ada versi baharu.",
    requirementsHeading: "Keperluan sistem",
    requirements: [
      "Windows 10 versi 1809 (Oktober 2018) ke atas, atau Windows 11",
      "Pemproses 64-bit (x64) — RAM 2 GB sudah memadai",
      "Ruang kosong kira-kira 150 MB (muat turunnya sendiri hanya ±30 MB)",
      "Sambungan internet untuk penyegerakan (jualan tetap berjalan di luar talian)",
    ],
    otherPlatformTitle: "Guna telefon atau tablet?",
    otherPlatformBody: "Versi Android percuma di Google Play, menggunakan akaun yang sama.",
    backHome: "← Kembali ke laman utama",
  },
  ja: {
    metaTitle: "Windows版のダウンロード",
    metaDescription:
      "Windows 10 / 11 のPC・ノートPCに Loka Kasir を導入する方法。Microsoft Store から、または winget コマンドから。ダウンロードは約30MBと軽量です。最初の30日間は無料。",
    eyebrow: "Windows版 Loka Kasir",
    title: "PC・ノートPC用のレジアプリ",
    intro:
      "Android版と同じレジアプリを、WindowsのPCの大きな画面で。アカウントもデータも同じなので、端末を変えても設定をやり直す必要はありません。",
    statSize: "ダウンロード容量",
    statRam: "使用メモリ",
    statMinRam: "メモリ2GB",
    statMinRamLabel: "で足ります",
    lightNote: "軽いので、お店にすでにある少し古いPCでも快適に動きます。",
    freeNote: "最初の30日間は無料",
    howToHeading: "導入の手順",
    steps: [
      {
        title: "Microsoft Store の Loka Kasir のページを開く",
        detail:
          "上のボタンを押してください。ブラウザが Microsoft Store アプリを開くか尋ねてくるので、「開く」を選びます。",
      },
      {
        title: "「入手 / インストール」を押す",
        detail:
          "あとは Store がダウンロードとインストールを行います。管理者権限は必要ありません。",
      },
      {
        title: "ログインする、またはアカウントを作る",
        detail:
          "スタートメニューから Loka Kasir を開いてログインします。アカウントがまだの場合は、アプリ内でも、ブラウザ（app.lokakasir.id）でも無料で作成できます。最初の30日間はすべての機能をお使いいただけます。",
      },
    ],
    wingetHeading: "winget で導入する",
    wingetBody:
      "複数のPCにまとめて導入する場合は、PowerShell またはコマンドプロンプトでこのコマンドを実行してください。Microsoft Store と同じ提供元から入るため、更新はそのまま自動で届きます。",
    directHeading: "インストーラーを直接ダウンロード",
    directBody:
      "管理者によって Microsoft Store が無効化されているPC向けです。この形式は自動更新されないため、新しい版が出たら再度ダウンロードしていただく必要があります。",
    requirementsHeading: "動作環境",
    requirements: [
      "Windows 10 バージョン1809（2018年10月）以降、または Windows 11",
      "64ビット（x64）プロセッサ。メモリは2GBで足ります",
      "空き容量 約150MB（ダウンロード自体は約30MBです）",
      "同期のためのインターネット接続（会計はオフラインでも行えます）",
    ],
    otherPlatformTitle: "スマホやタブレットをお使いですか？",
    otherPlatformBody: "Android版は Google Play から無料で入手でき、同じアカウントでお使いいただけます。",
    backHome: "← トップページへ戻る",
  },
};

export const getWindowsPage = (locale: Locale) => pick(copyByLocale, locale);

/** Angka yang sama di semua bahasa — lihat catatan di atas. */
export const windowsFacts = { size: "±30 MB", ram: "±200 MB" };
