import type { Locale } from '@/data/localized';

const topics = ['offline', 'printer', 'qris', 'trial', 'pricing', 'register', 'download'] as const;
export type ChatTopic = (typeof topics)[number];

type TopicCopy = {
  label: string;
  matches: RegExp;
  answer: string;
  action?: string;
};

type ChatCopy = {
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
  support: RegExp;
  topics: Record<ChatTopic, TopicCopy>;
};

export const chatSuggestions = ['pricing', 'trial', 'download', 'qris'] as const;

export const supportChatCopy: Record<Locale, ChatCopy> = {
  id: {
    title: 'Tanya Loka',
    bot: 'Bot bantuan',
    you: 'Anda',
    welcome: 'Halo! Mau tahu soal Loka Kasir? Pilih topik atau tulis pertanyaan Anda.',
    placeholder: 'Tulis pertanyaan Anda',
    send: 'Kirim pertanyaan',
    close: 'Tutup chat',
    whatsapp: 'Hubungi admin via WhatsApp',
    faq: 'Lihat FAQ',
    fallback: 'Saya belum punya jawaban untuk pertanyaan itu. Coba lihat FAQ atau tanyakan langsung ke admin lewat WhatsApp.',
    support: /\b(?:error|gagal|masalah|bermasalah|kendala|lupa|komplain|tidak bisa|nggak bisa|gak bisa|belum masuk|tidak masuk|sudah bayar|sudah transfer|terpotong)\b/u,
    topics: {
      trial: {
        label: 'Trial gratis',
        matches: /\b(?:trial|uji coba|percobaan|gratis|14 hari)\b/u,
        answer: 'Akun baru bisa mencoba semua fitur Pro gratis selama 14 hari, mulai dari transaksi pertama. Setelah itu, pilih paket langganan untuk melanjutkan transaksi.',
        action: 'Lihat paket langganan',
      },
      pricing: {
        label: 'Harga langganan',
        matches: /\b(?:harga(?! jual| produk| barang| modal)|langganan|berlangganan|biaya|tarif|per bulan|per tahun)\b/u,
        answer: 'Loka Kasir menyediakan paket Pro bulanan, tahunan, dan tiga tahun. Buka halaman harga untuk melihat tarif dan membandingkan paket.',
        action: 'Buka halaman harga',
      },
      register: {
        label: 'Cara daftar',
        matches: /\b(?:cara daftar|daftar akun|daftar|mendaftar|pendaftaran|registrasi|buat akun|bikin akun|sign up)\b/u,
        answer: 'Buat akun pemilik dari browser atau dari aplikasi Loka Kasir. Setelah verifikasi email, buat outlet pertama. Akun yang sama bisa dipakai di aplikasi dan Web Admin.',
        action: 'Daftar Loka Kasir',
      },
      download: {
        label: 'Unduh aplikasi',
        matches: /\b(?:unduh|download|instal|install|pasang aplikasi|apk|android|windows)\b/u,
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
        matches: /\b(?:printer|struk|cetak|thermal|termal|esc\/pos)\b/u,
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
  const text = question.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
  if (copy.support.test(text)) return;
  return topics.find((topic) => copy.topics[topic].matches.test(text));
}
