'use client';

import { useState } from 'react';
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
        <button type="button" aria-expanded={expanded} aria-controls="pro-businesses-list" onClick={() => setExpanded(!expanded)} className="mx-auto flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-brand hover:text-brand-dark">
          <span aria-hidden>{expanded ? '▴' : '▾'}</span>
          {expanded ? less : more}
        </button>
      )}
    </>
  );
}
