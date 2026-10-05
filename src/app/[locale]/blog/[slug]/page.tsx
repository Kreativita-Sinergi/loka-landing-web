import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Lightbulb, PenLine } from 'lucide-react';

import { LOCALES, localePath, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { siteLinks } from '@/data/site/links';
import { formatPostDate, getBlogCopy, getPublishedPost, getPublishedPosts, type BlogBlock } from '@/data/site/blog';
import { alternatesFor } from '@/lib/hreflang';
import { Breadcrumb, Container } from '@/components/site/ui';
import { CtaBand } from '@/components/site/sections';
import { PostCard } from '@/components/site/blog/PostCard';
import ShareButtons from '@/components/site/blog/ShareButtons';

type Params = { params: Promise<{ locale: string; slug: string }> };

/** Hanya artikel yang sudah terbit yang punya halaman. */
export function generateStaticParams() {
  return LOCALES.flatMap(locale => getPublishedPosts().map(p => ({ locale, slug: p.slug })));
}


async function resolve(params: Params['params']) {
  const { locale, slug } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const post = getPublishedPost(slug);
  if (!post) notFound();
  return { locale: locale as Locale, post };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, post } = await resolve(params);
  return {
    title: `${post.title} | ${siteDetails.siteName}`,
    description: post.excerpt,
    alternates: alternatesFor(locale, `/blog/${post.slug}`),
    openGraph: { type: 'article', title: post.title, description: post.excerpt, publishedTime: post.date, images: [post.image] },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-[17px] leading-[1.7] text-[#3A3D45] md:text-lg md:leading-[1.75]">{block.text}</p>;
    case 'h2':
      return <h2 className="pt-2 text-[21px] leading-snug font-bold md:text-[26px]">{block.text}</h2>;
    case 'tip':
      return (
        <aside className="flex items-start gap-3 rounded-xl bg-tint p-4 md:gap-3.5 md:rounded-[14px] md:p-6">
          <Lightbulb size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden />
          <p className="text-sm leading-relaxed md:text-base md:leading-[1.65]"><strong>{block.lead}</strong> {block.text}</p>
        </aside>
      );
    case 'calc':
      return (
        <div className="grid gap-4 sm:grid-cols-2 md:gap-10">
          {block.cards.map(card => (
            <div key={card.title} className="flex flex-col gap-2.5 rounded-[14px] border border-line bg-white p-5 md:p-6">
              <p className="font-bold">{card.title}</p>
              <dl className="flex flex-col gap-2.5 text-sm">
                {card.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4"><dt className="text-body">{k}</dt><dd className="font-medium">{v}</dd></div>
                ))}
                <div className="flex justify-between gap-4 border-t border-line pt-2.5 text-[15px] font-bold">
                  <dt>{card.resultLabel}</dt>
                  <dd className={card.good ? 'text-ok' : undefined}>{card.result}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { locale, post } = await resolve(params);
  const c = getBlogCopy(locale);
  const l = siteLinks(locale);
  const url = `${siteDetails.siteUrl}${localePath(locale, `/blog/${post.slug}`)}`;
  const others = getPublishedPosts().filter(p => p.slug !== post.slug).slice(0, 3);
  const date = formatPostDate(post.date);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [`${siteDetails.siteUrl}${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'id-ID',
    articleSection: post.category,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: post.author, url: siteDetails.siteUrl },
    publisher: { '@type': 'Organization', name: siteDetails.siteName, logo: { '@type': 'ImageObject', url: `${siteDetails.siteUrl}/images/site/logo.svg` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />

      <article className="pt-7 pb-12 md:pt-12 md:pb-[72px]">
        <Container>
          <div className="mx-auto flex max-w-[720px] flex-col gap-5 md:gap-7">
          <Breadcrumb items={[{ label: c.crumbBlog, href: l.blog }, { label: post.category }]} />
          <h1 className="text-[30px] leading-[1.22] font-bold tracking-[-0.015em] md:text-[44px] md:leading-[1.2] md:tracking-[-0.02em]">{post.title}</h1>
          <div className="flex items-center gap-3.5">
            <span className="hidden h-10 w-10 items-center justify-center rounded-full bg-tint text-brand md:inline-flex"><PenLine size={18} aria-hidden /></span>
            <p className="flex flex-wrap items-center gap-x-1.5 text-[13px] text-mute md:flex-col md:items-start md:gap-0.5">
              <span className="font-semibold text-ink md:text-[15px]">{post.author}</span>
              <span aria-hidden className="md:hidden">·</span>
              <span><time dateTime={post.date}>{date}</time> · {c.readTime(post.readMinutes)}</span>
            </p>
          </div>
          <Image src={post.image} alt={post.imageAlt} width={1440} height={800} priority sizes="(min-width: 768px) 720px, 100vw" className="h-[220px] w-full rounded-[14px] object-cover md:h-[400px] md:rounded-[18px]" />
          {post.content.map((block, i) => <Block key={i} block={block} />)}
          <div className="border-t border-line pt-6">
            <ShareButtons url={url} title={post.title} copy={{ share: c.share, shareWa: c.shareWa, copyLink: c.copyLink, copied: c.copied }} />
          </div>
          </div>
        </Container>
      </article>

      {others.length > 0 && (
        <section className="bg-soft py-14 md:py-[72px]">
          <Container className="flex flex-col gap-5 md:gap-8">
            <h2 className="text-xl font-bold md:text-2xl">{c.alsoRead}</h2>
            <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
              {others.map(p => <li key={p.slug}><PostCard post={p} href={`${l.blog}/${p.slug}`} readTime={c.readTime(p.readMinutes)} /></li>)}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand locale={locale} />
    </>
  );
}
