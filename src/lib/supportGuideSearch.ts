import { faqCategoryId } from '@/data/faq/categoryId';
import { faqsId } from '@/data/faq/id';
import { featureGuideGroups, featureGuideId } from '@/data/site/featureGuides';
import { siteLinks } from '@/data/site/links';
import { getGuides, PRINTER_WINDOWS_CHECK } from '@/data/site/panduan';

export type GuideAnswer = {
  title: string;
  href: string;
  pdf?: boolean;
  faq?: boolean;
  text?: string;
  steps?: { title?: string; body: string }[];
  tip?: string;
};

type GuideChoice = { label: string; match: GuideMatch };
export type GuideMatch =
  | { kind: 'guide'; guide: GuideAnswer }
  | { kind: 'choices'; prompt: 'topic' | 'platform' | 'maybe'; choices: GuideChoice[] };

const { panduan, panduanPdf, faq } = siteLinks('id');
const guides = getGuides('id');
const faqsByQuestion = new Map(faqsId.map((faq) => [faq.question, faq]));

const keywordsByGuide: Record<string, string> = {
  'absensi': 'absen karyawan pegawai hadir kehadiran',
  'login': 'masuk aplikasi masuk akun sign in',
  'tambah-produk': 'masukkan produk baru input menu baru',
  'membership-loka': 'perpanjang langganan berhenti langganan upgrade paket pro bayar langganan',
  'buka-kasir': 'buka shift mulai shift modal awal uang kembalian',
  'tutup-shift': 'tutup kasir akhiri shift selisih kas hitung laci',
  'printer-thermal': 'sambungkan hubungkan pasang printer bluetooth usb tes cetak',
  'lupa-kata-sandi': 'ganti password ubah kata sandi reset password',
  'riwayat-struk': 'cetak ulang struk lama nota riwayat penjualan',
  'pisah-struk': 'split bill pisah tagihan bayar terpisah patungan',
  'meja-layar-dapur': 'kds kitchen display system layar dapur',
  'stok-opname': 'stock opname inventaris cek stok fisik',
  'impor-produk-csv': 'import upload csv excel produk massal',
  'pembatalan-refund': 'cancel void batalkan nota kembalikan uang refund',
  'transaksi-susulan': 'input transaksi lama ganti tanggal transaksi backdate',
  'pengaturan-transaksi': 'aktifkan unggah qris statis metode pembayaran pembulatan biaya pelayanan biaya layanan service charge biaya per transaksi',
  'tampilan-struk': 'logo struk ukuran kertas 58 mm 80 mm',
  'kas-masuk-keluar': 'uang laci kas kecil pengeluaran kasir peti kas',
  'kasbon': 'utang pelanggan piutang cicil lunasi tagihan',
  'gaji-absensi': 'payroll penggajian upah karyawan',
  'fitur-qr-bernominal-otomatis': 'qris dinamis aktifkan nominal otomatis',
  'fitur-masuk-dengan-verifikasi-biometrik': 'sidik jari fingerprint face id pengenalan wajah',
  'fitur-mode-kiosk-member-check-in-sendiri': 'kiosk kios checkin mandiri gym pintu',
  'fitur-buka-booking-online': 'booking lapangan reservasi jadwal online',
  'fitur-cetak-laporan-tutup-kasir-dengan-huruf-besar': 'cetak rekap shift ringkasan shift',
};

