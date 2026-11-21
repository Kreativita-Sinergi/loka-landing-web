import type { Locale } from '@/data/localized';
import { SERVICE_HOURS } from '@/data/site/links';

const topics = ['offline', 'printer', 'qris', 'trial', 'pricing', 'register', 'download'] as const;
export type ChatTopic = (typeof topics)[number];

type TopicCopy = {
  label: string;
  matches: RegExp;
  answer: string;
  action?: string;
};

// Basa-basi yang dijawab tanpa membuka Buku Panduan. Urutannya urutan
// pencocokan: "ok makasih" adalah terima kasih, bukan sekadar "ok".
const talks = ['greeting', 'thanks', 'bye', 'identity', 'capabilities', 'ask', 'human', 'miss', 'next', 'ack'] as const;
export type ChatTalk = (typeof talks)[number] | 'empty' | 'pick';

type TalkCopy = {
  matches: RegExp;
  answer: string;
  /** Tombol WhatsApp ikut tampil di balasannya. */
  whatsapp?: boolean;
  /** Contoh pertanyaan ikut tampil di balasannya. */
  suggest?: boolean;
};

export type ChatCopy = {
  title: string;
  bot: string;
  you: string;
  welcome: string;
  placeholder: string;
  send: string;
  close: string;
  whatsapp: string;
  faq: string;
  fallback: string;
  /** Dibacakan pembaca layar selama balasan disiapkan. */
  typing: string;
  /** Pertanyaan ya/tidak ("bisa pakai QRIS ga?"): dijawab, bukan ditawari daftar panduan. */
  yesNo?: RegExp;
  support: RegExp;
  topics: Record<ChatTopic, TopicCopy>;
  /** Sapaan dan partikel yang boleh menempel di basa-basi ("makasih ya kak"). */
  polite?: RegExp;
  /** Salam yang dibalas dengan salam yang sama; sisanya dibalas [hello]. */
  salutes?: [RegExp, string][];
  hello: string;
  talk: Partial<Record<ChatTalk, TalkCopy>>;
};

/**
 * Seluruh pesan hanya berisi kata dari daftar, dan minimal satu kata inti.
 * Garis bawah di kata inti berarti frasa: `terima_kasih` cocok dengan "terima
 * kasih", tetapi "kasih" sendirian ("kasih info dong") bukan ucapan terima kasih.
 */
function only(core: string, extra = '') {
  const words = (list: string) => list.trim().split(/[\s_]+/).join('|');
  const phrases = core.trim().split(/\s+/).map((phrase) => phrase.replaceAll('_', ' ')).join('|');
  return new RegExp(`^(?=.*\\b(?:${phrases})\\b)(?:(?:${words(`${core} ${extra}`)})(?:\\s+|$))+$`, 'u');
}

export const chatSuggestions = ['pricing', 'trial', 'download', 'qris'] as const;

export const technicalChatCopy = {
  suggestions: ['Buka shift', 'Printer tidak mencetak', 'Refund transaksi'],
  unavailable: 'Panduan di chat belum bisa dimuat. Anda bisa membuka Buku Panduan atau menghubungi admin.',
  chooseTopic: 'Maksud Anda yang mana?',
  choosePlatform: 'Printer terhubung ke perangkat apa?',
  chooseNearest: 'Saya belum yakin maksudnya. Mungkin salah satu dari ini?',
  price: (monthly: string, yearly: string) =>
    `Paket Pro ${monthly} per bulan atau ${yearly} per tahun, semua fitur sudah termasuk. Akun baru bisa mencoba gratis 14 hari sejak transaksi pertama. Paket 3 tahun dan rinciannya ada di halaman harga.`,
  handoff: 'Kendala seperti ini sebaiknya dicek langsung oleh admin supaya tidak salah langkah. Kirim lewat WhatsApp, dan sertakan nama toko serta tangkapan layarnya bila ada.',
  handoffAction: 'Kirim pertanyaan ini ke admin',
  handoffMessage: (question: string) => `Halo Admin Loka Kasir, saya butuh bantuan: “${question}”`,
  guide: 'Buka panduan lengkap',
  faq: 'Buka FAQ terkait',
  pdf: 'Buka bagian ini di Buku Panduan (PDF)',
};

