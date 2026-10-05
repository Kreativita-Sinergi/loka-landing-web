import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TriangleAlert } from 'lucide-react';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { siteLinks } from '@/data/site/links';
import { getSyaratCopy } from '@/data/site/syarat';
import { alternatesFor } from '@/lib/hreflang';
import { Container, PageHero } from '@/components/site/ui';
import LegalToc from '@/components/site/legal/LegalToc';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getSyaratCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/syarat-ketentuan'),
  };
}

export default async function SyaratPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getSyaratCopy(locale);
  const l = siteLinks(locale);

  return (
    <>
      <PageHero crumbs={[{ label: c.crumbHome, href: l.home }, { label: c.title }]} title={c.title} desc={c.effective}>
        {c.isDraft && (
          <p className="flex items-start gap-2.5 self-start rounded-[10px] bg-warn-soft px-4 py-3 text-[13px] font-semibold text-[#8a5a0b] md:text-sm">
            <TriangleAlert size={18} className="mt-px shrink-0 text-[#b7791f]" aria-hidden />
            {c.draftNote}
          </p>
        )}
      </PageHero>

      <section className="py-7 md:py-14">
        <Container className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-20">
          <LegalToc title={c.tocLabel} items={c.sections.map((s, i) => ({ id: s.id, label: `${i + 1}. ${s.title}` }))} />
          <div className="flex max-w-[760px] flex-col gap-7 md:gap-10">
            {c.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="flex scroll-mt-28 flex-col gap-2.5 md:gap-3.5">
                <h2 className="text-xl font-bold md:text-2xl">{i + 1}. {s.title}</h2>
                {s.kind === 'p' ? (
                  <p className="text-[15px] leading-[1.6] text-body md:text-base md:leading-[1.7]">{s.body}</p>
                ) : (
                  <ul className="flex flex-col gap-2 text-[15px] leading-[1.55] text-body md:text-base md:leading-[1.65]">
                    {s.items.map(it => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span aria-hidden className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-mute" />
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