// Kata yang dipakai orang untuk bertanya tetapi tidak ada di judul FAQ-nya.
// Semua FAQ ikut dicari; yang tidak tercantum di sini mengandalkan judulnya.
const faqKeywords: Record<string, string> = {
  'Bagaimana cara mengatur hak akses secara granular per karyawan?': 'izin batasi larang kasir boleh hapus refund void diskon transaksi',
  'Berapa banyak outlet dan pengguna yang bisa ditambahkan?': 'batas maksimal cabang limit outlet jumlah outlet pengguna multi kasir karyawan user',
  'Bagaimana cara menambah karyawan baru?': 'tambah pegawai atur pin kasir akun karyawan',
  'Bagaimana cara transfer stok antar outlet atau cabang?': 'mutasi pindah barang stok cabang transfer antar outlet',
  'Apa itu metode Moving Average untuk HPP?': 'rata rata tertimbang harga pokok penjualan moving average',
  'Apakah pelanggan bisa menyimpan saldo (deposit) di toko?': 'deposit saldo pelanggan top up isi ulang',
  'Di perangkat apa saja App Kasir bisa dijalankan?': 'iphone ios ipad apple mac macbook android windows tablet hp laptop pc komputer spesifikasi ram versi',
  'Jenis bisnis apa saja yang cocok menggunakan Loka Kasir?': 'usaha cocok laundry warung kopi kafe cafe resto restoran rumah makan toko kelontong retail fashion butik baju pakaian distro sembako minimarket bakery bengkel salon barbershop apotek jasa umkm jualan',
  'Apakah ada biaya tambahan di luar harga langganan?': 'biaya tersembunyi setup komisi per transaksi',
  'Bagaimana keamanan data bisnis saya?': 'aman data hilang backup cadangan privasi enkripsi',
  'Bisakah saya meminta fitur baru yang belum ada di Loka Kasir?': 'minta request usul saran fitur',
  'Apakah Loka Kasir bisa diajak kerjasama?': 'kerja sama partner reseller afiliasi mitra',
  'Apakah tim Loka Kasir bisa membantu setup?': 'bantu pasang instalasi training pelatihan onboarding',
  'Apakah Loka Kasir punya program loyalty poin untuk pelanggan?': 'poin loyalitas reward hadiah member',
  'Apa itu HPP dan mengapa penting untuk bisnis saya?': 'hpp harga pokok penjualan arti',
  'Metode pembayaran apa saja yang didukung?': 'cara bayar tunai transfer debit kredit kartu ewallet dompet digital',
  'Apa itu variasi produk dan bagaimana cara menggunakannya?': 'varian ukuran warna size',
  'Bisakah satu produk punya level pedas, topping, dan pilihan panas/dingin?': 'modifier add on tambahan pilihan',
  'Apa itu Bundle dan bagaimana cara membuatnya?': 'bundling paket hemat',
  'Bagaimana cara memantau stok yang hampir habis?': 'stok menipis minimum peringatan notifikasi',
  'Apa saja peran (role) yang tersedia dan apa bedanya?': 'owner manager supervisor kasir jabatan',
  'Apa itu Purchase Order dan bagaimana cara menggunakannya?': 'po pembelian supplier pemasok kulakan',
  'Apa itu Rapor Toko dan Radar Kebocoran?': 'radar bocor kecurangan',
  'Apa bedanya App Kasir dan Web Admin Loka Kasir?': 'beda perbedaan dashboard dasbor',
};

const broadTopics: Record<string, string[]> = {
  shift: ['buka-kasir', 'tutup-shift', 'jadwal-shift'],
  stok: ['bahan-baku-stok-masuk', 'stok-opname', 'kurangi-stok'],
  produk: ['tambah-produk', 'impor-produk-csv', 'harga-modal'],
  absensi: ['absensi', 'lokasi-absensi', 'absensi-ditolak-lokasi'],
  struk: ['riwayat-struk', 'tampilan-struk', 'printer-tidak-mencetak'],
  printer: ['printer-thermal', 'printer-tidak-mencetak', 'cetak-otomatis-laci'],
  pin: ['karyawan-pin', 'lupa-kata-sandi', 'profil-fitur-toko'],
  laporan: ['ringkasan-penjualan', 'laporan-ekspor', 'laporan-keuangan'],
};

