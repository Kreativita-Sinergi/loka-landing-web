"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, Globe } from "lucide-react";

import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, localePath, type Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

/**
 * Pemilih bahasa.
 *
 * Ia memindahkan pengunjung ke HALAMAN YANG SAMA dalam bahasa lain, bukan
 * memulangkannya ke beranda. Orang yang sedang membaca halaman Windows lalu
 * mengganti bahasa hampir pasti ingin membaca halaman Windows, dan melemparnya
 * ke beranda memaksanya mencari lagi dari awal.
 *
 * Alamat yang sedang dibuka dibaca dari `usePathname`, lalu awalan bahasanya
 * dilepas untuk mendapatkan jalur murninya. Bahasa Indonesia tidak berawalan,
 * jadi jalur murni itu memang sudah bentuk akhirnya (lihat `localePath`).
 */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const ui = getUi(locale);

  const stripped = LOCALES.reduce((path, candidate) => {
    if (candidate === DEFAULT_LOCALE) return path;
    if (path === `/${candidate}`) return "/";
    if (path.startsWith(`/${candidate}/`)) return path.slice(candidate.length + 1);
    return path;
  }, pathname);

  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label={ui.navLanguage}
        title={ui.navLanguage}
        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <Globe size={16} aria-hidden="true" />
        <span className="uppercase">{locale}</span>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-50 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg focus:outline-none dark:border-surface-border dark:bg-surface"
      >
        {LOCALES.map((candidate) => (
          <MenuItem key={candidate}>
            <Link
              href={localePath(candidate, stripped)}
              hrefLang={candidate}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-900 data-[focus]:bg-gray-50 dark:text-white dark:data-[focus]:bg-white/5"
            >
              {LOCALE_LABELS[candidate]}
              {candidate === locale && <Check size={15} aria-hidden="true" className="text-blue-600 dark:text-blue-400" />}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
