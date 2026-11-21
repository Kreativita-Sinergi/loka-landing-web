/**
 * Uji regresi Tanya Loka: pertanyaan sehari-hari dan balasan yang diharapkan.
 *
 *   npm run chat:check
 *
 * Mesinnya pencocokan kata, jadi satu kata kunci atau judul panduan yang
 * diubah bisa menggeser jawaban pertanyaan lain tanpa terlihat. Tambahkan
 * barisnya di sini setiap kali ada pertanyaan pengguna yang dijawab keliru.
 *
 * Bentuk harapan:
 *   talk:<jenis>      basa-basi (greeting, thanks, human, …)
 *   topic:<topik>     jawaban topik (pricing, trial, …)
 *   guide:<judul>     satu panduan / FAQ
 *   choices:<a|b>     pilihan; cukup sebut label yang wajib ada
 *   maybe:<a|b>       saran "mungkin maksud Anda"
 *   handoff           diteruskan ke admin
 *   fallback          tidak ada jawaban
 */
import type { Locale } from '@/data/localized';
import { supportChatCopy } from '@/data/site/supportChat';
import { guideReply, quickReply, type ChatReply } from '@/lib/supportChatReply';
import { findGuideMatch } from '@/lib/supportGuideSearch';

type Step = [question: string, expected: string];

