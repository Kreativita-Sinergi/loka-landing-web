import type { Locale } from '@/data/localized';
import { getProBusinessesCopy } from '@/data/site/proBusinesses';
import { fetchProBusinesses } from '@/lib/proBusinesses';
import { Container, SectionHeading } from '@/components/site/ui';
import ProBusinessList from './ProBusinessList';

export default async function ProBusinesses({ locale }: { locale: Locale }) {
  const businesses = await fetchProBusinesses();
  if (!businesses.length) return null;
  const copy = getProBusinessesCopy(locale, businesses.length);

  return (
    <section id="pelanggan" aria-label={copy.title} className="border-y border-line bg-soft py-8 md:py-10">
      <Container className="flex flex-col gap-5">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} titleClassName="md:text-[32px]" />
        <ProBusinessList businesses={businesses} more={copy.more} less={copy.less} />
      </Container>
    </section>
  );
}
