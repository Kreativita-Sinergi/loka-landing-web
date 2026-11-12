'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProBusiness } from '@/lib/proBusinesses';

export default function ProBusinessCard({ business, requireLogo = false }: { business: ProBusiness; requireLogo?: boolean }) {
  const [failedImage, setFailedImage] = useState<string>();
  const image = business.image && failedImage !== business.image ? business.image : undefined;
  if (requireLogo && !image) return null;

  return (
    <li className="flex min-h-[88px] min-w-0 items-center justify-center gap-3 rounded-2xl border border-line bg-white px-4 py-4 md:min-h-[96px] md:px-5">
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
      <span className="flex min-w-0 flex-col gap-1 text-center break-words">
        <span className="text-[13px] leading-relaxed font-semibold text-ink md:text-sm">{business.name}</span>
        {business.location && (
          <span className="line-clamp-2 text-xs leading-relaxed text-body" title={business.location}>{business.location}</span>
        )}
      </span>
    </li>
  );
}
