"use client";

import React from "react";
import { Download } from "lucide-react";
import { trackDownloadClick } from "@/utils/analytics";

type Props = {
  url: string;
  label: string;
  /** Menandai dari komponen mana klik berasal (download-page, dll). */
  source: string;
};

// Tombol unduh APK langsung. Client component hanya demi event analytics —
// dipisahkan dari klik Play Store (platform "android-apk") supaya terlihat
// berapa banyak pengguna yang memang datang dari perangkat tanpa Google Play.
const ApkDownloadButton: React.FC<Props> = ({ url, label, source }) => (
  <a
    href={url}
    onClick={() => trackDownloadClick(source, "android-apk")}
    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 h-12 text-sm font-semibold leading-none text-white transition-colors hover:bg-blue-700 sm:w-auto"
  >
    <Download size={16} aria-hidden="true" className="flex-shrink-0" />
    {label}
  </a>
);

export default ApkDownloadButton;
