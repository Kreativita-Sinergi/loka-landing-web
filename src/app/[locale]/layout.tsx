import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import FloatingWa from "@/components/site/FloatingWa";
import { siteDetails, getSiteMetadata } from '@/data/siteDetails';
import { HTML_LANG, LOCALES, OG_LOCALE, localePath, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';

import "../globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const active = locale as Locale;
  const meta = getSiteMetadata(active);
  const canonicalUrl = `${siteDetails.siteUrl}${localePath(active, '/')}`;

  return {
    metadataBase: new URL(siteDetails.siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: siteDetails.siteName,
    authors: [{ name: 'Kreativita Sinergi', url: 'https://www.kreativitasinergi.com' }],
    creator: 'Kreativita Sinergi',
    publisher: 'Kreativita Sinergi',
    category: 'Point of Sale Software',
    alternates: alternatesFor(active, '/'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: 'website',
      siteName: siteDetails.siteName,
      locale: OG_LOCALE[active],
      // Gambar OG dibuat dinamis lewat opengraph-image.tsx (otomatis dipasang Next.js).
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      // Gambar Twitter dibuat dinamis lewat twitter-image.tsx.
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
  };
}

// Structured data (JSON-LD) — membantu Google menampilkan rich result untuk
// aplikasi & organisasi. Mengikuti skema schema.org.
function buildJsonLd(locale: Locale) {
  const meta = getSiteMetadata(locale);
  const canonicalUrl = `${siteDetails.siteUrl}${localePath(locale, '/')}`;
  const websiteId = `${siteDetails.siteUrl}/#website`;
  const appId = `${siteDetails.siteUrl}/#software`;
  const publisherId = 'https://www.kreativitasinergi.com/#organization';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': appId,
        name: 'Loka Kasir',
        alternateName: 'Loka Kasir POS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Point of Sale',
        operatingSystem: 'Android, Windows, Web',
        description: meta.description,
        url: canonicalUrl,
        inLanguage: HTML_LANG[locale],
        installUrl: 'https://play.google.com/store/apps/details?id=id.lokakasir.app',
        featureList: [
          'Transaksi point of sale',
          'Manajemen stok dan multi-outlet',
          'Shift dan absensi karyawan',
          'Laporan penjualan real-time',
          'Kitchen Display System',
          'Mode offline dan sinkronisasi cloud',
        ],
        offers: [
          {
            '@type': 'Offer',
            name: 'Paket Gratis',
            price: '0',
            priceCurrency: 'IDR',
          },
          {
            '@type': 'Offer',
            name: 'Paket Pro Bulanan',
            price: '59000',
            priceCurrency: 'IDR',
          },
        ],
        brand: { '@type': 'Brand', name: 'Loka Kasir' },
        publisher: { '@id': publisherId },
        // Produk saudara, bukan produk yang sama — karena itu `isRelatedTo`, dan
        // BUKAN `sameAs`. `sameAs` berarti "ini entitas yang sama di alamat lain";
        // memakainya di sini akan memberi tahu mesin pencari bahwa Loka Kasir dan
        // Loka Accounting adalah satu produk, lalu menggabungkan sinyal keduanya.
        isRelatedTo: {
          '@type': 'SoftwareApplication',
          name: 'Loka Accounting',
          applicationCategory: 'BusinessApplication',
          url: 'https://lokatech.id',
        },
        sameAs: [
          siteDetails.social.instagramPage,
          'https://play.google.com/store/apps/details?id=id.lokakasir.app',
          'https://apps.microsoft.com/detail/9mxbj5l6rdp8',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
        inLanguage: HTML_LANG[locale],
        publisher: { '@id': publisherId },
        about: { '@id': appId },
      },
      {
        '@type': 'Organization',
        '@id': publisherId,
        name: 'Kreativita Sinergi',
        url: 'https://www.kreativitasinergi.com',
        logo: `${siteDetails.siteUrl}/images/kreativita-logo.png`,
        email: 'halo@kreativitasinergi.com',
      },
    ],
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const active = locale as Locale;

  return (
    <html lang={HTML_LANG[active]}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(active)).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jakarta.variable} font-sans antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <SiteHeader locale={active} />
        <main>
          {children}
        </main>
        <SiteFooter locale={active} />
        <FloatingWa locale={active} />
      </body>
    </html>
  );
}
