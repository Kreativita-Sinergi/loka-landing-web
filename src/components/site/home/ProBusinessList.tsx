'use client';

import { useState } from 'react';
import type { ProBusiness } from '@/lib/proBusinesses';
import ProBusinessCard from './ProBusinessCard';

export default function ProBusinessList({ businesses, more, less, locationUnavailable }: {
  businesses: ProBusiness[];
  more: string;
  less: string;
  locationUnavailable: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const withLogos = businesses.filter(business => business.image?.trim());
  const withoutLogos = businesses.filter(business => !business.image?.trim());
  const featured = withLogos.slice(0, 12);
  const visible = expanded ? [...withLogos, ...withoutLogos] : featured;

  return (
    <>
      <ul id="pro-businesses-list" className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((business, index) => (
          <ProBusinessCard key={`${business.name}-${index}`} business={business} requireLogo={!expanded} locationUnavailable={locationUnavailable} />
        ))}
      </ul>
      {businesses.length > featured.length && (
        <button type="button" aria-expanded={expanded} aria-controls="pro-businesses-list" onClick={() => setExpanded(!expanded)} className="mx-auto mt-3 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-brand hover:text-brand-dark">
          <span aria-hidden>{expanded ? '▴' : '▾'}</span>
          {expanded ? less : <>{more} <span className="tabular-nums">({businesses.length})</span></>}
        </button>
      )}
    </>
  );
}
