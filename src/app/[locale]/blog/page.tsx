import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaInstagram } from 'react-icons/fa';

import { LOCALES, type Locale } from '@/data/localized';
import { siteDetails } from '@/data/siteDetails';
import { siteLinks } from '@/data/site/links';
import { BLOG_CATEGORIES, getBlogCopy, getPublishedPosts } from '@/data/site/blog';
import { alternatesFor } from '@/lib/hreflang';
import { ButtonLink, Container } from '@/components/site/ui';
import BlogIndex from '@/components/site/blog/BlogIndex';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const c = getBlogCopy(locale as Locale);
  return {
    title: `${c.metaTitle} | ${siteDetails.siteName}`,
    description: c.metaDescription,
    alternates: alternatesFor(locale as Locale, '/blog'),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!(LOCALES as readonly string[]).includes(raw)) notFound();
  const locale = raw as Locale;
  const c = getBlogCopy(locale);
  const l = siteLinks(locale);
  const posts = getPublishedPosts();
  const categories = BLOG_CATEGORIES.filter(cat => posts.some(p => p.category === cat));
  const readTimes = Object.fromEntries(posts.map(p => [p.slug, c.readTime(p.readMinutes)]));

  return (
    <>
      <BlogIndex
        hero={{ crumbs: [{ label: c.crumbHome, href: l.home }, { label: c.crumbBlog }], title: c.title, desc: c.desc }}
        posts={posts}
        categories={categories}
        basePath={l.blog}
        copy={{ all: c.all, readMore: c.readMore, latest: c.latest, empty: c.empty }}
        readTimes={readTimes}
      />

      <section className="pb-14 md:pb-[88px]">
        <Container>
          <div className="flex flex-col gap-4 rounded-2xl bg-tint p-5 md:flex-row md:items-center md:justify-between md:rounded-[20px] md:px-12 md:py-10">
            <div className="flex flex-col gap-1.5">
              <p className="text-lg font-bold md:text-2xl">{c.followTitle}</p>
              <p className="text-sm text-body md:text-base">{c.followDesc}</p>
            </div>
            <ButtonLink href={l.instagram} icon={<FaInstagram size={18} aria-hidden />} className="shrink-0">{c.followCta}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
