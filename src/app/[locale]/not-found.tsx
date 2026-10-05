import { CircleHelp, Download, Sparkles, Tag } from 'lucide-react';
import Link from 'next/link';

import { DEFAULT_LOCALE } from '@/data/localized';
import { siteLinks } from '@/data/site/links';
import { ButtonLink, Container } from '@/components/site/ui';

/**
 * Halaman 404. `not-found` tidak menerima params, jadi tautannya memakai
 * bahasa default.
 */
export default function NotFound() {
  const l = siteLinks(DEFAULT_LOCALE);
  const quick = [
    { label: 'Fitur', href: l.fitur, icon: <Sparkles size={22} aria-hidden /> },
    { label: 'Harga', href: l.harga, icon: <Tag size={22} aria-hidden /> },
    { label: 'Download', href: l.download, icon: <Download size={22} aria-hidden /> },
    { label: 'FAQ', href: l.faq, icon: <CircleHelp size={22} aria-hidden /> },
  ];

  return (
    <section className="py-16 md:py-[120px]">
      <Container className="flex flex-col items-stretch gap-3.5 md:items-center md:gap-6">
        <div className="flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-[88px] leading-none font-bold tracking-[-0.03em] text-brand md:text-[120px]">404</p>
          <h1 className="text-2xl font-bold md:text-4xl">Halaman ini tidak ditemukan</h1>
          <p className="max-w-[560px] text-[15px] leading-relaxed text-body md:text-lg">
            Mungkin alamatnya salah ketik, atau halamannya sudah dipindah. Coba mulai dari salah satu halaman ini.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:pt-2">
          <ButtonLink href={l.home} size="lg">Kembali ke Beranda</ButtonLink>
          <ButtonLink href={l.panduan} tone="secondary" size="lg">Panduan Pengguna</ButtonLink>
        </div>
        <ul className="grid grid-cols-2 gap-2.5 pt-1 md:grid-cols-4 md:gap-6 md:pt-8">
          {quick.map(q => (
            <li key={q.label}>
              <Link href={q.href} className="flex items-center gap-2.5 rounded-xl border border-line p-3.5 text-sm font-semibold text-ink transition hover:border-[#cdd2dc] hover:text-brand hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] md:w-[180px] md:flex-col md:rounded-[14px] md:p-5 md:text-[15px] [&>svg]:text-brand">
                {q.icon}
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