const stopWords = new Set((
  'apa apakah bagaimana gimana gmn dimana di mana kenapa mengapa kok cara langkah yang untuk ' +
  'dari dengan dan ke pada dong ya kah sih nih bang kak min halo hai mohon tolong bisa mau ingin ' +
  'saya aku kita kami kamu anda boleh perlu tentang loka aplikasi app ini itu ada aja saja ga gak nggak ' +
  'sudah belum masih harus paling saat kalau kalo bila setelah sebelum secara lebih baru supaya spya biar ka ' +
  // Kata tanya dan kata kerja umum: "kamu siapa" dulu dijawab panduan "Atur
  // siapa yang boleh mengubah meja", dan "bisa buat laundry" tersangkut di
  // setiap judul "Membuat …".
  'siapa kapan berapa mana pakai pake memakai gunakan menggunakan buat bikin membuat lagi juga deh tuh nya ' +
  'permisi selamat pagi siang sore malam makasih terima kasih mas mbak bro gan ' +
  'satu dua tiga dulu duluan hari banyak tanya nanya pertanyaan ' +
  // Kata sambung dan partikel percakapan. Tanpa ini "cara nutup kasir kalo
  // udah malem" berisi dua kata yang tidak ada di panduan mana pun, dan
  // pertanyaannya dianggap tidak cocok dengan Tutup Shift.
  'udah udh dah sdh blm belom yg tp tapi klo kl gitu gini begitu begini doang cuma emang memang kan pas tadi nanti ' +
  'sekarang skrg gue gw lu lo ane dia mereka trus terus lalu dgn utk malem tidak tdk ngga engga enggak tak punya lewat ' +
  'lain support loh lho berapaan kemarin kemaren kmrn besok '
).trim().split(/\s+/));

const wordVariants = [
  'absen absensi kehadiran', 'atur mengatur setelan setting konfigurasi', 'aktif aktifkan aktifin mengaktifkan nyalakan menyalakan',
  'batal batalkan membatalkan pembatalan cancel void', 'bayar membayar pembayaran dibayar',
  'buka membuka pembukaan', 'catat mencatat dicatat pencatatan input terinput nyatet nyatat',
  'cetak mencetak nyetak tercetak diprint print mencetaknya dicetak pencetakan', 'cicil cicilan mencicil dicicil', 'coba mencoba cobain',
  'diskon potongan promo promosi', 'ekspor export mengekspor diekspor download unduh', 'harga harganya', 'impor import unggah upload',
  'karyawan pegawai staf staff', 'kasbon bon', 'laporan report', 'login signin', 'laba untung keuntungan profit', 'pajak ppn pb1 tax',
  'masuk masukin masukkin masukkan memasukkan dimasukkan',
  'lunas lunasi lunasin melunasi pelunasan', 'lupa terlupa kelupaan', 'password sandi pass',
  'pindah pindahkan memindahkan pemindahan', 'pin pinnya', 'pilih pilihan memilih dipilih', 'pasang memasang pemasangan',
  'printer pencetak prnter', 'refund direfund pengembalian', 'sambung tersambung menyambung sambungin nyambung hubungkan menghubungkan konek konekin connect',
  'sewa penyewaan', 'sinkron sinkronkan tersinkron sinkronisasi terkirim', 'stok stock persediaan',
  'struk nota resit receipt', 'tambah menambah penambahan tambahin nambah nambahin', 'titipan konsinyasi',
  'tutup menutup penutupan', 'ubah mengubah merubah perubahan ganti mengganti edit',
  'hapus menghapus delete apus', 'utang hutang ngutang berutang berhutang', 'beri kasih memberi memberikan ngasih',
  'lihat melihat liat ngeliat', 'cek mengecek ngecek periksa memeriksa', 'outlet cabang',
  'uang duit', 'hilang ilang', 'transfer tf', 'habis abis', 'tagih nagih menagih', 'produk item',
].map((group) => group.split(' '));

const normalizedWords = new Map(wordVariants.flatMap(([base, ...words]) => words.map((word) => [word, base] as const)));

function normalize(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ')
    .replace(/\bkata sandi\b/g, 'password')
    .replace(/\b(check|log)[ -]in\b/g, '$1in')
    .replace(/\bqr[ -]is\b/g, 'qris')
    .replace(/\bper(bulan|tahun|hari|minggu)\b/g, 'per $1')
    // "Punya 2 toko" adalah pertanyaan soal multi-outlet, bukan soal toko.
    .replace(/\b(?:2|3|dua|tiga|banyak|beberapa) (?:toko|cabang|outlet|gerai)\b/g, 'multi outlet')
    // Pasif percakapan: "kepotong" = "terpotong".
    .replace(/\bke(potong|cetak|hapus|kirim|simpan|tutup|buka)\b/g, 'ter$1');
}

