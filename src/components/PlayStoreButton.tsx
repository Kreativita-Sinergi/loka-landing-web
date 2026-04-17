"use client";

import React from "react";

import { ctaDetails } from "@/data/cta";

const PlayStoreButton = ({ dark }: { dark?: boolean }) => {
  return (
    <a
      href={ctaDetails.dashboardUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit font-bold text-base transition-colors ${
        dark ? "text-white bg-blue-600 hover:bg-blue-700" : "text-gray-900 bg-white hover:bg-gray-100"
      }`}
    >
      Daftar & Mulai Gratis
    </a>
  );
};

export default PlayStoreButton;
