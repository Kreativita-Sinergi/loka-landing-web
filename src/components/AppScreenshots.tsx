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
  { src: "/images/tablet/Screenshot_1776574478.png", label: "Dashboard" },
  { src: "/images/tablet/Screenshot_1776574642.png", label: "Kasir — Grid" },
  { src: "/images/tablet/Screenshot_1776574650.png", label: "Kasir — List" },
];

const AppScreenshots: React.FC = () => {
  const [tab, setTab] = useState<"mobile" | "tablet">("mobile");
  const [activeTablet, setActiveTablet] = useState(0);

  return (
    <div className="mt-12">
      {/* Tab switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setTab("mobile")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "mobile"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📱 App Mobile
          </button>
          <button
            onClick={() => setTab("tablet")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === "tablet"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📟 Tablet / iPad
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
                      unoptimized
                      className="object-cover object-top"
                      sizes="160px"
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{screen.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Tablet showcase */}
      {tab === "tablet" && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-3xl bg-gray-900 rounded-[20px] p-[7px] shadow-2xl ring-1 ring-gray-800">
            <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden bg-black">
              <Image
                src={TABLET_SCREENS[activeTablet].src}
                alt={TABLET_SCREENS[activeTablet].label}
                fill
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {TABLET_SCREENS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveTablet(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeTablet === i
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppScreenshots;