function rawWords(text: string) {
  return normalize(text).match(/[a-z0-9]+/g) ?? [];
}

const variantBases = new Set(wordVariants.map(([base]) => base));

// Setiap kata yang benar-benar tertulis di panduan, FAQ, dan kata kuncinya.
// Imbuhan hanya dilepas bila sisanya ada di sini, jadi "ditambahkan" menjadi
// "tambah" tetapi "diskon" tidak pernah menjadi "skon".
const vocabulary = new Set([
  ...guides.flatMap((guide) => [guide.title, guide.desc, guide.intro, guide.tip, ...(guide.steps ?? []).flatMap((step) => [step.title, step.body])]),
  ...faqsId.flatMap((faq) => [faq.question, faq.answer]),
  ...featureGuideGroups.flatMap(({ group, guides }) => [group, ...guides.flatMap((guide) => [guide.title, ...guide.steps])]),
  ...Object.values(keywordsByGuide),
  ...Object.values(faqKeywords),
].flatMap((text) => text ? rawWords(text) : []).filter((word) => word.length > 2 && !stopWords.has(word))
  .map((word) => normalizedWords.get(word) ?? word));

// Awalan baku dan awalan percakapan ("nyetak", "ngutang", "nambah"), beserta
// huruf yang luluh di belakangnya.
const prefixes: [RegExp, string[]][] = [
  [/^meng/, ['', 'k']], [/^meny/, ['s']], [/^mem/, ['', 'p']], [/^men/, ['', 't']], [/^me/, ['']],
  [/^peng/, ['', 'k']], [/^peny/, ['s']], [/^pem/, ['', 'p']], [/^pen/, ['', 't']], [/^pe/, ['']],
  [/^di/, ['']], [/^ter/, ['']], [/^ber/, ['']],
  [/^nge/, ['']], [/^ng/, ['', 'k']], [/^ny/, ['s', 'c']], [/^n/, ['t']], [/^m/, ['p']],
];
const suffix = /(?:kan|in|an|i)$/;
// Kata jadian yang artinya sudah jauh dari kata dasarnya: uang "kembalian"
// bukan "kembalikan" meja yang terhapus.
const fixedWords = new Set(['kembalian']);
// Kata kerja yang ada di separuh judul panduan ("Mengatur …", "Menambahkan
// …") dan "kasir", yang ada di hampir semuanya. Sendirian, kata ini tidak
// menunjukkan panduan mana yang dimaksud.
const actionWords = new Set(['atur', 'tambah', 'ubah', 'lihat', 'hapus', 'catat', 'cek', 'pasang', 'isi', 'pilih', 'coba', 'beri', 'kasir']);

function knownWord(word: string) {
  if (word.length < 3 || stopWords.has(word)) return;
  const base = normalizedWords.get(word) ?? word;
  return vocabulary.has(base) || variantBases.has(base) ? base : undefined;
}

function stripAffixes(word: string) {
  const mapped = normalizedWords.get(word);
  if (mapped) return mapped;
  if (variantBases.has(word) || fixedWords.has(word) || word.length < 5) return word;
  const bare = word.replace(/(?:nya|kah|lah)$/, '');
  if (bare !== word && (stopWords.has(bare) || knownWord(bare))) return knownWord(bare) ?? bare;
  const roots = prefixes.flatMap(([prefix, restored]) => prefix.test(bare)
    ? restored.map((letter) => letter + bare.replace(prefix, ''))
    : []);
  const candidates = [bare.replace(suffix, ''), ...roots, ...roots.map((root) => root.replace(suffix, ''))];
  for (const candidate of candidates) {
    const known = candidate !== word && knownWord(candidate);
    if (known) return known;
  }
  return word;
}

