'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProBusiness } from '@/lib/proBusinesses';

export default function ProBusinessCard({ business }: { business: ProBusiness }) {
  const [failedImage, setFailedImage] = useState<string>();
  const image = business.image && failedImage !== business.image ? business.image : undefined;

  return (
    <li className="flex min-w-0 flex-col items-center justify-center gap-2.5 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:justify-start">
      {image && (
        <Image
          src={image}
          alt=""
          width={52}
          height={52}
          unoptimized
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-11 w-11 shrink-0 object-contain md:h-[52px] md:w-[52px]"
          onError={() => setFailedImage(image)}
        />
      )}
      <span className="flex min-w-0 flex-col gap-1 text-center break-words sm:text-left">
        <span className="text-[13px] leading-relaxed font-semibold text-ink md:text-sm">{business.name}</span>
        {business.businessType && (
          <span className="text-xs leading-relaxed font-medium text-brand">{business.businessType}</span>
        )}
        {business.location && (
          <span className="line-clamp-2 text-xs leading-relaxed text-body" title={business.location}>{business.location}</span>
        )}
      </span>
    </li>
  );
}
