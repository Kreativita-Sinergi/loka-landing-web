/**
 * Pemilih konten per bahasa untuk `src/data/`.
 *
 * Halaman ini sudah data-driven — seluruh teksnya hidup di `src/data/`, bukan di
 * markup komponen. Berkas ini menambahkan satu dimensi lagi ke sana: bahasa.
 *
 * ── Kenapa belum ada terjemahannya ────────────────────────────────────────────
 *
 * Copy pemasaran TIDAK bisa diterjemahkan; ia harus DITULIS ulang per pasar.
 * "Naik Kelas Tanpa Ribet" yang diterjemahkan harfiah ke bahasa Jepang
 * menghasilkan kalimat yang benar secara tata bahasa dan tidak menggerakkan
 * siapa pun — janji, keberatan, dan bukti sosial yang relevan bagi pemilik warung
 * di Bandung berbeda dari yang relevan bagi pemilik izakaya di Osaka. Menaruh
 * hasil terjemahan mesin di `/ja` lebih buruk daripada tidak punya `/ja` sama
 * sekali: ia menjanjikan situs berbahasa Jepang lalu menyerahkan sesuatu yang
 * terbaca seperti spam.
 *
 * Karena itu yang disiapkan di sini adalah TEMPATNYA, bukan isinya. Begitu copy
 * asli tiap pasar tersedia, ia tinggal ditaruh di peta `byLocale` dan seluruh
 * komponen langsung memakainya — tanpa satu baris kode pun berubah.
 *
 * Harga sudah tidak menunggu itu: ia angka, bukan copy, dan sudah lokal sejak
 * sekarang lewat `lib/pricing.ts`.
 */

export const LOCALES = ['id', 'en', 'ms', 'ja'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'id'

/**
 * Memilih varian bahasa sebuah konten.
 *
 * Cadangannya satu lapis dan disengaja: bahasa yang diminta → bahasa Indonesia.
 * Tidak ada lapisan di antaranya, karena konten setengah-Indonesia setengah-Inggris
 * di satu halaman terbaca sebagai kesalahan sistem, bukan sebagai terjemahan yang
 * belum lengkap.
 */
export function pick<T>(byLocale: Partial<Record<Locale, T>>, locale: Locale): T {
  return byLocale[locale] ?? (byLocale[DEFAULT_LOCALE] as T)
}

/** Menyaring tag bahasa apa pun menjadi salah satu [LOCALES]. */
export function resolveLocale(candidate: string | null | undefined): Locale {
  if (!candidate) return DEFAULT_LOCALE
  const language = candidate.replace('_', '-').split('-')[0].toLowerCase()
  return (LOCALES as readonly string[]).includes(language)
    ? (language as Locale)
    : DEFAULT_LOCALE
}

/** Tag locale lengkap untuk atribut `lang` dan metadata OpenGraph. */
export const HTML_LANG: Record<Locale, string> = {
  id: 'id-ID',
  en: 'en-US',
  ms: 'ms-MY',
  ja: 'ja-JP',
}