const stems = new Map<string, string>();

function stem(word: string) {
  let result = stems.get(word);
  if (result) return result;
  result = word;
  for (let pass = 0; pass < 3; pass++) {
    const next = stripAffixes(result);
    if (next === result) break;
    result = next;
  }
  stems.set(word, result);
  return result;
}

function tokens(text: string) {
  return rawWords(text).filter((word) => word.length > 1 && !stopWords.has(word))
    .map(stem).filter((word) => !stopWords.has(word));
}

function indexAnswer(answer: GuideAnswer, keywords: string, context: string, detail: string) {
  return {
    answer,
    title: tokens(answer.title).join(' '),
    keywords: tokens(keywords).join(' '),
    primary: new Set(tokens(`${answer.title} ${keywords}`)),
    context: new Set(tokens(context)),
    detail: new Set(tokens(detail)),
  };
}

const webAnswers = new Map(guides.map((guide) => [guide.slug, {
  title: guide.title,
  href: `${panduan}/${guide.slug}`,
  text: guide.intro ?? guide.desc,
  steps: guide.steps,
  tip: guide.tip,
} satisfies GuideAnswer]));

const webIndex = guides.flatMap((guide) => {
  const answer = webAnswers.get(guide.slug)!;
  const linkedFaqs = (guide.faq ?? []).flatMap((question) => {
    const faq = faqsByQuestion.get(question);
    return faq ? [indexAnswer({ title: faq.question, href: answer.href, text: faq.answer }, faqKeywords[question] ?? '', '', faq.answer)] : [];
  });
  if (!guide.steps?.length && linkedFaqs.length) {
    return linkedFaqs.map((entry, index) => index === 0 ? {
      ...entry,
      primary: new Set([...entry.primary, ...tokens(`${guide.title} ${keywordsByGuide[guide.slug] ?? ''}`)]),
      context: new Set(tokens(guide.desc)),
    } : entry);
  }
  const context = [guide.desc, guide.intro, ...(guide.steps ?? []).map((step) => step.title)].filter(Boolean).join(' ');
  const detail = [guide.tip, ...(guide.steps ?? []).map((step) => step.body)].filter(Boolean).join(' ');
  return [indexAnswer(answer, keywordsByGuide[guide.slug] ?? '', context, detail), ...linkedFaqs];
});

const featureIndex = featureGuideGroups.flatMap(({ group, guides }) => guides.map((guide) => {
  const id = featureGuideId(guide.title);
  return indexAnswer({
    title: guide.title,
    href: `${panduanPdf}#nameddest=${id}`,
    pdf: true,
    steps: guide.steps.map((body) => ({ body })),
  }, keywordsByGuide[id] ?? '', group, guide.steps.join(' '));
}));

const linkedFaqs = new Set(guides.flatMap((guide) => guide.faq ?? []));

const searchIndex = [
  ...webIndex,
  ...featureIndex,
  // FAQ yang tidak menjadi isi sebuah panduan dijawab dari halaman FAQ.
  ...faqsId.flatMap((item) => {
    if (!item.category || linkedFaqs.has(item.question)) return [];
    return [indexAnswer({ title: item.question, href: `${faq}#${faqCategoryId(item.category)}`, faq: true, text: item.answer }, faqKeywords[item.question] ?? '', '', item.answer)];
  }),
];

// Di berapa jawaban sebuah kata menjadi kata utama. Kata yang ada di mana-mana
// ("transaksi", "produk") tidak cukup untuk menebak maksud penanya.
const rareWordUse = 5;
const primaryUse = new Map<string, number>();
for (const { primary } of searchIndex) {
  for (const word of primary) primaryUse.set(word, (primaryUse.get(word) ?? 0) + 1);
}

function answer(guide: GuideAnswer): GuideMatch {
  return { kind: 'guide', guide };
}

function chapter(slug: string) {
  const guide = webAnswers.get(slug);
  return guide && answer(guide);
}

