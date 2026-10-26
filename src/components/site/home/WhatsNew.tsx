import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight, Bike, Dices, Flame, FlaskConical, Landmark, NotebookPen, PackagePlus, PlayCircle, Radar, Ruler, Scissors, Star, Wallet, type LucideIcon } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';
import { Container, IconTile, ProBadge, SectionHeading } from '@/components/site/ui';
import { Reveal, RevealGroup, RevealItem } from '@/components/site/motion/Reveal';

type Copy = HomeCopy['whatsNew'];

const ICONS: Record<string, LucideIcon> = {
  radar: Radar,
  lab: FlaskConical,
  star: Star,
  tax: Landmark,
  flame: Flame,
  wallet: Wallet,
  package: PackagePlus,
  ruler: Ruler,
  notebook: NotebookPen,
  dices: Dices,
  scissors: Scissors,
  bike: Bike,
};

const TIP_TONES: Record<string, string> = {
  Tambah: 'bg-ok/15 text-[#4ade80]',
  Peluang: 'bg-brand/30 text-[#93b8ff]',
  Benahi: 'bg-accent/20 text-accent',
};

/** Kartu Rapor Toko tiruan (HTML, bukan screenshot) supaya tajam dan ringan. */
function ReportCard({ report }: { report: Copy['report'] }) {
  const r = 54;
  const len = 2 * Math.PI * r;
  const score = parseInt(report.score, 10) || 0;
  return (
    <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[24px] bg-[#0B1B3F] p-5 text-white shadow-[0_40px_80px_-24px_rgba(13,40,110,0.45)] md:p-8">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative flex flex-col gap-2">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white/70 uppercase"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{report.label}<span className="ml-1 rounded-md bg-white/10 px-2 py-0.5 font-sans text-[11px] font-bold tracking-normal text-white normal-case">Pro</span></span>
        <h3 className="text-xl leading-snug font-bold md:text-2xl">{report.title}</h3>
      </div>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
          <div className="relative h-[120px] w-[120px] shrink-0">
            <svg viewBox="0 0 128 128" className="h-full w-full" aria-hidden>
              <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle cx="64" cy="64" r={r} fill="none" stroke="#0D5DF3" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(len * score) / 100} ${len}`} transform="rotate(-90 64 64)" />
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[44px] leading-none font-extrabold text-white">{report.grade}</span>
              <span className="mt-1 text-xs font-semibold text-white/70">{report.score}</span>
            </span>
          </div>
          <span className="rounded-full bg-ok/20 px-3 py-1 text-xs font-semibold text-[#4ade80]">▲ {report.trend}</span>
        </div>
        <ul className="flex flex-1 flex-col gap-2.5">
          {report.pillars.map(p => (
            <li key={p.name} className="flex flex-col gap-1">
              <span className="flex justify-between text-[13px] font-semibold text-white/80"><span>{p.name}</span><span className={p.value < 70 ? 'text-accent' : 'text-white'}>{p.value}</span></span>
              <span className="h-2 rounded-full bg-white/10"><span className={clsx('block h-full rounded-full', p.value < 70 ? 'bg-accent' : 'bg-brand')} style={{ width: `${p.value}%` }} /></span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="relative flex flex-col gap-2">
        {report.tips.map(t => (
          <li key={t.text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
            <span className={clsx('w-[74px] shrink-0 rounded-md py-1 text-center text-[10.5px] font-extrabold tracking-[0.06em] uppercase', TIP_TONES[t.tag])}>{t.tag}</span>
            <span className="text-[13px] leading-snug font-medium text-white/90 md:text-sm">{t.text}</span>
          </li>
        ))}
      </ul>
      <p className="relative mt-auto text-[11px] text-white/50">{report.note}</p>
    </div>
  );
}

export default function WhatsNew({ copy }: { copy: Copy }) {
  return (
    <section id="yang-baru" className="scroll-mt-28 py-14 md:py-24">
      <Container className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <Reveal variant="left"><SectionHeading eyebrow={copy.eyebrow} title={copy.title} titleClassName="md:max-w-[680px]" /></Reveal>
          <Reveal variant="right" delay={0.1} className="flex max-w-[420px] flex-col gap-3">
            <p className="text-base leading-relaxed text-body">{copy.desc}</p>
            <a href="#video-fitur" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"><PlayCircle size={18} aria-hidden />{copy.video}</a>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          <Reveal variant="clip" className="h-full"><ReportCard report={copy.report} /></Reveal>
          <RevealGroup variant="scale" stagger={0.08} className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {copy.insights.map(it => {
              const Icon = ICONS[it.icon];
              return (
                <RevealItem key={it.title} className="spotlight flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-5 hover:shadow-[0_24px_48px_-16px_rgba(16,24,40,0.16)] lg:p-6">
                  <span className="flex items-center justify-between">
                    <IconTile>{Icon && <Icon size={22} aria-hidden />}</IconTile>
                    <ProBadge />
                  </span>
                  <h3 className="text-[17px] font-bold">{it.title}</h3>
                  <p className="text-sm leading-relaxed text-body">{it.desc}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <div className="flex flex-col gap-5">
          <Reveal><h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">{copy.moreTitle}</h3></Reveal>
          <RevealGroup as="ul" variant="up" stagger={0.05} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.more.map(it => {
              const Icon = ICONS[it.icon];
              return (
                <RevealItem as="li" key={it.title} className="flex h-full gap-3.5 rounded-2xl border border-line bg-soft p-4">
                  <IconTile size="sm">{Icon && <Icon size={19} aria-hidden />}</IconTile>
                  <span className="flex flex-col gap-1">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] leading-snug font-bold">
                      {it.title}
                      {'pro' in it && it.pro && <ProBadge />}
                    </span>
                    <span className="text-[13px] leading-relaxed text-body">{it.desc}</span>
                    <span className="mt-1 text-[11px] font-semibold tracking-wide text-mute">Sejak versi {it.version}</span>
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
          <Link href="#video-fitur" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline">{copy.video} <ArrowRight size={15} aria-hidden /></Link>
        </div>
      </Container>
    </section>
  );
}
