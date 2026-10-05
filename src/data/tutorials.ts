import { pick, type Locale } from "./localized";

export interface TutorialVideo {
  /** Nama file tanpa ekstensi di /public/videos/tutorials/ */
  slug: string;
  title: string;
  desc: string;
  /** Durasi tayang, format m:ss */
  duration: string;
}

type Tutorials = { title: string; description: string; videos: TutorialVideo[] };

// `slug` dan `duration` sama di semua bahasa — keduanya merujuk berkas video
// yang sama. Videonya sendiri berbahasa Indonesia; itu disebutkan apa adanya di
// deskripsi bahasa lain daripada membiarkan penonton menemukannya sendiri
// setelah menekan putar.
const tutorialsByLocale: Record<Locale, Tutorials> = {
  id: {
    title: "Lihat Cara Kerjanya",
    description:
      "Alur lengkap Loka Kasir dalam 5 video singkat — dari login sampai tutup shift, masing-masing di bawah 30 detik. Klik untuk memutar.",
    videos: [
      { slug: "tut_login_tablet", title: "Login ke Aplikasi", desc: "Masuk cukup dengan nomor HP atau email dan password — langsung sampai ke beranda kasir.", duration: "0:13" },
      { slug: "tut_buka_kasir_tablet", title: "Buka Kasir & Mulai Shift", desc: "Pilih outlet, terminal, dan kasir, lalu isi saldo kas awal untuk memulai shift.", duration: "0:18" },
      { slug: "tut_transaksi_tablet", title: "Melayani Transaksi", desc: "Pilih produk, tentukan dine-in atau take-away, lalu selesaikan pembayaran dalam hitungan detik.", duration: "0:14" },
      { slug: "tut_riwayat_tablet", title: "Riwayat & Struk", desc: "Buka kembali transaksi yang sudah selesai lengkap dengan detail struk, siap dikirim atau dicetak ulang.", duration: "0:14" },
      { slug: "tut_tutup_shift_tablet", title: "Tutup Shift", desc: "Cocokkan kas fisik dengan kas diharapkan — ringkasan penjualan tunai & QRIS terekap otomatis.", duration: "0:19" },
    ],
  },
  en: {
    title: "See How It Works",
    description:
      "The whole flow in five short clips — from signing in to closing the till, none longer than 30 seconds. Click to play. (Narration is in Indonesian; the screens speak for themselves.)",
    videos: [
      { slug: "tut_login_tablet", title: "Signing In", desc: "Phone number or email plus a password, and you land straight on the register screen.", duration: "0:13" },
      { slug: "tut_buka_kasir_tablet", title: "Opening the Till", desc: "Pick the outlet, the terminal, and the cashier, then enter the opening cash float to start the shift.", duration: "0:18" },
      { slug: "tut_transaksi_tablet", title: "Taking a Sale", desc: "Tap the items, mark it dine-in or takeaway, and settle the payment in a few seconds.", duration: "0:14" },
      { slug: "tut_riwayat_tablet", title: "History & Receipts", desc: "Reopen any finished sale with its full receipt, ready to send or reprint.", duration: "0:14" },
      { slug: "tut_tutup_shift_tablet", title: "Closing the Shift", desc: "Count the drawer against what the system expects — cash and QR sales are already totalled for you.", duration: "0:19" },
    ],
  },
  ms: {
    title: "Lihat Cara Ia Berfungsi",
    description:
      "Keseluruhan alirannya dalam lima klip pendek — dari log masuk hingga tutup syif, semuanya di bawah 30 saat. Klik untuk main. (Naratifnya dalam bahasa Indonesia; skrinnya mudah difahami.)",
    videos: [
      { slug: "tut_login_tablet", title: "Log Masuk", desc: "Nombor telefon atau e-mel dengan kata laluan, terus sampai ke skrin kaunter.", duration: "0:13" },
      { slug: "tut_buka_kasir_tablet", title: "Buka Kaunter & Mula Syif", desc: "Pilih cawangan, terminal, dan juruwang, kemudian masukkan wang tunai permulaan untuk memulakan syif.", duration: "0:18" },
      { slug: "tut_transaksi_tablet", title: "Melayan Jualan", desc: "Ketik item, tandakan makan di sini atau bungkus, dan selesaikan bayaran dalam beberapa saat.", duration: "0:14" },
      { slug: "tut_riwayat_tablet", title: "Sejarah & Resit", desc: "Buka semula mana-mana jualan yang selesai berserta resit penuhnya, sedia untuk dihantar atau dicetak semula.", duration: "0:14" },
      { slug: "tut_tutup_shift_tablet", title: "Tutup Syif", desc: "Kira wang di laci berbanding jangkaan sistem — jualan tunai dan QR sudah dijumlahkan automatik.", duration: "0:19" },
    ],
  },
  ja: {
    title: "使っているところをご覧ください",
    description:
      "ログインから締め作業まで、ひと通りの流れを5本の短い動画で。どれも30秒未満です。クリックすると再生します。（音声はインドネシア語ですが、画面の動きだけで流れは伝わります）",
    videos: [
      { slug: "tut_login_tablet", title: "ログイン", desc: "電話番号かメールアドレスとパスワードだけで、そのままレジ画面に入ります。", duration: "0:13" },
      { slug: "tut_buka_kasir_tablet", title: "レジを開ける（シフト開始）", desc: "店舗・端末・担当者を選び、釣銭準備金を入力してシフトを開始します。", duration: "0:18" },
      { slug: "tut_transaksi_tablet", title: "会計する", desc: "商品を選び、店内かお持ち帰りかを指定して、数秒で会計を完了します。", duration: "0:14" },
      { slug: "tut_riwayat_tablet", title: "履歴とレシート", desc: "完了した会計をレシートごと開き直せます。再送も再印刷もそのまま。", duration: "0:14" },
      { slug: "tut_tutup_shift_tablet", title: "シフトを締める", desc: "実際の現金とシステム上の金額を突き合わせます。現金・QR決済の集計は自動です。", duration: "0:19" },
    ],
  },
};

export const getTutorials = (locale: Locale) => pick(tutorialsByLocale, locale);

/** @deprecated Pakai [getTutorials]. */
export const tutorialDetails: Tutorials = tutorialsByLocale.id;