function chapterSteps(slug: string, title: string, stepTitles: string[]) {
  const guide = webAnswers.get(slug);
  const steps = guide?.steps?.filter((step) => stepTitles.includes(step.title));
  if (guide && steps?.length) return answer({ title, href: guide.href, steps });
  return chapter(slug);
}

const ordinals = ['1', '2', '3', 'satu', 'dua', 'tiga', 'pertama', 'kedua', 'ketiga'];
const platformWords = new Set(['windows', 'pc', 'laptop', 'komputer', 'android', 'hp', 'tablet', 'bluetooth']);

function printerTroubleshooting(words: ReadonlySet<string>): GuideMatch | undefined {
  const guide = webAnswers.get('printer-tidak-mencetak');
  if (!guide) return;
  const android = answer({ ...guide, title: 'Printer tidak mencetak di Android' });
  const windows = answer({ title: 'Printer tidak mencetak di Windows', href: guide.href, text: PRINTER_WINDOWS_CHECK });
  const onWindows = words.has('windows') || words.has('pc') || words.has('laptop');
  const onAndroid = words.has('android') || words.has('hp');
  if (onWindows && !onAndroid) return windows;
  if (!onWindows && (onAndroid || words.has('bluetooth'))) return android;
  return { kind: 'choices', prompt: 'platform', choices: [
    { label: 'Android', match: android },
    { label: 'Windows', match: windows },
  ] };
}

function troubleshoot(question: string, words: Set<string>, isIssue: boolean): GuideMatch | undefined {
  const isPaymentIssue = /\b(?:qris|refund|uang|transfer|saldo)\b/.test(question)
    && /\b(?:belum masuk|tidak masuk|belum balik|tidak balik|terpotong|sudah transfer)\b/.test(question);
  if (isPaymentIssue) return;

  if (words.has('pin') && /\b(?:lupa|reset|atur ulang|ganti)\b/.test(question)) {
    if (words.has('supervisor')) return;
    const recoveryGuide = webAnswers.get('lupa-kata-sandi');
    return recoveryGuide && answer({ title: 'Lupa PIN kasir', href: recoveryGuide.href, text: recoveryGuide.tip });
  }
  if ((words.has('password') && /\b(?:lupa|reset|atur ulang|pemulihan)\b/.test(question)) || (words.has('otp') && isIssue)) {
    if (/\b(?:wifi|wi-fi|router|gmail|instagram|facebook|daftar|pendaftaran|registrasi)\b/.test(question)) return;
    return words.has('otp') && !words.has('password')
      ? chapterSteps('lupa-kata-sandi', 'Mengirim ulang OTP pemulihan akun', ['Masukkan kode OTP'])
      : chapter('lupa-kata-sandi');
  }
  const printSymptom = /\b(?:blank|kosong|kertas putih)\b/.test(question)
    || (isIssue && /\b(?:cetak|mencetak|keluar|muncul|tercetak|terpotong)\b/.test(question));
  if ((words.has('printer') && isIssue) || ((words.has('printer') || words.has('struk')) && printSymptom)) {
    return printerTroubleshooting(words);
  }
  if (words.has('transaksi') && (words.has('sinkron') || (words.has('online') && /\bbelum masuk\b/.test(question))) && (isIssue || /\bbelum\b/.test(question))) {
    return chapter('transaksi-belum-sinkron');
  }
  if (words.has('absen') && /\b(?:gps|radius|lokasi)\b/.test(question) && isIssue) {
    return chapter('absensi-ditolak-lokasi');
  }
  if (/\b(?:cara|bagaimana|gimana)\b/.test(question) && /\b(?:refund|batal|batalkan|kembalikan)\b/.test(question)
      && /\b(?:sudah bayar|sudah dibayar|sudah lunas)\b/.test(question) && !/\b(?:gagal|error|belum)\b/.test(question)) {
    return chapter('pembatalan-refund');
  }
}

