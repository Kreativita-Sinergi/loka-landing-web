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
  | { kind: 'choices'; prompt: 'topic' | 'platform'; choices: GuideChoice[] };

const { panduan, panduanPdf, faq } = siteLinks('id');
const guides = getGuides('id');
const faqsByQuestion = new Map(faqsId.map((faq) => [faq.question, faq]));

const keywordsByGuide: Record<string, string> = {
  'buka-kasir': 'buka shift mulai shift modal awal uang kembalian',
  'tutup-shift': 'tutup kasir akhiri shift selisih kas hitung laci',
  'riwayat-struk': 'cetak ulang struk lama nota riwayat penjualan',
  'pisah-struk': 'split bill pisah tagihan bayar terpisah patungan',
  'meja-layar-dapur': 'kds kitchen display system layar dapur',
  'stok-opname': 'stock opname inventaris cek stok fisik',
  'impor-produk-csv': 'import upload csv excel produk massal',
  'pembatalan-refund': 'cancel void batalkan nota kembalikan uang refund',
  'transaksi-susulan': 'input transaksi kemarin ganti tanggal transaksi backdate',
  'pengaturan-transaksi': 'aktifkan unggah qris statis metode pembayaran pembulatan biaya pelayanan biaya layanan biaya per transaksi',
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

// Topik teknis yang punya jawaban tersendiri di FAQ publik.
const extraFaqs = [
  ['Bagaimana cara transfer stok antar outlet atau cabang?', 'mutasi pindah barang stok cabang transfer antar outlet'],
  ['Apa itu metode Moving Average untuk HPP?', 'rata rata tertimbang harga pokok penjualan hpp moving average'],
  ['Apakah pelanggan bisa menyimpan saldo (deposit) di toko?', 'deposit saldo pelanggan top up isi ulang'],
] as const;

const faqKeywords: Record<string, string> = {
  'Berapa banyak outlet dan pengguna yang bisa ditambahkan?': 'batas maksimal cabang limit outlet jumlah outlet pengguna',
  'Bagaimana cara menambah karyawan baru?': 'tambah pegawai atur pin kasir',
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
  'sudah belum masih harus paling saat kalau kalo bila setelah sebelum secara lebih baru supaya spya biar ka '
).trim().split(/\s+/));

const wordVariants = [
  'absen absensi kehadiran', 'atur mengatur setelan setting konfigurasi', 'aktif aktifkan aktifin mengaktifkan nyalakan menyalakan',
  'batal batalkan membatalkan pembatalan cancel void', 'bayar membayar pembayaran dibayar',
  'buka membuka pembukaan', 'catat mencatat dicatat pencatatan input terinput',
  'cetak mencetak nyetak tercetak diprint print mencetaknya dicetak pencetakan', 'cicil cicilan mencicil dicicil', 'coba mencoba cobain',
  'diskon potongan', 'ekspor export mengekspor diekspor', 'harga harganya', 'impor import unggah upload',
  'karyawan pegawai staf staff', 'kasbon bon', 'laporan report', 'login masuk signin',
  'lunas lunasi lunasin melunasi pelunasan', 'lupa terlupa kelupaan', 'password sandi pass',
  'pindah pindahkan memindahkan pemindahan', 'pin pinnya', 'pilih pilihan memilih dipilih', 'pasang memasang pemasangan',
  'printer pencetak prnter', 'produk item', 'refund direfund pengembalian', 'sambung tersambung menyambung sambungin nyambung hubungkan menghubungkan konek konekin connect',
  'sewa penyewaan', 'sinkron sinkronkan tersinkron sinkronisasi terkirim', 'stok stock persediaan',
  'struk nota resit receipt', 'tambah menambah penambahan tambahin nambah nambahin masukin masukkin', 'titipan konsinyasi',
  'tutup menutup penutupan', 'ubah mengubah merubah perubahan ganti mengganti edit',
].map((group) => group.split(' '));

const normalizedWords = new Map(wordVariants.flatMap(([base, ...words]) => words.map((word) => [word, base] as const)));

function normalize(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ')
    .replace(/\bkata sandi\b/g, 'password')
    .replace(/\b(check|log)[ -]in\b/g, '$1in')
    .replace(/\bqr[ -]is\b/g, 'qris');
}

function tokens(text: string) {
  const words = normalize(text).match(/[a-z0-9]+/g) ?? [];
  return words.filter((word) => word.length > 1 && !stopWords.has(word))
    .map((word) => normalizedWords.get(word) ?? word);
}

function indexAnswer(answer: GuideAnswer, keywords: string, context: string, detail: string) {
  return {
    answer,
    title: tokens(answer.title).join(' '),
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

const searchIndex = [
  ...webIndex,
  ...featureIndex,
  ...extraFaqs.flatMap(([question, keywords]) => {
    const item = faqsByQuestion.get(question);
    if (!item?.category) return [];
    return [indexAnswer({ title: item.question, href: `${faq}#${faqCategoryId(item.category)}`, faq: true, text: item.answer }, keywords, '', item.answer)];
  }),
];

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

function rankGuides(terms: string[]) {
  const query = terms.join(' ');
  return searchIndex.flatMap((entry) => {
    const weights = terms.map((term) => entry.primary.has(term) ? 5 : entry.context.has(term) ? 3 : entry.detail.has(term) ? 1 : 0);
    const matched = weights.filter(Boolean).length;
    const focused = weights.filter((weight) => weight >= 3).length;
    if (!weights.includes(5) || matched * 3 < terms.length * 2 || focused < Math.min(2, terms.length)) return [];
    if (terms.length >= 4 && matched < terms.length && weights.filter((weight) => weight === 5).length < 2) return [];
    const phraseBonus = entry.title === query ? 8 : entry.title.includes(query) ? 3 : 0;
    const score = weights.reduce((sum, weight) => sum + weight, phraseBonus);
    return [{ answer: entry.answer, score }];
  }).sort((a, b) => b.score - a.score);
}

function matchGuide(guide: GuideAnswer, words: ReadonlySet<string>): GuideMatch {
  if (guide.href === `${panduan}/printer-tidak-mencetak`) return printerTroubleshooting(words) ?? answer(guide);
  return answer(guide);
}

function topicChoices(answers: GuideAnswer[], words: ReadonlySet<string>): GuideMatch {
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
  if (!best) return;
  const similar = results.filter((result) => result.score === best.score);
  const unique = [...new Map(similar.map((result) => [result.answer.title, result.answer])).values()].slice(0, 3);
  if (unique.length > 1) return topicChoices(unique, words);
  return matchGuide(best.answer, words);
}
