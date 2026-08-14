import React from "react";
import Image from "next/image";

import { webAdminScreenshots } from "@/data/webAdmin";

// Galeri tangkapan layar Web Admin. Mengembalikan null selama belum ada file
// yang didaftarkan, supaya halaman tidak menampilkan bingkai kosong.
const WebAdminGallery: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  if (webAdminScreenshots.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${className}`}>
      {webAdminScreenshots.map((shot) => (
        <figure key={shot.src}>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm dark:border-surface-border dark:bg-surface">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={1000}
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <figcaption className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default WebAdminGallery;
