"use client";

import React from "react";
import { FaWindows } from "react-icons/fa";
import { getWindowsDownload } from "@/data/cta";
import { trackDownloadClick } from "@/utils/analytics";
import type { Locale } from "@/data/localized";

type Variant = "link" | "button";

type Props = {
  locale: Locale;
  /** Menandai dari komponen mana klik berasal (hero, cta, footer, dll). */
  source: string;
  /** "link" = teks kecil pendamping tombol Play Store, "button" = tombol penuh. */
  variant?: Variant;
  label?: string;
  className?: string;
};

// Tautan unduh versi Windows (Microsoft Store). Dipakai berdampingan dengan
// tombol Google Play supaya pengguna desktop tetap punya jalur pasang sendiri.
const WindowsDownloadLink: React.FC<Props> = ({
  locale,
  source,
  variant = "link",
  label,
  className = "",
}) => {
  const windowsDownloadDetails = getWindowsDownload(locale);
  const base =
    variant === "button"
      ? "inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl font-semibold text-sm leading-none transition-colors"
      : "inline-flex items-center gap-1.5 text-xs font-medium underline underline-offset-4 transition-colors";

  return (
    <a
      href={windowsDownloadDetails.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownloadClick(source, "windows")}
      className={`${base} ${className}`}
    >
      <FaWindows size={variant === "button" ? 16 : 13} aria-hidden="true" className="flex-shrink-0" />
      {label ?? (variant === "button" ? windowsDownloadDetails.label : windowsDownloadDetails.shortLabel)}
    </a>
  );
};

export default WindowsDownloadLink;
