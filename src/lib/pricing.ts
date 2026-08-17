/**
 * Harga langganan untuk halaman pemasaran.
 *
 * Sebelum ini `src/data/pricing.ts` menanam angka rupiahnya sendiri, terpisah
 * dari dasbor dan dari yang benar-benar ditagih server. Tiga salinan angka yang
 * sama berarti tiga tempat yang bisa berbeda — dan halaman harga yang berbeda
 * dari tagihan adalah keluhan yang sampai ke dukungan pelanggan, bukan ke tim
 * yang bisa memperbaikinya.
 *
 * Sekarang halaman ini membaca `/subscription-prices`, sumber yang sama dengan
 * aplikasi kasir dan dasbor.
 */

export interface SubscriptionPrice {
  plan: string
  /** Nominal yang benar-benar ditagih, selalu IDR. */
  charge_amount: number
  /** Mata uang yang ditampilkan ke pengunjung. */
  display_currency: string
  /** Nominal tampil dalam satuan TERKECIL mata uangnya (1480 = ¥1.480). */
  display_amount: number
  decimal_digits: number
  /** false berarti negara ini belum punya harga sendiri dan yang tampil rupiah. */
  is_local_price: boolean
}

/**
 * Negara yang punya harga sendiri, beserta label untuk pemilihnya.
 *
 * Ditulis di sini alih-alih diambil dari `/countries` karena halaman pemasaran
 * harus bisa merender pemilihnya sebelum permintaan jaringan apa pun selesai —
 * pengunjung yang melihat pemilih kosong selama satu detik akan menganggap
 * halamannya rusak.
 */
export const PRICING_COUNTRIES = [
  { code: 'ID', label: 'Indonesia', currency: 'IDR' },
  { code: 'MY', label: 'Malaysia', currency: 'MYR' },
  { code: 'SG', label: 'Singapore', currency: 'SGD' },
  { code: 'TH', label: 'Thailand', currency: 'THB' },
  { code: 'PH', label: 'Philippines', currency: 'PHP' },
  { code: 'JP', label: '日本', currency: 'JPY' },
  { code: 'AU', label: 'Australia', currency: 'AUD' },
  { code: 'US', label: 'United States', currency: 'USD' },
] as const

export type PricingCountry = (typeof PRICING_COUNTRIES)[number]['code']

const CURRENCY_DECIMALS: Record<string, number> = {
  IDR: 0, JPY: 0, KRW: 0, VND: 0,
  MYR: 2, SGD: 2, THB: 2, CNY: 2, USD: 2, AUD: 2, PHP: 2,
}

export function decimalsFor(currency: string): number {
  return CURRENCY_DECIMALS[currency.toUpperCase()] ?? 2
}

/** Locale Intl per negara — menentukan pemisah ribuan dan posisi lambangnya. */
const COUNTRY_INTL_LOCALE: Record<string, string> = {
  ID: 'id-ID', MY: 'ms-MY', SG: 'en-SG', TH: 'th-TH',
  PH: 'en-PH', JP: 'ja-JP', AU: 'en-AU', US: 'en-US',
}

/**
 * Menebak negara pengunjung dari bahasa peramban.
 *
 * Tebakan, bukan kepastian — karena itu pemilih negaranya tetap ada dan terlihat.
 * Pengunjung yang tebakannya meleset cukup satu klik untuk membetulkannya, dan
 * itu jauh lebih baik daripada semua orang melihat rupiah lebih dulu.
 */
export function guessCountry(): PricingCountry {
  if (typeof navigator === 'undefined') return 'ID'
  const tag = navigator.language.replace('_', '-')
  const region = tag.split('-')[1]?.toUpperCase()
  const known = PRICING_COUNTRIES.find((c) => c.code === region)
  if (known) return known.code
  // Tanpa wilayah di tag bahasa, bahasanya sendiri yang dipakai menebak.
  const byLanguage: Record<string, PricingCountry> = { id: 'ID', ms: 'MY', ja: 'JP', th: 'TH' }
  return byLanguage[tag.split('-')[0].toLowerCase()] ?? 'ID'
}

/** Nominal siap render, mis. `¥1,480`. */
export function formatPrice(minorAmount: number, currency: string, country: string): string {
  const decimals = decimalsFor(currency)
  return new Intl.NumberFormat(COUNTRY_INTL_LOCALE[country] ?? 'id-ID', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(minorAmount / 10 ** decimals)
}

/**
 * Mengambil harga sebuah negara dari API.
 *
 * Kegagalan mengembalikan null, bukan melempar: halaman pemasaran yang gagal
 * merender karena API sedang bermasalah kehilangan calon pelanggan, sementara
 * halaman yang menampilkan harga bawaan tetap berguna.
 */
export async function fetchPrices(country: string): Promise<SubscriptionPrice[] | null> {
  // Cadangan URL produksi mengikuti pola yang sudah dipakai `lib/publicStats.ts`.
  // Tanpa itu, halaman harga akan diam-diam berhenti berfungsi di lingkungan yang
  // tidak menyetel env var — dan kegagalannya tak terlihat, karena harga rupiah
  // cadangan tetap tampil dengan wajar.
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.lokakasir.id'
  try {
    const res = await fetch(`${base}/subscription-prices?country=${encodeURIComponent(country)}`)
    if (!res.ok) return null
    const body = (await res.json()) as { data?: SubscriptionPrice[] }
    return body.data ?? null
  } catch {
    return null
  }
}
