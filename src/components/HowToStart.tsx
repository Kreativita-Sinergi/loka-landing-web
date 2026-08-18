"use client";

import {
  MessageCircle,
  Download,
  Smartphone,
  UserPlus,
  Settings2,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { getHowToStart, type HowToIcon } from "@/data/howToStart";
import { getAppDownload, getSignUp } from "@/data/cta";
import { trackDownloadClick, trackSignUpClick } from "@/utils/analytics";
import type { Locale } from "@/data/localized";
import { getUi } from "@/data/ui";

const ICONS: Record<HowToIcon, LucideIcon> = {
  whatsapp: MessageCircle,
  download: Download,
  install: Smartphone,
  register: UserPlus,
  setup: Settings2,
  sell: ShoppingCart,
};

export default function HowToStart({ locale }: { locale: Locale }) {
  const howToStartDetails = getHowToStart(locale);
  const signUpDetails = getSignUp(locale);
  const appDownloadDetails = getAppDownload(locale);
  const { steps } = howToStartDetails;

  return (
    <div>
      <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-5">
        {steps.map((step) => {
          const Icon = ICONS[step.icon];
          return (
            <li
              key={step.title}
              className="flex flex-col items-center text-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-surface-border dark:bg-surface dark:shadow-black/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mb-1.5 text-base font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {step.desc}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Ajakan utama kini mendaftar, bukan mengunduh — langkah 1 memang daftar */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={signUpDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSignUpClick("how-to-start")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 h-14 text-base font-bold leading-none text-white shadow-lg shadow-blue-600/30 transition-colors hover:bg-blue-700 sm:w-auto"
          >
            <UserPlus size={18} aria-hidden="true" className="relative -top-px" />
            {getUi(locale).howToStartCta}{signUpDetails.label}
          </a>
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownloadClick("how-to-start")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-8 h-14 text-base font-bold leading-none text-gray-900 transition-colors hover:bg-gray-100 dark:border-surface-border dark:text-white dark:hover:bg-white/5 sm:w-auto"
          >
            <Download size={18} aria-hidden="true" className="relative -top-px" />
            {getUi(locale).navDownloadApp}
          </a>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{signUpDetails.note}</p>
      </div>
    </div>
  );
}