// Setiap larik adalah satu percakapan; konteksnya tidak terbawa ke larik lain.
const conversations: Record<Locale, Step[][]> = {
  id: [
    // ── Basa-basi ──
    [['halo', 'talk:greeting']],
    [['haloooo', 'talk:greeting']],
    [['hai kak', 'talk:greeting']],
    [['halo kak mau tanya', 'talk:greeting']],
    [['selamat pagi', 'talk:greeting']],
    [['assalamualaikum', 'talk:greeting']],
    [['p', 'talk:greeting']],
    [['makasih', 'talk:thanks']],
    [['terima kasih ya', 'talk:thanks']],
    [['makasihh banyak ya kak', 'talk:thanks']],
    [['ok', 'talk:ack']],
    [['sip mantap', 'talk:ack']],
    [['ga ada, makasih', 'talk:bye']],
    [['kamu siapa?', 'talk:identity']],
    [['ini bot ya?', 'talk:identity']],
    [['bisa bantu apa?', 'talk:capabilities']],
    [['mau tanya dong', 'talk:ask']],
    [['mau ngomong sama admin', 'talk:human']],
    [['cs', 'talk:human']],
    [['ada nomor wa?', 'talk:human']],
    [['bukan itu maksud saya', 'talk:miss']],
    [['ga jelas', 'talk:miss']],
    // Kata basa-basi di dalam pertanyaan sungguhan tidak membajak jawabannya.
    [['halo, cara buka shift gimana ya?', 'guide:Buka Kasir & Mulai Shift']],
    [['makasih, satu lagi: cara refund gimana', 'guide:Pembatalan Transaksi dan Refund']],
    [['kasih info dong', 'fallback']],
    [['siapa presiden indonesia', 'fallback']],

    // ── Calon pelanggan ──
    [['berapa harganya?', 'topic:pricing']],
    [['harga per bulan berapa', 'topic:pricing']],
    [['bayar berapa sebulan?', 'topic:pricing']],
    [['berapa biaya langganan', 'topic:pricing']],
    [['mahal ga?', 'topic:pricing']],
    [['cara bayar gaji bulanan', 'maybe:Gaji Pegawai Sesuai Absensi']],
    [['perpanjang langganan', 'guide:Membership Aplikasi Loka']],
    [['ada gratisnya ga', 'topic:trial']],
    [['gratis?', 'topic:trial']],
    [['trial berapa hari', 'topic:trial']],
    [['bedanya pro sama gratis', 'topic:trial']],
    [['cara daftar', 'topic:register']],
    [['gimana cara bikin akun', 'topic:register']],
    [['cara daftar member', 'guide:Menambahkan Member Pelanggan']],
    [['download dimana', 'topic:download']],
    [['cara install di windows', 'topic:download']],
    [['bisa pakai di iphone?', 'guide:Di perangkat apa saja App Kasir bisa dijalankan?']],
    [['bisa buat laundry ga', 'guide:Jenis bisnis apa saja yang cocok menggunakan Loka Kasir?']],
    [['bisa multi outlet?', 'guide:Berapa banyak outlet dan pengguna yang bisa ditambahkan?']],
    [['data saya aman ga', 'guide:Bagaimana keamanan data bisnis saya?']],
    [['apakah bisa offline', 'topic:offline']],
    [['kalau internet mati gimana', 'topic:offline']],

    // ── Cara pakai ──
    [['cara buka shift', 'guide:Buka Kasir & Mulai Shift']],
    [['tutup kasir', 'guide:Tutup Shift']],
    [['shift', 'choices:Buka Kasir & Mulai Shift|Tutup Shift']],
    [['gimana cara nambah produk', 'guide:Bagaimana cara menambah produk ke dalam sistem?']],
    [['import produk dari excel', 'guide:Impor Banyak Produk dari CSV']],
    [['cara aktifkan qris', 'guide:Menyiapkan pembayaran QRIS']],
    [['cara pasang qris', 'guide:Menyiapkan pembayaran QRIS']],
    [['cara ganti logo struk', 'guide:Mengatur Tampilan Struk']],
    [['cetak ulang struk', 'choices:Riwayat & Struk|Cetak ulang struk terakhir']],
    [['cara refund', 'guide:Pembatalan Transaksi dan Refund']],
    [['batalkan transaksi', 'guide:Pembatalan Transaksi dan Refund']],
    [['cara lihat laporan penjualan hari ini', 'guide:Ringkasan dan Filter Penjualan']],
    [['cara stok opname', 'guide:Menghitung dan Posting Stok Opname']],
    [['stok barang hilang gimana catatnya', 'guide:Mengurangi Stok Barang Rusak, Hilang, atau Gratis']],
    [['tambah cabang', 'guide:Berapa banyak outlet dan pengguna yang bisa ditambahkan?']],
    [['cara nambahin karyawan baru', 'guide:Bagaimana cara menambah karyawan baru?']],
    [['cara atur gaji', 'guide:Gaji Pegawai Sesuai Absensi']],
    [['cara atur pajak', 'guide:Menambahkan Pajak']],
    [['diskon', 'guide:Menambahkan Diskon']],
    [['cara bikin promo', 'guide:Menambahkan Diskon']],
    [['cara kasih diskon ke pelanggan', 'guide:Bagaimana cara memberikan diskon ke pelanggan?']],
    [['pelanggan mau ngutang', 'guide:Mencatat dan Melunasi Kasbon']],
    [['poin member', 'guide:Apakah Loka Kasir punya program loyalty poin untuk pelanggan?']],
    [['split bill', 'guide:Pisah Struk & Bayar Terpisah']],
    [['transaksi kemarin lupa diinput', 'guide:Mencatat Transaksi yang Terlupa (Transaksi Susulan)']],
    [['biaya layanan', 'guide:Mengatur biaya pelayanan']],
    [['service charge', 'guide:Mengatur Transaksi dan Pembayaran']],
    [['setor ke penitip', 'guide:Setoran Penjualan kepada Penitip']],
    [['kembalian', 'guide:Buka Kasir & Mulai Shift']],
    [['pembulatan harga', 'maybe:Mengatur Transaksi dan Pembayaran']],
    [['kasbon karyawan', 'maybe:Mencatat dan Melunasi Kasbon']],

    // ── Bahasa percakapan: singkatan, imbuhan, kata sambung ──
    [['gimana sih cara nutup kasir kalo udah malem', 'guide:Tutup Shift']],
    [['kak cara buka kasir pagi2 gimana ya', 'guide:Buka Kasir & Mulai Shift']],
    [['mau liat penjualan kemaren dimana ya', 'guide:Ringkasan dan Filter Penjualan']],
    [['cara ngecek stok yg mau abis', 'guide:Bagaimana cara memantau stok yang hampir habis?']],
    [['gmn cara nambahin menu baru di kasir', 'choices:Bagaimana cara menambah produk ke dalam sistem?']],
    [['mau nambahin logo toko di struk', 'guide:Mengatur Tampilan Struk']],
    [['tulisan struk kekecilan', 'guide:Mengatur Ukuran dan Jenis Huruf Struk']],
    [['kasir saya lupa pin nya', 'guide:Lupa PIN kasir']],
    [['cara bikin akun buat karyawan', 'guide:Bagaimana cara menambah karyawan baru?']],
    [['biar kasir ga bisa hapus transaksi gimana', 'guide:Bagaimana cara mengatur hak akses secara granular per karyawan?']],
    [['bisa hutang dulu ga pelanggannya', 'guide:Mencatat dan Melunasi Kasbon']],
    [['cara nagih kasbon', 'guide:Mencatat dan Melunasi Kasbon']],
    [['bisa export ke excel ga laporannya', 'guide:Bisakah laporan diekspor ke Excel atau PDF?']],
    [['untung bersih saya berapa liatnya dimana', 'maybe:Laba Rugi, Neraca & Buku Besar']],
    [['cara masukin pengeluaran toko', 'guide:Mencatat Kas Masuk & Kas Keluar dari Laci']],
    [['kalo punya 2 toko gimana', 'guide:Berapa banyak outlet dan pengguna yang bisa ditambahkan?']],
    [['absen karyawan pake apa', 'guide:Absensi Masuk & Pulang']],
    [['cara tf stok ke cabang lain', 'guide:Bagaimana cara transfer stok antar outlet atau cabang?']],
    [['buat toko baju bisa ga', 'guide:Jenis bisnis apa saja yang cocok menggunakan Loka Kasir?']],
    [['support ipad ga', 'guide:Di perangkat apa saja App Kasir bisa dijalankan?']],
    [['bisa pake qris ga kak', 'topic:qris']],
    [['harga nya berapaan sih', 'topic:pricing']],
    [['ada demo nya ga', 'topic:trial']],
    [['mau coba dulu', 'topic:trial']],
    [['aplikasinya ada di playstore?', 'topic:download']],
    [['link downloadnya mana', 'topic:download']],
    [['internet mati masih bisa jualan ga', 'topic:offline']],
    [['printer nya nyala tp ga keluar kertas', 'choices:Android|Windows']],
    [['struk bisa dikirim ke wa ga', 'fallback']],

    // ── Kendala ──
    [['lupa password', 'guide:Lupa Kata Sandi dan Pemulihan Akun']],
    [['cara ganti password', 'guide:Lupa Kata Sandi dan Pemulihan Akun']],
    [['lupa pin kasir', 'guide:Lupa PIN kasir']],
    [['otp tidak masuk', 'guide:Mengirim ulang OTP pemulihan akun']],
    [['absen ditolak lokasi', 'guide:Mengatasi Absensi Ditolak karena Lokasi']],
    [['transaksi belum sinkron', 'guide:Memeriksa Transaksi yang Belum Tersinkron']],
    [['printer tidak mencetak di android', 'guide:Printer tidak mencetak di Android']],
    [['struknya kepotong', 'choices:Android|Windows']],
    [['qris belum masuk', 'handoff']],
    [['refund belum balik', 'handoff']],
    [['aplikasinya lemot', 'handoff']],
    [['tidak bisa login', 'handoff']],
    [['sudah bayar langganan tapi belum aktif', 'handoff']],

    // ── Percakapan bersambung ──
    [['printer ga bisa nyetak', 'choices:Android|Windows'], ['windows', 'guide:Printer tidak mencetak di Windows']],
    [['printer ga bisa nyetak', 'choices:Android|Windows'], ['yang kedua', 'guide:Printer tidak mencetak di Windows']],
    [['printernya ga mau konek', 'choices:Android|Windows'], ['kalau di android?', 'guide:Printer tidak mencetak di Android']],
    [['printer tidak mencetak di android', 'guide:Printer tidak mencetak di Android'], ['kalau windows?', 'guide:Printer tidak mencetak di Windows']],
    [['cara refund', 'guide:Pembatalan Transaksi dan Refund'], ['terus?', 'talk:next']],
    [['cara refund', 'guide:Pembatalan Transaksi dan Refund'], ['menunya di mana', 'guide:Pembatalan Transaksi dan Refund']],
    [['cara refund', 'guide:Pembatalan Transaksi dan Refund'], ['makasih', 'talk:thanks']],
    [['cara nutup kasir kalo udah malem', 'guide:Tutup Shift'], ['trus?', 'talk:next']],
    [['shift', 'choices:Buka Kasir & Mulai Shift|Tutup Shift'], ['terus?', 'talk:pick']],

    // ── Di luar pengetahuan bot ──
    [['cara hapus produk', 'fallback']],
    [['cuaca hari ini gimana', 'fallback']],
    [['asdfgh', 'fallback']],
    [['?', 'talk:empty']],
  ],
  en: [
    [['hello', 'talk:greeting']],
    [['Thanks!', 'talk:thanks']],
    [['are you a bot?', 'talk:identity']],
    [['can I talk to a human', 'talk:human']],
    [['how much does it cost', 'topic:pricing']],
    [['I forgot my password', 'fallback']],
    [['what is the weather', 'fallback']],
  ],
  ms: [
    [['hai', 'talk:greeting']],
    [['terima kasih', 'talk:thanks']],
    [['nak cakap dengan admin', 'talk:human']],
    [['harga langganan', 'topic:pricing']],
  ],
  ja: [
    [['こんにちは', 'talk:greeting']],
    [['ありがとうございます', 'talk:thanks']],
    [['担当者と話したい', 'talk:human']],
    [['料金はいくらですか', 'topic:pricing']],
  ],
};

