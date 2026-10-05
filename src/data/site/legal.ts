import type { Locale } from '@/data/localized';

/**
 * Label tata letak untuk halaman hukum desain 2026 (`/privacy-policy`,
 * `/hapus-akun`). Bukan teks hukum: isi kebijakannya tetap verbatim dari
 * `data/privacyPolicy.ts` dan `data/accountDeletion.ts`.
 *
 * Disediakan di keempat bahasa karena halaman hukumnya sendiri sudah
 * diterjemahkan; label berbahasa Indonesia di halaman Inggris akan terbaca
 * sebagai kesalahan.
 */
type LegalUi = {
  home: string;
  toc: string;
  aboutPolicy: string;
  retentionLabels: [string, string, string];
  sendEmail: string;
  whatsapp: string;
  whatsappMessage: string;
};

const byLocale: Record<Locale, LegalUi> = {
  id: {
    home: 'Beranda',
    toc: 'Daftar isi',
    aboutPolicy: 'Tentang kebijakan ini',
    retentionLabels: ['Maks. 7 hari kerja', '30 hari berikutnya', 'Pengecualian'],
    sendEmail: 'Kirim Email',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Halo tim Loka Kasir, saya ingin meminta penghapusan akun/data.',
  },
  en: {
    home: 'Home',
    toc: 'Contents',
    aboutPolicy: 'About this policy',
    retentionLabels: ['Within 7 working days', 'Next 30 days', 'Exception'],
    sendEmail: 'Send Email',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Hello Loka Kasir team, I would like to request deletion of my account/data.',
  },
  ms: {
    home: 'Laman utama',
    toc: 'Kandungan',
    aboutPolicy: 'Tentang dasar ini',
    retentionLabels: ['Maks. 7 hari bekerja', '30 hari berikutnya', 'Pengecualian'],
    sendEmail: 'Hantar E-mel',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Hai pasukan Loka Kasir, saya ingin memohon pemadaman akaun/data saya.',
  },
  ja: {
    home: 'ホーム',
    toc: '目次',
    aboutPolicy: 'このポリシーについて',
    retentionLabels: ['7営業日以内', 'その後30日以内', '例外'],
    sendEmail: 'メールを送る',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Loka Kasir サポートご担当者さま。アカウント／データの削除をお願いします。',
  },
};

export const getLegalUi = (locale: Locale) => byLocale[locale] ?? byLocale.id;
