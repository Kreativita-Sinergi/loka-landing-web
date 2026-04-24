import React from "react";

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/Cta";
import Ecosystem from "@/components/Ecosystem";
import Pricing from "@/components/Pricing/Pricing";
import AppScreenshots from "@/components/AppScreenshots";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      <Stats />

      <Container>
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
          title="Satu Ekosistem, Dua Kekuatan"
          description="App Kasir di tangan kasir Anda, Web Admin di tangan pemilik bisnis. Keduanya terhubung real-time — tidak ada data yang tertinggal."
        >
          <Ecosystem />
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
          description="Mulai gratis 14 hari dengan akses penuh. Lanjutkan dengan paket yang paling sesuai — tidak ada biaya tersembunyi, tidak ada biaya per transaksi."
        >
          <Pricing />
        </Section>

        <CTA />

        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
