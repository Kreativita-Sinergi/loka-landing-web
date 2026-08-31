import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LOCALE, LOCALES } from '@/data/localized'

/**
 * Satu pohon rute, dua bentuk alamat.
 *
 * Seluruh halaman hidup di bawah `src/app/[locale]/`, tetapi bahasa Indonesia
 * tidak memakai awalan di alamatnya. Proxy menulis ulang rute default tanpa
 * mengubah alamat dan mengalihkan `/id/...` ke alamat kanonis tanpa awalan.
 */
export function proxy(request: NextRequest) {
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
  matcher: ['/((?!_next/|.*\\..*).*)'],
}
