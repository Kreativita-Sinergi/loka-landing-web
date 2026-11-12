import type { Locale } from '@/data/localized';
import { getProBusinessesCopy } from '@/data/site/proBusinesses';
import type { ProBusiness } from '@/lib/proBusinesses';
import { Container, SectionHeading } from '@/components/site/ui';
import ProBusinessList from './ProBusinessList';

export default function ProBusinesses({ businesses, locale }: { businesses: ProBusiness[]; locale: Locale }) {
  if (!businesses.length) return null;
  const copy = getProBusinessesCopy(locale);

  return (
    <section id="pelanggan" aria-label={copy.title} className="scroll-mt-28 pb-14 md:pb-[88px]">
      <Container>
        <div className="rounded-3xl bg-soft px-4 py-8 md:px-9 md:py-12">
          <div className="mx-auto mb-6 max-w-[640px] text-center md:mb-8">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" titleClassName="text-2xl md:text-[32px]" />
            <p className="mt-3 text-sm leading-relaxed text-body">{copy.desc}</p>
          </div>
          <ProBusinessList businesses={businesses} more={copy.more} less={copy.less} />
        </div>
      </Container>
    </section>
  );
}
