import type { Locale } from '@/data/localized';
import { getProBusinessesCopy } from '@/data/site/proBusinesses';
import type { ProBusiness } from '@/lib/proBusinesses';
import { Container, SectionHeading } from '@/components/site/ui';
import ProBusinessCard from './ProBusinessCard';

export default function ProBusinesses({ businesses, locale }: { businesses: ProBusiness[]; locale: Locale }) {
  if (!businesses.length) return null;
  const copy = getProBusinessesCopy(locale);
  const featured = businesses.slice(0, 12);
  const remaining = businesses.slice(12);
  const gridClass = 'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4';

  return (
    <section id="pelanggan" aria-label={copy.title} className="scroll-mt-28 pb-14 md:pb-[88px]">
      <Container>
        <div className="rounded-3xl bg-soft px-4 py-8 md:px-9 md:py-12">
          <div className="mx-auto mb-6 max-w-[640px] text-center md:mb-8">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" titleClassName="text-2xl md:text-[32px]" />
            <p className="mt-3 text-sm leading-relaxed text-body">{copy.desc}</p>
          </div>
          <ul className={gridClass}>
            {featured.map((business, index) => <ProBusinessCard key={`${business.name}-${index}`} business={business} />)}
          </ul>
          {remaining.length > 0 && (
            <details className="group mt-3">
              <summary className="mx-auto w-fit cursor-pointer rounded-lg px-4 py-3 text-sm font-semibold text-brand hover:text-brand-dark marker:text-brand">
                {copy.more} <span className="tabular-nums">({businesses.length})</span>
              </summary>
              <ul className={`${gridClass} mt-3`}>
                {remaining.map((business, index) => <ProBusinessCard key={`${business.name}-${index}`} business={business} />)}
              </ul>
            </details>
          )}
        </div>
      </Container>
    </section>
  );
}
