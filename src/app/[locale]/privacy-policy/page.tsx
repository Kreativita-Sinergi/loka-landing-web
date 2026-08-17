import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { siteDetails } from '@/data/siteDetails'
import { getPrivacy, permissionShape } from '@/data/privacyPolicy'
import { LOCALES, localePath, type Locale } from '@/data/localized'
import { alternatesFor } from '@/lib/hreflang'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params
  if (!(LOCALES as readonly string[]).includes(locale)) notFound()
  const copy = getPrivacy(locale as Locale)

  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/privacy-policy'),
  }
}

export default async function PrivacyPolicyPage(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params
  if (!(LOCALES as readonly string[]).includes(raw)) notFound()
  const locale = raw as Locale
  const copy = getPrivacy(locale)

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
        <p className="text-gray-700 leading-relaxed mb-4 dark:text-gray-300">
          {copy.intro}
        </p>
        <p className="text-gray-700 leading-relaxed mb-10 dark:text-gray-300">
          {copy.scopeLead}
          <a href={siteDetails.dashboardUrl} className="text-blue-600 hover:underline dark:text-blue-400">
            {siteDetails.dashboardUrl.replace('https://', '')}
          </a>
          {copy.scopeTail}
        </p>

        {/* Permissions — ikon dan penanda wajib/opsional datang dari
            `permissionShape`, bukan dari teks: keduanya fakta produk yang harus
            sama di semua bahasa. */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">{copy.permissionsHeading}</h2>
          <div className="space-y-5">
            {copy.permissions.map((p, i) => (
              <div key={p.name} className="border border-gray-200 rounded-2xl p-6 dark:border-surface-border dark:bg-surface">
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-0.5">{permissionShape[i].icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                      {permissionShape[i].optional ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-300">
                          {copy.labelOptional}
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                          {copy.labelRequired}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-mono mb-1 dark:text-gray-500">{p.technicalId}</p>
                    <p className="text-xs text-gray-500 mb-3 dark:text-gray-400">
                      <span className="font-medium">{copy.labelPlatforms}</span>{p.platforms}
                    </p>
                    <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">
                      <span className="font-medium text-gray-900 dark:text-white">{copy.labelWhy}</span>
                      {p.why}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">{copy.labelData}</span>
                      {p.dataCollected}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data collected */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.otherDataHeading}</h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {copy.otherData.map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
                <p><strong>{item.label}</strong> {item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Third-party processors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.processorsHeading}</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            {copy.processorsLead}
          </p>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {copy.processors.map((item) => (
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
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>{copy.retentionActive}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>{copy.retentionDeleteLead}
                <Link href={localePath(locale, '/hapus-akun')} className="text-blue-600 hover:underline dark:text-blue-400">{copy.retentionDeleteLink}</Link>
                {copy.retentionDeleteTail}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>{copy.retentionToken}</p>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
              <p>{copy.retentionLegal}</p>
            </div>
          </div>
        </section>

        {/* How we protect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.protectionHeading}</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {copy.protection.map((line) => (
              <li key={line} className="flex gap-3"><span>✅</span> {line}</li>
            ))}
          </ul>
        </section>

        {/* User rights */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">{copy.rightsHeading}</h2>
          <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
            {copy.rightsLead}
          </p>
          <div className="space-y-3 text-sm text-gray-700 mb-3 dark:text-gray-300">
            {copy.rightsPlatforms.map((item) => (
              <div key={item.label} className="flex gap-3">
                <span className="text-gray-400 mt-0.5 dark:text-gray-500">•</span>
                <p><strong>{item.label}</strong> {item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {copy.rightsContactLead}
            <a href="mailto:help@lokakasir.id" className="text-blue-600 hover:underline dark:text-blue-400">
              help@lokakasir.id
            </a>.
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
          &copy; {new Date().getFullYear()} Loka Kasir &mdash; Kreativita Sinergi. {copy.copyright}
        </p>
      </div>
    </div>
  )
}
