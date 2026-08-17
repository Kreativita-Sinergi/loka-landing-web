import { IFAQ } from "@/types";
import { pick, type Locale } from "../localized";

import { faqsId } from "./id";
import { faqsEn } from "./en";
import { faqsMs } from "./ms";
import { faqsJa } from "./ja";

/**
 * FAQ dipecah satu berkas per bahasa, bukan satu berkas dengan empat cabang di
 * tiap pertanyaan. Isinya 40-an pertanyaan; digabung dalam satu berkas, sebuah
 * jawaban dan terjemahannya akan terpisah ratusan baris, dan memperbaiki salah
 * satu tanpa menyadari yang lain berubah artinya menjadi mudah sekali.
 *
 * Daftarnya juga tidak wajib sama panjang. Versi Indonesia memuat dua
 * pertanyaan tentang kunjungan tim ke Padang, Pekanbaru, dan Payakumbuh yang
 * memang tidak punya arti di pasar lain.
 */
const faqsByLocale: Record<Locale, IFAQ[]> = {
  id: faqsId,
  en: faqsEn,
  ms: faqsMs,
  ja: faqsJa,
};

export const getFaqs = (locale: Locale) => pick(faqsByLocale, locale);

/** @deprecated Pakai [getFaqs]. */
export const faqs = faqsId;
