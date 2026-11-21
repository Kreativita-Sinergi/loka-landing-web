import { faqsId } from '@/data/faq/id';
import { featureGuideGroups, featureGuideId } from '@/data/site/featureGuides';
import { siteLinks } from '@/data/site/links';
import { getGuides } from '@/data/site/panduan';

export type GuideAnswer = {
  title: string;
  href: string;
  pdf?: boolean;
  text?: string;
  steps?: { title?: string; body: string }[];
  tip?: string;
};

const { panduan, panduanPdf } = siteLinks('id');
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
  'pengaturan-transaksi': 'aktifkan unggah qris statis metode pembayaran pembulatan biaya pelayanan',
  'tampilan-struk': 'logo struk ukuran kertas 58 mm 80 mm',
  'kas-masuk-keluar': 'uang laci kas kecil pengeluaran kasir peti kas',
  'kasbon': 'utang pelanggan piutang cicil lunasi tagihan',
  'gaji-absensi': 'payroll penggajian upah karyawan',
  'fitur-qr-bernominal-otomatis': 'qris dinamis aktifkan nominal otomatis',
  'fitur-masuk-dengan-verifikasi-biometrik': 'sidik jari fingerprint face id pengenalan wajah',
  'fitur-mode-kiosk-member-check-in-sendiri': 'kiosk kios checkin mandiri gym pintu',
  'fitur-buka-booking-online': 'booking lapangan reservasi jadwal online',
};

const stopWords = new Set((
  'apa apakah bagaimana gimana gmn dimana di mana kenapa mengapa kok cara langkah yang untuk ' +
  'dari dengan dan ke pada dong ya kah sih nih bang kak min halo hai mohon tolong bisa mau ingin ' +
  'saya aku kita kami kamu anda boleh perlu tentang loka aplikasi app ini itu ada aja saja ga gak nggak ' +
  'sudah belum masih harus paling saat kalau kalo bila setelah sebelum secara lebih baru '
).trim().split(/\s+/));

