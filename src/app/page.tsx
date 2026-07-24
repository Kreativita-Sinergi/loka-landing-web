import React from "react";

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/Cta";
import Ecosystem from "@/components/Ecosystem";
import HowToStart from "@/components/HowToStart";
import Pricing from "@/components/Pricing/Pricing";
import AppScreenshots from "@/components/AppScreenshots";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import ParentCompany from "@/components/ParentCompany";
import Tutorials from "@/components/Tutorials";
import { howToStartDetails } from "@/data/howToStart";
import { tutorialDetails } from "@/data/tutorials";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      <Stats />

      <Container>
        {/* Video Tutorial — section teratas: tunjukkan aplikasi bekerja sebelum menjelaskan fiturnya */}
        <Section
          id="tutorial"
          title={tutorialDetails.title}
          description={tutorialDetails.description}
        >
          <Tutorials />
        </Section>

        {/* Fitur Unggulan */}
        <Section
          id="features"
          title="Fitur Unggulan"
          description="Semua yang Anda butuhkan untuk mengelola kasir, shift, dan laporan bisnis — dalam satu aplikasi yang ringan dan mudah dipakai."
        >
          <Benefits />
        </Section>

        {/* Ekosistem */}
        <Section
          id="ecosystem"
          title="Satu Sistem untuk Kasir & Pemilik"
          description="Aplikasi Kasir dipakai tim di toko, Web Admin dipegang pemilik. Keduanya langsung terhubung, jadi datanya selalu sinkron."
        >
          <Ecosystem />
        </Section>

        {/* Cara Daftar & Mulai Pakai */}
        <Section
          id="cara-mulai"
          title={howToStartDetails.title}
          description={howToStartDetails.description}
        >
          <HowToStart />
        </Section>

        {/* Tampilan Aplikasi */}
        <Section
          id="screenshots"
          title="Lihat Langsung Tampilannya"
          description="Antarmuka yang intuitif, cepat, dan nyaman — dari smartphone kasir hingga tablet di meja."
        >
          <AppScreenshots />
        </Section>

        {/* Testimoni */}
        <Section
          id="testimonials"
          title="Cocok untuk Bisnis Anda"
          description="Loka Kasir dirancang fleksibel — dari warung kecil hingga bisnis multi-outlet, semua bisa langsung pakai tanpa setup rumit."
        >
          <Testimonials />
        </Section>

        {/* Harga */}
        <Section
          id="pricing"
          title="Harga Transparan, Tanpa Kejutan"
          description="Mulai gratis 3 bulan pertama dengan akses penuh ke semua fitur Pro. Lanjutkan dengan paket yang paling sesuai — tidak ada biaya tersembunyi, tidak ada biaya per transaksi."
        >
          <Pricing />
        </Section>

        <CTA />

        <FAQ />

        {/* Loka Kasir adalah bagian dari Kreativita Sinergi */}
        <ParentCompany />
      </Container>
    </>
  );
};

export default HomePage;
