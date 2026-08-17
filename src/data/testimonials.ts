import { ITestimonial } from "@/types";
import { pick, type Locale } from "./localized";

/**
 * Bukan testimoni orang, melainkan JENIS USAHA beserta masalah khasnya — dan di
 * sinilah penulisan ulang per pasar paling terasa. "Warung & Restoran" tidak
 * ada padanannya di Jepang; yang setara secara peran adalah 定食屋 dan 居酒屋.
 * Menerjemahkannya harfiah menghasilkan daftar usaha yang tidak dikenali
 * siapa pun di pasar tujuan, dan pembaca menyimpulkan produk ini bukan untuknya.
 */
const testimonialsByLocale: Record<Locale, ITestimonial[]> = {
  id: [
    {
      name: 'Warung & Restoran',
      role: 'Masalah umum: pesanan tertukar, selisih kas, struk manual',
      message: `Dengan Kitchen Display System (KDS), pesanan langsung muncul di layar dapur — tidak ada lagi teriakan dari kasir ke dapur. Kas tercatat otomatis per shift, laporan penjualan bisa dicek dari HP kapan saja.`,
      avatar: '',
    },
    {
      name: 'Kafe & Minuman',
      role: 'Masalah umum: kasir baru susah belajar, antrian panjang',
      message: `Tampilan kasir yang sederhana membuat staf baru bisa langsung pakai tanpa pelatihan panjang. Sistem antrian nomor antre otomatis membantu mengelola pelanggan saat ramai tanpa kekacauan.`,
      avatar: '',
    },
    {
      name: 'Multi-Outlet & Franchise',
      role: 'Masalah umum: sulit pantau performa tiap cabang',
      message: `Semua outlet terhubung ke satu dashboard admin. Laporan pendapatan, stok, dan performa kasir per cabang tersedia real-time — tidak perlu telfon ke setiap outlet untuk tahu kondisi bisnis hari ini.`,
      avatar: '',
    },
  ],
  en: [
    {
      name: 'Eateries & Restaurants',
      role: 'Usual headaches: mixed-up orders, till that never balances, handwritten dockets',
      message: `Orders land straight on the kitchen screen, so nobody has to shout an order across the room or decipher someone's handwriting. Cash is tracked per shift, and you can pull up the day's sales from your phone without going back to the shop.`,
      avatar: '',
    },
    {
      name: 'Cafés & Drink Bars',
      role: 'Usual headaches: new staff take too long to learn, queues at peak',
      message: `The register screen is plain enough that a new hire can work it on their first shift without a training session. Queue numbers are issued automatically, so a busy hour stays orderly instead of turning into a crowd around the counter.`,
      avatar: '',
    },
    {
      name: 'Multi-Outlet & Franchise',
      role: 'Usual headaches: no clear view of how each branch is doing',
      message: `Every outlet reports into one dashboard. Revenue, stock, and cashier performance per branch are there in real time — no ringing round each location to find out how today went.`,
      avatar: '',
    },
  ],
  ms: [
    {
      name: 'Kedai Makan & Restoran',
      role: 'Masalah biasa: pesanan bertukar, duit laci tak sama, bil tulis tangan',
      message: `Pesanan terus muncul di skrin dapur — tidak perlu lagi menjerit dari kaunter ke dapur atau meneka tulisan tangan orang lain. Wang tunai direkod ikut syif, dan jualan hari ini boleh dilihat dari telefon tanpa perlu balik ke kedai.`,
      avatar: '',
    },
    {
      name: 'Kafe & Minuman',
      role: 'Masalah biasa: pekerja baharu lambat belajar, beratur panjang waktu sibuk',
      message: `Skrin kaunternya cukup ringkas sehingga pekerja baharu boleh terus menggunakannya pada syif pertama tanpa sesi latihan. Nombor giliran dikeluarkan secara automatik, jadi waktu sibuk kekal teratur.`,
      avatar: '',
    },
    {
      name: 'Berbilang Cawangan & Francais',
      role: 'Masalah biasa: sukar memantau prestasi setiap cawangan',
      message: `Semua cawangan masuk ke satu papan pemuka. Hasil jualan, stok, dan prestasi juruwang bagi setiap cawangan ada di situ secara langsung — tidak perlu menelefon satu per satu untuk tahu keadaan hari ini.`,
      avatar: '',
    },
  ],
  ja: [
    {
      name: '定食屋・飲食店',
      role: 'よくあるお悩み：注文の取り違え、レジ現金の不一致、手書きの伝票',
      message: `注文はそのままキッチンの画面に表示されるので、大声で伝えたり、他人の手書き文字を読み解いたりする必要がありません。現金はシフトごとに自動で記録され、その日の売上はお店に戻らなくてもスマホから確認できます。`,
      avatar: '',
    },
    {
      name: 'カフェ・ドリンクスタンド',
      role: 'よくあるお悩み：新人がなかなか覚えられない、ピーク時の行列',
      message: `レジ画面がシンプルなので、新しく入った方でも研修なしで初日から会計できます。呼び出し番号は自動で発行されるため、混み合う時間帯でもカウンター前が混乱しません。`,
      avatar: '',
    },
    {
      name: '多店舗・フランチャイズ',
      role: 'よくあるお悩み：どの店舗がどう動いているか見えない',
      message: `すべての店舗がひとつの管理画面に集まります。店舗ごとの売上・在庫・スタッフ別の実績がリアルタイムで並ぶので、今日の状況を知るために各店に電話をかける必要はありません。`,
      avatar: '',
    },
  ],
};

export const getTestimonials = (locale: Locale) => pick(testimonialsByLocale, locale);

/** @deprecated Pakai [getTestimonials]. */
export const testimonials: ITestimonial[] = testimonialsByLocale.id;
