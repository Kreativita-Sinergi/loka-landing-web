"use client";

import React, { useState } from "react";
import Image from "next/image";

const MOBILE_SCREENS = [
  { src: "/images/mobile/Screenshot_1776572485.png", label: "Login" },
  { src: "/images/mobile/Screenshot_1776572542.png", label: "Dashboard" },
  { src: "/images/mobile/Screenshot_1776572549.png", label: "Kasir" },
  { src: "/images/mobile/Screenshot_1776572556.png", label: "Order" },
  { src: "/images/mobile/Screenshot_1776573487.png", label: "Pembayaran" },
];

const TABLET_SCREENS = [
  {
    src: "/images/tablet/Screenshot_1776574642.png",
    label: "Layar Transaksi (Grid)",
    description: "Antarmuka kasir yang bersih dengan dukungan grid view untuk identifikasi produk cepat.",
  },
  {
    src: "/images/tablet/Screenshot_1776574650.png",
    label: "Layar Transaksi (List)",
    description: "Tampilan list untuk melihat SKU dan detail stok produk secara langsung saat transaksi.",
  },
  {
    src: "/images/tablet/Screenshot_1776574679.png",
    label: "Riwayat Transaksi",
    description: "Pantau semua transaksi harian, status pembayaran, dan kelola refund langsung dari perangkat.",
  },
  {
    src: "/images/tablet/Screenshot_1776574482.png",
    label: "Manajemen Shift",
    description: "Laporan ringkasan kas yang akurat di setiap akhir sesi untuk transparansi keuangan.",
  },
  {
    src: "/images/tablet/Screenshot_1776574686.png",
    label: "Pengaturan Perangkat",
    description: "Pusat konfigurasi printer thermal, laci uang, dan sinkronisasi data dari server.",
  },
];

const AppScreenshots: React.FC = () => {
  const [tab, setTab] = useState<"mobile" | "tablet">("mobile");

  return (
    <div className="mt-12">
      {/* Tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 rounded-2xl p-1 dark:bg-surface dark:border dark:border-surface-border">
          <button
            onClick={() => setTab("mobile")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "mobile"
                ? "bg-white text-gray-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            📱 App Mobile
          </button>
          <button
            onClick={() => setTab("tablet")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "tablet"
                ? "bg-white text-gray-900 shadow-sm dark:bg-white/10 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            📟 Tablet
          </button>
        </div>
      </div>

      {/* Mobile phones showcase */}
      {tab === "mobile" && (
        <div className="flex items-end justify-center gap-2 md:gap-4 overflow-x-auto pb-6 px-4">
          {MOBILE_SCREENS.map((screen, i) => {
            const center = 2;
            const dist = Math.abs(i - center);
            const scale = dist === 0 ? 1 : dist === 1 ? 0.9 : 0.8;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.8 : 0.55;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 flex-shrink-0"
                style={{ transform: `scale(${scale})`, opacity, transformOrigin: "bottom center" }}
              >
                <div className="w-[140px] md:w-[160px] h-[300px] md:h-[342px] bg-gray-900 rounded-[32px] p-[5px] shadow-2xl ring-1 ring-gray-800">
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black">
                    <Image
                      src={screen.src}
                      alt={screen.label}
                      fill
                                            className="object-cover object-top"
                      sizes="160px"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium dark:text-gray-400">{screen.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tablet showcase */}
      {tab === "tablet" && (
        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex gap-5 min-w-max">
            {TABLET_SCREENS.map((screen, i) => (
              <div key={i} className="flex flex-col gap-3 w-[280px] md:w-[320px] flex-shrink-0">
                <div className="bg-gray-900 rounded-[14px] p-[5px] shadow-xl ring-1 ring-gray-800">
                  <div className="relative w-full aspect-[16/10] rounded-[10px] overflow-hidden bg-black">
                    <Image
                      src={screen.src}
                      alt={screen.label}
                      fill
                                            className="object-cover object-top"
                      sizes="320px"
                    />
                  </div>
                </div>
                <div className="px-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{screen.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed dark:text-gray-400">{screen.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppScreenshots;
