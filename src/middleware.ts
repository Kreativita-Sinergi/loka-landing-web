import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LOCALE, LOCALES } from '@/data/localized'

/**
 * Satu pohon rute, dua bentuk alamat.
 *
 * Seluruh halaman hidup di bawah `src/app/[locale]/`, tetapi bahasa Indonesia
 * TIDAK memakai awalan di alamatnya: `/`, `/web-admin`, dan `/download/windows`
 * sudah terindeks sejak lama, dan memindahkannya ke `/id/...` berarti membuang
 * peringkat yang sudah dikumpulkan demi keseragaman yang tidak dilihat siapa
 * pun. Middleware inilah yang menjembataninya:
 *
 *   - `/web-admin`     → ditulis ulang ke `/id/web-admin`  (alamat tidak berubah)
 *   - `/ja/web-admin`  → dibiarkan apa adanya
 *   - `/id/web-admin`  → dialihkan permanen ke `/web-admin`
 *
 * Pengalihan terakhir itu bukan kerapian belaka: tanpanya setiap halaman
 * berbahasa Indonesia punya dua alamat yang sah, dan mesin pencari harus
 * menebak sendiri mana yang asli.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  const alreadyPrefixed = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (alreadyPrefixed) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Berkas statis, rute internal Next, dan apa pun yang berekstensi (termasuk
  // robots.txt & sitemap.xml) tidak boleh ikut ditulis ulang.
  matcher: ['/((?!_next/|.*\\..*).*)'],
}