function describe(reply: ChatReply) {
  switch (reply.kind) {
    case 'talk': return `talk:${reply.talk}`;
    case 'topic': return `topic:${reply.topic}`;
    case 'guide': return `guide:${reply.guide.title}`;
    case 'choices': return `${reply.prompt === 'maybe' ? 'maybe' : 'choices'}:${reply.choices.map(({ label }) => label).join('|')}`;
    default: return reply.kind;
  }
}

function meets(actual: string, expected: string) {
  const kind = expected.split(':')[0];
  const labels = expected.slice(kind.length + 1);
  if (kind !== 'choices' && kind !== 'maybe') return actual === expected;
  const offered = actual.startsWith(`${kind}:`) ? actual.slice(kind.length + 1).split('|') : undefined;
  return !!offered && labels.split('|').every((label) => offered.includes(label));
}

let total = 0;
const failures: string[] = [];
for (const [locale, list] of Object.entries(conversations) as [Locale, Step[][]][]) {
  const copy = supportChatCopy[locale];
  for (const steps of list) {
    let previous: ChatReply | undefined;
    for (const [question, expected] of steps) {
      const reply = quickReply(copy, locale, question, previous) ?? guideReply(copy, question, previous, findGuideMatch);
      const actual = describe(reply);
      total++;
      if (!meets(actual, expected)) failures.push(`[${locale}] "${question}"\n      harapan: ${expected}\n      hasil:   ${actual}`);
      previous = reply;
    }
  }
}

if (failures.length) {
  console.error(`Tanya Loka: ${failures.length} dari ${total} pertanyaan dijawab tidak sesuai harapan.\n\n  ${failures.join('\n\n  ')}\n`);
  process.exit(1);
}
console.log(`Tanya Loka: ${total} pertanyaan dijawab sesuai harapan.`);