const wordVariants = [
  'absen absensi kehadiran', 'atur mengatur setelan setting konfigurasi', 'aktif aktifkan aktifin mengaktifkan nyalakan menyalakan',
  'batal batalkan membatalkan pembatalan cancel void', 'bayar membayar pembayaran dibayar',
  'buka membuka pembukaan', 'catat mencatat dicatat pencatatan input terinput',
  'cetak mencetak tercetak diprint print mencetaknya dicetak pencetakan', 'cicil cicilan mencicil dicicil', 'coba mencoba cobain',
  'diskon potongan', 'ekspor export mengekspor diekspor', 'harga harganya', 'impor import unggah upload',
  'karyawan pegawai staf staff', 'kasbon bon', 'laporan report', 'login masuk signin',
  'lunas lunasi lunasin melunasi pelunasan', 'lupa terlupa kelupaan', 'password sandi',
  'pindah pindahkan memindahkan pemindahan', 'pin pinnya', 'pilih pilihan memilih dipilih',
  'printer pencetak', 'produk item', 'refund direfund pengembalian', 'sambung tersambung menyambung hubungkan menghubungkan konek connect',
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

const searchIndex = [
  ...guides.flatMap((guide) => {
    const answer = webAnswers.get(guide.slug)!;
    const linkedFaqs = (guide.faq ?? []).flatMap((question) => {
      const faq = faqsByQuestion.get(question);
      return faq ? [indexAnswer({ title: faq.question, href: answer.href, text: faq.answer }, '', '', faq.answer)] : [];
    });
    if (!guide.steps?.length && linkedFaqs.length) {
      return linkedFaqs.map((entry, index) => index === 0 ? {
        ...entry,
        primary: new Set([...entry.primary, ...tokens(`${guide.title} ${keywordsByGuide[guide.slug] ?? ''}`)]),
        context: new Set(tokens(guide.desc)),
      } : entry);
    }
    return [indexAnswer(answer, keywordsByGuide[guide.slug] ?? '',
      [guide.desc, guide.intro, ...(guide.steps ?? []).map((step) => step.title)].filter(Boolean).join(' '),
      [guide.tip, ...(guide.steps ?? []).map((step) => step.body)].filter(Boolean).join(' ')), ...linkedFaqs];
  }),
  ...featureGuideGroups.flatMap(({ group, guides }) => guides.map((guide) => {
    const id = featureGuideId(guide.title);
    return indexAnswer({
      title: guide.title,
      href: `${panduanPdf}#nameddest=${id}`,
      pdf: true,
      steps: guide.steps.map((body) => ({ body })),
    }, keywordsByGuide[id] ?? '', group, guide.steps.join(' '));
  })),
];

function troubleshoot(question: string, isIssue: boolean): GuideAnswer | undefined {
  const words = new Set(tokens(question));
  if (words.has('pin') && /\b(?:lupa|reset|atur ulang|ganti)\b/.test(question)) {
    const answer = webAnswers.get('lupa-kata-sandi');
    return answer && { title: 'Lupa PIN kasir', href: answer.href, text: answer.tip };
  }
  if (words.has('password') && /\b(?:lupa|reset|atur ulang|pemulihan)\b/.test(question)) {
    if (/\b(?:wifi|wi-fi|router|gmail|instagram|facebook)\b/.test(question)) return;
    return webAnswers.get('lupa-kata-sandi');
  }
  if ((words.has('printer') && isIssue) || /\bstruk (?:tidak|gak|nggak|ga|tak|belum) (?:mau )?(?:keluar|tercetak)\b/.test(question)) {
    const answer = webAnswers.get('printer-tidak-mencetak');
    return answer && (words.has('windows') ? {
      title: answer.title,
      href: answer.href,
      text: answer.tip,
    } : answer);
  }
  if (words.has('transaksi') && words.has('sinkron') && (isIssue || /\bbelum\b/.test(question))) {
    return webAnswers.get('transaksi-belum-sinkron');
  }
  if (words.has('absen') && (words.has('gps') || words.has('radius') || words.has('lokasi')) && isIssue) {
    return webAnswers.get('absensi-ditolak-lokasi');
  }
}

export function findGuideAnswer(question: string, isIssue: boolean): GuideAnswer | undefined {
  const normalized = normalize(question);
  const troubleshooting = troubleshoot(normalized, isIssue);
  if (troubleshooting || isIssue) return troubleshooting;

  const terms = [...new Set(tokens(normalized))];
  if (!terms.length) return;
  if (terms.includes('qris') && !terms.some((word) => ['nominal', 'otomatis', 'dinamis', 'offline'].includes(word))
      && terms.some((word) => ['aktif', 'unggah', 'impor', 'statis'].includes(word))) {
    const answer = webAnswers.get('pengaturan-transaksi');
    if (answer) return {
      title: 'Menyiapkan pembayaran QRIS',
      href: answer.href,
      steps: answer.steps?.filter((step) => ['Buka Transaksi & Pembayaran', 'Siapkan QRIS', 'Simpan'].includes(step.title)),
    };
  }
  const query = terms.join(' ');
  const results = searchIndex.flatMap((entry) => {
    const weights = terms.map((term) => entry.primary.has(term) ? 5 : entry.context.has(term) ? 3 : entry.detail.has(term) ? 1 : 0);
    const matched = weights.filter(Boolean).length;
    const focused = weights.filter((weight) => weight >= 3).length;
    if (!weights.includes(5) || matched * 3 < terms.length * 2 || focused < Math.min(2, terms.length)) return [];
    const phraseBonus = entry.title === query ? 8 : entry.title.includes(query) ? 3 : 0;
    const score = weights.reduce((sum, weight) => sum + weight, phraseBonus);
    return [{ answer: entry.answer, score }];
  }).sort((a, b) => b.score - a.score);
  const [best] = results;
  const alternative = best && results.find((result) => result.answer.href !== best.answer.href);
  if (best && (!alternative || best.score > alternative.score)) return best.answer;
}
