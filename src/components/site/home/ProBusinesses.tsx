import { cache, type ReactNode } from 'react';
import { ArrowDownRight } from 'lucide-react';

import type { Locale } from '@/data/localized';
import { getProBusinessesCopy } from '@/data/site/proBusinesses';
import { fetchProBusinesses } from '@/lib/proBusinesses';
import { Container, Eyebrow } from '@/components/site/ui';
import ProBusinessList from './ProBusinessList';

const getSubscribers = cache(fetchProBusinesses);

export async function ProBusinessProof({ locale, fallback }: { locale: Locale; fallback: ReactNode }) {
  const businesses = await getSubscribers();
  if (!businesses.length) return fallback;
  const copy = getProBusinessesCopy(locale, businesses.length);

  return (
    <a href="#pelanggan" aria-label={`${copy.title}. ${copy.more}`} className="group inline-flex min-h-11 items-center gap-2.5 rounded-full border border-brand/25 bg-white py-1 pr-3 pl-1 text-sm font-semibold text-brand-dark hover:border-brand">
      <span className="rounded-full bg-brand px-2.5 py-1 text-lg leading-tight font-extrabold text-white tabular-nums">{copy.number}</span>
      <span className="leading-snug group-hover:underline">{copy.label}</span>
      <ArrowDownRight size={16} aria-hidden className="shrink-0" />
    </a>
  );
}

export default async function ProBusinesses({ locale }: { locale: Locale }) {
  const businesses = await getSubscribers();
  if (!businesses.length) return null;
  const copy = getProBusinessesCopy(locale, businesses.length);

  return (
    <section id="pelanggan" aria-labelledby="pelanggan-title" className="border-y border-brand/15 bg-gradient-to-br from-tint via-white to-soft py-8 md:py-10">
      <Container className="flex flex-col gap-5">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="pelanggan-title" aria-label={copy.title} className="mt-2 flex items-center gap-3 md:gap-4">
            <span className="text-5xl leading-none font-extrabold tracking-[-0.06em] text-brand tabular-nums md:text-7xl">{copy.number}</span>
            <span className="max-w-[22ch] text-lg leading-tight font-bold text-ink md:text-3xl">{copy.label}</span>
          </h2>
        </div>
        <ProBusinessList businesses={businesses} more={copy.more} less={copy.less} />
      </Container>
    </section>
  );
}
