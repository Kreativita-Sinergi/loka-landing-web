import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteDetails } from '@/data/siteDetails'
import { getAccountDeletion } from '@/data/accountDeletion'
import { LOCALES, type Locale } from '@/data/localized'
import { alternatesFor } from '@/lib/hreflang'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params
  if (!(LOCALES as readonly string[]).includes(locale)) notFound()
  const copy = getAccountDeletion(locale as Locale)

  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/hapus-akun'),
  }
}

const DELETION_MAILTO =
  'mailto:help@lokakasir.id?subject=Permintaan%20Hapus%20Akun%20Loka%20Kasir'

export default async function AccountDeletionPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params
  if (!(LOCALES as readonly string[]).includes(raw)) notFound()
  const copy = getAccountDeletion(raw as Locale)

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-600 mb-2 dark:text-blue-400">Loka Kasir</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-white">{copy.title}</h1>
          <p className="text-gray-500 text-sm dark:text-gray-400">{copy.lastUpdated}</p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-10 dark:text-gray-300">
          {copy.intro}
        </p>

        {/* Steps — hanya langkah pertama yang memuat tautan email; sisanya
            `tail` dibiarkan kosong dan tautannya tidak dirender. */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">
            {copy.stepsHeading}
          </h2>
          <div className="space-y-5">
            {copy.steps.map((step, i) => (
              <div key={step.title} className="border border-gray-200 rounded-2xl p-6 flex items-start gap-4 dark:border-surface-border dark:bg-surface">
                <span className="flex-none w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center dark:bg-blue-500/15 dark:text-blue-300">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {step.lead}
                    {step.tail && (
                      <>
                        <a href={DELETION_MAILTO} className="text-blue-600 hover:underline dark:text-blue-400">
                          help@lokakasir.id
                        </a>
                        {step.tail}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data deleted */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.deletedHeading}</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            {copy.deletedLead}
          </p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {copy.deleted.map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
                <p><strong>{item.label}</strong> {item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.retentionHeading}</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {copy.retention.map((line, i) => (
              <li key={line} className="flex gap-3">
                <span>{['⏱️', '🗄️', '🧾'][i]}</span>
                <p>{line}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Partial deletion */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            {copy.partialHeading}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {copy.partialBody}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.contactHeading}</h2>
          <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700 space-y-1 dark:bg-surface dark:text-gray-300">
            <p>📧 <strong>{copy.contactEmail}</strong>{' '}
              <a href="mailto:help@lokakasir.id" className="text-blue-600 hover:underline dark:text-blue-400">help@lokakasir.id</a>
            </p>
            <p>📞 <strong>{copy.contactPhone}</strong> +62 853-9373-7313</p>
            <p>🏢 <strong>{copy.contactDeveloper}</strong> Kreativita Sinergi</p>
            <p>📍 Jl. Air Camar No. 24, Padang Timur, Kota Padang, Sumatera Barat, Indonesia</p>
          </div>
        </section>

        <hr className="border-gray-100 mb-8 dark:border-surface-border" />
        <p className="text-xs text-gray-400 text-center dark:text-gray-500">
          &copy; {new Date().getFullYear()} Loka Kasir &mdash; Kreativita Sinergi. {copy.rights}
        </p>
      </div>
    </div>
  )
}
