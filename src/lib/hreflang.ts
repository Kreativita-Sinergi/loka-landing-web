import type { Metadata } from 'next'

import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from '@/data/localized'
import { siteDetails } from '@/data/siteDetails'

/**
 * Blok `alternates` untuk satu halaman dalam satu bahasa.
 *
 * Setiap halaman harus menyebut DIRINYA sebagai canonical dan menyebut SELURUH
 * saudaranya — termasuk dirinya sendiri — di `languages`. Halaman yang hanya
 * menyebut sebagian membuat mesin pencari memperlakukan sisanya sebagai versi
 * yang berdiri sendiri, dan versi berbahasa Jepang berebut peringkat dengan
 * versi Indonesianya alih-alih saling menguatkan.
 *
 * `x-default` menunjuk ke bahasa Indonesia: itu alamat tanpa awalan, dan
 * pengunjung dari negara yang tidak punya versi sendiri sebaiknya mendarat di
 * sana ketimbang di tebakan yang salah.
 */
export function alternatesFor(locale: Locale, path = '/'): Metadata['alternates'] {
  const languages: Record<string, string> = {}
  for (const candidate of LOCALES) {
    languages[candidate] = `${siteDetails.siteUrl}${localePath(candidate, path)}`
  }
  languages['x-default'] = `${siteDetails.siteUrl}${localePath(DEFAULT_LOCALE, path)}`

  return {
    canonical: `${siteDetails.siteUrl}${localePath(locale, path)}`,
    languages,
  }
}
