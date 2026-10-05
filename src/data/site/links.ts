import { getAppDownload, getSignUp, getSupport, getWindowsDownload, getCta } from '@/data/cta';
import { localePath, type Locale } from '@/data/localized';

/**
 * Semua alamat yang dipakai desain 2026 di satu tempat.
 *
 * Alamat luar (daftar, Play Store, Microsoft Store, WhatsApp) tetap diambil dari
 * `data/cta.ts` supaya tidak ada dua salinan URL yang bisa berbeda.
 */
export function siteLinks(locale: Locale) {
  const p = (path: string) => localePath(locale, path);
  const support = getSupport(locale);
  return {
    home: p('/'),
    fitur: p('/fitur'),
    harga: p('/harga'),
    faq: p('/faq'),
    panduan: p('/panduan'),
    download: p('/download'),
    downloadWindows: p('/download/windows'),
    downloadAndroid: p('/download/android'),
    webAdmin: p('/web-admin'),
    privasi: p('/privacy-policy'),
    hapusAkun: p('/hapus-akun'),
    syarat: p('/syarat-ketentuan'),
    tentang: p('/tentang'),
    blog: p('/blog'),
    usaha: (slug: string) => p(`/usaha/${slug}`),
    jenisUsaha: `${p('/')}#jenis-usaha`,
    register: getSignUp(locale).url,
    login: getCta(locale).dashboardUrl,
    playStore: getAppDownload(locale).url,
    windowsStore: getWindowsDownload(locale).url,
    email: `mailto:${support.email}`,
    instagram: `https://instagram.com/${support.instagram}`,
    whatsapp: (message?: string) =>
      `https://wa.me/${support.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`,
    maps: 'https://maps.google.com/?q=Jl.%20Tiung%20No.%2018%2C%20Labuh%20Baru%20Timur%2C%20Payung%20Sekaki%2C%20Pekanbaru%2C%20Riau%2028292',
  };
}

export type SiteLinks = ReturnType<typeof siteLinks>;

/** Nomor WhatsApp dalam format tampilan lokal. */
export const WHATSAPP_DISPLAY = '0838-7896-0539';
export const SUPPORT_EMAIL = 'help@lokakasir.id';
export const INSTAGRAM_HANDLE = '@lokakasir.id';
export const OFFICE_ADDRESS =
  'Jl. Tiung No. 18, Kel. Labuh Baru Timur, Kec. Payung Sekaki, Kota Pekanbaru, Riau 28292';
export const SERVICE_HOURS = 'Buka 08.00–22.00 WIB';
export const ONSITE_CITIES = ['Padang', 'Pekanbaru', 'Payakumbuh'];
