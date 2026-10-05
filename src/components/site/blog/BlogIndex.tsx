'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

import type { BlogCategory, BlogPost } from '@/data/site/blog';
import { Container, PageHero } from '@/components/site/ui';
import { PostCard, PostMeta } from './PostCard';

type Copy = { all: string; readMore: string; latest: string; empty: string };

/**
 * Daftar artikel dengan filter kategori. Hanya menerima artikel yang sudah
 * terbit; kategori tanpa artikel tidak ditampilkan sebagai pilihan.
 */
export default function BlogIndex({ hero, posts, categories, basePath, copy, readTimes }: { hero: { crumbs: { label: string; href?: string }[]; title: string; desc: string }; posts: BlogPost[]; categories: BlogCategory[]; basePath: string; copy: Copy; readTimes: Record<string, string> }) {
  const [active, setActive] = useState<BlogCategory | null>(null);
  const shown = active ? posts.filter(p => p.category === active) : posts;
  const [featured, ...rest] = shown;
  const href = (p: BlogPost) => `${basePath}/${p.slug}`;

  return (
    <>
      <PageHero crumbs={hero.crumbs} title={hero.title} desc={hero.desc}>
        {categories.length > 0 && (
          <div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pt-1 [scrollbar-width:none] md:pt-2" role="group" aria-label="Kategori">
            {[null, ...categories].map(cat => (
              <button
                key={cat ?? 'all'}
                type="button"
                aria-pressed={active === cat}
                onClick={() => setActive(cat)}
                className={clsx('shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors', active === cat ? 'bg-ink text-white' : 'border border-line bg-white text-ink hover:border-[#cdd2dc]')}
              >
                {cat ?? copy.all}
              </button>
            ))}
          </div>
        )}
      </PageHero>

      {featured && (
        <section className="bg-white pt-7 md:pt-16">
          <Container>
            <Link href={href(featured)} className="group flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-12">
              <Image src={featured.image} alt={featured.imageAlt} width={1280} height={800} priority sizes="(min-width: 1024px) 640px, 100vw" className="h-[210px] w-full rounded-2xl object-cover md:h-[400px] md:rounded-[20px] lg:w-[640px] lg:shrink-0" />
              <span className="flex flex-col gap-3 md:gap-4">
                <PostMeta post={featured} readTime={readTimes[featured.slug]} />
                <span className="text-2xl leading-tight font-bold tracking-[-0.015em] group-hover:text-brand md:text-[34px]">{featured.title}</span>
                <span className="text-[15px] leading-relaxed text-body md:text-[17px]">{featured.excerpt}</span>
                <span className="hidden text-[15px] font-semibold text-brand md:inline">{copy.readMore} →</span>
              </span>
            </Link>
          </Container>
        </section>
      )}

      <section className="py-10 md:py-[72px]">
        <Container className="flex flex-col gap-5 md:gap-8">
          <h2 className="text-xl font-bold md:text-2xl">{copy.latest}</h2>
          {rest.length > 0 ? (
            <ul className="grid gap-4 divide-y divide-line md:grid-cols-3 md:gap-x-6 md:gap-y-12 md:divide-y-0">
              {rest.map(p => (
                <li key={p.slug} className="pt-4 first:pt-0 md:pt-0"><PostCard post={p} href={href(p)} readTime={readTimes[p.slug]} /></li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-[15px] text-body">{copy.empty}</p>
          )}
        </Container>
      </section>
    </>
  );
}
