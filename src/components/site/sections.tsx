import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ChartColumn, Download, Globe, HeartHandshake, Package, Quote, ShoppingCart, TriangleAlert, Users, Utensils } from 'lucide-react';
import { FaAndroid, FaGooglePlay, FaWindows } from 'react-icons/fa';
import type { ReactNode } from 'react';

import { siteLinks } from '@/data/site/links';
import { getDownloadOptions, TESTIMONIALS_ARE_DUMMY, testimonials, type DownloadOption, type FeatureCategory } from '@/data/site/shared';
import { getFaqs } from '@/data/faq';
import type { Locale } from '@/data/localized';
import { ButtonLink, Container, IconTile, SectionHeading, WhatsAppIcon } from './ui';
import { Magnetic } from './motion/Interactive';
import { RevealGroup, RevealItem } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import { Parallax } from './motion/Velocity';

export const featureIcon = (name: FeatureCategory['icon'], size = 22): ReactNode =>
  ({
    cart: <ShoppingCart size={size} />,
    utensils: <Utensils size={size} />,
    package: <Package size={size} />,
    users: <Users size={size} />,
    heart: <HeartHandshake size={size} />,
    chart: <ChartColumn size={size} />,
  })[name];

const downloadIcon = (key: DownloadOption['key'], size = 30) =>
  key === 'play' ? <FaGooglePlay size={size - 4} /> : key === 'windows' ? <FaWindows size={size - 4} /> : <FaAndroid size={size} />;

