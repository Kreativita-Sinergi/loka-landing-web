"use client";

import React from "react";
import { Check, Lightbulb, Mail, MessageCircle, Handshake } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import { getPartnership, getPartnerTypes } from "@/data/partnership";
import { trackContactClick } from "@/utils/analytics";
import type { Locale } from "@/data/localized";

const Partnership: React.FC<{ locale: Locale }> = ({ locale }) => {
  const partnershipDetails = getPartnership(locale);
  const partnerTypes = getPartnerTypes(locale);
  const { featureRequest, partnership, contact } = partnershipDetails;
  const waLink = (message: string) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request fitur — siapa pun boleh mengajukan */}
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Lightbulb size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {featureRequest.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {featureRequest.message}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-3">
            {featureRequest.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check
                  size={16}
                  className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                />
                <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={waLink(featureRequest.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("whatsapp", "feature_request")}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 self-start rounded-full bg-blue-600 px-6 text-sm font-bold leading-none text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            <MessageCircle size={16} className="relative -top-px shrink-0" />
            {featureRequest.ctaLabel}
          </a>
        </div>

        {/* Kerjasama — minimarket, supermarket, kafe, reseller, dll */}
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-surface-border dark:bg-surface dark:shadow-black/30">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <Handshake size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {partnership.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {partnership.message}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {partnerTypes.map((type) => (
              <div
                key={type.title}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-surface-border dark:bg-white/5"
              >
                <span className="text-xl">{type.icon}</span>
                <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  {type.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  {type.description}
                </p>
              </div>
            ))}
          </div>

          <a
            href={waLink(partnership.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("whatsapp", "partnership")}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 self-start rounded-full bg-green-600 px-6 text-sm font-bold leading-none text-white transition-colors hover:bg-green-700 sm:w-auto"
          >
            <MessageCircle size={16} className="relative -top-px shrink-0" />
            {partnership.ctaLabel}
          </a>
        </div>
      </div>

      {/* Kanal alternatif */}
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white px-6 py-5 text-center shadow-sm sm:flex-row dark:border-surface-border dark:bg-surface dark:shadow-black/30">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lebih nyaman lewat kanal lain? Boleh juga:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://ig.me/m/${contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("instagram", "partnership")}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-surface-border dark:text-gray-300 dark:hover:bg-white/5"
          >
            <FiInstagram size={15} className="shrink-0" />@{contact.instagram}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-surface-border dark:text-gray-300 dark:hover:bg-white/5"
          >
            <Mail size={15} className="shrink-0" />
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
