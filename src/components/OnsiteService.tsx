"use client";

import React from "react";
import { Check, MapPin, MessageCircle, Wrench, BadgeCheck } from "lucide-react";
import { onsiteServiceDetails } from "@/data/onsiteService";
import { trackContactClick } from "@/utils/analytics";

const {
  citiesHeading,
  citiesNote,
  cities,
  serviceHeading,
  serviceItems,
  requirementHeading,
  requirementMessage,
  requirementPoints,
  steps,
  ctaLabel,
  whatsappMessage,
  contact,
} = onsiteServiceDetails;

const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;

const OnsiteService: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Kota layanan */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <MapPin size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {citiesHeading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {citiesNote}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {cities.map((city) => (
            <div
              key={city.name}
              className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-surface-border dark:bg-white/5"
            >
              <p className="text-base font-bold text-gray-900 dark:text-white">
                {city.name}
              </p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {city.province}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {city.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Yang dikerjakan tim di lokasi */}
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <Wrench size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {serviceHeading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Anda cukup menyiapkan data produk dan perangkat Android-nya —
                sisanya tim kami yang kerjakan di tempat.
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-3">
            {serviceItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                />
                <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Syarat langganan tahunan */}
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <BadgeCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {requirementHeading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {requirementMessage}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-3">
            {requirementPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                />
                <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alur pemesanan layanan onsite */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-surface-border dark:bg-white/5"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("whatsapp", "onsite_service")}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold leading-none text-white transition-colors hover:bg-blue-700 sm:w-auto sm:self-start"
        >
          <MessageCircle size={16} className="relative -top-px shrink-0" />
          {ctaLabel}
        </a>
      </div>
    </div>
  );
};

export default OnsiteService;
