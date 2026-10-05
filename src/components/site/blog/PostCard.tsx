import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/data/site/blog';

export function PostMeta({ post, readTime, className }: { post: BlogPost; readTime: string; className?: string }) {
  return (
    <p className={className ?? 'flex items-center gap-2.5 text-xs md:text-[13px]'}>
      <span className="font-bold text-brand">{post.category}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-mute" />
      <span className="text-mute">{readTime}</span>
    </p>
  );
}

/** Kartu artikel: daftar horizontal di mobile, kartu bergambar di desktop. */
export function PostCard({ post, href, readTime }: { post: BlogPost; href: string; readTime: string }) {
  return (
    <Link href={href} className="group flex items-start gap-3.5 md:flex-col md:gap-4">
      <Image src={post.image} alt={post.imageAlt} width={768} height={440} sizes="(min-width: 768px) 384px, 110px" className="h-[90px] w-[110px] shrink-0 rounded-[10px] object-cover md:h-[220px] md:w-full md:rounded-2xl" />
      <span className="flex flex-col gap-1 md:gap-3">
        <PostMeta post={post} readTime={readTime} />
        <span className="text-[15px] leading-snug font-bold group-hover:text-brand md:text-xl">{post.title}</span>
        <span className="hidden text-[15px] leading-relaxed text-body md:block">{post.excerpt}</span>
      </span>
    </Link>
  );
}
