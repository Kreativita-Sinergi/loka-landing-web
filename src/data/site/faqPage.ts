import { pick, type Locale } from '@/data/localized';

/** Copy halaman /faq. Pertanyaan dan jawabannya sendiri dari `data/faq`. */
const faqPage = {
  id: {
    metaTitle: 'FAQ Loka Kasir',
    metaDescription:
      'Jawaban seputar cara pakai Loka Kasir, transaksi, stok & HPP, karyawan, laporan, paket langganan, dan perangkat.',
    crumbHome: 'Beranda',
    crumb: 'FAQ',
    title: 'Pertanyaan yang sering ditanyakan',
    desc: 'Cari jawaban seputar cara pakai, paket, dan perangkat.',
    searchPlaceholder: 'Ketik pertanyaan Anda',
    searchLabel: 'Cari pertanyaan',
    categoriesLabel: 'Kategori',
    all: 'Semua',
    resultSuffix: 'pertanyaan cocok',
    empty: 'Tidak ada pertanyaan yang cocok. Coba kata lain, atau tanyakan langsung ke tim kami.',
    clear: 'Hapus pencarian',
    helpTitle: 'Belum ketemu jawabannya?',
    helpDesc: 'Tim kami membalas lewat WhatsApp atau email',
    helpCta: 'Tanya via WhatsApp',
    helpMessage: 'Halo tim Loka, saya punya pertanyaan tentang Loka Kasir.',
  },
};

export type FaqPageCopy = ReturnType<typeof getFaqPageCopy>;
export const getFaqPageCopy = (locale: Locale) => pick(faqPage, locale);
