import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { siteDetails, getSiteMetadata } from '@/data/siteDetails';
import { HTML_LANG, LOCALES, OG_LOCALE, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';

import "../globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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

  return {
    metadataBase: new URL(siteDetails.siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(active, '/'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: siteDetails.siteUrl,
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
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'Loka Kasir',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, Windows, Web',
        description: meta.description,
        url: siteDetails.siteUrl,
        inLanguage: HTML_LANG[locale],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
      },
      {
        '@type': 'Organization',
        name: siteDetails.siteName,
        url: siteDetails.siteUrl,
        logo: `${siteDetails.siteUrl}${siteDetails.siteLogo}`,
        sameAs: [siteDetails.social.instagramPage],
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
    <html lang={HTML_LANG[active]} suppressHydrationWarning>
      <head>
        <script
          // Set the theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(active)) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {siteDetails.googleAnalyticsId && <GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />}
        <Header locale={active} />
        <main>
          {children}
        </main>
        <Footer locale={active} />
        <FloatingWhatsApp locale={active} />
      </body>
    </html>
  );
}