function focusedGuide(words: Set<string>) {
  if (words.has('qris') && !words.has('offline') && (words.has('struk') || (
    !['nominal', 'otomatis', 'dinamis'].some((word) => words.has(word))
    && ['aktif', 'impor', 'statis', 'pasang'].some((word) => words.has(word))
  ))) {
    return chapterSteps('pengaturan-transaksi', 'Menyiapkan pembayaran QRIS', ['Buka Transaksi & Pembayaran', 'Siapkan QRIS', 'Simpan']);
  }
  if (words.has('struk') && words.has('logo')) return chapter('tampilan-struk');
  if (words.has('biaya') && (words.has('layanan') || words.has('pelayanan'))) {
    return chapterSteps('pengaturan-transaksi', 'Mengatur biaya pelayanan', ['Buka Transaksi & Pembayaran', 'Atur biaya dan pembulatan', 'Simpan']);
  }
  if (words.has('tutup') && words.has('kasir') && words.has('tanpa') && words.has('nominal')) return chapter('profil-fitur-toko');
}

type IndexEntry = ReturnType<typeof indexAnswer>;

function termWeights(entry: IndexEntry, terms: string[]) {
  return terms.map((term) => entry.primary.has(term) ? (actionWords.has(term) ? 3 : 5)
    : entry.context.has(term) ? 3 : entry.detail.has(term) ? 1 : 0);
}

function rankGuides(terms: string[]) {
  const query = terms.join(' ');
  return searchIndex.flatMap((entry) => {
    const weights = termWeights(entry, terms);
    const matched = weights.filter(Boolean).length;
    const focused = weights.filter((weight) => weight >= 3).length;
    if (!weights.includes(5) || matched * 3 < terms.length * 2 || focused < Math.min(2, terms.length)) return [];
    if (terms.length >= 4 && matched < terms.length && weights.filter((weight) => weight === 5).length < 2) return [];
    const alias = terms.length > 1 && entry.keywords.includes(query);
    const opening = terms.length > 1 && entry.title.startsWith(`${query} `);
    const phraseBonus = entry.title === query ? 8 : opening ? 5 : entry.title.includes(query) || alias ? 3 : 0;
    // Bab Buku Panduan menang atas "Yang baru" dan halaman FAQ yang membahas
    // hal yang sama; FAQ hanya menjawab bila tidak ada panduannya.
    const chapter = terms.length > 1 && !entry.answer.pdf && !entry.answer.faq ? 2 : 0;
    const score = weights.reduce((sum, weight) => sum + weight, phraseBonus + chapter - (entry.answer.faq ? 2 : 0));
    return [{ answer: entry.answer, score }];
  }).sort((a, b) => b.score - a.score);
}

// Tidak ada jawaban yang cukup yakin: tawarkan yang paling dekat alih-alih
// menyerah. Yang dihitung hanya kata yang jarang menjadi kata utama —
// "pembulatan" menunjuk satu panduan, "stok" menunjuk delapan — dan minimal
// separuh kata penanya harus ada di jawabannya.
function nearestGuides(terms: string[], words: ReadonlySet<string>): GuideMatch | undefined {
  const nearest = searchIndex.flatMap((entry) => {
    const weights = termWeights(entry, terms);
    const score = terms.reduce((sum, term, index) => {
      const use = primaryUse.get(term) ?? 0;
      return weights[index] === 5 && use <= rareWordUse ? sum + 1 / use : sum;
    }, 0);
    // "Lihat", "atur", dan sejenisnya tidak ikut dihitung: "lihat untung
    // bersih" tetap menunjuk Laba Rugi walau hanya "untung" yang cocok.
    const asked = terms.filter((term) => !actionWords.has(term)).length;
    const found = terms.filter((term, index) => weights[index] && !actionWords.has(term)).length;
    if (!score || found * 2 < asked) return [];
    return [{ answer: entry.answer, score }];
  }).sort((a, b) => b.score - a.score);
  const close = nearest.filter((result) => result.score * 2 >= nearest[0].score);
  const unique = [...new Map(close.map((result) => [result.answer.title, result.answer])).values()].slice(0, 3);
  if (unique.length) return { ...topicChoices(unique, words), prompt: 'maybe' };
}

