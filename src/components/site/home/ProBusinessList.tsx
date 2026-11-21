'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ProBusiness } from '@/lib/proBusinesses';
import ProBusinessCard from './ProBusinessCard';

export default function ProBusinessList({ businesses, more, less }: {
  businesses: ProBusiness[];
  more: string;
  less: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const withLogos = businesses.filter(business => business.image?.trim());
  const withoutLogos = businesses.filter(business => !business.image?.trim());
  const ordered = [...withLogos, ...withoutLogos];
  const featured = ordered.slice(0, 4);
  const visible = expanded ? ordered : featured;

  return (
    <>
      <ul id="pro-businesses-list" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {visible.map((business, index) => (
          <ProBusinessCard key={`${business.name}-${index}`} business={business} />
        ))}
      </ul>
      {businesses.length > featured.length && (
        <button type="button" aria-expanded={expanded} aria-controls="pro-businesses-list" onClick={() => setExpanded(!expanded)} className="mx-auto flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-brand/25 bg-white px-5 py-2 text-sm font-semibold text-brand-dark hover:border-brand">
          {expanded ? less : more}
          <ChevronDown size={16} aria-hidden className={expanded ? 'rotate-180' : undefined} />
        </button>
      )}
    </>
  );
}
