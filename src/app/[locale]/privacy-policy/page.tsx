import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { siteDetails } from '@/data/siteDetails';
import { getPrivacy, legalContact, permissionShape } from '@/data/privacyPolicy';
import { getLegalUi } from '@/data/site/legal';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { CheckItem, Container, PageHero } from '@/components/site/ui';
import LegalToc from '@/components/site/legal/LegalToc';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getPrivacy(locale as Locale);
  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/privacy-policy'),
  };
}

const linkCls = 'font-medium text-brand hover:underline';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-3.5 md:scroll-mt-28 md:gap-4">
      <h2 className="text-[22px] leading-snug font-bold md:text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((x, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-body md:text-base">
          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-mute" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const copy = getPrivacy(locale);
  const ui = getLegalUi(locale);
  const l = siteLinks(locale);

  const toc = [
    { id: 'tentang', label: ui.aboutPolicy },
    { id: 'izin', label: copy.permissionsHeading },
    { id: 'data', label: copy.otherDataHeading },
    { id: 'pihak-ketiga', label: copy.processorsHeading },
    { id: 'retensi', label: copy.retentionHeading },
    { id: 'perlindungan', label: copy.protectionHeading },
    { id: 'hak', label: copy.rightsHeading },
    { id: 'kontak', label: copy.contactHeading },
  ];

  const para = 'text-[15px] leading-[1.7] text-body md:text-base';

  return (
    <>
      <PageHero crumbs={[{ label: ui.home, href: l.home }, { label: copy.title }]} title={copy.title} desc={copy.lastUpdated} />

      <section className="py-8 md:py-14">
        <Container className="flex flex-col gap-8 lg:grid lg:grid-cols-[260px_minmax(0,760px)] lg:items-start lg:gap-20">
          <aside className="lg:self-stretch">
            <LegalToc items={toc} title={ui.toc} />
          </aside>

          <div className="flex min-w-0 flex-col gap-10">
            <Section id="tentang" title={ui.aboutPolicy}>
              <p className={para}>{copy.intro}</p>
              <p className={para}>
                {copy.scopeLead}
                <a href={siteDetails.dashboardUrl} className={linkCls}>{siteDetails.dashboardUrl.replace('https://', '')}</a>
                {copy.scopeTail}
              </p>
            </Section>

            {/* Penanda wajib/opsional dari `permissionShape`: fakta produk, sama di semua bahasa. */}
            <Section id="izin" title={copy.permissionsHeading}>
              <div className="flex flex-col gap-3">
                {copy.permissions.map((p, i) => {
                  const optional = permissionShape[i]?.optional;
                  return (
                    <div key={p.name} className="flex flex-col gap-2.5 rounded-xl border border-line p-4 md:p-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-bold">{p.name}</h3>
                        <span className={clsx('rounded-md px-2 py-0.5 text-xs font-bold', optional ? 'bg-soft text-body' : 'bg-danger-soft text-danger')}>
                          {optional ? copy.labelOptional : copy.labelRequired}
                        </span>
                      </div>
                      <p className="font-mono text-xs break-words text-mute">{p.technicalId}</p>
                      <p className="text-sm text-body"><span className="font-semibold text-ink">{copy.labelPlatforms}</span>{p.platforms}</p>
                      <p className="text-sm leading-relaxed text-body"><span className="font-semibold text-ink">{copy.labelWhy}</span>{p.why}</p>
                      <p className="text-sm leading-relaxed text-body"><span className="font-semibold text-ink">{copy.labelData}</span>{p.dataCollected}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="data" title={copy.otherDataHeading}>
              <Bullets items={copy.otherData.map(d => <><strong className="font-semibold text-ink">{d.label}</strong> {d.body}</>)} />
            </Section>

            <Section id="pihak-ketiga" title={copy.processorsHeading}>
              <p className={para}>{copy.processorsLead}</p>
              <Bullets items={copy.processors.map(d => <><strong className="font-semibold text-ink">{d.label}</strong> {d.body}</>)} />
            </Section>

            <Section id="retensi" title={copy.retentionHeading}>
              <Bullets
                items={[
                  copy.retentionActive,
                  <>
                    {copy.retentionDeleteLead}
                    <Link href={l.hapusAkun} className={linkCls}>{copy.retentionDeleteLink}</Link>
                    {copy.retentionDeleteTail}
                  </>,
                  copy.retentionToken,
                  copy.retentionLegal,
                ]}
              />
            </Section>

            <Section id="perlindungan" title={copy.protectionHeading}>
              <ul className="flex flex-col gap-2.5 text-[15px] text-body md:text-base">
                {copy.protection.map(line => <CheckItem key={line} tone="ok">{line}</CheckItem>)}
              </ul>
            </Section>

            <Section id="hak" title={copy.rightsHeading}>
              <p className={para}>{copy.rightsLead}</p>
              <Bullets items={copy.rightsPlatforms.map(d => <><strong className="font-semibold text-ink">{d.label}</strong> {d.body}</>)} />
              <p className={para}>
                {copy.rightsContactLead}
                <a href={`mailto:${legalContact.email}`} className={linkCls}>{legalContact.email}</a>.
              </p>
            </Section>

            <Section id="kontak" title={copy.contactHeading}>
              <Bullets
                items={[
                  <><strong className="font-semibold text-ink">{copy.contactEmail}</strong> <a href={`mailto:${legalContact.email}`} className={linkCls}>{legalContact.email}</a></>,
                  <><strong className="font-semibold text-ink">{copy.contactPhone}</strong> <a href={`https://wa.me/${legalContact.whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkCls}>{locale === 'id' ? legalContact.phone : legalContact.phoneIntl}</a> (WhatsApp)</>,
                  <><strong className="font-semibold text-ink">{copy.contactDeveloper}</strong> {legalContact.developer}</>,
                  legalContact.address,
                ]}
              />
              <p className="pt-4 text-xs text-mute">© {new Date().getFullYear()} Loka Kasir — {legalContact.developer}. {copy.copyright}</p>
            </Section>
          </div>
        </Container>
      </section>
    </>
  );
}
