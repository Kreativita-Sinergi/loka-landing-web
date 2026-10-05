import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { ArrowRight, Boxes, ChartColumn, Check, CircleCheck, ExternalLink, HeartHandshake, Monitor, Store, TabletSmartphone, Tag, Users } from 'lucide-react';

import { siteDetails } from '@/data/siteDetails';
import { getSignUp } from '@/data/cta';
import { getWebAdmin, getWebAdminGroups, getWebAdminPage, type WebAdminGroup } from '@/data/webAdmin';
import { getWebAdminSiteCopy } from '@/data/site/webAdminPage';
import { siteLinks } from '@/data/site/links';
import { LOCALES, type Locale } from '@/data/localized';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, Container, IconTile, PageHero, ProBadge, SectionHeading } from '@/components/site/ui';
import { CtaBand } from '@/components/site/sections';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const copy = getWebAdminPage(locale as Locale);
  return {
    title: `${copy.metaTitle} | ${siteDetails.siteName}`,
    description: copy.metaDescription,
    alternates: alternatesFor(locale as Locale, '/web-admin'),
  };
}

const ICONS: Record<WebAdminGroup['icon'], React.ElementType> = {
  chart: ChartColumn,
  box: Boxes,
  tag: Tag,
  users: Users,
  heart: HeartHandshake,
  store: Store,
};

export default async function WebAdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;

  const page = getWebAdminPage(locale);
  const details = getWebAdmin(locale);
  const groups = getWebAdminGroups(locale);
  const signUp = getSignUp(locale);
  const c = getWebAdminSiteCopy(locale);
  const l = siteLinks(locale);

  return (
    <>
      <PageHero crumbs={[{ label: c.home, href: l.home }, { label: 'Web Admin' }]} title={details.title} desc={details.description}>
        <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:gap-3">
          <ButtonLink href={details.url} icon={<ExternalLink size={18} />}>{page.openButton}</ButtonLink>
          <ButtonLink href={signUp.url} tone="secondary">{signUp.label}</ButtonLink>
        </div>
        <p className="max-w-[720px] text-[13px] leading-relaxed text-body md:text-sm">{page.signUpNote}</p>
      </PageHero>

      {/* Dua aplikasi, satu akun */}
      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-8">
          <SectionHeading title={c.compareTitle} />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {page.roles.map((role, i) => {
              const dark = i === 1;
              const Icon = dark ? Monitor : TabletSmartphone;
              return (
                <div key={role.title} className={clsx('flex flex-col gap-[18px] rounded-2xl p-6 md:rounded-[20px] md:p-9', dark ? 'bg-ink text-white' : 'border border-line bg-white')}>
                  <div className="flex items-center gap-3.5">
                    <IconTile tone={dark ? 'dark' : 'brand'}><Icon size={24} /></IconTile>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-lg font-bold md:text-xl">{role.title}</h3>
                      <p className={clsx('text-sm', dark ? 'text-[#b4b7bf]' : 'text-body')}>{role.who}</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3 text-[15px]">
                    {role.points.map(p => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Check size={18} className={clsx('mt-0.5 shrink-0', dark ? 'text-accent' : 'text-ok')} aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Yang bisa diatur dari Web Admin — grup & penanda Pro dari data/webAdmin.ts */}
      <section className="bg-soft py-14 md:py-20">
        <Container className="flex flex-col gap-6 md:gap-8">
          <SectionHeading
            title={c.gridTitle}
            desc={
              <>
                {page.featuresNoteLead}
                <ProBadge />
                {page.featuresNoteTail}
              </>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {groups.map(g => {
              const Icon = ICONS[g.icon];
              return (
                <div key={g.title} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-6 md:rounded-[18px] md:p-7">
                  <div className="flex items-center gap-3.5 md:flex-col md:items-start">
                    <IconTile><Icon size={22} /></IconTile>
                    <h3 className="text-lg font-bold">{g.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-body">{g.summary}</p>
                  <ul className="mt-1 flex flex-col gap-3 border-t border-line pt-4">
                    {g.features.map(f => (
                      <li key={f.name} className="flex flex-col gap-0.5">
                        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                          {f.name}
                          {f.plan === 'pro' && <ProBadge />}
                        </span>
                        <span className="text-[13px] leading-relaxed text-body">{f.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <ul className="flex flex-col gap-3 pt-2 text-[15px] md:flex-row md:flex-wrap md:gap-8">
            {c.points.map(p => (
              <li key={p} className="flex items-center gap-2"><CircleCheck size={18} className="shrink-0 text-ok" aria-hidden />{p}</li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
            <div className="flex flex-col gap-1">
              <p className="font-bold">{page.crossSellTitle}</p>
              <p className="text-sm leading-relaxed text-body">{page.crossSellBody}</p>
            </div>
            <Link href={l.download} className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-brand hover:underline">
              {c.downloadLink} <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
