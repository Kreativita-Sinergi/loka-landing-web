import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';

import { GrowLine, SplitReveal } from './motion/SplitReveal';

/** Lebar konten 1200px dengan gutter 20px di mobile, sama seperti Figma. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx('mx-auto w-full max-w-[1240px] px-5 lg:px-5', className)}>{children}</div>;
}

type Tone = 'primary' | 'secondary' | 'accent' | 'whatsapp' | 'ghostDark';

const tones: Record<Tone, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark active:bg-brand-darker',
  secondary: 'border-[1.5px] border-line bg-white text-ink hover:border-[#cdd2dc] hover:bg-soft',
  accent: 'bg-accent text-ink hover:brightness-95',
  whatsapp: 'bg-whatsapp text-white hover:brightness-95',
  ghostDark: 'border-[1.5px] border-[#5a5f6b] bg-transparent text-white hover:bg-white/10',
};

type ButtonLinkProps = {
  href: string;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  block?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>;

/** Tombol berbentuk tautan. Alamat luar dibuka di tab baru. */
export function ButtonLink({ href, tone = 'primary', size = 'md', icon, block, external, className, children, ...rest }: ButtonLinkProps) {
  // `hidden` dari pemanggil harus menang atas display bawaan, jadi display hanya
  // dipasang bila pemanggil tidak mengatur visibilitasnya sendiri.
  const display = className?.split(' ').includes('hidden') ? '' : 'inline-flex';
  const cls = clsx(
    display,
    'items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors whitespace-nowrap',
    size === 'sm' && 'px-4 py-2.5 text-sm',
    size === 'md' && 'px-6 py-3.5 text-[15px]',
    size === 'lg' && 'px-7 py-4 text-base',
    block && 'w-full',
    tones[tone],
    className,
  );
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

export const WhatsAppIcon = ({ size = 18 }: { size?: number }) => <FaWhatsapp size={size} aria-hidden />;

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={clsx('inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[0.1em] uppercase', light ? 'text-accent' : 'text-brand')}>
      <GrowLine light={light} />
      {children}
    </p>
  );
}

/** Judul section: label kecil, judul, dan deskripsi opsional. */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'left',
  light,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={clsx('flex flex-col gap-3.5', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={clsx('text-[26px] leading-[1.25] font-bold tracking-[-0.015em] md:text-[40px]', light ? 'text-white' : 'text-ink', titleClassName)}>
        {typeof title === 'string' ? <SplitReveal text={title} /> : title}
      </h2>
      {desc && <p className={clsx('max-w-[640px] text-base leading-relaxed md:text-lg', light ? 'text-[#dce7ff]' : 'text-body')}>{desc}</p>}
    </div>
  );
}

export function CheckItem({ children, tone = 'brand', className, as: Tag = 'li' }: { children: ReactNode; tone?: 'brand' | 'ok' | 'accent'; className?: string; as?: 'li' | 'div' }) {
  const color = tone === 'ok' ? 'text-ok' : tone === 'accent' ? 'text-accent' : 'text-brand';
  return (
    <Tag className={clsx('flex items-start gap-2.5 leading-normal', className)}>
      <Check size={18} className={clsx('mt-0.5 shrink-0', color)} aria-hidden />
      <span>{children}</span>
    </Tag>
  );
}

export function ProBadge() {
  return <span className="rounded-md bg-tint px-2 py-0.5 text-[11px] font-bold text-brand">Pro</span>;
}

export function IconTile({ children, size = 'md', tone = 'brand' }: { children: ReactNode; size?: 'sm' | 'md' | 'lg'; tone?: 'brand' | 'ok' | 'danger' | 'dark' }) {
  const box = size === 'sm' ? 'h-10 w-10 rounded-[10px]' : size === 'lg' ? 'h-14 w-14 rounded-[14px]' : 'h-11 w-11 rounded-xl';
  const bg = { brand: 'bg-tint text-brand', ok: 'bg-ok-soft text-ok', danger: 'bg-danger-soft text-danger', dark: 'bg-[#34363d] text-accent' }[tone];
  return <span className={clsx('inline-flex shrink-0 items-center justify-center', box, bg)}>{children}</span>;
}

/** Bingkai tablet hitam untuk screenshot aplikasi asli. */
export function TabletFrame({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={clsx('rounded-2xl bg-[#1c1c1e] p-2 shadow-[0_24px_48px_rgba(16,24,40,0.18)] md:rounded-[26px] md:p-3.5', className)}>
      <Image src={src} alt={alt} width={1600} height={1051} priority={priority} className="h-auto w-full rounded-lg md:rounded-xl" sizes="(min-width: 1024px) 620px, 100vw" />
    </div>
  );
}

/** `animated`: judul & deskripsi muncul bertahap (CSS, jadi tetap terlihat tanpa JavaScript). */
export function PageHero({ crumbs, title, desc, children, animated }: { crumbs?: { label: string; href?: string }[]; title: ReactNode; desc?: ReactNode; children?: ReactNode; animated?: boolean }) {
  const fade = (ms: number) => (animated ? { className: 'hero-fade', style: { '--d': `${ms}ms` } as CSSProperties } : {});
  return (
    <section className={clsx('relative isolate bg-soft', animated && 'overflow-hidden')}>
      {animated && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="hero-aurora absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(13,93,243,0.18),transparent_65%)]" />
          <div className="hero-aurora absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,201,60,0.2),transparent_65%)] [animation-delay:-7s]" />
          <div className="hero-grid absolute inset-0" />
        </div>
      )}
      <Container className="flex flex-col gap-4 pt-7 pb-9 md:gap-5 md:pt-12 md:pb-16">
        {crumbs && (animated ? <div {...fade(0)}><Breadcrumb items={crumbs} /></div> : <Breadcrumb items={crumbs} />)}
        <h1 {...fade(100)} className={clsx('max-w-[900px] text-[32px] leading-[1.18] font-bold tracking-[-0.02em] md:text-5xl', animated && 'hero-fade md:text-[56px] md:leading-[1.1] md:tracking-[-0.03em]')}>{title}</h1>
        {desc && <p {...fade(240)} className={clsx('max-w-[720px] text-base leading-relaxed text-body md:text-lg', animated && 'hero-fade')}>{desc}</p>}
        {animated && children ? <div {...fade(380)}>{children}</div> : children}
      </Container>
    </section>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] text-body md:text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-mute">›</span>}
            {item.href ? <Link href={item.href} className="hover:text-brand">{item.label}</Link> : <span className="font-medium text-ink">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
