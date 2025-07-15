import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Section
          id="features"
          title="Fitur Unggulan"
          description="Dirancang untuk mendukung operasional bisnis Anda dengan cepat, efisien, dan mudah digunakan."
        >
          <Benefits />
        </Section>
        <Section
          id="pricing"
          title="Paket Harga"
          description="Harga transparan dan terjangkau, tanpa biaya tersembunyi."
        >
          <Pricing />
        </Section>
        <Section
          id="testimonials"
          title="Apa Kata Mereka"
          description="Testimoni dari para pelaku bisnis yang telah menggunakan Loka POS."
        >
          <Testimonials />
        </Section>
        <FAQ />
        {/* <Stats /> */}
        {/* <CTA /> */}
      </Container>
    </>
  );
};

export default HomePage;
