import React from "react";

import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/Cta";
import Ecosystem from "@/components/Ecosystem";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Section
          id="features"
          title="Fitur Unggulan"
          description="Aplikasi Kasir yang dirancang khusus untuk kecepatan dan kemudahan operasional toko Anda."
        >
          <Benefits />
        </Section>

        <Section
          id="ecosystem"
          title="Satu Ekosistem, Dua Kekuatan"
          description="Loka menghubungkan operasional di toko dengan manajemen di kantor secara real-time."
        >
          <Ecosystem />
        </Section>
      
        <CTA />
   
        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;
