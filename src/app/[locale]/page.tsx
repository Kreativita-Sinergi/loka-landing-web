import React from "react";
import { notFound } from "next/navigation";

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/Cta";
import Ecosystem from "@/components/Ecosystem";
import WebAdmin from "@/components/WebAdmin";
import { getWebAdmin } from "@/data/webAdmin";
import HowToStart from "@/components/HowToStart";
import Pricing from "@/components/Pricing/Pricing";
import AppScreenshots from "@/components/AppScreenshots";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ParentCompany from "@/components/ParentCompany";
import FeatureOverview from "@/components/FeatureOverview";
import Partnership from "@/components/Partnership";
import { getPartnership } from "@/data/partnership";
import Tutorials from "@/components/Tutorials";
import OnsiteService from "@/components/OnsiteService";
import { onsiteServiceDetails } from "@/data/onsiteService";
import { getHowToStart } from "@/data/howToStart";
import { getTutorials } from "@/data/tutorials";
import { getFaqs } from "@/data/faq";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

const HomePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  const ui = getUi(locale);
  const tutorialDetails = getTutorials(locale);
  const webAdminDetails = getWebAdmin(locale);
  const howToStartDetails = getHowToStart(locale);
  const partnershipDetails = getPartnership(locale);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFaqs(locale).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero locale={locale} />

      <Stats locale={locale} />

      <Container>
        {/* Video Tutorial — section teratas: tunjukkan aplikasi bekerja sebelum menjelaskan fiturnya */}
        <Section
          id="tutorial"
          title={tutorialDetails.title}
          description={tutorialDetails.description}
        >
          <Tutorials locale={locale} />
        </Section>

        {/* Fitur Unggulan */}
        <Section
          id="features"
          title={ui.sectionFeatures}
          description={ui.sectionFeaturesDesc}
        >
          <FeatureOverview locale={locale} />
          <Benefits locale={locale} />
        </Section>

        {/* Ekosistem */}
        <Section
          id="ecosystem"
          title={ui.sectionEcosystem}
          description={ui.sectionEcosystemDesc}
        >
          <Ecosystem locale={locale} />
        </Section>

        {/* Web Admin — bagian tersendiri karena pembeli produk ini adalah
            pemilik, dan Web Admin-lah bagian yang dipakai pemilik setiap hari */}
        <Section
          id="web-admin"
          title={webAdminDetails.title}
          description={webAdminDetails.description}
        >
          <WebAdmin locale={locale} />
        </Section>

        {/* Cara Daftar & Mulai Pakai */}
        <Section
          id="cara-mulai"
          title={howToStartDetails.title}
          description={howToStartDetails.description}
        >
          <HowToStart locale={locale} />
        </Section>

        {/* Layanan Setup Onsite — Padang, Pekanbaru, Payakumbuh.
            HANYA untuk bahasa Indonesia: timnya cuma ada di tiga kota itu, dan
            menjanjikan kunjungan ke toko kepada pembaca di Osaka atau Kuala
            Lumpur adalah janji yang tidak bisa ditepati. Tautannya di navigasi
            dan footer ikut dihapus untuk bahasa lain. */}
        {locale === DEFAULT_LOCALE && (
          <Section
            id="layanan-onsite"
            title={onsiteServiceDetails.title}
            description={onsiteServiceDetails.description}
          >
            <OnsiteService />
          </Section>
        )}

        {/* Tampilan Aplikasi */}
        <Section
          id="screenshots"
          title={ui.sectionScreenshots}
          description={ui.sectionScreenshotsDesc}
        >
          <AppScreenshots locale={locale} />
        </Section>

        {/* Testimoni */}
        <Section
          id="testimonials"
          title={ui.sectionTestimonials}
          description={ui.sectionTestimonialsDesc}
        >
          <Testimonials locale={locale} />
        </Section>

        {/* Request Fitur & Kerjasama */}
        <Section
          id="kerjasama"
          title={partnershipDetails.title}
          description={partnershipDetails.description}
        >
          <Partnership locale={locale} />
        </Section>

        {/* Harga */}
        <Section
          id="pricing"
          title={ui.sectionPricing}
          description={ui.sectionPricingDesc}
        >
          <Pricing locale={locale} />
        </Section>

        <CTA locale={locale} />

        <FAQ locale={locale} />

        {/* Loka Kasir adalah bagian dari Kreativita Sinergi */}
        <ParentCompany locale={locale} />
      </Container>
    </>
  );
};

export default HomePage;
