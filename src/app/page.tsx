import React from "react";

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/Cta";
import Ecosystem from "@/components/Ecosystem";
import Pricing from "@/components/Pricing/Pricing";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      {/* Stats — fakta singkat untuk membangun kepercayaan */}
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

        {/* Harga */}
        <Section
          id="pricing"
          title="Harga Transparan, Tanpa Kejutan"
          description="Mulai gratis 30 hari dengan akses penuh. Lanjutkan dengan paket yang paling sesuai — tidak ada biaya tersembunyi, tidak ada biaya per transaksi."
        >
          <Pricing />
        </Section>

        {/* Testimoni */}
        <Section
          id="testimonials"
          title="Dipercaya Pelaku Bisnis di Indonesia"
          description="Lebih dari 100 outlet aktif dari berbagai jenis usaha sudah merasakan manfaat Loka Kasir setiap hari."
        >
          <Testimonials />
        </Section>

        <CTA />

        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
