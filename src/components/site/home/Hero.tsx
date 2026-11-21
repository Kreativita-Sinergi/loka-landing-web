import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';

import type { HomeCopy } from '@/data/site/home';
import { companionProducts } from '@/data/site/products';
import { ButtonLink, Container, Eyebrow } from '@/components/site/ui';

export default function Hero({ copy, register, harga }: { copy: HomeCopy['hero']; register: string; harga: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-soft pt-10 pb-8 md:py-12">
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="flex flex-col items-start gap-5 md:gap-6">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h1 className="text-[clamp(30px,10vw,40px)] leading-[1.08] font-bold tracking-[-0.045em] sm:text-6xl xl:text-[68px]">
              {copy.titleA}{' '}
              <span className="relative block w-fit text-brand">
                {copy.titleB}
                <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-[0.32em] w-full text-accent">
                  <path d="M3 15 C 80 4, 200 2, 297 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="max-w-[510px] leading-relaxed text-body md:text-lg">{copy.desc}</p>
            <div className="flex w-full flex-col gap-2.5 sm:flex-row">
              <ButtonLink href={register} size="lg">{copy.primary}</ButtonLink>
              <ButtonLink href="#demo-kasir" tone="secondary" size="lg" icon={<Play size={16} aria-hidden />}>{copy.secondary}</ButtonLink>
            </div>
            <p className="text-sm leading-relaxed text-body">
              {copy.trialNote}{' '}
              <Link href={harga} className="inline-flex items-center gap-1 font-semibold text-brand hover:underline">{copy.pricing} <ArrowRight size={14} aria-hidden /></Link>
            </p>
            <nav id="produk-lain" aria-labelledby="produk-lain-title" className="w-full max-w-[510px] rounded-xl border border-brand/10 bg-tint/80 px-3 py-2.5 sm:px-4">
              <h2 id="produk-lain-title" className="text-[11px] font-bold tracking-[0.1em] text-body uppercase">{copy.productsLabel}</h2>
              <ul className="mt-1 grid grid-cols-3">
                {companionProducts.map(product => (
                  <li key={product.key} id={`loka-kasir-${product.key}`}>
                    <a href={product.url} className="group flex min-h-11 flex-col justify-center rounded-md">
                      <span className="flex items-center gap-1 text-[13px] font-bold text-brand group-hover:underline sm:text-sm">
                        {product.shortName}<ArrowUpRight size={13} aria-hidden className="hidden sm:block" />
                      </span>
                      <span className="text-xs text-body">{product.use}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Image src="/images/site/hero-perangkat.webp" alt={copy.imageAlt} width={1400} height={1344} sizes="(min-width: 520px) 480px, calc(100vw - 40px)" fetchPriority="high" loading="eager" className="mx-auto h-auto w-full max-w-[480px] mix-blend-multiply" />
        </div>
        <dl className="mt-8 grid gap-5 border-t border-line pt-6 md:mt-10 md:grid-cols-3 md:gap-8">
          {copy.benefits.map((benefit, index) => (
            <div key={benefit.title} className="relative pl-9">
              <dt className="font-bold">
                <span aria-hidden className="absolute left-0 pt-1 font-mono text-xs text-brand">0{index + 1}</span>
                {benefit.title}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-body">{benefit.desc}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