/** Tiga kartu unduhan: Google Play, Windows, APK. */
export function DownloadCards({ locale, bordered }: { locale: Locale; bordered?: boolean }) {
  const l = siteLinks(locale);
  const hrefs = { play: l.playStore, windows: l.downloadWindows, apk: l.downloadAndroid };
  return (
    <RevealGroup variant="flip" stagger={0.12} className="grid gap-4 md:grid-cols-3 md:gap-6">
      {getDownloadOptions().map(d => (
        <RevealItem key={d.key} className={clsx('spotlight group/dl flex flex-col gap-5 rounded-2xl bg-white p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] md:rounded-[20px] md:p-8', bordered && 'border border-line')}>
          <span className="inline-flex origin-bottom transition-transform duration-500 group-hover/dl:-translate-y-1 group-hover/dl:rotate-[-8deg]"><IconTile size="lg">{downloadIcon(d.key)}</IconTile></span>
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-bold">{d.title}</h3>
            <p className="text-[15px] leading-relaxed text-body">{d.desc}</p>
          </div>
          <ul className="flex flex-col gap-2.5 text-sm">
            {d.specs.map(s => (
              <li key={s} className="flex items-center gap-2.5">
                <span className="text-ok">✓</span>
                {s}
              </li>
            ))}
          </ul>
          <ButtonLink href={hrefs[d.key]} tone={d.primary ? 'primary' : 'secondary'} block icon={<Download size={18} className="transition-transform duration-300 group-hover/dl:translate-y-0.5" />} className="mt-auto">
            {d.cta}
          </ButtonLink>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export function DownloadSection({ locale, copy }: { locale: Locale; copy: { eyebrow: string; title: string; desc: string; owner: string; ownerLink: string } }) {
  const l = siteLinks(locale);
  return (
    <section id="download" className="relative isolate overflow-hidden bg-brand py-14 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-aurora absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_65%)]" />
        <div className="hero-aurora absolute -right-24 -bottom-48 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.28),transparent_65%)] [animation-delay:-5s]" />
      </div>
      <Container className="flex flex-col gap-8 md:items-center md:gap-12">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} desc={copy.desc} align="center" light className="md:items-center" />
        <DownloadCards locale={locale} />
        <p className="flex flex-wrap items-center gap-2 text-sm text-[#dce7ff] md:text-[15px]">
          <Globe size={18} className="text-white" />
          {copy.owner}
          <Link href={l.webAdmin} className="font-semibold text-white hover:underline">{copy.ownerLink}</Link>
        </p>
      </Container>
    </section>
  );
}

/** FAQ ringkas berbentuk akordion. Jawaban diambil dari data FAQ asli. */
export function FaqList({ locale, questions, openFirst = true }: { locale: Locale; questions?: string[]; openFirst?: boolean }) {
  const all = getFaqs(locale);
  // Pertanyaan pilihan ditulis dalam bahasa Indonesia; bahasa yang belum punya
  // padanannya jatuh ke jawaban Indonesia, bukan blok kosong.
  const fallback = getFaqs('id');
  const list = questions
    ? (questions.map(q => all.find(f => f.question === q) ?? fallback.find(f => f.question === q)).filter(Boolean) as typeof all)
    : all.slice(0, 6);
  return (
    <div className="border-t border-line">
      {list.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0} className="faq group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-base font-semibold transition-colors hover:text-brand md:text-[17px] [&::-webkit-details-marker]:hidden">
            <span className="transition-transform duration-300 group-hover:translate-x-1">{f.question}</span>
            <span aria-hidden className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-lg leading-none text-ink transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-[135deg] group-open:border-brand group-open:bg-brand group-open:text-white">+</span>
          </summary>
          <div className="faq-a pb-5 text-[15px] leading-[1.7] whitespace-pre-line text-body">{f.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ locale, photo }: { locale: Locale; photo?: boolean }) {
  const l = siteLinks(locale);
  return (
    <section className="py-10 md:py-24">
      <Container>
        <div className="relative isolate flex flex-col overflow-hidden rounded-[20px] bg-ink md:flex-row md:items-stretch md:rounded-[28px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-aurora absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(13,93,243,0.45),transparent_65%)]" />
            <div className="hero-aurora absolute -bottom-40 left-[40%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.18),transparent_65%)] [animation-delay:-8s]" />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:gap-5 md:py-14 md:pl-16">
            <h2 className="text-2xl font-bold text-white md:text-[40px] md:leading-tight"><SplitReveal text={photo ? 'Mulai jualan lebih rapi hari ini' : 'Siap mencoba Loka Kasir?'} /></h2>
            <p className="text-[15px] text-[#c9cbd1] md:text-[17px]">Gratis 30 hari untuk semua fitur Pro. Tidak ada komitmen.</p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Magnetic><ButtonLink href={l.register} tone="accent" size="lg" className="hero-cta relative w-full overflow-hidden sm:w-auto">Coba Gratis 30 Hari</ButtonLink></Magnetic>
              <Magnetic strength={0.18}><ButtonLink href={l.whatsapp('Halo tim Loka, saya mau tanya tentang Loka Kasir.')} tone="ghostDark" size="lg" icon={<WhatsAppIcon />} className="w-full sm:w-auto">Chat WhatsApp</ButtonLink></Magnetic>
            </div>
          </div>
          {photo && (
            <div className="relative hidden w-[480px] shrink-0 overflow-hidden md:block">
              <Parallax speed={0.12} className="absolute inset-[-12%_0]">
                <Image src="/images/site/foto-toko.webp" alt="Pemilik toko buah tersenyum di kiosnya" fill sizes="480px" className="object-cover" />
              </Parallax>
              <div aria-hidden className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * Testimoni. Selama datanya dummy, section ini hanya tampil di development
 * supaya testimoni palsu tidak pernah ikut terbit.
 */
export function Testimonials() {
  if (TESTIMONIALS_ARE_DUMMY && process.env.NODE_ENV === 'production') return null;
  return (
    <section className="bg-soft py-14 md:py-24">
      <Container className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Pelanggan" title="Kata pemilik usaha yang sudah pakai Loka" titleClassName="md:max-w-[640px]" />
          {TESTIMONIALS_ARE_DUMMY && (
            <p className="flex items-center gap-2 self-start rounded-lg bg-warn-soft px-3 py-2 text-[13px] font-semibold text-[#8a5a0b]">
              <TriangleAlert size={16} className="text-[#b7791f]" />
              Data dummy, ganti dengan testimoni asli sebelum rilis
            </p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map(t => (
            <figure key={t.name} className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 md:p-7">
              <Quote size={28} className="text-brand" />
              <blockquote className="text-base leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3.5">
                {t.logo ? (
                  <Image src={t.logo} alt={`Logo ${t.business}`} width={48} height={48} className="h-12 w-12 shrink-0 rounded-full border border-line bg-white object-contain" />
                ) : (
                  <span aria-hidden className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-lg font-bold text-brand">{t.name.charAt(0)}</span>
                )}
                <span className="flex flex-col">
                  <span className="text-[15px] font-bold">{t.name}</span>
                  <span className="text-[13px] text-body">{t.business}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