function matchGuide(guide: GuideAnswer, words: ReadonlySet<string>): GuideMatch {
  if (guide.href === `${panduan}/printer-tidak-mencetak`) return printerTroubleshooting(words) ?? answer(guide);
  return answer(guide);
}

function topicChoices(answers: GuideAnswer[], words: ReadonlySet<string>): Extract<GuideMatch, { kind: 'choices' }> {
  const choices = answers.map((guide) => ({
    label: guide.title,
    match: matchGuide(guide, words),
  }));
  return { kind: 'choices', prompt: 'topic', choices };
}

export function findGuideMatch(question: string, isIssue: boolean, previous?: GuideMatch): GuideMatch | undefined {
  const normalized = normalize(question);
  const words = new Set(tokens(normalized));
  const terms = [...words];
  if (!terms.length) return;

  if (previous?.kind === 'choices') {
    const selection = tokens(normalized.replace(/\b(?:pakai|pake|gunakan|perangkat|komputer|pc|laptop|hp|tablet)\b/g, ' ')).join(' ');
    const option = previous.choices.find(({ label }) => selection === tokens(label).join(' '));
    if (option) return option.match;
    // "yang kedua", "nomor 2".
    const ordinal = normalized.match(/^(?:yang |nomor |no |ke ?)*(1|2|3|satu|dua|tiga|pertama|kedua|ketiga)[?!.\s]*$/)?.[1];
    const byOrder = ordinal && previous.choices[ordinals.indexOf(ordinal) % 3];
    if (byOrder) return byOrder.match;
  }
  // Setelah jawaban printer, "kalau di Windows?" berarti printer di Windows.
  if (previous?.kind === 'guide' && previous.guide.href === `${panduan}/printer-tidak-mencetak` && terms.every((term) => platformWords.has(term))) {
    const platform = printerTroubleshooting(words);
    if (platform?.kind === 'guide') return platform;
  }
  if (previous?.kind === 'guide' && /^(?:(?:terus|lalu|nah)\s+)?(?:di\s*mana menunya|menunya di\s*mana|langkah pertama(?:nya)? apa)[?!.\s]*$/.test(normalized)) {
    const guide = previous.guide;
    const first = guide.steps?.find((step) => step.body.includes('›') || step.body.includes('→')) ?? guide.steps?.[0];
    if (first) return answer({ title: guide.title, href: guide.href, pdf: guide.pdf, steps: [first] });
  }

  const troubleshooting = troubleshoot(normalized, words, isIssue);
  if (troubleshooting || isIssue) return troubleshooting;

  const clauses = normalized.split(/\s+(?:dan|lalu)\s+(?=(?:cara\s+)?(?:ekspor|export|impor|import|refund|cetak|nyetak|tutup|tambah|nyalakan|aktifkan)\b)/);
  if (clauses.length > 1) {
    const choices = clauses.flatMap((clause) => {
      const match = findGuideMatch(clause, false);
      if (!match) return [];
      const label = match.kind === 'guide' ? match.guide.title : clause.charAt(0).toUpperCase() + clause.slice(1);
      return [{ label, match }];
    });
    const distinct = [...new Map(choices.map((choice) => [choice.label, choice])).values()];
    if (distinct.length > 1) return { kind: 'choices', prompt: 'topic', choices: distinct.slice(0, 3) };
  }
  const focused = focusedGuide(words);
  if (focused) return focused;

  if (terms.length === 1 && Object.hasOwn(broadTopics, terms[0])) {
    const options = broadTopics[terms[0]].flatMap((slug) => {
      const entry = webIndex.find(({ answer }) => answer.href === `${panduan}/${slug}`);
      return entry ? [entry.answer] : [];
    });
    return topicChoices(options, words);
  }

  const results = rankGuides(terms);
  const [best] = results;
  if (!best) return nearestGuides(terms, words);
  const similar = results.filter((result) => result.score === best.score);
  const unique = [...new Map(similar.map((result) => [result.answer.title, result.answer])).values()].slice(0, 3);
  if (unique.length > 1) return topicChoices(unique, words);
  return matchGuide(best.answer, words);
}
