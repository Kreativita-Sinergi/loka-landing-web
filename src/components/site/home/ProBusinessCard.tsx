'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProBusiness } from '@/lib/proBusinesses';

export default function ProBusinessCard({ business }: { business: ProBusiness }) {
  const [failedImage, setFailedImage] = useState<string>();
  const image = business.image && failedImage !== business.image ? business.image : undefined;

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
      <span className="min-w-0 text-center text-[13px] leading-relaxed font-semibold break-words text-ink md:text-sm">{business.name}</span>
    </li>
  );
}
