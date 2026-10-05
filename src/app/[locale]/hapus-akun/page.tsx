import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, Trash2 } from 'lucide-react';

import { siteDetails } from '@/data/siteDetails';
import { getAccountDeletion } from '@/data/accountDeletion';
import { legalContact } from '@/data/privacyPolicy';
import { getLegalUi } from '@/data/site/legal';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, Container, PageHero, SectionHeading, WhatsAppIcon } from '@/components/site/ui';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getAccountDeletion(locale as Locale);
  return {
    title: `${copy.metaTitle} — ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/hapus-akun'),
  };
}

const DELETION_MAILTO = 'mailto:help@lokakasir.id?subject=Permintaan%20Hapus%20Akun%20Loka%20Kasir';

export default async function AccountDeletionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const copy = getAccountDeletion(locale);
  const ui = getLegalUi(locale);
  const l = siteLinks(locale);
  const phone = locale === 'id' ? legalContact.phone : legalContact.phoneIntl;

  return (
    <>
      <PageHero crumbs={[{ label: ui.home, href: l.home }, { label: copy.title }]} title={copy.title} desc={copy.intro}>
        <p className="text-sm text-body">{copy.lastUpdated}</p>
      </PageHero>

      {/* Langkah: hanya langkah pertama memuat tautan email (tail tidak kosong). */}
      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-7">
          <SectionHeading title={copy.stepsHeading} />
          <ol className="grid gap-4 md:grid-cols-3 md:gap-6">
            {copy.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-2xl border border-line p-6 md:rounded-[18px] md:p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[15px] font-bold text-white">{i + 1}</span>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-[15px] leading-relaxed text-body">
                  {step.lead}
                  {step.tail && (
                    <>
                      <a href={DELETION_MAILTO} className="font-medium text-brand hover:underline">{legalContact.email}</a>
                      {step.tail}
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-soft py-14 md:py-20">
        <Container className="grid gap-4 md:grid-cols-2 md:items-start md:gap-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 md:rounded-[18px] md:p-8">
            <h2 className="text-xl font-bold">{copy.deletedHeading}</h2>
            <p className="text-[15px] leading-relaxed text-body">{copy.deletedLead}</p>
            <ul className="flex flex-col gap-3">
              {copy.deleted.map(d => (
                <li key={d.label} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                  <Trash2 size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden />
                  <span><strong className="font-semibold">{d.label}</strong> <span className="text-body">{d.body}</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 md:rounded-[18px] md:p-8">
            <h2 className="text-xl font-bold">{copy.partialHeading}</h2>
            <p className="text-[15px] leading-relaxed text-body">{copy.partialBody}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-8">
          <SectionHeading title={copy.retentionHeading} />
          <ol className="flex flex-col">
            {copy.retention.map((line, i) => (
              <li key={line} className="flex flex-col gap-1.5 border-b border-line py-5 first:pt-0 last:border-b-0 md:flex-row md:gap-5">
                <span className="shrink-0 text-[15px] font-bold text-brand md:w-[200px] md:text-base">{ui.retentionLabels[i]}</span>
                <span className="text-[15px] leading-relaxed md:text-base">{line}</span>
              </li>
            ))}
          </ol>

          <div className="mt-2 flex flex-col gap-5 rounded-2xl bg-tint p-6 md:mt-6 md:flex-row md:items-center md:justify-between md:rounded-[20px] md:px-10 md:py-8">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[22px] font-bold">{copy.contactHeading}</h2>
              <p className="text-[15px] text-body md:text-base">{legalContact.email} · {phone}</p>
              <p className="text-[13px] leading-relaxed text-body">
                {copy.contactDeveloper} {legalContact.developer} · {legalContact.address}
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <ButtonLink href={DELETION_MAILTO} tone="secondary" icon={<Mail size={18} />}>{ui.sendEmail}</ButtonLink>
              <ButtonLink href={l.whatsapp(ui.whatsappMessage)} tone="whatsapp" icon={<WhatsAppIcon />}>{ui.whatsapp}</ButtonLink>
            </div>
          </div>
          <p className="text-xs text-mute">© {new Date().getFullYear()} Loka Kasir — {legalContact.developer}. {copy.rights}</p>
        </Container>
      </section>
    </>
  );
}