export const supportChatCopy: Record<Locale, ChatCopy> = {
  id: {
    title: 'Tanya Loka',
    bot: 'Bot bantuan',
    you: 'Anda',
    welcome: 'Halo! Saya Tanya Loka. Tulis saja pertanyaan Anda soal Loka Kasir dengan bahasa sehari-hari, nanti saya carikan jawabannya di Buku Panduan.',
    placeholder: 'Tulis pertanyaan Anda',
    send: 'Kirim pertanyaan',
    close: 'Tutup chat',
    whatsapp: 'Hubungi admin via WhatsApp',
    faq: 'Lihat FAQ',
    fallback: 'Maaf, saya belum menemukan jawabannya di Buku Panduan. Coba tulis dengan kata lain atau sebutkan fiturnya, misalnya “cara refund” atau “printer tidak mencetak”. Bisa juga langsung tanya admin lewat WhatsApp.',
    typing: 'Tanya Loka sedang mengetik',
    yesNo: /^(?:apakah|apa|bisa|boleh|ada|mendukung)\b|\b(?:ga|gak|nggak|ngga|tidak|kah)(?: (?:kak|min|ya|sih))*[?!.\s]*$/u,
    hello: 'Halo!',
    salutes: [
      [/\bass?alamu/u, 'Waalaikumsalam!'],
      [/\bpagi\b/u, 'Selamat pagi!'],
      [/\bsiang\b/u, 'Selamat siang!'],
      [/\bsore\b/u, 'Selamat sore!'],
      [/\bmalam\b/u, 'Selamat malam!'],
    ],
    polite: /\b(?:kak|kakak|ka|min|mimin|bang|mas|mbak|bro|sis|gan|bos|pak|bu|ya|yah|dong|deh|nih|sih|loh|lho|kok|banget|bgt)\b/gu,
    talk: {
      greeting: {
        matches: only(
          'halo hallo helo hello hai hay hi hey hei woi permisi punten misi p pagi siang sore malam assalamualaikum asalamualaikum assalamu asalamu salam tes test kak kakak min mimin',
          'selamat met alaikum wr wb warahmatullahi wabarakatuh admin loka semua mau ingin boleh bisa numpang tanya nanya bertanya',
        ),
        answer: 'Ada yang bisa saya bantu soal Loka Kasir?',
      },
      thanks: {
        matches: only(
          'makasih makasi mksh trims terimakasih terima_kasih thanks thank_you thx tq tengkyu nuhun suwun',
          'banyak sudah udah ok oke sip siap baik mantap info infonya penjelasannya jawabannya bantuannya atas sangat membantu jelas so much matur hatur',
        ),
        answer: 'Sama-sama! Kalau ada yang masih bingung, tanya saja lagi.',
      },
      bye: {
        matches: /^(?:(?:sudah|udah) )?(?:itu (?:saja|aja)|cukup|dadah|dah|bye(?: bye)?|babay|sampai jumpa|(?:tidak|tdk|ga|gak|nggak|ngga|enggak)(?: ada)?(?: lagi)?)(?: (?:makasih|terima kasih|thanks))?$/u,
        answer: 'Baik. Kalau nanti ada pertanyaan lagi, tulis saja di sini. Semoga usahanya makin lancar!',
      },
      identity: {
        matches: only(
          'siapa bot robot manusia mesin ai nama namamu namanya chatbot',
          'ini kamu anda lu lo kau saya aku gw gue ngobrol bicara chat ngomong dengan sama atau apa bukan asli beneran orang admin cs kah',
        ),
        answer: 'Saya Tanya Loka, bot bantuan Loka Kasir, bukan manusia. Saya mencarikan jawaban dari Buku Panduan dan FAQ. Kalau perlu bicara dengan orang, admin kami ada di WhatsApp.',
        whatsapp: true,
      },
      capabilities: {
        matches: /^(?:(?:kamu|anda|bot|loka) )?(?:bisa|dapat) (?:(?:bantu|membantu|tanya|nanya|jawab|ngapain) )?apa(?: (?:saja|aja))?$|^(?:help|bantuan|tolong|apa (?:saja |aja )?yang bisa (?:di)?(?:tanya|tanyakan|bantu))$/u,
        answer: 'Saya bisa membantu soal cara pakai Loka Kasir: shift, produk dan stok, printer, pembayaran, laporan, sampai harga langganan. Tulis saja pertanyaannya, atau mulai dari salah satu ini.',
        suggest: true,
      },
      ask: {
        matches: only(
          'tanya nanya bertanya pertanyaan',
          'mau ingin pengen boleh bisa numpang izin ijin saya aku ada mohon tolong sesuatu sebentar',
        ),
        answer: 'Boleh, silakan tulis pertanyaannya.',
      },
      human: {
        matches: only(
          'admin cs operator wa whatsapp kontak telepon telpon telp nomor nomer customer teknisi sales marketing email',
          'mau ingin pengen bisa boleh minta tolong hubungi menghubungi dihubungi bicara ngomong ngobrol chat chatting call no hp service orang orangnya langsung sama dengan ke ada yang saya aku aja saja sambungkan sambungin tim loka kasir gimana bagaimana cara dimana mana berapa support bantuan lewat via',
        ),
        answer: `Bisa. Admin kami melayani lewat WhatsApp. ${SERVICE_HOURS}.`,
        whatsapp: true,
      },
      miss: {
        matches: new RegExp(
          `${only('bukan salah ngaco ngawur bodoh goblok tolol bego payah jelek', 'itu ini maksud maksudnya maksudku saya aku yang jawabannya jawaban gitu bot kamu dasar').source}`
          + '|^(?:ga|gak|nggak|ngga|tidak|tdk|kurang|belum) (?:jelas|nyambung|membantu|ngerti|mengerti|paham|guna|berguna|sesuai|pas|tepat|cocok|menjawab|terjawab)$',
          'u',
        ),
        answer: 'Maaf, jawaban saya belum pas. Coba tulis ulang dengan menyebut fiturnya, misalnya “stok opname” atau “printer”. Kalau masih belum ketemu, admin kami bisa membantu lewat WhatsApp.',
        whatsapp: true,
      },
      next: {
        matches: /^(?:terus|trus|lalu|selanjutnya|lanjut|next|kemudian|(?:abis|habis|setelah|sehabis) itu)(?: (?:gimana|bagaimana|apa|apalagi|apa lagi|ngapain))?$/u,
        answer: 'Itu sudah semua langkahnya. Kalau ada yang macet di tengah jalan, tulis kendalanya di sini atau tanya admin lewat WhatsApp.',
      },
      pick: {
        matches: /^$/u,
        answer: 'Pilih dulu salah satu di atas, atau tulis pertanyaannya dengan kata lain.',
      },
      ack: {
        matches: only(
          'ok oke okey okay sip siap baik baiklah mantap mantab mantul paham mengerti ngerti jelas noted oh oalah gitu begitu iya ya yup yoi betul bener benar berhasil beres good nice keren hehe haha wkwk wkwkwk hmm',
          'sudah udah bisa sekarang saya aku lah',
        ),
        answer: 'Sip. Kalau ada lagi yang mau ditanyakan, tulis saja di sini.',
      },
      empty: {
        matches: /^$/u,
        answer: 'Boleh ditulis pertanyaannya? Misalnya “cara buka shift”.',
      },
    },
    support: /^(?!.*\b(?:biar|supaya|agar)\b.*\b(?:tidak|ngg?k|nggak|gak|ga|tak) bisa\b).*\b(?:error|gagal|masalah|bermasalah|kendala|komplain|lemot|lambat|lelet|ngelag|hang|crash|bug|force close|keluar sendiri|ngadat|stuck|(?:loading|muter) terus|(?:tidak|ngg?k|nggak|gak|ga|tak) (?:bisa|mau|mencetak|tercetak|keluar|terdeteksi|tersambung|nyambung|connect|sinkron|masuk|muncul|terkirim|balik)|belum (?:masuk|muncul|tersinkron|terkirim|balik)|sudah bayar|sudah transfer|terpotong|kepotong|ditolak|macet)\b/u,
    topics: {
      trial: {
        label: 'Trial gratis',
        matches: /\b(?:trial|uji coba|masa percobaan|percobaan gratis|coba gratis|gratis (?:berapa|selamanya)|14 hari|demo|(?:coba|dicoba|nyoba|mencoba|cobain) dulu)\b|\b(?:beda(?:nya)?|perbedaan)\b.*\b(?:pro|gratis|trial)\b|^(?:(?:ada|apakah|apa|bisa|boleh|versi|paket|yang|aplikasi(?:nya)?|loka(?: kasir)?|ini|pakai(?:nya)?) )*gratis(?:nya|kah|an)?(?: (?:ga|gak|nggak|tidak|kah|ya|kak|min|atau bayar|apa bayar|selamanya|terus))*[?!.\s]*$/u,
        answer: 'Akun baru bisa mencoba semua fitur Pro gratis selama 14 hari, mulai dari transaksi pertama. Setelah itu, pilih paket langganan untuk melanjutkan transaksi.',
        action: 'Lihat paket langganan',
      },
      pricing: {
        label: 'Harga langganan',
        matches: /\b(?:harga|biaya|tarif)\s+(?:(?:paket\s+)?loka(?:\s+kasir)?|paket\s+pro|langganan|aplikasi(?:nya)?)\b|\b(?:berapa|harga|biaya|tarif)\b.*\b(?:langganan|berlangganan|paket pro)\b|\b(?:langganan|berlangganan|paket pro)\b.*\b(?:berapa|harga|biaya|tarif)\b|^(?:(?:cara|mau|ingin|info|soal|tentang)\s+)?(?:langganan|berlangganan|paket pro)(?:nya)?[?!.\s]*$|^(?:berapa\s+)?(?:harga(?:nya)?|biaya(?:nya)?|tarif(?:nya)?|harga paket)(?:\s+(?:berapa|ya|kak|min|sih|dong|nih|deh))*[?!.\s]*$|^(?:mahal|murah)(?:\s+(?:ga|gak|nggak|tidak|kah|ya))*[?!.\s]*$|^(?!.*\b(?:gaji|karyawan|pegawai|sewa|kasbon|cicil|cicilan|utang|pelanggan|member|pemasok|supplier|produk|menu|jual|modal|meja)\b).*(?:\b(?:bayar|biaya|harga(?:nya)?|tarif)\b.*\b(?:per\s?(?:bulan|tahun)|sebulan|setahun|bulanan|tahunan)\b|\b(?:per\s?(?:bulan|tahun)|sebulan|setahun)\s+(?:berapa|bayar)\b|\bberapa\s+(?:per\s?(?:bulan|tahun)|sebulan|setahun)\b)/u,
        answer: 'Loka Kasir menyediakan paket Pro bulanan, tahunan, dan tiga tahun. Buka halaman harga untuk melihat tarif dan membandingkan paket.',
        action: 'Buka halaman harga',
      },
      register: {
        label: 'Cara daftar',
        matches: /^(?!.*\b(?:karyawan|kasir|pegawai|staf|staff)\b).*(?:\b(?:daftar akun|pendaftaran|registrasi|(?:buat|bikin|membuat) akun|sign ?up)\b)|\b(?:mendaftar|daftar)\b(?!\s+(?:meja|produk|karyawan|pegawai|menu|harga|pelanggan|member|pesanan|transaksi|stok|kategori|outlet|cabang|absen|hadir|belanja|pemasok|supplier|barang))/u,
        answer: 'Buat akun pemilik dari browser atau dari aplikasi Loka Kasir. Setelah verifikasi email, buat outlet pertama. Akun yang sama bisa dipakai di aplikasi dan Web Admin.',
        action: 'Daftar Loka Kasir',
      },
      download: {
        label: 'Unduh aplikasi',
        matches: /\b(?:unduh|download|instal|install)(?:nya)?\b(?!\s+(?:laporan|struk|data|csv|excel|pdf|nota|template|panduan|buku|driver|printer|file|invoice|faktur))|\b(?:pasang aplikasi|apk|play ?store|google play|microsoft store)\b|^(?:android|windows)[?!.\s]*$/u,
        answer: 'Loka Kasir tersedia untuk Android dan Windows. Pilih versi yang sesuai dengan perangkat Anda di halaman unduhan.',
        action: 'Pilih unduhan',
      },
      offline: {
        label: 'Mode offline',
        matches: /\b(?:offline|tanpa internet|tanpa koneksi|internet putus|internet terputus|internet mati|sinyal hilang)\b/u,
        answer: 'Transaksi tunai tetap bisa berjalan saat koneksi terputus. Data tersimpan di perangkat dan disinkronkan saat internet kembali. Pembayaran yang perlu verifikasi online, seperti QRIS, tetap perlu koneksi.',
      },
      qris: {
        label: 'Pembayaran QRIS',
        matches: /\b(?:qris|pembayaran qr|metode pembayaran)\b/u,
        answer: 'Loka Kasir mendukung pembayaran QRIS. Anda bisa mengatur metode pembayaran yang tersedia di kasir melalui Web Admin. Untuk bantuan aktivasi atau pengecekan pembayaran, hubungi admin.',
      },
      printer: {
        label: 'Printer struk',
        matches: /^(?!.*\b(?:wa|whatsapp|email|pdf)\b).*\b(?:printer|struk|cetak|thermal|termal|esc\/pos)\b/u,
        answer: 'Di Android, gunakan printer thermal Bluetooth yang mendukung ESC/POS. Di Windows, pasang driver printer terlebih dahulu. Untuk memastikan kompatibilitas, tanyakan merek dan model printer Anda ke admin.',
      },
    },
  },
  en: {
    title: 'Ask Loka',
    bot: 'Support bot',
    you: 'You',
    welcome: 'Hi! Have a question about Loka Kasir? Pick a topic or type your question.',
    placeholder: 'Type your question',
    send: 'Send question',
    close: 'Close chat',
    whatsapp: 'Contact support on WhatsApp',
    faq: 'View FAQ',
    fallback: 'I don’t have an answer for that yet. Check the FAQ or ask our support team on WhatsApp.',
    typing: 'Ask Loka is typing',
    hello: 'Hi!',
    talk: {
      greeting: {
        matches: /^(?:hi|hello|hey|heya|good (?:morning|afternoon|evening)|greetings)(?: (?:there|loka|team))?$/u,
        answer: 'What would you like to know about Loka Kasir?',
      },
      thanks: {
        matches: /^(?:ok(?:ay)? |great )?(?:thanks?(?: you)?(?: so much| a lot| very much)?|thx|ty|cheers)$/u,
        answer: 'You’re welcome! Ask away if anything else comes up.',
      },
      bye: {
        matches: /^(?:bye|goodbye|see you|that s all|that is all|no thanks?|nothing else)$/u,
        answer: 'Thanks for stopping by. All the best with your business!',
      },
      identity: {
        matches: /^(?:who are you|what are you|are you (?:a )?(?:bot|robot|human|real(?: person)?)|is this a (?:bot|robot|human|real person))$/u,
        answer: 'I’m Ask Loka, an automated help bot for Loka Kasir, not a person. If you’d rather talk to someone, our team is on WhatsApp.',
        whatsapp: true,
      },
      capabilities: {
        matches: /^(?:help|what can you do|what can i ask)$/u,
        answer: 'I can answer common questions about Loka Kasir: pricing, the free trial, sign-up, downloads, offline mode, QR payments, and receipt printers. Pick a topic or type your question.',
        suggest: true,
      },
      human: {
        matches: /^(?:(?:can|may|could) i )?(?:(?:talk|speak|chat) (?:to|with) )?(?:a |an |the |your )?(?:human|agent|person|someone|support|staff|representative|real person|team)$|^(?:contact|phone|whatsapp|email)(?: number)?$/u,
        answer: 'Sure. Our team answers on WhatsApp.',
        whatsapp: true,
      },
      ack: {
        matches: /^(?:ok|okay|got it|i see|alright|cool|great|nice|perfect|understood)$/u,
        answer: 'Great. If you have another question, just type it here.',
      },
    },
    support: /\b(?:error|failed|problem|issue|forgot|can[’']?t|cannot|already paid|charged)\b/u,
    topics: {
      trial: {
        label: 'Free trial',
        matches: /\b(?:trial|free|14 days)\b/u,
        answer: 'New accounts can try all Pro features free for 14 days from their first sale. Pick a subscription after the trial to continue making sales.',
        action: 'View subscription plans',
      },
      pricing: {
        label: 'Pricing',
        matches: /\b(?:price|pricing|subscription|plans|per month|per year|how much does it cost)\b/u,
        answer: 'Loka Kasir offers monthly, annual, and three-year Pro plans. Visit the pricing page to check rates and compare plans.',
        action: 'View pricing',
      },
      register: {
        label: 'Sign up',
        matches: /\b(?:sign up|register(?: an account)?|create an account|registration)\b/u,
        answer: 'Create an owner account in your browser or in the Loka Kasir app. Verify your email, then create your first outlet. The same account works in the app and Web Admin.',
        action: 'Sign up for Loka Kasir',
      },
      download: {
        label: 'Download',
        matches: /\b(?:download|install|apk|android|windows)\b/u,
        answer: 'Loka Kasir is available for Android and Windows. Visit the downloads page to pick the version for your device.',
        action: 'View downloads',
      },
      offline: {
        label: 'Offline mode',
        matches: /\b(?:offline|without internet|internet (?:drops|outage)|no (?:internet|connection)|lost connection)\b/u,
        answer: 'Cash sales can continue offline. Sales are stored on the device and sync when internet access returns. Payments that require online verification, such as QR payments, still need a connection.',
      },
      qris: {
        label: 'QR payments',
        matches: /\b(?:qris|qr (?:code|payment|payments)|payment methods)\b/u,
        answer: 'Loka Kasir supports QR payments. Choose which methods appear at the register in Web Admin. For help setting them up or checking a payment, contact support.',
      },
      printer: {
        label: 'Receipt printers',
        matches: /\b(?:print|printers?|receipt|thermal|esc\/pos)\b/u,
        answer: 'On Android, use a Bluetooth thermal printer that supports ESC/POS. On Windows, install the printer driver first. Send your printer’s brand and model to support to check compatibility.',
      },
    },
  },
  ms: {
    title: 'Tanya Loka',
    bot: 'Bot bantuan',
    you: 'Anda',
    welcome: 'Hai! Ada soalan tentang Loka Kasir? Pilih topik atau taip soalan anda.',
    placeholder: 'Taip soalan anda',
    send: 'Hantar soalan',
    close: 'Tutup sembang',
    whatsapp: 'Hubungi pasukan kami di WhatsApp',
    faq: 'Lihat soalan lazim',
    fallback: 'Saya belum ada jawapan untuk soalan itu. Semak soalan lazim atau tanya pasukan kami melalui WhatsApp.',
    typing: 'Tanya Loka sedang menaip',
    hello: 'Hai!',
    salutes: [[/\bass?alamu/u, 'Waalaikumussalam!']],
    talk: {
      greeting: {
        matches: /^(?:hai|helo|hello|hi|salam|ass?alamu ?alaikum|selamat (?:pagi|tengah hari|petang|malam))$/u,
        answer: 'Apa yang anda ingin tahu tentang Loka Kasir?',
      },
      thanks: {
        matches: /^(?:ok |okay |baik )?(?:terima kasih(?: banyak)?|trima kasih|tq|thanks|thank you)$/u,
        answer: 'Sama-sama! Tanya sahaja jika ada soalan lain.',
      },
      identity: {
        matches: /^(?:(?:awak|anda|ini) (?:siapa|bot|robot|manusia)(?: ke)?|siapa (?:awak|anda|ini))$/u,
        answer: 'Saya Tanya Loka, bot bantuan automatik Loka Kasir, bukan manusia. Untuk bercakap dengan orang sebenar, pasukan kami ada di WhatsApp.',
        whatsapp: true,
      },
      human: {
        matches: /^(?:(?:nak|mahu|boleh) (?:cakap|bercakap|hubungi|sembang) (?:dengan )?)?(?:admin|staf|orang|pasukan|manusia|ejen)$|^(?:nombor|hubungi|whatsapp|telefon)(?: (?:telefon|whatsapp|admin))?$/u,
        answer: 'Boleh. Pasukan kami menjawab melalui WhatsApp.',
        whatsapp: true,
      },
      ack: {
        matches: /^(?:ok|okay|okey|baik|baiklah|faham|bagus)$/u,
        answer: 'Baik. Jika ada soalan lain, taip sahaja di sini.',
      },
    },
    support: /\b(?:ralat|gagal|masalah|rosak|lupa|tak boleh|tidak boleh|sudah bayar|dah bayar)\b/u,
    topics: {
      trial: {
        label: 'Percubaan percuma',
        matches: /\b(?:trial|percubaan|percuma|14 hari)\b/u,
        answer: 'Akaun baharu boleh mencuba semua ciri Pro secara percuma selama 14 hari dari jualan pertama. Selepas itu, pilih pelan langganan untuk terus membuat jualan.',
        action: 'Lihat pelan langganan',
      },
      pricing: {
        label: 'Harga langganan',
        matches: /\b(?:harga(?! jual| produk| barang| modal)|langganan|kos langganan|yuran|sebulan|setahun)\b/u,
        answer: 'Loka Kasir menawarkan pelan Pro bulanan, tahunan dan tiga tahun. Lihat halaman harga untuk menyemak kadar dan membandingkan pelan.',
        action: 'Lihat harga',
      },
      register: {
        label: 'Cara mendaftar',
        matches: /\b(?:daftar|mendaftar|pendaftaran|buat akaun|buka akaun)\b/u,
        answer: 'Cipta akaun pemilik melalui pelayar atau aplikasi Loka Kasir. Sahkan e-mel, kemudian daftar cawangan pertama. Akaun yang sama boleh digunakan dalam aplikasi dan Web Admin.',
        action: 'Daftar Loka Kasir',
      },
      download: {
        label: 'Muat turun',
        matches: /\b(?:muat turun|download|pasang aplikasi|apk|android|windows)\b/u,
        answer: 'Loka Kasir tersedia untuk Android dan Windows. Pilih versi yang sesuai dengan peranti anda di halaman muat turun.',
        action: 'Lihat muat turun',
      },
      offline: {
        label: 'Mod luar talian',
        matches: /\b(?:offline|luar talian|tanpa internet|internet terputus|tiada internet)\b/u,
        answer: 'Jualan tunai boleh diteruskan apabila sambungan terputus. Jualan disimpan pada peranti dan disegerakkan apabila internet kembali. Bayaran yang perlu disahkan dalam talian, seperti bayaran QR, masih memerlukan sambungan.',
      },
      qris: {
        label: 'Bayaran QR',
        matches: /\b(?:qris|bayaran qr|pembayaran qr|kaedah pembayaran)\b/u,
        answer: 'Loka Kasir menyokong bayaran QR. Pilih kaedah pembayaran yang muncul di kaunter dalam Web Admin. Untuk bantuan pengaktifan atau semakan bayaran, hubungi pasukan kami.',
      },
      printer: {
        label: 'Pencetak resit',
        matches: /\b(?:printer|pencetak|resit|cetak|terma|esc\/pos)\b/u,
        answer: 'Pada Android, gunakan pencetak terma Bluetooth yang menyokong ESC/POS. Pada Windows, pasang pemacu pencetak terlebih dahulu. Hubungi pasukan kami dengan jenama dan model untuk menyemak keserasian.',
      },
    },
  },
  ja: {
    title: 'Lokaに質問',
    bot: 'サポートボット',
    you: 'あなた',
    welcome: 'こんにちは。Loka Kasirについて知りたいことはありますか？トピックを選ぶか、質問を入力してください。',
    placeholder: '質問を入力',
    send: '質問を送信',
    close: 'チャットを閉じる',
    whatsapp: 'WhatsAppで担当者に相談',
    faq: 'よくある質問',
    fallback: 'その質問にはまだお答えできません。よくある質問をご覧いただくか、WhatsAppで担当者にご相談ください。',
    typing: '入力中です',
    hello: 'こんにちは。',
    talk: {
      greeting: {
        matches: /^(?:こんにちは|こんばんは|おはよう(?:ございます)?|はじめまして|hello|hi)$/u,
        answer: 'Loka Kasirについて、どのようなことをお知りになりたいですか？',
      },
      thanks: {
        matches: /^(?:ありがとう(?:ございます|ございました)?|どうも(?:ありがとう(?:ございます)?)?|助かりました|thanks|thank you)$/u,
        answer: 'どういたしまして。ほかにもご不明な点があれば、お気軽にご質問ください。',
      },
      identity: {
        matches: /^(?:あなたは)?(?:誰|だれ|ボット|ロボット|人間)(?:ですか|なの|か)?$/u,
        answer: 'Loka Kasirの自動応答ボットです。担当者とのやり取りをご希望の場合は、WhatsAppでご相談ください。',
        whatsapp: true,
      },
      human: {
        matches: /担当者|オペレーター|人と話|電話|問い合わせ/u,
        answer: '承知しました。WhatsAppで担当者がご案内します。',
        whatsapp: true,
      },
      ack: {
        matches: /^(?:わかりました|分かりました|了解(?:です|しました)?|なるほど|ok|はい)$/u,
        answer: '承知しました。ほかにご質問があれば、こちらに入力してください。',
      },
    },
    support: /エラー|失敗|不具合|忘れ|できない|支払い済み/u,
    topics: {
      trial: {
        label: '無料お試し',
        matches: /お試し|試用|トライアル|無料|14日/u,
        answer: '新規アカウントでは、初回の会計から14日間、Proの全機能を無料でお試しいただけます。その後も会計を続ける場合は、有料プランをお選びください。',
        action: 'プランを見る',
      },
      pricing: {
        label: '料金プラン',
        matches: /料金|月額|年額|利用料|サブスク|いくら/u,
        answer: 'Proには月額・年額・3年のプランがあります。料金ページで利用料を確認し、プランを比較できます。',
        action: '料金を見る',
      },
      register: {
        label: 'アカウント登録',
        matches: /アカウント|登録方法|登録する|登録したい/u,
        answer: 'ブラウザまたはアプリからオーナーアカウントを作成し、メール認証のあとに最初の店舗を登録してください。アプリと管理画面で同じアカウントを使えます。',
        action: 'アカウントを作成',
      },
      download: {
        label: 'ダウンロード',
        matches: /ダウンロード|インストール|android|windows|apk/u,
        answer: 'Loka KasirはAndroidとWindowsに対応しています。ダウンロードページで、お使いの端末に合った版をお選びください。',
        action: 'ダウンロードページを開く',
      },
      offline: {
        label: 'オフライン',
        matches: /オフライン|通信が切|通信障害|ネット(?:が)?切|ネットなし/u,
        answer: '通信が切れても現金での会計は続けられます。データは端末に保存され、通信が戻ると同期されます。QR決済などオンラインで確認が必要な支払いには通信が必要です。',
      },
      qris: {
        label: 'QR決済',
        matches: /qr(?:is|決済|コード)|支払い方法/u,
        answer: 'Loka KasirはQR決済に対応しています。レジに表示する支払い方法は管理画面で設定できます。設定や個別のお支払いの確認は、サポートへお問い合わせください。',
      },
      printer: {
        label: 'レシートプリンター',
        matches: /プリンタ|レシート|印刷|esc\/pos/u,
        answer: 'AndroidではESC/POS対応のBluetoothサーマルプリンターをお使いください。Windowsでは先にプリンタードライバーをインストールしてください。対応機種はメーカー名と型番を添えてお問い合わせください。',
      },
    },
  },
};

export function matchChatTopic(copy: ChatCopy, question: string): ChatTopic | undefined {
  const text = normalizeQuestion(question);
  if (copy.support.test(text)) return;
  return topics.find((topic) => copy.topics[topic].matches.test(text));
}

/** Huruf dan angka saja, tanpa tanda baca dan huruf yang dipanjang-panjangkan ("haloooo", "makasihh"). */
function talkText(question: string) {
  return question.normalize('NFKC').toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/(\p{L})\1{2,}/gu, '$1')
    .replace(/(\p{L})\1(?=\s|$)/gu, '$1')
    .trim();
}

export function matchChatTalk(copy: ChatCopy, question: string): ChatTalk | undefined {
  const text = talkText(question);
  if (!text) return copy.talk.empty && 'empty';
  const bare = copy.polite ? text.replace(copy.polite, ' ').replace(/\s+/g, ' ').trim() : text;
  return talks.find((talk) => {
    const matches = copy.talk[talk]?.matches;
    return matches && (matches.test(text) || (bare !== '' && matches.test(bare)));
  });
}

/** Balasan basa-basi; sapaan dibalas dengan salam yang sama ("Selamat pagi!"). */
export function chatTalkAnswer(copy: ChatCopy, talk: ChatTalk, question: string) {
  const answer = copy.talk[talk]?.answer ?? copy.fallback;
  if (talk !== 'greeting') return answer;
  const text = talkText(question);
  return `${copy.salutes?.find(([salute]) => salute.test(text))?.[1] ?? copy.hello} ${answer}`;
}

export function isYesNoQuestion(copy: ChatCopy, question: string) {
  return !!copy.yesNo?.test(normalizeQuestion(question));
}

export function isChatIssue(copy: ChatCopy, question: string) {
  return copy.support.test(normalizeQuestion(question));
}

function normalizeQuestion(question: string) {
  return question.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ')
    // "harga nya berapaan" = "harga berapa".
    .replace(/ nya\b/g, '')
    .replace(/\bberapaan\b/g, 'berapa');
}
