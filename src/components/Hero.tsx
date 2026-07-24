"use client";

import React from "react";
import Image from "next/image";
import { Zap, BarChart3, Printer, RefreshCw, Download } from "lucide-react";
import DemoVideo from "./DemoVideo";
import { heroDetails } from "@/data/hero";
import { appDownloadDetails, ctaDetails } from "@/data/cta";
import { trackDownloadClick } from "@/utils/analytics";

const BADGES = [
  { Icon: Zap, text: "Transaksi Kilat" },
  { Icon: BarChart3, text: "Laporan Real-time" },
  { Icon: Printer, text: "Cetak Struk Otomatis" },
  { Icon: RefreshCw, text: "Sync Cloud" },
];

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pb-0 pt-28 md:pt-36 px-5 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute left-0 right-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[rgba(202,208,230,0.4)] dark:to-[rgba(10,15,26,0.8)] -z-10" />

      <div className="text-center w-full max-w-4xl mx-auto">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 dark:bg-blue-500/10 dark:border-blue-400/20 dark:text-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Kasir Digital untuk UMKM Indonesia
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-sans text-gray-900 max-w-2xl mx-auto leading-tight dark:text-white">
          {heroDetails.headingLead}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            {heroDetails.headingHighlight}
          </span>
        </h1>
        <p className="mt-5 text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto dark:text-gray-400">
          {heroDetails.subheading}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto">
          <a
            href={appDownloadDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownloadClick("hero")}
            className="flex items-center justify-center gap-2 px-6 h-14 rounded-full w-full sm:flex-1 font-bold text-base leading-none text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
          >
            <Download size={18} aria-hidden="true" className="relative -top-px" /> {appDownloadDetails.label}
          </a>
          <a
            href={ctaDetails.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 h-14 rounded-full w-full sm:flex-1 font-bold text-base leading-none transition-colors border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-surface-border dark:text-white dark:hover:bg-white/5"
          >
            Login
          </a>
        </div>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {appDownloadDetails.note}
        </p>

        {/* Lihat demo aplikasi */}
        <div className="mt-4 flex justify-center">
          <DemoVideo label="Lihat Demo Aplikasi" />
        </div>

        {/* Feature badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {BADGES.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm dark:bg-surface dark:border-surface-border dark:text-gray-300"
            >
              <b.Icon size={14} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
              {b.text}
            </span>
          ))}
        </div>

        {/* Tablet mockup */}
        <div className="relative mt-14 mx-auto z-10 w-full max-w-3xl px-4">
          {/* Glow behind tablet */}
          <div className="absolute inset-x-8 top-4 bottom-0 bg-blue-500/10 blur-2xl rounded-3xl -z-10" />

          <div className="bg-gray-900 rounded-[20px] p-[6px] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
            {/* Tablet top notch bar */}
            <div className="flex items-center justify-center py-1.5 px-4">
              <div className="w-16 h-1 bg-gray-700 rounded-full" />
            </div>
            <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden bg-black">
              <Image
                src={heroDetails.centerImageSrc}
                fill
                priority
                alt="Tampilan aplikasi kasir Loka Kasir di tablet"
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>

          {/* Reflection / bottom shine */}
          <div className="h-8 mx-6 bg-gradient-to-b from-gray-900/20 to-transparent rounded-b-3xl blur-sm" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
