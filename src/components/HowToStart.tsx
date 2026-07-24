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
import { howToStartDetails, type HowToIcon } from "@/data/howToStart";
import { appDownloadDetails } from "@/data/cta";
import { trackDownloadClick } from "@/utils/analytics";

const ICONS: Record<HowToIcon, LucideIcon> = {
  whatsapp: MessageCircle,
  download: Download,
  install: Smartphone,
  register: UserPlus,
  setup: Settings2,
  sell: ShoppingCart,
};

export default function HowToStart() {
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

      <div className="mt-10 flex flex-col items-center gap-3">
        <a
          href={appDownloadDetails.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackDownloadClick("how-to-start")}
          className="flex items-center justify-center gap-2 px-8 h-14 rounded-full font-bold text-base leading-none text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
        >
          <Download size={18} aria-hidden="true" className="relative -top-px" /> Mulai — {appDownloadDetails.label}
        </a>
        <p className="text-xs text-gray-500 dark:text-gray-400">{appDownloadDetails.note}</p>
      </div>
    </div>
  );
}
